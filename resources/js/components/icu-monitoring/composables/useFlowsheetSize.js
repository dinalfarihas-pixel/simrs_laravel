import { ref, watch } from 'vue'

/**
 * Menyimpan & memuat ukuran tabel flowsheet ICU ke localStorage.
 * @param {string} key   - prefix unik per tab, misal 'icu_vs'
 * @param {object} def   - default { height: vh, colWidth: px }
 */
export function useFlowsheetSize(key, def = {}) {
    const DH = def.height   ?? 62
    const DW = def.colWidth ?? 76

    function load(k, fallback) {
        const v = localStorage.getItem(k)
        return v !== null ? Number(v) : fallback
    }

    const height   = ref(load(`${key}_h`, DH))
    const colWidth = ref(load(`${key}_w`, DW))

    watch(height,   v => localStorage.setItem(`${key}_h`, v))
    watch(colWidth, v => localStorage.setItem(`${key}_w`, v))

    function reset() {
        height.value   = DH
        colWidth.value = DW
    }

    return { height, colWidth, reset }
}
