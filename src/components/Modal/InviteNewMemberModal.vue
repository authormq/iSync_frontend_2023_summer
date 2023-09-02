<template>
  <StylishModal :show="false" width="500px" height="700px" padding="25px" shadow="3px 3px 10px grey">
    <div class="container-header">
      <div class="header-title">
        邀请成员进群
      </div>
      <div @click="handleClose">
        <CloseIcon size="30"></CloseIcon>
      </div>
    </div>
  </StylishModal>
</template>
<script>
import StylishModal from '../Stylish/StylishModal.vue';
import CloseIcon from '../Svg/CloseIcon.vue';
export default {
  name: 'InviteNewMemberModal',
  props: ['show'],
  emits: ['close'],
  components: { StylishModal, CloseIcon },
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
  margin-bottom: 5px;
}

.header-title {
  font-size: 30px;
  font-weight: bold;
  color: rgba(199, 29, 35, 1);
  padding-left: 130px;

}
</style>