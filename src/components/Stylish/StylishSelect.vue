<template>
  <div class="stylish-select-container" :value="value">
    <div class="stylish-select-content">
      <div class="stylish-select-content-wrapper">
        <div class="stylish-select-content-single" v-if="!multiple">{{ selectedData.length > 0 ? selectedData[0].label : '未选中团队' }}</div>
        <div class="stylish-select-content-multiple" v-else v-for="(select, index) in selectedData" :key="index">
          <div class="stylish-select-content-multiple-label">{{ select.label }}</div>
          <svg class="stylish-select-content-multiple-icon" @click="handleDelete(select.value, index)"
            t="1692198799472" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="976" 
            width="15" height="15">
            <path d="M190.688 190.688a31.968 31.968 0 0 1 45.248 0l276.032 276.032 276.032-276.032a31.968 31.968 0 1 1 45.248 45.248l-276.032 276.032 276.032 276.032a32 32 0 0 1-45.248 45.248l-276.032-276.032-276.032 276.032a32 32 0 0 1-45.248-45.248l276.032-276.032-276.032-276.032a31.968 31.968 0 0 1 0-45.248z" p-id="977"></path>
          </svg>
        </div>
      </div>
        
      <select multiple class="stylish-select" >
        <option v-for="(option, index) in options" :key="index" :value="option.value" >
          {{ option.label }}
        </option>
      </select>
      <svg class="stylish-select-dropdown-icon"  @click="showDropdown = !showDropdown" @mouseleave="leaveDropdown = true" 
        t="1692199626429" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2362" 
        width="25" height="25">
        <path fill="rgba(199,29,35, 1)" d="M512 594.688c-2.112-2.048-4.544-4.48-7.552-7.488l-225.824-225.824a32 32 0 0 0-45.248 45.248l225.824 225.824a197.376 197.376 0 0 0 20.352 18.784c7.52 5.728 18.24 11.904 32.48 11.904s24.96-6.176 32.48-11.904c6.4-4.896 13.088-11.584 19.264-17.76l1.024-1.024 225.824-225.824a32 32 0 0 0-45.248-45.248l-225.824 225.824c-2.976 2.976-5.408 5.408-7.552 7.488z" p-id="2363"></path>
      </svg>
    </div>
    <div class="stylish-select-dropdown" v-if="showDropdown" @mouseenter="leaveDropdown = false" @mouseleave="leaveDropdown = true">
      <div class="stylish-select-dropdown-item" 
        v-for="(option, index) in optionData" :key="index" @click="handleSelect(index); option.click(option.value)"
        @mousedown="handleMouseDown(index)" @mouseup="handleMouseUp(index)" 
        :style="{color: option.selected ? 'white' : 'black', background: option.selected ? 'rgba(199,29,35, 1)' : 'transparent'}"
      >
        {{option.label}}
      </div>
    </div>
  </div>
  <!-- <h3>inside: {{value}}</h3> -->
</template>

