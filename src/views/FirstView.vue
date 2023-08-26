<template>
  <h1 class="title-info">你的全部项目:</h1>
  <div class="first-show-project-container" v-for="project in projectData" :key="project.id">
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
  </div>
</template>
<script>
export default {
    name: 'FirstView',
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
            team: project.team,
            image: project.image,
            changedDate: project.changedDate
          }))
        }, error => {
            console.log(error.message);
        });
    },
}
</script>
<style scoped>
.title-info {
  font-size: 50px;
  font-weight: bolder;
  color: rgba(199, 29, 35, 1);
}
.first-show-project-container {
  width: 240px;
  height: 240px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px lightgrey;
  margin: 15px;
  cursor: pointer;

  /* transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1); */
}

img {
  display: block;
  margin: 0 auto;
  width: 200px;
  height: 150px;
}

.project-info {
  width: 200px;
  margin: 0 auto;
  margin-top: 10px;
}

.project-name {
  color: rgba(199, 29, 35, 1);
  font-size: 20px;
  font-weight: bold;
  position: relative;
}

.project-time {
  font-size: 14px;
  color: lightgrey;
}
</style>