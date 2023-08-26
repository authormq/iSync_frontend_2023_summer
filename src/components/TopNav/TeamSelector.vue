<template>
  <div>
    <img 
      src='curAvatarUrl'
      @mouseover="avatarIsHovered = true"
      @mouseleave="handleMouseLeaveAvatar"
      @click="gotoCurTeamInfo"
    >
    <span @click="gotoCurTeamInfo">{{ teamNameNow }}</span>
  </div>
  <ul>
    <li v-for="data in teamData" :key="data">
      {{ data }}
    </li>
  </ul>
  <button @click="createNewTeam">新建团队</button>
</template>

<script>
export default {
  name: 'TeamListView',
  data() {
    return {
      curTeamName: '当前团队',
      curAvatarUrl: '',
      avatarIsHovered: false,
      teamData: [{
        'teamAvatar': '团队头像1',
        'teamName': '团队名称1',
        },
        {
          'teamAvatar': '团队头像2',
          'teamName': '团队名称2',
        },
        {
          'teamAvatar': '团队头像3',
          'teamName': '团队名称3',
        }
      ]
    }
  },
  methods: {
    handleMouseLeaveAvatar() {
      this.avatarIsHovered = false
    },
    gotoCurTeamInfo() {
      alert("跳转到团队详情页，请mq改路由")
    },
    createNewTeam() {
      alert("弹出新建团队模态框")
    }
  }
}
</script>

<style scoped>

</style>