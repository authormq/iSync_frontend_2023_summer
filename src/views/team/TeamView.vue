<!-- 登录后的展示页 -->
<!-- zby -->
<template>
  <div class="container">
    <ul>
      <li><router-link class="link" to="/team/1/info">团队信息</router-link></li>
      <li><router-link class="link" to="/team/1/member">团队成员</router-link></li>
      <li><router-link class="link" to="/team/1/project">团队项目</router-link></li>
      <li><router-link class="link" to="/team/1/chat">团队群聊</router-link></li>
    </ul>
    <div>
      <RouterView ></RouterView>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'TeamView',
}
</script>

<style scoped>
.container {
  display: flex;
  height: calc(100vh - 90px);
  margin-top: 10px;
}

ul {
  width: 250px;
  height: 100%;
  flex: none;
  /* background-color: lightgray; */
  border-radius: 10px;
  box-shadow: 3px 3px 3px lightgrey;
  overflow: hidden;
}

.container>div {
  margin-left: 30px;
  width: calc(100% - 330px);
  padding: 20px;
  /* background-color: lightgrey; */
}

.link {
  display: block;
  width: 200px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 5px;
  color: grey;
  box-shadow: 1px 1px 5px grey;
}

.link:hover {
  color: rgb(100, 100, 100);
}

.router-link-active {
  box-sizing: border-box;
  color: rgb(120, 120, 120);
  border: 1px solid rgb(120, 120, 120);;
}
</style>