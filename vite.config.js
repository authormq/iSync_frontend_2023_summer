import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': 'http://43.138.14.231:9000/', 
      // '/pr ojects': 'http://43.138.14.231:3000/'// 后端 URL
      // '/ws': 'ws://43.138.14.231:9000/'  
    }
  }
})
