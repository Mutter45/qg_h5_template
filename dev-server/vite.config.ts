import { defineConfig } from 'vite'
import { apps } from '../configs/apps.config'

const proxy = Object.fromEntries(
  Object.entries(apps).map(([, config]) => [
    config.base.replace(/\/$/, ''),
    {
      target: `http://localhost:${config.port}`,
      changeOrigin: true,
      ws: true,
    },
  ]),
)
console.log(proxy, 'proxy::::')
export default defineConfig({
  server: {
    port: 5173,
    open: true,
    proxy,
  },
})
