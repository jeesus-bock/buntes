<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="flex gap-4">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/persons">Persons</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
