<template>
  <header>
    <nav class="flex gap-4">
      <a @click="uiStore.view = HOME" class="cursor-pointer">Home</a>
      <a @click="uiStore.view = PERSONS" class="cursor-pointer">Posts</a>
    </nav>
  </header>
  <home-view v-if="uiStore.view == HOME"></home-view>
  <posts-view v-if="uiStore.view == PERSONS"></posts-view>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import PostsView from './views/PostsView.vue'
import HomeView from './views/HomeView.vue'
import { useUIStore } from './stores/ui'
const HOME = 'HOME'
const PERSONS = 'PERSONS'
const uiStore = useUIStore()
uiStore.loadUI()
watch(
  () => uiStore.view,
  (n) => {
    uiStore.saveUI()
  }
)
</script>
