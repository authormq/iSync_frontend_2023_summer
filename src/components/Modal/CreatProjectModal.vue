<template>
    <StylishModal :show="showCreateProjectModal">
      <div>
        <button @click="closeModal">X</button>
      </div>
      <img
          :src="avatarUrl"
          @mouseover="avatarIsHovered = true"
          @mouseleave="handleMouseLeaveAvatar"
          @click="uploadAvatar"
        />
      <input 
        type="file"
        accept="image/*"
        ref="fileInput"
        @change="handleFileChange"
      >
      <div>创建我的项目</div>
      <div>
        项目名称：<input type="text">
        项目简介：<input type="text">
      </div>
      <button @click="createProject">创建项目</button>
    </StylishModal>
  
  </template>
  
  <script>
  import StylishModal from '../Stylish/StylishModal.vue';
  export default {
    name: 'CreateProjectModal',
    components: {
      StylishModal
    },
    props: {
      showCreateProjectModal: Boolean
    },
    data() {
      return {
        avatarIsHovered: false,
        avatarFile: null,
        avatarUrl: '',
        avatarChanged: false 
      }
    },
    methods: {
      closeModal() {
        this.$emit("closeCreateProjectModal")
        this.avatarFile = null
        this.avatarUrl = ''
      },
      createProject() {
        this.closeModal()
        //还需实现真正的创建
      },
      handleMouseLeaveAvatar() {
        this.avatarIsHovered = false
      },
      uploadAvatar() {
        this.$refs.fileInput.click()
      },
      handleFileChange(e) {
        this.avatarChanged = true
        this.avatarFile = e.target.files[0]
        this.avatarUrl = URL.createObjectURL(this.avatarFile)
      },
    }
  }
  </script>
  
  <style scoped>
  </style>