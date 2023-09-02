<template>
  <div><PageSelectVue/></div>
  <div class="container">
    <div id="gjs"></div>
  </div>
</template>
<script>
import grapesjs from 'grapesjs'; // 引入 GrapesJS
import Plugin from 'grapesjs-blocks-basic'; //basic-blocks
import BasicPlugin from 'grapesjs-preset-webpage'; //basic-blocks
import gjsForms from 'grapesjs-plugin-forms'; //form-blocks
import Navbar from 'grapesjs-navbar'; 
import Countdown from 'grapesjs-component-countdown'; //倒计时
import Tabs from 'grapesjs-tabs';
import Tooltip from 'grapesjs-tooltip';
import CodePlugin from 'grapesjs-custom-code';
import Type from 'grapesjs-typed';
import ExportPlugin from 'grapesjs-plugin-export'; //导出html和css
import ScriptPlugin from 'grapesjs-script-editor'; //js代码编辑
import PageSelectVue from './PageSelect.vue';

export default {
    data() {
      return {
        pageId: '',
        editor: undefined,
        ws: undefined,
      }
        
    },
    components: {
      PageSelectVue,
    },
    mounted() {
      this.pageId = this.$route.params.protoId
      this.initEditor();
      this.banButton();
      this.setPreview();
      this.$watch(
        () => this.$route.params,
        () => {
          this.pageId = this.$route.params.protoId
          this.$http.get(`http://43.138.14.231/projects/${this.pageId}`).then((response) => {
            this.editor.loadProjectData(response.data)
          })
        },
        { immediate: true }
      )
      setTimeout(() => {
        const prv = document.querySelector('#gjs > div.gjs-editor.gjs-one-bg.gjs-two-color > span')
        prv.style.display = 'none'
      }, 1000)
      this.ws = new WebSocket(`ws://43.138.14.231/ws/page/${this.pageId}/`)
      this.ws.onmessage(() => {
        alert('close')
      })
      this.$bus.on('close', () => this.ws.send(JSON.stringify({})))
    },
    unmounted() {
      this.$bus.off('close')
    },
    methods: {
      initEditor() {
        this.editor = grapesjs.init({
          container: '#gjs',
          plugins: [
					Plugin,
					BasicPlugin,
					ExportPlugin,
					Tabs,
					Tooltip,
					CodePlugin,
					Countdown,
					gjsForms,
					Type,
					Navbar,
					ScriptPlugin
				],
          storageManager: {
            type: 'remote',
            options: {
              remote: {
                urlLoad: `http://43.138.14.231/projects/${this.pageId}/`,
							  urlStore: `http://43.138.14.231/projects/${this.pageId}/`,
                fetchOptions: opts => (opts.method === 'POST' ?  { method: 'PATCH' } : {}),
                onStore: data => {
                  data['size'] = {
                    height: this.canvasHeight,
                    width: this.canvasWidth,
                  }
                  data['Devices'] = this.Devices
                  // this.ws.send(JSON.stringify(data))
                  return {
                    id: this.pageId,
                    data,
                    //存储画布宽高
                    size: {
                      height: this.canvasHeight,
                      width: this.canvasWidth,
                    },
                    Devices: this.Devices,
                  }
                },
                onLoad: result => {
                  this.Devices = result.Devices
                  this.canvasHeight = result.size.height
                  this.canvasWidth = result.size.width
                  console.log(result)
                  return result.data
                }
              }
            }
          }
        })
      },
      setPreview() {
        this.editor.on('load', () => {
          this.editor.runCommand('preview');
        });
      },
      banButton() {
        this.editor.Panels.removeButton('options', 'preview');
      }
    }
}
</script>
<style scoped>
.container {
  width: 80%;
  margin: auto;
  /* display: flex;
  justify-content: center; */
}
:deep(#editor) {
    position: relative;
}

:deep(#editor::before) {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.5);  
    pointer-events: none; 
}
</style>