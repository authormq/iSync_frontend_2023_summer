<!-- 个人设置中心 -->
<template>
  <div>
    <!-- 头像展示 -->
    <img :src="avatarUrl"
      @mouseover="avatarIsHovered = true"
      @mouseleave="handleMouseLeaveAvatar"
      @click="uploadAvatar"
    >
    <input type="file" accept="image/*" ref="fileInput" @change="handleAvatarChange" />
  </div>
  <!-- 其他基本信息展示 -->
  <div>昵称：{{ nickname }}</div>
  <input type="text" v-model="nickname">

  <div>姓：{{ last_name }}</div>
  <input type="text" v-model="last_name">

  <div>名：{{ first_name }}</div>
  <input type="text" v-model="first_name">

  <div>邮箱：{{ email }}</div>
  <input type="text" v-model="email">

  <div>个人简介：{{ profile }}</div>
  <input type="text" v-model="profile">

  <button @click="back">返回</button>
  <br>
  <button @click="confirmModifyUserInfo">确认</button>
</template>

<script>
export default {
  name: 'UserView',
  data() {
    return {
      nickname: '',
      first_name: '',
      last_name: '',
      email: '',
      profile: '',
      avatarIsHovered: false,
      avatarFile: null,
      avatarUrl: ''
    }
  },
  mounted() {
    this.$http.get('/api/accounts/4/').then(
      (response) => {
        this.nickname = response.data.username
        this.first_name = response.data.first_name
        this.last_name = response.data.last_name
        this.email = response.data.email
        this.profile = response.data.profile
        this.avatarFile = response.data.avatar
        this.avatarUrl = response.data.avatar
      },
      (error) => {
        console.log(error)
      }
    )
  },
  methods:{
    back(){
      // mq: 添加返回上一页逻辑
      // alert("返回上一页，请mq加路由")
      this.$router.back()
    },
    // 确认提交用户修改信息 
    confirmModifyUserInfo(){
      // 收集数据
      let data = new FormData();
      data.append("username", this.nickname)
      data.append("first_name", this.first_name)
      data.append("last_name", this.last_name)
      data.append("profile", this.profile)
      // 后面加上所有用户的默认头像之后把这一段解开
      // data.append("avatar",this.avatarFile)
      this.$http.put('/api/accounts/4/', data).then(
        response => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response.data)
          } else if (response.status >= 400) {
            console.log('修改个人信息失败，请重试');
          }
        },
        error => {
          console.log(error.message);
        }
      )
    },
    handleMouseLeaveAvatar(){
      this.avatarIsHovered = false
    },
    uploadAvatar(){
      this.$refs.fileInput.click()
    },
    handleAvatarChange(e){
      this.avatarFile = e.target.files[0]
      this.avatarUrl = URL.createObjectURL(this.avatarFile)
    }
  }
}
</script>

<style scoped>

</style>