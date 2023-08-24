<template>
  <!-- 外部容器 -->
  <div class="stylish-input-container" ref="container">
    <!-- 前缀插槽 -->
    <!-- <span class="stylish-input-prefix"><slot name="prefix"></slot></span> -->
    <!-- 输入框 -->
    <input ref="input" class="stylish-input" :type="type" :value="value" 
      :placeholder="placeholder" @input="change" 
      @focus="isFocused = true" @blur="handleBlur" 
      :autocomplete="autocomplete"
    >
    <div>
      <slot name="hint"></slot>
    </div>
    <!-- 后缀插槽 -->
    <span class="stylish-input-suffix">
      <slot name="suffix">
        <!-- 计数器 -->
        <span v-show="showCount && maxcnt !== undefined && value.length > 0 && isFocused" class="stylish-input-count">
          {{ cnt }}/{{ maxcnt }}
        </span>
        <!-- 清除图标 -->
        <svg v-show="clearable && value.length > 0 && isFocused"
          t="1692088279410" class="stylish-input-clear-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1051" 
          :width="clearIconSize" :height="clearIconSize"  @click="handleClear"
        >
          <path :fill="clearIconColor" d="M512.2752 64.1856c248.7744 0.672 448.6464 201.3248 447.968 449.7088-0.6784 247.4112-202.3168 447.2064-450.4256 446.2912-246.208-0.9088-446.3168-202.6176-445.6384-448.5824 0.6848-247.5456 201.152-447.4176 448.096-447.4176z m383.9744 447.9104c-0.0192-211.9104-171.5968-383.552-383.7696-383.9104-211.5264-0.3584-384.192 171.8144-384.2368 383.1296-0.0384 212.8896 171.6992 384.9792 384.096 384.8768 212.1216-0.1088 383.9296-172 383.9104-384.096z" p-id="1052">
          </path>
          <path :fill="clearIconColor" d="M557.0304 511.8592c1.5616 1.3056 2.6112 2.0608 3.5136 2.9632 43.8976 43.8784 87.8016 87.7632 131.6672 131.6736 11.9168 11.9232 13.44 29.4912 3.8208 42.5408-11.936 16.1856-34.816 17.7792-49.2992 3.3216-34.2656-34.208-68.4864-68.4672-102.72-102.7072-10.6304-10.6304-21.248-21.2672-32.6336-32.6656-0.7936 1.1904-1.344 2.4064-2.2272 3.2832-43.8656 43.9168-87.7504 87.808-131.6544 131.6928-10.6816 10.6752-25.376 13.2864-38.1568 6.8608-19.1552-9.6256-23.7632-34.9184-9.2416-50.7776 0.9344-1.024 1.9328-1.984 2.912-2.9696 43.4368-43.4432 86.8736-86.88 130.3232-130.304 0.9024-0.9024 1.9776-1.6256 3.8336-3.1296-1.6064-1.0944-2.7968-1.6704-3.68-2.5536-43.9872-43.9424-87.9616-87.904-131.904-131.8848-11.7184-11.7312-13.3888-29.0304-4.1728-42.0288 11.5392-16.2816 34.5728-18.4256 48.992-4.4736 6.592 6.3744 12.992 12.9472 19.4752 19.4368C433.5872 387.84 471.296 425.5488 508.992 463.264c0.9024 0.9024 1.6384 1.9712 3.2 3.8848 1.056-1.6 1.6064-2.8096 2.4832-3.6864 43.8656-43.9168 87.7504-87.8144 131.648-131.6928 10.3744-10.368 24.4096-13.152 36.992-7.4432 20.0448 9.1008 25.3248 34.976 10.4512 51.3088-1.1456 1.2608-2.3808 2.4448-3.5904 3.648a495198.912 495198.912 0 0 1-129.6512 129.6384c-0.896 0.9024-1.952 1.6512-3.4944 2.9376z" p-id="1053">
          </path>
        </svg>
      </slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'StylishInput',
  data() {
    return {
      isFocused: false
    }
  },
  props: {
    // 输入框类型
    type: { type: String, default: 'text' },
    // 输入的值
    value: { type: String, required: true },
    // 占位符
    placeholder: { type: String, default: '' },
    // 自动获取焦点
    autofocus: { type: Boolean, default: false },
    // 自动补全
    autocomplete: { type: Boolean, default: false},
    // 是否开启动态效果
    // animate: { type: Boolean, default: false },
    // 是否展示清除按钮
    clearable: { type: Boolean, default: false },
    // 清除按钮的颜色
    clearIconColor: { type: String, default: 'rgba(60, 60, 60, 0.2)' },
    // 清除按钮的尺寸
    clearIconSize: { type: String, default: '25px' },
    // 是否展示计数器
    showCount: { type: Boolean, default: false },
    // 最多允许输入的字符数（包含）
    maxcnt: { type: Number, default: undefined },
    // 底部间隔
    spacing: { type: String, default: '0' },

    /* 当 type 为 number 时 */
    max: { type: String, default: undefined },
    min: { type: String, default: undefined },
    step: { type: String, default: undefined },
    

    // basicStyles: { type: Object, default: undefined },
    // fontStyles: { type: Object, default: undefined },
    animationStyles: { type: Object, default: undefined },
    placeholderStyles: { type: Object, default: undefined },
    // affixStyles: { type: Object, default: undefined },
    // prefixStyles: { type: Object, default: undefined },
    // suffixStyles: { type: Object, default: undefined },
    countStyles: { type: Object, default: undefined }
  },
  watch: {
    // animate() {
    //   this.configAnimation()
    // },
    // basicStyles: {
    //   deep: true,
    //   handler() {
    //     this.configBasic()
    //   }
    // },
    // fontStyles: {
    //   deep: true,
    //   handler() {
    //     this.configFont()
    //   }
    // },
    // animationStyles: {
    //   deep: true,
    //   handler() {
    //     this.configAnimation()
    //   }
    // },
    placeholderStyles: {
      deep: true,
      handler() {
        this.configPlaceholder()
      }
    },
    // affixStyles: {
    //   deep: true,
    //   handler() {
    //     this.configAffix()
    //   }
    // },
    // prefixStyles: {
    //   deep: true,
    //   handler() {
    //     this.configPrefix()
    //   }
    // },
    // suffixStyles: {
    //   deep: true,
    //   handler() {
    //     this.configSuffix()
    //   }
    // },
    countStyles: {
      deep: true,
      handler() {
        this.configCount()
      }
    }
  },
  mounted() {
    // this.configBasic()
    // this.configFont()
    // this.configAnimation()
    this.configPlaceholder()
    // this.configAffix()
    // this.configPrefix()
    // this.configSuffix()
    this.configCount()

    this.$refs.container.style.marginBottom = this.spacing

    if (this.type === 'number') {
      if (this.max) this.$refs.input.max = this.max
      if (this.min) this.$refs.input.min = this.min
      if (this.step) this.$refs.input.step = this.step
    }
    if (this.autofocus) {
      this.$refs.input.focus()
    }
  },
  methods: {
    change(event) {
      if (event.target.value.length > 0) {
        this.isFocused = true
      }
      if (this.showCount && event.target.value.length > this.maxcnt) {
        event.target.value = event.target.value.substring(0, this.maxcnt)
        this.$emit('update:value', event.target.value.substring(0, this.maxcnt))
      } else {
        this.$emit('update:value', event.target.value)
      }
    },
    // configBasic() {
    //   if (this.basicStyles) {
    //     if (this.basicStyles.width) 
    //       document.documentElement.style.setProperty('--stylish-input-width', this.basicStyles.width)
    //     if (this.basicStyles.height) 
    //       document.documentElement.style.setProperty('--stylish-input-height', this.basicStyles.height)
    //     if (this.basicStyles.border) 
    //       document.documentElement.style.setProperty('--stylish-input-border', this.basicStyles.border)
    //     if (this.basicStyles.borderRadius) 
    //       document.documentElement.style.setProperty('--stylish-input-border-radius', this.basicStyles.borderRadius)
    //     if (this.basicStyles.paddingLeft) 
    //       document.documentElement.style.setProperty('--stylish-input-padding-left', this.basicStyles.paddingLeft)
    //     // 【注意】如果用户开启了一键清除或字数统计，必须主动设置 padding-right，否则文字可能会被覆盖！
    //     if (this.basicStyles.paddingRight)
    //       document.documentElement.style.setProperty('--stylish-input-padding-right', this.basicStyles.paddingRight)
    //     if (this.basicStyles.bgcolor) 
    //       document.documentElement.style.setProperty('--stylish-input-bgcolor', this.basicStyles.bgcolor)
    //     if (this.basicStyles.caretColor) 
    //       document.documentElement.style.setProperty('--stylish-input-caret-color', this.basicStyles.caretColor)
    //   }
    // },
    // configFont() {
    //   if (this.fontStyles) {
    //     if (this.fontStyles.size)
    //       document.documentElement.style.setProperty('--stylish-input-font-size', this.fontStyles.size)
    //     if (this.fontStyles.weight)
    //       document.documentElement.style.setProperty('--stylish-input-font-weight', this.fontStyles.weight)
    //     if (this.fontStyles.color)
    //       document.documentElement.style.setProperty('--stylish-input-color', this.fontStyles.color)
    //     if (this.fontStyles.style)
    //       document.documentElement.style.setProperty('--stylish-input-font-style', this.fontStyles.style)
    //     if (this.fontStyles.family)
    //       document.documentElement.style.setProperty('--stylish-input-font-family', this.fontStyles.family)
    //   }
    // },
    // configAnimation() {
    //   if (this.animate) {
    //     if (this.animationStyles) {
    //       if (this.animationStyles.transition) {
    //         document.documentElement.style.setProperty('--stylish-input-transition', this.animationStyles.transition)
    //       }
    //       if (this.animationStyles.hover) {
    //         if (this.animationStyles.hover.outline)
    //           document.documentElement.style.setProperty('--stylish-input-hover-outline', this.animationStyles.hover.outline)
    //         if (this.animationStyles.hover.border)
    //           document.documentElement.style.setProperty('--stylish-input-hover-border', this.animationStyles.hover.border)
    //         if (this.animationStyles.hover.shadow)
    //           document.documentElement.style.setProperty('--stylish-input-hover-box-shadow', this.animationStyles.hover.shadow)
    //       }
    //       if (this.animationStyles.focus) {
    //         if (this.animationStyles.focus.outline)
    //           document.documentElement.style.setProperty('--stylish-input-focus-outline', this.animationStyles.focus.outline)
    //         if (this.animationStyles.focus.border)
    //           document.documentElement.style.setProperty('--stylish-input-focus-border', this.animationStyles.focus.border)
    //         if (this.animationStyles.focus.shadow)
    //           document.documentElement.style.setProperty('--stylish-input-focus-box-shadow', this.animationStyles.focus.shadow)
    //       }
    //     }
    //   } else {
    //     document.documentElement.style.setProperty('--stylish-input-transition', 'none')
    //     document.documentElement.style.setProperty('--stylish-input-hover-outline', 'none')
    //     document.documentElement.style.setProperty('--stylish-input-hover-border', this?.basicStyles?.border ? this.basicStyles.border : '1px solid black')
    //     document.documentElement.style.setProperty('--stylish-input-hover-box-shadow', 'none')
    //     document.documentElement.style.setProperty('--stylish-input-focus-outline', 'none')
    //     document.documentElement.style.setProperty('--stylish-input-focus-border', this?.basicStyles?.border ? this.basicStyles.border : '1px solid black')
    //     document.documentElement.style.setProperty('--stylish-input-focus-box-shadow', 'none')
    //   }
    // },
    configPlaceholder() {
      if (this.placeholderStyles) {
        if (this.placeholderStyles.size)
          document.documentElement.style.setProperty('--stylish-input-ph-font-size', this.placeholderStyles.size)
        if (this.placeholderStyles.weight)
          document.documentElement.style.setProperty('--stylish-input-ph-font-weight', this.placeholderStyles.weight)
        if (this.placeholderStyles.color)
          document.documentElement.style.setProperty('--stylish-input-ph-color', this.placeholderStyles.color)
        if (this.placeholderStyles.style)
          document.documentElement.style.setProperty('--stylish-input-ph-font-style', this.placeholderStyles.style)
        if (this.placeholderStyles.family)
          document.documentElement.style.setProperty('--stylish-input-ph-font-family', this.placeholderStyles.family)
      }
    },
    // configAffix() {
    //   if (this.affixStyles) {
    //     if (this.affixStyles.prefixPosition)
    //       document.documentElement.style.setProperty('--stylish-input-prefix-position', this.affixStyles.prefixPosition)
    //     if (this.affixStyles.suffixPosition)
    //       document.documentElement.style.setProperty('--stylish-input-suffix-position', this.affixStyles.suffixPosition)
    //     if (this.affixStyles.size)
    //       document.documentElement.style.setProperty('--stylish-input-affix-font-size', this.affixStyles.size)
    //     if (this.affixStyles.weight)
    //       document.documentElement.style.setProperty('--stylish-input-affix-font-weight', this.affixStyles.weight)
    //     if (this.affixStyles.color)
    //       document.documentElement.style.setProperty('--stylish-input-affix-color', this.affixStyles.color)
    //     if (this.affixStyles.style)
    //       document.documentElement.style.setProperty('--stylish-input-affix-font-style', this.affixStyles.style)
    //     if (this.affixStyles.family)
    //       document.documentElement.style.setProperty('--stylish-input-affix-font-family', this.affixStyles.family)
    //   }
    // },
    // configPrefix() {
    //   if (this.prefixStyles) {
    //     if (this.prefixStyles.position)
    //       document.documentElement.style.setProperty('--stylish-input-prefix-position', this.prefixStyles.position)
    //     if (this.prefixStyles.size)
    //       document.documentElement.style.setProperty('--stylish-input-prefix-font-size', this.prefixStyles.size)
    //     if (this.prefixStyles.weight)
    //       document.documentElement.style.setProperty('--stylish-input-prefix-font-weight', this.prefixStyles.weight)
    //     if (this.prefixStyles.color)
    //       document.documentElement.style.setProperty('--stylish-input-prefix-color', this.prefixStyles.color)
    //     if (this.prefixStyles.style)
    //       document.documentElement.style.setProperty('--stylish-input-prefix-font-style', this.prefixStyles.style)
    //     if (this.prefixStyles.family)
    //       document.documentElement.style.setProperty('--stylish-input-prefix-font-family', this.prefixStyles.family)
    //   }
    // },
    // configSuffix() {
    //   if (this.suffixStyles) {
    //     if (this.suffixStyles.position)
    //       document.documentElement.style.setProperty('--stylish-input-suffix-position', this.suffixStyles.position)
    //     if (this.suffixStyles.size)
    //       document.documentElement.style.setProperty('--stylish-input-suffix-font-size', this.suffixStyles.size)
    //     if (this.suffixStyles.weight)
    //       document.documentElement.style.setProperty('--stylish-input-suffix-font-weight', this.suffixStyles.weight)
    //     if (this.suffixStyles.color)
    //       document.documentElement.style.setProperty('--stylish-input-suffix-color', this.suffixStyles.color)
    //     if (this.suffixStyles.style)
    //       document.documentElement.style.setProperty('--stylish-input-suffix-font-style', this.suffixStyles.style)
    //     if (this.suffixStyles.family)
    //       document.documentElement.style.setProperty('--stylish-input-suffix-font-family', this.suffixStyles.family)
    //   }
    // },
    configCount() {
      if (this.clearable) {
        const match = this.clearIconSize.match(/\d+/)
        if (match) {
          document.documentElement.style.setProperty('--stylish-input-count-position', (3 + parseInt(match[0]) + 5) + 'px')
        }
      } else {
        document.documentElement.style.setProperty('--stylish-input-count-position', '5px')
      }

      if (this.countStyles) {
        if (this.countStyles.size)
          document.documentElement.style.setProperty('--stylish-input-count-font-size', this.countStyles.size)
        if (this.countStyles.weight)
          document.documentElement.style.setProperty('--stylish-input-count-font-weight', this.countStyles.weight)
        if (this.countStyles.color)
          document.documentElement.style.setProperty('--stylish-input-count-color', this.countStyles.color)
        if (this.countStyles.style)
          document.documentElement.style.setProperty('--stylish-input-count-font-style', this.countStyles.style)
        if (this.countStyles.family)
          document.documentElement.style.setProperty('--stylish-input-count-font-family', this.countStyles.family)
      }
    },
    handleBlur() {
      setTimeout(() => {
        this.isFocused = false
      }, 100);
    },
    handleClear() {
      if (this.clearable) {
        this.$emit('update:value', '')
        this.$refs.input.focus()
        this.isFocused = true
      }
    }

  },
  computed: {
    cnt() {
      return this.value.length
    }
  }
}
</script>

