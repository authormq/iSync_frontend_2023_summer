<!-- 团队信息 -->
<template>
  <div class="info-header">
    <img 
      :src="teamAvatarUrl" 
      ref="avatar" 
      @click="uploadAvatar" 
      @mouseover="avatarIsHovered = true"
      @mouseleave="avatarIsHovered = false"
    >
    <input 
      type="file" 
      accept="image/*" 
      ref="fileInput" 
      @change="handleFileChange"
    >
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
    <div id="active-users"></div>
    <div id="active-projects"></div>
  </div>
  
</template>

<script>
import PenIcon from '../../../components/Svg/PenIcon.vue'
import CheckIcon from '../../../components/Svg/CheckIcon.vue'
import CrossIcon from '../../../components/Svg/CrossIcon.vue'
import * as echarts from 'echarts'
export default {
  name: 'InfoView',
  components: { PenIcon, CheckIcon, CrossIcon },
  data() {
    return {
      isEditing: false,                   // 是否处于编辑状态，控制按钮是否出现
      avatarIsHovered: false,
      teamAvatarUrl: '',
      teamAvatarChanged: false, //头像是否被修改过
      teamAvatar: null,
      teamName: '',
      teamFounder: '',
      teamFoundTime: '',
      teamPopulation: '',
      teamProjectCount: '6', //接口还没写好
      teamIntroduction:''
    }
  },
  mounted() {
    this.$http.get('/api/teams/1/').then(
      (response) => {
        this.teamAvatar = response.data.avatar
        this.teamAvatarUrl = response.data.avatar
        this.teamName = response.data.name
        this.teamFound = response.data.members.filter(item => item.identity == 'leader')
        this.teamFoundTime = response.data.create_datetime
        this.teamPopulation = response.data.members.length
        this.teamIntroduction = response.data.profile
        if (this.teamIntroduction.length === 0) this.teamIntroduction = '该团队暂无简介。'
        //团队项目数后端未完成
      },
      (error) => {
        console.log(error)
      }
    )
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
  mounted() {
    let users = echarts.init(document.getElementById('active-users'))
    users.setOption({
      title: {
        text: '近期活跃成员'
      },
      tooltip: {},
      xAxis: {
        data: ['小明', '小王', 'Tom', 'Mq', '小李']
      },
      yAxis: {},
      series: [
        {
          name: '消息条数',
          type: 'bar',
          data: [300, 345, 407, 522, 1024]
        }
      ]
    })
    let projects = echarts.init(document.getElementById('active-projects'))
    projects.setOption({
      title: {
        text: '近期活跃项目',
        left: 'center',
        top: 'center'
      },
      series: [
        {
          type: 'pie',
          data: [
            {
              value: 335,
              name: 'iSound音乐播放平台'
            },
            {
              value: 234,
              name: '小学期项目'
            },
            {
              value: 123,
              name: '编译大作业'
            }
          ],
          radius: ['40%', '70%']
        }
      ]
    })
},
  methods: {
    updateTeamInfo() {
      // todo
      let data = new FormData()
      data.append('name', this.teamName)
      data.append('profile', this.teamIntroduction)
      if (this.teamAvatarChanged) {
        data.append('avatar', this.teamAvatar)
      }
      this.$http.put('/api/teams/1/', data).then(
        response => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response.data)
          } else if (response.status >= 400) {
            console.log('修改团队信息失败，请重试');
          }
        },
        error => {
          console.log(error.message);
        }
      )
      this.isEditing = false
    },
    uploadAvatar() {
      if (this.isEditing) {
        this.$refs.fileInput.click()
      }
    },
    handleFileChange(e) {
      this.teamAvatarChanged = true
      this.teamAvatar = e.target.files[0]
      this.teamAvatarUrl = URL.createObjectURL(this.teamAvatar)
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

.info-charts {
  display: flex;
  margin-top: 50px;
}

#active-users, #active-projects {
  width: 500px;
  height: 350px;
  padding-top: 20px;
  /* background-color: green; */
}
</style>