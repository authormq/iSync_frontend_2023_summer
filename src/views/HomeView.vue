<!-- 首页（未登录）展示 -->
<template>
  <HomeBanner />
  <div class="welcome-image">
    <div class="welcome-msg">
      <h2>团队协作与管理</h2>
      <h3>小组开发的利器。一个字，快！</h3>
      <button @click="showLogin">开启新体验</button>
    </div>  
  </div>
  <TeamView></TeamView>
  <div id="team" class="homepage-intro team-intro">
    <div class="team-intro-text">
      <h3>Team Leader：管理原来如此简单</h3>
      <div class="team-intro-border"></div>
      <ul>
        <li v-for="(intro, index) in teamIntro" :key="index">
          <p>{{ intro.title }}</p>
          <span>{{ intro.content }}</span>
        </li>
      </ul>
    </div>
    <div class="team-intro-img">
      <img src="/src/assets/1.jpg">
    </div>
  </div>
  <div id="message" class="homepage-intro message-intro">
    <div class="message-intro-img">
      <img src="/src/assets/2.jpg">
    </div>
    <div class="message-intro-text">
      <h3>叮咚～来自团队的一封信</h3>
      <ul>
        <li v-for="(intro, index) in messageIntro" :key="index">
          <p>{{ intro.title }}</p>
          <span>{{ intro.content }}</span>
        </li>
      </ul>
      <div class="message-intro-border"></div>
    </div>
  </div>
  <div id="project" class="homepage-intro project-intro">
    <StylishSlider 
      type="single" showDots showArrow :autoplay="2000"
      imgWidth="1000px" imgHeight="500px"
      dotSize="15px" dotSpacing="25px" dotDistance="20px"
      borderRadius="15px"
    >
      <div v-for="(intro, index) in projectsIntro" :key="index">
        <div class="project-intro-item">
          <img :src="intro.src" alt="hh">
          <h3>{{ intro.msg }}</h3>
        </div>
      </div>
    </StylishSlider>
  </div>
  <div id="doc" class="homepage-intro doc-intro">
    <div class="doc-intro-card" v-for="(intro, index) in docIntro" :key="index">
      <img :src="intro.src" alt="">
      <p>{{ intro.msg }}</p>
    </div>
  </div>
  <br>
  <br>
  <br>
  <br>
</template>

<script>
import HomeBanner from '../components/TopNav/HomeBanner.vue'
import StylishSlider from '../components/Stylish/StylishSlider.vue'
import ProjectView from './project/ProjectView.vue';
import TeamView from './team/TeamView.vue';
import UserView from './UserView.vue';
export default {
  name: 'HomeView',
  components: {
    HomeBanner,
    StylishSlider,
    UserView,
    TeamView
},
  data() {
    return {
      teamIntro: [
        {
          title: '人员管理',
          content: '团队信息与成员信息直观展示'
        },
        {
          title: '团队切换',
          content: '便捷切换所在团队，投入多个工作'
        },
        {
          title: '权限设置',
          content: '管理员机制，用权限保障效率与秩序'
        },
        {
          title: '成员邀请',
          content: '和小伙伴一起 coding，妙趣横生'
        },
        {
          title: '消息机制',
          content: '实时同步，通信即在转瞬间'
        }
      ],
      messageIntro: [
        {
          title: '团队群聊',
          content: '快速沟通开发问题，效率加倍'
        },
        {
          title: '个人私信',
          content: '尊重隐私，全方位的沟通和交际'
        },
        {
          title: '消息检索',
          content: '当下与过往，用一键搜索相连接'
        },
        {
          title: '实时通信',
          content: '畅所欲言，和大家来一场头脑风暴'
        },
        {
          title: '文件传输',
          content: '视频音频图片文本，皆可随心所欲'
        }
      ],
      projectsIntro: [
        {
          src: '/src/assets/1.jpg',
          msg: '项目管理？很简单！'
        },
        {
          src: '/src/assets/2.jpg',
          msg: '原型设计，简洁易用'
        },
        {
          src: '/src/assets/3.jpg',
          msg: '组件丰富，支持导出'
        },
        {
          src: '/src/assets/4.jpg',
          msg: '发挥想象力，尽在此刻'
        }
      ],
      docIntro: [
        {
          src: '/src/assets/1.jpg',
          msg: '新建编辑，一键搞定',
        },
        {
          src: '/src/assets/2.jpg',
          msg: '链接分享，全网共建',
        },
        {
          src: '/src/assets/3.jpg',
          msg: '多人编辑，实时同步',
        },
        {
          src: '/src/assets/4.jpg',
          msg: '自动保存，版本回退',
        }
      ]
    }
  },
  methods: {
    showLogin() {
      this.$bus.emit('showLogin')
    }
  }
}
</script>

