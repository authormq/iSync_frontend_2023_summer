<template>
  <StylishModal :show="show" width="500px" height="630px" padding="25px">
    <div class="container-header">
      <div class="header-title">
        转发给
      </div>
      <div class="list">
        <img  v-for="group in transmitList" :key="group.id" :src="group.avatar"  @click="handleTransmitList(group)">
      <!-- <div @click="handleClose">
        <CloseIcon size="30"></CloseIcon>
      </div> -->
      </div>
      <!-- <button @click="confirmSend">确认发送</button> -->
      <div class="container-rooms">
        <div v-for="group in groupList" :key="group.id" @click="handleTransmitList(group)">
          <img :src="group.avatar">
          <div>{{ group.name }}</div>
          <!-- <div v-if="group.isSelect">已选择</div> -->
        </div>
      </div>
      <div class="buttons">
        <button @click="handleClose">取消</button>
        <button @click="confirmSend">发送</button>
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
.container-header {
  height: 100%;
}
.header-title {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: rgba(199, 29, 35, 1);
}

.show-list {
  height: 50px;
  display: flex;
  border: rgba(199, 29, 35, 0.8) solid;
  overflow-x: auto;
  width: 500;
}

.group-list-item {
  margin-bottom: 7px;
  display: flex;
  cursor: pointer;
  border-radius: 50px;
}


.list {
  width: 430px;
  height: 50px;
  display: flex;
  overflow-x: auto;
  border-bottom: 1px solid lightgrey;
  padding-bottom: 10px;
  margin-bottom: 30px;
  margin-left: 10px;
  padding-top: 10px;
}
.list::-webkit-scrollbar {
  display: none;
}
img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0;
  margin-right: 10px;
  margin-bottom: 10px;
}


.container-rooms {
  width: 450px;
  height: 350px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  margin-left: 10px;
  overflow-y: auto;
}

.container-rooms>div {
  display: flex;
  width: 200px;
  padding-right: 10px;
  margin-bottom: 10px;
}
.container-rooms>div>div {
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.buttons {
  width: 100%;
  height: calc(100% - 510px);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.buttons button {
  width: 100px;
  height: 40px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
}
.buttons button:first-child {
  border: 1px solid rgba(199, 29, 35, 1);
  color: rgba(199, 29, 35, 1);
  background: white;
  box-sizing: border-box;
}
.buttons button:last-child {
  color: white;
  background: rgba(199, 29, 35, 1);
}
.buttons button:first-child:hover {
  border: 1px solid rgba(199, 29, 35, 0.8);
  color: rgba(199, 29, 35, 0.8);
}
.buttons button:last-child:hover {
  color: white;
  background: rgba(199, 29, 35, 0.8);
}
</style>