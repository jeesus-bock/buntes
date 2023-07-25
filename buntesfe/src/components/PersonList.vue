<template>
  <div class="h-full overflow-y-auto">
    <person-list-item v-for="item in props.items" :item="item"></person-list-item>
  </div>
</template>
<script setup lang="ts">
import PersonListItem from './PersonListItem.vue'
import type { Person } from '@/types'
interface Props {
  items: Array<Person>
}
const props = defineProps<Props>()
</script>