<style scoped>
.welcome-image {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-image: url('/src/assets/2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-clip: border-box;
  overflow: hidden; 
}

.welcome-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.welcome-msg {
  text-align: center;
}
.welcome-msg>h2, .welcome-msg>h3 {
  text-align: center;
}

.welcome-msg>h2 {
  font-size: 80px;
  font-weight: bold;
}
.welcome-msg>h3 {
  font-size: 30px;
  font-weight: light;
}
.welcome-msg>button {
  width: 150px;
  height: 50px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: rgb(180, 180, 180);
  color: white;
  font-size: 20px;
  cursor: pointer;

  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.welcome-msg>button:hover {
  background-color: rgb(150, 150, 150);
  transform: translate(-3px, -3px);
}

.homepage-intro {
  width: 100%;
  /* height: 80vh; */
  /* display: flex;
  align-items: center;
  align-content: center; */
  box-sizing: border-box;
}

.team-intro {
  width: 100%;
  padding: 50px 100px;
  padding-bottom: 0;
  padding-right: 0;
  display: flex;
  /* height: 100vh; */
  align-items: center;
  align-content: center;
  justify-content: space-between;
  background-color: rgb(240, 240, 240);
}
.team-intro-text {
  position: relative;
  padding: 50px;
}
.team-intro-text h3 {
  font-size: 35px;
  margin-bottom: 30px;
  font-weight: bold;
}
.team-intro-border {
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  border-left: 2px solid black;
  border-top: 2px solid black;
  position: absolute;
  top: 0;
  left: 0;
}
.team-intro-text ul li {
  overflow: hidden;
  margin-bottom: 30px;
}
.team-intro-text ul li:nth-child(2),
.team-intro-text ul li:nth-child(4) {
  transform: translateX(100px);
}
.team-intro-text ul li:nth-child(3) {
  transform: translateX(200px);
}

.team-intro-text ul li p {
  font-size: 24px;
  font-weight: bold;
}
.team-intro-text ul li span {
  font-size: 18px;
  color: grey;
}
/* .team-intro-img {
  padding-top: 55px;
} */
.team-intro-img img {
  width: 750px;
  height: 500px;
  border-radius: 15px;
}

.message-intro {
  width: 100%;
  padding: 50px 100px;
  padding-left: 0;
  padding-top: 0;
  display: flex;
  /* height: 90vh; */
  align-items: center;
  align-content: center;
  justify-content: space-between;
}
.message-intro-text {
  position: relative;
  padding: 50px;
}
.message-intro-text h3 {
  font-size: 35px;
  margin-bottom: 30px;
  font-weight: bold;
}
.message-intro-border {
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  position: absolute;
  right: 0;
  bottom: 0;
}
.message-intro-text ul li {
  text-align: right;
  margin-bottom: 30px;
}
.message-intro-text ul li:nth-child(2),
.message-intro-text ul li:nth-child(4) {
  transform: translateX(-120px);
}
.message-intro-text ul li:nth-child(3) {
  transform: translateX(-240px);
  margin-bottom: 0;
}
.message-intro-text ul li p {
  font-size: 24px;
  font-weight: bold;
}
.message-intro-text ul li span {
  font-size: 18px;
  color: grey;
}
.message-intro-img img {
  width: 750px;
  height: 500px;
  border-radius: 15px;
}


.project-intro {
  background: linear-gradient(to right, 
    rgb(240, 240, 240) 20%, white 80%, rgb(240, 240, 240));
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
.project-intro-item {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.project-intro h3 {
  font-size: 40px;
  font-weight: bold;
  position: absolute;
  right: 20px;
  bottom: 20px; 
  /* z-index: 99; */
  color: white;
} 
.project-intro img {
  width: 100%;
  height: 100%;
}


.doc-intro {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 30px;

}
.doc-intro-card {
  width: 200px;
  height: 300px;
  padding: 20px;
  padding-top: 10px;
  padding-bottom: 0;
  box-shadow: 3px 3px 5px lightgrey;
  border-radius: 15px;

  display: flex;
  justify-content: center;
  align-content: space-around;
  flex-wrap: wrap;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.doc-intro-card:hover {
  box-shadow: 3px 3px 10px grey;
  transform: translate(-3px, -3px) scale(1.05);
}
.doc-intro-card>img {
  width: 200px;
  height: 250px;
  /* border-radius: 10px; */
}
.doc-intro-card>p {
  font-size: 18px;
  vertical-align: middle;
}
</style>