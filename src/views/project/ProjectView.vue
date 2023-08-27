<!-- 项目详情页 -->
<template>
  <div class="outer-container">
    <h1>这是项目的详情页面</h1>
    <!-- 项目基本信息展示 -->
    <div>
      <!-- 项目封面 -->
      <img src="../../assets/avatar.jpeg">
      <div>
        {{ curProject.name }}
        {{ curProject.creator }}
        {{ curProject.latestChangeDate }}
        {{ curProject.profile }}
      </div>
    </div>
    <hr>
    <!-- 这是项目的文件展示区 -->
    <button>新建文档</button>
    <br>
    <button>新建原型设计</button>
    <!-- 文档信息展示 -->
    <div>
      文档：
      <DocListView :docList="docList"></DocListView>
    </div>
    <div>
      原型设计：
      <PageListView :protoList="protoList"></PageListView>
    </div>
  </div>
</template>

<script>
import DocListView from './subroute/DocListView.vue'
import PageListView from './subroute/PageListView.vue'
export default {
  name: 'ProjectView',
  components: { DocListView, PageListView },
  data() {
    return {
      curProject: {
        name: 'test',
        creator: 'mq',
        latestChangeDate: '2023-8-1 01:01:00',
        profile: 'hhh',
        projectId: null
      },
      docList: [],
      protoList: []
    }
  },
  mounted() {
    // 这里等后端接口写好后直接接上即可
    // this.$http.get(``).then(
    //   response => {
    //     this.curProject = response.data
    //     console.log(this.curProject)
    //   },
    //   error => {
    //     console.log(error.message)
    //   }
    // )
    this.projectId = this.$route.params.projectId
    this.$http.get(`/api/projects/file/list/${this.projectId}/`).then(
      response => {
        this.docList = response.data.map((doc) => ({
          id: doc.id,
          name: doc.name
        }))
      },
      error => {
        console.log(error.message)
      }
    )
    this.$bus.on('deleteDocRequest', this.handleDeleteDocRequest)
    this.$bus.on('renameDocRequest', this.handleRenameDocRequest)
  },
  methods: {
    handleDeleteDocRequest(doc) {
      // id 为 doc id
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
          docRenameData.doc.name = docRenameData.rename
        },
        error => {
          console.log(error.message)
        }
      )
    }
  },
}
</script>

<style scoped></style>