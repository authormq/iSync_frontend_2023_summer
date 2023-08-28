<template>
  <div class="header-container">
    <div>
      <TeamSelector />
    </div>
    <div>
      <ul class="header-nav">
        <li v-if="!hasUnreadMsg" @click="jumpToMailPage">
          <MailIcon />
        </li>
        <li v-else @click="jumpToMailUnreadPage">
          <MailUnreadIcon />
        </li>
      </ul>
      <div class="user-avatar-container">
        <img class="user-avatar" :src="avatarUrl" @mouseover="avatarIsHovered = true; showAvatarHint = true"
          @mouseleave="handleMouseLeaveAvatar" @click="handleClickAvatar">
        <div class="user-avatar-hint" v-if="showAvatarHint" @mouseover="avatarHintIsHovered = true"
          @mouseleave="handleMouseLeaveAvatarHint">
          <span>{{ username }}</span>
          <a @click="handleClickAvatar">修改信息</a>
          <a @click="logout">退出登录</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MailIcon from '../Svg/MailIcon.vue'
import MailUnreadIcon from '../Svg/MailUnreadIcon.vue'
import ChatIcon from '../Svg/ChatIcon.vue'
import { RouterView, routeLocationKey } from 'vue-router'
import TeamSelector from './TeamSelector.vue'
import { mapMutations } from 'vuex'
export default {
  name: 'TopNav',
  components: {
    MailIcon,
    MailUnreadIcon,
    ChatIcon,
    RouterView,
    TeamSelector
  },
  data() {
    return {
      userId: '',
      avatarIsHovered: false,
      showAvatarHint: false,
      avatarHintIsHovered: false,
      username: '',
      avatarUrl: '/src/assets/avatar.jpeg',
      hasUnreadMsg: false,
      ws: undefined
    }
  },
  mounted() {
    this.handleFlushUserData()
    this.$bus.on('updateTopNavAvatar', this.updateTopNavAvatarAfterModify)
    this.$bus.on('judgeHasUnreadMsg', this.handleJudgeHasUnreadMsg)
    if (this.$cookies.isKey('user_id') == true) {
      this.userId = this.$cookies.get('user_id')
      this.ws = new WebSocket(`ws://43.138.14.231:9000/ws/news/${this.userId}/`)
      this.ws.onmessage = (messageEvent) => {
        const data = JSON.parse(messageEvent.data)
        for (let i = 0; i < data.mentioned_users.length; i++) {
          if (data.mentioned_users[i]._id == this.currentUserId || data.mentioned_users[i]._id == '0') {
            let formData = new FormData()
            formData.append('file', data.get('file_id'))
            formData.append('receiver', this.currentUserId)
            this.$http.post('/api/news/', formData).then(() => {
              this.$bus.emit('newFileMessage', data.get('file_id'))
            })
          }
        }
      }
      this.$http.get('/api/news/').then((response) => {
        this.allMessage = response.data.map((news) => ({
          isRead: news.is_read,
        }))
        // 这一行必须有，用来获取未读的信息
        this.unreadMsg = this.allMessage.filter(message => message.isRead == false)
        if (this.unreadMsg.length != 0) { this.hasUnreadMsg = true }
      })
      this.$bus.on('wssend', (file_id, mentioned_user_id) => {
        this.ws.send(JSON.stringify({
          'file_id': file_id,
          'sender_id': this.userId,
          'mentioned_users': [mentioned_user_id],
        }))
      })
    }
  },
  unmounted() {
    this.ws.close()
  },
  methods: {
    ...mapMutations(['setIsLoggedIn']),
    handleJudgeHasUnreadMsg(hasUnread) {
      if (hasUnread) {
        this.hasUnreadMsg = true
      } else {
        this.hasUnreadMsg = false
      }
    },
    handleMouseLeaveAvatar() {
      this.avatarIsHovered = false
      setTimeout(() => {
        if (!this.avatarIsHovered && !this.avatarHintIsHovered) {
          this.showAvatarHint = false
        }
      }, 300);
    },
    handleMouseLeaveAvatarHint() {
      this.avatarHintIsHovered = false
      setTimeout(() => {
        if (!this.avatarIsHovered && !this.avatarHintIsHovered) {
          this.showAvatarHint = false
        }
      }, 300);
    },
    logout() {
      this.$http.get('/api/accounts/logout/').then((response) => {
        // alert('登出成功')
        this.handleFlushUserData()
        this.setIsLoggedIn(false)
        this.$cookies.remove('teamId')
        this.$cookies.remove('user_id')
        this.$router.push('/')
      }, (error) => {
        alert(error)
      })
    },
    handleClickAvatar() {
      if (this.$cookies.isKey('user_id') == true) {
        this.$router.push('/user')
      }
      else {
        this.showLoginModal = true
      }
    },
    handleFlushUserData() {
      if (this.$cookies.isKey('user_id') == true) {
        this.$http.get(`/api/accounts/${this.$cookies.get('user_id')}/`).then((response) => {
          this.avatarUrl = response.data.avatar
          this.username = response.data.username
        }, (error) => {
          alert(error)
        })
      }
      else {
        this.avatarUrl = '/src/assets/avatar.jpeg'
      }
    },
    updateTopNavAvatarAfterModify(avatar) {
      this.avatarUrl = avatar
    },
    jumpToChatPage() {
      this.$router.push('/team/1/chat')
    },
    jumpToMailPage() {
      this.$router.push('/message')
    },
    jumpToMailUnreadPage() {
      this.$router.push('/message')
    }
  }
}
</script>

<style scoped>
.header-container {
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  position: relative;
  z-index: 100;

  box-shadow: 2px 2px 3px lightgrey;
}

.header-container>div {
  display: flex;
  align-items: center;
}

.header-left>div {
  display: inline-block;
}


.header-nav>li {
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  /* border-right: 1px solid black; */
}


.user-avatar-container {
  position: relative;
  margin-left: 10px;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.5 s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.user-avatar:hover {
  transform: scale(1.05);
}

.user-avatar-hint {
  width: 200px;
  height: 130px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 1px 1px 5px grey;
  position: absolute;
  top: 100%;
  left: -150px;
  margin-top: 5px;
  padding-top: 10px;
  text-align: center;
  overflow: hidden;
}

.user-avatar-hint>span {
  font-size: 18px;
  font-weight: bold;
  color: rgba(199, 29, 35, 1);
}


.user-avatar-hint a {
  display: block;
  width: 80%;
  height: 35px;
  box-shadow: 1px 1px 3px grey;
  color: grey;
  margin: 10px auto;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-avatar-hint a:hover {
  font-weight: bold;
  transform: translate(-2px, -2px) scale(1.02);
}
</style>