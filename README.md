# qg_demo

本项目为基于 **Turborepo** + **pnpm workspace** 的前端多包（monorepo）项目，旨在实现高效的多应用/多包协作开发，提升代码复用与团队协作效率。

## 目录结构

```text
qg_demo/
├─ apps/                    # 应用项目目录
│  ├─ live-app/             # 演示/主应用（支持 uni-app）
│  └─ podcast-app/          # 另一个演示应用
├─ packages/                # 公共包目录
│  ├─ ui/                   # 公共 UI 组件库
│  ├─ utils/                # 公共工具方法库
│  └─ vite-config/          # 统一 Vite 配置包
├─ dev-server/              # 本地开发服务器相关
├─ configs/                 # 配置文件目录
├─ scripts/                 # 清理等脚本工具
├─ .vscode/                 # VSCode 编辑器配置
├─ .husky/                  # Git 钩子配置目录
├─ apps.config.json         # 应用相关的全局配置文件
├─ commitlint.config.js     # git 提交规范配置
├─ eslint.config.js         # 代码规范配置
├─ tsconfig.base.json       # TypeScript 基础配置
├─ pnpm-workspace.yaml      # pnpm 工作区配置
├─ turbo.json               # Turborepo 配置
├─ package.json             # 根依赖管理
└─ README.md                # 项目说明文档
```

## 子包与主要目录说明

### apps/

- **live-app/**
  uni-app + Vue3 项目，支持多端（小程序、H5等），演示主应用。
- **podcast-app/**
  另一个 Vue3 应用示例，可用于多项目协作演示。

### packages/

- **ui/**
  公共 UI 组件库，供各应用复用。
- **utils/**
  常用工具函数库，便于各项目共享。
- **vite-config/**
  统一 Vite 配置包，支持业务项目快速集成，内置 uni-app、UnoCSS、自动导入等插件。详见 [用法说明](packages/vite-config/README.md)。

### dev-server/

本地开发服务器相关配置和入口。

### scripts/

- **clean.js**
  一键异步清理所有 `node_modules`，提升清理效率。
- **clean-advanced.js**
  交互式高级清理工具，支持选择清理 `node_modules`、`dist`、`build`、`.turbo` 等目录。详见 [脚本说明](scripts/README.md)。

## 技术栈与依赖

- **monorepo 管理**：Turborepo
- **包管理**：pnpm workspace
- **主框架**：Vue3、uni-app
- **构建工具**：Vite
- **样式**：UnoCSS
- **代码规范**：ESLint、Commitlint
- **类型系统**：TypeScript

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发环境

- 启动所有项目：

  ```bash
  pnpm run dev
  ```

- 启动指定项目：

  ```bash
  pnpm run dev --filter [项目名]
  # 例如
  pnpm run dev --filter live-app
  ```

### 构建项目

- 构建所有项目：

  ```bash
  pnpm run build
  ```

- 构建指定项目：

  ```bash
  pnpm run build --filter [项目名]
  ```

### 清理依赖/构建产物

- 快速清理所有 node_modules：

  ```bash
  pnpm clean
  ```

- 交互式选择清理：

  ```bash
  pnpm clean:advanced
  ```

## 其他说明

- 推荐使用 Node.js 20+，pnpm 8+。
- 各子包/应用可独立开发、独立构建，互不影响。
- 公共包（如 ui、utils、vite-config）可被多个应用依赖和复用。
- 详细脚本用法见 [scripts/README.md](scripts/README.md)。
- 统一 Vite 配置用法见 [packages/vite-config/README.md](packages/vite-config/README.md)。

## 参考文档

- [Turborepo 官方文档](https://turborepo.org/docs/getting-started)
- [pnpm 官方文档](https://pnpm.io/zh/)
- [uni-app 官方文档](https://uniapp.dcloud.net.cn/)
