<!-- 个人设置中心 -->
<template>
  <TopNav />
  <div class="container">
    <div class="user-left">
      <img
        :src="'/src/assets/avatar.jpeg'"
        @mouseover="avatarIsHovered = true"
        @mouseleave="handleMouseLeaveAvatar"
        @click="uploadAvatar"
      />
      <input
        type="file"
        accept="image/*"
        ref="fileInput"
        @change="handleFileChange"
      />
      <h2 ref="nickname" @click="handleClick('nickname')">
        {{ nickname }}
      </h2>
      <input 
        class="nickname" type="text" v-model="nickname" 
        ref="nicknameInput" 
        @blur="handleBlur('nickname')" @keyup.enter="handleBlur('nickname')"
      />
    </div>
    <div class="user-right">
      <div class="name">
        <div>
          <div class="name-hint">姓</div>
          <h3 
            class="last-name-h3"
            ref="lastname"
            @click="handleClick('lastname')"  
          >{{ last_name }}</h3>
          <input 
            class="last-name" type="text" v-model="last_name" ref="lastnameInput" 
            @blur="handleBlur('lastname')" @keyup.enter="handleBlur('lastname')"  
          />
        </div>
        <div>
          <div class="name-hint">名</div>
          <h3 
            class="first-name-h3"
            ref="firstname" @click="handleClick('firstname')"
          >{{ first_name }}</h3>
          <input 
            class="first-name" type="text" v-model="first_name" ref="firstnameInput"
            @blur="handleBlur('firstname')" @keyup.enter="handleBlur('firstname')"  
          />
        </div>
      </div>

      <div class="email-container">
        <div class="name-hint">邮箱</div>
        <h3 
          class="email-h3"
          ref="email" @click="handleClick('email')"  
        >{{ email }}</h3>
        <input 
          class="email" type="text" v-model="email" ref="emailInput" 
          @blur="handleBlur('email')" @keyup.enter="handleBlur('email')"
        />
      </div>

      <div class="intro-container">
        <div class="name-hint">个人简介</div>
        <div 
          class="intro-content" 
          ref="intro" @click="handleClick('intro')"
        >{{ intro }}</div>
        <textarea 
          class="intro" cols="30" rows="6" v-model="intro" 
          ref="introInput" 
          @blur="handleBlur('intro')" @keyup.enter="handleBlur('intro')"
        ></textarea>
      </div>
      <!-- <br>
      <br>
      <br>
      <br> -->
      <button @click="back">返回</button>
      <button @click="confirm">确认</button>
      </div>
    </div>
  
  
</template>

<script>
import TopNav from '/src/components/TopNav/TopNav.vue'
export default {
  name: 'UserView',
  components: { TopNav },
  data() {
    return {
      nickname: '',
      first_name: '',
      last_name: '',
      email: '',
      intro: '',
      avatarIsHovered: false,
      avatarFile: null,
      avatarUrl: '',
    }
  },
  mounted() {
    this.$http.get('/api/accounts/4/').then(
      (response) => {
        this.nickname = response.data.username
        this.first_name = response.data.first_name
        this.last_name = response.data.last_name
        this.email = response.data.email
        this.intro = response.data.profile
        this.avatarFile = response.data.avatar
        this.avatarUrl = response.data.avatar
        if (this.intro.length === 0) this.intro = '暂无简介。'
      },
      (error) => {
        console.log(error)
      }
    )
  },
  methods: {
    back() {
      alert('返回上一页，请mq加路由')
      //todo for mq
    },
    confirm() {
      alert('保存修改信息并返回，请mq加路由')
      //todo for mq
      let data = new FormData()
      data.append('username', this.nickname)
      data.append('first_name', this.first_name)
      data.append('last_name', this.last_name)
      data.append('email', this.email)
      data.append('profile', this.profile)
      data.append('avatar', this.avatarFile)
      this.$http.post('/api/accounts/update/', data).then((response) => {
        if (response.data.code === '0') {
          // todo for mq
        }
      })
    },
    handleMouseLeaveAvatar() {
      this.avatarIsHovered = false
    },
    uploadAvatar() {
      this.$refs.fileInput.click()
    },
    handleFileChange(e) {
      this.avatarFile = e.target.files[0]
      this.avatarUrl = URL.createObjectURL(this.avatarFile)
    },

    // 以下方法均为 UI 处理所用
    handleClick(el) {
      this.$refs[el].style.display = 'none'
      this.$refs[el + 'Input'].style.display = 'block'
      this.$refs[el + 'Input'].focus()
    },
    handleBlur(el) {
      this.$refs[el].style.display = 'block'
      this.$refs[el + 'Input'].style.display = 'none'
    }
  },
}
</script>

<style scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  padding-top: 80px;
  display: flex;
  justify-content: space-between;
}

.user-left {
  width: 400px;
}
.user-right {
  width: 600px;
}

.user-left img {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.user-left img:hover {
  transform: translate(-3px, -3px) scale(1.02);
  box-shadow: 3px 3px 8px grey;
}
.user-left h2 {
  margin: 20px 0;
  width: 300px;
  box-sizing: border-box;
  border-radius: 10px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
}
.user-left h2:hover {
  outline: 2px dashed lightgrey;
}
input.nickname {
  display: none;
  width: 300px;
  height: 42px;
  margin: 20px 0;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 30px;
  text-align: center;
}

.name {
  margin-bottom: 30px;
}
.name>div {
  display: inline-block;
}
.name>div:first-child {
  margin-right: 50px;
}
.name-hint {
  font-size: 18px;
  color: grey;
}
.name h3 {
  font-size: 24px;
  border-radius: 5px;
  cursor: pointer;
}
.last-name-h3 {
  width: 100px;
}
.first-name-h3 {
  width: 200px;
}
.name h3:hover {
  outline: 2px dashed lightgrey;
}

.last-name, .first-name {
  display: none;
  height: 29.5px;
  border: 2px solid black;
  border-radius: 5px;
  font-size: 24px;
}
.last-name {
  width: 96px;
}
.first-name {
  width: 196px;
}

.email-container {
  margin-bottom: 30px;
}
.email-h3 {
  width: 400px;
  font-size: 24px;
  border-radius: 5px;
  cursor: pointer;
}
.email-h3:hover {
  outline: 2px dashed lightgrey;
}
.email {
  display: none;
  width: 396px;
  height: 29.5px;
  border: 2px solid black;
  border-radius: 5px;
  font-size: 24px;
}
.intro-content {
  font-size: 18px;
  width: 400px;
  height: 150px;
  border-radius: 5px;
  cursor: pointer;
}
.intro-content:hover {
  outline: 2px dashed lightgrey;
}
.intro {
  display: none;
  padding: 10px;
  width: 376px;
  border: 2px solid black;
  border-radius: 5px;
  font-size: 18px;
}
.intro:focus-visible {
  outline: 0;
}

button {
  width: 100px;
  height: 40px;
  /* box-sizing: border-box; */
  margin-top: 20px;
  border-radius: 5px;
  cursor: pointer;
}
button:first-of-type {
  margin-right: 30px;
  background-color: rgb(180, 180, 180);
  color: white;
}
button:last-of-type {
  box-sizing: border-box;
  border: 1px solid rgb(180, 180, 180);
  background: transparent;
  color: rgb(180, 180, 180);
}
button:first-of-type:hover {
  background-color: rgb(210, 210, 210);
}
button:last-of-type:hover {
  box-sizing: border-box;
  border: 1px solid rgb(150, 150, 150);
  background: transparent;
  color: rgb(150, 150, 150);
}

input[type="file"] {
  display: none;
}
</style>