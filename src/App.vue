<template>
  <div>
    <TopNav v-if="'/'!==this.$route.path" /> 
  </div>
  <RouterView />
  <!-- <text-editor /> -->
</template>
<script setup>
import TopNav from './components/TopNav/TopNav.vue'
</script>
<style scoped>
</style>
