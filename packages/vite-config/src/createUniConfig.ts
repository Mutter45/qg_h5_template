import type { PluginOption } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// import UniPlatform from '@uni-helper/vite-plugin-uni-platform'
import AutoImport from 'unplugin-auto-import/vite'
import { createViteConfig } from './createViteConfig'

export interface CreateUniConfigOptions {
  alias?: Record<string, string>
  autoImportDirs?: string[]
  extraConfig?: (env: Record<string, string>, config: any) => Partial<any>
}

export async function createUniConfig({
  alias = {},
  autoImportDirs = ['src/hooks'],
  extraConfig,
}: CreateUniConfigOptions = {}) {
  // @see https://unocss.dev/ 处理UnoCSS不再支持cjs的模块
  // const UnoCSS = await import('unocss/vite').then(i => i.default)
  // const uni = await import('@dcloudio/vite-plugin-uni').then(i => i.default)

  const plugins: PluginOption[] = [
    (uni as any).default(),
    // UnoCSS(),
    AutoImport({
      imports: ['vue', 'uni-app'],
      dts: 'auto-imports.d.ts',
      dirs: autoImportDirs,
      eslintrc: { enabled: true, filepath: './.eslintrc-auto-import.mjs' },
      vueTemplate: true,
    }),
  ]

  return createViteConfig({
    plugins,
    alias,
    extraConfig,
  })
}
