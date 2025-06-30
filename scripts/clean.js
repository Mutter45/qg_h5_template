#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

// 要排除的目录（避免不必要的搜索）
const EXCLUDE_DIRS = new Set([
  '.git',
  'dist',
  'build',
  '.turbo',
  'coverage',
  '.cache',
  'cache',
])

/**
 * 异步递归查找并删除 node_modules 目录
 * @param {string} dir 要搜索的目录
 * @param {string[]} deletedDirs 已删除的目录列表
 * @returns {Promise<string[]>} 删除的目录列表
 */
async function cleanNodeModules(dir, deletedDirs = []) {
  try {
    const items = await fs.readdir(dir)
    const promises = []

    for (const item of items) {
      const fullPath = path.join(dir, item)

      try {
        const stat = await fs.stat(fullPath)

        if (stat.isDirectory()) {
          if (item === 'node_modules') {
            // 立即删除 node_modules 目录
            promises.push(
              fs.rm(fullPath, { recursive: true, force: true })
                .then(() => {
                  deletedDirs.push(fullPath)
                  console.log(`✅ 已删除: ${fullPath}`)
                })
                .catch((error) => {
                  console.error(`❌ 删除失败: ${fullPath}`, error.message)
                }),
            )
          }
          else if (!EXCLUDE_DIRS.has(item)) {
            // 递归搜索其他目录
            promises.push(cleanNodeModules(fullPath, deletedDirs))
          }
        }
      }
      catch (error) {
        // 忽略无法访问的目录
        console.warn(`⚠️  跳过目录: ${fullPath}`, error.message)
      }
    }

    // 并行处理所有操作
    await Promise.all(promises)
  }
  catch (error) {
    console.error(`❌ 读取目录失败: ${dir}`, error.message)
  }

  return deletedDirs
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 快速清理 node_modules...')
  console.log(`📁 根目录: ${rootDir}`)
  console.log('─'.repeat(50))

  const startTime = Date.now()
  const deletedDirs = await cleanNodeModules(rootDir)
  const endTime = Date.now()

  console.log('─'.repeat(50))
  console.log(`✨ 清理完成！`)
  console.log(`📊 统计信息:`)
  console.log(`   - 删除的目录数量: ${deletedDirs.length}`)
  console.log(`   - 耗时: ${endTime - startTime}ms`)

  if (deletedDirs.length > 0) {
    console.log(`🗑️  已删除的目录:`)
    deletedDirs.forEach((dir) => {
      console.log(`   - ${dir}`)
    })
  }
  else {
    console.log(`ℹ️  没有找到 node_modules 目录`)
  }
}

// 运行脚本
main().catch((error) => {
  console.error('❌ 程序执行出错:', error.message)
  process.exit(1)
})
