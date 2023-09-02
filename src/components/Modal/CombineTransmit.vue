<template>
  <StylishModal :show="show" :mask="false" width="500px" height="700px" padding="25px" shadow="3px 3px 10px grey">
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
        <div class="message-item clearfix">
          <div class="item-left leftfix">
            <img class="user-avatar" :src="message.avatar">
          </div>
          <div class="item-right leftfix">
            <div class="item-right-top clearfix">
              <div class="user-name leftfix">
                {{ message.username }}
              </div>
              <div class="message-time rightfix">
                {{ message.time }}
              </div>
            </div>
            <div class="message-content-normal" v-if="!message.isCombined">
              <div v-html="message.content"></div>
            </div>
            <div class="message-content-combined" v-else
              @click="this.$bus.emit('showCombinedMessageRequest', message.id)">{{ message.content }}
            </div>
          </div>
        </div>
      </div>
      <hr>
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

.header-close-icon {
  cursor: pointer;
}

.container-info {
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  color: gray;
  margin-bottom: 20px;
}

.container-body {
  overflow-y: auto;
  height: 550px;
}

.message-item {
  margin-bottom: 10px;
}


.user-avatar {
  height: 50px;
  width: 50px;
  border-radius: 5px;
}


.user-name {
  font-size: 20px;
  color: rgba(199, 29, 35, 1);
  font-weight: bold;
  margin-left: 10px;
  max-width: 200px;

  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.message-time {
  font-size: 12px;
  color: grey;
  padding-top: 8px;
}

.message-content-normal {
  max-width: 340px;
  word-break: break-all;
  margin-left: 10px;
}

.message-content-combined {
  max-width: 340px;
  word-break: break-all;
  font-weight: bold;
  margin-left: 10px;
  color: gray;
  cursor: pointer;
}
</style>