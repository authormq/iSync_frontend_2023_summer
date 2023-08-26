<!-- 团队项目列表 -->
<template>
  <div class="project-top">或许需要一个项目搜索</div>
  <!-- 用 v-for 生成项目列表，每个元素是一个对象
    name: 项目名称
    image: 项目图片路径
    creator: 创建者的 username
    latestUpdateTime: 最近一次更新时间 参考格式 ‘YYYY-MM-DD hh:mm:ss’
   -->
  <div class="container">
    <ProjectListItem :data="project"/>
    <ProjectListItem :data="project"/>
    <ProjectListItem :data="project"/>
    <ProjectListItem :data="project"/>
    <ProjectListItem :data="project"/>
    <ProjectListItem :data="project"/>
    <ProjectListItem :data="project"/>
    <ProjectListItem :data="project"/>
    <ProjectListItem :data="project"/>
    <ProjectListItem :data="project"/>
    <ProjectListItem :data="project"/>
    <ProjectListItem :data="project"/>
    <ProjectListItem :data="project"/>
  </div>
  <!-- <div>
    <input type="text">
    <button>这是搜索按钮</button>
    <button>这是新建项目按钮</button>
  </div>
  <ul>
    <li v-for="data in projectData" :key="data">
      {{ data }}
    </li>
  </ul> -->
</template>

<script>
import ProjectListItem from '../../../components/ListItem/team/ProjectListItem.vue'
export default {
  name: 'ProjectListView',
  components: { ProjectListItem },
  data() {
    return {
      project: {
        name: '项目名称hhhh',
        image: '/src/assets/avatar.jpeg',
        creator: '张三哈哈哈哈hh',
        latestUpdateTime: '2023-10-14 12:06:21'
      },
      projectData: [{
        'projectId': 1,
        'projectName': '这是项目名称',
        'projectPageCount': '这是项目原型数量',
        'projectDocCount': '这是项目文档数量',
        'latestUpdateTime':'这是最近修改时间'
      },
        {
        'projectId': 2,
        'projectName': '这是项目名称',
        'projectPageCount': '这是项目原型数量',
        'projectDocCount': '这是项目文档数量',
        'latestUpdateTime': '这是最近修改时间'
      }]
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