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
      <div 
        class="user-avatar"
        @mouseover="showAvatarHint = true"
        @mouseleave="handleMouseLeaveAvatar"
      >
        <div 
          class="user-avatar-hint" 
          v-if="showAvatarHint"
          @mouseover="avatarHintIsHovered = true"
          @mouseleave="avatarHintIsHovered = false; showAvatarHint = false"
        >
          <button @click="showLoginModal = true">立即登录</button>
          <div>首次使用？<a @click="showRegisterModal = true">点击以注册</a></div>
        </div>
      </div>
    </div>
  </div>
  <Login 
    :show="showLoginModal" 
    @close="showLoginModal = false"
    @changeToRegister="showLoginModal = false; showRegisterModal = true;"
    @changeToFindPassword="showLoginModal = false; showFindPasswordModal = true"
  />
  <Register 
    :show="showRegisterModal"
    @close="showRegisterModal = false"
  />
  <FindPassword
    :show="showFindPasswordModal"
    @close="showFindPasswordModal = false"
  />
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
  data() {
    return { 
      showAvatarHint: false,
      avatarHintIsHovered: false,
      showLoginModal: false,
      showRegisterModal: false,
      showFindPasswordModal: false
    }
  },
  methods: {
    handleMouseLeaveAvatar() {
      setTimeout(() => {
        if (!this.avatarHintIsHovered) {
          this.showAvatarHint = false
        }
      }, 300);
    }
  }
}
</script>

<style>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
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

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: bisque;
  position: relative;
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
  color:cornflowerblue;
}
.user-avatar-hint a:hover {
  text-decoration: underline;
}
</style>