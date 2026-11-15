<script>
export default {
  name: 'DropdownMenu',
  props: {
    label: { type: String, default: 'Selecionar' },
    
    options: { type: Array, required: true },
    selected: { type: String, default: '' }
  },
  emits: ['select'],
  data() {
    return { open: false }
  },
  computed: {
    buttonText() {
      const current = this.options.find((o) => o.value === this.selected)
      return current ? current.label : this.label
    }
  },
  mounted() {
  
    document.addEventListener('click', this.onOutsideClick)
    document.addEventListener('keydown', this.onKeydown)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.onOutsideClick)
    document.removeEventListener('keydown', this.onKeydown)
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
    choose(option) {
      this.open = false
      this.$emit('select', option)
    },
    onOutsideClick(event) {
      if (!this.$el.contains(event.target)) this.open = false
    },
    onKeydown(event) {
      if (event.key === 'Escape') this.open = false
    }
  }
}
</script>

<template>
  <div class="dropdown">
    <button class="trigger" aria-haspopup="listbox" :aria-expanded="open" @click="toggle">
      {{ buttonText }}
      <span class="caret" aria-hidden="true"></span>
    </button>
    <ul v-if="open" class="menu" role="listbox">
      <li v-for="opt in options" :key="opt.value" role="option" :aria-selected="opt.value === selected">
        <button class="option" :class="{ current: opt.value === selected }" @click="choose(opt)">
          {{ opt.label }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dropdown { position: relative; display: inline-block; }
.trigger {
  font: inherit;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.9rem;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--surface);
  color: var(--ink);
  cursor: pointer;
}
.caret {
  width: 0.45rem;
  height: 0.45rem;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(45deg) translateY(-2px);
}
.menu {
  position: absolute;
  z-index: 20;
  left: 0;
  top: calc(100% + 4px);
  min-width: 100%;
  margin: 0;
  padding: 0.25rem;
  list-style: none;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 6px;
  box-shadow: 0 8px 20px rgba(20, 33, 61, 0.14);
}
.option {
  font: inherit;
  width: 100%;
  white-space: nowrap;
  text-align: left;
  padding: 0.5rem 0.75rem;
  background: none;
  border: 0;
  border-radius: 4px;
  color: var(--ink);
  cursor: pointer;
}
.option:hover { background: var(--accent-soft); }
.option.current { font-weight: 700; color: var(--accent); }
</style>
