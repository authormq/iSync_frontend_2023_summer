<template>
  <!-- 外侧大容器，isHovered 用于判断是否在设置了自动播放的情况下，鼠标悬停时停播 -->
  <div class="stylish-slider-container" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <!-- 轮播图容器，sliderIsHovered 用于判断在设置了左右箭头动态出现的情况下，鼠标悬停时出现 -->
    <div class="stylish-slider" ref="slider" @mouseenter="sliderIsHovered = true" @mouseleave="sliderIsHovered = false">
      <!-- 插槽，建议用 v-for 配合 img 标签插入图片 -->
      <slot></slot>
    </div>
    <!-- 底部点 -->
    <div v-if="showDots" class="stylish-slider-dots" ref="dots">
    </div>
    <!-- 左右箭头 
      由于箭头的 z-index 高于容器 slider，所以在箭头被 hover 时，仍应将“容器被 hover”设置为 true
      箭头被 hover 或 click 时，其背景色会发生变化
    -->
    <template v-if="showArrow">
      <!-- 左箭头 -->
      <div class="stylish-slider-arrow stylish-slider-left-arrow"
        @mouseenter="sliderIsHovered = true; arrowIsHovered = true"
        @mouseleave="arrowIsHovered = false"
        @mousedown="leftArrowIsClicked = true"
        @mouseup="leftArrowIsClicked = false"
        @click="prev"
      >
        <svg t="1691998072343" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1687" :width="arrowSize" :height="arrowSize">
          <path d="M662.613333 278.613333a32 32 0 0 0-42.816-47.445333l-2.432 2.197333-256 256a32 32 0 0 0-2.197333 42.837334l2.197333 2.432 256 256a32 32 0 0 0 47.466667-42.837334l-2.197333-2.432L429.226667 512l233.386666-233.386667z" 
            fill="white" 
            p-id="1688">
          </path>
       </svg>
      </div>
      <!-- 右箭头 -->
      <div class="stylish-slider-arrow stylish-slider-right-arrow"
        @mouseenter="sliderIsHovered = true; arrowIsHovered = true"
        @mouseleave="arrowIsHovered = false"
        @mousedown="rightArrowIsClicked = true"
        @mouseup="rightArrowIsClicked = false"
        @click="next"
      >
        <svg t="1691998390779" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1910" :width="arrowSize" :height="arrowSize">
         <path d="M361.386667 278.613333a32 32 0 0 1 42.816-47.445333l2.432 2.197333 256 256a32 32 0 0 1 2.197333 42.837334l-2.197333 2.432-256 256a32 32 0 0 1-47.466667-42.837334l2.197333-2.432L594.773333 512l-233.386666-233.386667z" 
          fill="white" 
          p-id="1911"></path>
        </svg>
      </div>
    </template>
    <!-- 左右遮罩，用于实现点击左右图片也能切图的效果 -->
    <div class="stylish-slider-mask stylish-slider-left-mask" @click="prev"></div>
    <div class="stylish-slider-mask stylish-slider-right-mask" @click="next"></div>
  </div>
</template>

