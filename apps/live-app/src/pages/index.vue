<script setup lang='ts'>
import { say } from '@/utils/sayH'

defineOptions({
  name: 'Index',
})

say()
function handleError(e) {
  console.log(e)
}
function handleClick() {
  uni.showToast({
    title: '哈哈哈哈',
    duration: 1000,
  })
}
</script>

<template>
  <view>
    2131232
    <text>212112</text>
    <image src="@/static/play.png" @error="handleError" />
    <button @click="handleClick">
      click
    </button>
    <uni-card>
      <text>这是一个基础卡片示例，内容较少，此示例展示了一个没有任何属性不带阴影的卡片。</text>
    </uni-card>
    <uni-countdown
      color="#FFFFFF"
      background-color="#00B26A"
      border-color="#00B26A"
      :day="1"
      :hour="2"
      :minute="30"
      :second="0"
    />
    <view class="w-full flex items-center justify-center gap-x-4 text-4xl p-2 mt-4 h-10">
      <text class="i-carbon-add text-red-300" />
      <text class="i-carbon-settings" />
    </view>
    <view class="w-10 text-sm">
      测试文案23123322222
    </view>
  </view>
</template>
