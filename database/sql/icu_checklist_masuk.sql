-- ============================================================
-- Tabel: icu_checklist_masuk
-- Deskripsi: Checklist kriteria masuk ICU / HCU
-- MySQL 5.1 compatible (TEXT untuk kolom JSON, TIMESTAMP untuk auto-timestamp)
-- ============================================================

CREATE TABLE IF NOT EXISTS `icu_checklist_masuk` (
  `id_checklist`           INT(11)       NOT NULL AUTO_INCREMENT,
  `noregister`             VARCHAR(50)   NOT NULL,
  `id_client`              VARCHAR(50)   DEFAULT NULL,
  `no_rm`                  VARCHAR(30)   DEFAULT NULL,
  `nama_pasien`            VARCHAR(200)  DEFAULT NULL,
  `ruangan_asal`           VARCHAR(100)  DEFAULT NULL,
  `dokter_perujuk`         VARCHAR(200)  DEFAULT NULL,
  `diagnosa`               TEXT          DEFAULT NULL,
  `tgl_pengajuan`          DATETIME      DEFAULT NULL,
  `unit_tujuan`            VARCHAR(10)   DEFAULT NULL COMMENT 'ICU atau HCU',
  `checklist_masuk_json`   TEXT          DEFAULT NULL COMMENT 'JSON array kriteria masuk yang dicentang',
  `checklist_eksklusi_json` TEXT         DEFAULT NULL COMMENT 'JSON array kriteria eksklusi yang dicentang',
  `catatan_eksklusi`       TEXT          DEFAULT NULL,
  `fisiologis_json`        TEXT          DEFAULT NULL COMMENT 'JSON objek GCS, TTV, dll',
  `is_eligible`            TINYINT(1)    NOT NULL DEFAULT 1 COMMENT '1=eligible, 0=ada eksklusi',
  `hasil_keputusan`        VARCHAR(20)   DEFAULT NULL COMMENT 'Diterima / Ditolak / Dirujuk',
  `unit_alternatif`        VARCHAR(100)  DEFAULT NULL COMMENT 'Diisi jika Dirujuk',
  `alasan_penolakan`       TEXT          DEFAULT NULL COMMENT 'Diisi jika Ditolak',
  `nama_dokter_approver`   VARCHAR(200)  DEFAULT NULL,
  `ttd_digital`            VARCHAR(200)  DEFAULT NULL,
  `tgl_keputusan`          DATETIME      DEFAULT NULL,
  `username`               VARCHAR(100)  DEFAULT NULL,
  `deleted`                TINYINT(1)    NOT NULL DEFAULT 0,
  `deleted_at`             DATETIME      DEFAULT NULL,
  `created_at`             TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id_checklist`),
  KEY `idx_noregister`    (`noregister`),
  KEY `idx_id_client`     (`id_client`),
  KEY `idx_unit_tujuan`   (`unit_tujuan`),
  KEY `idx_hasil`         (`hasil_keputusan`),
  KEY `idx_deleted`       (`deleted`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;
