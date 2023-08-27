<template>
<!-- 默认状态的项目卡片 -->
  <div class="project-container" @contextmenu.prevent="handleClick" ref="container" v-if="type === 'normal'">
    <img :src="data.image">
    <div class="project-info">
      <div class="project-name" ref="name">
        {{ nameOnDisplay }}
      </div>
      <!-- 如果处于 renaming 状态，显示输入框、确认、取消按钮 -->
      <template v-if="renaming">
        <input type="text" ref="nameInput" v-model="name">
        <div class="check-icon" @click="cancelRename"><CrossIcon size="15px"/></div>
        <div class="check-icon" @click="updateRename"><CheckIcon size="15px"/></div>
      </template>
      <div class="project-creator">
        创建者：{{ data.creator }}
      </div>
      <div class="project-time">
        修改于 {{ data.latestUpdateTime }}
      </div>
    </div>
  </div>

<!-- 删除状态的项目卡片 -->
  <div class="project-container" v-else ref="deleted">
    <img :src="data.image">
    <div class="project-info">
      <div class="project-name">
        {{ nameOnDisplay }}
        <!-- 恢复删除的接口 -->
        <div class="restore-icon" @click="sendRestoreRequest">
          <RestoreIcon />
        </div>
      </div>
      <div class="project-creator">
        创建者：{{ data.creator }}
      </div>
      <!-- 和后端约定：被删除卡片的 latestUpdateTime 指的是删除时间 -->
      <div class="project-time">
        删除于 {{ data.latestUpdateTime }}
      </div>
    </div>
  </div>

<!-- 默认状态项目卡片之右键弹窗，只能放在 DOM 的这个位置，不要动 -->
  <div 
      class="menu" 
      v-if="type ==='normal' && showContextMenu && !renaming"
      :style="{ left: x + 'px', top: y + 'px'}"
    >
      <button @click="handleRename">重命名</button>
      <button @click="sendDeleteRequest">删除</button>
  </div>
</template>

<script>
import CheckIcon from '../../Svg/CheckIcon.vue'
import CrossIcon from '../../Svg/CrossIcon.vue'
import RestoreIcon from '../../Svg/RestoreIcon.vue'
export default {
  name: 'ProjectListItem',
  components: { CheckIcon, CrossIcon, RestoreIcon },
  props: {
    data: {
      type: Object
    },
    type: {
      type: String,
      default: 'normal'
    }
  },
  data() {
    return {
      // rename: '',
      showContextMenu: false,
      x: 0,   // 弹窗相对浏览器左上角的横坐标
      y: 0,   // 弹窗相对浏览器左上角的纵坐标
      renaming: false, // 是否进入重命名状态

      /* =========================
      
      写接口前看此处逻辑：nameOnDisplay 是用插值语法展示的数据，name 则是绑定在 input 上 (当然未处于重命名状态是隐藏的) 的数据
      如果重命名后点击叉叉取消，nameOndisplay 不变，name 恢复成 nameOndisplay 的值
      如果重命名后点击打勾去人，nameOnDisplay 改为 name 的值，将 name 提交给后端
      
      ========================= */
      nameOnDisplay: this.data.name, // 展示的名字
      name: this.data.name // 绑定 input 的数据
    }
  },
  mounted() {
    window.addEventListener('click', this.hideMenu)
    if (this.type !== 'normal') {
      this.$nextTick(() => {
        this.$refs.deleted.style.cursor = 'default'
      })
    }
  },
  methods: {
    sendRenameRequest() {
      this.$bus.emit('renameRequest', { project: this.data, rename: this.name })
    },
    sendDeleteRequest() {
      this.$bus.emit('deleteRequest', this.data)
    },
    sendRestoreRequest() {
      this.$bus.emit('restoreRequest', this.data)
    },
    // 控制右键弹出菜单
    handleClick(event) {
      this.showContextMenu = true
      this.x = event.clientX
      this.y = event.clientY
    },
    hideMenu() {
      if (this.showContextMenu) this.showContextMenu = false
    },
    // 点击重命名的 UI 响应
    handleRename() {
      this.renaming = true
      this.$refs.container.style.cursor = 'default'
      this.$nextTick(() => {
        this.$refs.name.style.display = 'none'
        this.$refs.nameInput.style.display = 'inline-block'
        this.$refs.nameInput.focus()
      })
    },
    // 取消重命名的 UI 响应
    cancelRename() {
      this.renaming = false
      this.name = this.nameOnDisplay
      this.$refs.name.style.display = 'block'
      this.$refs.container.style.cursor = 'pointer'
    },
    // 提交重命名的 UI 响应和 接口（未写）
    updateRename() {
      this.renaming = false
      this.nameOnDisplay = this.name
      this.$refs.name.style.display = 'block'
      this.$refs.container.style.cursor = 'pointer'
      this.sendRenameRequest()
    },
  }
}
</script>

<style scoped>
.project-container {
  width: 240px;
  height: 230px;
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

.project-info input {
  display: none;
  width: 140px;
  height: 18px;
  border: 2px solid rgba(199, 29, 35, 1);
  caret-color: rgba(199, 29, 35, 1);
  font-size: 18px;
  padding: 5px;
  border-radius: 10px;
}

.project-name {
  color: rgba(199, 29, 35, 1);
  font-size: 20px;
  font-weight: bold;
  position: relative;
}

.project-creator {
  color: grey
}

.project-time {
  font-size: 14px;
  color: lightgrey;
}

.menu {
  width: 80px;
  height: 90px;
  padding: 10px;
  background: white;
  /* border: 2px solid rgba(199, 29, 35, 1); */
  box-shadow: 1px 1px 10px grey;
  border-radius: 5px;
  position: absolute;
}

.menu button {
  display: block;
  width: 80px;
  height: 40px;
  box-shadow: 0px 0px 3px grey;
  background: transparent;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.menu button:hover {
  background: rgba(199, 29, 35, 1);
  color: white;
}

.menu button:first-child {
  margin-bottom: 10px;
}

.check-icon {
  display: inline-block;
  margin-left: 8px;
}

.restore-icon {
  position: absolute;
  right: 0;
  top: 0;
}
</style>