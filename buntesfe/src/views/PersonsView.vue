<template>
  <div class="about">
    <h1>This is an personsview</h1>
    <person-list :items="personStore.persons" />
  </div>
</template>
<script setup lang="ts">
import PersonList from '@/components/PersonList.vue'
import { usePersonStore } from '../stores/persons'

const personStore = usePersonStore()
try {
  personStore.fetchPersons()
} catch (e) {
  console.error(e)
}
</script>
