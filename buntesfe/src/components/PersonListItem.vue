<template>
  <div class="flex flex-col gap-2 p-4 border shadow-md w-96">
    {{ props.item.name }}
    <div class="shadow-sm">
      <div v-for="pet in props.item.pets">{{ pet.name }} - {{ pet.species }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Person } from '@/types'
interface Props {
  item: Person
}
const props = defineProps<Props>()
</script>
