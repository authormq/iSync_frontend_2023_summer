<template>
  <div>
    <TopNav v-if="'/'!==this.$route.path" /> 
  </div>
  <RouterView />
</template>
<script setup>
import TopNav from './components/TopNav/TopNav.vue'
</script>
<style scoped>
</style>
