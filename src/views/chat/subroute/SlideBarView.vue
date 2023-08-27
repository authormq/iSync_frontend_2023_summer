<template>
  <SlideBarItem  v-for="item in SlideBarData" :key="item" :data="item" @click="intoChat"/>
</template>

<script>
import SlideBarItem from '../../../components/ListItem/chat/SlideBarItem.vue'
export default {
  name: 'SlideBarView',
  components: {
    SlideBarItem
  },
  data() {
    return {
      SlideBarData: [{
        'avatar': '头像',
        'name': '发件人',
        'message': '消息'
      },
      {
        'avatar': '头像',
        'name': '发件人',
        'message': '消息'
      },
      {
        'avatar': '头像',
        'name': '发件人',
        'message': '消息'
      }
      ]
    }
  },
  methods: {
    intoChat() {
      alert('进入对应群聊')
    }
  }
}
</script>

<style scoped>

</style>