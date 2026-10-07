<template>
  <div class="notification-container">
    <transition-group name="slide-fade" tag="div">
      <div
        v-for="alert in alerts"
        :key="alert.id"
        :class="['alert-card', 'alert-' + alert.type]"
      >
        <!-- Header row: icon + title + close -->
        <div class="alert-header">
          <div class="alert-icon-wrap">
            <i v-if="alert.type === 'success'" class="fas fa-check-circle"></i>
            <i v-if="alert.type === 'info'"    class="fas fa-info-circle"></i>
            <i v-if="alert.type === 'warning'" class="fas fa-exclamation-triangle"></i>
            <i v-if="alert.type === 'error'"   class="fas fa-times-circle"></i>
          </div>
          <span class="alert-title">{{ alert.title || typeName(alert.type) }}</span>
          <button class="close-btn" @click="remove(alert.id)">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Message -->
        <div class="alert-message">{{ alert.message }}</div>

        <!-- Progress bar -->
        <div class="progress-bar" :class="'bar-' + alert.type"
          :style="{ animationDuration: (alert.duration || 5000) + 'ms' }"></div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { EventBus } from './bus';

export default {
  data() {
    return { alerts: [] };
  },
  mounted() {
    EventBus.$on('show-alert', (payload) => {
      const id = Date.now();
      const duration = payload.duration || 5000;
      this.alerts.push({ id, duration, ...payload });
      setTimeout(() => this.remove(id), duration);
    });
  },
  methods: {
    remove(id) {
      this.alerts = this.alerts.filter(a => a.id !== id);
    },
    typeName(type) {
      const map = { success: 'Success', info: 'Info', warning: 'Warn', error: 'Error' };
      return map[type] || type;
    }
  }
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 65px;
  right: 24px;
  z-index: 99999;

  width: 380px;
  pointer-events: none;
}

/* ===== CARD ===== */
.alert-card {
  border-radius: 2px;
  margin-bottom: 12px;
  padding: 16px 18px 14px;
  position: relative;
  overflow: hidden;
  box-shadow:
    0 4px 6px rgba(0,0,0,.07),
    0 10px 30px rgba(0,0,0,.13),
    0 1px 3px rgba(0,0,0,.05);
  pointer-events: all;
}

.alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; }
.alert-info    { background: #eff6ff; border: 1px solid #bfdbfe; }
.alert-warning { background: #fffbeb; border: 1px solid #fde68a; }
.alert-error   { background: #fff1f2; border: 1px solid #fecdd3; }

/* ===== HEADER ROW ===== */
.alert-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.alert-icon-wrap {
  font-size: 1.35rem;
  flex-shrink: 0;
  line-height: 1;
}
.alert-success .alert-icon-wrap { color: #16a34a; }
.alert-info    .alert-icon-wrap { color: #2563eb; }
.alert-warning .alert-icon-wrap { color: #d97706; }
.alert-error   .alert-icon-wrap { color: #dc2626; }

.alert-title {
  flex: 1;
  font-weight: 700;
  font-size: 1.1rem;
}
.alert-success .alert-title { color: #15803d; }
.alert-info    .alert-title { color: #1d4ed8; }
.alert-warning .alert-title { color: #b45309; }
.alert-error   .alert-title { color: #b91c1c; }

/* ===== CLOSE BUTTON ===== */
.close-btn {
  background: none;
  border: none;
  font-size: .95rem;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  line-height: 1;
  opacity: .7;
  transition: opacity .15s;
}
.close-btn:hover { opacity: 1; }
.alert-success .close-btn { color: #16a34a; }
.alert-info    .close-btn { color: #2563eb; }
.alert-warning .close-btn { color: #d97706; }
.alert-error   .close-btn { color: #dc2626; }

/* ===== MESSAGE ===== */
.alert-message {
  font-size: 1.1rem;
  font-weight: 500;
  color: #1f2937;
  padding-left: 35px;
  line-height: 1.6;
}

/* ===== PROGRESS BAR ===== */
.progress-bar {
  position: absolute;
  bottom: 0; left: 0;
  height: 3px;
  width: 100%;
  border-radius: 0 0 12px 12px;
  transform-origin: left;
  animation: shrink linear forwards;
}
.bar-success { background: #16a34a; }
.bar-info    { background: #2563eb; }
.bar-warning { background: #d97706; }
.bar-error   { background: #dc2626; }

@keyframes shrink {
  from { transform: scaleX(1); }
  to   { transform: scaleX(0); }
}

/* ===== ANIMASI ===== */
.slide-fade-enter-active { transition: all .3s cubic-bezier(.21,1.02,.73,1); }
.slide-fade-leave-active  { transition: all .2s ease; }
.slide-fade-enter         { opacity: 0; transform: translateX(50px) scale(.95); }
.slide-fade-leave-to      { opacity: 0; transform: translateX(50px); }
</style>
