<!-- 登录后的展示页 -->
<!-- zby -->
<template>
  <div class="outer-container">
    <ul>
      <li>团队信息</li>
      <li>团队成员</li>
      <li>团队项目</li>
      <li>团队群聊</li>
    </ul>
    <div>
      <!-- mq: 由于现在没有数据，用模板字符串会报错，因此全部用1来代替，后面直接将1替换为模板字符串即可 -->
      <router-link to="/team/1/info">info</router-link>
      <router-link to="/team/1/member">member</router-link>
      <router-link to="/team/1/project">project</router-link>
      <router-link to="/team/1/chat">chat</router-link>
    </div>
    <!-- 这里目前有一个不正常的地方，这里应该只是显示上面四个模块对应的信息，但是这样会直接把本来应该主页的轮播图给挤占掉 -->
    <RouterView></RouterView>
  </div>
</template>

<script>
export default {
  name: 'TeamView',
}
</script>

<style scoped>
</style>