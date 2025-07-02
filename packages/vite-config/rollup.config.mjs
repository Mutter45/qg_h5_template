import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'index.ts',
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      exports: 'named',
      entryFileNames: 'cjs/[name].js',
    },
    {
      dir: 'dist',
      format: 'esm',
      entryFileNames: 'esm/[name].js',
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    json(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
  ],
  external: [
    // '@dcloudio/uni-cli-shared',
    // '@dcloudio/uni-automator',
    // '@dcloudio/uni-stacktracey',
    // '@dcloudio/vite-plugin-uni',
    // '@iconify-json/carbon',
    // '@types/lodash-es',
    // '@types/node',
  ],
}
