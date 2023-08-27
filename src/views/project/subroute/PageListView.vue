<template>
  <div v-for="proto in protoList" :key="proto.id">
    <PageListItem :proto="proto"/>
  </div>
</template>

<script>
import PageListItem from '../../../components/ListItem/project/PageListItem.vue';
export default {
    name: 'PageListView',
    components: { 
      PageListItem 
    },
    props: ['protoList']
}
</script>

<style scoped>

</style>