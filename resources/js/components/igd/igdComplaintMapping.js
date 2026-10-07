/**
 * igdComplaintMapping.js
 * Dibangun dari analisis frekuensi 4.137 baris data riil keluhan_utama &
 * riwayat_penyakit_dahulu IGD RSUD Sultan Iskandar Muda.
 */

// ---------------------------------------------------------------------------
// 1. RIWAYAT PENYAKIT DAHULU — komorbid tersering
// ---------------------------------------------------------------------------
// export const RIWAYAT_KOMORBID = [
//   { value: 'HT',             label: 'Hipertensi',                    freq: 180 },
//   { value: 'DM',             label: 'Diabetes melitus',              freq: 71  },
//   { value: 'DM_TIPE2',       label: 'DM tipe 2',                     freq: 25  },
//   { value: 'ASMA',           label: 'Asma bronkial',                 freq: 23  },
//   { value: 'TB_PARU',        label: 'TB paru',                       freq: 14  },
//   { value: 'KEJANG',         label: 'Riwayat kejang',                freq: 15  },
//   { value: 'DYSPEPSIA',      label: 'Dispepsia',                     freq: 7   },
//   { value: 'THALASEMIA',     label: 'Thalasemia',                    freq: 5   },
//   { value: 'LAMBUNG',        label: 'Penyakit lambung',              freq: 4   },
//   { value: 'KEJANG_DEMAM',   label: 'Kejang demam',                  freq: 4   },
//   { value: 'KOLESTEROL',     label: 'Kolesterol / hiperlipidemia',   freq: 3   },
//   { value: 'PPOK',           label: 'PPOK',                          freq: 3   },
//   { value: 'CHF',            label: 'Gagal jantung (CHF)',           freq: 3   },
//   { value: 'PJK',            label: 'Penyakit jantung koroner',      freq: 2   },
//   { value: 'PJB',            label: 'Penyakit jantung bawaan',       freq: 2   },
//   { value: 'STROKE',         label: 'Stroke',                        freq: 2   },
//   { value: 'LEUKEMIA',       label: 'Leukemia',                      freq: 2   },
//   { value: 'ABORTUS',        label: 'Riwayat abortus',               freq: 2   },
//   { value: 'KANKER_PAYUDARA',label: 'Kanker payudara',               freq: 1   },
//   { value: 'BSC',            label: 'Riwayat SC (BSC)',              freq: 1   },
//   { value: 'POST_OP',        label: 'Riwayat operasi',               freq: 1   },
//   { value: 'HERNIA',           label: 'Hernia',                     freq: 1   }, // <-- Tambahan Baru
// ]

// ---------------------------------------------------------------------------
// 1. RIWAYAT PENYAKIT DAHULU — komorbid tersering
// ---------------------------------------------------------------------------
export const RIWAYAT_KOMORBID = [
  // -- Tidak ada riwayat --------------------------------------------------
  { value: 'TIDAK_ADA',        label: 'Tidak ada riwayat',            freq: null }, // isi dari COUNT("-","tidak ada","disangkal", dst)

  // -- Tier 1: paling sering ------------------------------------------------
  { value: 'HT',                label: 'Hipertensi',                   freq: 180 },
  // DM + DM_TIPE2 digabung (maknanya sama, DM tipe 2 adalah bentuk paling umum dari DM)
  { value: 'DM',                label: 'Diabetes melitus',             freq: 96 },  // 71 (DM) + 25 (DM_TIPE2)

  // -- Tier 2: sering ---------------------------------------------------
  { value: 'ASMA',              label: 'Asma bronkial',                freq: 23 },
  { value: 'TB_PARU',           label: 'TB paru',                      freq: 14 },
  { value: 'KEJANG',            label: 'Riwayat kejang',               freq: 15 },
  { value: 'KEJANG_DEMAM',      label: 'Kejang demam',                 freq: 4  }, // beda dg Riwayat kejang (dipicu demam, khas anak)
  // DYSPEPSIA + LAMBUNG digabung (maknanya sama: gangguan lambung)
  { value: 'GANGGUAN_LAMBUNG',  label: 'Penyakit lambung / dispepsia', freq: 11 },  // 7 (Dispepsia) + 4 (Lambung)
  { value: 'KOLESTEROL',        label: 'Kolesterol / hiperlipidemia',  freq: 3  },
  { value: 'PPOK',              label: 'PPOK',                         freq: 3  },

  // -- Jantung (dipisah, beda diagnosis) --------------------------------
  { value: 'CHF',               label: 'Gagal jantung (CHF)',          freq: 3  },
  { value: 'PJK',                label: 'Penyakit jantung koroner',    freq: 2  },
  { value: 'PJB',                label: 'Penyakit jantung bawaan',     freq: 2  },
  { value: 'STROKE',             label: 'Stroke',                      freq: 2  },

  // -- Tier 3: cukup sering ----------------------------------------------
  { value: 'THALASEMIA',        label: 'Thalasemia',                   freq: 5  },
  { value: 'CKD',                label: 'Gagal ginjal (CKD) / cuci darah', freq: null }, // perlu hitung ulang dari data
  { value: 'BATU_GINJAL',        label: 'Batu ginjal / nefrolitiasis', freq: null }, // termasuk "BSK"
  { value: 'EPILEPSI',           label: 'Epilepsi',                    freq: null },
  { value: 'MALARIA',            label: 'Malaria',                     freq: null },
  { value: 'ANEMIA',             label: 'Anemia',                      freq: null },
  { value: 'VERTIGO',            label: 'Vertigo',                     freq: null },
  { value: 'LBP',                label: 'Low back pain (LBP)',         freq: null },
  { value: 'ASAM_URAT',          label: 'Asam urat / gout',            freq: null },
  { value: 'HIPERTIROID',        label: 'Gangguan tiroid',             freq: null }, // hiper & hipotiroid
  { value: 'GANGGUAN_JIWA',      label: 'Gangguan jiwa',                freq: null },
  { value: 'ALERGI',             label: 'Riwayat alergi',              freq: null },

  // -- Kanker / tumor (digabung, sebelumnya terpisah leukemia & ca payudara) --
  { value: 'LEUKEMIA',           label: 'Leukemia',                    freq: 2  },
  { value: 'KANKER_PAYUDARA',    label: 'Kanker payudara',             freq: 1  },
  { value: 'TUMOR_LAIN',         label: 'Tumor / kanker lainnya',      freq: null, butuh_keterangan: true }, // ca nasofaring, tumor otak, dll

  // -- Kandungan/obstetri --------------------------------------------------
  { value: 'ABORTUS',            label: 'Riwayat abortus',             freq: 2  },
  { value: 'BSC',                 label: 'Riwayat SC (BSC)',           freq: 1  },
  { value: 'KANDUNGAN_LAIN',      label: 'Riwayat kandungan lainnya (kista/mioma/PCOS)', freq: null, butuh_keterangan: true },

  // -- Operasi umum ---------------------------------------------------
  { value: 'POST_OP',            label: 'Riwayat operasi',             freq: 1, butuh_keterangan: true },
  { value: 'HERNIA',             label: 'Hernia',                      freq: 1  },

  // -- Lainnya (fallback manual) ------------------------------------------
  { value: 'LAINNYA',            label: 'Lainnya (isi manual)',        freq: null, butuh_keterangan: true },
];

