<template>
  <StylishModal :show="show" width="500px" height="580px" padding="25px">
    <div class="register-title-container">
      <div></div>
      <div class="register-title">注册</div>
      <div class="close-icon" @click="handleClose">
        <CloseIcon size="30" />
      </div>
    </div>
    <div class="register-inputs">
      <StylishInput type="text" v-model:value="username" placeholder="用户名" spacing="30px" clearable autofocus>
        <template #hint>
          <div class="input-hint">用户名将作为你登录的账号</div>
        </template>
      </StylishInput>
      <div class="name-container">
        <StylishInput type="text" v-model:value="lastname" placeholder="姓氏" spacing="30px" clearable block width="115px">
          <template #hint>
            <div class="input-hint">实名制有助于团队更高效地工作</div>
          </template>
        </StylishInput>
        <StylishInput type="text" v-model:value="firstname" placeholder="名字" spacing="30px" clearable width="215px">
          <!-- <template #hint>
            <div class="input-hint"></div>
          </template> -->
        </StylishInput>
      </div>
      <StylishInput type="text" v-model:value="email" placeholder="邮箱" spacing="30px" clearable>
        <template #hint>
          <div class="input-hint">邮箱将用于激活账号和找回密码</div>
        </template>
      </StylishInput>
      <StylishInput type="password" v-model:value="password" placeholder="密码" spacing="20px" clearable />
      <StylishInput type="password" v-model:value="confirmedPassword" placeholder="确认密码" spacing="20px" clearable />
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
      firstname: '',
      lastname: '',
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
      //首先进行检查
      if (this.username.length < 1 || this.username.length > 150) {//用户名长度检测
        alert('用户名长度不符合要求')
        return
      }
      if (/^[\w]+$/.test(this.username) === false) {
        alert('用户名格式不符合要求')
        return
      }
      if (this.lastname.length < 1 || this.lastname.length > 150) {
        alert('姓氏长度不符合要求')
        return
      }
      if (this.firstname.length < 1 || this.firstname.length > 150) {
        alert('名字长度不符合要求')
        return
      }
      if (this.password.length < 8 || this.password.length > 20) {
        alert('密码长度不符合要求')
        return
      }
      if (this.password !== this.confirmedPassword) {
        alert('两次输入密码不一致')
        return
      }
      if (this.email.length < 1 || this.email.length >= 150) {
        alert('邮箱长度不符合要求')
        return
      }
      if (/^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/.test(this.email) === false) {
        alert('邮箱格式不符合要求')
        return
      }
      let postData = {
        username: this.username,
        first_name: this.firstname,
        last_name: this.lastname,
        password: this.password,
        password_confirm: this.confirmedPassword,
        email: this.email
      }
      this.$http.post('/api/accounts/register/', postData).then((response) => {
        alert('注册成功,请前往邮箱验证后方可登录')
        this.handleClose()
      }, (error) => {
        if (error.response.data.errors !== undefined) {
          alert(error.response.data.errors)
        }
        else {
          alert('注册失败')
        }
      })
      return
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
  color: rgba(199,29,35, 1);
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
  background-color: rgba(199,29,35, 1);
  color: white;
  transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  cursor: pointer;
  font-size: 16px;
}

.register-buttons>button:hover {
  background-color: rgba(199,29,35, 0.8);
}

.input-hint {
  font-size: 14px;
  color: lightgrey;
}
.name-container {
  display: flex;
  justify-content: space-between;
  width: 350px;
}
</style>