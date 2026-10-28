<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Session;
use Illuminate\Support\Facades\Cache;

/**
 * Administrasi billing: petugas melihat rincian tagihan satu kunjungan,
 * hanya boleh menambah item berkategori JASA (bukan obat/BHP), dan boleh menghapus
 * semua item kecuali kategori terlindungi (lihat $kategoriTerlindungi).
 */
class AdministrasiBillingController extends Controller
{
    protected $ws_inv;
    protected $ws_simrs;

    public function __construct()
    {
        if (config('app.APP_DEBUG') == True) {
            $this->ws_inv = config('app.ws_inv_dev');
            $this->ws_simrs = config('app.ws_sim_dev');
        } else {
            $this->ws_inv = config('app.ws_inv_prod');
            $this->ws_simrs = config('app.ws_sim_prod');
        }
    }


    // Kategori yang TIDAK boleh dihapus dari Administrasi karena pembatalannya harus lewat
    // unit asalnya (farmasi / penunjang / kamar operasi). Kategori lain boleh dihapus.
    private $kategoriTerlindungi = ['OBAT-OBATAN', 'BMHP', 'RADIOLOGI', 'LABORATORIUM', 'PROCEDURE BEDAH'];

    // Penamaan kategori berbeda-beda antar sumber data (billing vs master barang): 'OBAT OBATAN',
    // 'OBAT', 'ALKES/BMHP', 'LAB PK', 'RADIOLOGI - USG', 'PROSEDUR BEDAH'. Pencocokan karena itu
    // memakai kata kunci pada nama kategori yang sudah dinormalkan, bukan kesamaan persis.
    private $kataKunciTerlindungi = ['OBAT', 'BMHP', 'RADIOLOG', 'LAB', 'BEDAH'];

    private function kategoriTerlindung($kategori)
    {
        $k = trim(preg_replace('/[^A-Z]+/', ' ', strtoupper((string) $kategori)));
        if ($k === '') {
            return false;
        }
        foreach ($this->kataKunciTerlindungi as $kata) {
            if (strpos($k, $kata) !== false) {
                return true;
            }
        }
        return false;
    }

    // Rincian tagihan kunjungan (sama dengan sumber data billing di monitoring).
    // Baris yang bisa dihapus diberi BISA_HAPUS = true beserta RECEIPT_NO dan ITEM_ID.
    public function billing_kunjungan(Request $request)
    {
        try {
            $rows = $this->ambilBilling($request->norm, $request->noregister);
            return response()->json($this->tandaiBisaHapus($rows, $request->noregister));
        } catch (\Exception $e) {
            return response()->json(['metadata' => ['code' => 201, 'message' => $this->pesanRamah($e)]]);
        }
    }

