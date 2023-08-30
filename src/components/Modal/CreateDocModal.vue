<template>
  <StylishModal :show="show" width="950px" height="700px" padding="25px">
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
        <span>文档权限</span>
        <button v-if="isPublic == 0" @click="isPublic = 1">私密</button>
        <button v-else @click="isPublic = 0">公开</button>
      </div>
    </div>
    <div class="introduction">
      <input type="text" placeholder="文档简介" v-model="profile">
    </div>
    <div class="model-title">文档模板</div>
    <div class="model-container">
      <ul>
        <li v-for="(model, index) in models" :key="index" style="display: inline-block;">
          <button class="model-select-button"
            :style="{ 'background': model.isSelected ? 'rgba(199, 29, 35, 1)' : 'transparent' }"
            @click="handleModelSelect(index)">
            <img class="model-img" :src="model.imgSrc">
            <span class="model-type" :style="{ 'color': model.isSelected ? 'white' : 'rgba(199, 29, 35, 1)' }">
              {{ model.name }}
            </span>
          </button>
        </li>
      </ul>
    </div>
    <div class="bottom-box">
      <button class="cancel" @click="handleClose">取消</button>
      <button class="confirm" @click="commitCreate">创建</button>
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
      models: [
        {
          isSelected: true,
          imgSrc: "/src/assets/avatar.jpeg",
          type: 'empty',
          name: '空文档'
        },
        {
          isSelected: false,
          imgSrc: "/src/assets/avatar.jpeg",
          type: 'project_plan',
          name: '项目计划'
        },
        {
          isSelected: false,
          imgSrc: "/src/assets/avatar.jpeg",
          type: 'meeting_minutes',
          name: '会议纪要'
        },
        {
          isSelected: false,
          imgSrc: "/src/assets/avatar.jpeg",
          type: 'management',
          name: '管理'
        },
        {
          isSelected: false,
          imgSrc: "/src/assets/avatar.jpeg",
          type: 'weekly_report',
          name: '工作周报'
        },
        {
          isSelected: false,
          imgSrc: "/src/assets/avatar.jpeg",
          type: 'research_report',
          name: '研究报告'
        },
        {
          isSelected: false,
          imgSrc: "/src/assets/avatar.jpeg",
          type: 'specification_manual',
          name: '规格手册'
        },
        {
          isSelected: false,
          imgSrc: "/src/assets/avatar.jpeg",
          type: 'design_manual',
          name: '设计手册'
        },
      ],
      docId: 0 // 如果创建成功，所返回的 docId
    }
  },
  methods: {
    commitCreate() {
      let formData = new FormData()
      let docType = 'empty'
      formData.append('project', this.projectId)
      formData.append('name', this.name)
      formData.append('isPublic', this.isPublic)
      formData.append('profile', this.profile)
      this.models.forEach((model) => {
        if (model.isSelected === true) {
          docType = model.type
          formData.append('type', model.type)
        }
      })
      console.log(formData);
      this.$http.post(`/api/projects/file/create/`, formData).then(
        response => {
          let newDoc = {
            id: response.data.id,
            name: this.name,
            isPublic: this.isPublic,
            type: docType,
          }
          alert('111')
          this.$bus.emit('reloadDocListAfterCreateSucceed', newDoc)
          this.handleClose()
        },
        error => {
          console.log('@@', error.message)
        }
      )
    },
    handleModelSelect(index) {
      this.models.forEach((model) => {
        model.isSelected = false
      })
      this.models[index].isSelected = true
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
  color: rgba(199, 29, 35, 1);
}

.close-icon {
  vertical-align: middle;
  cursor: pointer;
}

.content-container {
  display: flex;
  justify-content: space-between;
  margin: 0 60px;
}

.inputs input {
  box-sizing: border-box;
  display: inline-block;
  width: 200px;
  height: 35px;
  border: 1px solid rgba(199, 29, 35, 1);
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 18px;
  transition: 0.1s cubic-bezier(0.075, 0.82, 0.165, 1);
  caret-color: rgba(199, 29, 35, 1);
}

input:focus {
  border: 3px solid rgba(199, 29, 35, 1);
}

.inputs {
  display: inline-block;
  margin-left: 50px;
}

.inputs span {
  color: rgba(199, 29, 35, 1);
  font-weight: 700;
  margin-left: 220px;
  font-size: 18px;
}

.inputs button {
  padding: 0 15px;
  margin-left: 50px;
  height: 30px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  box-sizing: border-box;
  border: 1px solid rgba(199, 29, 35, 1);
  color: rgba(199, 29, 35, 1);
  background: white;
}

.inputs button:hover {
  border: 1px solid rgba(199, 29, 35, 0.8);
  color: rgba(199, 29, 35, 0.8);
}

.introduction {
  text-align: center;
}

.introduction input {
  width: 80%;
  padding: 0 15px;
  margin: 20px 50px;
  height: 30px;
  font-size: 18px;
  border-radius: 5px;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  box-sizing: border-box;
  border: 1px solid rgba(199, 29, 35, 1);
  color: rgba(199, 29, 35, 1);
  background: white;
}

.model-title {
  font-size: 25px;
  font-weight: bold;
  margin: 15px 0 5px 65px;
  color: rgba(199, 29, 35, 1);
}

.model-container {
  display: flex;
  margin: 0 60px;
}


.model-select-button {
  text-align: center;
  margin: 10px 30px;
  padding: 0 0 5px 0;
  border-radius: 20px;
  border: 2px solid rgba(199, 29, 35, 1);
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.model-select-button:hover {
  border: 2px solid rgba(199, 29, 35, 0.5);
  cursor: pointer;
}

.model-img {
  width: 130px;
  border-radius: 20px;
  margin-bottom: 5px;
}

.model-type {
  color: rgba(199, 29, 35, 1);
  font-weight: 700;
}

.bottom-box {
  display: flex;
  padding: 10px 80px 30px 80px;
  justify-content: space-between;
  margin-bottom: 20px;
}



.confirm,
.cancel {
  display: block;
  width: 100px;
  height: 35px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}



.cancel {
  box-sizing: border-box;
  border: 2px solid rgba(199, 29, 35, 1);
  color: rgba(199, 29, 35, 1);
  background: white;
}

.cancel:hover {
  border: 2px solid rgba(199, 29, 35, 0.5);
  color: rgba(199, 29, 35, 0.5);
}


.confirm {
  background: rgba(199, 29, 35, 1);
  color: white;
  display: inline-block;
  width: 100px;
  height: 35px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.confirm:hover {
  background: rgba(199, 29, 35, 0.8);
}
</style>