<template>
  <div class="flex flex-col gap-2 p-4 mb-8 border shadow-md w-96">
    {{ props.item }}
    <div class="p-4 bg-stone-200">
      <div v-for="comment in props.item.comments">{{ comment.author }} - {{ comment.content }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Post } from '@/types'
interface Props {
  item: Post
}
const props = defineProps<Props>()
</script>
