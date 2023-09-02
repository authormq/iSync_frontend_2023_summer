<template>
  <!-- 顶部按钮菜单 -->
  <div class="create clearfix" ref="reference">
    <a class="leftfix" v-if="inFolder" @click="inFolder = false; curFolder = null">返回</a>
    <a class="leftfix" v-if="!inFolder" @click="toCreateFolder">新建文件夹</a>
    <a class="leftfix" @click="showDocModal = true">新建文档</a>
    <div class="folder leftfix" v-if="inFolder">
      /{{ curFolder.name }}
    </div>
  </div>
  <div class="list" ref="list">
    <template v-if="!inFolder">
      <!-- 新建文件夹卡片 -->
      <div class="folder-container" style="cursor: default" v-if="isCreatingFolder">
        <!-- 图标 -->
        <div class="folder-icon">
          <svg t="1693469503523" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5772" width="80" height="80"><path d="M912 208H427.872l-50.368-94.176A63.936 63.936 0 0 0 321.056 80H112c-35.296 0-64 28.704-64 64v736c0 35.296 28.704 64 64 64h800c35.296 0 64-28.704 64-64v-608c0-35.296-28.704-64-64-64z m-800-64h209.056l68.448 128H912v97.984c-0.416 0-0.8-0.128-1.216-0.128H113.248c-0.416 0-0.8 0.128-1.248 0.128V144z m0 736v-96l1.248-350.144 798.752 1.216V784h0.064v96H112z" fill="#c71d23" p-id="5773"></path></svg>
        </div>
        <!-- 输入框和按钮 -->
        <div class="folder-input">
          <input type="text" v-model="newFolderName" ref="newFolderInput">
          <button @click="cancleCreating">取消</button>
          <button @click="createFolder">新建</button>
        </div>
      </div>


      <!-- 文件夹列表 -->
      <div 
        style="margin: 5px"
        class="folder-item"
        v-for="(folder, index) in folderList" :key="folder.id" 
        @click="changeToFolder($event, folder)"
        @drop="dropIntoFolder(folder.id); unhighlightFolder(index)"
        @dragover="allowDrop"
        @dragenter="highlightFolder(index)"
        @dragleave="unhighlightFolder(index)"
        @contextmenu.prevent="handleRightClick($event, index)"
      >
        <div class="folder-container" :class="{'folder-highlight': folder.shouldHighlight}">
          <div class="folder-icon">
            <svg t="1693469503523" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5772" width="80" height="80"><path d="M912 208H427.872l-50.368-94.176A63.936 63.936 0 0 0 321.056 80H112c-35.296 0-64 28.704-64 64v736c0 35.296 28.704 64 64 64h800c35.296 0 64-28.704 64-64v-608c0-35.296-28.704-64-64-64z m-800-64h209.056l68.448 128H912v97.984c-0.416 0-0.8-0.128-1.216-0.128H113.248c-0.416 0-0.8 0.128-1.248 0.128V144z m0 736v-96l1.248-350.144 798.752 1.216V784h0.064v96H112z" fill="#c71d23" p-id="5773"></path></svg>
          </div>
          <div class="folder-name" :id="`name${index}`">{{ folder.name }}</div>
          <div class="input-hint" :id="`hint${index}`">敲击回车以确定</div>
          <input type="text" :id="`input${index}`" v-model="newName" @keydown.enter="renameFolder(folder, index)" @blur="recoverFolder(index)">
        </div>
        <div 
          class="menu" 
          v-if="folder.showMenu"
          :style="{ left: x + 'px', top: y + 'px'}"
        >
          <button @click.stop="handleRenameFolder(index)">重命名</button>
          <button @click.stop="doNothing" @dblclick.stop="deleteFolder(folder)" v-tooltip="'文档删除后将无法找回。双击按钮以确认'">删除</button>
        </div>
      </div>


      <!-- 文件列表 -->
      <div 
        style="margin: 5px"
        class="list-item"
        v-for="doc in docList" 
        :key="doc.id" 
        @click="handleDocClick($event, doc)" 
        draggable="true"
        @dragstart="docBeDragged($event, doc.id)"
        @drag="scrollParent"
        @dragend="docEndBeingDragged"
      >
        <DocListItem :doc="doc"/>
      </div>
      

    </template>


    <!-- 文件夹中的文档列表 -->
    <div v-else v-for="doc in folderDocList" :key="doc.id" @click="handleDocClick($event, doc)" >
      <DocListItem :doc="doc" inFolder/>
    </div>
  </div>


  <CreateDocModal :show="showDocModal" :projectId="projectId"  @close="showDocModal = false" :folder="curFolder"/>
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
      curFolder: null,
      newFolderName: '',
      isCreatingFolder: false,

      // 以下是实现文件拖拽进文件夹的变量
      docId: null,
      folderId: null,
      timer: null,
      scrollDis: 0,

      // 右键文件夹
      x: 0,
      y: 0,
      newName: ''
    }
  },
  mounted() {
    this.projectId = this.$route.params.projectId
    this.getFiles()
    this.$bus.on('changeDocIdentityRequest', this.handleChangeDocIdentityRequest)
    this.$bus.on('deleteDocRequest', this.handleDeleteDocRequest)
    this.$bus.on('renameDocRequest', this.handleRenameDocRequest)
    this.$bus.on('reloadDocListAfterCreateSucceed', this.handleReloadDocList)
    this.$bus.on('flushFolder', this.flushFolder)
    document.addEventListener('click', this.hideMenu)
  },
  methods: {
    handleDocClick(e, doc) {
      if (e.target.tagName === 'INPUT') {
        e.target.focus()
      } else {
        this.$router.push(`/doc/${doc.id}`)
      }
    },
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
    getFolderFiles(folder) {
      this.$http.get(`/api/projects/folder/${folder.id}/list/`).then(
        response => {
          this.curFolder = folder
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
    handleReloadDocList() {
      if (this.curFolder) this.getFolderFiles(this.curFolder)
      else this.getFiles()
    },
    handleDeleteDocRequest(doc) {
      this.$http.delete(`/api/projects/file/${doc.id}/delete/`).then(
        response => {
          // this.docList.splice(this.docList.indexOf(doc), 1)
          if (this.curFolder) this.getFolderFiles(this.curFolder)
          else this.getFiles()
        },
        error => {
          console.log(error.message)
        }
      )
    },
    handleRenameDocRequest(docRenameData) {
      this.$http.post(`/api/projects/file/${docRenameData.doc.id}/rename/${docRenameData.rename}/`).then(
        response => {
          if (this.curFolder) this.getFolderFiles(this.curFolder)
          else this.getFiles()
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
      console.log('index', this.docList[this.docList.indexOf(doc)])
      this.$http.post(`/api/projects/file/${doc.id}/is_public/`).then(
        response => {
          if (this.curFolder) this.getFolderFiles(this.curFolder)
          else this.getFiles()
          // this.docList[this.docList.indexOf(doc)].isPublic = !doc.isPublic
        },
        error => {
          console.log(error.message)
        }
      )
    },
    changeToFolder(e, folder) {
      if (e.target.tagName === 'INPUT') {
        // e.target.querySelector('input').focus()
      } else {
        this.getFolderFiles(folder)
      }
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
    },

    flushFolder() {
      if (this.curFolder) this.getFolderFiles(this.curFolder)
      this.getFiles()
    },

    // 以下是实现拖拽文件进文件夹的函数

    // 获取被拖拽的文件的 id
    docBeDragged(e, id) {
      this.docId = id
      const start = e.target.getBoundingClientRect().bottom
      const top = this.$refs.list.getBoundingClientRect().top
      this.scrollDis = (start - top) * 0.05
      const folders = document.getElementsByClassName('folder-item')
      for (let i = 0; i < folders.length; i++) {
        folders[i].classList.add('prevent-bug')
      }
   },
    // 获取文件夹的 id，调用接口，并刷新列表
    dropIntoFolder(id) {
      this.folderId = id
      if (this.docId && this.folderId) {
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }
        let arr = []
        arr.push(this.docId)
        let data = { files: arr }
        // data.append('files', arr)
        this.$http.post(`/api/projects/folder/move_in/${this.folderId}/`, data).then(
          response => {
            this.getFiles()
          },
          error => {
            this.$bus.emit('message', { title: '移动文件失败', content: '', time: 1000 })
          }
        )
      }
    },
    docEndBeingDragged() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      const folders = document.getElementsByClassName('folder-item')
      for (let i = 0; i < folders.length; i++) {
        folders[i].classList.remove('prevent-bug')
      }
    },
    // 阻止默认行为
    allowDrop(e) {
      e.preventDefault()
    },
    // 设置文件夹强调
    highlightFolder(index) {
      if (this.folderList[index].hasSet !== true) {
        this.folderList[index].shouldHighlight = true
        this.folderList[index].hasSet = true
      }
    },
    unhighlightFolder(index) {
      this.folderList[index].shouldHighlight = false
      this.folderList[index].hasSet = false
    },
    scrollParent(e) {
      const y = this.$refs.reference.getBoundingClientRect().bottom
      if (0 < e.clientY - y && e.clientY - y <= 10 && this.$refs.list.scrollTop > 0 && this.timer === null) {
        this.timer = setInterval(() => {
          this.$refs.list.scrollTop -= this.scrollDis
        }, 40)
      }
      if ((e.clientY - y > 30 || this.$refs.list.scrollTop <= 0) && this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },


    // 文件夹右键弹出菜单
    handleRightClick(event, index) {
      this.hideMenu()
      this.folderList[index].showMenu = true
      this.x = event.clientX
      this.y = event.clientY
    },
    hideMenu() {
      for (let i = 0; i < this.folderList.length; i++) {
        if (this.folderList[i].showMenu)
          this.folderList[i].showMenu = false
      }
    },
    doNothing() {},
    handleRenameFolder(index) {
      this.newName = this.folderList[index].name
      const name = document.getElementById(`name${index}`)
      const hint = document.getElementById(`hint${index}`)
      const input = document.getElementById(`input${index}`)
      name.style.display = 'none'
      hint.style.display = 'block'
      input.style.display = 'block'
      input.focus()
      this.folderList[index].showMenu = false
    },
    renameFolder(folder, index) {
      this.$http.post(`/api/projects/folder/${folder.id}/rename/${this.newName}/`).then(
        response => {
          this.recoverFolder(index)
          this.getFiles()
        },
        error => {
          this.$bus.emit('message', { title: '重命名失败', content: '', time: 1000 })
        }
      )
    },
    recoverFolder(index) {
      this.newName = this.folderList[index].name
      const name = document.getElementById(`name${index}`)
      const hint = document.getElementById(`hint${index}`)
      const input = document.getElementById(`input${index}`)
      name.style.display = 'block'
      hint.style.display = 'none'
      input.style.display = 'none'
    },
    deleteFolder(folder) {
      this.$http.delete(`/api/projects/folder/${folder.id}/delete/`).then(
        response => {
          this.getFiles()
        },
        error => {
          this.$bus.emit('message', { title: '删除文件夹失败', content: '', time: 1500 })
        }
      )
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
  display: inline-block !important;
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

.folder-highlight {
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  transform: scale(1.1);
  box-shadow: 0 0 10px grey;
}

.prevent-bug * {
  pointer-events: none;
}

.menu {
  width: 100px;
  /* height: 90px; */
  padding: 10px;
  background: white;
  /* border: 2px solid rgba(199, 29, 35, 1); */
  box-shadow: 1px 1px 10px grey;
  border-radius: 10px;
  position: absolute;
  z-index: 99;
}

.menu button {
  /* display: block;/ */
  width: 100px;
  height: 30px;
  box-shadow: 0px 0px 3px grey;
  background: transparent;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  margin-bottom: 5px;
}

.menu button:last-of-type {
  margin-bottom: 0;
}

.menu button:hover {
  background: rgba(199, 29, 35, 1);
  color: white;
}

.folder-container input {
  display: none;
  width: 140px;
  height: 20px;
  border: 2px solid rgba(199, 29, 35, 1);
  caret-color: rgba(199, 29, 35, 1);
  font-size: 18px;
  padding: 5px;
  border-radius: 5px;
  position: relative;
}

.input-hint {
  display: none;
  /* position: absolute; */
  font-size: 12px;
  /* top: 20px; */
  font-weight: bold;
  color: grey;
}

.list-item {
  height: 120px;
}
</style>