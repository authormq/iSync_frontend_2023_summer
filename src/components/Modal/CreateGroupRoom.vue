<template>
  <StylishModal :show="show" width="500px" height="400px" padding="25px">
    <div class="title-container">
      <div></div>
      <div class="title">创建群聊</div>
      <div class="close-icon" @click="handleClose">
        <CloseIcon size="30" />
      </div>
    </div>
    <div class="team-modal-container">
      <div class="inputs">
        <input type="text" placeholder="群聊名称" autofocus v-model="name">
        <div class="input-hint">给群聊起个好听的名字</div>
        <div class="selectMembers">
          <div v-for="member in memberList" :key="member.id">
            <div class="selectItem" :class="{ selectItemColor: member.isSelect }" @click="handleClickMember(member)">
              <img class="selectAvatar" :src="member.avatar" />
              <span class="selectUsername">{{ member.username }}</span>
              <span class="selectRealname">({{ member.realname }})</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <img v-if="avatarFile !== null" :src="avatarUrl" @mouseover="avatarIsHovered = true"
            @mouseleave="handleMouseLeaveAvatar" @click="uploadAvatar" />
          <div class="upload-icon" v-else @click="uploadAvatar">
            <svg t="1693055447530" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2328"
              width="80" height="80">
              <path
                d="M319.5 768.7h385v-385h128.3L512 62.8 191.2 383.7h128.3v385zM512 153.6l165.9 165.9h-37.6v385H383.7v-385h-37.6L512 153.6z"
                fill="lightgrey" p-id="2329"></path>
              <path
                d="M886.2 704.5h-53.3v128.4c0 35.4-28.8 64.2-64.2 64.2H255.3c-35.4 0-64.2-28.8-64.2-64.2V704.5H127v128.3c0 70.6 57.8 128.3 128.3 128.3h513.3c70.6 0 128.3-57.8 128.3-128.3V715.3c0.1-5.9-4.8-10.8-10.7-10.8z"
                fill="lightgrey" p-id="2330"></path>
            </svg>
          </div>
          <input type="file" accept="image/*" ref="fileInput" @change="handleFileChange">
        </div>
        <div class="buttons">
          <button class="confirm" @click="createGroupConfirm">确认</button>
          <button class="cancel" @click="handleClose">取消</button>
        </div>
      </div>
    </div>
  </StylishModal>
</template>
<script>
import StylishModal from '../Stylish/StylishModal.vue';
import StylishSelect from '../Stylish/StylishSelect.vue';
export default {
  name: 'CreateGroupRoom',
  components: {
    StylishModal,
    StylishSelect
  },
  emits: ['close'],
  props: {
    show: { type: Boolean, default: false }
  },
  data() {
    return {
      name: '',
      members: [],
      avatarUrl: '',
      avatarFile: null,
      teamId: '',
      memberList: [],
      selectList: [],
    }
  },
  mounted() {
    this.teamId = this.$route.params.teamId
    this.$http.get(`/api/teams/${this.teamId}/`).then(
      response => {
        this.memberList = response.data.members.map((member) => ({
          id: member.user.id,
          username: member.user.username,
          realname: member.user.last_name + member.user.first_name,
          avatar: member.user.avatar,
          isSelect: false
        }))
        this.memberList = this.memberList.filter(member => member.id != this.$cookies.get('user_id'))
      },
      error => {
        console.log(error.message)
      }
    )
  },
  methods: {
    handleClickMember(member) {
      if (!member.isSelect) {
        member.isSelect = true
        this.selectList.push(member.id)
      } else {
        member.isSelect = false
        this.selectList.splice(this.selectList.indexOf(member.id), 1)
      }
    },
    handleMouseLeaveAvatar() {
      this.avatarIsHovered = false
    },
    uploadAvatar() {
      this.$refs.fileInput.click()
    },
    handleFileChange(e) {
      this.avatarChanged = true
      this.avatarFile = e.target.files[0]
      this.avatarUrl = URL.createObjectURL(this.avatarFile)
    },
    handleClose() {
      this.name = ''
      this.selectList = []
      this.avatarFile = null
      this.avatarUrl = ''
      this.cancelSelectProperty()
      this.$emit('close')
    },
    cancelSelectProperty() {
      for (let member of this.memberList) {
        member.isSelect = false
      }
    },
    createGroupConfirm() {
      // const groupName = this.name
      // if (this.avatarFile != null) {
      //   const reader = new FileReader()
      //   const avatarName = this.avatarFile.name
      //   reader.onload = (event) => {
      //     this.$bus.emit('roomOption', JSON.stringify({
      //       'option': 'create',
      //       'name': groupName,
      //       'avatar': event.target.result.split('base64,')[1],
      //       'avatar_name': avatarName,
      //       'team': this.teamId,
      //       'users': this.selectList
      //     }))
      //   }
      //   reader.readAsDataURL(this.avatarFile)
      // }
      // else {
      //   this.$bus.emit('roomOption', JSON.stringify({
      //     'option': 'create',
      //     'name': groupName,
      //     'avatar': null,
      //     'team': this.teamId,
      //     'users': this.selectList
      //   }))
      // }
      // this.handleClose()
      let formData = new FormData()
      formData.append('name', this.name)
      formData.append('avatar', this.avatarFile)
      formData.append('team', this.teamId)
      formData.append('users', this.selectList.join(' '))
      this.$http.post('/api/groups/create/', formData).then(
        response => {
          console.log(response.data);
          this.$bus.emit('roomOption', JSON.stringify({
            'option': 'create',
            'group_data': response.data
          }))
          this.handleClose()
        },
        error => {
          console.log(error.message);
        }
      )
    }
  }
}
</script>
<style scoped>
::placeholder {
  color: lightgrey;
}

