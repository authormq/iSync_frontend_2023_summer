<!-- 项目详情页 -->
<template>
  <DocListView />
  <PageListView />
</template>

<script>
import DocListView from './subroute/DocListView.vue';
import PageListView from './subroute/PageListView.vue';
export default {
    name: 'ProjectView',
    components: { 
      DocListView,
      PageListView 
    }
}
</script>

<style scoped>

</style>