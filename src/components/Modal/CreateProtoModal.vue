<template>
  <div>
    <input type="text" placeholder="输入原型设计名称" v-model="name">
    {{ name }}
    <br>
    <div>
      <button @click="commitCreate">确认</button>
      <button @click="cancelCreate">取消</button>
    </div>
    <hr>
  </div>
</template>
<script>
export default {
  name: 'CreateProtoModal',
  props: ['projectId'],
  data() {
    return {
      name: '',
      protoId: 0 // 如果创建成功，所返回的 protoId
    }
  },
  // mounted() {
  //   this.$bus.emit('sendNewProtoId', this.protoId)
  // },
  methods: {
    commitCreate() {
      let formData = new FormData()
      formData.append('project', this.projectId)
      formData.append('name', this.name)
      this.$http.post(`/api/projects/page/create/`, formData).then(
        response => {
          // 创建成功，直接跳转到新页面
          this.protoId = response.data.id
          // 下面需要根据实际情况跳转
          
          // 清空
          this.name = ''
        },
        error => {
          console.log(error.message)
        }
      )
    },
    cancelCreate() {
      this.name = ''
    }
  }
}
</script>
<style scoped></style>