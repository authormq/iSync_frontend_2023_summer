<template>
  <TopNav />
  <RouterView />
  <project-list-view />
</template>

<script setup>
import TopNav from './components/TopNav/TopNav.vue'
import ProjectListView from './views/team/subroute/ProjectListView.vue';
</script>

<style>
/* 版心，全局配置，切勿修改 */
.container {
  width: 1300px;
  margin: 0 auto;
}
</style>
