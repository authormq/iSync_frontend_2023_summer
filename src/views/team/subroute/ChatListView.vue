<!-- 团队群聊列表 -->
<template>
<div class="chat-list">
  <ul>
    <li v-for="data in tempData" :key="data">
      {{ data }}
      <!-- <ChatListView :data="tempData"/> -->
    </li>
  </ul>
</div>
</template>

<script>
import ChatListItemVue from '../../../components/ListItem/team/ChatListItem.vue'

export default {
  name: 'ChatListView',
  data() {
    return {
      //临时数据。
      //对于每一个item，要有群聊/ 私聊名称，聊天类型，群聊/ 私聊头像，新消息数量，最近一条消息的时间，最近一条消息的发送者姓名和内容,是否被@
      tempData:
      [{
        chatName: '群聊1',
        chatType: 'public',
        chatAvatar: '/src/assets/1.jpg',
        newMessageCnt: 10,
        latestMessageTime: '12:12',
        latestSpeaker: 'User2',
        latestMessageContent: '12345ytjdgrqer4534yrhfmsqefgehdm bsaef  twtrhfmd aqegetrhmdgsaqegt45rdgnqef3etgfh',
        at:false
      },
      {
        chatName: 'User2',
        chatType: 'personal',
        chatAvatar: '/src/assets/2.jpg',
        newMessageCnt: 0,
        latestMessageTime: '昨天12:34',
        latestSpeaker: 'User1',
        latestMessageContent: '12345fethyukj,hghrefrytjdgrqer4534yrhfmsqefgehdm bsaef  twtrhfmd aqegetrhmdgsaqegt45rdgnqef3etgfh',
        at:true
      },
    ]
    }

  }
}
</script>

<style scoped>

</style>