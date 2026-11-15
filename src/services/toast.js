import { reactive } from 'vue'

const state = reactive({ items: [] })
let nextId = 1

function remove(id) {
  state.items = state.items.filter((t) => t.id !== id)
}


function show(type, message, duration = 4000) {
  const id = nextId++
  state.items.push({ id, type, message })
  if (duration > 0) setTimeout(() => remove(id), duration)
  return id
}

export default {
  state,
  show,
  remove,
  success: (message, duration) => show('success', message, duration),
  error: (message, duration) => show('error', message, duration),
  info: (message, duration) => show('info', message, duration)
}
