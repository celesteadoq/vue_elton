<script>
export default {
  name: 'Accordion',
  props: {
  
    items: { type: Array, required: true }
  },
  data() {
    return { openIndex: 0 } 
  },
  methods: {
    toggle(index) {
      this.openIndex = this.openIndex === index ? null : index
    }
  }
}
</script>

<template>
  <div class="accordion">
    <div v-for="(item, i) in items" :key="i" class="item" :class="{ open: openIndex === i }">
      <h3>
        <button
          class="head"
          :aria-expanded="openIndex === i"
          :aria-controls="'acc-panel-' + i"
          @click="toggle(i)"
        >
          <span>{{ item.title }}</span>
          <span class="chevron" aria-hidden="true"></span>
        </button>
      </h3>
      <div :id="'acc-panel-' + i" class="body" role="region">
        <div><p>{{ item.content }}</p></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item { border-bottom: 1px solid var(--line); }
.item:first-child { border-top: 1px solid var(--line); }
.head {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 0.25rem;
  background: none;
  border: 0;
  font: inherit;
  font-weight: 600;
  color: var(--ink);
  text-align: left;
  cursor: pointer;
}
.item.open .head { color: var(--accent); }
.chevron {
  flex: none;
  width: 0.55rem;
  height: 0.55rem;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(45deg);
  transition: transform 0.3s ease;
}
.item.open .chevron { transform: rotate(-135deg); }

.body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s ease; }
.item.open .body { grid-template-rows: 1fr; }
.body > div { overflow: hidden; }
.body p { padding: 0 0.25rem 1rem; color: var(--muted); }
</style>
