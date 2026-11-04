---
name: simrs-dashboard
description: Pengetahuan arsitektur project SIMRS backend_dashboard (Laravel 8 + Vue 3 + PrimeVue 4, proxy ke API CodeIgniter ws-simrs.net). Gunakan setiap kali menambah/mengubah fitur, route, controller, komponen Vue, blade view, atau men-debug error di project ini (login, session, Guzzle/SSL, build JS).
---

# SIMRS backend_dashboard — Pengetahuan Project

Aplikasi web **SIMRS (Sistem Informasi Manajemen Rumah Sakit)**. Repo ini **bukan pemilik data**:
semua data dibaca/ditulis lewat REST API eksternal (CodeIgniter) di `ws-simrs.net`.
Laravel di sini berfungsi sebagai **frontend host + proxy API berbasis session**.

Detail per modul: lihat [references/modules.md](references/modules.md).

## Stack

| Lapisan | Teknologi |
|---|---|
| Backend | Laravel 8, PHP 7.4 (lokal: `C:\php74`), Guzzle 7, `paterakis/lz-string-php` (dekompresi BPJS), `tcg/voyager` (tidak dipakai aktif) |
| Frontend | Vue 3.4 (Options API), PrimeVue 4 (preset `@primeuix/themes/nora`), AdminLTE 3 + jQuery + Bootstrap (template di `public/template/`) |
| Build | Laravel Mix 6 (`webpack.mix.js`) → `public/js/app.js` + lazy chunk `public/js/main/*.js` |
| Lib JS lain | axios, mitt (EventBus), vue-toast-notification, vue-loading-overlay, numeral, xlsx, jspdf/html2pdf/pdf-lib, chart.js/echarts, quill, qrcode, jsbarcode, dayjs/moment |
| PDF server | FPDF + phpqrcode di `app/Libraries/` (di-`require_once` manual) |
| Database lokal | **Tidak dipakai** (tidak ada query DB; `User` model bawaan saja) |

## Alur Request (pola utama)

```
Browser ──GET /halaman──► routes/web.php ──► view('folder.nama')   (blade tipis)
                                               └─ <banner-component msg="..."> + <komponen-vue>
Komponen Vue ──axios.post('/endpoint', payload)──► routes/web.php (POST, //api)
        ──► XxxController@method ──Guzzle──► {ws_simrs|ws_inv}index.php/api/<ci_controller>/<method>
        ◄── body JSON mentah diteruskan apa adanya ◄──
```

- **GET** route = halaman (closure `return view(...)`). **POST** route bertanda `//api` = proxy JSON.
- Blade view hampir selalu 3–5 baris:
  ```blade
  @extends('layout.master')
  @section('content')
  <banner-component msg="Jadwal Kontrol Ulang"></banner-component>
  <jadwal-kontrol></jadwal-kontrol>
  @endsection
  ```
- `layout/master.blade.php` memuat AdminLTE, `<sidebar-component>` (menu dari `POST /get_menu`), dan `js/app.js?v=<hash manual>`. Layout cetak: `layout/printout.blade.php`.
- Parameter URL (mis. `/kajian-resiko-jatuh/{noregister}`) **tidak** diteruskan ke view; komponen Vue membacanya sendiri: `window.location.pathname.split('/').pop()`.

## Backend: konvensi controller

Setiap controller punya constructor yang sama:

```php
protected $ws_inv;
protected $ws_simrs;
public function __construct()
{
    if(config('app.APP_DEBUG')==True) {
        $this->ws_inv = config('app.ws_inv_dev');
        $this->ws_simrs = config('app.ws_sim_dev');
    } else {
        $this->ws_inv = config('app.ws_inv_prod');
        $this->ws_simrs = config('app.ws_sim_prod');
    }
}
```

- `ws_simrs` (`WS_SIM_*` = `https://ws-simrs.net/ws_sim_v2/`) → data klinis/referensi/RME.
- `ws_inv` (`WS_INV_*` = `https://ws-simrs.net/ws_posindo_v2.1/`) → inventory, sales/billing, barang.
- `ws_satu_sehat` (`WS_SATU_SEHAT`) → `api-satusehat.kemkes.go.id` (OAuth token + KFA).
- **Pilihan dev/prod ditentukan `APP_DEBUG`**, bukan `APP_ENV`. Saat ini dev & prod di `.env` menunjuk URL yang sama (URL `_tester` di-comment).
- Base URL sudah diakhiri `/`, jadi gabung langsung: `$this->ws_simrs . 'index.php/api/penunjang/save_pengkajian_nyeri'`.
- Beberapa tempat masih **hardcode** `'https://ws-simrs.net/ws_sim_v2'` (tanpa slash akhir, lalu `"/index.php/..."`), mis. `LoginController::get_menu/getprofile_rs/chagepassword`. TTE memakai IP internal `http://10.0.8.200/api/sign/pdf`.

