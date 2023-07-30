<template>
  <div class="flex flex-wrap w-full h-full gap-8 overflow-y-auto">
    <post-list-item v-for="item in props.items" :item="item"></post-list-item>
  </div>
</template>
<script setup lang="ts">
import PostListItem from './PostListItem.vue'
import type { Post } from '@/types'
interface Props {
  items: Array<Post>
}
const props = defineProps<Props>()
</script>
