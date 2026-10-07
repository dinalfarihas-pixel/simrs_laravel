import { ref } from 'vue'

/**
 * Keyboard navigation untuk flowsheet tabel ICU.
 * Enter / ArrowRight  → geser ke kolom kanan
 * ArrowLeft           → geser ke kolom kiri
 * ArrowDown           → geser ke baris bawah (param berikutnya)
 * ArrowUp             → geser ke baris atas  (param sebelumnya)
 *
 * Setiap <input> perlu atribut data-row dan data-col.
 * tableRef harus dipasang ke elemen .flowsheet-wrapper.
 */
export function useFlowsheetNav() {
    const tableRef = ref(null)

    function handleNav(e, row, col) {
        let r = row
        let c = col

        switch (e.key) {
            case 'Enter':
            case 'ArrowRight': e.preventDefault(); c += 1; break
            case 'ArrowLeft':  e.preventDefault(); c -= 1; break
            case 'ArrowDown':  e.preventDefault(); r += 1; break
            case 'ArrowUp':    e.preventDefault(); r -= 1; break
            default: return
        }

        const target = tableRef.value
            ?.querySelector(`input[data-row="${r}"][data-col="${c}"]`)

        if (target) {
            target.focus()
            target.select()
        }
    }

    return { tableRef, handleNav }
}
