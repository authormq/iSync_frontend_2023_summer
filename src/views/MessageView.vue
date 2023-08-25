<!-- 消息页面 -->
<template>
  <div>This is message Page</div>

</template>

<script>
export default {
  name: 'MessageView',
  data() {
    return {
      message: ''
    }
  },
  methods: {
    
  },
  mounted() {
    console.log('/' !== this.$route.path);
    console.log(this.$route.path);
  }
}
</script>

<style scoped>

</style>