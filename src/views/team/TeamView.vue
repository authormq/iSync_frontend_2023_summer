<!-- zby -->
<template>
  <FirstView></FirstView>
  <div>才能看见的补偿款是得不偿失的吧肯定会随处可见还是到处都是从开始对华出口傻大黑粗是大城市的hacks城市的库存还打算开车好的时空穿梭的出的色彩都看见好吃的烤鸡翅都超级好随处可见合适的出口市场产生的基础上口红擦看好多好吃的好吃的吃还是大城市的出口和随处可见挥洒出可恨的是v和v看来还是v觉得和v的时空和v收到句话都是考虑好v的v多少v很看好v都是老客户v四大皆空v合适的v好的v好还好撒开了花v好的v都是v看见的v函数v了很多时间和v看韩剧看了就会v是快乐的机会v vs电话旅客还是v了会计核算的v类似的话v即可获得v的v话 v好看数据和v劳动局啊华盛顿和v死的恐惧和v多少</div>
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
import FirstView from '../FirstView.vue';
export default {
    name: 'TeamView',
    components: { FirstView }
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
  color: rgba(199,29,35, 1);
  border: 1px solid rgba(199,29,35, 1);
  box-shadow: 2px 2px  rgba(199,29,35, 1);
}
</style>