// Kombinasi satu-klik untuk pasangan komorbid yang sangat sering muncul bersama
export const RIWAYAT_KOMBINASI_CEPAT = [
  { value: ['HT', 'DM'],          label: 'HT + DM'          },
  { value: ['HT', 'DM', 'PPOK'],  label: 'HT + DM + PPOK'  },
  { value: ['HT', 'STROKE'],      label: 'HT + Stroke'      },
  { value: ['HT', 'CHF'],         label: 'HT + CHF'         },
]

// ---------------------------------------------------------------------------
// 2. NORMALISASI NOTASI NEGATIF
//    76% data riwayat_penyakit_dahulu sebenarnya "tidak ada" ditulis 5 cara.
// ---------------------------------------------------------------------------
export const NEGASI_VARIAN_LAMA = ['-', '(-)', 'tidak ada', 'tdk ada', 'disangkal', 'nihil', '\\N', '']

export function normalizeNegasi(text) {
  if (!text) return true
  const t = text.toLowerCase().trim()
  return NEGASI_VARIAN_LAMA.map(v => v.toLowerCase()).includes(t)
}

// Value standar tersimpan ke DB ketika toggle "tidak ada riwayat" aktif
export const RIWAYAT_DISANGKAL_VALUE = 'DISANGKAL'