    // Hapus (void) satu transaksi billing. Hanya transaksi berisi satu item milik kunjungan ini
    // yang diizinkan, supaya tidak ikut membatalkan item lain yang kebetulan satu nomor transaksi.
    // Kategori terlindungi (obat-obatan, radiologi, laboratorium, procedure bedah) tetap ditolak.
    public function hapus_jasa(Request $request)
    {
        try {
            $request->validate([
                'NOPENDAFTARAN' => 'required',
                'RECEIPT_NO' => 'required',
            ]);

            $items = $this->ambilItemTransaksi($request->RECEIPT_NO);
            if (!$items) {
                return response()->json(['metadata' => ['code' => 201, 'message' => 'Transaksi tidak ditemukan.']]);
            }
            foreach ($items as $it) {
                if ((string) ($it['NOREGISTER'] ?? '') !== (string) $request->NOPENDAFTARAN) {
                    return response()->json(['metadata' => ['code' => 201, 'message' => 'Transaksi bukan milik kunjungan ini.']]);
                }
            }
            if (count($items) !== 1) {
                return response()->json(['metadata' => ['code' => 201, 'message' => 'Transaksi ini berisi lebih dari satu item, pembatalannya harus lewat unit asalnya.']]);
            }
            if ($this->kategoriTerlindung($items[0]['KATEGORI'] ?? '')) {
                return response()->json(['metadata' => ['code' => 201, 'message' =>
                    'Item kategori ' . trim($items[0]['KATEGORI'] ?? '-') . ' tidak bisa dihapus dari Administrasi. '
                    . 'Kategori yang dikunci: ' . implode(', ', $this->kategoriTerlindungi) . '.']]);
            }

            $client = new Client();
            $response = $client->post(
                $this->ws_inv . 'index.php/api/sales/void_sales/' . $request->RECEIPT_NO . '/' . Session::get('id_client') . '/' . Session::get('id_lokasi'),
                [
                    'json' => ['id_client' => Session::get('id_client'), 'NOPENDAFTARAN' => $request->NOPENDAFTARAN],
                    'headers' => ['Content-Type' => 'application/json', 'Authorization' => '']
                ]
            );
            $body = $response->getBody()->getContents();

            $hasil = json_decode($body, true);
            if (($hasil['metadata']['code'] ?? null) == 200) {
                $this->audit('HAPUS_JASA', [
                    'noregister' => $request->NOPENDAFTARAN, 'receipt_no' => $request->RECEIPT_NO,
                    'item_id' => $items[0]['ITEM_ID'] ?? null, 'barcode' => $items[0]['BARCODE'] ?? null,
                    'item' => $items[0]['NAMABARANG'] ?? null, 'qty' => $items[0]['QTY'] ?? null,
                    'total' => $items[0]['TOTALAMOUNT'] ?? null,
                ]);
            }
            return $body;
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['metadata' => ['code' => 201, 'message' => collect($e->errors())->flatten()->first()]]);
        } catch (\Exception $e) {
            return response()->json(['metadata' => ['code' => 201, 'message' => $this->pesanRamah($e)]]);
        }
    }

    private function ambilBilling($norm, $noregister)
    {
        $client = new Client();
        $response = $client->post(
            $this->ws_simrs . "index.php/api/laporan/history_berobat_pasien/" . $norm . "/" . Session::get('id_client') . "/" . $noregister,
            ['headers' => ['Content-Type' => 'application/json', 'Authorization' => '']]
        );
        $rows = json_decode($response->getBody()->getContents(), true);
        return is_array($rows) ? $rows : [];
    }

    // Header transaksi penjualan (RECEIPT_NO) yang terhubung ke no. registrasi kunjungan.
    // Dua sumber digabung karena cakupannya berbeda: header_sales_v2 (mode 2) memuat seluruh
    // transaksi kunjungan termasuk non-obat, sedangkan get_header_sales/RESEP_HISTORY hanya
    // sebagian (pada banyak kunjungan malah kosong). Duplikat dibuang lewat RECEIPT_NO.
    private function ambilHeaderTransaksi($noregister)
    {
        $header = [];
        foreach (['v2', 'resep'] as $sumber) {
            try {
                $rows = $sumber === 'v2'
                    ? $this->headerSalesV2($noregister)
                    : $this->headerSalesResep($noregister);
            } catch (\Exception $e) {
                \Log::warning('Administrasi: header transaksi (' . $sumber . ') gagal: ' . $e->getMessage());
                continue;
            }
            foreach ($rows as $h) {
                $rn = (string) ($h['RECEIPT_NO'] ?? '');
                if ($rn !== '' && !isset($header[$rn])) {
                    $header[$rn] = $h;
                }
            }
        }
        return array_values($header);
    }

    private function headerSalesV2($noregister)
    {
        $client = new Client();
        $response = $client->post($this->ws_inv . 'index.php/api/sales/header_sales_v2', [
            'json' => [
                "id_client" => Session::get('id_client'), "tglmin" => "", "tglmax" => "",
                "noregister" => $noregister, "receipt_no" => $noregister, "mode" => 2
            ],
            'headers' => ['Content-Type' => 'application/json', 'Authorization' => '']
        ]);
        $body = json_decode($response->getBody()->getContents(), true);
        return is_array($body['response'] ?? null) ? $body['response'] : [];
    }

    private function headerSalesResep($noregister)
    {
        $client = new Client();
        $response = $client->post($this->ws_inv . 'index.php/api/sales/get_header_sales', [
            'json' => [
                "IDCLIENT" => Session::get('id_client'), "TGLMIN" => "", "TGLMAX" => "",
                "NOREGIRTER_KLINIK" => $noregister, "RECEIPT_NO" => "", "MODE" => "RESEP_HISTORY"
            ],
            'headers' => ['Content-Type' => 'application/json', 'Authorization' => '']
        ]);
        $body = json_decode($response->getBody()->getContents(), true);
        return is_array($body['response'] ?? null) ? $body['response'] : [];
    }

    // Item satu transaksi (billv2). Tiap baris memuat RECEIPT_NO, ITEM_ID, BARCODE, NAMABARANG, KATEGORI, dst.
    private function ambilItemTransaksi($receiptNo)
    {
        $client = new Client();
        $response = $client->post($this->ws_inv . 'index.php/api/sales/billv2', [
            'json' => [
                "NOREGIRTER_KLINIK" => $receiptNo, "RECEIPT_NO" => $receiptNo, "MODE" => "RCPT",
                "IDCLIENT" => Session::get('id_client'), "TGLMIN" => "", "TGLMAX" => "", "MEMBERSHIP" => ""
            ],
            'headers' => ['Content-Type' => 'application/json', 'Authorization' => '']
        ]);
        $body = json_decode($response->getBody()->getContents(), true);
        return is_array($body['response'] ?? null) ? $body['response'] : [];
    }

    // Satu transaksi hanya bisa dibatalkan utuh (void), jadi yang boleh dihapus adalah transaksi
    // berisi tepat satu item yang kategorinya tidak terlindungi.
    private function itemBisaDihapus($item)
    {
        return !$this->kategoriTerlindung($item['KATEGORI'] ?? '');
    }

    // Batas transaksi yang dibuka per kunjungan, supaya pencocokan tidak membanjiri server billing.
    private const MAKS_TRANSAKSI_DIBUKA = 30;

    // Nama kolom total pada header transaksi berbeda-beda antar versi API billing.
    // null = tidak ada satu pun yang dikenali, jadi transaksi tetap dibuka untuk diperiksa.
    private function totalHeader(array $h)
    {
        foreach (['GRANDTOTAL', 'GRAND_TOTAL', 'TOTALBAYAR', 'TOTAL_BAYAR', 'TOTALAMOUNT', 'TOTAL', 'SUBTOTAL'] as $k) {
            if (isset($h[$k]) && $h[$k] !== '' && $h[$k] !== null) {
                return number_format((float) $h[$k], 2, '.', '');
            }
        }
        return null;
    }

    private function samakanNama($v)
    {
        return strtoupper(trim(preg_replace('/\s+/', ' ', (string) $v)));
    }

    // Billing (history_berobat_pasien) tidak memuat nomor transaksi, jadi baris billing dicocokkan ke
    // transaksi penjualan lewat nama item dan nilai total. Kategori tidak ikut dicocokkan karena
    // penamaannya berbeda antara billing (mis. 'TENAGA AHLI') dan master barang (mis. 'JASA').
    // Kegagalan di sini tidak boleh mengganggu tampilan billing: baris tetap tampil, hanya tanpa tombol hapus.
    private function tandaiBisaHapus(array $rows, $noregister)
    {
        if (!isset($rows[0]['DETAIL']) || !is_array($rows[0]['DETAIL'])) {
            return $rows;
        }
        $detail = &$rows[0]['DETAIL'];
        foreach ($detail as $i => $d) {
            $detail[$i]['BISA_HAPUS'] = false;
        }

        try {
            // Nilai baris billing yang mungkin bisa dihapus -> dipakai untuk mengurutkan transaksi mana yang diperiksa dulu.
            $totalKandidat = [];
            foreach ($detail as $d) {
                if (!$this->kategoriTerlindung($d['KATEGORI'] ?? '')) {
                    $totalKandidat[number_format((float) ($d['TOTALAMOUNT'] ?? 0), 2, '.', '')] = true;
                }
            }

            $header = $this->ambilHeaderTransaksi($noregister);

            // Transaksi yang nilainya sama dengan salah satu baris billing diperiksa lebih dulu;
            // sisanya tetap diperiksa (nilai header bisa beda karena pembulatan/diskon) sampai batas.
            $utama = [];
            $sisa = [];
            foreach ($header as $h) {
                $rn = (string) ($h['RECEIPT_NO'] ?? '');
                if ($rn === '') {
                    continue;
                }
                $total = $this->totalHeader($h);
                if ($total === null || isset($totalKandidat[$total])) {
                    $utama[] = $rn;
                } else {
                    $sisa[] = $rn;
                }
            }

            $transaksi = [];
            $dibuka = 0;
            foreach (array_merge($utama, $sisa) as $rn) {
                if ($dibuka >= self::MAKS_TRANSAKSI_DIBUKA) {
                    break;
                }
                $dibuka++;
                $items = $this->ambilItemTransaksi($rn);
                if (count($items) === 1 && $this->itemBisaDihapus($items[0])) {
                    if (empty($items[0]['RECEIPT_NO'])) {
                        $items[0]['RECEIPT_NO'] = $rn;
                    }
                    $transaksi[] = $items[0];
                }
            }

            $cocok = 0;
            foreach ($detail as $i => $d) {
                if ($this->kategoriTerlindung($d['KATEGORI'] ?? '')) {
                    continue;
                }
                foreach ($transaksi as $k => $t) {
                    if ($this->samakanNama($d['ITEM'] ?? '') === $this->samakanNama($t['NAMABARANG'] ?? '')
                        && abs((float) ($d['TOTALAMOUNT'] ?? 0) - (float) ($t['TOTALAMOUNT'] ?? 0)) < 0.01) {
                        $detail[$i]['BISA_HAPUS'] = true;
                        $detail[$i]['RECEIPT_NO'] = $t['RECEIPT_NO'];
                        $detail[$i]['ITEM_ID'] = $t['ITEM_ID'] ?? null;
                        unset($transaksi[$k]);
                        $cocok++;
                        break;
                    }
                }
            }

            // Jejak diagnosa bila tombol hapus tidak muncul: terlihat di log channel 'administrasi'.
            \Log::channel('administrasi')->debug('COCOK_TRANSAKSI', [
                'noregister' => $noregister,
                'baris_billing' => count($detail),
                'kandidat_total' => count($totalKandidat),
                'header' => count($header),
                'header_total_cocok' => count($utama),
                'transaksi_dibuka' => $dibuka,
                'transaksi_item_tunggal' => count($transaksi) + $cocok,
                'baris_bisa_hapus' => $cocok,
                'item_tak_cocok' => array_values(array_map(function ($t) {
                    return ($t['NAMABARANG'] ?? '?') . ' @' . ($t['TOTALAMOUNT'] ?? '?');
                }, array_slice($transaksi, 0, 10))),
            ]);
        } catch (\Exception $e) {
            \Log::warning('Administrasi: gagal mencocokkan transaksi billing: ' . $e->getMessage());
        }
        unset($detail);

        return $rows;
    }

    // Master jasa & tindakan (bucket JASA), tanpa item yang diarsipkan.
    // Kirim refresh=1 untuk membuang cache dan mengambil daftar terbaru dari server.
    public function daftar_jasa(Request $request)
    {
        try {
            if ($request->boolean('refresh')) {
                Cache::forget($this->kunciCacheJasa());
            }
            $cache = $this->jasaCache();
            return response()->json([
                'metadata' => ['code' => 200, 'message' => 'OK'],
                'diperbarui' => $cache['waktu'],
                'response' => $cache['data']
            ]);
        } catch (\Exception $e) {
            return response()->json(['metadata' => ['code' => 201, 'message' => $this->pesanRamah($e)]]);
        }
    }

    // Tambah 1 item jasa ke tagihan kunjungan. Nama & harga diambil dari master jasa
    // di server, bukan dari kiriman browser, sehingga hanya item JASA yang bisa masuk.
    public function tambah_jasa(Request $request)
    {
        try {
            date_default_timezone_set("Asia/Jakarta");

            $request->validate([
                'NOPENDAFTARAN' => 'required',
                'NOMR' => 'required',
                'BARCODE' => 'required',
                'QTY' => 'required|numeric|min:1',
            ]);

            $jasa = null;
            foreach ($this->ambilJasa() as $row) {
                if ((string) $row['BARCODE'] === (string) $request->BARCODE) {
                    $jasa = $row;
                    break;
                }
            }
            if (!$jasa) {
                return response()->json(['metadata' => ['code' => 201, 'message' => 'Item bukan jasa/tindakan atau sudah diarsipkan.']]);
            }

            $qty = (float) $request->QTY;
            $harga = (float) ($jasa['HARGAJUAL'] ?? 0);

            // Harga yang dilihat petugas di layar (dari daftar cache) harus sama dengan harga server saat ini.
            if ($request->filled('HARGA_TAMPIL') && abs((float) $request->HARGA_TAMPIL - $harga) > 0.5) {
                return response()->json(['metadata' => ['code' => 201, 'message' =>
                    'Harga jasa berubah dari Rp ' . number_format((float) $request->HARGA_TAMPIL, 0, ',', '.')
                    . ' menjadi Rp ' . number_format($harga, 0, ',', '.')
                    . '. Daftar sudah diperbarui, periksa lalu tambahkan lagi.']]);
            }

            $data['header'] = [
                "RECEIPT_NO" => '',
                "MEMBERSHIP_ID" => $request->NOMR,
                "IDUSER" => Session::get('user_id'),
                "TANGGAL" => date('Y-m-d H:i:s'),
                "IDPAYEMENT" => 0,
                "NOTE" => $request->NOMR . ',' . ($request->NAMAPASIEN ?? ''),
                "SUBTOTAL" => 0,
                "TAXPERCENT" => 0,
                "TAXAMOUNT" => 0,
                "TOTALBAYAR" => 0,
                "POTONGAN" => 0,
                "KEMBALIAN" => 0,
                "NO_REGISTER" => $request->NOPENDAFTARAN,
                "POLI_RUANG" => $request->POLI,
                "DPJP" => $request->NAMADOKTER,
                "ID_LOKASI" => Session::get('lokasi_inv'),
                "IDCLIENT" => Session::get('id_client'),
                "OBAT_OBATAN" => 0,
                "details" => [[
                    "BARCODE" => $jasa['BARCODE'],
                    "NAMA" => $jasa['NAMA'],
                    "MEREK" => $jasa['SATUAN_KECIL'] ?? '',
                    "QTY" => $qty,
                    "HARGA" => $harga,
                    "TOTALAMOUNT" => $qty * $harga,
                    "FLAG" => 'NEW LINE',
                ]],
            ];

            // Cegah kiriman ganda (klik dua kali / koneksi lambat): jasa+kunjungan+user yang sama
            // tidak diproses lagi dalam 5 detik. Penambahan sengaja berikutnya tetap bisa setelah itu.
            $kunci = 'adm_tambah_' . md5($request->NOPENDAFTARAN . '|' . $jasa['BARCODE'] . '|' . Session::get('user_id'));
            if (!Cache::add($kunci, 1, 5)) {
                return response()->json(['metadata' => ['code' => 201, 'message' => 'Permintaan yang sama baru saja dikirim. Tunggu sebentar, lalu periksa tagihan.']]);
            }

            $client = new Client();
            $response = $client->post($this->ws_inv . 'index.php/api/sales/insert_sales_v3', [
                'json' => $data,
                'headers' => ['Content-Type' => 'application/json', 'Authorization' => '']
            ]);
            $body = $response->getBody()->getContents();

            $hasil = json_decode($body, true);
            if (($hasil['metadata']['code'] ?? null) == 200) {
                $this->audit('TAMBAH_JASA', [
                    'noregister' => $request->NOPENDAFTARAN, 'nomr' => $request->NOMR,
                    'barcode' => $jasa['BARCODE'], 'item' => $jasa['NAMA'], 'qty' => $qty, 'harga' => $harga,
                ]);
            } else {
                Cache::forget($kunci);
            }
            return $body;
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['metadata' => ['code' => 201, 'message' => collect($e->errors())->flatten()->first()]]);
        } catch (\Exception $e) {
            return response()->json(['metadata' => ['code' => 201, 'message' => $this->pesanRamah($e)]]);
        }
    }

    // Jejak audit: siapa menambah/menghapus jasa pada kunjungan mana.
    private function audit($aksi, array $data)
    {
        \Log::channel('administrasi')->info($aksi, $data + [
            'user_id' => Session::get('user_id'),
            'user' => Session::get('username'),
            'lokasi' => Session::get('lokasi_caption'),
            'ip' => request()->ip(),
        ]);
    }

    // Ubah galat teknis (Guzzle/API eksternal) jadi kalimat yang dimengerti petugas.
    // Detail aslinya tetap dicatat di log aplikasi.
    private function pesanRamah(\Exception $e)
    {
        \Log::warning('Administrasi billing: ' . $e->getMessage());

        if ($e instanceof \GuzzleHttp\Exception\ConnectException) {
            return 'Tidak dapat terhubung ke server billing. Periksa koneksi, lalu coba lagi.';
        }
        if ($e instanceof \GuzzleHttp\Exception\RequestException && $e->hasResponse()) {
            $status = $e->getResponse()->getStatusCode();
            $isi = json_decode((string) $e->getResponse()->getBody(), true);
            $pesan = $isi['metadata']['message'] ?? '';
            if ($status >= 500) {
                return 'Server billing sedang bermasalah. Coba lagi beberapa saat lagi.';
            }
            if (stripos($pesan, 'lokasiId') !== false || stripos($pesan, 'clientId') !== false) {
                return 'Data lokasi/klien pada akun Anda belum lengkap. Silakan login ulang.';
            }
            return $pesan !== '' ? $pesan : 'Permintaan ditolak server billing (kode ' . $status . ').';
        }
        return 'Terjadi kesalahan: ' . $e->getMessage();
    }

    // Masa berlaku cache master jasa: 3 jam, lalu diambil ulang dari server (atau lewat tombol muat ulang).
    private const TTL_JASA = 10800;

    // Penambahan jasa selalu memakai data segar supaya harga yang dibebankan tidak basi.
    private function ambilJasa()
    {
        return $this->ambilJasaDariServer();
    }

    private function kunciCacheJasa()
    {
        return 'adm_jasa_v2_' . Session::get('id_client') . '_' . Session::get('lokasi_inv');
    }

    // Isi cache: ['waktu' => saat diambil dari server, 'data' => daftar jasa].
    private function jasaCache()
    {
        return Cache::remember($this->kunciCacheJasa(), self::TTL_JASA, function () {
            return ['waktu' => date('Y-m-d H:i:s'), 'data' => array_values($this->ambilJasaDariServer())];
        });
    }

    private function ambilJasaDariServer()
    {
        $client = new Client();
        $response = $client->get($this->ws_inv . 'index.php/api/inventory/jasa_group_items', [
            'query' => [
                'clientId' => Session::get('id_client'),
                'lokasiId' => Session::get('lokasi_inv'),
                'bucket' => 'JASA',
                'limit' => 1000,
                'sortField' => 'NAMA',
                'sortOrder' => 'ASC',
            ],
            'headers' => ['Content-Type' => 'application/json', 'Authorization' => '']
        ]);
        $body = json_decode($response->getBody()->getContents(), true);
        $rows = is_array($body['response'] ?? null) ? $body['response'] : [];

        return array_filter($rows, function ($j) {
            return (string) ($j['ARSIPKAN'] ?? '0') !== '1';
        });
    }
}
