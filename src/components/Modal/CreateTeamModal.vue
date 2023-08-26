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
      />
    <input 
      type="file"
      accept="image/*"
      ref="fileInput"
      @change="handleFileChange"
    >
    <div>欢迎来到XXX，请创建团队</div>
    <div>
      团队名称：<input type="text">
    </div>
    <button @click="createTeam">创建团队</button>
  </StylishModal>

</template>

<script>
import StylishModal from '../Stylish/StylishModal.vue';
export default {
  name: 'CreateTeamModal',
  components: {
    StylishModal
  },
  props: {
    showCreateTeamModal: Boolean
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
      this.$emit("closeCreateTeamModal")
      this.avatarFile = null
      this.avatarUrl = ''
    },
    createTeam() {
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