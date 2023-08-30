<template>
  <StylishModal :show="show" width="600px" height="200px" padding="25px">
    <div class="title-container">
      <div></div>
      <div class="title">创建原型</div>
      <div class="close-icon" @click="handleClose">
        <CloseIcon size="30" />
      </div>
    </div>
    <div class="content-container">
      <div class="inputs">
        <input type="text" placeholder="原型名称" v-model="name">
        <input type="text" placeholder="原型简介" v-model="profile">
      </div>
      <div class="confirm">
        <button @click="commitCreate">确认</button>
      </div>
    </div>
  </StylishModal>
</template>
<script>
import { Buttons } from 'grapesjs'
import StylishModal from '../Stylish/StylishModal.vue'
import CloseIcon from '../Svg/CloseIcon.vue'
export default {
  name: 'CreateProtoModal',
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
  components: { StylishModal, CloseIcon },
  data() {
    return {
      // show: false,
      name: '',
      protoId: 0, // 如果创建成功，所返回的 protoId
      profile: ''
    }
  },
  methods: {
    commitCreate() {
      let formData = new FormData()
      formData.append('project', this.projectId)
      formData.append('name', this.name)
      formData.append('profile', this.profile)
      this.$http.post(`/api/projects/page/create/`, formData).then(
        response => {
          this.protoId = response.data.id
          let newProto = {
            id: response.data.id,
            name: this.name,
          }
          this.$bus.emit('reloadProtoListAfterCreateSucceed', newProto)
          this.handleClose()
        },
        error => {
          console.log(error.message)
        }
      )
    },
    handleClose() {
      this.$emit('close')
      // this.isPublic = 0
      this.name = ''
      this.profile = ''
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