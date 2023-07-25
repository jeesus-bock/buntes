<template>
  <div class="border p-4 flex flex-col gap-2">
    {{ props.item.name }}
    <div v-for="pet in props.item.pets">{{ pet.name }} - {{ pet.species }}</div>
  </div>
</template>
<script setup lang="ts">
import type { Person } from '@/types'
interface Props {
  item: Person
}
const props = defineProps<Props>()
</script>
