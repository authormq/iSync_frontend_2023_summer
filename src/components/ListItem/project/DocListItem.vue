<template>
  <!-- 这是展示的文档卡片 -->
  <div>
    <div class="doc-container">
      <div>这里放一个文件图标</div>
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
  width: 240px;
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
</style>