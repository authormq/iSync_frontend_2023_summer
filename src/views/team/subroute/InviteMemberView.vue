<template>
  <div>
    <input type="text">
    <button>这是搜索按钮</button>
  </div>
  <ul>
    <li v-for="result in searchResult" :key="result">
      {{ result }}
      <button>这是添加按钮</button>
    </li>
  </ul>
  <div>
    邀请链接：{{ inviteLink }}
  </div>
</template>

<script>
export default {
  name: 'InviteMemberView',
    data() {
      return {
        searchResult: [{
          'userId': '这是用户id',
          'avatar': '这是用户头像',
          'nickname': '这是昵称',
        }, 
        {
          'userId': '这是用户id',
          'avatar': '这是用户头像',
          'nickname': '这是昵称',
        }],
          inviteLink: '这是邀请链接'
      }
    }
}
</script>

<style scoped>
</style>