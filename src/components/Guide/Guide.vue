<template>
  <div class="guide-mask" ref="mask" :class="{'gradually-bright': shouldHide}"></div>
  <button @click="cnt++" v-if="cnt < 17">下一步</button>
  <button @click="hide" v-else-if="cnt === 17" :class="{'gradually-hide': shouldHide}">完成</button>
  <div class="guide-cover-container  " v-if="cnt === -1">
    <h2 class="cover-title">
      跟随教程，探索如何更高效地合作
    </h2>
    <ul>
      <li>团队管理</li>
      <li>消息收发</li>
      <li>文档与原型编辑</li>
      <li>更多新特性...</li>
    </ul>
  </div>
  <div class="step-container" v-if="cnt >= 0 && cnt < 4">
    <img class="arrow arrow-1 animate__animated animate__rotateInUpLeft" src="/src/assets/arrow.png" alt="">
    <div class="intro intro-1 animate__animated animate__fadeIn">
      <div class="intro-content intro-1-content">
        <h3 class="content-title">
          新建团队，开启和小伙伴的协作之旅
        </h3>
        <ul class="content-list">
          <li class="animate__animated animate__fadeIn" v-if="cnt >= 0">
            <span>填写名称、简介、图片，<em>快速创建</em>属于自己的团队。</span>
          </li>
          <li class="animate__animated animate__fadeIn" v-if="cnt >= 1">
            <span>邀请新成员，用<em>链接</em>联系上你我他。</span>
          </li>
          <li class="animate__animated animate__fadeIn" v-if="cnt >= 2">
            <span><em>团队间切换</em>，分分钟就能搞定。</span>
          </li>
          <li class="animate__animated animate__fadeIn" v-if="cnt >= 3">
            <span>团队<em>群聊</em>与<em>私信</em>，支持<em>各类文件</em>发送，还能<em>新建群聊</em>，你想要的这里都有。</span>
          </li>
        </ul>
      </div>
    </div>
    <div 
      class="intro-1-right-img animate__animated" 
      :class="{'animate__fadeIn': cnt === 0, 'animate__fadeInBottomLeft': cnt === 3, 'intro-1-all-img intro-1-all-img-1': cnt === 3}"
      v-if="cnt === 0 || cnt === 3"
    >1</div>
    <div 
      class="intro-1-right-img animate__animated" 
      :class="{'animate__fadeIn': cnt === 1, 'animate__fadeInBottomLeft': cnt === 3, 'intro-1-all-img intro-1-all-img-2': cnt === 3}"
      v-if="cnt === 1 || cnt === 3"
    >2</div>
    <div 
      class="intro-1-right-img animate__animated"
      :class="{'animate__fadeIn': cnt === 2, 'animate__fadeInTopLeft': cnt === 3, 'intro-1-all-img intro-1-all-img-3': cnt === 3}" 
      v-if="cnt === 2 || cnt === 3"
    >3</div>
    <div 
      class="intro-1-right-img animate__animated" 
      :class="{'animate__fadeInTopLeft': cnt === 3, 'intro-1-all-img intro-1-all-img-4': cnt === 3}"
      v-if="cnt === 3"
    >4</div>
  </div>
  <!-- 第二步：个人信息和消息中心 -->
  <div class="step-container" v-if="cnt >= 4 && cnt < 7">
    <img class="arrow arrow-2 animate__animated animate__rotateInUpRight" src="/src/assets/arrow.png" alt="">
    <div class="intro intro-2 animate__animated animate__rotateInUpRight">
      <div class="intro-content intro-2-content">
        <h3 class="content-title">
          信息维护和消息接收，看向这里
        </h3>
        <ul class="content-list">
          <li class="animate__animated animate__fadeIn" v-if="cnt >= 4">
            <span><em>轻点头像</em>以进入个人中心，打造独一无二的自己。</span>
          </li>
          <li class="animate__animated animate__fadeIn" v-if="cnt >= 5">
            <span><em>轻点信封</em>以查看消息列表，来自同伴们的<em>@</em>一览无余。</span>
          </li>
          <li class="animate__animated animate__fadeIn" v-if="cnt >= 6">
            <span><em>设置已读、删除已读</em>，用起来快得很、方便得很。</span>
          </li>
        </ul>
      </div>
    </div>
    <div 
      class="intro-2-left-img animate__animated" 
      :class="{'animate__fadeIn': cnt === 4, 'animate__fadeInBottomRight': cnt === 6, 'intro-2-all-img intro-2-all-img-1': cnt === 6}"
      v-if="cnt === 4 || cnt === 6"
    >5</div>
    <div 
      class="intro-2-left-img animate__animated" 
      :class="{'animate__fadeIn': cnt === 5, 'animate__fadeInRight': cnt === 6, 'intro-2-all-img intro-2-all-img-2': cnt === 6}"
      v-if="cnt === 5 || cnt === 6"
    >6</div>
    <div 
      class="intro-2-left-img animate__animated"
      :class="{'animate__fadeInTopRight': cnt === 6, 'intro-2-all-img intro-2-all-img-3': cnt === 6}" 
      v-if="cnt === 6"
    >7</div>
  </div>
  <div class="guide-cover-container animate__animated" v-if="cnt === 7" :class="{'animate__zoomIn': cnt === 7}">
    <div class="large-img large-img-1"></div>
    <h3 class="large-text">轻点团队成员卡片，<em>设置管理权限</em>容易又方便</h3>
  </div>
  <div class="guide-cover-container animate__animated animate__fadeIn" v-if="cnt === 8">
    <div class="large-img large-img-2"></div>
    <h3 class="large-text">邀请伙伴加入<em>自定义群聊</em>，在小团体里畅所欲言</h3>
  </div>
  <div class="guide-cover-container animate__animated animate__fadeIn" v-if="cnt === 9">
    <div class="large-img large-img-3"></div>
    <h3 class="large-text"><em>@群友、多选转发</em>，让大家伙听到你的声音</h3>
  </div>
  <div class="guide-cover-container animate__animated animate__fadeIn" v-if="cnt === 10" >
    <div class="large-img large-img-4"></div>
    <h3 class="large-text">在团队里<em>新建一个项目</em>，去管理项目的<em>文档与原型</em></h3>
  </div>
  <div class="guide-cover-container animate__animated animate__fadeIn" v-if="cnt === 11" >
    <div class="large-img large-img-5"></div>
    <h3 class="large-text"><em>右键项目卡片</em>，轻松重命名、拷贝、删除项目</h3>
    <h3 class="large-text">误删也不怕，去<em>回收站</em>就能找回来</h3>
  </div>
  <div class="guide-cover-container animate__animated animate__fadeIn" v-if="cnt === 12" >
    <div class="large-img large-img-6"></div>
    <h3 class="large-text">项目太多？<em>搜索和排序</em>让你找得更方便</h3>
  </div>
  <div class="guide-cover-container animate__animated animate__fadeIn" v-if="cnt === 13" >
    <div class="large-img large-img-7"></div>
    <h3 class="large-text"><em>新建</em>文档，<em>协作</em>编辑，还可以<em>分享</em>给游客</h3>
    <h3 class="large-text">创建<em>文件夹</em>管理文档，分类和整理也不难</h3>
  </div>
  <div class="guide-cover-container animate__animated animate__fadeIn" v-if="cnt === 14" >
    <div class="large-img large-img-8"></div>
    <h3 class="large-text">多种<em>模板</em>供选择，编辑更高效；<em>@团队成员</em>，一起头脑风暴</h3>
    <h3 class="large-text">导出Word、PDF、Markdown，<em>样样都在行</em></h3>
  </div>
  <div class="guide-cover-container animate__animated animate__fadeIn" v-if="cnt === 15" >
    <div class="large-img large-img-9"></div>
    <h3 class="large-text"><em>10秒一次自动保存</em>，还有<em>历史版本</em>供查看和回退</h3>
  </div>
  <div class="guide-cover-container animate__animated animate__fadeIn" v-if="cnt === 16" >
    <div class="large-img large-img-10"></div>
    <h3 class="large-text"><em>新建</em>原型设计，用<em>模板</em>快速搓个好看的网页</h3>
  </div>
  <div class="guide-cover-container animate__fadeIn" v-if="cnt === 17" :class="{'gradually-hide': shouldHide}">
    <div class="large-img large-img-11"></div>
    <h3 class="large-text">支持导出<em>图片</em>和<em>原生三件套</em>，<em>云端协同编辑</em>也不赖</h3>
    <h3 class="large-text"><em>分享预览链接</em>，让别人看看自己团队的大作</h3>
  </div>
