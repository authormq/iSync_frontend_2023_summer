<!-- 团队成员列表 -->
<template>
  <div class="member-top">待补充的邀请和搜索组件
    <input type="text" v-model="userKeyword" />
    {{ userKeyword }}
    <button @click="searchUser">click to search</button>
    <div v-if="curIdentity === 'leader' || curIdentity === 'admin'">这是分享链接 需要加一个v-if，只有管理员或者团队创建者可以看到并点击
      <button @click="getInviteUrl">getInviteUrl</button>
      <div>显示获得分享的链接{{ inviteUrl }}</div>
    </div>
  </div>
  
  <div class="container">
    <MemberListItem v-for="user in founderData" :key="user" :data="user" :curIdentity="curIdentity"></MemberListItem>
    <MemberListItem v-for="user in adminData" :key="user" :data="user" :curIdentity="curIdentity"></MemberListItem>
    <MemberListItem v-for="user in ordinaryData" :key="user" :data="user" :curIdentity="curIdentity"></MemberListItem>
  </div>
</template>

<script>
import MemberListItem from '../../../components/ListItem/team/MemberListItem.vue'
export default {
  name: 'MemberListView',
  components: { MemberListItem },
  data() {
    return {
      //团队创建者数据
      founderData: [],
      //团队管理员数据
      adminData: [],
      //团队普通成员数据
      ordinaryData: [],
      curIdentity: 'member',
      userKeyword: '',
      // 存放搜索到的成员的数据
      searchResault: [],
      inviteUrl: ''
    }
  },
  mounted() {
    this.$http.get('/api/teams/1/').then(
      (response) => {
        this.founderData = response.data.members.filter(item => item.identity == 'leader').map((member) =>
        ({
          userId: member.user.id,
          avatar: member.user.avatar,
          username: member.user.username,
          firstName: member.user.first_name,
          lastName: member.user.last_name,
          email: member.user.email,
          identity: member.identity,
          Identity: '团队创建者', // 注意这两个 identity 首字母大小写不一样
          joinDateTime: member.join_datetime
        }))
        this.adminData = response.data.members.filter(item => item.identity == 'admin').map((member) =>
        ({
          userId: member.user.id,
          avatar: member.user.avatar,
          username: member.user.username,
          firstName: member.user.first_name,
          lastName: member.user.last_name,
          email: member.user.email,
          identity: member.identity,
          Identity: '团队管理员',
          joinDateTime: member.join_datetime
        }))
        this.ordinaryData = response.data.members.filter(item => item.identity == 'member').map((member) =>
        ({
          userId: member.user.id,
          avatar: member.user.avatar,
          username: member.user.username,
          firstName: member.user.first_name,
          lastName: member.user.last_name,
          email: member.user.email,
          identity: member.identity,
          Identity: '普通成员',
          joinDateTime: member.join_datetime
        }))
        let curUserId = this.$cookies.get('user_id') // 当前登录用户id
        if (this.founderData.some(founder => founder.userId == curUserId)) {
          this.curIdentity = 'leader'
        } else if (this.adminData.some(admin => admin.userId == curUserId)) {
          this.curIdentity = 'admin'
        }
      }
    )
    this.$bus.on('leaderHandleIdentity', this.leaderHandleIndentity)
    this.$bus.on('adminHandleIdentity', this.adminHandleIdentity)
  },
  methods: {
    leaderHandleIndentity(value) {
      if (value.data.identity === 'admin') {
        if (value.handleIdentity.cancelAdmin) {
          this.cancelAdmin(value.data)
        }
      } else if (value.data.identity === 'member') {
        if (value.handleIdentity.setAdmin) {
          this.setAdmin(value.data)
        } else if (value.handleIdentity.deleteMember) {
          this.deleteMember(value.data)
        }
      }
    },
    adminHandleIdentity(value) {
      if (value.data.identity === 'member') {
        if (value.handleIdentity.setAdmin) {
          this.setAdmin(value.data)
        } else if (value.handleIdentity.deleteMember) {
          this.deleteMember(value.data)
        }
      }
    },
    setAdmin(user) {
      this.$http.put(`/api/teams/1/add/admin/${user.userId}/`).then(
        response => {
          this.ordinaryData.splice(this.ordinaryData.indexOf(user), 1)
          user.identity = 'admin'
          user.Identity = '团队管理员'
          this.adminData.push(user)
        },
        error => {
          console.log(error.message);
        }
      )
    },
    cancelAdmin(user) {
      this.$http.put(`/api/teams/1/remove/admin/${user.userId}/`).then(
        response => {
          // console.log(response.data);
          this.adminData.splice(this.adminData.indexOf(user), 1)
          user.identity = 'member'
          user.Identity = '普通成员'
          this.ordinaryData.push(user)
        },
        error => {
          console.log(error.message);
        }
      )
    },
    deleteMember(user) {
      this.$http.put(`/api/teams/1/remove/member/${user.userId}/`).then(
        response => {
          this.ordinaryData.splice(this.ordinaryData.indexOf(user), 1)
        },
        error => {
          console.log(error.message);
        }
      )
    },
    searchUser() {
      this.$http.get(`/api/teams/1/find/?keyword=${this.userKeyword}`).then(
        response => {
          this.searchResault = response.data.map((item) => ({
            userId: item.user.id,
            avatar: item.user.avatar,
            username: item.user.username,
            firstName: item.user.first_name,
            lastName: item.user.last_name,
            email: item.user.email,
            identity: item.identity,
            joinDateTime: item.join_datetime
          }))
        },
        error => {
          console.log(error.message);
        },
      )
    },
    getInviteUrl() {
      this.$http.get(`/api/teams/1/generate_invite_url/`).then(
        response => {
          this.inviteUrl = response.data.url
          console.log(this.inviteUrl);
        },
        error => {
          console.log(error.message);
        }
      )
    }
  }
}
</script>

<style scoped>
.member-top {
  height: 10%;
}

.container {
  width: 1200px;
  height: 90%;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
  justify-content: space-evenly;
  align-content: flex-start;
  /* padding-left: 30px; */
}
</style>