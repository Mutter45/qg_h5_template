<script setup lang="ts">
import { say } from '@qg/utils'

const message: string = 'Hello, Live App!'

say(message)
localStorage.setItem('liveAppMessage', message)
</script>

<template>
  <div class="app">
    <h1>🎥 Live App test1111 33334444</h1>
    <h2>{{ message }}</h2>
  </div>
</template>

<style scoped>
.app {
  padding: 2rem;
  font-family: sans-serif;
}
</style>