</template>

<script>
import 'animate.css'
export default {
  name: 'Guide',
  data() {
    return {
      cnt: -1,
      shouldHide: false // 应用在最后一个元素身上
    }
  },
  watch: {
    cnt(newValue) {
      // 左上角
      if (newValue === 0) {
        this.$refs.mask.style.background = 'radial-gradient(ellipse at 120px 0px, transparent 160px, rgba(0, 0, 0, 0.8) 0px)'
      }
      // 右上角
      if (newValue === 4) {
        this.$refs.mask.style.background = 'radial-gradient(ellipse at top right, transparent 200px, rgba(0, 0, 0, 0.8) 0px)'
      }
      // 恢复
      if (newValue === 7) {
        this.$refs.mask.style.background = 'rgba(0, 0, 0, 0.8)'
      }
    }
  },
  methods: {
    hide() {
      this.shouldHide = true
      setTimeout(() => {
        this.cnt++
        this.$refs.mask.style.display = 'none'
      }, 3000);
    }
  }

}
</script>

<style scoped>
.guide-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 500;
  pointer-events: all;
  background: rgba(0, 0, 0, 0.8);
  /* background: radial-gradient(ellipse at 120px 0px, transparent 160px, rgba(0, 0, 0, 0.8) 0px);  */
  /* background: radial-gradient(ellipse at top right, transparent 200px, rgba(0, 0, 0, 0.8) 0px); */
}

