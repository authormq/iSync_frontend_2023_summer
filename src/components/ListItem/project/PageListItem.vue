<template>

  <div class="page-container" @contextmenu.prevent="handleClick" ref="container">
    <div class="page-image">
      <svg t="1693143221549" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="5091" width="80" height="80">
        <path
          d="M434.12811 654.18527l-16.884181 16.884181c-4.707105 4.707105-12.279404 4.707105-16.884181 0l-118.496253-118.496253c-4.707105-4.707105-4.707105-12.279404 0-16.884181l118.496253-118.496253c4.707105-4.707105 12.279404-4.707105 16.884181 0l16.884181 16.884181c4.707105 4.707105 4.707105 12.279404 0 16.884181l-93.118817 93.118817 93.118817 93.118817C438.835215 642.008194 438.835215 649.580494 434.12811 654.18527zM473.115219 744.848206l-21.591286-6.037374c-5.935045-1.637254-9.618867-7.572299-8.18627-13.20036l96.188668-369.917058c1.534926-5.730389 7.981613-9.004897 14.325972-7.265314l23.126212 6.242031c6.344359 1.739582 10.335165 7.776956 8.80024 13.507345l-99.258519 369.610073C485.087639 743.313281 479.050265 746.48546 473.115219 744.848206zM749.401819 552.675527l-118.496253 118.496253c-4.707105 4.707105-12.279404 4.707105-16.884181 0l-16.884181-16.884181c-4.707105-4.707105-4.707105-12.279404 0-16.884181l93.118817-93.118817-93.118817-93.118817c-4.707105-4.707105-4.707105-12.279404 0-16.884181l16.884181-16.884181c4.707105-4.707105 12.279404-4.707105 16.884181 0l118.496253 118.496253C754.006595 540.396123 754.006595 547.968422 749.401819 552.675527zM823.794544 919.522734l-628.500849 0 0-814.533826 455.668232 0 0 128.012791c0 16.065554 14.121315 29.061257 31.41481 29.061257L823.794544 262.062956 823.794544 919.522734 823.794544 919.522734zM722.080144 145.203957l59.759768 58.634156-59.759768 0L722.080144 145.203957zM886.624163 231.364445c0-0.102328 0-0.102328 0-0.204657 0-0.61397-0.102328-1.22794-0.204657-1.841911 0-0.102328 0-0.204657 0-0.306985-0.409313-2.865194-1.22794-5.525732-2.455881-7.981613l0 0c-0.61397-1.22794-1.330269-2.455881-2.046567-3.581493-0.102328-0.102328-0.204657-0.204657-0.204657-0.409313-0.306985-0.511642-0.716299-0.920955-1.023284-1.432597-0.102328-0.204657-0.306985-0.306985-0.409313-0.511642-0.306985-0.306985-0.511642-0.61397-0.818627-1.023284-0.204657-0.204657-0.409313-0.511642-0.61397-0.716299-0.204657-0.204657-0.409313-0.409313-0.61397-0.61397-0.204657-0.204657-0.409313-0.409313-0.716299-0.716299l-171.40002-156.767063c-4.809433-4.604777-11.358449-7.674628-18.521435-8.493255 0 0 0 0-0.102328 0-0.716299-0.102328-1.432597-0.102328-2.148896-0.204657-0.204657 0-0.306985 0-0.511642 0-0.306985 0-0.61397 0-1.023284 0l-515.223344 0c-17.293495 0-31.210153 12.995703-31.210153 29.061257l0 872.758669c0 16.065554 14.018987 29.061257 31.210153 29.061257l686.82802 0c17.293495 0 31.210153-12.995703 31.210153-29.061257l0-715.684621C886.624163 232.490057 886.624163 231.876087 886.624163 231.364445z"
          fill="rgba(199, 29, 35, 1)" p-id="5092"></path>
      </svg>
    </div>
    <div class="page-info">
      <div class="page-name" ref="name">
        {{ proto.name }}
      </div>
      <div class="input-hint" ref="hint">敲击回车以确定</div>
      <input type="text" v-model="rename" @keydown.enter="beforeSendRename" @blur="recoverName" ref="nameInput"/>
    </div>
    <!-- <button @click.stop="sendDeleteProtoRequest">删除</button>&nbsp;
    <button @click.stop="sendRenameProtoRequest">重命名,这里还缺少一个输入框</button> -->
  </div>
  <div 
    class="menu" 
    v-if="showContextMenu"
    :style="{ left: x + 'px', top: y + 'px'}"
  >
    <button @click.stop="handleRename">重命名</button>
    <button @click.stop="doNothing" @dblclick.stop="handleDelete" v-tooltip="'页面删除后将无法找回。双击按钮以确认'">删除</button>
  </div>
