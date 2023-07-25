<template>
  <div class="border p-4">
    {{ props.item }}
  </div>
</template>
<script setup lang="ts">
import type { Person } from '@/types'
interface Props {
  item: Person
}
const props = defineProps<Props>()
</script>
