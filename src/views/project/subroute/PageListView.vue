<template>
  <div v-for="proto in protoList" :key="proto.id" @click="$router.push(`/page/${proto.id}`)">
    <PageListItem :proto="proto" />
  </div>
</template>

<script>
import PageListItem from '../../../components/ListItem/project/PageListItem.vue'
import CreateProtoModal from '../../../components/Modal/CreateProtoModal.vue'
import NewProject from '../../../components/ListItem/team/NewProject.vue'
export default {
  name: 'PageListView',
  components: { CreateProtoModal, NewProject },
  components: {
    PageListItem
  },
  data() {
    return {
      showModal: false,
      protoList: [],
      projectId: ''
    }
  },
  mounted() {
    this.projectId = this.$route.params.projectId
    this.$http.get(`/api/projects/page/${this.projectId}/list/`).then(
      response => {
        this.protoList = response.data.map((proto) => ({
          id: proto.id,
          name: proto.name,
          // image: proto.image
        }))
      },
      error => {
        console.log(error.message)
      }
    )
    this.$bus.on('reloadProtoListAfterCreateSucceed', this.handleReloadProtoList)
    this.$bus.on('deleteProtoRequest', this.handleDeleteProtoRequest)
    this.$bus.on('renameProtoRequest', this.handleRenameProtoRequest)
  },
  methods: {
    handleReloadProtoList(proto) {
      this.protoList.unshift(proto)
    },
    handleDeleteProtoRequest(proto) {
      this.$http.delete(`/api/projects/page/${proto.id}/delete/`).then(
        response => {
          this.protoList.splice(this.protoList.indexOf(proto), 1)
        },
        error => {
          console.log(error.message)
        }
      )
    },
    handleRenameProtoRequest(protoRenameData) {
      this.$http.post(`/api/projects/page/${protoRenameData.proto.id}/rename/${protoRenameData.rename}/`).then(
        response => {
          this.protoList[this.protoList.indexOf(protoRenameData.proto)].name = protoRenameData.rename
        },
        error => {
          this.$bus.emit('message', {
            title: error.response.data.detail,
            content: '',
            time: 2000
          })
        }
      )
    }
  }
}
</script>

<style scoped></style>