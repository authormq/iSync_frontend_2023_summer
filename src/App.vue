<template>
  <div>
    <TopNav v-if="'/'!==this.$route.path" />
    <TeamSelector /> 
  </div>
  <RouterView />
</template>
<script setup>
import TopNav from './components/TopNav/TopNav.vue'
import TeamSelector from './components/TopNav/TeamSelector.vue'
</script>
<style scoped>
</style>