<script>
export default {
  name: 'StylishSelect',
  props: {
    value: { required: true },
    options: { type: Array, required: true },
    multiple: { type: Boolean, default: false },
    maxcnt: { type: Number, default: 0 }

  },
  data() {
    return {
      optionData: [],           // 模拟的 option 的 DOM 数据【含 lable、value、selected 字段】
      selectedData: [],         // 已选中的 option 数据【含 label、value 字段】
      showDropdown: false,
      leaveDropdown: false,
    }
  },
  computed: {
    
  },
  created() {
    // 从用户传入的 options 属性，初始化 option 的 DOM 数据
    this.optionData = this.options.map((option) => {
      return {
        label: option.label,
        value: option.value,
        selected: option.selected ? true : false,      // 可能是 undefined
        click: option.click
      }
    })
    if (this.multiple) {
      // 如果是多选
      for (let i = 0; i < this.optionData.length; i++) {    // 先把所有已选中的按顺序统计
        if (this.optionData[i].selected) this.selectedData.push({ value: this.optionData[i].value, label: this.optionData[i].label })
      }
      if (this.maxcnt > 0 && this.selectedData.length > this.maxcnt) {
        const counter = this.selectedData.length - this.maxcnt;
        for (let i = 0; i < counter; i++) {
          this.selectedData.shift()
        }
        let temp = 0
        for (let i = 0; i < this.optionData.length; i++) {
          if (this.optionData[i].selected) {
            this.optionData[i].selected = false
            temp++
            if (temp === counter) break
          }
        }
      }
      // 即刻修改 value 值（因为用户可能设置了一些 `selected: true`，但传入的 value 并未与之对应）
      this.$emit('update:value', this.selectedData.map(data => data.value)) 
    } else {
      // 如果是单选
      for (let i = 0; i < this.optionData.length; i++) {
        if (this.optionData[i].selected) {
          // 找到那个被默认选中的，加入已选中数组
          this.selectedData.push({ value: this.optionData[i].value, label: this.optionData[i].label })
          // 即刻修改 value 值（因为用户可能设置了一些 `selected: true`，但传入的 value 并未与之对应）
          this.$emit('update:value', this.optionData[i].value)
          // 对于后续的 option 仍设置了 `selected: true` 的，统一改成 false
          for (let j = i + 1; j < this.optionData.length; j++) {
            this.optionData[j].selected = false
          }
          break
        }
     }
    }
  },
  mounted() {
    document.addEventListener('click', () => {
      if (this.leaveDropdown) {
        this.leaveDropdown = false
        this.showDropdown = false
      }
    })
  },
  methods: {
    // 处理在下拉菜单中的点击事件，index 是在 option 的 DOM 数据数组里的下标
    handleSelect(index) {
      
      // 如果是多选
      if (this.multiple) {
        // 创建一个新的 option 对象
        const newOption = { 
          label: this.optionData[index].label, 
          value: this.optionData[index].value, 
          selected: !this.optionData[index].selected    // 其 selected 状态取反
        }
        // 利用数组方法替换掉原有 DOM 数据【保证 DOM 更新】
        this.optionData.splice(index, 1, newOption)

        if (newOption.selected) {
          // 如果这次点击是多选了一个，将其压入已选中数组
          if (this.maxcnt > 0 && this.selectedData.length === this.maxcnt) {
            const del = this.selectedData.shift()
            for (let i = 0; i < this.optionData.length; i++) {
              if (this.optionData[i].value === del.value) {
                this.optionData.splice(i, 1, {
                  value: this.optionData[i].value,
                  label: this.optionData[i].label,
                  selected: false
                })
                break
              }
            }
          }
          this.selectedData.push({ value: newOption.value, label: newOption.label })
        } else {
          // 如果是删除了一个，在已选中数组中将其找到，直接删掉
          for (let i = 0; i < this.selectedData.length; i++) {
            if (this.selectedData[i].value === newOption.value) {
              this.selectedData.splice(i, 1)
              break
            }
          }
        }
        // 更新 value 值
        this.$emit('update:value', this.selectedData.map(data => data.value))
      } else {
        // 如果是单选
        for (let i = 0; i < this.optionData.length; i++) {
          // 在 DOM 数据中找到之前被选中的（如果有的话），将其改为未选中【仍应使用数组方法】
          if (this.optionData[i].selected) {
            this.optionData.splice(i, 1, { 
              value: this.optionData[i].value,
              label: this.optionData[i].label,
              selected: false,
              click: this.optionData[i].click
            })
            break
          }
        }
        // 创建新的 option 对象
        const newOption = {
          label: this.optionData[index].label,
          value: this.optionData[index].value,
          selected: true,
          click: this.optionData[index].click
        }
        // 修改原来的 DOM 数据
        this.optionData.splice(index, 1, newOption)
        
        // 更新已选中数据
        if (this.selectedData.length > 0) {
          // 如果原来已经有选中的，删除已选中数组的第一个元素（当然这个数组最多也只能有一个元素）并替换
          this.selectedData.splice(0, 1, { value: newOption.value, label: newOption.label })
        } else {
          // 如果原来没选过，将新选的数据直接压入数组
          this.selectedData.push({ value: newOption.value, label: newOption.label })
        }
        // 更新 value 值
        this.$emit('update:value', newOption.value)
      } 
      // console.log(this.optionData[index])
      // console.log(this.optionData[index].label)
      
    },
    // 在多选时，通过点击叉号删除
    handleDelete(v, i) {
      for (let i = 0; i < this.optionData.length; i++) {
        if (this.optionData[i].value === v) {
          this.optionData.splice(i, 1, {
            value: this.optionData[i].value,
            label: this.optionData[i].label,
            selected: false
          })
          break
        }
      }
      this.selectedData.splice(i, 1)
      this.$emit('update:value', this.selectedData.map(data => data.value))
    },
    handleMouseDown(index) {
      const div = document.querySelector(`.stylish-select-dropdown-item:nth-child(${index + 1})`)
      div.style.background = 'rgb(250, 250, 250)'
    },
    handleMouseUp(index) {
      const div = document.querySelector(`.stylish-select-dropdown-item:nth-child(${index + 1})`)
      div.style.background = 'white'
    }
  }
}
</script>

