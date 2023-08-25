<template>
  <div class="header-container">
    <div>
      一个选择团队的组件
    </div>
    <div>
      <ul class="header-nav">
        <li><ChatIcon /></li>
        <li><MailIcon /></li>
        <li><MailUnreadIcon /></li>
      </ul>
      <div class="user-avatar-container">
        <img class="user-avatar" :src="avatarUrl" @mouseover="avatarIsHovered = true; showAvatarHint = true"
          @mouseleave="handleMouseLeaveAvatar" @click="handleClickAvatar">
        <div class="user-avatar-hint" v-if="showAvatarHint" @mouseover="avatarHintIsHovered = true"
          @mouseleave="handleMouseLeaveAvatarHint">
          用户名
          <a>修改信息</a>
          <a @click="logout">退出登录</a>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MailIcon from '../Svg/MailIcon.vue'
import MailUnreadIcon from '../Svg/MailUnreadIcon.vue'
import ChatIcon from '../Svg/ChatIcon.vue'
export default {
  name: 'TopNav',
  components: {
    MailIcon,
    MailUnreadIcon,
    ChatIcon
  },
  mounted() {
    this.handleFlushUserData()
  },
  data() {
    return {
      avatarIsHovered: false,
      showAvatarHint: false,
      avatarHintIsHovered: false,
      avatarUrl: '/src/assets/avatar.jpeg'
    }
  },
  methods: {
    handleMouseLeaveAvatar() {
      this.avatarIsHovered = false
      setTimeout(() => {
        if (!this.avatarIsHovered && !this.avatarHintIsHovered) {
          this.showAvatarHint = false
        }
      }, 300);
    },
    handleMouseLeaveAvatarHint() {
      this.avatarHintIsHovered = false
      setTimeout(() => {
        if (!this.avatarIsHovered && !this.avatarHintIsHovered) {
          this.showAvatarHint = false
        }
      }, 300);
    },
    logout() {
      this.$http.get('/api/accounts/logout/').then((response) => {
        alert('登出成功')
        this.handleFlushUserData()
        this.$router.push('/')
      }, (error) => {
        alert(error.response.data)
      })
    },
    handleClickAvatar() {
      if (this.$cookies.isKey('user_id') == true) {
        this.$router.push('/user')
      }
      else {
        this.showLoginModal=true
      }
    },
    handleFlushUserData() {
      if (this.$cookies.isKey('user_id') == true) {
        this.$http.get(`/api/accounts/${this.$cookies.get('user_id')}/`).then((response) => {
          this.avatarUrl = response.data.avatar
        }, (error) => {
          alert(error.response.data)
        })
      }
      else {
        this.avatarUrl= '/src/assets/avatar.jpeg'
      }
    }
  }
}
</script>

<style scoped>
.header-container {
  width: 99.5%;
  height: 70px;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  
  box-shadow: 2px 2px 3px lightgrey;
}

.header-container>div {
  display: flex;
  align-items: center;
}

.header-left>div {
  display: inline-block;
}


.header-nav>li {
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  /* border-right: 1px solid black; */
}


.user-avatar-container {
  position: relative;
  margin-left: 10px;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.5 s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.user-avatar:hover {
  transform: scale(1.05);
}

.user-avatar-hint {
  width: 150px;
  height: 100px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 1px 1px 5px grey;
  position: absolute;
  top: 100%;
  left: -100px;
  margin-top: 10px;
  text-align: center;
  overflow: hidden;
}

.user-avatar-hint button {
  height: 50px;
  margin: 10px;
  width: 90%;
  border-radius: 5px;
  cursor: pointer;
  background-color: rgb(180, 180, 180);
  transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  font-size: 20px;
  color: white;
  letter-spacing: 5px;
}

.user-avatar-hint button:hover {
  background-color: rgb(210, 210, 210);
}

.user-avatar-hint a {
  display: block;
  width: 120px;
  height: 35px;
  box-shadow: 1px 1px 3px grey;
  color: grey;
  margin: 10px 15px;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-avatar-hint a:hover {
  font-weight: bold;
  transform: translate(-2px, -2px) scale(1.02);
}
</style>