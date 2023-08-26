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
          style="width: 30px;"
        />
      <input 
        type="file"
        accept="image/*"
        ref="fileInput"
        @change="handleFileChange"
      >
      <div>创建我的项目</div>
      <div>
        项目名称：<StylishInput type="text" v-model:value="projectName" />
        项目简介：<StylishInput type="text" v-model:value="projectProfile"/>
      </div>
      <button @click="createProject">创建项目</button>
    </StylishModal>
  
  </template>
  
  <script>
  import StylishModal from '../Stylish/StylishModal.vue';
  import StylishInput from '../Stylish/StylishInput.vue';
  export default {
    name: 'CreateProjectModal',
    components: {
    StylishModal,
    StylishInput
},
    props: {
      showCreateProjectModal: Boolean
    },
    data() {
      return {
        avatarIsHovered: false,
        avatarFile: null,
        avatarUrl: '',
        avatarChanged: false,
        projectName: '',
        projectProfile: ''
      }
    },
    methods: {
      closeModal() {
        this.$emit("closeCreateProjectModal")
        this.avatarFile = null
        this.avatarUrl = ''
        this.projectName = ''
        this.projectProfile = ''
      },
      createProject() {
        let data = new FormData()
        data.append('name', this.projectName)
        data.append('profile', this.projectProfile)
        data.append('team', 1)
        if (this.avatarChanged) {
          data.append('image', this.avatarFile)
        }
        this.$http.post('api/projects/create/', data).then((response) => {
          alert('创建项目成功')
          this.closeModal()
        }, (error) => {
          if (error.response.data.detail !== undefined) {
            alert(error.response.data.detail)
          }
          else {
            alert('创建团队失败')
          }
        })
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