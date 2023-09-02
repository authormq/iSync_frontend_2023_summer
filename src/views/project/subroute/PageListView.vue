<template>
  <div class="create clearfix">
    <a class="leftfix" @click="showCreateProto = true">新建原型页面</a>
  </div>
  <div class="list">
    
    <div class="folder-container" style="cursor: default" v-if="showCreateProto">
        <!-- 图标 -->
        <div class="folder-icon">
          <svg t="1693143221549" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="5091" width="80" height="80">
            <path
              d="M434.12811 654.18527l-16.884181 16.884181c-4.707105 4.707105-12.279404 4.707105-16.884181 0l-118.496253-118.496253c-4.707105-4.707105-4.707105-12.279404 0-16.884181l118.496253-118.496253c4.707105-4.707105 12.279404-4.707105 16.884181 0l16.884181 16.884181c4.707105 4.707105 4.707105 12.279404 0 16.884181l-93.118817 93.118817 93.118817 93.118817C438.835215 642.008194 438.835215 649.580494 434.12811 654.18527zM473.115219 744.848206l-21.591286-6.037374c-5.935045-1.637254-9.618867-7.572299-8.18627-13.20036l96.188668-369.917058c1.534926-5.730389 7.981613-9.004897 14.325972-7.265314l23.126212 6.242031c6.344359 1.739582 10.335165 7.776956 8.80024 13.507345l-99.258519 369.610073C485.087639 743.313281 479.050265 746.48546 473.115219 744.848206zM749.401819 552.675527l-118.496253 118.496253c-4.707105 4.707105-12.279404 4.707105-16.884181 0l-16.884181-16.884181c-4.707105-4.707105-4.707105-12.279404 0-16.884181l93.118817-93.118817-93.118817-93.118817c-4.707105-4.707105-4.707105-12.279404 0-16.884181l16.884181-16.884181c4.707105-4.707105 12.279404-4.707105 16.884181 0l118.496253 118.496253C754.006595 540.396123 754.006595 547.968422 749.401819 552.675527zM823.794544 919.522734l-628.500849 0 0-814.533826 455.668232 0 0 128.012791c0 16.065554 14.121315 29.061257 31.41481 29.061257L823.794544 262.062956 823.794544 919.522734 823.794544 919.522734zM722.080144 145.203957l59.759768 58.634156-59.759768 0L722.080144 145.203957zM886.624163 231.364445c0-0.102328 0-0.102328 0-0.204657 0-0.61397-0.102328-1.22794-0.204657-1.841911 0-0.102328 0-0.204657 0-0.306985-0.409313-2.865194-1.22794-5.525732-2.455881-7.981613l0 0c-0.61397-1.22794-1.330269-2.455881-2.046567-3.581493-0.102328-0.102328-0.204657-0.204657-0.204657-0.409313-0.306985-0.511642-0.716299-0.920955-1.023284-1.432597-0.102328-0.204657-0.306985-0.306985-0.409313-0.511642-0.306985-0.306985-0.511642-0.61397-0.818627-1.023284-0.204657-0.204657-0.409313-0.511642-0.61397-0.716299-0.204657-0.204657-0.409313-0.409313-0.61397-0.61397-0.204657-0.204657-0.409313-0.409313-0.716299-0.716299l-171.40002-156.767063c-4.809433-4.604777-11.358449-7.674628-18.521435-8.493255 0 0 0 0-0.102328 0-0.716299-0.102328-1.432597-0.102328-2.148896-0.204657-0.204657 0-0.306985 0-0.511642 0-0.306985 0-0.61397 0-1.023284 0l-515.223344 0c-17.293495 0-31.210153 12.995703-31.210153 29.061257l0 872.758669c0 16.065554 14.018987 29.061257 31.210153 29.061257l686.82802 0c17.293495 0 31.210153-12.995703 31.210153-29.061257l0-715.684621C886.624163 232.490057 886.624163 231.876087 886.624163 231.364445z"
              fill="rgba(199, 29, 35, 1)" p-id="5092"></path>
          </svg>
        </div>
        <!-- 输入框和按钮 -->
        <div class="folder-input">
          <input type="text" v-model="newProtoName" ref="newFolderInput">
          <button @click="cancleCreating">取消</button>
          <button >新建</button>
        </div>
      </div>

    <div style="margin: 5px" class="list-item" v-for="proto in protoList" :key="proto.id" @click="$router.push(`/projects/${projectId}/page/${proto.id}`)">
      <PageListItem :proto="proto" />
    </div>
  </div>
    
