<template>
  <StylishModal :show="showCreateTeamModal">
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
    <div>欢迎来到XXX，请创建团队</div>
    <div>
      团队名称：<StylishInput type="text" v-model:value="teamName"/>
      团队简介：<StylishInput type="text" v-model:value="teamProfile"/>
    </div>
    <button @click="createTeam">创建团队</button>
  </StylishModal>

</template>

<script>
import StylishModal from '../Stylish/StylishModal.vue';
import StylishInput from '../Stylish/StylishInput.vue';
export default {
  name: 'CreateTeamModal',
  components: {
    StylishModal,
    StylishInput
  },
  props: {
    showCreateTeamModal: Boolean
  },
  data() {
    return {
      avatarIsHovered: false,
      avatarFile: null,
      avatarUrl: '',
      avatarChanged: false,
      teamName: '',
      teamProfile: ''
    }
  },
  methods: {
    closeModal() {
      this.$emit("closeCreateTeamModal")
      this.avatarFile = null
      this.avatarUrl = ''
      this.teamName = ''
      this.teamProfile = ''
    },
    createTeam() {
      let data = new FormData()
      data.append('name', this.teamName)
      data.append('profile', this.teamProfile)
      if (this.avatarChanged) {
        data.append('avatar', this.avatarFile)
      }
      this.$http.post('api/teams/create/', data).then((response) => {
        alert('创建团队成功')
        this.closeModal()
      }), (error) => {
        if (error.response.data.errors !== undefined) {
          alert(error.response.data.errors)
        }
        else {
          alert('创建团队失败')
        }
      }
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