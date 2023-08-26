<!-- 团队群聊列表 -->
<template>
  <div>
    <input type="text">
    <button>这是搜索按钮</button>
  </div>
  <div class="chat-list">
    <ul>
      <li v-for="data in chatData" :key="data">
        {{ data }}
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
      //对于每一个item，要有id,群聊/ 私聊名称，聊天类型，群聊/ 私聊头像，群聊人数，新消息数量，最近一条消息的时间，最近一条消息的发送者用户名和内容,是否被@
      chatData:
        [{
          chatId:1,
          chatName: '群聊1',
          chatType: 'public',
          chatAvatar: '/src/assets/1.jpg',
          population:10,
          newMessageCnt: 10,
          latestMessageTime: '12:12',
          latestSpeaker: 'User2',
          latestMessageContent: '12345ytjdgrqer4534yrhfmsqefgehdm bsaef  twtrhfmd aqegetrhmdgsaqegt45rdgnqef3etgfh',
          at: false
        },
          {
          chatId:2,
          chatName: 'User2',
          chatType: 'personal',
          chatAvatar: '/src/assets/2.jpg',
          population:2,
          newMessageCnt: 0,
          latestMessageTime: '昨天12:34',
          latestSpeaker: 'User1',
          latestMessageContent: '12345fethyukj,hghrefrytjdgrqer4534yrhfmsqefgehdm bsaef  twtrhfmd aqegetrhmdgsaqegt45rdgnqef3etgfh',
          at: true
        },
        ]
    }

  }
}
</script>

<style scoped></style>