<template>
  <div class="member-container" @click="handleClick" @mouseleave="$refs.popover.style.display = 'none'">
    <img :src="data.avatar" />
    <div class="member-info">
      <div class="member-info-left">
        <div class="member-info-username">
          {{ data.username }}
        </div>
        <div class="member-info-realname">
          {{ data.lastName }}{{ data.firstName }}
        </div>
      </div>
      <div class="member-info-right">
        <div class="member-info-identity" :style="{
          'background-color': data.identity === 'leader' ? '#8b1419' :
            (data.identity === 'admin' ? 'rgba(199,29,35,1)' : 'grey')
        }">
          {{ data.Identity }}
        </div>
      </div>
    </div>

    <!-- 对信息进行更详细的展示，并且添加几个按钮，来展示需要进行身份变更 -->
    <div class="popover" ref="popover" @mouseleave="$refs.popover.style.display = 'none'">
      <div class="popover-item">
        <div class="popover-item-title">
          邮箱
        </div>
        <div class="popover-item-content">
          {{ data.email }}
        </div>
      </div>
      <div class="popover-item">
        <div class="popover-item-title">
          个人简介
        </div>
        <div class="popover-item-content">
          {{ data.profile }}
        </div>
      </div>
      <div class="popover-button">
        <button v-if="(curIdentity === 'leader' || curIdentity === 'admin') && data.identity === 'member'"
          @click="setAdminOpt">
          添加管理权限
        </button>
        <button v-else-if="this.curIdentity === 'leader' && data.identity === 'admin'" @click="cancelAdminOpt">
          移除管理权限
        </button>
        <button v-if="curIdentity !== 'member' && data.identity === 'member'" @click="deleteMemberOpt">
          移出团队
        </button>
      </div>
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
    handleClick() {
      this.$refs.popover.style.display = 'block'
    },
    handleIdentityOpt() {
      if (this.curIdentity === 'leader') {
        this.$bus.emit('leaderHandleIdentity', { data: this.data, handleIdentity: this.handleIdentity })
      } else if (this.curIdentity === 'admin') {
        this.$bus.emit('adminHandleIdentity', { data: this.data, handleIdentity: this.handleIdentity })
      }
      this.$refs.popover.style.display = 'none'
      this.handleIdentity.setAdminfalse = false
      this.handleIdentity.cancelAdmin = false
      this.handleIdentity.deleteMember = false
    },
    setAdminOpt() {
      this.handleIdentity.setAdmin = true
      this.handleIdentityOpt()
    },
    cancelAdminOpt() {
      this.handleIdentity.cancelAdmin = true
      this.handleIdentityOpt()
    },
    deleteMemberOpt() {
      this.handleIdentity.deleteMember = true
      this.handleIdentityOpt()
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
  margin-right: 30px;
  box-shadow: 1px 1px 5px lightgrey;
  border-radius: 10px;
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  padding-left: 5px;
  /* cursor: pointer; */
  position: relative;
}

.member-container:hover {
  box-shadow: 1px 1px 5px grey;
  margin: 5px;
  /* top: -2px;
  left: -2px; */
  /* transform: translate(-2px, -2px) scale(1.02); */
}

.member-container:hover .member-info-username {
  text-decoration: underline;
}

img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.member-info {
  width: 200px;
  margin-left: 10px;
  width: 300px;
  display: flex;
  justify-content: space-between;
}

.member-info-left {
  display: flex;
  align-items: baseline;
  padding-top: 5px;
}

.member-info-right {
  padding-right: 20px;
}

.member-info-username {
  max-width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 20px;
  font-weight: bold;
  color: rgba(199, 29, 35, 1);
}

.member-info-realname {
  max-width: 60px;
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
  /* margin-left: 20px; */
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

.popover {
  display: none;
  transition: none;
  position: absolute;
  padding: 15px;
  top: 90%;
  left: 80px;
  width: 280px;
  border: 3px solid rgba(199, 29, 35, 1);
  border-radius: 10px;
  background-color: white;
  z-index: 1;
}

.popover-item {
  display: flex;
  align-items: baseline;
}

.popover-item:nth-child(2) {
  margin: 10px 0;
}

.popover-item-title {
  min-width: 40px;
  max-width: 80px;
  font-size: 20px;
  font-weight: bold;
  color: rgba(199, 29, 35, 1);
}

.popover-item-content {
  max-width: 240px;
  word-break: break-all;
  color: grey;
  margin-left: 5px;
}

.popover-button {
  width: 250px;
  display: flex;
  padding: 0 10px;
  justify-content: space-between;
}

.popover-button button {
  height: 30px;
  padding: 0 10px;
  border-radius: 5px;
  background-color: rgba(199, 29, 35, 1);
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}

.popover-button button:hover {
  background-color: rgba(199, 29, 35, 0.8);
}

/* .popover-button button:first-child {
  margin-right: 20px;
} */
</style>