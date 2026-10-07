<template>
  <div class="keluhan-root">

    <!-- ── Textarea narasi ─ trigger utama ──────────────────────────── -->
    <div class="keluhan-textarea-wrap">
      <Textarea
        ref="taRef"
        :modelValue="modelValue"
        @update:modelValue="onValueUpdate"
        @focus="onFocus"
        @blur="onBlur"
        :rows="4"
        style="width:100%; resize:vertical"
        placeholder="Tambahkan detail: durasi, lokasi, penjalaran, faktor pemberat/peringan..."
        :class="{ 'p-invalid': !!error }"
      />
      <small v-if="error" class="keluhan-error">
        <i class="pi pi-exclamation-circle mr-1"></i>{{ error }}
      </small>

      <!-- ── Quick-pick panel (absolute, tidak geser layout) ──────────── -->
      <Transition name="qp-slide">
        <div v-if="showPanel" class="qp-panel">
        <div class="qp-header">
          <span class="qp-title"><i class="pi pi-bolt mr-1"></i>Keluhan Cepat</span>
          <span class="qp-hint">— klik untuk sisipkan</span>
        </div>

        <!-- Category filter tabs -->
        <div class="qp-tabs-wrap">
          <button
            v-for="grup in keluhanPerKategori"
            :key="grup.key"
            type="button"
            class="qp-tab-btn"
            :class="{ 'qp-tab-active': activeKat === grup.key }"
            @mousedown.prevent
            @click="activeKat = grup.key"
          >{{ KATEGORI_LABEL[grup.key] || grup.key }}</button>
        </div>

        <!-- Chips for active category -->
        <div class="qp-chip-row">
          <button
            v-for="item in activeItems"
            :key="item.value"
            type="button"
            class="keluhan-chip"
            :class="{ 'chip-inserted': insertedSet.has(item.value) }"
            @mousedown.prevent
            @click="insertChip(item)"
          >{{ item.label }}</button>
          <span v-if="activeItems.length === 0" class="qp-empty">Tidak ada pilihan.</span>
        </div>
      </div>
    </Transition>
    </div><!-- /keluhan-textarea-wrap -->

  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import Textarea from 'primevue/textarea'
import { KELUHAN_UTAMA_QUICK, KELUHAN_KATEGORI } from './igdComplaintMapping'

