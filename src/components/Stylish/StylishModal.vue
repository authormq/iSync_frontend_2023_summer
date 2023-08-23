<template>
  <teleport to="html">
    <div class="stylish-modal-mask" v-if="show">
      <div class="stylish-modal" ref="modal">
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: 'StylishModal',
  props: {
    show: { type: Boolean, default: false },
    width: { type: String, default: '700px' },
    height: { type: String, default: '500px' },
    background: { type: String, default: 'white' },
    padding: { type: String, default: '20px' },
    borderRadius: { type: String, default: '15px' },
    border: { type: String, default: 'none' },
    shadow: { type: String, default: '1px 1px 5px grey' }
  },
  updated() {
    if (this.show) {
      this.$refs.modal.style.width = this.width
      this.$refs.modal.style.height = this.height
      this.$refs.modal.style.background = this.background
      this.$refs.modal.style.padding = this.padding
      this.$refs.modal.style.borderRadius = this.borderRadius
      this.$refs.modal.style.border = this.border
      this.$refs.modal.style.boxShadow = this.shadow
    }
  }
}
</script>

<style>
.stylish-modal-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.stylish-modal {
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

</style>