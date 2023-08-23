<template>
  <StylishModal :show="show" width="500px" height="480px" padding="25px">
    <div class="register-title-container">
      <div></div>
      <div class="register-title">注册</div>
      <div class="close-icon" @click="handleClose">
        <CloseIcon size="30"/>
        </div>
    </div>
    <div class="register-inputs">
      <StylishInput type="text" v-model:value="username" placeholder="用户名" spacing="30px" clearable>
        <template #hint>
          <div class="input-hint">用户名将作为你登录的账号</div>
        </template>
      </StylishInput>
      <StylishInput type="text" v-model:value="email" placeholder="邮箱" spacing="30px" clearable>
        <template #hint>
          <div class="input-hint">邮箱能帮助你找回密码</div>
        </template>
      </StylishInput>
      <StylishInput type="password" v-model:value="password" placeholder="密码" spacing="20px" clearable />
      <StylishInput type="password" v-model:value="confirmedPassword" placeholder="确认密码" spacing="20px"  clearable />
    </div>
    <div class="register-buttons">
      <button @click="handleClose">取消</button>
      <button @click="register">注册</button>
      
    </div>
  </StylishModal>
</template>

<script>
import StylishModal from '../Stylish/StylishModal.vue'
import StylishInput from '../Stylish/StylishInput.vue'
import CloseIcon from '../Svg/CloseIcon.vue'
export default {
  name: 'Register',
  components: { StylishModal, StylishInput, CloseIcon },
  emits: ['close'],
  props: {
    show: { type: Boolean, default: false }
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmedPassword: ''   // 确认密码
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    register() {
      alert('未完成注册功能')
    }
  }
}
</script>

<style scoped>
.register-title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

.register-title {
  font-size: 30px;
  font-weight: bold;
  padding-left: 30px;
}

.close-icon {
  vertical-align: middle;
  cursor: pointer;
}

.register-inputs {
  margin-top: 30px;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.register-buttons {
  display: flex;
  justify-content: space-evenly;
}

.register-buttons>button {
  width: 80px;
  height: 40px;
  border-radius: 5px;
  background-color: rgb(180, 180, 180);
  color: white;
  transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  cursor: pointer;
  font-size: 16px;
}
.register-buttons>button:hover {
  background-color: rgb(210, 210, 210);
}

.input-hint {
  font-size: 14px;
  color: lightgrey;
}
</style>