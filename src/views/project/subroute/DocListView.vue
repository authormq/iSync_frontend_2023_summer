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
    this.$bus.on('changeDocIdentityRequest', this.handleChangeDocIdentityRequest)
    this.$bus.on('deleteDocRequest', this.handleDeleteDocRequest)
    this.$bus.on('renameDocRequest', this.handleRenameDocRequest)
    this.$bus.on('reloadDocListAfterCreateSucceed', this.handleReloadDocList)
  },
  methods: {
    handleReloadDocList(data) {
      this.docList.unshift(data)
    },
    handleDeleteDocRequest(doc) {
      this.$http.delete(`/api/projects/file/${doc.id}/delete/`).then(
        response => {
          this.docList.splice(this.docList.indexOf(doc), 1)
        },
        error => {
          console.log(error.message)
        }
      )
    },
    handleRenameDocRequest(docRenameData) {
      this.$http.post(`/api/projects/file/${docRenameData.doc.id}/rename/${docRenameData.rename}/`).then(
        response => {
          this.docList[this.docList.indexOf(docRenameData.doc)].name = docRenameData.rename
        },
        error => {
          this.$bus.emit('message', {
            title: error.response.data.detail,
            content: '',
            time: 2000
          })
        }
      )
    },
    handleChangeDocIdentityRequest(doc) {
      this.$http.post(`/api/projects/file/${doc.id}/is_public/`).then(
        response => {
          this.docList[this.docList.indexOf(doc)].isPublic = !doc.isPublic
        },
        error => {
          console.log(error.message)
        }
      )
    }
  }
}
</script>

<style scoped></style>