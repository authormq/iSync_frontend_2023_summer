<template>
  <div class="banner-container">
    <!-- banner-left -->
    <div>
      <WebIcon />
      <h1 class="web-title">XXX项目管理系统</h1>
    </div>
    <!-- banner-right -->
    <div>
      <ul>
        <li><a href="#team">团队</a></li>
        <li><a href="#message">消息</a></li>
        <li><a href="#project">项目</a></li>
        <li><a href="#doc">文档</a></li>
      </ul>
      <button @click="showLoginModal = true">登录</button>
      <button @click="showRegisterModal = true">注册</button>
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
import WebIcon from '../Svg/WebIcon.vue'
import Login from './Login.vue'
import Register from './Register.vue'
import FindPassword from './FindPassword.vue'
export default {
  name: 'HomeBanner',
  components: {
    WebIcon, Login, Register, FindPassword
  },
  data() {
    return {
      showLoginModal: false,
      showRegisterModal: false,
      showFindPasswordModal: false
    }
  },
  mounted() {
    this.$bus.on('showLogin', () => {
      this.showLoginModal = true
    })
  }
}
</script>

<style scoped>
.banner-container {
  width: 100%;
  min-width: 1000px;
  height: 100px;
  box-sizing: border-box;
  padding: 10px 10px;

  position: absolute;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;

  overflow: hidden;
}
.banner-container>div {
  display: flex;
  align-items: center;
}

.web-title {
  font-size: 30px;
  font-weight: bold;
}

ul>li {
  display: inline-block;
  padding: 0 20px;
  border-right: 1px solid black;
}
ul>li:last-child {
  border-right: 0;
}
ul>li>a {
  cursor: pointer;
  font-size: 20px;
}

button {
  width: 120px;
  height: 40px;
  /* border: 1px solid black; */
  border-radius: 5px;
  margin: 0 10px;
  cursor: pointer;
  font-size: 18px;
  transition: 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
}
button:first-of-type {
  background-color: rgb(180, 180, 180);
  color: white;
}
button:first-of-type:hover {
  background-color: rgb(210, 210, 210);
}
button:last-of-type {
  box-sizing: border-box;
  border: 1px solid rgb(180, 180, 180);
  background: transparent;
  color: rgb(180, 180, 180);
}
button:last-of-type:hover {
  box-sizing: border-box;
  border: 1px solid rgb(150, 150, 150);
  background: transparent;
  color: rgb(150, 150, 150);
}
</style>