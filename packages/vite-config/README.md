# @qg/vite-config

公共 Vite 配置包，供各业务项目复用。

## 用法

### 基础用法

在业务项目的 vite.config.ts 中：

```ts
import { createViteConfig } from '@qg/vite-config'
import vue from '@vitejs/plugin-vue'

export default createViteConfig({
  plugins: [vue()],
  alias: {
    '@': 'apps/your-app/src',
  },
  // 可根据需要传递 css、extraConfig 等参数
})
```

### Uni 应用用法

对于 Uni 应用，使用 `createUniConfig`：

```ts
import { createUniConfig } from '@qg/vite-config'

export default createUniConfig({
  alias: {
    '@': 'apps/live-app/src',
  },
  autoImportDirs: ['src/hooks'], // 可选，默认是 ['src/hooks']
  // 可根据需要传递 extraConfig 等参数
})
```

## 特性

- 自动处理环境变量和端口配置
- 内置 Uni 应用相关插件（Uni、UniPlatform、UnoCSS、AutoImport）
- 支持自定义插件、别名、CSS 配置等
- 基于 live-app 配置优化，保持一致性
