<!-- 消息页面 -->
<template>
  <!-- <div>This is message Page</div> -->
  <div class="tool-menu">
    <button @click="$router.go(-1)">返回</button>
    <button v-if="!showAllMsg" @click="showAllMsg = true">查看全部消息</button>
    <button v-else @click="showAllMsg = false">查看未读消息</button>
    <button @click="setAllRead">设为全部已读</button>
    <button @click="deleteAllRead">删除全部已读</button>
  </div>
  <div class="container">
    <div v-if="showAllMsg">
      <div class="messageListTitle">全部消息</div>
      <MessageItem v-for="msg in allMessage" :key="msg.msgId" :msg="msg" />
    </div>
    <div v-else>
      <div class="messageListTitle">未读消息</div>
      <MessageItem v-for="msg in unReadMessage" :key="msg.msgId" :msg="msg" />
    </div>
  </div>
</template>

<script>
import MessageItem from '../components/ListItem/message/MessageItem.vue'
export default {
  name: 'MessageView',
  components: { MessageItem },
  data() {
    return {
      showAllMsg: true,
      allMessage: [],
      unReadMessage: []
    };
  },
  mounted() {
    this.$http.get('/api/news/').then(
      (response) => {
        this.allMessage = response.data.map((news) => ({
          msgId: news.id,
          messageId: news.group_message == null ? null : news.group_message.id,
          isGroup: news.group_message == null ? false : true,
          timeStamp: news.group_message == null ? news.create_datetime : news.group_message.create_datetime,
          sender: news.group_message == null ? news.sender.username : news.group_message.sender.user.username,
          receiver: news.receiver,
          isRead: news.is_read,
          teamId: news.team_id,
          teamName: news.team_name,
          fileId: news.file_id,
          fileName: news.file_name,
          groupId: news.group_id,
          content: news.group_message == null ? `${news.sender.username}提到了你` : `${news.group_message.sender.user.username}提到了你`,
        }))
        // 这一行必须有，用来获取未读的信息
        for (let i = 0; i < this.allMessage.length; i++) {
          if (!this.allMessage[i].isRead) this.unReadMessage.push(this.allMessage[i])
        }
        console.log('@@@', this.allMessage);
        console.log('###', this.unReadMessage)
      })
    this.$bus.on('sendChangeStatusSignal', this.handleReadStatus)
    this.$bus.on('sendDeleteMessageRequest', this.handleDeleteMessage)
  },
  methods: {
    handleReadStatus(message) {
      let formData = new FormData()
      formData.append('is_read', true)
      this.$http.patch(`/api/news/${message.msgId}/`, formData).then(
        response => {
          this.unReadMessage.splice(this.unReadMessage.indexOf(message), 1)
          this.allMessage[this.allMessage.indexOf(message)].isRead = true
          // 再使用的时候就会直接刷新了
          if (this.unReadMessage.length > 0) {
            this.$bus.emit('judgeHasUnreadMsg', true)
          } else {
            this.$bus.emit('judgeHasUnreadMsg', false)
          }
        },
        error => {
          console.log(error.message)
        }
      )
    },
    divideUnReadMessage() {
      for (let i = 0; i < this.allMessage.length; i++) {
        if (!this.allMessage[i].isRead) this.unReadMessage.push(this.allMessage[i])
      }
    },
    setAllRead() {
      this.allMessage.filter(message => message.isRead == false).forEach(message => message.isRead = true)
      this.unReadMessage = []
      this.$http.post('/api/news/set_all_read/')
      this.$bus.emit('handleJudgeHasUnreadMsg', false)
    },
    deleteAllRead() {
      this.allMessage = this.allMessage.filter(message => message.isRead == false)
      this.$http.delete('/api/news/delete_all_read/')
      this.$bus.emit('judgeHasUnreadMsg', false)
    },
    handleDeleteMessage(msg) {
      this.$http.delete(`/api/news/${msg.msgId}/`).then(
        response => {
          this.allMessage.splice(this.allMessage.indexOf(msg), 1)
        },
        error => {
          console.log(error.message)
        }
      )
    }
  }
}
</script>

<style scoped>
.tool-menu {
  width: 140px;
  height: 140px;
  /* border: 1px solid black; */
  position: fixed;
  top: 15%;
  left: 8%;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 1px 1px 3px grey;
  padding: 5px;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-around;
}

.tool-menu:hover {
  box-shadow: 3px 3px 10px grey;
  /* outline: 3px solid rgba(199, 29, 35, 1); */
}

.tool-menu button {

  width: 130px;
  height: 30px;
  border-radius: 5px;
  background-color: transparent;
  box-shadow: 1px 1px 3px grey;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.tool-menu button:hover {
  transform: translate(-2px, -2px) scale(1.02);
  color: rgba(199, 29, 35, 1);
  outline: 1px solid rgba(199, 29, 35, 1);
}

.container {
  width: 850px;
  margin: 0 auto;
  margin-top: 20px;
}

.messageListTitle {
  font-size: 50px;
  font-weight: bold;
  color: rgba(199, 29, 35, 1);
  margin-bottom: 10px;
}
</style>