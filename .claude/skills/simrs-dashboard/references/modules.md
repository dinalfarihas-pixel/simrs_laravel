# Peta Modul SIMRS backend_dashboard

Format: **Domain** — halaman (GET) · view `resources/views/…` · komponen `resources/js/components/…` · controller (grup API CI).
Daftar lengkap tag komponen ↔ file `.vue` ada di `resources/js/app.js` (dikelompokkan dengan komentar per domain).

## Controller ↔ grup API CodeIgniter

| Controller | Jumlah method | Grup `index.php/api/…` | Isi |
|---|---|---|---|
| `SatusehatController` (3.5k baris, terbesar) | 85 | Triaseigd, sales, data_referensi, transaksi_pasien, barang | **Bukan hanya SatuSehat**: triase IGD, SOAP/CPPT, kajian awal dokter/perawat, pindah ruangan, resep/kirim obat, sales/tindakan, resume pulang, diagnosa, konsul, template, TTE (tanda tangan PDF via `10.0.8.200`), token & KFA SatuSehat |
| `PersediaanController` | 62 | barang, laporan, penerimaan, opname | Inventory: master item, penerimaan, stok opname, kartu stok, permintaan/distribusi/transfer, pemakaian obat |
| `DatareferensiController` | 41 | data_referensi, transaksi_pasien | Referensi (dokter, poli, ruangan, bed, ICD, kecamatan, cara pulang), SEP/SPRI PDF (FPDF), kontrol ulang BPJS, surat transfer, diet |
| `PenunjangController` | 36 | data_referensi, Resumepulang, penunjang, sales | Order penunjang lab/radiologi, template lab, konsultasi dokter, fisioterapi, siriraj, resiko jatuh, master pasien, gizi |
| `RekamMedisElektronik` | 25 | Resumepulang, Triaseigd | Cairan, consent/ttd penanggung jawab, discharge planning, pemberian & rekonsiliasi obat, laporan verif klaim |
| `DatakunjunganpasienController` | 17 | transaksi_pasien, mobil_jkn | Data kunjungan/rawat pasien, iCare BPJS, riwayat kunjungan, pasien rawat inap, jadwal operasi, pasien meninggal |
| `MonitoringController` | 16 | transaksi_pasien, mobil_jkn, laporan | Monitoring RME, klaim, peresepan, LOS, cost, waktu layan, antrean BPJS, log user |
| `PurchasingController` | 15 | purchase_order | Purchase request, telaah, approval, disposisi, PO, notifikasi |
| `LoginController` | 14 | data_referensi | Login, session, menu, profil RS, ganti password |
| `BpjsApiController` | 13 | Bpjs_api, transaksi_pasien | VClaim/Antrol: SEP (create/sync/hapus), peserta, poli, wilayah, historis. Respons BPJS didekompresi `LZString::decompressFromEncodedURIComponent` |
| `UploadController` | 12 | data_referensi | Upload lampiran/canvas, proxy-image, daftar lampiran pasien |
| `IcuController` | 10 | icu | Checklist masuk ICU/HCU, pemantauan intensif |
| `PengkajianNyeriController` | 10 | penunjang | Pengkajian nyeri, skrining infeksius, pengkajian terminal (**contoh pola terbaik**) |
| `KaryawanController` | 10 | presensi | Master karyawan, presensi, laporan per bidang/ruang |
| `PerencanaanController` | 10 | data_referensi, barang | Perencanaan kebutuhan + verifikasi |
| `AdminController` | 7 | admin | User management, assign menu |
| `EdukasiPasienController` | 7 | penunjang | Hambatan & sesi edukasi pasien, ttd edukasi |
| `DashboardController` | 7 | laporan | Kunjungan harian, okupasi bed, kunjungan poli |
| `AdministrasiBillingController` | 5 | sales (ws_inv) | Billing kunjungan, jasa, void sales |
| `CaseManager/CaseManagerController` | 5 | Case_manager | Case manager CRUD |
| `PersalinanController` | 4 | persalinan | Catatan persalinan & partograf (get/save/finalize) |
| `KlaimManajemenController` | 4 | transaksi_pasien, laporan | Dashboard klaim |
| `MasterController` | 2 | data_referensi | Master dokter |
| `ttdService` (`app/Services`) | – | – | Generate & tanda tangan PDF resume medis (di-inject ke SatusehatController) |

## Domain → halaman → komponen