Pola method standar (contoh terbaik: `PengkajianNyeriController`, `EdukasiPasienController`, `IcuController`):

```php
public function simpan(Request $request)
{
    try {
        date_default_timezone_set("Asia/Jakarta");
        $json = [
            'id_client'  => Session::get('id_client'),
            'noregister' => $request->noregister,
            // ... field dari $request
            'username'   => Session::get('user_id'),
        ];
        $url = $this->ws_simrs . 'index.php/api/penunjang/save_xxx';
        $client = new Client();
        $response = $client->post($url, [
            'json'    => $json,
            'headers' => ['Content-Type' => 'application/json', 'Authorization' => ''],
            'timeout' => 30,
            'connect_timeout' => 10,
        ]);
        return $response->getBody()->getContents();
    } catch (\Throwable $e) {
        return response()->json(['code' => 500, 'message' => $e->getMessage()]);
    }
}
```

- GET-style di API CI sering dikirim sebagai **POST dengan parameter di path**: `.../get_pengkajian_nyeri/{noregister}/{id_client}` dengan `'json' => ''`.
- `id_client` (multi-RS/tenant) dan `user_id` **selalu diambil dari Session**, jangan dari request.
- Controller lama sering tanpa try/catch dan tanpa timeout — saat menulis kode baru, ikuti pola di atas.
- Facade dipakai lewat alias global: `use Session;`, `use GuzzleHttp\Client;`.

### Grup endpoint CI (`index.php/api/<x>/`)
`data_referensi` (terbanyak), `Triaseigd`/`triaseigd`, `transaksi_pasien`, `barang`, `sales`, `Resumepulang`, `penunjang`, `laporan`, `purchase_order`, `presensi`, `icu`, `persalinan`, `mobil_jkn`, `Bpjs_api`, `penerimaan`, `admin`, `Case_manager`, `opname`, `referensi`, `inventory`. Nama CI **case-sensitive di beberapa server** — salin persis dari kode yang sudah ada.

### Format respons API
Umumnya `{ "metadata": { "code": 200, "message": "..." }, "response": ... }`. Di Vue paling sering dibaca `res.data.response`; error proxy Laravel berbentuk `{code:500, message}`.

## Autentikasi & Session

- Login: `GET /login` & `/` → `loginform.blade.php` → `POST /dologin` → `LoginController@authentication` → API `data_referensi/userloginv3` (body `{pass, username}`) → isi Session → `redirect()->intended('/dashboard-umum')`. Gagal → `back()->with('loginError')`. `GET /dologin` di-redirect ke `/login`.
- Setelah login, `getprofile_rs($id_client)` mengisi data RS.
- **Tidak memakai Laravel Auth**; status login = keberadaan session `success`.
- Key session penting: `id_client`, `user_id` (username login), `username` (nama), `groupuser`, `kodedokter`, `kodedokter_bpjs`, `nik`, `id_lokasi`, `lokasi_inv`, `lokasi_caption`, `kodeunit_login`, `JENIS_NOINDUK`, `NOINDUK`, `JABATAN`, `USER_IGD`, `nama_rs`, `LINK_LOGO`, `alamat`, `banner_rs`, `satu_sehat_idclient`, `satu_sehat_client_secret`, `password_sess`.
- Endpoint kecil untuk Vue membaca session: `/getusername`, `/datajabatan_user`, `/get_lokasi_tovue`, `/get_kode_unit_user`, `/get_banner`, `/data_rumahsakit`.
- Session driver `file`, lifetime 120 menit.

### Middleware (`app/Http/Kernel.php`)
| Alias | Isi |
|---|---|
| `oto` (`Otorisasi`) | Redirect ke `login` jika session `success` tidak ada. **Membungkus hampir semua route** di `web.php` dan `employe.php`. Cek menu per user sudah di-comment. |
| `groupaccess` | hanya `groupuser == 'DOKTER'` (grup route-nya di-comment) |
| `penunjang` | hanya `groupuser == 'USER'` |
| `admin` (`isAdmin`) | abort 403 jika `success == 0` |
| `roleuser` | no-op |

CSRF aktif tanpa pengecualian; axios otomatis mengirim cookie `XSRF-TOKEN` → aman untuk POST dari Vue. Form blade wajib `@csrf`.

## Routes

