<!-- 团队成员列表 -->
<template>
  <div>
    <input type="text">
    <button>这是搜索按钮</button>
  </div>
  <div class="outer-container">
    <!-- 顶部盒子用来放置邀请成员按钮，仅创建者和管理员可用 -->
    <div class="top-box">
      <button>邀请新成员</button>
    </div>
    <!-- 第一个表展示团队创建者 -->
    <ul class="team-founder-list">团队创建者列表
      <li v-for="data in founderData" :key="data">
        {{ data }}
      </li>
    </ul>
    <!-- 第二个表展示团队管理者 -->
    <ul class="team-admin-list">团队管理员列表
      <li v-for="data in adminData" :key="data">
        {{ data }}
      </li>
    </ul>
    <!-- 第三个表展示团队普通成员 -->
    <ul class="team-ordinary-member-list">普通成员列表
      <li v-for="data in ordinaryData" :key="data">
        {{ data }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MemberListView',
  data() {
    return {
      //团队创建者数据
      founderData: [],
      //团队管理员数据
      adminData: [],
      //团队普通成员数据
      ordinaryData: []
    }
  },
  mounted() {
    this.$http.get('/api/teams/1/').then(
      (response) => {
        this.founderData = response.data.members.filter(item => item.identity == 'leader').map((member) => 
        ({
          userId: member.user.id,
          avatar: member.user.avatar,
          nickname: member.user.username,
          firstName: member.user.first_name,
          lastName: member.user.last_name,
          mailAddress: member.user.email,
          Identity:'团队创建者'
        }))
        this.adminData = response.data.members.filter(item => item.identity == 'admin').map((member) =>
        ({
          userId: member.user.id,
          avatar: member.user.avatar,
          nickname: member.user.username,
          firstName: member.user.first_name,
          lastName: member.user.last_name,
          mailAddress: member.user.email,
          Identity:'团队管理员'
        }))
        this.ordinaryData = response.data.members.filter(item => item.identity == 'member').map((member) =>
        ({
          userId: member.user.id,
          avatar: member.user.avatar,
          nickname: member.user.username,
          firstName: member.user.first_name,
          lastName: member.user.last_name,
          mailAddress: member.user.email,
          Identity:'普通成员'
        }))
      }
    )
  }
}
</script>

<style scoped></style>