// ── Props & emits ─────────────────────────────────────────────────────────────
const props = defineProps({
  modelValue: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue'])

// ── Category display labels ───────────────────────────────────────────────────
const KATEGORI_LABEL = {
  umum:            'Umum',
  kardio:          'Kardio',
  respirasi:       'Respirasi',
  gastro:          'Gastro',
  neuro:           'Neuro',
  obstetri:        'Obstetri',
  trauma:          'Trauma',
  muskuloskeletal: 'Muskulo',
  urologi:         'Urologi',
  THT:             'THT',
  mata:            'Mata',
  psikiatri:       'Psikiatri',
  lainnya:         'Lainnya',
}

// ── Category grouping ─────────────────────────────────────────────────────────
const keluhanPerKategori = computed(() =>
  KELUHAN_KATEGORI
    .map(k => ({ key: k, items: KELUHAN_UTAMA_QUICK.filter(q => q.kategori === k) }))
    .filter(g => g.items.length > 0)
)

const activeKat = ref(keluhanPerKategori.value[0]?.key ?? '')
const activeItems = computed(() =>
  keluhanPerKategori.value.find(g => g.key === activeKat.value)?.items ?? []
)

// ── Visibility: panel tampil saat textarea fokus (klik) ──────────────────────
const focused = ref(false)
const showPanel = computed(() => focused.value)

function onFocus() { focused.value = true }

// ── Chip insert / remove ──────────────────────────────────────────────────────
const insertedSet = ref(new Set())
const taRef = ref(null)

function insertChip(item) {
  if (insertedSet.value.has(item.value)) {
    removeChip(item)
    return
  }
  const current = (props.modelValue || '').trimEnd()
  const sep = current && !/[,\s]$/.test(current) ? ', ' : ''
  const newVal = current + sep + item.label
  emit('update:modelValue', newVal)
  insertedSet.value = new Set([...insertedSet.value, item.value])
  error.value = ''
  nextTick(() => {
    const el = taRef.value?.$el ?? taRef.value
    if (!el) return
    el.focus()
    el.setSelectionRange(newVal.length, newVal.length)
  })
}

function removeChip(item) {
  const esc = item.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const val = (props.modelValue || '')
    .replace(new RegExp('(,\\s*)?' + esc + '(\\s*,)?'), (_, pre, post) => {
      return pre && post ? ',' : ''
    })
    .replace(/^,\s*/, '')
    .replace(/,\s*$/, '')
    .replace(/,\s*,/g, ', ')
    .trim()
  emit('update:modelValue', val)
  const next = new Set(insertedSet.value)
  next.delete(item.value)
  insertedSet.value = next
}

// ── Input handler ─────────────────────────────────────────────────────────────
const error = ref('')

function onValueUpdate(val) {
  emit('update:modelValue', val)
  if (error.value) validate(val)
}

function onBlur() {
  validate(props.modelValue)
  // Delay agar klik chip/tab sempat terdaftar sebelum panel hilang
  setTimeout(() => { focused.value = false }, 150)
}

// ── Validation ────────────────────────────────────────────────────────────────
function validate(val) {
  const t = (val || '').trim()
  if (t.length < 3) {
    error.value = 'Keluhan utama minimal 3 karakter.'
    return false
  }
  if (/^(.)\1*$/.test(t) || /^[a-zA-Z]{1,2}$/.test(t) || /^[-.\s,;x]{1,5}$/i.test(t)) {
    error.value = 'Mohon isi keluhan yang valid, bukan data uji coba.'
    return false
  }
  error.value = ''
  return true
}

defineExpose({ validate: () => validate(props.modelValue) })
</script>

<style scoped>
.keluhan-root {
  display: flex;
  flex-direction: column;
}

.keluhan-textarea-wrap {
  position: relative;
}

/* ── Quick-pick panel (floating, tidak geser layout) ── */
.qp-panel {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 300;
  border: 1px solid var(--p-content-border-color);
  border-radius: var(--p-border-radius-md, 6px);
  background: var(--p-surface-0);
  padding: 0.625rem 0.75rem 0.5rem;
  box-shadow: 0 4px 16px rgba(0,0,0,.14);
}

.qp-header {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-bottom: 0.5rem;
}

.qp-title {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--p-primary-700);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.qp-hint {
  font-size: 0.75rem;
  color: var(--p-text-muted-color);
}

/* Category tabs */
.qp-tabs-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3125rem;
  margin-bottom: 0.5rem;
}

.qp-tab-btn {
  padding: 0.25rem 0.75rem;
  border: 1.5px solid var(--p-content-border-color);
  border-radius: var(--p-border-radius-xl, 20px);
  background: var(--p-surface-0);
  color: var(--p-text-color);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
  white-space: nowrap;
}

.qp-tab-btn:hover {
  background: var(--p-primary-50);
  border-color: var(--p-primary-300);
  color: var(--p-primary-700);
}

.qp-tab-active {
  background: var(--p-primary-color) !important;
  border-color: var(--p-primary-color) !important;
  color: var(--p-primary-contrast-color) !important;
}

/* Chip row */
.qp-chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  min-height: 2rem;
}

.keluhan-chip {
  padding: 0.3rem 0.875rem;
  border: 1.5px solid var(--p-content-border-color);
  border-radius: var(--p-border-radius-xl, 20px);
  background: var(--p-surface-0);
  color: var(--p-text-color);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, transform 0.08s;
}

.keluhan-chip:hover {
  background: var(--p-primary-50);
  border-color: var(--p-primary-300);
  color: var(--p-primary-700);
  transform: translateY(-1px);
}

.chip-inserted {
  background: var(--p-primary-color);
  border-color: var(--p-primary-color);
  color: var(--p-primary-contrast-color);
}

.qp-empty {
  font-size: 0.82rem;
  color: var(--p-text-muted-color);
  align-self: center;
}

/* Error */
.keluhan-error {
  display: block;
  margin-top: 0.25rem;
  color: var(--p-form-field-invalid-border-color, var(--p-red-500));
  font-size: 0.78rem;
}

/* ── Animasi panel ── */
.qp-slide-enter-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.qp-slide-leave-active {
  transition: opacity 0.15s ease, transform 0.12s ease;
}
.qp-slide-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}
.qp-slide-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
