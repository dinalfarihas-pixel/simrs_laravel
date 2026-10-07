<template>
  <div class="lnp-root" ref="root">
    <InputText
      :modelValue="modelValue"
      @update:modelValue="onInput"
      @focus="onFocus"
      @keydown="onKeydown"
      @blur="onBlur"
      placeholder="Lokasi nyeri..."
      style="width:100%"
    />

    <Popover ref="pop" appendTo="body" :dismissable="true" class="lnp-popover">
      <div class="lnp-panel">

        <!-- Category tabs -->
        <div class="lnp-tabs">
          <button
            v-for="cat in CATEGORIES"
            :key="cat.key"
            type="button"
            class="lnp-tab"
            :class="{ 'lnp-tab--active': activeTab === cat.key }"
            @mousedown.prevent
            @click="activeTab = cat.key"
          >{{ cat.label }}</button>
        </div>

        <!-- Quick picks -->
        <div class="lnp-grid">
          <button
            v-for="loc in activeItems"
            :key="loc"
            type="button"
            class="lnp-btn"
            :class="{ 'lnp-btn--active': loc.toLowerCase() === (modelValue || '').toLowerCase() }"
            @mousedown.prevent
            @click="pick(loc)"
          >{{ loc }}</button>
        </div>

      </div>
    </Popover>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import InputText from 'primevue/inputtext'
import Popover from 'primevue/popover'

const props = defineProps({
  modelValue: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue'])

// ── Data quick pick ───────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    key: 'perut',
    label: 'Perut',
    items: [
      'Perut', 'Ulu hati', 'Epigastrium', 'Perut bawah',
      'Perut kanan bawah', 'Perut kiri bawah', 'Perut kanan atas',
      'Perut kiri atas', 'Suprapubis',
    ],
  },
  {
    key: 'kepala',
    label: 'Kepala',
    items: [
      'Kepala', 'Wajah', 'Mata', 'Mata kiri', 'Mata kanan',
      'Telinga', 'Telinga kiri', 'Telinga kanan',
      'Hidung', 'Gigi', 'Tenggorokan', 'Leher', 'Tengkuk',
    ],
  },
  {
    key: 'dada',
    label: 'Dada',
    items: [
      'Dada', 'Dada kiri', 'Dada kanan', 'Dada saat batuk',
      'Punggung', 'Punggung kanan', 'Punggung kiri',
    ],
  },
  {
    key: 'pinggang',
    label: 'Pinggang',
    items: [
      'Pinggang', 'Pinggang kiri', 'Pinggang kanan',
      'Pinggang kiri dan kanan', 'Pinggang menjalar ke kaki',
    ],
  },
  {
    key: 'kaki',
    label: 'Kaki',
    items: [
      'Kaki', 'Kaki kiri', 'Kaki kanan', 'Kedua kaki',
      'Lutut', 'Lutut kiri', 'Lutut kanan',
      'Paha', 'Paha kiri', 'Paha kanan',
      'Betis', 'Betis kiri', 'Betis kanan',
      'Tumit', 'Sendi', 'Seluruh sendi',
    ],
  },
  {
    key: 'tangan',
    label: 'Tangan',
    items: [
      'Tangan', 'Tangan kiri', 'Tangan kanan', 'Kedua tangan',
      'Bahu', 'Bahu kiri', 'Bahu kanan',
      'Siku', 'Siku kiri', 'Siku kanan',
      'Lengan', 'Pergelangan tangan',
    ],
  },
  {
    key: 'lainnya',
    label: 'Lainnya',
    items: [
      'Badan', 'Seluruh badan', 'Tangan dan kaki',
      'Bokong', 'Anus', 'Selangkangan','Penis', 'Vagina', 'Payudara', 'Seluruh payudara',
      'Perut dan kepala', 'Kepala dan pinggang',
    ],
  },
]

// ── State ─────────────────────────────────────────────────────────────────────
const root = ref(null)
const pop  = ref(null)
const activeTab = ref(CATEGORIES[0].key)

const activeItems = computed(
  () => CATEGORIES.find(c => c.key === activeTab.value)?.items ?? []
)

// ── Handlers ──────────────────────────────────────────────────────────────────
function onInput(val) {
  emit('update:modelValue', val)
}

function onFocus(event) {
  pop.value?.show(event, root.value)
}

function onKeydown() {
  pop.value?.hide()
}

function onBlur() {
  pop.value?.hide()
}

function pick(loc) {
  emit('update:modelValue', loc)
  pop.value?.hide()
}
</script>

<style scoped>
.lnp-root {
  position: relative;
}

/* ── Popover panel ── */
.lnp-panel {
  width: 340px;
  padding: 6px 2px 4px;
}

/* ── Category tabs ── */
.lnp-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e9ecef;
}

.lnp-tab {
  padding: 2px 10px;
  border: 1.5px solid #dee2e6;
  border-radius: 20px;
  background: #f8f9fa;
  color: #495057;
  font-size: 0.71rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.12s, border-color 0.12s, color 0.12s;
  white-space: nowrap;
}

.lnp-tab:hover {
  background: #e7f3ff;
  border-color: #74b3f9;
  color: #1565c0;
}

.lnp-tab--active {
  background: #1976d2;
  border-color: #1976d2;
  color: #fff;
}

/* ── Quick pick grid ── */
.lnp-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.lnp-btn {
  padding: 4px 10px;
  border: 1.5px solid #dee2e6;
  border-radius: 6px;
  background: #f8f9fa;
  color: #343a40;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.12s, border-color 0.12s, color 0.12s, transform 0.08s;
  white-space: nowrap;
}

.lnp-btn:hover {
  background: #e7f3ff;
  border-color: #74b3f9;
  color: #1565c0;
  transform: translateY(-1px);
}

.lnp-btn--active {
  background: #1976d2;
  border-color: #1976d2;
  color: #fff;
}
</style>
