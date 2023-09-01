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
    <div class="container-info">
      <div v-if="combineMessageList[0].isPravite">
        来自与 {{ groupName }} 的聊天
      </div>
      <div v-else>
        来自群聊： {{ combineMessageList[0].groupName }}
      </div>
    </div>
    <div class="container-body">
      <div v-for="message in combineMessageList" :key="message.id">
        <div>
          <img class="user-avatar" :src="message.avatar">
          <div>
            {{ message.time }}
            {{ message.username }}
            {{ message.content }}
          </div>
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
  },
  computed: {
    groupName() {
      return this.combineMessageList[0].groupName.replace(this.$cookies.get('username'), '')
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
  padding-left: 130px;
  color: rgba(199, 29, 35, 1);
}

.container-info {
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  color: gray;
  margin-bottom: 15px;
}

.user-avatar {
  height: 40px;
}
</style>