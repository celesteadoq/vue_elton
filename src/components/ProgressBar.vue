<script>
export default {
  name: 'ProgressBar',
  props: {
    value: { type: Number, default: 0 }, // 0 a 100
    label: { type: String, default: 'Progresso' },
    showValue: { type: Boolean, default: true }
  },
  computed: {
    percent() {
      return Math.min(100, Math.max(0, Math.round(this.value)))
    }
  }
}
</script>

<template>
  <div class="progress">
    <div class="info">
      <span>{{ label }}</span>
      <strong v-if="showValue">{{ percent }}%</strong>
    </div>
    <div
      class="track"
      role="progressbar"
      :aria-label="label"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="percent"
    >
      <div class="fill" :class="{ done: percent === 100 }" :style="{ width: percent + '%' }"></div>
    </div>
  </div>
</template>

<style scoped>
.info { display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.95rem; }
.track { height: 0.9rem; background: var(--accent-soft); border-radius: 999px; overflow: hidden; }
.fill { height: 100%; background: var(--accent); border-radius: 999px; transition: width 0.3s ease, background 0.3s; }
.fill.done { background: var(--ok); }
</style>
