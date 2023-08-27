<template>
  <div v-for="proto in protoList" :key="proto.id">
    <PageListItem :proto="proto"/>
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
          image: proto.image
        }))
      },
      error => {
        console.log(error.message)
      }
    )
    }
}
</script>

<style scoped>

</style>