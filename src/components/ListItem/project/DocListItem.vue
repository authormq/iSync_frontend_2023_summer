<template>
  <!-- 这是展示的文档卡片 -->
  <div>
    <div class="doc-container">
      <div class="doc-image">
        <svg t="1693141765365" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="2289" width="150" height="150">
          <path d="M543.68 288.64h320v64h-320zM320 512h384v64H320z" fill="rgba(199, 29, 35, 1)" p-id="2290"></path>
          <path d="M543.04 107.2h64v245.44h-64zM320 672h384v64H320z" fill="rgba(199, 29, 35, 1)
        " p-id="2291"></path>
          <path d="M608 128l192 192v576H224V128z m45.12-45.12L634.56 64H160v896h704V288" fill="rgba(199, 29, 35, 1)"
            p-id="2292"></path>
        </svg>
      </div>
      <div class="doc-info">
        <div class="doc-name">
          {{ doc.name }}
        </div>
        <div>
          {{ doc.isPublic ? '公开' : '私有' }}
        </div>
        <button @click.stop="sendChangeDocIdentityRequest">修改文档权限</button>&nbsp;
        <button @click.stop="shareDocLink">分享链接</button>&nbsp;
        <button @click.stop="sendDeleteDocRequest">删除</button>
        <!-- 暂缺少重命名功能 -->
        <br>
        <!-- <input type="text" v-model="rename">
        {{ rename }} -->
        <button @click.stop="sendRenameDocRequest">重命名, 这里缺少一个输入框</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'DocListItem',
  props: ['doc'],
  data() {
    return {
      rename: '',
      showDocModal: false,
      link: '',
    }
  },
  methods: {
    sendDeleteDocRequest() {
      this.$bus.emit('deleteDocRequest', this.doc)
    },
    sendRenameDocRequest() {
      if (this.rename.trim() == '') {
        this.$bus.emit('message', {
          title: '重命名为空',
          content: '文档名不可为空，请重新填写',
          time: 3000
        })
      } else {
        this.$bus.emit('renameDocRequest', { doc: this.doc, rename: this.rename })
      }
    },
    sendChangeDocIdentityRequest() {
      this.$bus.emit('changeDocIdentityRequest', this.doc)
    },
    shareDocLink() {
      this.$http.get(`/api/projects/${this.doc.id}/generate_invite_url/`).then(
        response => {
          this.link = response.data.url // 
          navigator.clipboard.writeText(this.link)
          this.$bus.emit('message', { title: '分享链接已复制到剪贴板', content: this.link, time: 3000 })
        },
        error => {
          console.log(error.message)
        }
      )
    }
  }
}
</script>

<style scoped>
.doc-container {
  min-width: 120px;
  min-height: 230px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px lightgrey;
  margin: 15px;
  cursor: pointer;

  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.doc-container:hover {
  transform: translate(-2px, -2px) scale(1.02);
  box-shadow: 0 0 5px grey;
}

img {
  display: block;
  margin: 0 auto;
  width: 200px;
  height: 150px;
}

.doc-info {
  min-width: 120px;
  text-align: center;
  margin: 0 auto;
  margin-top: 10px;
}

.doc-info input {
  display: none;
  width: 140px;
  height: 18px;
  border: 2px solid rgba(199, 29, 35, 1);
  caret-color: rgba(199, 29, 35, 1);
  font-size: 18px;
  padding: 5px;
  border-radius: 10px;
}

.doc-name {
  color: rgba(199, 29, 35, 1);
  font-size: 20px;
  font-weight: bold;
  position: relative;
}

.doc-image {
  width: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto
}
</style>