<template>
  <div class="create clearfix">
    <a class="leftfix" v-if="inFolder" @click="inFolder = false">返回</a>
    <a class="leftfix" v-if="!inFolder" @click="toCreateFolder">新建文件夹</a>
    <a class="leftfix" @click="showDocModal = true">新建文档</a>
    <div class="folder leftfix" v-if="inFolder">
      /{{ curFolder }}
    </div>
  </div>
  <div class="list">
    <template v-if="!inFolder">
      <!-- 新建文件夹 icon -->
      <div class="folder-container" style="cursor: default" v-if="isCreatingFolder">
        <div class="folder-icon">
          <svg t="1693469503523" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5772" width="80" height="80"><path d="M912 208H427.872l-50.368-94.176A63.936 63.936 0 0 0 321.056 80H112c-35.296 0-64 28.704-64 64v736c0 35.296 28.704 64 64 64h800c35.296 0 64-28.704 64-64v-608c0-35.296-28.704-64-64-64z m-800-64h209.056l68.448 128H912v97.984c-0.416 0-0.8-0.128-1.216-0.128H113.248c-0.416 0-0.8 0.128-1.248 0.128V144z m0 736v-96l1.248-350.144 798.752 1.216V784h0.064v96H112z" fill="#c71d23" p-id="5773"></path></svg>
        </div>
        <div class="folder-input">
          <input type="text" v-model="newFolderName" ref="newFolderInput">
          <button @click="cancleCreating">取消</button>
          <button @click="createFolder">新建</button>
        </div>
      </div>

      <!-- 文件夹列表，直接写这里了 -->
      <div v-for="folder in folderList" :key="folder.id" @click="changeToFolder(folder)">
        <div class="folder-container">
          <div class="folder-icon">
            <svg t="1693469503523" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5772" width="80" height="80"><path d="M912 208H427.872l-50.368-94.176A63.936 63.936 0 0 0 321.056 80H112c-35.296 0-64 28.704-64 64v736c0 35.296 28.704 64 64 64h800c35.296 0 64-28.704 64-64v-608c0-35.296-28.704-64-64-64z m-800-64h209.056l68.448 128H912v97.984c-0.416 0-0.8-0.128-1.216-0.128H113.248c-0.416 0-0.8 0.128-1.248 0.128V144z m0 736v-96l1.248-350.144 798.752 1.216V784h0.064v96H112z" fill="#c71d23" p-id="5773"></path></svg>
          </div>
          <div class="folder-name">{{ folder.name }}</div>
        </div>
      </div>
      <div v-for="doc in docList" :key="doc.id" @click="$router.push(`/doc/${doc.id}`)">
        <DocListItem :doc="doc"/>
      </div>
    </template>
    <div v-else v-for="doc in folderDocList" :key="doc.id">
      <DocListItem :doc="doc" />
    </div>
  </div>
  <CreateDocModal :show="showDocModal" :projectId="projectId"  @close="showDocModal = false"/>
</template>

<script>
import DocListItem from '../../../components/ListItem/project/DocListItem.vue'
import CreateDocModal from '../../../components/Modal/CreateDocModal.vue'

