<template>
  <div>
    你好, 这是一个点击团队邀请链接之后的页面
  </div>
  <div>
    <div>团队信息</div>
    <img :src="avatar" alt="">
    {{ name }}, {{ profile }}, {{ creator }}, {{ createTime }}
  </div>
  <button @click="confirmJoin">点击以确认加入该团队</button>
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
    }
  }
}
</script>
<style scoped></style>