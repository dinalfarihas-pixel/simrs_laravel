-- ============================================================
--  ALTER TABLE: Keterangan Kehamilan + Pemeriksaan Leopold
--  Tabel  : triase_header   ← tabel yang dipakai PHP (bukan tbl_triase_igd)
--  Update : 2026-07-10
-- ============================================================
--
--  PETUNJUK:
--  Batch 1 — Jalankan jika kolom kehamilan dasar BELUM ada.
--  Batch 2 — Jalankan jika kolom Leopold BELUM ada.
--  Gunakan query CEK di bagian bawah untuk memastikan sebelum ALTER.
-- ============================================================


-- ============================================================
--  BATCH 1: Kehamilan Dasar
--  Skip jika sudah pernah dijalankan.
-- ============================================================
ALTER TABLE `triase_header`
    ADD COLUMN `status_hamil`           TINYINT(1)    NOT NULL DEFAULT 0   COMMENT '0=tidak hamil, 1=hamil'              AFTER `hasil_triase_total`,
    ADD COLUMN `gravida`                TINYINT       NULL DEFAULT NULL     COMMENT 'Hamil ke- (G)'                       AFTER `status_hamil`,
    ADD COLUMN `para`                   TINYINT       NULL DEFAULT NULL     COMMENT 'Jumlah persalinan (P)'               AFTER `gravida`,
    ADD COLUMN `abortus`                TINYINT       NULL DEFAULT NULL     COMMENT 'Jumlah keguguran (A)'                AFTER `para`,
    ADD COLUMN `usia_kehamilan_minggu`  TINYINT       NULL DEFAULT NULL     COMMENT 'Usia kehamilan dalam minggu'         AFTER `abortus`,
    ADD COLUMN `hpl`                    DATE          NULL DEFAULT NULL     COMMENT 'Hari Perkiraan Lahir'                AFTER `usia_kehamilan_minggu`;


-- ============================================================
--  BATCH 2: Pemeriksaan Leopold  ← yang baru
-- ============================================================
ALTER TABLE `triase_header`
    ADD COLUMN `leopold_tfu`            DECIMAL(4,1)  NULL DEFAULT NULL     COMMENT 'Tinggi Fundus Uteri (cm)'                         AFTER `hpl`,
    ADD COLUMN `leopold_i`              VARCHAR(30)   NULL DEFAULT NULL     COMMENT 'Leopold I: kepala/bokong/tidak_teraba'             AFTER `leopold_tfu`,
    ADD COLUMN `leopold_ii_punggung`    VARCHAR(10)   NULL DEFAULT NULL     COMMENT 'Leopold II letak punggung: kiri/kanan'            AFTER `leopold_i`,
    ADD COLUMN `leopold_ii_posisi`      VARCHAR(20)   NULL DEFAULT NULL     COMMENT 'Leopold II posisi: anterior/posterior'            AFTER `leopold_ii_punggung`,
    ADD COLUMN `leopold_iii`            VARCHAR(30)   NULL DEFAULT NULL     COMMENT 'Leopold III bagian terbawah: kepala/bokong/lintang' AFTER `leopold_ii_posisi`,
    ADD COLUMN `leopold_iii_masuk`      TINYINT(1)    NULL DEFAULT NULL     COMMENT 'Masuk PAP: 1=sudah, 0=belum'                      AFTER `leopold_iii`,
    ADD COLUMN `leopold_iv_metode`      VARCHAR(20)   NULL DEFAULT NULL     COMMENT 'Metode Leopold IV: konvergensi/perlimaan'         AFTER `leopold_iii_masuk`,
    ADD COLUMN `leopold_iv_konvergensi` VARCHAR(20)   NULL DEFAULT NULL     COMMENT 'Hasil konvergensi: konvergen/sejajar/divergen'    AFTER `leopold_iv_metode`,
    ADD COLUMN `leopold_iv_perlimaan`   TINYINT       NULL DEFAULT NULL     COMMENT 'Perlimaan: 0-5 (mewakili 0/5 s/d 5/5)'           AFTER `leopold_iv_konvergensi`,
    ADD COLUMN `djj`                    SMALLINT      NULL DEFAULT NULL     COMMENT 'Detak Jantung Janin (x/mnt)'                     AFTER `leopold_iv_perlimaan`,
    ADD COLUMN `djj_reguler`            TINYINT(1)    NULL DEFAULT NULL     COMMENT 'Irama DJJ: 1=reguler, 0=ireguler'                AFTER `djj`;


-- ============================================================
--  CEK: Kolom yang sudah ada
-- ============================================================
-- SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE, COLUMN_COMMENT
-- FROM   INFORMATION_SCHEMA.COLUMNS
-- WHERE  TABLE_SCHEMA = DATABASE()
--   AND  TABLE_NAME   = 'triase_header'
--   AND  COLUMN_NAME IN (
--            'status_hamil','gravida','para','abortus','usia_kehamilan_minggu','hpl',
--            'leopold_tfu','leopold_i','leopold_ii_punggung','leopold_ii_posisi',
--            'leopold_iii','leopold_iii_masuk',
--            'leopold_iv_metode','leopold_iv_konvergensi','leopold_iv_perlimaan',
--            'djj','djj_reguler'
--        )
-- ORDER BY ORDINAL_POSITION;


-- ============================================================
--  ROLLBACK BATCH 2
-- ============================================================
-- ALTER TABLE `triase_header`
--     DROP COLUMN `leopold_tfu`,
--     DROP COLUMN `leopold_i`,
--     DROP COLUMN `leopold_ii_punggung`,
--     DROP COLUMN `leopold_ii_posisi`,
--     DROP COLUMN `leopold_iii`,
--     DROP COLUMN `leopold_iii_masuk`,
--     DROP COLUMN `leopold_iv_metode`,
--     DROP COLUMN `leopold_iv_konvergensi`,
--     DROP COLUMN `leopold_iv_perlimaan`,
--     DROP COLUMN `djj`,
--     DROP COLUMN `djj_reguler`;

-- ============================================================
--  ROLLBACK BATCH 1
-- ============================================================
-- ALTER TABLE `triase_header`
--     DROP COLUMN `status_hamil`,
--     DROP COLUMN `gravida`,
--     DROP COLUMN `para`,
--     DROP COLUMN `abortus`,
--     DROP COLUMN `usia_kehamilan_minggu`,
--     DROP COLUMN `hpl`;
