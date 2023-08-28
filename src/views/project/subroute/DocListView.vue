<template>
  <!-- <NewProject what="文档" @click="showModal = true" /> -->
  <div v-for="doc in docList" :key="doc.id" @click="$router.push(`/doc/${doc.id}`)">
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
  // props: ['docList'],
  // props: ['projectId'],
  data() {
    return {
      showModal: false,
      docList: [],
      projectId: ''
    }
  },
  mounted() {
    this.projectId = this.$route.params.projectId
    this.$http.get(`/api/projects/file/list/${this.projectId}/`).then(
      response => {
        this.docList = response.data.map((doc) => ({
          id: doc.id,
          name: doc.name,
          isPublic: doc.isPublic
        }))
      },
      error => {
        console.log(error.message)
      }
    )
  }
}
</script>

<style scoped></style>