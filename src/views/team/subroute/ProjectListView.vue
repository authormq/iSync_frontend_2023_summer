<!-- 团队项目列表 -->
<template>
  <div>
    <input type="text">
    <button>这是搜索按钮</button>
    <button>这是新建项目按钮</button>
  </div>
  <ul>
    <li v-for="data in projectData" :key="data">
      {{ data }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ProjectListView',
  data() {
    return {
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

<style scoped></style>