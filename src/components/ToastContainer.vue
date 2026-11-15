<script>
import toast from '../services/toast'

export default {
  name: 'ToastContainer',
  computed: {
    items() {
      return toast.state.items
    }
  },
  methods: {
    close(id) {
      toast.remove(id)
    }
  }
}
</script>

<template>
  <div class="toasts" aria-live="polite">
    <TransitionGroup name="toast">
      <div v-for="t in items" :key="t.id" class="toast" :class="t.type" role="status">
        <span class="msg">{{ t.message }}</span>
        <button class="close" aria-label="Fechar notificação" @click="close(t.id)">&times;</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toasts {
  position: fixed;
  z-index: 50;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  pointer-events: none;
}
@media (min-width: 768px) {
  .toasts { left: auto; right: 1.5rem; top: 1.5rem; bottom: auto; width: 360px; }
}
.toast {
  pointer-events: auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.8rem 1rem;
  background: var(--ink);
  color: #fff;
  border-left: 6px solid var(--accent);
  border-radius: 6px;
  box-shadow: 0 8px 20px rgba(20, 33, 61, 0.25);
}
.toast.success { border-left-color: var(--ok); }
.toast.error { border-left-color: var(--err); }
.close { background: none; border: 0; color: inherit; font-size: 1.3rem; line-height: 1; cursor: pointer; }

.toast-enter-active, .toast-leave-active { transition: opacity 0.25s, transform 0.25s; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(24px); }
</style>
