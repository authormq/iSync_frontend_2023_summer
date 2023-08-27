<template>
  <div class="select-container">
    <StylishSelect v-model:value="currentTeam" :options="options"/>
  </div>
  <CreateTeamModal :show="showCreateTeamModal" @close="showCreateTeamModal = false"></CreateTeamModal>
</template>

<script>
import CreateTeamModal from '../Modal/CreateTeamModal.vue'
import StylishSelect from '../Stylish/StylishSelect.vue'
export default {
  name: 'TeamSelector',
  components: {
    CreateTeamModal,
    StylishSelect
  },
  data() {
    return {
      // 当前团队对应option之value
      currentTeam: '未选中',
      /* 
        说明
        （1）每一项的label为展示文字，value为真实值，
            click为点击后调用的方法（应在这个文件的methods中配置）。
            如果设置某一个元素的 selected 属性为 true，它将被选中
        （2）第一项必须这么写，其 value 无意义，click 已经写好，就是展示模态框
      */
      options: [
        {
          label: '新建团队',
          value: 'XXX',
          click: this.showModal
        }
      ],
      tmpOption: [], // 请求时暂时使用的
      showCreateTeamModal: false
    }
  },
  mounted() {
    this.$http.get(`/api/teams/list_by_identity/`).then(
      response => {
        this.tmpOption = response.data.map((team) => ({
          label: team.name,
          avatar: team.avatar,
          value: team.id, // value 取为 teamid
          click: this.jump
        }))
        this.options = this.options.concat(this.tmpOption)
        //寻找当前所在的团队并显示
        if (this.$cookies.get('teamId') != undefined) {
          for (let i = 0; i < this.options.length; i++) {
            if (this.options[i].value === parseInt(this.$cookies.get('teamId'))) {
              const newOption = {
                label: this.options[i].label,
                avatar: this.options[i].avatar,
                value: this.options[i].value,
                click: this.jump,
                selected: true
              }
              this.options.splice(i, 1, newOption)
              break
            }
          }
          console.log('over!', this.options)
        }
        // 必须放在外面
        this.$bus.emit('flushData', this.options)
      },
      error => {
        console.log(error.message)
      }
    )
  },
  methods: {
    // 这个 jump 可以换成点击切换当前团队的方法
    // 当前团队最好保存在 store 中
    // 上面 options 数组的第一项已经固定，后面的项应当调用接口 push 进去
    // 其中每一项的 value 可以是跳转路由，下面的 jump 方法可以接收一个参数，调用$router.push实现跳转
    jump(teamid) {
      this.$cookies.set('teamId', teamid)
      this.$router.push(`/team/${teamid}/info`)
      // this.$router.go(0)
      // console.log('调用了')
      // location.reload()
    },
    showModal(v) {
      this.showCreateTeamModal = true
    },
  }
}
</script>

<style scoped></style>