import type { ConfigEnv, PluginOption, UserConfig } from 'vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import apps from '../../../apps.config.json'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export interface CreateViteConfigOptions {
  plugins?: PluginOption[]
  alias?: Record<string, string>
  css?: {
    preprocessorOptions?: {
      scss?: {
        api?: string
        silenceDeprecations?: string[]
      }
    }
    postcss?: {
      plugins?: any[]
    }
  }
  extraConfig?: (env: Record<string, string>, config: any) => Partial<UserConfig>
}

export async function createViteConfig({
  plugins = [],
  alias = {},
  css,
  extraConfig,
}: CreateViteConfigOptions = {}) {
  return defineConfig(async ({ mode }: ConfigEnv): Promise<UserConfig> => {
    const env = loadEnv(mode, process.cwd())
    const appName = env.VITE_APP_NAME
    const config = apps[appName]

    console.log(process.env.UNI_PLATFORM, 'process.env::::', mode)
    console.log('环境变量 env -> ', env)

    return {
      base: config.base,
      plugins,
      css: {
        preprocessorOptions: {
          scss: {
            api: 'modern-compiler',
            silenceDeprecations: ['legacy-js-api'],
            ...css?.preprocessorOptions?.scss,
          },
        },
        postcss: {
          plugins: [],
          ...css?.postcss,
        },
      },
      resolve: {
        alias: {
          ...Object.fromEntries(
            Object.entries(alias).map(([k, v]) => [k, path.resolve(__dirname, '../../../', v)]),
          ),
          ...alias,
        },
      },
      server: {
        port: config.port,
      },
      build: {
        emptyOutDir: true,
      },
      ...(extraConfig ? extraConfig(env, config) : {}),
    }
  })
}
