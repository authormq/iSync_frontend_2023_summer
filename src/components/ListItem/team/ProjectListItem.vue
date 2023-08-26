<template>
  <div class="project-container">
    <img :src="data.image">
    <div class="project-info">
      <div class="project-name">
        {{ data.name }}
      </div>
      <div class="project-creator">
        创建者：{{ data.creator }}
      </div>
      <div class="project-time">
        修改于 {{ data.latestUpdateTime }}
      </div>
    </div>
    <div>
      如果这是展示回收站的列表
      <button @click="sendRestoreRequest">恢复</button>
    </div>
    <button @click="sendRenameRequest">重命名</button>
    <input type="text" v-model="rename">
    {{ rename }}
    <button @click="sendDeleteRequest">删除</button>
  </div>
</template>

<script>
export default {
  name: 'ProjectListItem',
  props: ['data', 'isRestore'],
  data() {
    return {
      rename: ''
    }
  },
  methods: {
    sendRenameRequest() {
      this.$bus.emit('renameRequest', { project: this.data, rename: this.rename})
    },
    sendDeleteRequest() {
      this.$bus.emit('deleteRequest', this.data)
    },
    sendRestoreRequest() {
      this.$bus.emit('restoreRequest', this.data)
    }
  }
}
</script>

<style scoped>
.project-container {
  width: 240px;
  height: 250px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px lightgrey;
  margin: 15px;
  cursor: pointer;

  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.project-container:hover {
  transform: translate(-2px, -2px) scale(1.02);
  box-shadow: 0 0 5px grey;
}

img {
  display: block;
  margin: 0 auto;
  width: 200px;
  height: 150px;
}

.project-info {
  width: 200px;
  margin: 0 auto;
  margin-top: 10px;
}

.project-name {
  font-size: 20px;
  font-weight: bold;
}

.project-creator {
  margin: 5px 0;  
  color: grey
}

.project-time {
  font-size: 14px;
  color: lightgrey;
}
</style>