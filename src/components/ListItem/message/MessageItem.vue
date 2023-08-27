<template>
  <div class="message-container">
    <div class="top">
      <div class="top-left">
        <!-- 消息来源 -->
        <!-- 换成 msg.sender -->
        <div class="from">来自 <span>{{ 'msg.senderhhhhhhhhhafbhioahfiuabfanfqfbiqnfja' }}</span> 的消息</div>
        <!-- 消息时间 -->
        <!-- 换成 msg.timeStamp -->
        <div class="time">{{ '2023-10-14 12:04:32' }}</div>
        <!-- 消息状态 -->
        <!-- 下面的 v-if 要修改 -->
        <div class="state state-read" v-if="false">已读</div>
        <div class="state state-unread" v-else>未读</div>
      </div>
      <div class="top-right">
        <!-- 未读时，设置为已读 -->
        <MailIcon size="30" v-if="false" @click="handleChangeStatus"/>
        <!-- 已读时，删除 -->
        <TrashIcon size="30" v-else @click="handleDeleteMessage"/>
      </div>
    </div>
    <div class="bottom">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime velit distinctio excepturi alias porro sed ducimus fugiat. Numquam eius nobis nisi ipsum facere sapiente totam, quaerat iste cumque odit ea nemo deserunt aliquam veniam placeat. Suscipit nemo debitis voluptatibus magni veritatis! Nihil voluptatem repellat recusandae obcaecati deleniti rem aperiam, iste et eaque voluptatum deserunt, ex, laboriosam molestiae! Adipisci aliquid facere harum consequatur omnis veritatis reiciendis, asperiores ad minima iste labore odio, quod nulla magni at. Blanditiis nihil aperiam ad inventore, repellat velit a aspernatur adipisci culpa beatae recusandae, aliquid saepe officiis enim eaque nostrum consectetur quo magnam fuga, obcaecati dolore?
    </div>
  </div>
  <!-- <div @click="handleChangeStatus">
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
  </div> -->
</template>

<script>
import MailIcon from '../../Svg/MailIcon.vue'
import TrashIcon from '../../Svg/TrashIcon.vue'
export default {
  name: 'MessageItem',
  props: ['msg'],
  components: { MailIcon, TrashIcon },
  emits: ['sendChangeStatusSignal'],
  methods: {
    // 这个函数需要检查正确性
    handleChangeStatus() {
      this.$bus.emit('sendChangeStatusSignal', this.msg)
    },
    // 这个函数待补充
    handleDeleteMessage() {
      // todo
    }
  },
}
</script>

<style scoped>
.message-container {
  width: 800px;
  min-height: 150px;
  border-radius: 15px;
  /* border: 1px solid black; */
  box-shadow: 1px 1px 5px grey;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 20px;
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.message-container:hover {
  transform: translate(-2px, -2px) scale(1.02);
  outline: 3px solid rgba(199, 29, 35, 1);
}

.top {
  height: 40px;
  width: 100%;
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-between;
}

.from {
  font-size: 24px;
  color: rgba(199, 29, 35, 1);
  display: inline-block;
}
.from span {
  vertical-align: bottom;
  display: inline-block;
  max-width: 350px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 24px;
  font-weight: bold;
}

.time {
  display: inline-block;
  /* vertical-align: bottom; */
  font-size: 14px;
  color: grey;
  font-weight: bold;
  margin-left: 10px;
}

.state {
  height: 25px;
  width: 40px;
  border-radius: 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
}
.state-read {
  box-sizing: border-box;
  border: 1px solid rgba(199, 29, 35, 1);
  color: rgba(199, 29, 35, 1);
}
.state-unread {
  background: rgba(199, 29, 35, 1);
  color: white;
}

.top-right {
  padding-top: 5px;
  cursor: pointer;
}

.bottom {
  padding: 5px;
}
</style>