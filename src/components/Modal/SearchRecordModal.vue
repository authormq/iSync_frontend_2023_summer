<template>
  <StylishModal :show="show" width="650px" height="600px" padding="25px">
    <div class="container-header">
      <div class="modal-title">
        查找聊天记录
      </div>
      <div class="close-icon" @click="handleClose">
        <CloseIcon size="30" />
      </div>
    </div>
    <div>
      <input type="text" placeholder="输入搜索的关键词" v-model="recordKeyword" @keyup.enter="searchRecord" />
      <div class="search-icon" @click="searchRecord" @mouseover="searchIconIsHovered = true"
        @mouseleave="searchIconIsHovered = false">
        <SearchIcon :color="searchIconIsHovered ? 'rgba(199,29,35, 1)' : 'lightgrey'" />
      </div>
    </div>
    <div class="container-result">
      <div v-for="record in recordList" :key="record.id">
        <div>
          <img :src="record.sender.user.avatar" style="width: 20px;">
          {{ record.sender.user.last_name + record.sender.user.first_name }}
          {{ record.createDatetime }}
          {{ record.textContent }}
        </div>
        <button @click="locateToMessage(record.id)">定位到聊天位置</button>
      </div>
    </div>
  </StylishModal>
</template>
<script>
import StylishModal from '../Stylish/StylishModal.vue'
import SearchIcon from '../Svg/SearchIcon.vue'
import CloseIcon from '../Svg/CloseIcon.vue'
export default {
  name: 'SearchRecordModal',
  props: ['show'],
  emit: ['close'],
  components: {
    StylishModal,
    SearchIcon,
    CloseIcon
  },
  data() {
    return {
      searchIconIsHovered: false,
      recordKeyword: '',
      groupId: '',
      recordList: []
    }
  },
  methods: {
    searchRecord() {
      if (this.recordKeyword.trim() == '') {
        this.$bus.emit('message', {
          title: '关键词为空',
          content: '搜索聊天关键词不能为空',
          time: 3000
        })
      } else {
        this.groupId = 38
        this.$http.get(`/api/groups/${this.groupId}/messages/?keyword=${this.recordKeyword}`).then(
          response => {
            this.recordList = response.data.map((record) => ({
              id: record.id,
              sender: record.sender,
              textContent: record.text_content,
              imageContent: record.image_content,
              createDatetime: record.create_datetime,
              groupId: record.group
            }))
          },
          error => {
            console.log(error.message)
          }
        )
      }
    },
    handleClose() {
      this.recordKeyword = ''
      this.recordList = []
      this.$emit('close')
    },
    locateToMessage(id) {
      this.handleClose()
      this.$bus.emit('scrollToMessage', id)
    }
  }
}
</script>
<style scoped>
::placeholder {
  color: lightgrey;
}

.container-header {
  display: flex;
}

.modal-title {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}

.close-icon {
  cursor: pointer;
}

.search-icon {
  margin-left: 10px;
  cursor: pointer;
}

.container-result {
  overflow: auto;
  height: 450px;
}
</style>