.selectItem {
  margin-bottom: 7px;
  display: flex;
  cursor: pointer;
  border-radius: 50px;
}

.selectItemColor {
  background-color: rgba(199, 29, 35, 0.8);
}

.selectAvatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.selectUsername {
  font-size: 16px;
  margin-top: 8px;
  margin-left: 5px;
  font-weight: bold;
}

.selectRealname {
  font-size: 10px;
  margin-top: 13px;
  margin-left: 5px;
  font-weight: bold;
  color: grey;
}

.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin-bottom: 20px;
}

.title {
  font-size: 30px;
  font-weight: bold;
  padding-left: 30px;
  color: rgba(199, 29, 35, 1);
}

.close-icon {
  vertical-align: middle;
  cursor: pointer;
}

.team-modal-container {
  display: flex;
  justify-content: space-between;
  width: 400px;
  margin: 0 auto;
}

.inputs input {
  display: block;
  width: 250px;
  height: 30px;
  border: 1px solid rgba(199, 29, 35, 1);
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 18px;
  transition: 0.1s cubic-bezier(0.075, 0.82, 0.165, 1);
  caret-color: rgba(199, 29, 35, 1);
}

.input-hint {
  margin-bottom: 20px;
  font-size: 14px;
  color: lightgrey;
}

.inputs input:focus {
  border: 3px solid rgba(199, 29, 35, 1);
}

.inputs textarea {
  display: block;
  width: 250px;
  font-size: 18px;
  border: 1px solid rgba(199, 29, 35, 1);
  border-radius: 10px;
  padding: 5px 10px;
  transition: 0.1s cubic-bezier(0.075, 0.82, 0.165, 1);
  caret-color: rgba(199, 29, 35, 1);
}

.inputs textarea:focus-visible {
  outline: 0;
  border: 3px solid rgba(199, 29, 35, 1);
}

input[type="file"] {
  display: none;
}

img {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

img:hover {
  transform: translate(-2px, -2px) scale(1.02);
  box-shadow: 2px 2px 10px grey;
}

.upload-icon {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  border: 3px dashed lightgrey;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.upload-icon:hover {
  transform: translate(-2px, -2px) scale(1.02);
}

.buttons {
  margin-top: 60px;
}

.confirm,
.cancel {
  display: block;
  width: 100px;
  height: 35px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.confirm {
  background: rgba(199, 29, 35, 1);
  color: white;
}

.confirm:hover {
  background: rgba(199, 29, 35, 0.8);
}

.cancel {
  box-sizing: border-box;
  border: 1px solid rgba(199, 29, 35, 1);
  color: rgba(199, 29, 35, 1);
  background: white;
}

.cancel:hover {
  border: 1px solid rgba(199, 29, 35, 0.8);
  color: rgba(199, 29, 35, 0.8);
}

.confirm {
  margin-bottom: 20px;
}

.selectMembers {
  display: block;
  width: 250px;
  height: 180px;
  font-size: 18px;
  border: 1px solid rgba(199, 29, 35, 1);
  border-radius: 10px;
  padding: 5px 10px;
  transition: 0.1s cubic-bezier(0.075, 0.82, 0.165, 1);
  caret-color: rgba(199, 29, 35, 1);
  overflow: auto;
}
</style>