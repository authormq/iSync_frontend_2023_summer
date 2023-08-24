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

  <div>真实姓名：{{ realname }}</div>
  <input type="text" :value="realname">

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
      realname:"",
      email:"",
      intro:"",
      avatarIsHovered: false,
      avatarFile:null,
      avatarUrl:""
    }
  },
  methods:{
    back(){
      alert("返回上一页，请mq加路由")
      //todo for mq
    },
    confirm(){
      alert("保存修改信息并返回，请mq加路由")
      //todo for mq
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