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
  <CreateTeamModal :showCreateTeamModal="showCreateTeamModal"
      @closeCreateTeamModal="closeM"></CreateTeamModal>
</template>

<script>
import CreateTeamModal from '../Modal/CreateTeamModal.vue'
export default {
  name: 'TeamSelector',
  components: {
    CreateTeamModal
  },
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
      ],
      showCreateTeamModal: false
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
      this.showCreateTeamModal = true
    },
    closeM() {
      this.showCreateTeamModal = false
    } 
  }
}
</script>

<style scoped>

</style>