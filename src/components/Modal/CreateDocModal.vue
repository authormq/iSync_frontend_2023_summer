<template>
  <StylishModal :show="show" width="700px" height="300px" padding="25px">
    <div class="title-container">
      <div></div>
      <div class="title">创建文档</div>
      <div class="close-icon" @click="handleClose">
        <CloseIcon size="30" />
      </div>
    </div>
    <div class="content-container">
      <div class="inputs">
        <input type="text" placeholder="文档名称" v-model="name">
        是否公开文档&nbsp;
        <button v-if="!isPublic" @click="isPublic = true">点击公开</button>
        <button v-else @click="isPublic = false">点击私密</button>
        <input type="text" placeholder="文档简介" v-model="profile">
      </div>
      <div class="confirm">
        <button @click="commitCreate">确认</button>
      </div>
    </div>
  </StylishModal>
</template>
<script>
import StylishModal from '../Stylish/StylishModal.vue'
import CloseIcon from '../Svg/CloseIcon.vue'
export default {
  name: 'CreateDocModal',
  props: {
    projectId: {
      type: Number
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  props: ['projectId'],
  components: { StylishModal, CloseIcon },
  data() {
    return {
      name: '',
      isPublic: false,
      profile: '',
      docId: 0 // 如果创建成功，所返回的 docId
    }
  },
  methods: {
    commitCreate() {
      let formData = new FormData()
      formData.append('project', this.projectId)
      formData.append('name', this.name)
      formData.append('isPublic', this.isPublic)
      formData.append('profile', this.profile)
      this.$http.post(`/api/projects/file/create/`, formData).then(
        response => {
          let newDoc = {
            id: response.data.id,
            name: this.name,
            isPublic: this.isPublic
          }
          this.$bus.emit('reloadDocListAfterCreateSucceed', newDoc)
          this.handleClose()
        },
        error => {
          console.log(error.message)
        }
      )
    },
    handleClose() {
      this.isPublic = false
      this.name = ''
      this.profile = ''
      this.$emit('close')
      
    }
  }
}
</script>
<style scoped>
::placeholder {
  color: lightgrey;
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
  color: rgba(199,29,35, 1);
}

.close-icon {
  vertical-align: middle;
  cursor: pointer;
}

.content-container {
  display: flex;
  justify-content: space-between;
  margin: 0 50px;
}

input {
  display: inline-block;
  width: 200px;
  height: 30px;
  border: 1px solid rgba(199,29,35, 1);
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 18px;
  transition: 0.1s cubic-bezier(0.075, 0.82, 0.165, 1);
  caret-color: rgba(199,29,35, 1);
}

input:focus {
  border: 3px solid rgba(199,29,35, 1);
}

.inputs {
  display: inline-block;
}

.inputs button {
  width: 80px;
  height: 35px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  box-sizing: border-box;
  border: 1px solid rgba(199,29,35, 1);
  color: rgba(199,29,35, 1);
  background: white;
}

.inputs button:hover {
  border: 1px solid rgba(199,29,35, 0.8);
  color: rgba(199,29,35, 0.8);
}

.confirm {
  display: inline-block;
}

.confirm button {
  display: inline-block;
  width: 80px;
  height: 35px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  background: rgba(199,29,35, 1);
  color: white;
}

.confirm button:hover {
  background: rgba(199,29,35, 0.8);
}
</style>