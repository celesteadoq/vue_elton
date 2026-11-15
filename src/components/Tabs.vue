<script>
export default {
  name: 'Tabs',
  props: {
    // [{ title: String, content: String }]
    tabs: { type: Array, required: true }
  },
  emits: ['change'],
  data() {
    return { active: 0 }
  },
  methods: {
    select(index) {
      this.active = index
      this.$emit('change', index)
    }
  }
}
</script>

<template>
  <div class="tabs">
    <div class="list" role="tablist">
      <button
        v-for="(tab, i) in tabs"
        :key="i"
        class="tab"
        :class="{ active: active === i }"
        role="tab"
        :aria-selected="active === i"
        @click="select(i)"
      >
        {{ tab.title }}
      </button>
    </div>
    <div class="panel-content" role="tabpanel">
      <p>{{ tabs[active].content }}</p>
    </div>
  </div>
</template>

<style scoped>
.list { display: flex; gap: 0.25rem; border-bottom: 2px solid var(--line); overflow-x: auto; }
.tab {
  font: inherit;
  white-space: nowrap;
  padding: 0.6rem 1rem;
  background: none;
  border: 0;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  color: var(--muted);
  cursor: pointer;
}
.tab.active { color: var(--accent); border-bottom-color: var(--accent); font-weight: 700; }
.panel-content { padding: 1rem 0.25rem 0; color: var(--ink); }
</style>
