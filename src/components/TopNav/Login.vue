<template>
  <StylishModal :show="show" width="500px" height="350px" padding="25px">
    <div class="login-title-container">
      <div></div>
      <div class="login-title">登录</div>
      <div class="close-icon" @click="handleClose">
        <CloseIcon size="30"/>
        </div>
    </div>
    <div class="login-inputs">
      <StylishInput type="text" v-model:value="username" placeholder="用户名" spacing="30px" clearable autofocus/>
      <StylishInput type="password" v-model:value="password" placeholder="密码" spacing="35px" clearable>
        <template #hint>
          <span class="input-hint" @click="changeToFindPassword">找回密码</span>
        </template>
      </StylishInput>
    </div>
    <div class="login-buttons">
      <button @click="changeToRegister">注册</button>
      <button @click="login">登录</button>
    </div>
  </StylishModal>
</template>

<script>
import StylishModal from '../Stylish/StylishModal.vue'
import StylishInput from '../Stylish/StylishInput.vue'
import CloseIcon from '../Svg/CloseIcon.vue'
export default {
  name: 'Login',
  components: { StylishModal, StylishInput, CloseIcon },
  emits: ['close', 'changeToRegister', 'changeToFindPassword'],
  props: {
    show: { type: Boolean, default: false }
  },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    changeToRegister() {
      this.$emit('changeToRegister')
    },
    changeToFindPassword() {
      this.$emit('changeToFindPassword')
    },
    login() {
      alert('未完成登录功能')
    }
  }
}
</script>

<style scoped>
.login-title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

.login-title {
  font-size: 30px;
  font-weight: bold;
  padding-left: 30px;
}

.close-icon {
  vertical-align: middle;
  cursor: pointer;
}

.login-inputs {
  margin-top: 30px;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.login-buttons {
  display: flex;
  justify-content: space-evenly;
}

.login-buttons>button {
  width: 80px;
  height: 40px;
  border-radius: 5px;
  background-color: rgb(180, 180, 180);
  color: white;
  transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  cursor: pointer;
  font-size: 16px;
}
.login-buttons>button:hover {
  background-color: rgb(210, 210, 210);
}

.input-hint {
  font-style: 14px;
  color: rgba(100, 149, 237, 0.9);
  cursor: pointer;
}
.input-hint:hover {
  color: rgb(100, 149, 237);
  text-decoration: underline;
}
</style>