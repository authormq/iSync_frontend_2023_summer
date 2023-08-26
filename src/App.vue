<template>
  <!-- <div> -->
    <!-- <TopNav v-if="'/'!==this.$route.path" />  -->
  <!-- </div> -->
  <!-- <RouterView /> -->
  <!-- 消息组件 -->
  <!-- <StylishMessage :show="showMessage" :title="messageTitle" :content="messageContent"/> -->
  <!-- <text-editor/> -->
  <!-- <version-inspector /> -->
  <document></document>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import Document from './components/wheels/Document.vue';
import TopNav from './components/TopNav/TopNav.vue'
import StylishMessage from './components/Stylish/StylishMessage.vue'

let showMessage = ref(false)  // 展示消息
let messageTitle = ref('')    // 消息标题
let messageContent = ref('')  // 消息内容


const instance = getCurrentInstance() // 获取 'vm'
// 绑定全局事件
instance.proxy.$bus.on('message', (data) => {
  messageTitle.value = data.title
  messageContent.value = data.content
  showMessage.value = true
  setTimeout(() => {
    showMessage.value = false
    messageTitle.value = ''
    messageContent.value = ''
  }, data.time)
})

</script>
<style>
:deep(.vac-rooms-container.vac-rooms-container-full)  {
  background: yellow !important;
}
</style>
