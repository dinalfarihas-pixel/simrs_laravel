<template>
  <div class="vqp-root" ref="root">
    <InputGroup>
      <InputNumber
        :modelValue="modelValue"
        :minFractionDigits="minFractionDigits"
        :maxFractionDigits="maxFractionDigits"
        :locale="locale"
        :min="min"
        :max="max"
        :inputStyle="{ textAlign: 'center', fontWeight: '700', fontSize: '1.05rem' }"
        @update:modelValue="onValueUpdate"
        @focus="onFocus"
        @keydown="onKeydown"
        @blur="onBlur"
      />
      <InputGroupAddon v-if="unit">{{ unit }}</InputGroupAddon>
    </InputGroup>

    <Popover ref="pop" appendTo="body" :dismissable="true" class="vqp-popover">
      <div class="vqp-panel">
        <div class="vqp-panel-header">
          <span class="vqp-panel-title">{{ label }}</span>
          <span v-if="unit" class="vqp-panel-unit">{{ unit }}</span>
        </div>
        <div class="vqp-grid">
          <button
            v-for="v in quickValues"
            :key="v"
            type="button"
            class="vqp-btn"
            :class="{
              'vqp-btn--highlight': v === highlightValue,
              'vqp-btn--active': v === modelValue,
            }"
            @mousedown.prevent
            @click="pickValue(v)"
          >{{ v }}</button>
        </div>
        <div v-if="outOfRange" class="vqp-range-warn">
          <i class="pi pi-exclamation-triangle"></i>
          Rentang normal: {{ min }}–{{ max }} {{ unit }}
        </div>
      </div>
    </Popover>
  </div>
</template>

<script>
import InputNumber from 'primevue/inputnumber';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Popover from 'primevue/popover';

export default {
  name: 'VitalQuickPickInput',
  components: { InputNumber, InputGroup, InputGroupAddon, Popover },
  props: {
    modelValue:        { type: Number, default: null },
    label:             { type: String, default: '' },
    unit:              { type: String, default: '' },
    quickValues:       { type: Array,  default: () => [] },
    highlightValue:    { type: Number, default: null },
    minFractionDigits: { type: Number, default: 0 },
    maxFractionDigits: { type: Number, default: undefined },
    locale:            { type: String, default: 'id-ID' },
    min:               { type: Number, default: 0 },
    max:               { type: Number, default: 9999 },
  },
  emits: ['update:modelValue'],
  computed: {
    outOfRange() {
      const v = this.modelValue;
      return v !== null && v !== 0 && (v < this.min || v > this.max);
    },
  },
  methods: {
    onValueUpdate(val) {
      this.$emit('update:modelValue', val);
    },
    onFocus(event) {
      if (this.$refs.pop) this.$refs.pop.show(event, this.$refs.root);
    },
    onKeydown() {
      if (this.$refs.pop) this.$refs.pop.hide();
    },
    onBlur() {
      if (this.$refs.pop) this.$refs.pop.hide();
    },
    pickValue(v) {
      this.$emit('update:modelValue', v);
      if (this.$refs.pop) this.$refs.pop.hide();
    },
  },
};
</script>

<style scoped>
.vqp-root {
  position: relative;
}

.vqp-panel {
  min-width: 220px;
  padding: 4px 0;
}

.vqp-panel-header {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid #e9ecef;
}

.vqp-panel-title {
  font-size: .78rem;
  font-weight: 700;
  color: #495057;
  text-transform: uppercase;
  letter-spacing: .04em;
}

.vqp-panel-unit {
  font-size: .72rem;
  color: #868e96;
  font-weight: 500;
}

.vqp-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.vqp-btn {
  min-width: 44px;
  padding: 5px 8px;
  border: 1.5px solid #dee2e6;
  border-radius: 6px;
  background: #f8f9fa;
  color: #343a40;
  font-size: .82rem;
  font-weight: 600;
  cursor: pointer;
  transition: background .12s, border-color .12s, color .12s, transform .08s;
  line-height: 1.2;
  text-align: center;
}

.vqp-btn:hover {
  background: #e7f3ff;
  border-color: #74b3f9;
  color: #1565c0;
  transform: translateY(-1px);
}

.vqp-btn--active {
  background: #1976d2;
  border-color: #1976d2;
  color: #fff;
}

.vqp-btn--highlight {
  border-color: #2e7d32;
  background: #e8f5e9;
  color: #1b5e20;
  font-weight: 700;
}

.vqp-btn--highlight.vqp-btn--active {
  background: #2e7d32;
  border-color: #2e7d32;
  color: #fff;
}

.vqp-range-warn {
  margin-top: 8px;
  padding: 4px 8px;
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 4px;
  font-size: .73rem;
  color: #856404;
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
