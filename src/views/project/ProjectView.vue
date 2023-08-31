<!-- 项目详情页 -->
<template>
  <div class="container" :key="$route.fullPath">
    <ul>
      <li class="link" @click="$router.push(`/team/${curProject.teamId}/info`)">返回团队</li>
      <li><router-link class="link" :to="`/project/${$route.params.projectId}/doc`">项目文档</router-link></li>
      <li><router-link class="link" :to="`/project/${$route.params.projectId}/page`">项目原型</router-link></li>
    </ul>
    <div class="right-part">
      <div class="project-info">
        <img :src="curProject.image">
        <!-- <img src="/src/assets/head.jpeg" alt=""> -->
        <div class="info-container">
          <div class="title-time">
            <h2>{{ curProject.name }}</h2>
            <span>上次修改于{{ curProject.changedDate }}</span>
          </div>
          <div class="creator">
            创建者：{{ curProject.creator }}
          </div>
          <div class="profile">
            <div>
              项目简介：</div><div>{{ curProject.profile }}
              </div>
          </div>
        </div>
      </div>

      <!-- <div class="create">
        <template v-if="$route.fullPath.indexOf('doc') !== -1">
          <a v-if="!inFolder">新建文件夹</a>
          <a @click="showDocModal = true">新建文档</a>
        </template>
        <a v-else @click="showPageModal = true">新建原型</a>
      </div> -->

      <div class="presentation">
        <!-- <NewProject v-if="$route.fullPath.indexOf('doc') !== -1" @click="showDocModal = true"/>
        <NewProject v-else @click="showPageModal = true" /> -->
        <RouterView :key="$route.fullPath"></RouterView>
      </div>
    </div>
  </div>
  <CreateDocModal :show="showDocModal" :projectId="projectId" @close="showDocModal = false" />
  <!-- <CreateProtoModal :show="showPageModal" :projectId="projectId" @close="showPageModal = false" /> -->
</template>

<script>
import NewProject from '../../components/ListItem/team/NewProject.vue'
import DocListView from './subroute/DocListView.vue'
import PageListView from './subroute/PageListView.vue'
import CreateDocModal from '../../components/Modal/CreateDocModal.vue';
import CreateProtoModal from '../../components/Modal/CreateProtoModal.vue';
export default {
  name: 'ProjectView',
  components: { DocListView, PageListView, CreateDocModal, CreateProtoModal, NewProject},
  data() {
    return {
      curProject: {},
      protoList: [],
      projectId: '',
      showDocModal: false,
      showPageModal: false,
      inFolder: false
    }
  },
  mounted() {
    // 这里等后端接口写好后直接接上即可
    // id: projectId
    this.projectId = this.$route.params.projectId
    this.$http.get(`/api/projects/${this.projectId}/information/`).then(
      response => {
        this.curProject = response.data
      },
      error => {
        console.log(error.message)
      }
    )
    // this.$http.get(`/api/projects/file/list/${this.projectId}/`).then(
    //   response => {
    //     this.docList = response.data.files.map((doc) => ({
    //       id: doc.id,
    //       name: doc.name
    //     }))
    //   },
    //   error => {
    //     console.log(error.message)
    //   }
    // )
    // this.$http.get(`/api/projects/page/${this.projectId}/list/`).then(
    //   response => {
    //     this.protoList = response.data.map((proto) => ({
    //       id: proto.id,
    //       name: proto.name,
    //       image: proto.image
    //     }))
    //   },
    //   error => {
    //     console.log(error.message)
    //   }
    // )
  },
}
</script>
<style scoped>
.container {
  display: flex;
  height: calc(100vh - 90px);
  margin-top: 10px;
  justify-content: space-between;
}

ul {
  width: 250px;
  height: 100%;
  flex: none;
  /* background-color: lightgray; */
  border-radius: 10px;
  box-shadow: 3px 3px 3px lightgrey;
  overflow: hidden;
}

.container>div {
  margin-left: 10px;
  width: calc(100% - 330px);
  padding: 20px;
  /* background-color: lightgrey; */
}

.link {
  display: block;
  width: 200px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 5px;
  color: grey;
  box-shadow: 1px 1px 5px grey;
  cursor: pointer;
}

.link:hover {
  color: rgb(100, 100, 100);
}

.router-link-active {
  box-sizing: border-box;
  color: rgba(199,29,35, 1);
  border: 1px solid rgba(199,29,35, 1);
  box-shadow: 2px 2px  rgba(199,29,35, 1);
}

.right-part {
  margin-left: 50px;
}

.project-info {
  display: flex;
  flex-wrap: wrap;
}

.project-info img {
  width: 250px;
  height: 250px;
  border-radius: 10px;
}

.info-container {
  margin-left: 50px;
}

.title-time h2 {
  display: inline-block;
  font-size: 40px;
  font-weight: bold;
  color: rgba(199,29,35, 1);
}

.title-time span {
  font-size: 18px;
  color: grey;
  margin-left: 10px;
}

.creator {
  margin-top: 10px;
  font-size: 20px;
  color: rgba(199,29,35, 1)
}

.profile {
  display: flex;
  max-width: 800px;
}

.profile>div:first-child {
  font-size: 20px;
  min-width: 100px;
  color: rgba(199,29,35, 1);
}
.profile>div:last-child {
  color: grey;  
}

/* .presentation {
  display: flex;
  margin-top: 0px;
  width: 1150px;
  overflow-x: auto;
} */
</style>