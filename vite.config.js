import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// host: true permite abrir o servidor no GitHub Codespaces
export default defineConfig({
  plugins: [vue()],
  server: { host: true }
})
