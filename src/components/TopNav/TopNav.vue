<template>
  <div class="container header-container">
    <div>
      <div class="web-icon"></div>
      <h1 class="web-title">小学期项目网页的标题</h1>
    </div>
    <div>
      <ul class="header-nav">
        <li>nav1</li>
        <li>nav2</li>
        <li>nav3</li>
        <li>nav4</li>
        <li>nav5</li>
      </ul>
      <div class="user-avatar-container">
        <img class="user-avatar" :src="avatarUrl" @mouseover="avatarIsHovered = true; showAvatarHint = true"
          @mouseleave="handleMouseLeaveAvatar" @click="handleClickAvatar">
        <div class="user-avatar-hint" v-if="showAvatarHint" @mouseover="avatarHintIsHovered = true"
          @mouseleave="handleMouseLeaveAvatarHint">
          <div v-if="this.$cookies.isKey('user_id') == false">
            <button @click="showLoginModal = true">立即登录</button>
            <div>首次使用？<a @click="showRegisterModal = true">点击以注册</a></div>
          </div>
          <div v-else>
            <button @click="logout">登出</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Login :show="showLoginModal" @close="showLoginModal = false"
    @changeToRegister="showLoginModal = false; showRegisterModal = true;"
    @changeToFindPassword="showLoginModal = false; showFindPasswordModal = true" @flushUserData="handleFlushUserData" />
  <Register :show="showRegisterModal" @close="showRegisterModal = false" />
  <FindPassword :show="showFindPasswordModal" @close="showFindPasswordModal = false" />
</template>

<script>
import Login from './Login.vue'
import Register from './Register.vue'
import FindPassword from './FindPassword.vue'
export default {
  name: 'TopNav',
  components: {
    Login,
    Register,
    FindPassword
  },
  mounted() {
    this.handleFlushUserData()
  },
  data() {
    return {
      avatarIsHovered: false,
      showAvatarHint: false,
      avatarHintIsHovered: false,
      showLoginModal: false,
      showRegisterModal: false,
      showFindPasswordModal: false,
      avatarUrl: ''
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: yellow;
  height: 60px;
}

.header-container>div {
  display: flex;
  align-items: center;
}

.header-left>div {
  display: inline-block;
}

.web-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: skyblue;
}

.web-title {
  margin: 0 10px;
  font-size: 30px;
  background-color: skyblue;
}


.header-nav>li {
  display: inline-block;
  padding: 0 20px;
  border-right: 1px solid black;
}

.header-nav>li:last-child {
  border-right: 0;
}

.user-avatar-container {
  position: relative;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}

.user-avatar-hint {
  width: 300px;
  height: 100px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 1px 1px 5px grey;
  position: absolute;
  top: 100%;
  left: -250px;
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
  cursor: pointer;
  color: cornflowerblue;
}

.user-avatar-hint a:hover {
  text-decoration: underline;
}
</style>