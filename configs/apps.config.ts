export interface AppConfig {
  base: string
  port: number
  alias?: Record<string, string>
}

export const apps: Record<string, AppConfig> = {
  'live-app': {
    base: '/live/',
    port: 5175,
    alias: {
      '@': 'apps/live-app/src',
    },
  },
  'podcast-app': {
    base: '/podcast/',
    port: 5174,
    alias: {
      '@': 'apps/podcast-app/src',
    },
  },
}