<style>
.stylish-select {
  display: none;
}
.stylish-select-container {
  display: inline-block;
  position: relative;
}
.stylish-select-content {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  width: 250px;
  min-height: 50px;
  box-sizing: border-box;
  border: 1px solid lightgrey;
  border-radius: 5px;
  background: transparent;

  margin: 0;
  padding: 5px;


  font-size: inherit;
  font-weight: normal;
  color: black;
  font-style: normal;
  font-family: inherit;

  transition: all 0.1s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.stylish-select-content:hover {
  outline: 2px solid rgba(199,29,35, 1);
  border: 1px solid rgba(199,29,35, 1);
  box-shadow: 1px 1px 10px grey;
}

.stylish-select-content-wrapper {
  display: inline-block;
  max-width: 240px;           /* 总宽度减去小箭头 */
}


.stylish-select-content-single {
  display: inline-block;
  padding-left: 10px;
  color: rgba(199,29,35, 1);
}
.stylish-select-content-multiple {
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  height: 30px;

  border: 2px dashed lightgray;
  background: none;
  border-radius: 3px;
  padding: 3px;
  margin: 3px;
}

.stylish-select-content-multiple-label {
  /* float: left; */
  justify-self: flex-start
}
.stylish-select-content-multiple-icon {
  display: inline-block;
  justify-self: flex-end;
  margin-left: 15px;
  cursor: pointer;
}

.stylish-select-dropdown-icon {
  justify-self: flex-end;
  cursor: pointer;
}



.stylish-select-dropdown {
  width: 250px;
  height: 150px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: scroll;
  position: absolute;
  top: 100%;

  background-color: white;
  box-shadow: 0 0 5px lightgray;
  border-radius: 5px;
  margin: 3px 0;
  padding: 5px;
  /* border: 1px solid black; */
}

.stylish-select-dropdown::-webkit-scrollbar {
  width: 8px;
} 



.stylish-select-dropdown::-webkit-scrollbar-thumb {
  border-radius: 5px ;
  /* box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
  /* 颜色 */
  background:rgba(100, 100, 100, 0.2);
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  
  /* 线性渐变背景 */
  /* background-image: linear-gradient(45deg, #ffbd61 25%,#ffbd61 25%, #ff8800 25%, #ff8800 50%,#ffbd61 50%, #ffbd61 75%, #ff8800 75%, #ff8800 100%)!important; */
}
 
/*滚动条轨道*/
.stylish-select-dropdown::-webkit-scrollbar-track {
  /* border-radius: 10px; */
  /* box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) ; */
  background: transparent;
}

.stylish-select-dropdown-item {
  margin: 5px;
  padding: 5px;
  height: 30px;
  line-height: 30px;
  
  background: white;
  border: 0;
  border-radius: 3px;
  box-shadow: 1px 1px 3px lightgrey;
  cursor: pointer;

  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.stylish-select-dropdown-item:hover {
  transform: translate(-1px, -1px) scale(1.05);
}

</style>