.guide-cover-container {
  /* width: 1000px; */
  /* height: 500px; */
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  /* background-color: white; */
  z-index: 501;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}
.cover-title {
  font-size: 80px;
  font-weight: bold;
  color: rgba(199, 29, 35, 1);
  margin-bottom: 50px;
}
.guide-cover-container ul li {
  display: inline;
  position: relative;
  list-style-type: disc;
  padding-left: 15px;
  margin-right: 40px;
  font-size: 30px;
  font-weight: bold;
  color: white;
}
.guide-cover-container ul li::before {
  content: '·';
  position: absolute;
  left: 0;
}


.arrow {
  width: 100px;
  height: 100px;
  position: fixed;
}

.intro {
  width: 500px;
  height: 500px;
  background-image: url('/src/assets/comment.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  position: fixed;
}

.step-container {
  /* width: 500px;
  height: 500px; */
  position: fixed;
  /* top: 0;
  left: 0; */
  z-index: 501;
}

.intro-content {
  position: absolute;
  max-width: 360px;
  word-break: break-all;
  /* background: yellow; */
}

.content-title {
  font-size: 20px;
  font-weight: bold;
  color: rgba(199, 29, 35, 1);
}

.content-list {
  margin-left: 15px;
}
.content-list * {
  font-size: 20px;
}
.content-list li {
  list-style-type: disc;
  color: rgba(199, 29, 35, 1);
  margin-top: 10px;
}
.content-list li span {
  color: black;
}
.content-list li span em {
  color: rgba(199, 29, 35, 1);
  font-weight: bold;
}

.arrow-1 {
  rotate: -70deg;
  /* transform: rotateZ(-70deg); */
  top: 120px;
  left: 280px;
}

.intro-1 {
  top: 150px;
  left: 50px;
}

.intro-1-content {
  left: 80px;
  top: 110px;
}

.intro-1-right-img {
  width: 600px;
  height: 400px;
  border-radius: 15px;
  background: white;
  position: fixed;
  z-index: 501;
  top: 200px;
  right: 250px;
}
.intro-1-all-img {
  border-radius: 10px;
  background: white;
  position: fixed;
}
.intro-1-all-img-1 {
  width: 300px;
  height: 200px;
  left: 600px;
  top: 20px;
  z-index: 501;
  background: yellow;
}
.intro-1-all-img-2 {
  width: 360px;
  height: 240px;
  left: 800px;
  top: 150px;
  z-index: 502;
  background: skyblue;
}
.intro-1-all-img-3 {
  width: 420px;
  height: 280px;
  left: 900px;
  top: 300px;
  z-index: 503;
  background: purple;
}
.intro-1-all-img-4 {
  width: 480px;
  height: 320px;
  left: 600px;
  top: 500px;
  z-index: 504;
  background: lightgrey;
}

.arrow-2 {
  right: 120px;
  top: 120px;
}

.intro-2 {
  right: 200px;
  top: 100px;
}

.intro-2-content {
  top: 120px;
  left: 80px;
}

.intro-2-left-img {
  width: 600px;
  height: 400px;
  border-radius: 15px;
  background: white;
  position: fixed;
  z-index: 501;
  top: 200px;
  left: 125px;
}

.intro-2-all-img {
  border-radius: 10px;
  background: white;
  position: fixed;
}

.intro-2-all-img-1 {
  width: 360px;
  height: 240px;
  left: 300px;
  top: 50px;
  background: orange;
  z-index: 501;
}
.intro-2-all-img-2 {
  width: 420px;
  height: 280px;
  left: 80px;
  top: 200px;
  background: purple;
  z-index: 502;
}
.intro-2-all-img-3 {
  width: 480px;
  height: 360px;
  left: 260px;
  top: 400px;
  background: green;
  z-index: 503;
}

button {
  width: 120px;
  height: 40px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  background-color: rgba(199, 29, 35, 1);
  position: fixed;
  right: 100px;
  bottom: 100px;
  z-index: 502;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.large-img {
  width: 690px;
  height: 460px;
  border-radius: 15px;
  background: white;
  margin: 0 200px;
}

.guide-cover-container h3,
.guide-cover-container h3 em {
  font-size: 40px;
  font-weight: bold;
  color: white;
}

.guide-cover-container h3:first-of-type {
  margin: 50px 200px;
  margin-bottom: 20px;
}

.guide-cover-container h3 em {
  color: rgba(199, 29, 35, 1);
}

button:hover {
  background-color: rgba(199, 29, 35, 0.8);
  transform: translate(-2px, -2px) scale(1.05);
}

@keyframes hide {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(2);
  }
}

@keyframes bright {
  from {
    background: rgba(0, 0, 0, 0.8);
  }
  to {
    background: transparent;
  }
}

.gradually-hide {
  animation: hide 3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.gradually-bright {
  animation: bright 3s cubic-bezier(0.075, 0.82, 0.165, 1);
}
</style>