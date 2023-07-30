<template>
  <header>
    <nav class="flex w-full gap-4 border-b bg-slate-100">
      <a
        @click="uiStore.view = HOME"
        class="px-4 py-1 cursor-pointer"
        :class="{ 'bg-slate-200': uiStore.view == HOME }"
        >Home</a
      >
      <a
        @click="uiStore.view = PERSONS"
        class="px-4 py-1 cursor-pointer"
        :class="{ 'bg-slate-200': uiStore.view == PERSONS }"
        >Posts</a
      >
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
