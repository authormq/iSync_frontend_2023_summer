# 说明
> 此版本为9月3日答辩展示版本，不代表最终版本，后续可能会更新以及添置域名
> (sudo) npm i (报错开启超级权限）
> **同时需要引入两个文件**，直接存放在node_modules_add中，`(sudo) npm run dev`前挪入`node_module/grapesjs-preset-webpage/dist/`中。
> (sudo) npm run dev

## 1 已安装插件

- router，配置在`/src/router/index.js`中

- vuex，配置在`/src/store/index.js`中

  > 使用 vuex 时，必须把复杂的判断逻辑写在`actions`中，仅在`mutations`中处理数据。
  >
  > 访问 vuex 时，应使用 `mapState` `mapAction` `mapMutation`。

- axios，配置于`vm`身上的`$http`，使用时写`this.$http.get`等

  > ### to 后端
  >
  > `main.js`和`vite.config.js`中有服务器相关设置，按需修改。

- mitt，配置于`vm`身上的`$bus`，发送事件写`this.$bus.emit`，接收事件写`this.$bus.on`

- vue-cookies，配置于`vm`身上的`$cookies`

## 2 重置样式

`/src/assets/reset.css`已经清除了绝大多数元素的**默认样式**，如各级`h`标题的粗细和大小、`a`标签的颜色和下划线、`ul` `li`的小圆点等。

该文件引入于`/index.html`。

## 3 规范

1. **js 脚本不写分号。css 的每一个样式表中，最后一个`key: value`后写分号。**

2. 数组或对象的最后一个成员后不写逗号，例如

   ```js
   let arr = [
       {
           name: 'Tom',
           age: 18 // <- 这里不要有逗号
       },
       {
           name: 'Jane',
           age: 20 // <- 这里不要有逗号
       } // <- 这里不要有逗号
   ]
   ```

3. `views`和`components`中的`.vue`文件，**按照`template` `script` `style`的顺序写（vscode 快捷键：`<v` + 回车）**，**style 标签必须写 `scoped`**。

4. 设置 vscode 默认缩进 **2 空格**。

5. vue 语法支持的函数调用，不传参数时不写括号，例如，应写`@click="handleClick"`而非`@click="handleClick()"`

6. 标签中既有原生属性、又有 vue 语法时，原生放前面

   ```vue
   <!-- 这么写 -->
   <div class="card-item" v-for="item in items" :key="item.id"></div>
   
   <!-- 而不是这么写 -->
   <div v-for="item in items" :key="item.id" class="card-item"></div>
   ```

   标签有一坨属性时，分行写，标签的左尖括号和标签名独占一行，右尖括号独占一行，例如

   ```vue
   <div
     class="card-item" style="padding-left: 10px"
     v-for="item in items" :key="item.id"
     @click="alertMessage(item.msg)"
     @mouseover="handleHover" @mouseleave="handleUnhover"
   >
     内容
   </div>
   ```

7. 组件脚本采用 vue2 写法，**不使用 vue3 的`setup`函数**。