<style>
:root {
  /* 基本配置 */
  /* --stylish-input-width: 240px;
  --stylish-input-height: 40px;
  --stylish-input-border: 1px solid black;
  --stylish-input-border-radius: 5px;
  --stylish-input-padding-left: 10px;        
  --stylish-input-padding-right: 10px;        
  --stylish-input-bgcolor: transparent;
  --stylish-input-caret-color: black; */

  /* 文字配置 */
  /* --stylish-input-font-size: inherit;
  --stylish-input-font-weight: normal;
  --stylish-input-color: black;
  --stylish-input-font-style: normal;
  --stylish-input-font-family: inherit; */

  /* 过渡设置 */
  /* --stylish-input-transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1); */

  /* placeholder 设置 */
  --stylish-input-ph-font-size: inherit;
  --stylish-input-ph-font-weight: normal;
  --stylish-input-ph-color: grey;
  --stylish-input-ph-font-style: normal;
  --stylish-input-ph-font-family: inherit;

  /* hover 样式 */
  /* --stylish-input-hover-outline: 0;
  --stylish-input-hover-border: 1px solid black;
  --stylish-input-hover-box-shadow: 1px 1px 5px grey; */

  /* focus 样式 */
  /* --stylish-input-focus-outline: 2px solid black;
  --stylish-input-focus-border: 0;
  --stylish-input-focus-box-shadow: 2px 2px 8px grey; */

  /* 前后缀位置 */
  /* --stylish-input-prefix-position: 0; */
  --stylish-input-suffix-position: 0;

  /* 前后缀样式 */
  /* --stylish-input-affix-font-size: inherit;
  --stylish-input-affix-font-weight: normal;
  --stylish-input-affix-color: lightgrey;
  --stylish-input-affix-font-style: normal;
  --stylish-input-affix-font-family: inherit; */

  /* 前缀样式 */
  /* --stylish-input-prefix-font-size: inherit;
  --stylish-input-prefix-font-weight: normal;
  --stylish-input-prefix-color: lightgrey;
  --stylish-input-prefix-font-style: normal;
  --stylish-input-prefix-font-family: inherit; */

  /* 后缀样式 */
  /* --stylish-input-suffix-font-size: inherit;
  --stylish-input-suffix-font-weight: normal;
  --stylish-input-suffix-color: lightgrey;
  --stylish-input-suffix-font-style: normal;
  --stylish-input-suffix-font-family: inherit; */

  /* 计数器样式 */
  --stylish-input-count-font-size: 14px;
  --stylish-input-count-font-weight: normal;
  --stylish-input-count-color: lightgrey;
  --stylish-input-count-font-style: normal;
  --stylish-input-count-font-family: inherit;

  --stylish-input-count-position: 0;            /* 禁止用户设置 */
}

