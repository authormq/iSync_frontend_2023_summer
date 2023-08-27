<template>
  <!-- <NewProject what="原型" @click="showModal = true"/> -->
  <div v-for="proto in protoList" :key="proto.id">
    <PageListItem :proto="proto"/>
  </div>
  <!-- <CreateProtoModal :show="showModal" :projectId="projectId"  @close="showModal = false"/> -->
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
    props: ['protoList', 'projectId'],
    data() {
      return {
        showModal: false
      }
    }
}
</script>

<style scoped>

</style>