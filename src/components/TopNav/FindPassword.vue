<template>
  <StylishModal :show="show" width="500px" height="350px" padding="25px">
    <div class="pwd-title-container">
      <div></div>
      <div class="pwd-title">找回密码</div>
      <div class="close-icon" @click="handleClose">
        <CloseIcon size="30"/>
        </div>
    </div>
    <div class="pwd-inputs">
      <StylishInput type="text" v-model:value="username" placeholder="用户名" spacing="30px" clearable autofocus/>
      <StylishInput type="text" v-model:value="email" placeholder="输入邮箱以验证" spacing="30px" clearable>
        <template #hint>
          <div class="input-hint">确认后，一封重置密码的邮件将发送到此邮箱</div>
        </template>
      </StylishInput>
    </div>
    <div class="pwd-buttons">
      <button @click="handleClose">取消</button>
      <button @click="find">确认</button>
    </div>
  </StylishModal>
</template>

<script>
import StylishModal from '../Stylish/StylishModal.vue'
import StylishInput from '../Stylish/StylishInput.vue'
import CloseIcon from '../Svg/CloseIcon.vue'
export default {
  name: 'FindPassword',
  components: { StylishModal, StylishInput, CloseIcon },
  emits: ['close'],
  props: {
    show: { type: Boolean, default: false }
  },
  data() {
    return {
      username: '',
      email: '',
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    // find() {
    //   alert('未完成找回密码功能')
    // }
  }
}
</script>

<style scoped>
.pwd-title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

.pwd-title {
  font-size: 30px;
  font-weight: bold;
  padding-left: 30px;
  color: rgba(199,29,35, 1);
}

.close-icon {
  vertical-align: middle;
  cursor: pointer;
}

.pwd-inputs {
  margin-top: 30px;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.pwd-buttons {
  display: flex;
  justify-content: space-evenly;
}

.pwd-buttons>button {
  width: 80px;
  height: 40px;
  border-radius: 5px;
  background-color: rgba(199,29,35, 1);
  color: white;
  transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  cursor: pointer;
  font-size: 16px;
}
.pwd-buttons>button:hover {
  background-color: rgba(199,29,35, 0.8);
}

.input-hint {
  font-size: 14px;
  color: lightgrey;
}
</style>