<!-- 消息页面 -->
<template>
  <!-- <div>This is message Page</div> -->
  <div class="tool-menu">
    <button v-if="!showAllMsg" @click="showAllMsg = true">全部消息</button>
    <button v-else @click="showAllMsg = false">未读消息</button>
    <button @click="setAllRead">全部已读</button>
    <button @click="deleteAllRead">删除已读</button>
  </div>
  <div class="container">
    <!-- 以下用 v-for 生成 -->
    <message-item/>
    <message-item/>
    <message-item/>
    
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
  methods: {
    handleReadStatus(message) {
      message.isRead = !message.isRead
      let messageIdx = this.unReadMessage.indexOf(message)
      if (messageIdx != -1) {
        this.unReadMessage.splice(messageIdx, 1)
      } else {
        this.unReadMessage.unshift(message)
      }
    },
    divideUnReadMessage() {
      this.unReadMessage = this.allMessage.filter(message => message.isRead == false)
    },
    setAllRead() {
      this.allMessage.filter(message => message.isRead == false).forEach(message => message.isRead = true)
      this.unReadMessage = []
      this.$http.post('/api/news/set_all_read/')
    },
    deleteAllRead() {
      this.allMessage = this.allMessage.filter(message => message.isRead == false)
      this.$http.delete('/api/news/delete_all_read/')
    }
  },
  mounted() { 
    this.$http.get('/api/news/').then((response) => {
      this.allMessage = response.data.map((news) => ({
        timeStamp: news.group_message.create_datetime,
        sender: news.group_message.sender.user.username,
        receiver: news.receiver,
        isRead: news.is_read,
        content: `${news.group_message.sender.user.username}提到了你`,
      }))
      // 这一行必须有，用来获取未读的信息
      this.divideUnReadMessage()
    })
    // 具体需不需要这些函数，看后期后端怎么给我返回数据
    this.$bus.on('newMessage', (message) => {
      alert(`${message.sender.user.username}提到了你`)
      this.unReadMessage.push({
          timeStamp: message.create_datetime,
          sender: message.sender.user.username,
          receiver: '1',
          isRead: false,
          content: `${message.sender.user.username}提到了你`
      })
    })
    this.$bus.on('sendChangeStatusSignal', this.handleReadStatus)
  }
}
</script>

<style scoped>
.tool-menu {
  width: 110px;
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
  
  width: 90px;
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
</style>