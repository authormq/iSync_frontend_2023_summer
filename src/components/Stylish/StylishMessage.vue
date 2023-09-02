<template>
  <teleport to="html">
    <div class="stylish-message" ref="message" v-if="showMessage" :class="{ 'fade-out': !show }">
      <div class="stylish-message-title">{{ title }}</div>
      <div class="stylish-message-content">{{ content }}</div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: 'StylishMessage',
  data() {
    showMessage: false
  },
  props: {
    show: { type: Boolean, default: false },
    title: { type: String, default: '' },
    content: { type: String, default: '' }
  },
  watch: {
    show(value) {
      if (value === false) {
        setTimeout(() => {
          this.showMessage = value
        }, 1000)
      }
      else {
        this.showMessage = value
      }
    }
  }
}
</script>

<style scoped>
.stylish-message {
  max-width: 400px;
  padding: 15px 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 10px grey;
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1001;
}

.stylish-message-title {
  max-width: 360px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: rgba(199, 29, 35, 1);
  padding-bottom: 10px;
}

.stylish-message-content {
  max-width: 360px;
  font-size: 16px;
  text-align: center;
  color: grey;
  word-break: break-all;
}

.fade-out {
  transition: all linear 1s;
  opacity: 0;
}
</style>