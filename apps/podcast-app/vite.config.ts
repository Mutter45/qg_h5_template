import type { ConfigEnv, UserConfig } from 'vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import apps from '../../apps.config.json'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  const appName = env.VITE_APP_NAME

  const config = apps[appName]

  return {
    base: config.base,
    plugins: [vue()],
    resolve: {
      alias: Object.fromEntries(
        Object.entries(config.alias ?? {}).map(([k, v]) => [
          k,
          path.resolve(__dirname, '../../', v),
        ]),
      ),
    },
    server: {
      port: config.port,
    },
    build: {
      emptyOutDir: true,
    },
  }
})
