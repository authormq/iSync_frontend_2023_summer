<template>
  <div @click="handleChangeStatus">
    <div>
      {{ msg.timeStamp }}
    </div>
    <div>
      {{ msg.sender }}, {{ msg.receiver }}
    </div>
    <div>
      {{ msg.content }}
    </div>
    <div>
      {{ msg.isRead }}
    </div>
    <br>
  </div>
</template>

<script>
export default {
  name: 'MessageItem',
  props: ['msg'],
  methods: {
    handleChangeStatus() {
      this.$bus.emit('sendChangeStatusSignal', this.msg)
    }
  },
}
</script>

<style scoped>

</style>