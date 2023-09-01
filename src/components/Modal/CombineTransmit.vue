<template>
  <StylishModal :show="show" width="500px" height="700px" padding="25px">
    <div class="container-header">
      <div class="header-title">
        合并消息转发
      </div>
      <div class="header-close-icon" @click="handleClose">
        <CloseIcon :size="30"></CloseIcon>
      </div>
    </div>
    <div class="container-body">
      <div v-for="message in combineMessageList" :key="message.id">
        <img style="height: 10px;" :src="message.avatar">
        <div>
          {{ message.time }}
          {{ message.username }}
          {{ message.content }}
        </div>
      </div>
    </div>
  </StylishModal>
</template>
<script>
import StylishModal from '../Stylish/StylishModal.vue';
import CloseIcon from '../Svg/CloseIcon.vue';
export default {
  name: 'CombineTransmit',
  emits: ['close'],
  components: { StylishModal, CloseIcon },
  props: ['show', 'combineMessageList'],
  methods: {
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>
<style scoped>
.container-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin-bottom: 20px;
}

.header-title {
  font-size: 30px;
  font-weight: bold;
  padding-left: 70px;
  color: rgba(199, 29, 35, 1);
}
</style>