</template>

<script>
import PageListItem from '../../../components/ListItem/project/PageListItem.vue'
import CreateProtoModal from '../../../components/Modal/CreateProtoModal.vue'
import NewProject from '../../../components/ListItem/team/NewProject.vue'
export default {
  name: 'PageListView',
  components: { CreateProtoModal, NewProject },
  components: {
    PageListItem
  },
  data() {
    return {
      showModal: false,
      protoList: [],
      projectId: '',
      showCreateProto: false,
      newProtoName: '',
    }
  },
  mounted() {
    this.projectId = this.$route.params.projectId
    this.$http.get(`/api/projects/page/${this.projectId}/list/`).then(
      response => {
        this.protoList = response.data.map((proto) => ({
          id: proto.id,
          name: proto.name,
          // image: proto.image
        }))
      },
      error => {
        console.log(error.message)
      }
    )
    this.$bus.on('reloadProtoListAfterCreateSucceed', this.handleReloadProtoList)
    this.$bus.on('deleteProtoRequest', this.handleDeleteProtoRequest)
    this.$bus.on('renameProtoRequest', this.handleRenameProtoRequest)
  },
  methods: {
    handleReloadProtoList(proto) {
      this.protoList.unshift(proto)
    },
    handleDeleteProtoRequest(proto) {
      this.$http.delete(`/api/projects/page/${proto.id}/delete/`).then(
        response => {
          this.protoList.splice(this.protoList.indexOf(proto), 1)
        },
        error => {
          console.log(error.message)
        }
      )
    },
    handleRenameProtoRequest(protoRenameData) {
      this.$http.post(`/api/projects/page/${protoRenameData.proto.id}/rename/${protoRenameData.rename}/`).then(
        response => {
          this.protoList[this.protoList.indexOf(protoRenameData.proto)].name = protoRenameData.rename
        },
        error => {
          this.$bus.emit('message', {
            title: error.response.data.detail,
            content: '',
            time: 2000
          })
        }
      )
    },
    cancleCreating() {
      this.showCreateProto = false
      this.newProtoName = ''
    },
  }
}
</script>

<style scoped>
.create {
  height: 50px;
  line-height: 50px;
  padding-top: 10px;
}
.create a {
  margin-right: 20px;
  font-size: 20px;
  font-weight: bold;
  color: rgba(199,29,35, 1);
  cursor: pointer;
}
.create a:hover {
  text-decoration: underline;
}

.list {
  max-width: 1150px;
  height: 340px;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
}

.list-item {
  height: 120px;
}

.folder-container {
  min-width: 120px;
  height: 120px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px lightgrey;
  margin: 15px;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.folder-container:hover {
  transform: translate(-2px, -2px) scale(1.02);
  box-shadow: 0 0 5px grey;
}

.folder-icon {
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto
}

.folder-input input {
  display: inline-block !important;
  margin-top: 5px;
  width: 160px;
  height: 20px;
  border-radius: 5px;
  font-size: 20px;
  padding: 5px;
  border: 1px solid rgba(199, 29, 35, 1);
  caret-color: rgba(199, 29, 35, 1);

}
.folder-input input:focus-visible {
  outline: 2px solid rgba(199, 29, 35, 1);
}

.folder-input button {
  margin-left: 10px;
  width: 50px;
  height: 25px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.folder-input button:first-of-type {
  box-sizing: border-box;
  border: 1px solid rgba(199, 29, 35, 1);
  color: rgba(199, 29, 35, 1);
  background: transparent;
}
.folder-input button:first-of-type:hover {
  border: 1px solid rgba(199, 29, 35, 0.8);
  color: rgba(199, 29, 35, 0.8);
}

.folder-input button:last-of-type {
  background: rgba(199, 29, 35, 1);
  color: white;
}
.folder-input button:last-of-type:hover {
  background: rgba(199, 29, 35, 0.8);
}

</style>