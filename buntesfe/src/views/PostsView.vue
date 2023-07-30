<template>
  <div class="p-4 bg-orange-50">
    <post-list :items="postStore.posts" />
  </div>
</template>
<script setup lang="ts">
import PostList from '@/components/PostList.vue'
import { usePostStore } from '../stores/posts'

const postStore = usePostStore()
try {
  postStore.fetchPosts()
} catch (e) {
  console.error(e)
}
</script>
