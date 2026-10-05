import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

const certDir = path.resolve(import.meta.dirname, './.certs')
const keyPath = path.join(certDir, 'localhost-key.pem')
const certPath = path.join(certDir, 'localhost.pem')
if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
  throw new Error(
    'Certificados HTTPS ausentes em planejai/.certs/. Gere com: openssl req -x509 -newkey rsa:2048 -keyout .certs/localhost-key.pem -out .certs/localhost.pem -days 3650 -nodes -subj "/CN=localhost"',
  )
}
const https = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
}
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5550,
    https,
  },
  preview: {
    port: 5551,
    https,
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
