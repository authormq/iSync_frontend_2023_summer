<template>
  <StylishModal :show="show" width="700px" height="150px" padding="25px">
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
        <button v-if="isPublic == 0" @click="isPublic = 1">点击公开</button>
        <button v-else @click="isPublic = 0">点击私密</button>
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
  // props: ['projectId', 'show'],
  props: {
    projectId: {
      type: String
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
      isPublic: 0,
      docId: 0 // 如果创建成功，所返回的 docId
    }
  },
  methods: {
    commitCreate() {
      console.log(this.name, this.isPublic);
      this.$http.post(`/api/projects/file/${this.projectId}/create/${this.name}/${this.isPublic}`).then(
        response => {
          // 创建成功，直接跳转到新页面
          this.docId = response.data.id
          // 下面需要根据实际情况跳转

          // 清空
          this.isPublic = 0
          this.name = ''
        },
        error => {
          console.log('@@',error.message)
        }
      )
    },
    cancelCreate() {
      this.isPublic = 0
      this.name = ''
    },
    handleClose() {
      this.$emit('close')
      this.isPublic = 0
      this.name = ''
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