-- ============================================================
-- CATATAN PERSALINAN — DDL MySQL 5.1 Compatible
-- Charset : utf8 (BUKAN utf8mb4)
-- JSON    : disimpan sebagai TEXT (MySQL 5.1 tak punya tipe JSON)
-- TIMESTAMP: hanya 1 per tabel (updated_at) → hindari Error 1293
-- created_at: DATETIME, diisi oleh aplikasi
-- Key utama  : noregister + id_client
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 1. MASTER PERSALINAN  (1:1 per noregister)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `trx_persalinan` (

  `noregister`                    VARCHAR(20)       NOT NULL COMMENT 'PK = no pendaftaran rawat inap ibu',
  `id_client`                     VARCHAR(20)       DEFAULT NULL COMMENT 'Multi-tenant client ID',

  -- ── TAB 1 · Riwayat Obstetri ─────────────────────────────
  `gravida`                       TINYINT UNSIGNED  DEFAULT 0,
  `partus`                        TINYINT UNSIGNED  DEFAULT 0,
  `abortus`                       TINYINT UNSIGNED  DEFAULT 0,
  `gpa_lengkap`                   VARCHAR(100)      DEFAULT NULL  COMMENT 'mis. G2P1A0, tulis bebas',
  `hpht`                          DATE              DEFAULT NULL  COMMENT 'Hari Pertama Haid Terakhir',
  `hpl`                           DATE              DEFAULT NULL  COMMENT 'Hari Perkiraan Lahir (Naegele)',
  `usia_kehamilan_minggu`         TINYINT UNSIGNED  DEFAULT NULL,
  `usia_kehamilan_hari`           TINYINT UNSIGNED  DEFAULT NULL,
  `jumlah_anc`                    TINYINT UNSIGNED  DEFAULT 0,
  `riwayat_persalinan_sebelumnya` TEXT              DEFAULT NULL,
  `riwayat_sc`                    TINYINT(1)        DEFAULT 0     COMMENT '0=Tidak 1=Ya (penting VBAC)',
  `jumlah_sc`                     TINYINT UNSIGNED  DEFAULT 0,
  `faktor_risiko`                 TEXT              DEFAULT NULL  COMMENT 'JSON array: ["KPD","PEB",...]',
  `faktor_risiko_lain`            VARCHAR(500)      DEFAULT NULL,

  -- ── TAB 2 · Kala I ───────────────────────────────────────
  `kala1_mulai`                   DATETIME          DEFAULT NULL,
  `kala1_lama_menit`              SMALLINT UNSIGNED DEFAULT NULL  COMMENT 'Auto-hitung; simpan hasil final',
  `his_frekuensi`                 VARCHAR(50)       DEFAULT NULL,
  `his_durasi`                    VARCHAR(50)       DEFAULT NULL,
  `djj`                           VARCHAR(20)       DEFAULT NULL,
  `pembukaan_mrs`                 TINYINT UNSIGNED  DEFAULT NULL  COMMENT 'cm saat masuk RS',
  `pembukaan_lengkap_jam`         DATETIME          DEFAULT NULL  COMMENT 'Jam pembukaan 10 cm',
  `penurunan_kepala`              VARCHAR(50)       DEFAULT NULL,
  `ketuban_status`                VARCHAR(10)       DEFAULT NULL  COMMENT 'utuh/pecah',
  `ketuban_jam_pecah`             DATETIME          DEFAULT NULL,
  `ketuban_warna`                 VARCHAR(20)       DEFAULT NULL  COMMENT 'jernih/mekonium/darah',

  -- ── TAB 2 · Kala II ──────────────────────────────────────
  `kala2_mulai`                   DATETIME          DEFAULT NULL,
  `kala2_lama_menit`              SMALLINT UNSIGNED DEFAULT NULL,
  `presentasi`                    VARCHAR(50)       DEFAULT NULL,
  `lilitan_tali_pusat`            VARCHAR(100)      DEFAULT NULL,
  `catatan_kala2`                 TEXT              DEFAULT NULL,

  -- ── TAB 2 · Kala III ─────────────────────────────────────
  `kala3_mulai`                   DATETIME          DEFAULT NULL,
  `kala3_lama_menit`              SMALLINT UNSIGNED DEFAULT NULL,
  `mak3`                          VARCHAR(20)       DEFAULT NULL  COMMENT 'Ya/Tidak/Lengkap (MAK III)',
  `oksitosin_waktu`               DATETIME          DEFAULT NULL,
  `plasenta_lahir`                VARCHAR(20)       DEFAULT NULL  COMMENT 'spontan/manual',
  `plasenta_jam`                  DATETIME          DEFAULT NULL,
  `kelengkapan_plasenta`          VARCHAR(100)      DEFAULT NULL,

  -- ── TAB 2 · Kala IV ringkasan ────────────────────────────
  `kontraksi_uterus`              VARCHAR(50)       DEFAULT NULL,
  `tfu_kala4`                     VARCHAR(20)       DEFAULT NULL,
  `kandung_kemih_kala4`           VARCHAR(50)       DEFAULT NULL,
  `total_perdarahan_kala4`        SMALLINT UNSIGNED DEFAULT NULL  COMMENT 'cc total 2 jam',

  -- ── TAB 2 · Jenis/Cara Persalinan ────────────────────────
  `jenis_persalinan`              VARCHAR(30)       DEFAULT NULL  COMMENT 'Spontan/Vakum/Forcep/SC/VBAC',
  `indikasi_tindakan`             TEXT              DEFAULT NULL,
  `anestesi_sc`                   VARCHAR(100)      DEFAULT NULL,

  -- ── TAB 4 · Plasenta & Tali Pusat ────────────────────────
  `plasenta_berat`                SMALLINT UNSIGNED DEFAULT NULL  COMMENT 'gram',
  `plasenta_ukuran`               VARCHAR(50)       DEFAULT NULL,
  `insersio_tali_pusat`           VARCHAR(30)       DEFAULT NULL  COMMENT 'sentral/marginal/velamentosa',
  `panjang_tali_pusat`            TINYINT UNSIGNED  DEFAULT NULL  COMMENT 'cm',
  `jumlah_pembuluh`               VARCHAR(30)       DEFAULT NULL,
  `kelengkapan_kotiledon_selaput` VARCHAR(100)      DEFAULT NULL,

  -- ── TAB 4 · Perineum / Jalan Lahir ───────────────────────
  `kondisi_perineum`              VARCHAR(30)       DEFAULT NULL,
  `derajat_robekan`               VARCHAR(20)       DEFAULT NULL  COMMENT 'Tidak ada/I/II/III/IV',
  `episiotomi`                    TINYINT(1)        DEFAULT 0,
  `jenis_episiotomi`              VARCHAR(20)       DEFAULT NULL  COMMENT 'mediolateral/medial',
  `penjahitan`                    TINYINT(1)        DEFAULT 0,
  `anestesi_lokal`                VARCHAR(100)      DEFAULT NULL,
  `jenis_benang`                  VARCHAR(50)       DEFAULT NULL,

  -- ── TAB 4 · Perdarahan ───────────────────────────────────
  `perdarahan_kala23`             SMALLINT UNSIGNED DEFAULT NULL  COMMENT 'cc Kala II+III',
  `perdarahan_kala4_ibu`          SMALLINT UNSIGNED DEFAULT NULL  COMMENT 'cc Kala IV',
  `perdarahan_total`              SMALLINT UNSIGNED DEFAULT NULL  COMMENT 'cc; auto-sum di app',
  `catatan_atonia_hpp`            TEXT              DEFAULT NULL,

  -- ── TAB 4 · Obat & Tindakan ──────────────────────────────
  `uterotonika`                   VARCHAR(200)      DEFAULT NULL,
  `cairan_infus`                  VARCHAR(200)      DEFAULT NULL,
  `antibiotik`                    VARCHAR(200)      DEFAULT NULL,
  `transfusi`                     TINYINT(1)        DEFAULT 0,
  `detail_transfusi`              VARCHAR(300)      DEFAULT NULL,

  -- ── TAB 4 · Komplikasi ───────────────────────────────────
  `komplikasi`                    TEXT              DEFAULT NULL  COMMENT 'JSON array checklist',
  `komplikasi_lain`               VARCHAR(300)      DEFAULT NULL,

  -- ── TAB 5 · Diagnosa & Verifikasi ────────────────────────
  `diagnosa_naratif`              TEXT              DEFAULT NULL,
  `waktu_pencatatan`              DATETIME          DEFAULT NULL,
  `diinput_oleh`                  VARCHAR(50)       DEFAULT NULL,
  `dpjp_id`                       VARCHAR(20)       DEFAULT NULL,
  `dpjp_nama`                     VARCHAR(100)      DEFAULT NULL,
  `bidan_id`                      VARCHAR(20)       DEFAULT NULL,
  `bidan_nama`                    VARCHAR(100)      DEFAULT NULL,
  `is_final`                      TINYINT(1)        DEFAULT 0     COMMENT '0=draft 1=final terkunci',

  `username`                      VARCHAR(50)       DEFAULT NULL  COMMENT 'User terakhir input',
  `created_at`                    DATETIME          DEFAULT NULL,
  `updated_at`                    TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`noregister`),
  KEY `idx_persalinan_client` (`id_client`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8
  COMMENT='Catatan persalinan master — 1 baris per kunjungan rawat inap ibu';


-- ────────────────────────────────────────────────────────────
-- 2. DATA BAYI  (1:N — kelahiran ganda)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `trx_persalinan_bayi` (

  `id`                  INT UNSIGNED      NOT NULL AUTO_INCREMENT,
  `noregister`          VARCHAR(20)       NOT NULL,
  `id_client`           VARCHAR(20)       DEFAULT NULL,
  `urutan_bayi`         TINYINT UNSIGNED  NOT NULL DEFAULT 1 COMMENT 'Bayi ke-1, ke-2, dst',
  `jam_lahir`           DATETIME          DEFAULT NULL,
  `jenis_kelamin`       CHAR(1)           DEFAULT NULL  COMMENT 'L / P',
  `kondisi_lahir`       VARCHAR(20)       DEFAULT NULL  COMMENT 'Hidup/Lahir mati/Asfiksia',
  `bb`                  SMALLINT UNSIGNED DEFAULT NULL  COMMENT 'gram',
  `pb`                  DECIMAL(4,1)      DEFAULT NULL  COMMENT 'cm panjang badan',
  `lk`                  DECIMAL(4,1)      DEFAULT NULL  COMMENT 'cm lingkar kepala',
  `ld`                  DECIMAL(4,1)      DEFAULT NULL  COMMENT 'cm lingkar dada',
  `anus`                CHAR(1)           DEFAULT NULL  COMMENT '+ / -',
  `kelainan_kongenital` TEXT              DEFAULT NULL,
  `apgar_data`          TEXT              DEFAULT NULL  COMMENT 'JSON: {m1:{A,P,G,R,Ac,tot},m5:{...},m10:{...}}',
  `profilaksis`         TEXT              DEFAULT NULL  COMMENT 'JSON array: ["IMD","VitK1",...]',
  `ref_rm_bayi`         VARCHAR(20)       DEFAULT NULL  COMMENT 'No RM bayi bila sudah terdaftar',
  `created_at`          DATETIME          DEFAULT NULL,
  `updated_at`          TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  KEY `idx_bayi_noregister` (`noregister`),
  KEY `idx_bayi_client`     (`id_client`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8
  COMMENT='Data bayi per persalinan — 1:N untuk kelahiran ganda';


-- ────────────────────────────────────────────────────────────
-- 3. MONITORING KALA IV time-series  (1:N)
--    4× tiap 15 menit (jam 1) + 2× tiap 30 menit (jam 2) = 6 baris
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `trx_persalinan_kala4` (

  `id`                       INT UNSIGNED      NOT NULL AUTO_INCREMENT,
  `noregister`               VARCHAR(20)       NOT NULL,
  `id_client`                VARCHAR(20)       DEFAULT NULL,
  `waktu`                    DATETIME          NOT NULL  COMMENT 'Waktu pencatatan observasi',
  `tekanan_darah_sistolik`   SMALLINT UNSIGNED DEFAULT NULL COMMENT 'mmHg',
  `tekanan_darah_diastolik`  SMALLINT UNSIGNED DEFAULT NULL COMMENT 'mmHg',
  `nadi`                     SMALLINT UNSIGNED DEFAULT NULL COMMENT 'x/menit',
  `suhu`                     DECIMAL(4,1)      DEFAULT NULL COMMENT 'derajat Celsius',
  `tfu`                      VARCHAR(50)       DEFAULT NULL COMMENT 'mis. "2 jari bawah pusat"',
  `kontraksi`                VARCHAR(50)       DEFAULT NULL COMMENT 'Baik/Sedang/Lemah',
  `kandung_kemih`            VARCHAR(30)       DEFAULT NULL COMMENT 'Kosong/Penuh/Kateter',
  `perdarahan`               SMALLINT UNSIGNED DEFAULT NULL COMMENT 'cc observasi ini',
  `created_at`               DATETIME          DEFAULT NULL,
  `updated_at`               TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  KEY `idx_kala4_noreg_waktu` (`noregister`, `waktu`),
  KEY `idx_kala4_client`      (`id_client`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8
  COMMENT='Monitoring time-series 2 jam Kala IV (15/30 menit)';


-- ────────────────────────────────────────────────────────────
-- 4. DIAGNOSA ICD-10  (1:N)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `trx_persalinan_icd` (

  `id`          INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `noregister`  VARCHAR(20)   NOT NULL,
  `id_client`   VARCHAR(20)   DEFAULT NULL,
  `kode`        VARCHAR(10)   NOT NULL  COMMENT 'Kode ICD-10 mis. O80, O70.1, Z37.0',
  `deskripsi`   VARCHAR(500)  DEFAULT NULL,
  `is_primer`   TINYINT(1)    DEFAULT 0 COMMENT '1 = diagnosa utama (hanya boleh 1 baris)',
  `created_at`  DATETIME      DEFAULT NULL,
  `updated_at`  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  KEY `idx_icd_noregister` (`noregister`),
  KEY `idx_icd_client`     (`id_client`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8
  COMMENT='Diagnosa ICD-10 persalinan — 1:N untuk klaim INA-CBG';
