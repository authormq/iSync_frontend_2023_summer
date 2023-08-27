<template>
  <div>
    <input type="text" placeholder="输入文档名称" v-model="name">
    {{ name }}
    <br>
    是否公开文档:
    <button v-if="isPublic == 0" @click="isPublic = 1">公开</button>
    <button v-else @click="isPublic = 0">私密</button>
    <div>
      <button @click="commitCreate">确认</button>
      <button @click="cancelCreate">取消</button>
    </div>
    <hr>
  </div>
</template>
<script>
export default {
  name: 'CreateDocModal',
  props: ['projectId'],
  data() {
    return {
      name: '',
      isPublic: 0,
      docId: 0 // 如果创建成功，所返回的 docId
    }
  },
  // mounted() {
  //   this.$bus.emit('sendNewDocId', this.docId)
  // },
  methods: {
    commitCreate() {
      this.$http.post(`/api/projects/file/${this.projectId}/create/${this.name}/${this.isPublic}/`).then(
        response => {
          // 创建成功，直接跳转到新页面
          this.docId = response.data.id
          // 下面需要根据实际情况跳转

          // 清空
          this.isPublic = 0
          this.name = ''
        },
        error => {
          console.log(error.message)
        }
      )
    },
    cancelCreate() {
      this.isPublic = 0
      this.name = ''
    }
  }
}
</script>
<style scoped></style>