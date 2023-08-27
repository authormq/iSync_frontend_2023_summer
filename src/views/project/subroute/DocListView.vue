<template>
  <!-- <NewProject what="文档" @click="showModal = true" /> -->
  <div v-for="doc in docList" :key="doc.id">
    <DocListItem :doc="doc"/>
  </div>

  <!-- <CreateDocModal :show="showModal" @close="showModal = false" /> -->
</template>

<script>
import DocListItem from '../../../components/ListItem/project/DocListItem.vue'
import NewProject from '../../../components/ListItem/team/NewProject.vue'
import CreateDocModal from '../../../components/Modal/CreateDocModal.vue'

export default {
  name: 'DocListView',
  
  components: {
    DocListItem, NewProject, CreateDocModal
  },
  props: ['docList'],
  data() {
    return {
      showModal: false
    }
  }
}
</script>

<style scoped></style>