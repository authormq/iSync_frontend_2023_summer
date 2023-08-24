<template>
  <TopNav />
  <RouterView />
  <UserView />
</template>

<script setup>
import TopNav from './components/TopNav/TopNav.vue'
import UserView from './views/UserView.vue';
</script>

<style>
/* 版心，全局配置，切勿修改 */
.container {
  width: 1300px;
  margin: 0 auto;
}
</style>
