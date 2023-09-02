<template>
  <Guide v-if="isNew"/>
  <div class="first-view">
    <div class="all-projects">全部项目</div>
    <!-- 暂未拥有项目的 UI 可以在拓展 -->
    <div class="no-project-hint" v-if="projectData.length === 0">暂未拥有项目</div>
    <div class="project-cards-container" v-else>
      <div style="margin-right: 45px; margin-bottom: 30px" v-for="project in projectData" :key="project.id"
        @click="jumpToProject(project.id, project.teamId)">
        <ProjectListItem :data="project"></ProjectListItem>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectListItem from '../components/ListItem/team/ProjectListItem.vue'
import Guide from '../components/Guide/Guide.vue'
export default {
  name: 'FirstView',
  components: { ProjectListItem, Guide },
  data() {
    return {
      projectData: [],
      isNew: false,
      hasTeam: false
    };
  },
  created() {
    this.$http.get(`/api/accounts/${this.$cookies.get('user_id')}/`).then(
      response => {
        this.isNew = response.data.is_new
        this.$http.get(`/api/teams/list_by_identity/`).then(
          response => {
            this.hasTeam = response.data.length > 0 ? true : false
            if (!this.isNew && this.hasTeam) {
              // jump
            }
          }
        )
      },
      error => {
        console.log(error)
      }
    )
  },

  methods: {
    jumpToProject(id, teamId) {
      // console.log('teAm: ', teamId)
      this.$cookies.set('teamId', teamId)
      this.$router.push(`/project/${id}/doc`)
      this.$bus.emit('manualSet', teamId)
    }
  },
  mounted() {
    this.$http.get(`/api/projects/search/`).then(response => {
      this.projectData = response.data.map((project) => ({
        teamId: project.teamId,
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