.stylish-input-container {
  display: inline-block;
  width: 350px;
  height: 50px;
  position: relative;
}

.stylish-input-prefix,
.stylish-input-suffix {
  display: inline-block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  /* 前后缀统一样式 */
  /* font-size: var(--stylish-input-affix-font-size);
  font-weight: var(--stylish-input-affix-font-weight);
  color: var(--stylish-input-affix-color);
  font-style: var(--stylish-input-affix-font-style);
  font-family: var(--stylish-input-affix-font-family); */
}

/* .stylish-input-prefix { */
  /* 前缀位置 */
  /* left: var(--stylish-input-prefix-position); */

  /* 前缀样式 */
  /* font-size: var(--stylish-input-prefix-font-size);
  font-weight: var(--stylish-input-prefix-font-weight);
  color: var(--stylish-input-prefix-color);
  font-style: var(--stylish-input-prefix-font-style);
  font-family: var(--stylish-input-prefix-font-family); */
/* } */

.stylish-input-suffix {
  /* 后缀位置 */
  right: var(--stylish-input-suffix-position);

  /* 后缀样式 */
  /* font-size: var(--stylish-input-suffix-font-size);
  font-weight: var(--stylish-input-suffix-font-weight);
  color: var(--stylish-input-suffix-color);
  font-style: var(--stylish-input-suffix-font-style);
  font-family: var(--stylish-input-suffix-font-family); */
}