<script>
export default {
  name: 'StylishSlider',
  props: {
    // 决定是否展示左右图片，为 'single' 时仅展示单张图片
    type: {
      type: String,
      default: 'cascade'
    },
    // 设置自动播放间隔，值为【数值】，必须用 v-bind，单位是毫秒
    autoplay: {
      type: Number,
      default: 0
    },
    // 整体宽度
    width: {
      type: String,
      default: '1000px'
    },
    // 整体高度
    height: {
      type: String,
      default: '500px'
    },
    // 主图宽度
    imgWidth: {
      type: String,
      default: '600px'
    },
    // 主图高度
    imgHeight: {
      type: String,
      default: '400px'
    },
    // 图片圆角
    borderRadius: {
      type: String,
      default: '0'
    },
    // 切换过渡效果
    transition: {
      type: String,
      default: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    // 左右图在横向的收缩比例
    wZoom: {
      type: String,
      default: '0.75'
    },
    // 左右图在纵向的收缩比例
    hZoom: {
      type: String,
      default: '0.75'
    },
    // 左右图相对正中偏移量
    off: {
      type: String,
      default: '250px',
    },
    // 是否展示底部点
    showDots: {
      type: Boolean,
      default: false
    },
    // 底部点的尺寸
    dotSize: {
      type: String,
      default: '10px'
    },
    // 底部点的对齐方式，取值为 'center' / 'left' / 'right'
    dotAlign: {
      type: String,
      default: 'center'
    },
    // 底部点之间的间隔
    dotSpacing: {
      type: String,
      default: '5px'
    },
    // 底部点距离容器底部的距离
    dotDistance: {
      type: String,
      default: '60px',
    },
    // 底部点默认颜色
    dotColor: {
      type: String,
      default: 'grey'
    },
    // 底部点被选中时的颜色
    dotColorActive: {
      type: String,
      default: 'white'
    },
    // 是否展示左右箭头
    showArrow: {
      type: Boolean,
      default: false
    },
    // 仅当被 hover 时，动态展示左右箭头
    showOnHover: {
      type: Boolean,
      default: false
    },
    // 左右箭头在被悬浮时是否展示动态效果
    arrowAnimate: {
      type: Boolean,
      default: true
    },
    // 左右箭头的尺寸
    arrowSize: {
      type: String,
      default: '40px'
    }
  },
  watch: {
    // 整体被 hover 时，如果有设置自动播放的间隔
    isHovered(newValue) {
      if (this.autoplay > 0) {
        if (newValue) {
          // 如果正被 hover 则取消 timer
          clearInterval(this.timer)
        } else {
          // 如果 hover 结束则重启 timer
          this.timer = setInterval(this.next, this.autoplay)
        }
      }
    },
    // 内容区 slider 被 hover 时
    sliderIsHovered(newValue) {
      // 如果设置了仅 hover 才展示左右箭头
      if (this.showArrow && this.showOnHover) {
        if (newValue) {
          // 如果正被 hover 则展示（将不透明度调成 1），由于已经设置了 transition，所以变化比较自然
          document.documentElement.style.setProperty('--stylish-slider-arrow-opacity', 1)
        } else {
          // 如果 hover 结束则重置为 0
          document.documentElement.style.setProperty('--stylish-slider-arrow-opacity', 0)
        }
      }
      
    },
    /* 
      由于图片的颜色时无法确定的，因此选择了箭头白色，其背景深灰色的配置
      当箭头被悬浮或点击时，其背景不透明度减小
    */
    // 左右箭头被 hover 时
    arrowIsHovered(newValue) {
      // 如果设置了箭头 hover 动态效果
      if (this.showArrow && this.arrowAnimate) {
        if (newValue) {
          // 如果正被 hover，背景不透明度降低
          document.documentElement.style.setProperty('--stylish-slider-larrow-bgcolor', 'rgba(199,29,35, 0.7)')
          document.documentElement.style.setProperty('--stylish-slider-rarrow-bgcolor', 'rgba(199,29,35, 0.7)')
        } else {
          // 如果 hover 结束，背景不透明度提高
          document.documentElement.style.setProperty('--stylish-slider-larrow-bgcolor', 'rgba(199,29,35, 0.9)')
          document.documentElement.style.setProperty('--stylish-slider-rarrow-bgcolor', 'rgba(199,29,35, 0.9)')
        }
      }
    },
    /* 
      左右箭头各自被点击时应当各自变化而非一起变化
      所以下面分写了两个回调
    */
    // 左箭头被点击时
    leftArrowIsClicked(newValue) {
      if (this.showArrow && this.arrowAnimate) {
        if (newValue) {
          document.documentElement.style.setProperty('--stylish-slider-larrow-bgcolor', 'rgba(199,29,35, 0.5)')
        } else {
          document.documentElement.style.setProperty('--stylish-slider-larrow-bgcolor', 'rgba(199,29,35, 0.5)')
        }
      }
    },
    // 右箭头被点击时
    rightArrowIsClicked(newValue) {
      if (this.showArrow && this.arrowAnimate) {
        if (newValue) {
          document.documentElement.style.setProperty('--stylish-slider-rarrow-bgcolor', 'rgba(199,29,35, 0.5)')
        } else {
          document.documentElement.style.setProperty('--stylish-slider-rarrow-bgcolor', 'rgba(199,29,35, 0.5)')
        }
      }
    }
  },
  data() {
    return {
      dotsDiv: {},                  // 底部点的容器
      slider: {},                   // 轮播图容器
      current: 0,                   // 当前图片之下标
      count: 0,                     // 图片总数
      isHovered: false,             // 整体是否被 hover
      sliderIsHovered: false,       // 轮播图是否被 hover
      arrowIsHovered: false,        // 箭头是否被 hover
      leftArrowIsClicked: false,    // 左侧箭头是否被 click
      rightArrowIsClicked: false    // 右侧箭头是否被 click
    }
  },
  mounted() {
    this.configSettings()

    this.slider = this.$refs.slider
    this.count = this.slider.children.length

    if (this.showDots) {
      this.dotsDiv = this.$refs.dots
      // 根据图片数量生成底部点
      for (let i = 0; i < this.count; i++) {
        const dot = document.createElement('div')
        dot.className = 'stylish-slider-dot'
        dot.id = 'bottomDots_' + i
        // 为每个点添加点击事件
        dot.addEventListener('click', (event) => {
          const match = event.target.id.match(/\d+/)
          if (match) {
          this.current = parseInt(match[0])
            this.change()
          }
        })
        // 将每个点添加到 DOM 中
        this.dotsDiv.appendChild(dot)
      }
    }
    
    // 主动调用切换函数，开始展示下标为 0 的图
    this.change()
    if (this.autoplay > 0) {
      this.timer = setInterval(this.next, this.autoplay)
    }
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
  methods: {
    configSettings() {
      document.documentElement.style.setProperty('--stylish-slider-width', this.width)
      document.documentElement.style.setProperty('--stylish-slider-height', this.height)
      document.documentElement.style.setProperty('--stylish-slider-image-width', this.imgWidth)
      document.documentElement.style.setProperty('--stylish-slider-image-height', this.imgHeight)
      document.documentElement.style.setProperty('--stylish-slider-border-radius', this.borderRadius)
      document.documentElement.style.setProperty('--stylish-slider-transition', this.transition)
      document.documentElement.style.setProperty('--stylish-slider-image-width-zoom', this.wZoom)
      document.documentElement.style.setProperty('--stylish-slider-image-height-zoom', this.hZoom)
      
      // 如果选择了 single 类型，应只展示一张图片，所以设置左右图片距离水平中轴的偏移量为 0
      // 由于主图的 z-index 大于左右图片，所以就实现了仅展示一张图片的效果
      if (this.type === 'single') {
        document.documentElement.style.setProperty('--stylish-slider-image-offset', '0')
      } else {
        document.documentElement.style.setProperty('--stylish-slider-image-offset', this.off)
      }
      
      document.documentElement.style.setProperty('--stylish-slider-bottom-dots-size', this.dotSize)
      document.documentElement.style.setProperty('--stylish-slider-bottom-dots-align', this.dotAlign)

      // 底部点的容器（即 dotsDiv）宽度充满整个主图，采用了 flex 布局
      // 因此对于用户的 left / right 输入，应转换成 flex 主轴对齐方式 justify-content 的取值
      if (this.dotAlign === 'left') {
        document.documentElement.style.setProperty('--stylish-slider-bottom-dots-align', 'flex-start')
      } else if (this.dotAlign === 'right') {
        document.documentElement.style.setProperty('--stylish-slider-bottom-dots-align', 'flex-end')
      } else {
        document.documentElement.style.setProperty('--stylish-slider-bottom-dots-align', this.dotAlign)
      }

      document.documentElement.style.setProperty('--stylish-slider-bottom-dots-spacing', this.dotSpacing)
      document.documentElement.style.setProperty('--stylish-slider-bottom-dots-distance', this.dotDistance)
      document.documentElement.style.setProperty('--stylish-slider-bottom-dots-color', this.dotColor)
      document.documentElement.style.setProperty('--stylish-slider-bottom-dots-color-active', this.dotColorActive) 
      
      // 是否仅在 hover 时展示左右箭头
      if (this.showOnHover) {
        document.documentElement.style.setProperty('--stylish-slider-arrow-opacity', 0)
      } else {
        document.documentElement.style.setProperty('--stylish-slider-arrow-opacity', 1)
      }

      document.documentElement.style.setProperty('--stylish-slider-arrow-size', this.arrowSize)
    },
    change() {
      // 获取当前图片左右侧图片的下标
      const left = (this.current - 1 + this.count) % this.count
      const right = (this.current + 1) % this.count

      // 遍历图片数组，为每张图添加默认的 stylish-slider-item 类名
      Array.from(this.slider.children).forEach((element) => {
        element.className = 'stylish-slider-item'
      })

      if (this.showDots) {
        // 遍历底部点数组，为每个点添加默认的 dot 类名
        Array.from(this.dotsDiv.children).forEach((element) => {
          element.className = 'stylish-slider-dot'
        })
      // 设置当前图片对应的底部点为激活状态
      this.dotsDiv.children[this.current].className = 'stylish-slider-dot stylish-slider-dot-active'
      }

      // 设置当前图片的样式
      this.slider.children[this.current].className = 'stylish-slider-item stylish-slider-center'
      
      // 设置左右侧图片的样式
      setTimeout(() => {
        this.slider.children[left].className = 'stylish-slider-item stylish-slider-left'
        this.slider.children[right].className = 'stylish-slider-item stylish-slider-right'
      }, 100);
    },
    next() {
      // 向后切图
      this.current = (this.current + 1) % this.count
      this.change()
    },
    prev() {
      // 向前切图
      this.current = (this.current + this.count - 1) % this.count
      this.change()
    },
  }
}
</script>

<style>
:root {
  --stylish-slider-width: 1000px;
  --stylish-slider-height: 500px;
  --stylish-slider-image-width: 600px;
  --stylish-slider-image-height: 400px;
  --stylish-slider-border-radius: 0px;
  --stylish-slider-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --stylish-slider-image-width-zoom: 0.75;
  --stylish-slider-image-height-zoom: 0.75;
  --stylish-slider-image-offset: 250px;
  --stylish-slider-bottom-dots-size: 10px;
  --stylish-slider-bottom-dots-align: center;
  --stylish-slider-bottom-dots-spacing: 5px;
  --stylish-slider-bottom-dots-distance: 60px;
  --stylish-slider-bottom-dots-color: grey;
  --stylish-slider-bottom-dots-color-active: white;
  --stylish-slider-arrow-opacity: 1;
  --stylish-slider-arrow-size: 40px;
  --stylish-slider-larrow-bgcolor: rgba(199,29,35, 0.9);
  --stylish-slider-rarrow-bgcolor: rgba(199,29,35, 0.9);
}

/* 整体容器设置，采用 flex 完全居中布局 */
.stylish-slider-container {
  width: var(--stylish-slider-width);
  height: var(--stylish-slider-height);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
/* 左右箭头通用设置 */
.stylish-slider-arrow {
  /* 注意：arrow-size 是箭头 icon 的大小，容器宽高是其 1.25 倍 */
  width: calc(var(--stylish-slider-arrow-size) * 1.25);
  height: calc(var(--stylish-slider-arrow-size) * 1.25);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  /* 实现垂直方向居中，取 50% 父元素高度再减去自身高度的一半 */
  top: calc(50% - 0.5 * (var(--stylish-slider-arrow-size) * 1.25));
  z-index: 4;
  cursor: pointer;
  transition: all 0.2s linear;
  opacity: var(--stylish-slider-arrow-opacity);
}
/* 左侧箭头 */
.stylish-slider-left-arrow {
  /* 距离中心线往左半个主图宽度的位置，自带了 5px 边距 */
  left: calc(50% - 0.5 * var(--stylish-slider-image-width) + 5px);
  background-color: var(--stylish-slider-larrow-bgcolor);
}
/* 右侧箭头 */
.stylish-slider-right-arrow {
  /* 距离中心线往右半个主图宽度的位置，自带了 5px 边距 */
  right: calc(50% - 0.5 * var(--stylish-slider-image-width) + 5px);
  background-color: var(--stylish-slider-rarrow-bgcolor);
}
/* 左右遮罩通用设置 */
.stylish-slider-mask {
  /* 大小和左右图片一致 */
  width: calc(var(--stylish-slider-image-width) * var(--stylish-slider-image-width-zoom));
  height: calc(var(--stylish-slider-image-height) * var(--stylish-slider-image-height-zoom));
  position: absolute;
  z-index: 2; /* 介于左右图片和主图之间 */
  background-color: transparent;
  cursor: pointer;
}
/* 左侧遮罩 */
.stylish-slider-left-mask {
  /* 向左位移 */
  transform: translateX(calc(-1 * var(--stylish-slider-image-offset)));
  
}
/* 右侧遮罩 */
.stylish-slider-right-mask {
  /* 向右位移 */
  transform: translateX(var(--stylish-slider-image-offset));
}
/* 内容区容器 */
.stylish-slider {
  /* 宽高和整体容器保持一致 */
  /* flex 居中布局 */
  width: var(--stylish-slider-width);
  height: var(--stylish-slider-height);
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 轮播图项目 */
.stylish-slider-item {
  display: block;
  /* 宽高进行了对应比例的收缩 */
  width: calc(var(--stylish-slider-image-width) * var(--stylish-slider-image-width-zoom));
  height: calc(var(--stylish-slider-image-height) * var(--stylish-slider-image-height-zoom));
  position: absolute;
  overflow: hidden;
  border-radius: var(--stylish-slider-border-radius);
  z-index: 0;
  transition: var(--stylish-slider-transition);
}
/* 轮播图中心项目 */
.stylish-slider-item.stylish-slider-center {
  width: var(--stylish-slider-image-width);
  height: var(--stylish-slider-image-height);
  z-index: 3;
}
/* 轮播图左侧项目 */
.stylish-slider-item.stylish-slider-left {
  /* 向左位移 */
  transform: translateX(calc(-1 * var(--stylish-slider-image-offset)));
  z-index: 1;
}
/* 轮播图右侧项目 */
.stylish-slider-item.stylish-slider-right {
  /* 向右位移 */
  transform: translateX(var(--stylish-slider-image-offset));
  z-index: 1;
}
/* 底部点的容器 */
.stylish-slider-dots {
  /* 注意此处宽度计算，width 是内容区大小，padding 不算在里面*/
  width: calc(var(--stylish-slider-image-width) - 20px);
  padding: 0 10px; /* 两个值写法：上下 左右 */
  position: absolute;
  bottom: var(--stylish-slider-bottom-dots-distance);
  z-index: 4;
  display: flex;
  justify-content: var(--stylish-slider-bottom-dots-align);
}
/* 底部点 */
.stylish-slider-dot {
  width: var(--stylish-slider-bottom-dots-size);
  height: var(--stylish-slider-bottom-dots-size);
  background-color: var(--stylish-slider-bottom-dots-color);
  display: inline-block;
  border-radius: 50%;
  margin-right: var(--stylish-slider-bottom-dots-spacing);
  cursor: pointer;
}
/* 选中的底部点 */
.stylish-slider-dot.stylish-slider-dot-active {
  background-color: var(--stylish-slider-bottom-dots-color-active);
}
</style>