<!-- 团队项目列表 -->
<template>
  <div class="project-top">
    <div class="back-to-all" v-if="!showAll && !showDeleted" @click="showAll = true; projectKeyword = ''">
      返回全部
    </div>
    <div class="back-to-all" v-else-if="showDeleted" @click="showDeleted = false">
      返回项目列表
    </div>
    <template v-if="!showDeleted">
      <!-- 以下有两处 search 方法调用 应改为项目搜索！ -->
      <input type="text" placeholder="团队项目名称" v-model="projectKeyword" @keyup.enter="searchUser"/>
      <div 
        class="search-icon" 
        @click="searchUser" 
        @mouseover="searchIconIsHovered = true" @mouseleave="searchIconIsHovered = false"
      >
        <SearchIcon :color="searchIconIsHovered ? 'rgba(199,29,35, 1)' : 'lightgrey'"/>
      </div>
      <div class="trash-icon" @click="showDeleted = true">
        <TrashIcon />
      </div>
    </template>
    
    <!-- <button @click="handleCreateProject">新建</button>
    <button>回收站</button>
    <div v-if="false">回收站
    </div> -->
  </div>
  <div class="container">
    <!-- 如果是展示模式 -->
    <template v-if="!showDeleted">
      <!-- 展示新建项目卡片 -->
      <NewProject />
      <!-- 一个展示死数据的卡片，可以删除 -->
      <ProjectListItem :data="temp"/>
      <!-- 
          用 v-for 生成卡片列表 
          【说明】ProjectListItem 有一个 type 属性，默认值为 'normal'，展示卡片
          任何非 'normal' 值会使之变成带头 “恢复” icon 的被删除卡片
      -->
      <ProjectListItem v-for="project in projectData" :key="project" :data="project" :isRestore="true"></ProjectListItem>
    </template>
    <!-- 如果是回收站模式 -->
    <template v-else>
      <!-- 一个展示死数据的卡片，可以删除 -->
      <ProjectListItem type="delete" :data="temp"/>
      <!--
           用 v-for 生成被删除卡片，给 ProjectListItem 的 type 属性指定一个非 'normal' 值，如 'delete'
           【注意】v-for 遍历的数组，不需要自己从 projectData 中 filter。后端有一个接口提供已经 filter 好的
           至少应该传入 id name creator lastUpdateTime 字段
           最后一个字段的含义见 ProjectListItem 文件
          -->
    </template>
  </div>
</template>

<script>
import ProjectListItem from '../../../components/ListItem/team/ProjectListItem.vue'
import NewProject from '../../../components/ListItem/team/NewProject.vue'
import SearchIcon from '../../../components/Svg/SearchIcon.vue'
import TrashIcon from '../../../components/Svg/TrashIcon.vue'
export default {
  name: 'ProjectListView',
  components: { ProjectListItem, NewProject, SearchIcon, TrashIcon },
  data() {
    return {
      projectData: [],
      recycleData: [],
      searchData: [],     // 记得补充 search 的接口
      showAll: true,      // 是否展示全部项目
      showDeleted: false, // 是否正在回收站
      searchIconIsHovered: false,
      projectKeyword: '', // 搜索关键字
      temp: {
        name: '一个项目',
        creator: '梦桥园和',
        latestUpdateTime: '2023-10-11 23:10:27'
      }
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
        console.log(error.message)
      }
    )
    this.$http.get(`/api/projects/list/deleted/1/`).then(
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
  },
  methods: {
    handleCreateProject() {

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
          this.recycleData.push(response)
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
  color: rgba(199,29,35, 1);
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
  caret-color: rgba(199,29,35, 1);
}

.project-top input:focus {
  border: 3px solid rgba(199,29,35, 1);
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