- **Dashboard** — `/dashboard-umum`, `/dashboard2`, `/ketersediaan-tempattidur` · `views/dashboard*` · `components/Dashboard*`, `dashboard/`
- **Persediaan/Farmasi** — `/itembarang`, `/penerimaan-barang`, `/stock-opname`, `/laporan-opname`, `/distribusi`, `/permintaanlogistik`, `/permintaanlist`, `/pemakaianobat`, `/persediaan/list-transfer`, `/persediaan/do-transfer`, `/retur-barang-kedepo` · `views/persediaan/` · `components/persediaan/` (subfolder `stockopname`, `transfer_barang`, `retur`, `pengeluaran`)
- **Perencanaan** — `/perencanaan`, `/detailperencanaan`, `/verifperencanaan`, `/varifdetails` · `components/perencanaan/`
- **Purchasing** — `/purchase-request`, `/purchasingtrans`, `/purchase-order`, `/printout-pr` · `components/purchasing/`
- **Kunjungan / Rawat** — `/datarawatpasien`, `/datarawatpasien_v2`, `/poliklinik`, `/resume-pulang`, `/resume-rawat-jalan/{noregister}`, `/riwayat-pelayanan` · `components/kunjungan/`, `rawatjalan/`, `roledokter/`
- **IGD** — `/list-pasien-igd` · `components/igd/` (Triase, ListPasienIgd)
- **Rekam Medis (RME)** — `/medical-record`, `/kajian-resiko-jatuh/{noregister}`, `/siriraj-score/{noregister}`, `/jadwal-kontrol`, `/jadwal-kontrol/form/{noregister}`, `/print-kontrol-ulang`, `/laporan-verif`, `/pasien-meninggal` · `views/medicalrecord/` · `components/Medicalrecord/` (EWS, PemantauanCairan, Kontrol, LaporanVerif, pengkajian nyeri/infeksius/terminal, edukasi, consent, rekonsiliasi obat)
- **SOAP / CPPT / TTE** — `/print-soap/{noregister}`, `/print-resume-pulang/{noregister}`, `/dosign`, `/list_tte`, `/signup` · `components/soap/`, `sign/`, `tte/`
- **Penunjang** — `/radiologi`, `/print-radiologi`, `/print-hasil-lab`, `/laboratorium-template`, `/permintaan-fisioterapy`, `/mappingradiologi` · `components/obatdanpenunjang/`, `radiologi/`, `laboratorium/`, `penunjang/`
- **ICU/HCU** — `/list-pasien-icu`, `/checklist-masuk-icu-hcu/{noregister}`, `/pemantauan-intensif-icu/{noregister}` · `components/icu/`, `icu-monitoring/`
- **Bedah / Anestesi** — `/list-pasien-bedah`, `/persetujuan-anastesi` · `components/rawatbedah/`, `operasi/`, `anastesi/`
- **Persalinan** — `/catatan-persalinan/{noregister}`, `/partograf/{noregister}` · `components/persalinan/`
- **Gizi** — `/konfirmasi-terima-diet` · `components/gizi/`
- **Konsultasi dokter** — `/konsultasi-dokter/{noregister}`, `/terima-konsul-dokter` · `components/konsultasiDokter/`
- **BPJS / SEP / Antrean** — `/terbitsep`, `/sync-sep`, `/edit-sep`, `/batal-antrean` · `components/admin/` (TerbitkanSEP, SyncSEP, HistorisBpjs), `BPJS/`, `antrean/`
- **Klaim** — `/klaim-manajemen`, `/dashboard-klaim` · `components/Klaimmanajemen/`, `monitoring/KlaimManajemenComponent.vue`
- **Monitoring** — `/monitoringrme`, `/costmonitoring`, `/lospasien`, `/timeservice`, `/statustracking`, `/peresepan-monitoring`, `/loguser`, `/monitoring-penyerahan-resep` · `components/monitoring/`
- **SatuSehat / KFA** — `/satusehatmonitoring` · `components/satusehat/`, `KFA/`
- **Pasien** — `/master-pasien` · `components/pasien/`
- **Admin** — `/admin/user-management`, `/ruang-master`, `/register-user`, `/ticketingsistem` · `components/admin/`, `Register/`
- **Karyawan** — `/employe/list-emp`, `/employe/report`, `/laporan-perbidang` · `components/karyawan/`
- **Case manager** — `components/case_manager/`
- **Utilitas** — `/donwload`, `/rubahpassword` · `components/utilitas/`