// ---------------------------------------------------------------------------
// 3. KELUHAN UTAMA — quick-pick berdasarkan frekuensi historis
// ---------------------------------------------------------------------------
export const KELUHAN_UTAMA_QUICK = [
  { value: 'DEMAM',                  label: 'Demam',                          freq: 284, kategori: 'umum'           },
  { value: 'LEMAS',                  label: 'Lemas',                          freq: 36,  kategori: 'umum'           },
  { value: 'NYERI_DADA_KIRI',        label: 'Nyeri dada kiri',                freq: 9,   kategori: 'kardio'         },
  { value: 'SESAK_NAFAS',            label: 'Sesak nafas',                    freq: 61,  kategori: 'respirasi'      },
  { value: 'BATUK_PILEK',            label: 'Batuk pilek',                    freq: 17,  kategori: 'respirasi'      },
  { value: 'NYERI_PERUT',            label: 'Nyeri perut',                    freq: 171, kategori: 'gastro'         },
  { value: 'NYERI_ULU_HATI',         label: 'Nyeri ulu hati',                 freq: 48,  kategori: 'gastro'         },
  { value: 'MUNTAH',                 label: 'Muntah',                         freq: 18,  kategori: 'gastro'         },
  { value: 'MUAL_MUNTAH',            label: 'Mual muntah',                    freq: 11,  kategori: 'gastro'         },
  { value: 'BAB_CAIR',               label: 'BAB cair / mencret',             freq: 25,  kategori: 'gastro'         },
  { value: 'NYERI_KEPALA',           label: 'Nyeri kepala',                   freq: 63,  kategori: 'neuro'          },
  { value: 'PENURUNAN_KESADARAN',    label: 'Penurunan kesadaran',            freq: 25,  kategori: 'neuro'          },
  { value: 'PUSING_BERPUTAR',        label: 'Pusing berputar (vertigo)',      freq: 9,   kategori: 'neuro'          },
  { value: 'KELEMAHAN_ANGGOTA_GERAK',label: 'Kelemahan anggota gerak',        freq: 13,  kategori: 'neuro'          },
  { value: 'KEJANG',                 label: 'Kejang',                         freq: 5,   kategori: 'neuro'          },
  { value: 'KELUAR_AIR_JALAN_LAHIR', label: 'Keluar air-air dari jalan lahir',freq: 51,  kategori: 'obstetri'       },
  { value: 'INGIN_MELAHIRKAN',       label: 'Ingin melahirkan (mules-mules)', freq: 19,  kategori: 'obstetri'       },
  { value: 'KELUAR_DARAH_JALAN_LAHIR',label:'Keluar darah dari jalan lahir',  freq: 13,  kategori: 'obstetri'       },
  { value: 'LUKA_LECET',             label: 'Luka lecet',                     freq: 17,  kategori: 'trauma'         },
  { value: 'LUKA_ROBEK',             label: 'Luka robek',                     freq: 14,  kategori: 'trauma'         },
  { value: 'NYERI_PINGGANG',         label: 'Nyeri pinggang',                 freq: 31,  kategori: 'muskuloskeletal'},
  { value: 'NYERI_SAAT_BAK',         label: 'Nyeri saat BAK',                 freq: 5,   kategori: 'urologi'        },
  { value: 'NYERI_TENGGOROKAN',      label: 'Nyeri tenggorokan',              freq: 6,   kategori: 'THT'            },
  { value: 'MATA_MERAH',             label: 'Mata merah',                     freq: 7,   kategori: 'mata'           },
  { value: 'MENGAMUK',               label: 'Mengamuk (gaduh gelisah)',       freq: 8,   kategori: 'psikiatri'      },
  { value: 'SAKIT_GIGI',             label: 'Sakit gigi',                     freq: 18,  kategori: 'lainnya'        },
]

export const KELUHAN_KATEGORI = [
  'umum', 'kardio', 'respirasi', 'gastro', 'neuro',
  'obstetri', 'trauma', 'muskuloskeletal', 'urologi',
  'THT', 'mata', 'psikiatri', 'lainnya',
]

// ---------------------------------------------------------------------------
// 4. HELPERS SERIALISASI — dipakai di SubtriaseIgdComponent (Options API)
// ---------------------------------------------------------------------------

/**
 * Ubah object riwayat → string JSON untuk disimpan ke kolom TEXT di DB.
 * @param {{ disangkal: boolean, komorbid: string[], detail: string }} obj
 * @returns {string}
 */
export function serializeRiwayat(obj) {
  if (!obj || typeof obj !== 'object') return RIWAYAT_DISANGKAL_VALUE
  return JSON.stringify({
    disangkal: !!obj.disangkal,
    komorbid:  obj.disangkal ? [] : (obj.komorbid || []),
    detail:    obj.disangkal ? '' : (obj.detail   || ''),
  })
}

/**
 * Parse string dari DB → object riwayat.
 * Mendukung: JSON baru, nilai lama ("disangkal", "-", "ht dm", dsb.).
 * @param {string|null} str
 * @returns {{ disangkal: boolean, komorbid: string[], detail: string }}
 */
export function parseRiwayatString(str) {
  if (!str || !str.trim()) return { disangkal: true, komorbid: [], detail: '' }
  // Format baru: JSON
  try {
    const p = JSON.parse(str)
    if (p && typeof p === 'object' && 'disangkal' in p) {
      return { disangkal: !!p.disangkal, komorbid: p.komorbid || [], detail: p.detail || '' }
    }
  } catch {}
  // Format lama: string bebas
  const isNeg = normalizeNegasi(str)
  return { disangkal: isNeg, komorbid: [], detail: isNeg ? '' : str.trim() }
}

/**
 * Konversi string dari DB (JSON lama ATAU teks biasa) → teks manusia.
 * Dipakai saat mengisi ulang form berbasis teks (bukan object).
 * @param {string|null} str
 * @returns {string}
 */
export function parseRiwayatToText(str) {
  if (!str || !str.trim()) return ''
  // Coba format JSON lama
  try {
    const p = JSON.parse(str)
    if (p && typeof p === 'object' && 'disangkal' in p) {
      if (p.disangkal) return 'Disangkal'
      const parts = []
      if (p.komorbid?.length) {
        const labels = p.komorbid.map(code => {
          const found = RIWAYAT_KOMORBID.find(k => k.value === code)
          return found ? found.label : code
        })
        parts.push(labels.join(', '))
      }
      if (p.detail) parts.push(p.detail)
      return parts.join(', ')
    }
  } catch {}
  // Teks biasa / format legacy
  if (normalizeNegasi(str)) return 'Disangkal'
  return str.trim()
}
