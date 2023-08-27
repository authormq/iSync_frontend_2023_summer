<template>
  <div v-for="doc in docList" :key="doc.id">
    <DocListItem :doc="doc"/>
  </div>
</template>

<script>
import DocListItem from '../../../components/ListItem/project/DocListItem.vue'
export default {
  name: 'DocListView',
  components: {
    DocListItem
  },
  props: ['docList'],
}
</script>

<style scoped></style>