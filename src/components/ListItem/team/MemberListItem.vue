<template>
  <div class="member-container">
    <img :src="data.avatar" />
    <div class="member-info">
      <div class="member-info-basic">
        <div class="member-info-username">
          {{ data.lastName }}{{ data.firstName }}
        </div>
        <div class="member-info-realname">
          {{ data.username }}{{ data.email }}
        </div>
        <div class="member-info-identity" @click="handleIdentityClick(data)">
          {{ data.Identity }}
        </div>
      </div>
      <div class="member-info-profile">
        {{ data.profile }}
      </div>
    </div>
    <!-- 对信息进行更详细的展示，并且添加几个按钮，来展示需要进行身份变更 -->
    <div>
      <button v-if="(this.curIdentity === 'leader' || this.curIdentity === 'admin') && data.identity === 'member'" @click="setAdminOpt">设置为管理员</button>
      <button v-if="this.curIdentity === 'leader' && data.identity === 'admin'"
        @click="cancelAdminOpt">取消管理员身份</button>
      <button v-if="this.curIdentity !== 'member' && data.identity === 'member'"
        @click="deleteMemberOpt">移出团队</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemberListItem',
  props: ['data', 'curIdentity'],
  data() {
    return {
      handleIdentity: {
        setAdmin: false,
        cancelAdmin: false,
        deleteMember: false
      }
    }
  },
  methods: {
    handleIdentityClick() {
      if (this.curIdentity === 'member') {
        alert('你无权对其他成员的身份进行修改')
      } else if (this.curIdentity === 'leader') {
        this.$bus.emit('leaderHandleIdentity', { data: this.data, handleIdentity: this.handleIdentity })
      } else {
        this.$bus.emit('adminHandleIdentity', { data: this.data, handleIdentity: this.handleIdentity })
      }
    },
    setAdminOpt() {
      this.handleIdentity.setAdmin = true
    },
    cancelAdminOpt() {
      this.handleIdentity.cancelAdmin = true
    },
    deleteMemberOpt() {
      this.handleIdentity.deleteMember = true
    }
  }
}
</script>

<style scoped>
.member-container {
  width: 340px;
  height: 100px;
  display: flex;
  align-items: center;
  margin: 10px;
  margin-bottom: 20px;
  box-shadow: 1px 1px 5px lightgrey;
  border-radius: 10px;
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  padding-left: 5px;
}

.member-container:hover {
  box-shadow: 1px 1px 5px grey;
  transform: translate(-2px, -2px) scale(1.02);
}

img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.member-info {
  margin-left: 10px;
}

.member-info-basic {
  display: flex;
  align-items: baseline;
  padding-top: 5px;
}

.member-info-username {
  max-width: 140px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 20px;
  font-weight: bold;
}

.member-info-realname {
  max-width: 48px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
  margin-left: 3px;
  color: grey;
}

.member-info-identity {
  align-self: flex-end;
  padding: 5px;
  margin-left: 20px;
  background-color: grey;
  color: white;
  font-size: 14px;
  border-radius: 5px;
}

.member-info-profile {
  width: 250px;
  margin-top: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>