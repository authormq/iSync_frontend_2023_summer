<template>
  <StylishModal :show="show" width="600px" height="600px" padding="25px">
    <div class="container-header">
      <div class="header-title">
        转发给：
      </div>
      <div @click="handleClose">
        <CloseIcon size="30"></CloseIcon>
      </div>
    </div>
    <div class="container-show-transmit">
      <div class="show-list">
        <div v-for="group in transmitList" :key="group.id">
          <img :src="group.avatar" style="height: 50px; border-radius: 50px;" @click="handleTransmitList(group)">
        </div>
      </div>
      以上群聊/个人将会收到消息
      <button @click="confirmSend">确认发送</button>
    </div>
    <div class="container-rooms">
      <div v-for="group in groupList" :key="group.id">
        <div class="group-list-item" @click="handleTransmitList(group)">
          <img :src="group.avatar" style="height: 50px; border-radius: 50px;">
          {{ group.name }}
          <div v-if="group.isSelect">已选择</div>
        </div>
      </div>
    </div>
  </StylishModal>
</template>
<script>
import StylishModal from '../Stylish/StylishModal.vue';
import CloseIcon from '../Svg/CloseIcon.vue';
export default {
  name: 'TransmitMessage',
  props: ['show', 'rooms', 'transmitType'],
  emits: ['close'],
  components: {
    StylishModal,
    CloseIcon
  },
  data() {
    return {
      teamId: '',
      transmitList: [] // 需要转发到的群聊/个人列表
    }
  },
  mounted() {
    this.teamId = this.$route.params.teamId
  },
  computed: {
    // 需要用computed，不然如果直接在mounted里面使用rooms，有可能props传过来的还是一个没有response完的数组
    groupList() {
      return this.rooms.map((room, index) => ({
        index: index,
        id: room.roomId,
        avatar: room.avatar,
        name: room.roomName,
        isSelect: false
      }))
    }
  },
  methods: {
    handleClose() {
      this.transmitList = []
      for (let group of this.groupList) {
        group.isSelect = false
      }
      this.$emit('close')
    },
    handleTransmitList(group) {
      if (!group.isSelect) {
        group.isSelect = true
        this.transmitList.push(group)
      } else {
        this.transmitList.splice(this.transmitList.indexOf(group), 1)
        group.isSelect = false
      }
    },
    confirmSend() {
      this.$bus.emit('forwardMessages', this.transmitList)
      this.handleClose()
    }
  }
}
</script>
<style scoped>
.header-title {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}

.show-list {
  height: 50px;
  display: flex;
  border: rgba(199, 29, 35, 0.8) solid;
}
.group-list-item {
  margin-bottom: 7px;
  display: flex;
  cursor: pointer;
  border-radius: 50px;
}

.container-rooms {
  height: 400px;
  overflow: auto;
}
</style>