<template>
  <StylishModal :show="show" width="500px" height="500px" padding="25px" shadow="3px 3px 10px grey">
    <div class="container-header">
      <div class="header-title">
        邀请成员进群
      </div>
      <div @click="handleClose">
        <CloseIcon size="30"></CloseIcon>
      </div>
    </div>
    <div class="container-selected">
      <div class="selected-info">
        已选择邀请的成员
      </div>
      <div>
        <!-- 这里应该是横向加一个滚动条 -->
        <div v-for="member in selectedList" :key="member.id">
          <img :src="member.avatar" style="height: 40px;">
        </div>
      </div>
    </div>
    <div class="container-body">
      <div class="body-info">
        选择你要邀请加入该群的成员
      </div>
      <div class="body-members">
        <div v-for="member in inviteList" :key="member.id">
          <div @click="handleSelect(member)">
            <img style="height: 40px;" :src="member.avatar">
            {{ member.username }}
            <div v-if="member.isSelect">已选择</div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-bottom">
      <button @click="handleClose">取消</button>
      <button @click="handleInvite">确认</button>
    </div>
  </StylishModal>
</template>
<script>
import StylishModal from '../Stylish/StylishModal.vue';
import CloseIcon from '../Svg/CloseIcon.vue';
export default {
  name: 'InviteNewMemberModal',
  props: ['show', 'groupId'],
  emits: ['close'],
  components: { StylishModal, CloseIcon },
  data() {
    return {
      teamMemberList: [],
      groupMemberList: [],
      inviteList: [],
      selectedList: []
    }
  },
  watch: {
    show() {
      console.log(this.inviteList);
      console.log(this.teamMemberList);
      console.log(this.groupMemberList)
      this.inviteList = this.teamMemberList.filter(itemA => !this.groupMemberList.some(itemB => itemB.id == itemA.id))
      console.log('@@@', this.inviteList);
    },
    groupId() {
      this.getData()
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    getData() {
      this.$http.get(`/api/teams/${this.$route.params.teamId}/`).then(
        response => {
          this.teamMemberList = response.data.members.map((member) => ({
            id: member.user.id,
            username: member.user.username,
            avatar: member.user.avatar,
            isSelect: false
          }))
        },
        error => {
          console.log(error.message)
        }
      )
      this.$http.get(`/api/groups/${this.groupId}/`).then(
        response => {
          this.groupMemberList = response.data.members.map((member) => ({
            id: member.user.id,
            username: member.user.username,
            avatar: member.user.avatar,
            isSelect: false
          }))
        },
        error => {
          console.log(error.message)
        }
      )
    },
    handleSelect(member) {
      if (!member.isSelect) {
        member.isSelect = true
        this.selectedList.push(member)
      } else {
        this.selectedList.splice(this.selectedList.indexOf(member), 1)
        member.isSelect = false
      }
    },
    handleInvite() {
      let idList = this.selectedList.map(item => item.id)
      console.log(idList.join(' '));
      let formData = new FormData()
      formData.append('users', idList.join(' '))
      this.$http.post(`/api/groups/${this.groupId}/add/member/`, formData).then(
        response => {
          this.$bus.emit('message', {
            title: '邀请新成员进群成功',
            content: '',
            time: 3000
          })
        },
        error => {
          this.$bus.emit('message', {
            title: '邀请新成员进群失败',
            content: '',
            time: 3000
          })
        }
      )
    }
  }
}
</script>
<style scoped>
.container-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin-bottom: 5px;
}

.header-title {
  font-size: 30px;
  font-weight: bold;
  color: rgba(199, 29, 35, 1);
  padding-left: 130px;
}

.container-selected {
  width: 450px;
  height: 60px;
  background-color: orange;
  overflow-x: auto;
}

.body-members {
  height: 300px;
  background-color: bisque;
  overflow-y: auto;
}
</style>