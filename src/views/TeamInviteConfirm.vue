<template>
  <div class="container">
    <div class="box">
      <h1 class="title">
        来自<em> {{ name }} </em>的邀请
      </h1>
      <div class="info">
        <img :src="avatar">
        <div class="info-text">
          <div class="profile">{{ profile }} Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius iure explicabo iste, suscipit odio ducimus quo porro rerum cum eaque voluptatum culpa architecto fugiat in reiciendis dolorum hic, facere nostrum exercitationem. Architecto, ipsum amet voluptates vitae mollitia quibusdam ipsam excepturi iusto praesentium dolor! Quis eaque recusandae quas minus, sint incidunt? </div>
          <div class="creator">由{{ creator }}</div>
          <div class="time">创建于{{ createTime }}</div>
        </div>
      </div>
      <button @click="confirmJoin">确认加入</button>
      <span>你也可以选择<a @click="leave">离开此页面</a>以拒绝</span>
    </div>
  </div>
 
  
</template>

<script>
export default {
  name: 'TeamInviteConfirm',
  data() {
    return {
      teamId: null,
      name: '',
      profile: '',
      creator: '',
      createTime: '',
      avatar: '',
      token: ''
    }
  },
  created() {
    this.teamId = this.$route.params.teamId
    this.token = this.$route.query.token
    this.$http.get(`/api/teams/${this.teamId}/`).then(
      response => {
        this.name = response.data.name
        this.profile = response.data.profile
        this.creator = response.data.creator
        this.createTime = response.data.create_datetime
        this.avatar = response.data.avatar
      },
      error => {
        console.log(error.message);
      }
    )
  },
  methods: {
    confirmJoin() {
      let formData = new FormData()
      formData.append('token', this.token)
      this.$http.post(`/api/teams/join/`, formData).then(
        response => {
          this.$bus.emit('message', {
            title: '加入团队成功',
            content: '',
            time: 1000
          })
        },
        error => {
          this.$bus.emit('message', {
            title: '加入团队失败',
            content: error.response.data.detail,
            time: 1000
          })
        }
      )
    },
    leave() {
      let win=window.open("about:blank", "_self");
      win.close();
    }
  }
}
</script>
<style scoped>
em {
  font-weight: bold;
}
.container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  text-align: center;
}
.box {
  /* width: 1200px; */
  max-width: 1000px;
  margin: 0 auto;
}

.title, .title * {
  font-size: 60px;
  color: rgba(199, 29, 35, 1);
}

.info {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
}

img {
  width: 350px;
  height: 350px;
  border-radius: 15px;
}

.info-text {
  text-align: left;
  margin-left: 20px;
}

.creator {
  margin: 10px 0;
}

.creator, .time {
  font-weight: bold;
  color: grey;
}

button {
  width: 200px;
  height: 60px;
  font-size: 24px;
  border-radius: 10px;
  font-weight: bold;
  color: white;
  background: rgba(199, 29, 35, 1);
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

button:hover {
  background: rgba(199, 29, 35, 0.8);
}

span, a {
  color: grey;
}

span {
  display: block;
  margin-top: 10px;
}

a {
  font-weight: bold;
  cursor: pointer;
}

a:hover {
  text-decoration: underline;
}
</style>