<template>
  <div><img src=""></div>
  <div>{{ name }}</div>
  <div>{{ message }}</div>
  <div>{{ time }}</div>
</template>

<script>
export default {
  name: 'SlideBarItem',
  data() {
    return {
      name: '发件人',
      message: '最新消息',
      time: '时间'
    }
  }
}
</script>

<style scoped>

</style>