export default {
  name: 'DocListView',
  
  components: {
    DocListItem, CreateDocModal
  },
  data() {
    return {
      showDocModal: false,
      folderList: [],
      docList: [],
      folderDocList: [],
      projectId: '',
      inFolder: false,
      curFolder: '',
      newFolderName: '',
      isCreatingFolder: false
    }
  },
  mounted() {
    this.projectId = this.$route.params.projectId
    this.getFiles()
    this.$bus.on('changeDocIdentityRequest', this.handleChangeDocIdentityRequest)
    this.$bus.on('deleteDocRequest', this.handleDeleteDocRequest)
    this.$bus.on('renameDocRequest', this.handleRenameDocRequest)
    this.$bus.on('reloadDocListAfterCreateSucceed', this.handleReloadDocList)
  },
  methods: {
    getFiles() {
      this.$http.get(`/api/projects/file/list/${this.projectId}/`).then(
      response => {
        this.folderList = response.data.folders.map((folder) => ({
          id: folder.id,
          name: folder.name
        }))
        this.docList = response.data.files.map((doc) => ({
          id: doc.id,
          name: doc.name,
          isPublic: doc.isPublic
        }))
      },
      error => {
        console.log(error.message)
      }
    )
    },
    handleReloadDocList(data) {
      this.docList.unshift(data)
    },
    handleDeleteDocRequest(doc) {
      this.$http.delete(`/api/projects/file/${doc.id}/delete/`).then(
        response => {
          this.docList.splice(this.docList.indexOf(doc), 1)
        },
        error => {
          console.log(error.message)
        }
      )
    },
    handleRenameDocRequest(docRenameData) {
      this.$http.post(`/api/projects/file/${docRenameData.doc.id}/rename/${docRenameData.rename}/`).then(
        response => {
          this.docList[this.docList.indexOf(docRenameData.doc)].name = docRenameData.rename
        },
        error => {
          this.$bus.emit('message', {
            title: error.response.data.detail,
            content: '',
            time: 2000
          })
        }
      )
    },
    handleChangeDocIdentityRequest(doc) {
      this.$http.post(`/api/projects/file/${doc.id}/is_public/`).then(
        response => {
          this.docList[this.docList.indexOf(doc)].isPublic = !doc.isPublic
        },
        error => {
          console.log(error.message)
        }
      )
    },
    changeToFolder(folder) {
      this.$http.get(`/api/projects/folder/${folder.id}/list/`).then(
        response => {
          this.curFolder = folder.name
          this.inFolder = true
          this.folderDocList = response.data.map((doc) => ({
            id: doc.id,
            name: doc.name,
            isPublic: doc.isPublic
          }))
        },
        error => {
          console.log(error)
        }
      )
    },
    toCreateFolder() {
      this.isCreatingFolder = true
      this.$nextTick(() => {
        this.$refs.newFolderInput.focus()
      })
    },
    cancleCreating() {
      this.isCreatingFolder = false
      this.newFolderName = ''
    },
    createFolder() {
      let formData = new FormData()
      formData.append('project', this.projectId)
      formData.append('name', this.newFolderName)
      formData.append('profile', '')
      this.$http.post('/api/projects/folder/create/', formData).then(
        response => {
          this.getFiles()
        },
        error => {
          this.$bus.emit('message', { title: '新建失败', content: '', time: 1000 })
        }
      )
      this.newFolderName = ''
      this.isCreatingFolder = false
    }
  }
}
</script>

<style scoped>
.create {
  height: 50px;
  line-height: 50px;
  padding-top: 10px;
}
.create a {
  margin-right: 20px;
  font-size: 20px;
  font-weight: bold;
  color: rgba(199,29,35, 1);
  cursor: pointer;
}
.create a:hover {
  text-decoration: underline;
}

.list {
  max-width: 1150px;
  height: 340px;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
}

.folder-container {
  min-width: 120px;
  height: 120px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px lightgrey;
  margin: 15px;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.folder-container:hover {
  transform: translate(-2px, -2px) scale(1.02);
  box-shadow: 0 0 5px grey;
}

.folder-name {
  min-width: 120px;
  text-align: center;
  margin: 0 auto;
  margin-top: 10px;
  color: rgba(199, 29, 35, 1);
  font-size: 20px;
  font-weight: bold;
}

.folder-icon {
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto
}

.folder {
  text-align: right;
  font-size: 18px;
  padding-left: 20px;
  font-weight: bold;
  color: grey;
  display: flex;
  align-items: center;
}

.folder-input input {
  margin-top: 5px;
  width: 160px;
  height: 20px;
  border-radius: 5px;
  font-size: 20px;
  padding: 5px;
  border: 1px solid rgba(199, 29, 35, 1);
  caret-color: rgba(199, 29, 35, 1);

}
.folder-input input:focus-visible {
  outline: 2px solid rgba(199, 29, 35, 1);
}

.folder-input button {
  margin-left: 10px;
  width: 50px;
  height: 25px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.folder-input button:first-of-type {
  box-sizing: border-box;
  border: 1px solid rgba(199, 29, 35, 1);
  color: rgba(199, 29, 35, 1);
  background: transparent;
}
.folder-input button:first-of-type:hover {
  border: 1px solid rgba(199, 29, 35, 0.8);
  color: rgba(199, 29, 35, 0.8);
}

.folder-input button:last-of-type {
  background: rgba(199, 29, 35, 1);
  color: white;
}
.folder-input button:last-of-type:hover {
  background: rgba(199, 29, 35, 0.8);
}

</style>