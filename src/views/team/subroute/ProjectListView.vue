<!-- 团队项目列表 -->
<template>
  <div class="project-top">或许需要一个项目搜索
    <button @click="handleCreateProject">新建</button>
    <button>回收站</button>
  </div>
  <div class="container">
    <ProjectListItem v-for="project in projectData" :key="project" :data="project"></ProjectListItem>
  </div>
</template>

<script>
import ProjectListItem from '../../../components/ListItem/team/ProjectListItem.vue'
export default {
  name: 'ProjectListView',
  components: { ProjectListItem },
  data() {
    return {
      projectData: [],
      recycleData: []
    }
  },
  mounted() {
    this.$http.get(`/api/projects/list/1/`).then(
      response => {
        this.projectData = response.data.map((project) => ({
          id: project.id,
          name: project.name,
          creator: project.creator,
          latestUpdateTime: project.changedDate,
          image: project.image,
          interfaceNum: project.interfaceNum,
          documentsNum: project.documentsNum
        }))
      },
      error => {
        console.log(error.message);
      }
    )
    this.$http.get(`/api/projects/list/deleted/1/`).then(response => {
        this.recycleData = response.data.map((project) => ({
          id: project.id,
          name: project.name,
          creator: project.creator,
          latestUpdateTime: project.changedDate,
          image: project.image,
          interfaceNum: project.interfaceNum,
          documentsNum: project.documentsNum
        }))
      },
      error => {
        console.log(error.message);
      })
  },
  methods: {
    handleCreateProject() {
      
    },
    handleDeleteProject(pid) {
      this.$http.post(`/api/projects/${pid}/delete/`).then(
        response => {
          console.log(response.data);
        }
      )
    }
  }
}
</script>

<style scoped>
.project-top {
  height: 5%;
}

.container {
  width: 1200px;
  height: 95%;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
  align-content: flex-start;
  /* padding-left: 30px; */
}
</style>