import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  // dev only: run `php -S localhost:8000 -t public` to try the chatbot locally
  server: { proxy: { '/api': 'http://localhost:8000' } },
})
