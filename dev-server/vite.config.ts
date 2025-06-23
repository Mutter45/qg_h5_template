import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5173,
    open: true,
    proxy: {
      // 转发 HTTP 和 WS 请求到 live-app
      '/podcast': {
        target: 'http://localhost:5174',
        changeOrigin: true,
        ws: true,
      },
      '/live': {
        target: 'http://localhost:5175',
        changeOrigin: true,
        ws: true,
      },
    },
  },
})
