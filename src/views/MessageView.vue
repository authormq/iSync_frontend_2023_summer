<!-- 消息页面 -->
<template>
  <div>This is message Page</div>
  <div>
    <ul>
      <li @click="showAllMsg=true">全部消息</li>
      <li @click="showAllMsg=false">未读消息</li>
    </ul>
    <!-- mq: 简单的逻辑展示 -->
    <div v-if="showAllMsg">
      <MessageItem v-for="msg in allMessage" :key="msg" :msg="msg"></MessageItem>
    </div>
    <div v-else>
      <MessageItem v-for="msg in unReadMessage" :key="msg" :msg="msg"></MessageItem>
    </div>
    <button @click="setAllRead">设置全部已读</button>
    <button @click="deleteAllRead">删除全部已读</button>
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
      allMessage: [
        // {
        //   timeStamp: '1',
        //   sender: '1',
        //   receiver: '1',
        //   isRead: false,
        //   content: '1'
        // },
        // {
        //   timeStamp: '2',
        //   sender: '2',
        //   receiver: '2',
        //   isRead: true,
        //   content: '2'
        // },
        // {
        //   timeStamp: '3',
        //   sender: '3',
        //   receiver: '3',
        //   isRead: false,
        //   content: '3'
        // }
      ],
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
      this.allMessage.filter(message => message.isRead == false).forEach(message => {
        if (message.isRead == false) {
          message.isRead = true
        }
      })
    },
    deleteAllRead() {
      this.allMessage = this.allMessage.filter(message => message.isRead == false)
    }
  },
  mounted() { 
    // 这一行必须有，用来获取未读的信息
    this.divideUnReadMessage()
    // 具体需不需要这些函数，看后期后端怎么给我返回数据
    this.$bus.on('newMessage', (message) => {
      alert(`${message.sender.user.username}提到了你`)
      this.unReadMessage.push({
          timeStamp: message.create_datetime,
          sender: message.sender.user.username,
          receiver: '1',
          isRead: false,
          content: message.text_content
      })
    })
    this.$bus.on('sendChangeStatusSignal', this.handleReadStatus)
  }
}
</script>

<style scoped></style>