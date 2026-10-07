import { reactive, computed } from 'vue'

export const ICU_MONITORING_KEY = Symbol('icu-monitoring')

function emptyHours(defaultVal = null) {
    return Array.from({ length: 24 }, () => defaultVal)
}

export function useFormPemantauanICU() {
    const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0') + ':00')

    // ── Vital Signs ─────────────────────────────────────────────────────────
    const vitalSign = reactive({
        td_sistol:  emptyHours(),
        td_diastol: emptyHours(),
        map:        emptyHours(),
        nadi:       emptyHours(),
        suhu:       emptyHours(),
        spo2:       emptyHours(),
        rr:         emptyHours(),
        gcs_e:      emptyHours(),
        gcs_v:      emptyHours(),
        gcs_m:      emptyHours(),
    })

    const gcsTotal = computed(() =>
        vitalSign.gcs_e.map((e, i) => {
            const v = vitalSign.gcs_v[i]
            const m = vitalSign.gcs_m[i]
            if (e === null && v === null && m === null) return null
            return (e ?? 0) + (v ?? 0) + (m ?? 0)
        })
    )

    // ── Ventilator & Airway ──────────────────────────────────────────────────
    const ventilator = reactive({
        mode_ventilasi: emptyHours(''),
        fio2:           emptyHours(),
        peep:           emptyHours(),
        tv_set:         emptyHours(),
        tv_terukur:     emptyHours(),
        rr_set:         emptyHours(),
        ie_ratio:       emptyHours(''),
        pip:            emptyHours(),
        plateau:        emptyHours(),
        jenis_airway:   emptyHours(''),
        ukuran_airway:  emptyHours(''),
        fiksasi_cm:     emptyHours(),
    })

    // ── Balance Cairan ───────────────────────────────────────────────────────
    const cairan = reactive({
        bb_awal:       null,
        iv_kristaloid: emptyHours(),
        iv_koloid:     emptyHours(),
        oral:          emptyHours(),
        ngt_intake:    emptyHours(),
        urine:         emptyHours(),
        drain:         emptyHours(),
        muntah:        emptyHours(),
        ngt_output:    emptyHours(),
        perdarahan:    emptyHours(),
    })

    const intakePerJam = computed(() =>
        Array.from({ length: 24 }, (_, i) =>
            (cairan.iv_kristaloid[i] ?? 0) +
            (cairan.iv_koloid[i] ?? 0) +
            (cairan.oral[i] ?? 0) +
            (cairan.ngt_intake[i] ?? 0)
        )
    )

    const outputPerJam = computed(() =>
        Array.from({ length: 24 }, (_, i) =>
            (cairan.urine[i] ?? 0) +
            (cairan.drain[i] ?? 0) +
            (cairan.muntah[i] ?? 0) +
            (cairan.ngt_output[i] ?? 0) +
            (cairan.perdarahan[i] ?? 0)
        )
    )

    const balancePerJam = computed(() =>
        intakePerJam.value.map((inp, i) => inp - outputPerJam.value[i])
    )

    const balanceKumulatif = computed(() => {
        let cum = 0
        return balancePerJam.value.map(b => { cum += b; return cum })
    })

    const totalIntake  = computed(() => intakePerJam.value.reduce((a, b) => a + b, 0))
    const totalOutput  = computed(() => outputPerJam.value.reduce((a, b) => a + b, 0))
    const totalBalance = computed(() => totalIntake.value - totalOutput.value)

    const rataUO = computed(() => {
        const filled = cairan.urine.filter(v => v !== null)
        if (!filled.length) return 0
        const total = filled.reduce((a, b) => a + b, 0)
        const jam   = cairan.bb_awal > 0 ? (cairan.bb_awal) : 1
        return parseFloat((total / filled.length / jam).toFixed(2))
    })

    // ── Helpers ──────────────────────────────────────────────────────────────
    function setCellNum(obj, key, idx, rawValue) {
        const v = rawValue === '' ? null : parseFloat(rawValue)
        obj[key][idx] = isNaN(v) ? null : v
    }

    function setCellText(obj, key, idx, rawValue) {
        obj[key][idx] = rawValue ?? ''
    }

    // ── Dummy Data ───────────────────────────────────────────────────────────
    function isiDummyData() {
        const ts = [null,null,null,null,null,null,null,null,
                    120,118,122,125,130,128,120,118,122,125,null,null,null,null,null,null]
        const td = [null,null,null,null,null,null,null,null,
                    80,78,82,85,88,84,80,78,82,83,null,null,null,null,null,null]
        ts.forEach((v, i) => {
            vitalSign.td_sistol[i]  = v
            vitalSign.td_diastol[i] = td[i]
            if (v !== null) {
                vitalSign.map[i]   = Math.round((v + 2 * td[i]) / 3)
                vitalSign.nadi[i]  = 72 + Math.round(Math.random() * 16)
                vitalSign.suhu[i]  = parseFloat((36.5 + Math.random() * 0.9).toFixed(1))
                vitalSign.spo2[i]  = 96 + Math.round(Math.random() * 3)
                vitalSign.rr[i]    = 14 + Math.round(Math.random() * 6)
                vitalSign.gcs_e[i] = 4
                vitalSign.gcs_v[i] = 5
                vitalSign.gcs_m[i] = 6
            }
        })

        ts.forEach((v, i) => {
            if (v !== null) {
                ventilator.mode_ventilasi[i] = i < 12 ? 'SIMV' : 'CPAP'
                ventilator.fio2[i]           = 40
                ventilator.peep[i]           = 5
                ventilator.tv_set[i]         = 450
                ventilator.tv_terukur[i]     = 440 + Math.round(Math.random() * 20)
                ventilator.rr_set[i]         = 14
                ventilator.ie_ratio[i]       = '1:2'
                ventilator.pip[i]            = 22
                ventilator.plateau[i]        = 18
                ventilator.jenis_airway[i]   = 'ETT'
                ventilator.ukuran_airway[i]  = '7.5'
                ventilator.fiksasi_cm[i]     = 22
            }
        })

        ts.forEach((v, i) => {
            if (v !== null) {
                cairan.iv_kristaloid[i] = 125
                cairan.urine[i]         = 80 + Math.round(Math.random() * 40)
            }
        })
    }

    // ── Build Payload ────────────────────────────────────────────────────────
    function buildPayload(noregister, tgl_monitoring, username) {
        return {
            noregister,
            tgl_monitoring,
            username,
            vital_sign: {
                td_sistol:  [...vitalSign.td_sistol],
                td_diastol: [...vitalSign.td_diastol],
                map:        [...vitalSign.map],
                nadi:       [...vitalSign.nadi],
                suhu:       [...vitalSign.suhu],
                spo2:       [...vitalSign.spo2],
                rr:         [...vitalSign.rr],
                gcs_e:      [...vitalSign.gcs_e],
                gcs_v:      [...vitalSign.gcs_v],
                gcs_m:      [...vitalSign.gcs_m],
                gcs_total:  [...gcsTotal.value],
            },
            ventilator: {
                mode_ventilasi: [...ventilator.mode_ventilasi],
                fio2:           [...ventilator.fio2],
                peep:           [...ventilator.peep],
                tv_set:         [...ventilator.tv_set],
                tv_terukur:     [...ventilator.tv_terukur],
                rr_set:         [...ventilator.rr_set],
                ie_ratio:       [...ventilator.ie_ratio],
                pip:            [...ventilator.pip],
                plateau:        [...ventilator.plateau],
                jenis_airway:   [...ventilator.jenis_airway],
                ukuran_airway:  [...ventilator.ukuran_airway],
                fiksasi_cm:     [...ventilator.fiksasi_cm],
            },
            cairan: {
                bb_awal:         cairan.bb_awal,
                iv_kristaloid:   [...cairan.iv_kristaloid],
                iv_koloid:       [...cairan.iv_koloid],
                oral:            [...cairan.oral],
                ngt_intake:      [...cairan.ngt_intake],
                urine:           [...cairan.urine],
                drain:           [...cairan.drain],
                muntah:          [...cairan.muntah],
                ngt_output:      [...cairan.ngt_output],
                perdarahan:      [...cairan.perdarahan],
                intake_per_jam:  [...intakePerJam.value],
                output_per_jam:  [...outputPerJam.value],
                balance_per_jam: [...balancePerJam.value],
                balance_kumulatif: [...balanceKumulatif.value],
                total_intake:    totalIntake.value,
                total_output:    totalOutput.value,
                total_balance:   totalBalance.value,
            },
        }
    }

    // ── Reset semua state ke kosong ──────────────────────────────────────────
    function resetState() {
        const empty = emptyHours()
        const emptyStr = emptyHours('')
        Object.keys(vitalSign).forEach(k => { vitalSign[k] = emptyHours() })
        Object.keys(ventilator).forEach(k => {
            ventilator[k] = ['mode_ventilasi', 'ie_ratio', 'jenis_airway', 'ukuran_airway'].includes(k)
                ? emptyStr : emptyHours()
        })
        Object.keys(cairan).forEach(k => {
            cairan[k] = k === 'bb_awal' ? null : emptyHours()
        })
    }

    // ── Load dari response API ───────────────────────────────────────────────
    function loadFromPayload(data) {
        if (!data) { resetState(); return }

        const vs = data.vital_sign || {}
        const vent = data.ventilator || {}
        const c = data.cairan || {}

        const fill = (target, key, source, fallback) => {
            const arr = source[key]
            if (Array.isArray(arr) && arr.length === 24) {
                target[key] = arr
            } else {
                target[key] = emptyHours(fallback)
            }
        }

        Object.keys(vitalSign).forEach(k => fill(vitalSign, k, vs, null))

        ;['fio2','peep','tv_set','tv_terukur','rr_set','pip','plateau','fiksasi_cm'].forEach(k => fill(ventilator, k, vent, null))
        ;['mode_ventilasi','ie_ratio','jenis_airway','ukuran_airway'].forEach(k => fill(ventilator, k, vent, ''))

        cairan.bb_awal = c.bb_awal ?? null
        ;['iv_kristaloid','iv_koloid','oral','ngt_intake','urine','drain','muntah','ngt_output','perdarahan'].forEach(k => fill(cairan, k, c, null))
    }

    return {
        hours,
        vitalSign, gcsTotal,
        ventilator,
        cairan, intakePerJam, outputPerJam, balancePerJam, balanceKumulatif,
        totalIntake, totalOutput, totalBalance, rataUO,
        setCellNum, setCellText,
        isiDummyData,
        buildPayload,
        resetState,
        loadFromPayload,
    }
}
