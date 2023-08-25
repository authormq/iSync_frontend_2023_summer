<!-- 登录后的展示页 -->
<!-- zby -->
<template>
  <TopNav />
  <div class="container">
    <ul>
      <li><router-link class="link" to="/team/1/info">团队信息</router-link></li>
      <li><router-link class="link" to="/team/1/member">团队成员</router-link></li>
      <li><router-link class="link" to="/team/1/project">团队项目</router-link></li>
      <li><router-link class="link" to="/team/1/chat">团队群聊</router-link></li>
    </ul>
      <!-- mq: 由于现在没有数据，用模板字符串会报错，因此全部用1来代替，后面直接将1替换为模板字符串即可 -->
      <!-- <router-link to="/team/1/info">info</router-link>
      <router-link to="/team/1/member">member</router-link>
      <router-link to="/team/1/project">project</router-link>
      <router-link to="/team/1/chat">chat</router-link> -->
    <!-- 这里目前有一个不正常的地方，这里应该只是显示上面四个模块对应的信息，但是这样会直接把本来应该主页的轮播图给挤占掉 -->
    <div>
      <RouterView ></RouterView>
    </div>
    
  </div>
</template>

<script>
import TopNav from '../../components/TopNav/TopNav.vue';
export default {
  name: 'TeamView',
  components: {
    TopNav
  }
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
  margin-left: 10px;
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