- `routes/web.php` (~1100 baris): `require_once employe.php` di atas, lalu route publik (`/login`, `/`, `/dologin`, `/logout`, `/proxy-image`), lalu **satu grup besar** `Route::group(['middleware'=>['oto']], ...)`.
- `routes/employe.php`: admin user-management, transfer persediaan v3, karyawan (dalam `oto`).
- `routes/api.php` (prefix `/api`, **tanpa session/oto**): endpoint untuk dipanggil sistem lain (upload lampiran, KFA, cetak diet, SEP, printResume_medis, ttd_file_v3, generateSPRI, dll).
- `routes/web copy.php`, `SatusehatController copy.php`, `sidebar.blade copy.php` = arsip lama, **jangan diedit**.
- Ada route duplikat (mis. `/logout`, `/itembarang`, `/konsultasi-dokter/{noregister}` dua kali) — yang terakhir menang.
- Setelah ubah route: `php artisan route:clear`.

## Frontend: konvensi

- Entry: `resources/js/app.js` — `createApp({})`, registrasi global komponen PrimeVue, lalu **semua komponen halaman didaftarkan di sini** dengan `defineAsyncComponent(() => import(/* webpackChunkName: "nama-chunk" */ './components/...vue'))`. Mount ke `#app` (di master layout).
- Komponen sync (selalu dimuat): `sidebar-component`, `banner-component`, `global-alert`, `itemTemplate`, `downloadExcel`.
- Alias kompatibilitas PrimeVue 3→4: `Calendar`→DatePicker, `Dropdown`→Select, `InputSwitch`→ToggleSwitch. Tabs memakai API baru `Tabs/TabList/Tab/TabPanels/TabPanel` (lihat `fix_tabs.py`).
- Global: `this.$numeral(v, '0,0')`, `this.$exportExcel(data, filename)`, `this.$toast` (vue-toast-notification), `this.$confirm` (PrimeVue).
- Komunikasi antar komponen: `import { EventBus } from '../bus'` (wrapper mitt: `$on/$off/$emit`). Alert global: `EventBus.$emit('show-alert', { type, title, message })` → `TheGlobalAlert.vue`.
- Komponen ditulis **Options API** (`props`, `data()`, `mounted`, `methods`, `async/await axios.post`). Ikuti gaya ini, bukan `<script setup>`.
- `app.js` menghapus draft localStorage yang key-nya berakhiran `YYYYMMDD` dan lebih dari 3 hari — key draft form mengikuti pola ini.
- Dark mode: selector `.dark-mode` di body.

## Menambah fitur baru (checklist)

1. **Controller**: tambah method di controller domain terkait (pola try/catch + Guzzle di atas), ambil `id_client`/`user_id` dari Session.
2. **Route POST** di dalam grup `oto` di `routes/web.php`, dekat route sejenis, beri komentar `//api`.
3. **Komponen Vue** di `resources/js/components/<domain>/NamaComponent.vue`.
4. **Daftarkan** di `resources/js/app.js` di bawah komentar domain yang sesuai, dengan `webpackChunkName` domain tersebut.
5. **Blade view** di `resources/views/<domain>/nama.blade.php` (extends `layout.master`, `banner-component` + tag komponen).
6. **Route GET** halaman `Route::get('/nama-halaman', function () { return view('domain.nama'); });`.
7. **Menu sidebar** berasal dari API (`get_menu`, dikelola via `/admin/user-management`) — bukan dari kode.
8. Build: `npm run dev` / `npm run prod` (atau `npm run watch`). Jika browser masih memuat JS lama, perbarui hash `?v=` di `layout/master.blade.php`.

## Lingkungan lokal & masalah umum

- Jalankan: `php artisan serve` (http://127.0.0.1:8000). `APP_URL` di `.env` = `https://simrs-link.site` (produksi), tidak memengaruhi `url()` lokal.
- **cURL error 60 (SSL)**: PHP lokal butuh CA bundle. Sudah diset di `C:\php74\php.ini`: `curl.cainfo` & `openssl.cafile` = `C:/php74/extras/ssl/cacert.pem`. Jangan menambahkan `'verify' => false` di mana-mana (hanya `getdatalogin` yang memakainya).
- **MethodNotAllowed GET /dologin**: sudah ditangani dengan route GET redirect ke `/login`.
- Login crash `$user['metadata']` undefined → API login gagal/timeout; cek konektivitas ke `ws-simrs.net`.
- `public/js/**` adalah hasil build yang ikut di-commit; diff besar di sana normal setelah build.
- Script `fix_*.py` di root = alat migrasi sekali-pakai Vue2/PrimeVue3 → Vue3/PrimeVue4 (TabView→Tabs, v-table→table, dll). Bukan bagian runtime.
- Zona waktu selalu `Asia/Jakarta` (diset per method).
- Bahasa: UI, nama variabel, dan komentar berbahasa Indonesia; banyak typo historis di nama (mis. `chagepassword`, `donwload`, `UserManajementCompnent`, `simpan_stock_opaname`) — **jangan diganti** karena dipakai sebagai URL/endpoint.
- Jangan pernah menampilkan/menyalin isi rahasia `.env` (APP_KEY, password DB, kredensial SatuSehat).
