import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Uni from '@dcloudio/vite-plugin-uni'
import UniPlatform from '@uni-helper/vite-plugin-uni-platform'
import { defineConfig, loadEnv } from 'vite'
import { apps } from '../../configs/apps.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const appName = env.VITE_APP_NAME

  const config = apps[appName]

  return {
    base: config.base,
    plugins: [UniPlatform(), Uni()],
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
