<template>
  <!-- <StylishModal :show="false" width="500px" height="400px" padding="25px"> -->
  <div class="outer-container">
    <div class="group-name">
      {{ groupName }}
    </div>
    <div v-for="member in memberList" :key="member.id" class="member-container">
      <img class="member-avatar" :src="member.avatar">
    </div>
    <hr>
    <div class="group-name">
      {{ groupName }}
      这里需要一个重命名的样式
      <input type="text" v-model="rename">
      <button @click="confirmRenameGroup">重命名确认按钮</button>
    </div>
    <div>
      <button @click="clickSearchRecordModal">
        查找聊天记录
      </button>
      <button>
        退出群聊
        退出群聊的时候最好还是有一个确认框比较好
      </button>
    </div>
    <SearchRecordModal :show="showSearchRecordModal" @close="showSearchRecordModal = false"></SearchRecordModal>
  </div>
  <!-- </StylishModal> -->
</template>
<script>
import StylishModal from '../Stylish/StylishModal.vue'
import SearchRecordModal from './SearchRecordModal.vue'
export default {
  name: 'GroupDetailModal',
  components: { StylishModal, SearchRecordModal },
  data() {
    return {
      memberList: [],
      teamId: '',
      groupId: '',
      groupName: '',
      groupAvatar: '',
      rename: '',
      showSearchRecordModal: false // 展示搜索聊天记录的模态框
    }
  },
  mounted() {
    this.teamId = this.$route.params.teamId
    this.groupId = 38
    this.$http.get(`/api/groups/${this.groupId}/`).then(
      response => {
        this.memberList = response.data.members.map((member) => ({
          id: member.user.id,
          username: member.user.username,
          realname: member.user.last_name + member.user.first_name,
          avatar: member.user.avatar
        }))
        this.groupAvatar = response.data.avatar
        this.groupName = response.data.name
      }
    )
  },
  methods: {
    confirmRenameGroup() {
      if (this.rename.trim() == '') {
        this.$bus.emit('message', {
          title: '重命名失败',
          content: '重命名不能为空',
          time: 3000
        })
      } else {
        let formData = new FormData()
        formData.append('name', this.rename)
        this.$http.patch(`/api/groups/${this.groupId}/`, formData).then(
          response => {
            this.$bus.emit('message', {
              title: '重命名成功',
              content: '重命名为：' + this.rename,
              time: 3000
            })
          },
          error => {
            this.$bus.emit('message', {
              title: '重命名失败',
              content: '',
              time: 3000
            })
          }
        )
      }
    },
    clickSearchRecordModal() {
      this.showSearchRecordModal = true
    }
  }
}
</script>
<style scoped>
.outer-container {
  background-color: #f8f9fa;
  border: gray solid;
  border-radius: 10px;
  position: fixed;
  width: 250px;
  height: 100px;
  height: 100vh - 70;
  z-index: 999;
  right: 50px;
  top: 145px;
}

.group-name {
  font-size: 16px;
  margin-top: 8px;
  margin-left: 5px;
  font-weight: bold;
  text-align: center;
}

.member-avatar {
  width: 40px;
  height: 40px;
}

.member-container {
  display: flex;
}

@keyframes popout {
  from {
    width: 0;
    display: none;
  }

  to {
    width: 250px;
  }
}

.slide-out {
  animation: popout .5s ease;
}

.slide-hide {
  animation: popout .5s ease reverse forwards;
}
</style>