.stylish-input {
  box-sizing: border-box;
  background-clip: padding-box;
  width: 350px;
  height: 50px;
  padding: 10px 10px;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 18px;

  /* 基本配置 */
  /* width: var(--stylish-input-width);
  height: var(--stylish-input-height);
  line-height: 40px;
  border: var(--stylish-input-border);
  border-radius: var(--stylish-input-border-radius);
  padding: 0;
  padding-left: var(--stylish-input-padding-left);
  padding-right: var(--stylish-input-padding-right);
  margin: 0;
  background-color: var(--stylish-input-bgcolor);
  caret-color: var(--stylish-input-caret-color); */

  /* 文字配置 */
  /* font-size: var(--stylish-input-font-size);
  font-weight: var(--stylish-input-font-weight);
  color: var(--stylish-input-color);
  font-style: var(--stylish-input-font-style);
  font-family: var(--stylish-input-font-family); */

  /* 动画和过渡选项 */
  /* transition: var(--stylish-input-transition); */
}
.stylish-input::placeholder {
  /* placeholder 配置 */
  font-size: var(--stylish-input-ph-font-size);
  font-weight: var(--stylish-input-ph-font-weight);
  color: var(--stylish-input-ph-color);
  font-style: var(--stylish-input-ph-font-style);
  font-family: var(--stylish-input-ph-font-family);
}
/* hover 样式 */
/*.st ylish-input:hover {
  outline: var(--stylish-input-hover-outline);
  border: var(--stylish-input-hover-border);
  box-shadow: var(--stylish-input-hover-box-shadow);
} */
/* focus 样式 */
.stylish-input:focus {
  outline: 1px solid black;
  /* outline: var(--stylish-input-focus-outline);
  border: var(--stylish-input-focus-border);
  box-shadow: var(--stylish-input-focus-box-shadow); */
}

.stylish-input-count {
  display: inline-block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: var(--stylish-input-count-position);
  /* 计数器样式 */
  font-size: var(--stylish-input-count-font-size);
  font-weight: var(--stylish-input-count-font-weight);
  color: var(--stylish-input-count-color);
  font-style: var(--stylish-input-count-font-style);
  font-family: var(--stylish-input-count-font-family);
}

.stylish-input-clear-icon {
  display: inline-block;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

</style>