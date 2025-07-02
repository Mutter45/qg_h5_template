import type { ConfigEnv, UserConfig } from 'vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Uni from '@dcloudio/vite-plugin-uni'
import UniPlatform from '@uni-helper/vite-plugin-uni-platform'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig, loadEnv } from 'vite'
import apps from '../../apps.config.json'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(async ({ mode }: ConfigEnv): Promise<UserConfig> => {
  const env = loadEnv(mode, process.cwd())
  const appName = env.VITE_APP_NAME
  // @see https://unocss.dev/ 处理UnoCSS不再支持cjs的模块
  const UnoCSS = await import('unocss/vite').then(i => i.default)

  const config = apps[appName]
  console.log(process.env.UNI_PLATFORM, 'process.env::::', mode)
  console.log('环境变量 env -> ', env)

  return {
    base: config.base,
    plugins: [
      UniPlatform() as any,
      Uni(),
      UnoCSS(),
      AutoImport({
        imports: ['vue', 'uni-app'],
        dts: 'auto-imports.d.ts',
        dirs: ['src/hooks'], // 自动导入 hooks
        eslintrc: { enabled: true, filepath: './.eslintrc-auto-import.mjs' },
        vueTemplate: true, // default false
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // or "modern", "legacy"
          // 打包小程序以上配置不生效,直接忽略警告
          silenceDeprecations: ['legacy-js-api'],
        },
      },
      postcss: {
        plugins: [
          // autoprefixer({
          //   // 指定目标浏览器
          //   overrideBrowserslist: ['> 1%', 'last 2 versions'],
          // }),
        ],
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: config.port,
    },
    build: {
      emptyOutDir: true,
    },
  }
})
