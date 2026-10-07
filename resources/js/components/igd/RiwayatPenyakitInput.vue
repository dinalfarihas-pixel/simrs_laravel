<template>
  <div class="riwayat-root">

    <!-- ── Textarea + panel (panel absolute agar tidak geser layout) ── -->
    <div class="riwayat-field">
    <Textarea
      ref="taRef"
      :modelValue="modelValue"
      @update:modelValue="onValueUpdate"
      :rows="3"
      style="width:100%; resize:vertical"
      placeholder="Mis: Hipertensi, DM tipe 2, riwayat SC 2020..."
      @focus="onFocus"
      @blur="onBlur"
    />

    <Transition name="qp-slide">
      <div v-if="showPanel" class="qp-panel">
        <div class="qp-header">
          <span class="qp-title"><i class="pi pi-bolt mr-1"></i>Riwayat Cepat</span>
          <span class="qp-hint">— klik untuk sisipkan</span>
        </div>

        <!-- Disangkal -->
        <div class="qp-chip-row mb-2">
          <button
            type="button"
            class="riwayat-chip chip-disangkal"
            :class="{ 'chip-disangkal--active': isDisangkal }"
            @mousedown.prevent
            @click="setDisangkal"
          >
            <i class="pi mr-1" :class="isDisangkal ? 'pi-check-circle' : 'pi-circle'"></i>
            Disangkal (tidak ada riwayat)
          </button>
        </div>

        <!-- Komorbid chips -->
        <div class="qp-chip-row">
          <button
            v-for="item in RIWAYAT_KOMORBID"
            :key="item.value"
            type="button"
            class="riwayat-chip"
            :class="{ 'chip-active': insertedSet.has(item.value) }"
            @mousedown.prevent
            @click="toggleChip(item)"
          >{{ item.label }}</button>
        </div>
      </div>
    </Transition>
    </div><!-- /riwayat-field -->

    <!-- ── Warning: copy dari keluhan utama ──────────────────────── -->
    <Transition name="warn-fade">
      <div v-if="copyWarning" class="riwayat-copy-warn">
        <i class="pi pi-exclamation-triangle mr-1"></i>
        Isi riwayat penyakit sama dengan keluhan utama — yakin bukan copy-paste?
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import Textarea from 'primevue/textarea'
import { RIWAYAT_KOMORBID } from './igdComplaintMapping'

// ── Props & emits ─────────────────────────────────────────────────────────────
const props = defineProps({
  modelValue: { type: String, default: '' },
  keluhanUtama: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue'])

// ── Refs ──────────────────────────────────────────────────────────────────────
const insertedSet = ref(new Set())
const taRef = ref(null)

// ── Visibility: panel tampil saat textarea fokus (klik) ──────────────────────
const focused = ref(false)
const showPanel = computed(() => focused.value)

function onFocus() { focused.value = true }
function onBlur() {
  // Delay kecil agar klik chip sempat terdaftar sebelum panel hilang
  setTimeout(() => { focused.value = false }, 150)
}

// ── Sinkronisasi chip dengan isi textarea ─────────────────────────────────────
function syncInserted(val) {
  const lower = (val || '').toLowerCase()
  const next = new Set()
  RIWAYAT_KOMORBID.forEach(item => {
    if (lower.includes(item.label.toLowerCase())) next.add(item.value)
  })
  insertedSet.value = next
}

watch(() => props.modelValue, syncInserted, { immediate: true })

// ── "Disangkal" ───────────────────────────────────────────────────────────────
const isDisangkal = computed(() =>
  (props.modelValue || '').trim().toLowerCase() === 'disangkal'
)

function setDisangkal() {
  emit('update:modelValue', isDisangkal.value ? '' : 'Disangkal')
}

// ── Toggle chip komorbid ──────────────────────────────────────────────────────
function toggleChip(item) {
  insertedSet.value.has(item.value) ? removeChip(item) : insertChip(item)
}

function insertChip(item) {
  let current = (props.modelValue || '')
  if (current.trim().toLowerCase() === 'disangkal') current = ''
  current = current.trimEnd()
  const sep = current && !/[,\s]$/.test(current) ? ', ' : ''
  const newVal = current + sep + item.label
  emit('update:modelValue', newVal)
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
    .replace(new RegExp('(,\\s*)?' + esc + '(\\s*,)?', 'i'), (_, pre, post) => {
      return pre && post ? ',' : ''
    })
    .replace(/^,\s*/, '')
    .replace(/,\s*$/, '')
    .replace(/,\s*,/g, ', ')
    .trim()
  emit('update:modelValue', val)
}

// ── Input handler ─────────────────────────────────────────────────────────────
function onValueUpdate(val) {
  emit('update:modelValue', val)
}

// ── Warning: sama dengan keluhan utama ───────────────────────────────────────
const copyWarning = computed(() => {
  const v = (props.modelValue || '').trim()
  const k = (props.keluhanUtama || '').trim()
  return v.length > 0 && v.toLowerCase() === k.toLowerCase()
    && v.toLowerCase() !== 'disangkal'
})
</script>

<style scoped>
.riwayat-root {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.riwayat-field {
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
  font-size: 0.73rem;
  font-weight: 700;
  color: var(--p-primary-700);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.qp-hint {
  font-size: 0.68rem;
  color: var(--p-text-muted-color);
}

.qp-chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3125rem;
  min-height: 1.75rem;
}

/* ── Chip base ── */
.riwayat-chip {
  padding: 0.25rem 0.6875rem;
  border: 1.5px solid var(--p-content-border-color);
  border-radius: var(--p-border-radius-xl, 20px);
  background: var(--p-surface-0);
  color: var(--p-text-color);
  font-size: 0.78rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, transform 0.08s;
  white-space: nowrap;
}

.riwayat-chip:hover {
  background: var(--p-primary-50);
  border-color: var(--p-primary-300);
  color: var(--p-primary-700);
  transform: translateY(-1px);
}

.chip-active {
  background: var(--p-primary-color);
  border-color: var(--p-primary-color);
  color: var(--p-primary-contrast-color);
}

/* ── Disangkal chip ── */
.chip-disangkal {
  border-color: #a5d6a7;
  background: #f1f8e9;
  color: #2e7d32;
  font-weight: 600;
}

.chip-disangkal:hover {
  background: #c8e6c9;
  border-color: #66bb6a;
  color: #1b5e20;
  transform: translateY(-1px);
}

.chip-disangkal--active {
  background: #388e3c;
  border-color: #388e3c;
  color: #fff;
}

/* ── Warning ── */
.riwayat-copy-warn {
  padding: 6px 12px;
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 4px;
  font-size: 0.78rem;
  color: #856404;
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

/* ── Transitions ── */
.warn-fade-enter-active,
.warn-fade-leave-active { transition: opacity 0.2s; }
.warn-fade-enter-from,
.warn-fade-leave-to     { opacity: 0; }
</style>
