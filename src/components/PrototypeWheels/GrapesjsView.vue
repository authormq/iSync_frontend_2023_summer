<template>
	<span id="size-setter">
		<span>画布宽度 <input type="number" v-model="canvasWidth"> px</span>
		<span>画布高度 <input type="number" v-model="canvasHeight"> px</span>
		<button @click="exportAsImage">导出为图片</button>
		<!-- <button @click="editor.runCommand('export-image')">导出</button> -->
	</span>
	<div id="gjs"></div>

	<!-- <div id="blocks"></div> -->
</template>
	
<script>
import grapesjs from 'grapesjs'; // 引入 GrapesJS
import zh from 'grapesjs/locale/zh.js'//引入中文
import en from 'grapesjs/locale/en.js'//引入英文
import 'grapesjs/dist/css/grapes.min.css'; // 引入样式
import 'grapesjs/dist/grapes.min.js';
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css';
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.js';
import PresetPlugin from 'grapesjs-preset-newsletter';
import ExportPlugin from 'grapesjs-plugin-export';//导出html和css
import html2canvas from 'html2canvas';

export default {
	name: 'GrapesEditor',
	mounted() {
		this.initEditor();
		this.addBlock();
		let topPanel = document.querySelector('.gjs-pn-panel.gjs-pn-devices-c.gjs-one-bg.gjs-two-color .gjs-pn-buttons')
		let sizeSetter = document.querySelector('#size-setter')
		topPanel.appendChild(sizeSetter)
		//设置默认大小
	},
	data() {
		return {
			pageId: 1,
			pageName: 'page1',
			canvasHeight: '1000',
			canvasWidth: '1000',
			editor: undefined,
			currentDevice: undefined
		}
	},
	watch: {
		//监听画布大小改变,更新设备配置
		canvasHeight(value) {
			if (value >= 100000) {
				alert('超过最大高度')
				return
			}
			if (value <= 0) {
				alert('小于最小高度')
				return
			}
			if (this.editor !== undefined) {
				let newName = this.currentDevice.attributes.name === 'Desktop' ? 'Tablet' : 'Desktop'
				let width = this.currentDevice.attributes.width//保持宽度不变
				this.editor.Devices.add({//添加一个设备
					id: newName,
					name: newName,
					height: value + 'px',
					width: width
				})
				// console.log(this.editor.Devices.get('Desktop').attributes.height)
				this.editor.Devices.select(newName)//选择该设备
				this.editor.Devices.remove(this.currentDevice)//把原来的设备删了
				this.currentDevice = this.editor.Devices.get(newName)//变成新设备
			}
		},
		canvasWidth(value) {
			if (value >= 10000) {
				alert('超过最大宽度')
				return
			}
			if (value <= 0) {
				alert('小于最小宽度')
			}
			if (this.editor !== undefined) {
				let newName = this.currentDevice.attributes.name === 'Desktop' ? 'Tablet' : 'Desktop'
				let height = this.currentDevice.attributes.height//保持高度不变
				this.editor.Devices.add({//添加一个设备
					id: newName,
					name: newName,
					height: height,
					width: value + 'px'
				})
				// console.log(this.editor.Devices.get('Desktop').attributes.height)
				this.editor.Devices.select(newName)//选择该设备
				this.editor.Devices.remove(this.currentDevice)//把原来的设备删了
				this.currentDevice = this.editor.Devices.get(newName)//变成新设备
			}
		}
	},
	// beforeDestroy() {
	//   // 当组件销毁时，我们也应该销毁 GrapesJS 编辑器以释放内存
	//   if (this.editor) {
	// 		this.editor.destroy();
	// 	}
	// },
	methods: {
		initEditor() {
			//grapesjs.plugins.add('my-custom-plugin', MyCustomPlugin);
			this.editor = grapesjs.init({
				container: '#gjs',
				i18n: {
					locale: 'en',
					localeFallback: 'en',
					messages: {
						zh, en
					}
				},
				showOffsets: 1,
		  				noticeOnUnload: 0,
				formElement: true,
				// storageManager: {
				// 	type: 'remote',
				// 	stepsBeforeSave: 3,
				// 	autoload: true,
				// 	autosave: true,
				// 	options: {
				// 		remote: {
				// 			// urlLoad: projectEndpoint,
				// 			// urlStore: projectEndpoint,
				// 			// The `remote` storage uses the POST method when stores data but
				// 			// the json-server API requires PATCH.
				// 			fetchOptions: opts => (opts.method === 'POST' ? { method: 'PATCH' } : {}),
				// 			// As the API stores projects in this format `{id: 1, data: projectData }`,
				// 			// we have to properly update the body before the store and extract the
				// 			// project data from the response result.
				// 			onStore: data => ({ id: projectID, data }),
				// 			onLoad: result => result.data,
				// 		}
				// 	}
				// },
				deviceManager: {
					devices: [{
						name: 'Desktop',
						width: this.canvasWidth + 'px',
						height: this.canvasHeight + 'px',
					}]
				},
				assetManager: [],//预加载资产，图片/图标等
				plugins: [PresetPlugin, ExportPlugin],
				pluginsOpts: {
					[ExportPlugin]: {
						addExportBtn: true,
						btnLabel: '导出项目文件ZIP',
						fileName: this.fileName
					}
				},
				styleManager: []
				// blockManager: true
				// blockManager: {
				// 	appendTo: '#blocks',
				// 	blocks: [
				// 		{
				// 			id: 'section',
				// 			label: '<b>Section</b>',
				// 			attributes: { class:'gjs-block-section' },
				// 			content: `<section>
				// 				<h1>This is a simple title</h1>
				// 				<div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
				// 			</section>`
				// 		},{
				// 			id: 'text',
				// 			label: 'Text',
				// 			content: '<div data-gjs-type="text">Insert your text here</div>',
				// 		}, {
				// 			id: 'image',
				// 			label: 'Image',
				// 			// Select the component once it's dropped
				// 			select: true,
				// 			// You can pass components as a JSON instead of a simple HTML string,
				// 			// in this case we also use a defined component type `image`
				// 			content: { type: 'image' },
				// 			// This triggers `active` event on dropped components and the `image`
				// 			// reacts by opening the AssetManager
				// 			activate: true,
				// 		},{
				// 			id: 'Block',
				// 			label: 'block',
				// 			attributes: {class: 'gjs-fonts gjs-f-b1',title:'hello'},
				// 			content: `<div style="text-align:center"><span>Hello World</span></div>`
				// 			// content
				// 		}
				// 	]
				// }
			})
			this.currentDevice = this.editor.Devices.get('Desktop')
		},
		addBlock() {
			if (this.editor !== undefined) {
				this.editor.BlockManager.add('testBlock', {
					id: 'block',
					label: 'Block',
					attributes: { class: 'gjs-fonts gjs-f-b1', title: 'hello' },
					content: `<div style="text-align:center"><span>Hello World</span></div>`
				})
			}
		},
		exportAsImage() {
			let node = document.createElement('div')
			node.style.position = 'fixed'
			node.style.zIndex = -1
			node.innerHTML = this.editor.getHtml()
			document.body.appendChild(node)
			html2canvas(node).then(canvas => {
				let link = document.createElement('a')
				link.download = `${this.pageName}.png`
				link.href = canvas.toDataURL("image/png")
				link.click()
			})
		}
	}
}</script>

<style scoped>
#gjs {
	margin: 0 auto;
	display: inline-block;
	--frame-height: 1080px;
	--frame-width: 1920px;
}

:deep(.gjs-frame) {
	/* height: var(--frame-height);
	width: var(--frame-width); */
}

:deep(.gjs-cv-canvas) {
	overflow: auto;
}

:deep(.gjs-pn-btn:nth-child(3)) {
	display: none;
}

:deep(.gjs-pn-btn:nth-child(2)) {
	display: none;
}
</style>