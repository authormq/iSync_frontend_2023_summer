<!-- 个人设置中心 -->
<template>
  <div>
    <img 
      :src="avatarUrl"
      @mouseover="avatarIsHovered = true"
      @mouseleave="handleMouseLeaveAvatar"
      @click="uploadAvatar"
    >
    <input type="file" accept="image/*" ref="fileInput" @change="handleFileChange" />
  </div>
  <div>昵称：{{ nickname }}</div>
  <input type="text" :value="nickname">

  <div>姓：{{ last_name }}</div>
  <input type="text" :value="last_name">

  <div>名：{{ first_name }}</div>
  <input type="text" :value="first_name">

  <div>邮箱：{{ email }}</div>
  <input type="text" :value="email">

  <div>个人简介：{{ intro }}</div>
  <input type="text" :value="intro">

  <button @click="back">返回</button>
  <button @click="confirm">确认</button>
</template>

<script>
export default {
  name: 'UserView',
  data() {
    return {
      nickname:"",
      first_name:"",
      last_name:"",
      email:"",
      intro:"",
      avatarIsHovered: false,
      avatarFile:null,
      avatarUrl:""
    }
  },
  mounted() {
    this.$http.get('/api/accounts/1/').then(
      (response) => {
        this.nickname = response.data.username
        this.first_name = response.data.first_name
        this.last_name = response.data.last_name
        this.email = response.data.email
        this.intro = response.data.profile 
        this.avatarFile = response.data.avatar;
        this.avatarUrl = response.data.avatar;
      },
      (error) => {
        console.error(error)
      }
    )
  },
  methods:{
    back(){
      alert("返回上一页，请mq加路由")
      //todo for mq
    },
    confirm(){
      alert("保存修改信息并返回，请mq加路由")
      //todo for mq
      let data = new FormData();
      data.append("username",this.nickname)
      data.append("first_name",this.first_name)
      data.append("last_name",this.last_name)
      data.append("email",this.email)
      data.append("profile",this.profile)
      data.append("avatar",this.avatarFile)
      this.$http.post("/api/accounts/update/", data).then(
        (response) => {
          if (response.data.code === "0")
          {
            // todo for mq
          }
        }
      )
    },
    handleMouseLeaveAvatar(){
      this.avatarIsHovered = false
    },
    uploadAvatar(){
      this.$refs.fileInput.click()
    },
    handleFileChange(e){
      this.avatarFile = e.target.files[0]
      this.avatarUrl = URL.createObjectURL(this.avatarFile)
    }
  }
}
</script>

<style scoped>

</style>