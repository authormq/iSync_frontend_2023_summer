<!-- 团队成员列表 -->
<template>
  <div class="member-top">待补充的邀请和搜索组件</div>
  <div class="container">
    <!-- 用 v-for 传入循环渲染，每个元素是一个对象
      avatar: 用户头像路径
      username: 用户名
      lastname: 姓
      firstname: 名
      identity: 身份，取值'成员' / '管理员'
      profile: 简介
     -->
    <MemberListItem :data="user" />
    <MemberListItem :data="user" />
    <MemberListItem :data="user" />
    <MemberListItem :data="user" />
      <MemberListItem :data="user" />
      <MemberListItem :data="user" />
      <MemberListItem :data="user" />
      <MemberListItem :data="user" />
      <MemberListItem :data="user" />
      <MemberListItem :data="user" />
      <MemberListItem :data="user" />
      <MemberListItem :data="user" />
      <MemberListItem :data="user" />
      <MemberListItem :data="user" />
      <MemberListItem :data="user" />
      <MemberListItem :data="user" />
      <MemberListItem :data="user" />
      <MemberListItem :data="user" />
      <MemberListItem :data="user" />
      <MemberListItem :data="user" />
  </div>
  
  <!-- <br>
  <br>
  <br>
  <br>
  <div>
    <input type="text">
    <button>这是搜索按钮</button>
  </div>
  <div class="outer-container">
    顶部盒子用来放置邀请成员按钮，仅创建者和管理员可用
    <div class="top-box">
      <button>邀请新成员</button>
    </div>
    第一个表展示团队创建者
    <ul class="team-founder-list">团队创建者列表
      <li v-for="data in founderData" :key="data">
        {{ data }}
      </li>
    </ul>
    第二个表展示团队管理者
    <ul class="team-admin-list">团队管理员列表
      <li v-for="data in adminData" :key="data">
        {{ data }}
      </li>
    </ul>
    第三个表展示团队普通成员
    <ul class="team-ordinary-member-list">普通成员列表
      <li v-for="data in ordinaryData" :key="data">
        {{ data }}
      </li>
    </ul>
  </div> -->
</template>

<script>
import MemberListItem from '../../../components/ListItem/team/MemberListItem.vue'
export default {
  name: 'MemberListView',
  components: { MemberListItem },
  data() {
    return {
      //团队创建者数据
      founderData: [{
        'userId': '这是用户id',
        'avatar': '这是用户头像',
        'nickname': '这是昵称',
        'firstName': '这是名',
        'lastName':'这是姓',
        'mailAddress': '这是邮箱',
        'Identity': '这是身份(团队创建者)'
      }],
      //团队管理员数据
      adminData: [{
        'userId': '这是用户id',
        'avatar': '这是用户头像',
        'nickname': '这是昵称',
        'firstName': '这是名',
        'lastName': '这是姓',
        'mailAddress': '这是邮箱',
        'Identity': '这是身份(团队管理员)'
      }, {
        'userId': '这是用户id',
        'avatar': '这是用户头像',
        'nickname': '这是昵称',
        'firstName': '这是名',
        'lastName': '这是姓',
        'mailAddress': '这是邮箱',
        'Identity': '这是身份(团队管理员)'
      }],
      //团队普通成员数据
      ordinaryData: [{
        'userId': '这是用户id',
        'avatar': '这是用户头像',
        'nickname': '这是昵称',
        'firstName': '这是名',
        'lastName': '这是姓',
        'mailAddress': '这是邮箱',
        'Identity': '这是身份(普通成员)'
      }, {
        'userId': '这是用户id',
        'avatar': '这是用户头像',
        'nickname': '这是昵称',
        'firstName': '这是名',
        'lastName': '这是姓',
        'mailAddress': '这是邮箱',
        'Identity': '这是身份(普通成员)'
      }],
      user: {
        avatar: '/src/assets/avatar.jpeg',
        username: '小明哈哈哈哈哈haa',
        lastname: '张',
        firstname: '三四五1',
        identity: '管理员',
        profile: '我是张三，fbaijc naovcdfghvbj nkmlkcfghxcjgvh bknljgtghsed tfygub itfsdf ghjk dfghjrhjf uha9fgaihfcoag'
      }
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