<template>
  <header>
    <nav class="flex gap-4">
      <a @click="view = HOME">Home</a>
      <a @click="view = PERSONS">Persons</a>
    </nav>
  </header>
  <home-view v-if="view == HOME"></home-view>
  <persons-view v-if="view == PERSONS"></persons-view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PersonsView from './views/PersonsView.vue'
import HomeView from './views/HomeView.vue'
const HOME = 'HOME'
const PERSONS = 'PERSONS'
const view = ref(HOME)
</script>
