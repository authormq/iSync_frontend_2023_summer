<template>
  <!-- 这是展示的文档卡片 -->
  <div>
    <div class="doc-container">
      <div class="doc-image">
        <svg t="1693141765365" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2289" width="150" height="150"><path d="M543.68 288.64h320v64h-320zM320 512h384v64H320z" fill="#000000" p-id="2290"></path><path d="M543.04 107.2h64v245.44h-64zM320 672h384v64H320z" fill="#000000" p-id="2291"></path><path d="M608 128l192 192v576H224V128z m45.12-45.12L634.56 64H160v896h704V288" fill="#000000" p-id="2292"></path></svg>
      </div>
      <div class="doc-info">
        <div class="doc-name">
          {{ doc.name }}
        </div>
      </div>
    </div>
    <button @click="sendDeleteDocRequest">删除</button>
    <br>
    <input type="text" v-model="rename">
    {{ rename }}
    <button @click="sendRenameDocRequest">重命名</button>
  </div>
</template>


<script>
export default {
  name: 'DocListItem',
  props: ['doc'],
  data() {
    return {
      rename: ''
    }
  },
  methods: {
    sendDeleteDocRequest() {
      this.$bus.emit('deleteDocRequest', this.doc)
    },
    sendRenameDocRequest() {
      this.$bus.emit('renameDocRequest', { doc: this.doc, rename: this.rename })
    }
  }
}
</script>

<style scoped>
.doc-container {
  min-width: 150px;
  height: 230px;
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
  width: 200px;
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