</template>

<script>
export default {
  name: 'PageListItem',
  props: ['proto'],
  data() {
    return {
      rename: this.proto.name,
      showContextMenu: false,
      x: 0,
      y: 0,
      name: this.proto.name
    }
  },
  mounted() {
    window.addEventListener('click', this.hideMenu)
  },
  beforeUnmount() {
    window.removeEventListener('click', this.hideMenu)
  },
  methods: {
    sendDeleteProtoRequest() {
      this.$bus.emit('deleteProtoRequest', this.proto)
    },
    sendRenameProtoRequest() {
      if (this.rename.trim() == '') {
        this.$bus.emit('message', {
          title: '重命名失败',
          content: '',
          time: 1500
        })
      } else {
        this.$bus.emit('renameProtoRequest', { proto: this.proto, rename: this.rename })
      }
    },
    // 控制右键弹出菜单
    handleClick(event) {
      this.showContextMenu = true
      this.x = event.clientX
      this.y = event.clientY
    },
    // 隐藏菜单
     hideMenu() {
      if (this.showContextMenu) this.showContextMenu = false
    },
    handleRename() {
      const width = this.$refs.name.getBoundingClientRect().width
      this.$refs.name.style.display = 'none'
      this.$refs.nameInput.style.width = width
      this.$refs.nameInput.style.display = 'block'
      this.$refs.hint.style.display = 'block'
      this.$refs.nameInput.focus()
      this.showContextMenu = false
    },
    recoverName() {
      this.rename = this.name
      this.$refs.name.style.display = 'block'
      this.$refs.nameInput.style.display = 'none'
      this.$refs.hint.style.display = 'none'
    },
    beforeSendRename() {
      this.name = this.rename
      this.sendRenameProtoRequest()
      this.recoverName()
    },
    handleDelete() {
      this.sendDeleteProtoRequest()
      this.showContextMenu = false
    }
  }
}
</script>

<style scoped>
.page-container {
  min-width: 120px;
  height: 120px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px lightgrey;
  margin: 15px;
  cursor: pointer;

  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.page-image {
  width: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto
}

.page-container:hover {
  transform: translate(-2px, -2px) scale(1.02);
  box-shadow: 0 0 5px grey;
}

img {
  display: block;
  margin: 0 auto;
  width: 200px;
  height: 150px;
}

.page-info {
  min-width: 120px;
  text-align: center;
  margin: 0 auto;
  margin-top: 10px;
}

.page-info input {
  display: none;
  width: 140px;
  height: 18px;
  border: 2px solid rgba(199, 29, 35, 1);
  caret-color: rgba(199, 29, 35, 1);
  font-size: 18px;
  padding: 5px;
  border-radius: 10px;
}

.page-name {
  color: rgba(199, 29, 35, 1);
  font-size: 20px;
  font-weight: bold;
  position: relative;
}

.menu {
  width: 100px;
  /* height: 90px; */
  padding: 10px;
  background: white;
  /* border: 2px solid rgba(199, 29, 35, 1); */
  box-shadow: 1px 1px 10px grey;
  border-radius: 10px;
  position: absolute;
  z-index: 99;
}

.menu button {
  /* display: block;/ */
  width: 100px;
  height: 30px;
  box-shadow: 0px 0px 3px grey;
  background: transparent;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  margin-bottom: 5px;
}

.menu button:last-of-type {
  margin-bottom: 0;
}

.menu button:hover {
  background: rgba(199, 29, 35, 1);
  color: white;
}

.page-info input {
  display: none;
  width: 140px;
  height: 20px;
  border: 2px solid rgba(199, 29, 35, 1);
  caret-color: rgba(199, 29, 35, 1);
  font-size: 18px;
  padding: 5px;
  border-radius: 5px;
  position: relative;
}
.input-hint {
  display: none;
  position: absolute;
  font-size: 12px;
  top: 85px;
  font-weight: bold;
  color: grey;
}
</style>