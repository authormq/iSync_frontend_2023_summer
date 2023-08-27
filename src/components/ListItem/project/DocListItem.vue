<template>
  <!-- 默认状态的文档卡片 -->
  <div class="doc-container">
    <img src="src/assets/avatar.jpeg">
    <div class="doc-info">
      <div class="doc-name">
        文件名
      </div>
      <button @click="sendDeleteRequest">删除</button>
    </div>
  </div>
<!-- 删除状态的项目卡片 -->
<div class="doc-container">
  <img src="src/assets/avatar.jpeg">
  <div class="doc-info">
    <div class="doc-name">
      文件名    
    </div>
    <!-- 恢复删除的接口 -->
    <div class="restore-icon" @click="sendRestoreRequest">
      恢复删除按钮
    </div>
  </div>
</div>
</template>


<script>
export default {
  name: 'DocListItem',
  Data() {
    return {
      name: '文件名'
    }
  },
  methods: {
    sendDeleteRequest() {
      alert('删除')
    },
    sendRestoreRequest() {
      alert('恢复删除')
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