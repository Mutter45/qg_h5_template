#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import readline from 'node:readline'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

// 定义要清理的目录类型
const CLEAN_TARGETS = {
  node_modules: {
    name: 'node_modules',
    description: '依赖包目录',
    pattern: /^node_modules$/,
  },
  dist: {
    name: 'dist',
    description: '构建输出目录',
    pattern: /^dist$/,
  },
  build: {
    name: 'build',
    description: '构建目录',
    pattern: /^build$/,
  },
  turbo: {
    name: '.turbo',
    description: 'Turbo 缓存目录',
    pattern: /^\.turbo$/,
  },
  cache: {
    name: 'cache',
    description: '缓存目录',
    pattern: /^\.cache$|^cache$/,
  },
}

/**
 * 创建命令行交互界面
 */
function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
}

/**
 * 询问用户选择要清理的目录类型
 */
async function askForTargets() {
  const rl = createInterface()

  console.log('🧹 选择要清理的目录类型:')
  console.log('─'.repeat(50))

  Object.entries(CLEAN_TARGETS).forEach(([key, target], index) => {
    console.log(`${index + 1}. ${target.name} - ${target.description}`)
  })
  console.log('0. 清理所有类型')
  console.log('─'.repeat(50))

  return new Promise((resolve) => {
    rl.question('请输入选择 (用逗号分隔多个选项，如: 1,2,3): ', (answer) => {
      rl.close()

      const choices = answer.split(',').map(s => s.trim())
      const targets = []

      if (choices.includes('0')) {
        // 选择所有类型
        targets.push(...Object.keys(CLEAN_TARGETS))
      }
      else {
        // 根据数字选择特定类型
        choices.forEach((choice) => {
          const index = Number.parseInt(choice) - 1
          const targetKeys = Object.keys(CLEAN_TARGETS)
          if (index >= 0 && index < targetKeys.length) {
            targets.push(targetKeys[index])
          }
        })
      }

      resolve(targets)
    })
  })
}

/**
 * 确认删除操作
 */
async function confirmDeletion(targets) {
  const rl = createInterface()

  console.log('\n⚠️  确认删除以下类型的目录:')
  targets.forEach((target) => {
    console.log(`   - ${CLEAN_TARGETS[target].name} (${CLEAN_TARGETS[target].description})`)
  })
  console.log('\n⚠️  此操作不可撤销！')

  return new Promise((resolve) => {
    rl.question('确认删除？(y/N): ', (answer) => {
      rl.close()
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes')
    })
  })
}

/**
 * 异步递归查找并删除指定类型的目录
 */
async function cleanDirectories(dir, targets, deletedDirs = []) {
  try {
    const items = await fs.readdir(dir)
    const promises = []

    for (const item of items) {
      const fullPath = path.join(dir, item)
      try {
        const stat = await fs.stat(fullPath)

        if (stat.isDirectory()) {
          // 检查是否匹配要删除的目录类型
          const shouldDelete = targets.some(target =>
            CLEAN_TARGETS[target].pattern.test(item),
          )

          if (shouldDelete) {
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
          else if (item !== '.git') {
            promises.push(cleanDirectories(fullPath, targets, deletedDirs))
          }
        }
      }
      catch (error) {
        // 忽略无法访问的目录
        console.warn(`⚠️  跳过目录: ${fullPath}`, error.message)
      }
    }

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
  try {
    console.log('🧹 高级清理工具 (异步并行版)')
    console.log(`📁 根目录: ${rootDir}`)
    console.log('─'.repeat(50))

    // 获取用户选择
    const targets = await askForTargets()

    if (targets.length === 0) {
      console.log('❌ 未选择任何清理目标，退出程序')
      return
    }

    // 确认删除
    const confirmed = await confirmDeletion(targets)

    if (!confirmed) {
      console.log('❌ 用户取消操作')
      return
    }

    console.log('\n🚀 开始清理...')
    console.log('─'.repeat(50))

    const startTime = Date.now()
    const deletedDirs = await cleanDirectories(rootDir, targets)
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
      console.log(`ℹ️  没有找到匹配的目录`)
    }
  }
  catch (error) {
    console.error('❌ 程序执行出错:', error.message)
    process.exit(1)
  }
}

// 运行脚本
main()
