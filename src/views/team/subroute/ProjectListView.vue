<!-- 团队项目列表 -->
<template>
  <div class="project-top">
    <div class="back-to-all" v-if="showSearch" @click="showSearch = false; projectKeyword = ''">
      返回全部
    </div>
    <div class="back-to-all" v-else-if="showDeleted" @click="showDeleted = false">
      返回项目列表
    </div>
    <template v-if="!showDeleted">
      <input type="text" placeholder="团队项目名称" v-model="projectKeyword" @keyup.enter="handleSearchProject" />
      <div class="search-icon" @click="handleSearchProject" @mouseover="searchIconIsHovered = true"
        @mouseleave="searchIconIsHovered = false">
        <SearchIcon :color="searchIconIsHovered ? 'rgba(199,29,35, 1)' : 'lightgrey'" />
      </div>
      <div class="trash-icon" @click="showDeleted = true">
        <TrashIcon />
      </div>
    </template>
  </div>
  <div class="container">
    <!-- 如果是展示模式 -->
    <template v-if="!showDeleted && !showSearch">
      <!-- 展示新建项目卡片 -->
      <NewProject what="项目" @click="showModal = true"/>
      <!-- 
          用 v-for 生成卡片列表 
          【说明】ProjectListItem 有一个 type 属性，默认值为 'normal'，展示卡片
          任何非 'normal' 值会使之变成带头 “恢复” icon 的被删除卡片
      -->
      <ProjectListItem v-for="project in projectData" :key="project" :data="project"></ProjectListItem>
    </template>
    <!-- 如果是回收站模式 -->
    <template v-else-if="showDeleted">
      <ProjectListItem v-for="project in recycleData" :key="project" type="delete" :data="project"></ProjectListItem>
    </template>
    <template v-else-if="showSearch">
      <ProjectListItem v-for="project in searchData" :key="project" :data="project"></ProjectListItem>
    </template>
  </div>
  <CreateProjectModal :show="showModal" @close="showModal = false"/>
</template>

<script>
import ProjectListItem from '../../../components/ListItem/team/ProjectListItem.vue'
import NewProject from '../../../components/ListItem/team/NewProject.vue'
import SearchIcon from '../../../components/Svg/SearchIcon.vue'
import TrashIcon from '../../../components/Svg/TrashIcon.vue'
import CreateProjectModal from '../../../components/Modal/CreatProjectModal.vue'
export default {
  name: 'ProjectListView',
  components: { ProjectListItem, NewProject, SearchIcon, TrashIcon, CreateProjectModal },
  data() {
    return {
      teamId: null,
      projectData: [],
      recycleData: [],
      searchData: [],     // 记得补充 search 的接口
      showDeleted: false, // 是否正在回收站
      showSearch: false,
      searchIconIsHovered: false,
      projectKeyword: '', // 搜索关键字
      showModal: false
    }
  },
  mounted() {
    this.teamId = this.$route.params.teamId
    this.$http.get(`/api/projects/list/${this.teamId}/`).then(
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
        console.log(error.message)
      }
    )
    this.$http.get(`/api/projects/list/deleted/${this.teamId}/`).then(
      response => {
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
        console.log(error.message)
      }
    )
    this.$bus.on('renameRequest', this.handleRenameProject)
    this.$bus.on('deleteRequest', this.handleDeleteProject)
    this.$bus.on('restoreRequest', this.handleRestoreProject)
    this.$bus.on('regetProjectListRequest', this.regetProjectList)
  },
  methods: {
    regetProjectList(inValue) {
      this.$http.get(`/api/projects/list/${this.teamId}/`).then(
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
        console.log(error.message)
      }
    )
    },
    handleRenameProject(data) {
      let renameInfo = new FormData()
      renameInfo.append('name', data.rename)
      this.$http.post(`/api/projects/${data.project.id}/rename/`, renameInfo).then(
        response => {
          data.project.name = data.rename
        },
        error => {
          console.log(error.message)
        }
      )
    },
    handleDeleteProject(data) {
      this.$http.post(`/api/projects/${data.id}/delete/`).then(
        response => {
          this.projectData.splice(this.projectData.indexOf(data), 1)
          this.recycleData.push(data)
        }
      )
    },
    handleRestoreProject(data) {
      this.$http.post(`/api/projects/${data.id}/restore/`).then(
        response => {
          this.projectData.push(data)
          this.recycleData.splice(this.recycleData.indexOf(data), 1)
        },
        error => {
          console.log(error)
        }
      )
    },
    handleSearchProject() {
      this.$http.get(`/api/projects/${this.teamId}/search/?keyword=${this.projectKeyword}`).then(
        response => {
          this.searchData = response.data.map((project) => ({
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
          console.log(error.message)
        },
        this.showSearch = true
      )
    }
  }
}
</script>

<style scoped>
.project-top {
  height: 10%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
}

.back-to-all {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 20px;
  font-weight: bold;
  color: rgba(199, 29, 35, 1);
  cursor: pointer;
}

.back-to-all:hover {
  text-decoration: underline;
}

.project-top input {
  width: 300px;
  height: 35px;
  font-size: 18px;
  border-radius: 10px;
  border: 2px solid lightgrey;
  padding: 5px 10px;
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  caret-color: rgba(199, 29, 35, 1);
}

.project-top input:focus {
  border: 3px solid rgba(199, 29, 35, 1);
  /* outline: 1px solid rgba(199,29,35, 1); */
}

.project-top input::placeholder {
  color: lightgrey;
}


.search-icon {
  margin-left: 10px;
  cursor: pointer;
}

.trash-icon {
  margin-left: 30px;
  cursor: pointer;
}

.container {
  width: 1200px;
  height: 90%;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
  align-content: flex-start;
  /* padding-left: 30px; */
}
</style>