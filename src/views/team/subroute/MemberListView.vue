<!-- 团队成员列表 -->
<template>
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
      founderData: [{
        'id': '这是用户id',
        'avatar':'这是用户头像',
        'nickname': '这是昵称',
        'realname': '这是真实姓名',
        'mailAddress': '这是邮箱',
        'Identity': '这是身份(团队创建者)'
      }],
      //团队管理员数据
      adminData: [{
        'id': '这是用户id',
        'avatar': '这是用户头像',
        'nickname': '这是昵称',
        'realname': '这是真实姓名',
        'mailAddress': '这是邮箱',
        'Identity': '这是身份(团队管理员)'
      }, {
        'id': '这是用户id',
        'avatar': '这是用户头像',
        'nickname': '这是昵称',
        'realname': '这是真实姓名',
        'mailAddress': '这是邮箱',
        'Identity': '这是身份(团队管理员)'
      }],
      //团队普通成员数据
      ordinaryData: [{
        'id': '这是用户id',
        'avatar': '这是用户头像',
        'nickname': '这是昵称',
        'realname': '这是真实姓名',
        'mailAddress': '这是邮箱',
        'Identity': '这是身份(普通成员)'
      }, {
        'id': '这是用户id',
        'avatar': '这是用户头像',
        'nickname': '这是昵称',
        'realname': '这是真实姓名',
        'mailAddress': '这是邮箱',
        'Identity': '这是身份(普通成员)'
      }]
    }
  }
}
</script>

<style scoped></style>