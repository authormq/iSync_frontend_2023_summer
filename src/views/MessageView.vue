<!-- 消息页面 -->
<template>
  <div>This is message Page</div>
  <div>
    <ul>
      <li><router-link to="/message/all">全部消息</router-link></li>
      <li><router-link to="/message/unread">未读消息</router-link></li>
    </ul>
    <RouterView></RouterView>
  </div>
</template>

<script>
export default {
  name: 'MessageView',
  data() {
    return {
      message: {
        timeStamp: '',
        sender: '',
        receiver: '',
        isRead: false,
        content: ''
      },
      allMessage: [{
        timeStamp: '1',
        sender: '1',
        receiver: '1',
        isRead: false,
        content: '1'
      },
    {
      timeStamp: '2',
        sender: '2',
        receiver: '2',
        isRead: false,
        content: '2'
    }],
      unReadMessage: []
    }
  },
  methods: {
    handleReadStatus(message) {
      message.isRead = !message.isRead
      let messageIdx = indexthis.unReadMessage.indexOf(message)
      if (messageIdx != -1) {
        this.unReadMessage.slice(messageIdx, 1);
      } else {
        this.unReadMessage.shift(message)
      }
    },
    divideUnReadMessage() {
      let messageLen = this.allMessage.length
      for (let i = 0; i < messageLen; i++) {
        if (this.allMessage[i].isRead) {
          this.unReadMessage.shift(this.allMessage[i])
        }
      }
    },
  },
}
</script>

<style scoped>

</style>