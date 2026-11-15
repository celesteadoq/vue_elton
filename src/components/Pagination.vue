<script>
export default {
  name: 'Pagination',
  props: {
    totalPages: { type: Number, required: true },
    currentPage: { type: Number, default: 1 }
  },
  emits: ['change'],
  methods: {
    go(page) {
      if (page < 1 || page > this.totalPages || page === this.currentPage) return
      this.$emit('change', page)
    }
  }
}
</script>

<template>
  <nav class="pagination" aria-label="Paginação">
    <button class="pg" :disabled="currentPage <= 1" @click="go(currentPage - 1)">Anterior</button>
    <button
      v-for="p in totalPages"
      :key="p"
      class="pg num"
      :class="{ active: p === currentPage }"
      :aria-current="p === currentPage ? 'page' : null"
      @click="go(p)"
    >
      {{ p }}
    </button>
    <button class="pg" :disabled="currentPage >= totalPages" @click="go(currentPage + 1)">Próxima</button>
  </nav>
</template>

<style scoped>
.pagination { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.pg {
  font: inherit;
  min-width: 2.5rem;
  padding: 0.45rem 0.8rem;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--surface);
  color: var(--ink);
  cursor: pointer;
}
.pg.active { background: var(--accent); border-color: var(--accent); color: #fff; font-weight: 700; }
.pg:disabled { opacity: 0.45; cursor: not-allowed; }
.pg:not(:disabled):not(.active):hover { background: var(--accent-soft); }
</style>
