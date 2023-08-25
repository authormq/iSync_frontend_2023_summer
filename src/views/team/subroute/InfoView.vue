<!-- 团队信息 -->
<template>
  <div class="info-header">
    <img 
      src="/src/assets/avatar.jpeg" 
      ref="avatar" 
      @click="uploadAvatar" 
      @mouseover="avatarIsHovered = true"
      @mouseleave="avatarIsHovered = false"
    >
    <input type="file" accept="image/*" ref="fileInput" @change="handleFileChange">
    <div class="info-header-right">
      <div class="info-header-upper">
        <div class="info-text">
          <h2 ref="teamName">{{ teamName }}</h2>
          <input type="text" class="team-name-input" ref="teamNameInput" v-model="teamName">
          <h3 v-if="!isEditing">{{ teamFounder }}</h3>
          <h3 v-if="!isEditing">创建于{{ teamFoundTime }}</h3>
        </div>
        <div class="number-box" v-if="!isEditing">
          <p>成员</p>
          <span>{{ teamPopulation }}</span>
        </div>
        <div class="number-box" v-if="!isEditing">
          <p>项目</p>
          <span>{{ teamProjectCount}}</span>
        </div>
      </div>
      <div class="info-intro" ref="teamIntro">
        {{ teamIntroduction }}
      </div>
      <textarea class="team-intro-input" cols="30" rows="6" ref="teamIntroInput" v-model="teamIntroduction"></textarea>
      <!-- 需要判断是否有权限编辑 -->
      <div class="modify-info">
        <PenIcon v-if="!isEditing" @click="isEditing = true" />
        <template v-else>
          <CrossIcon class="close-icon" @click="isEditing = false"/>&nbsp;&nbsp;
          <!-- 接口待编写 -->
          <CheckIcon @click="updateTeamInfo"/>
        </template>
      </div>
    </div>
      
    
  </div>
    
  <div class="info-charts">

  </div>
  
</template>

<script>
import PenIcon from '../../../components/Svg/PenIcon.vue'
import CheckIcon from '../../../components/Svg/CheckIcon.vue'
import CrossIcon from '../../../components/Svg/CrossIcon.vue'
export default {
  name: 'InfoView',
  components: { PenIcon, CheckIcon, CrossIcon },
  data() {
    return {
      isEditing: false,                   // 是否处于编辑状态，控制按钮是否出现
      avatarIsHovered: false,
      teamAvatar: '/src/assets/3.jpg',
      teamName: '团队名称XXX',
      teamFounder: '小明',
      teamFoundTime: '2023-10-01',
      teamPopulation: '5',
      teamProjectCount: '6',
      teamIntroduction:'这是团队简介。'
    }
  },
  watch: {
    avatarIsHovered(newValue) {
      if (this.isEditing) {
        if (newValue) {
          this.$refs.avatar.style.transform = 'translate(-2px, -2px) scale(1.02)'
          this.$refs.avatar.style.boxShadow = '2px 2px 5px grey'
        } else {
          this.$refs.avatar.style.transform = 'none'
          this.$refs.avatar.style.boxShadow = 'none'
        }
      }
    },
    isEditing(newValue) {
      if (newValue) {
        this.$refs.avatar.style.cursor = 'pointer'
        this.$refs.teamName.style.display = 'none'
        this.$refs.teamIntro.style.display = 'none'
        this.$refs.teamNameInput.style.display = 'inline-block'
        this.$refs.teamIntroInput.style.display = 'block'
        this.$refs.teamNameInput.focus()
        
      } else {
        this.$refs.avatar.style.cursor = 'default'
        this.$refs.teamName.style.display = 'inline-block'
        this.$refs.teamIntro.style.display = 'block'
        this.$refs.teamNameInput.style.display = 'none'
        this.$refs.teamIntroInput.style.display = 'none'
      }
    }
  },
  methods: {
    updateTeamInfo() {
      // todo

      this.isEditing = false
    },
    uploadAvatar() {
      if (this.isEditing) {
        this.$refs.fileInput.click()
      }
    }
  }
}
</script>

<style scoped>
* {
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.info-header {
  display: flex; 
  position: relative;
}
.info-header img {
  width: 240px;
  height: 240px;
  border-radius: 15px;
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.info-header-right {
  padding-top: 30px;
}

.info-header-upper {
  display: flex;
}

.info-text {
  margin-left: 40px;
  /* padding-top: 50px; */
}
.info-text>h2,
.info-text>h3 {
  padding-top: 35px;
}
.info-text>h2,
.info-text>h3 {
  display: inline-block;
}
.info-text>h2 {
  font-size: 40px;
  font-weight: bold;
}
.info-text>h3 {
  font-size: 18px;
  padding-left: 5px;
  color: grey;
}
.number-box {
  width: 80px;
  height: 80px;
  /* box-sizing: border-box; */
  border: 1px solid grey;
  color: grey;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}
.number-box>p {
  width: 80px;
  margin-bottom: 5px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
.number-box>span {
  width: 80px;
  display: block;
  text-align: center;
  font-size: 16px;
}
.info-header-upper>div:nth-of-type(2) {
  margin: 0 40px;
}

.info-intro {
  margin-left: 40px;
  margin-top: 10px;
}

.modify-info {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}

input, textarea {
  display: none;
}

.team-name-input {
  /* display: inline-block; */
  width: 300px;
  height: 60px;
  box-sizing: border-box;
  padding: 5px;
  border-radius: 10px;
  background-color: transparent;
  font-size: 30px;
  /* border: 1px solid black; */
  box-shadow: 1px 1px 3px grey;
}

.team-intro-input {
  width: 400px;
  height: 100px;
  box-sizing: border-box;
  padding: 5px;
  border-radius: 10px;
  border: 0;
  background-color: transparent;
  box-shadow: 1px 1px 3px grey;
  margin-left: 40px;
  margin-top: 40px;
}
.team-intro-input:focus-visible {
  outline: 0;
  border: 0;
}

</style>