<template>
  <div class="first-view">
    <div class="all-projects">全部项目</div>
    <!-- 暂未拥有项目的 UI 可以在拓展 -->
    <div class="no-project-hint" v-if="projectData.length === 0">暂未拥有项目</div>
    <div class="project-cards-container" v-else>
      <div style="margin-right: 45px; margin-bottom: 30px" v-for="project in projectData" :key="project.id">
        <ProjectListItem  :data="project"></ProjectListItem>
      </div>
    </div>
  </div>
  <!-- <h1 class="title-info">你的全部项目:</h1> -->
  
  <!-- <div class="first-show-project-container" v-for="project in projectData" :key="project.id">
    <img :src="project.image">
    <div class="project-info">
      <div class="project-name">
        {{ project.name }}
      </div>
      <div class="project-name">
        所属团队：{{ project.team}}
      </div>
      <div class="project-time">
        {{ project.changedDate }}
      </div>
    </div>
  </div> -->
</template>

<script>
import ProjectListItem from '../components/ListItem/team/ProjectListItem.vue'
export default {
    name: 'FirstView',
    components: { ProjectListItem },
    data() {
        return {
            projectData: []
        };
    },
    mounted() {
        this.$http.get(`/api/projects/search/`).then(response => {
          this.projectData = response.data.map((project) => ({
            id: project.id,
            name: project.name,
            creator: project.creator,
            team: project.team,
            image: project.image,
            latestUpdateTime: project.changedDate,
          }))
        }, error => {
            console.log(error.message);
        });
    },
}
</script>
<style scoped>
.first-view {
  height: calc(90vh - 70px);
  padding: 30px 50px;
  padding-top: 15px;
}

.all-projects {
  font-size: 50px;
  font-weight: bold;
  color: rgba(199, 29, 35, 1);
  margin-bottom: 10px;
  padding-left: 65px;
}

.project-cards-container {
  display: flex;
  flex-wrap: wrap;
  /* max-height: 600px; */
  /* overflow-y: auto; */
  padding-left: 50px;

}
</style>