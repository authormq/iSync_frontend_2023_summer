<template>
	<span id="size-setter">
		<!-- 桌面端按钮 -->
		<span @click="switchDevice(0)"
			:class="{ 'selected-device': Devices[0].selected, 'unselected-device': !Devices[0].selected }">
			<svg t="1693450725716" class="icon" style="cursor: pointer;" viewBox="0 0 1024 1024" version="1.1"
				xmlns="http://www.w3.org/2000/svg" p-id="1477" width="23" height="23">
				<path
					d="M928 140H96c-17.7 0-32 14.3-32 32v496c0 17.7 14.3 32 32 32h380v112H304c-8.8 0-16 7.2-16 16v48c0 4.4 3.6 8 8 8h432c4.4 0 8-3.6 8-8v-48c0-8.8-7.2-16-16-16H548V700h380c17.7 0 32-14.3 32-32V172c0-17.7-14.3-32-32-32z m-40 488H136V212h752v416z"
					p-id="1478"></path>
			</svg>
		</span>
		<!-- 平板按钮 -->
		<span @click="switchDevice(1)"
			:class="{ 'selected-device': Devices[1].selected, 'unselected-device': !Devices[1].selected }">
			<svg t="1693456457079" class="icon" style="cursor: pointer;" viewBox="0 0 1024 1024" version="1.1"
				xmlns="http://www.w3.org/2000/svg" p-id="2689" width="23" height="23">
				<path
					d="M800 64H224c-35.3 0-64 28.7-64 64v768c0 35.3 28.7 64 64 64h576c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64z m-8 824H232V136h560v752z"
					p-id="2690"></path>
				<path d="M512 784m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z" p-id="2691"></path>
			</svg>
		</span>
		<!-- 手机按钮 -->
		<span @click="switchDevice(2)"
			:class="{ 'selected-device': Devices[2].selected, 'unselected-device': !Devices[2].selected }">
			<svg t="1693456616174" class="icon" style="cursor: pointer;" viewBox="0 0 1024 1024" version="1.1"
				xmlns="http://www.w3.org/2000/svg" p-id="4595" width="23" height="23">
				<path
					d="M746.666667 949.333333H277.333333c-40.533333 0-74.666667-34.133333-74.666666-74.666666V149.333333c0-40.533333 34.133333-74.666667 74.666666-74.666666h469.333334c40.533333 0 74.666667 34.133333 74.666666 74.666666v725.333334c0 40.533333-34.133333 74.666667-74.666666 74.666666z m-469.333334-810.666666c-6.4 0-10.666667 4.266667-10.666666 10.666666v725.333334c0 6.4 4.266667 10.666667 10.666666 10.666666h469.333334c6.4 0 10.666667-4.266667 10.666666-10.666666V149.333333c0-6.4-4.266667-10.666667-10.666666-10.666666H277.333333z"
					p-id="4596"></path>
				<path d="M512 768m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z"
					p-id="4597"></path>
				<path
					d="M597.333333 245.333333h-170.666666c-17.066667 0-32-14.933333-32-32s14.933333-32 32-32h170.666666c17.066667 0 32 14.933333 32 32s-14.933333 32-32 32z"
					p-id="4598"></path>
			</svg>
		</span>
		<!-- 自定义按钮 -->
		<span @click="switchDevice(3)"
			:class="{ 'selected-device': Devices[3].selected, 'unselected-device': !Devices[3].selected }">
			<svg t="1693400825308" style="cursor: pointer;" class="icon" viewBox="0 0 1024 1024" version="1.1"
				xmlns="http://www.w3.org/2000/svg" p-id="11286" id="mx_n_1693400825309" width="23" height="23">
				<path
					d="M863.744 896h-224.256c-17.92 0-31.744-14.336-31.744-31.744s14.336-31.744 31.744-31.744h192.512v-640h-640v190.976c0 17.92-14.336 32.256-32.256 32.256S128 400.896 128 383.488V160.256c0-17.92 14.336-32.256 32.256-32.256h704c17.92 0 31.744 14.336 31.744 32.256v704c0 17.408-14.336 31.744-32.256 31.744z"
					p-id="11287"></path>
				<path
					d="M482.304 896h-322.56c-17.92 0-32.256-14.336-32.256-31.744v-322.56c0-17.92 14.336-32.256 32.256-32.256h322.56c17.92 0 32.256 14.336 32.256 32.256v322.56c0 17.408-14.336 31.744-32.256 31.744z m-290.304-64H450.56V573.44H192v258.56z"
					p-id="11288"></path>
			</svg>
		</span>
		<span v-if="Devices[0].selected" class="animate__animated animate__fadeIn">
			{{ Devices[0].width }} × {{ Devices[0].height }}</span>
		<span v-if="Devices[1].selected" class="animate__animated animate__fadeIn">
			{{ Devices[1].width }} × {{ Devices[1].height }}</span>
		<span v-if="Devices[2].selected" class="animate__animated animate__fadeIn">
			{{ Devices[2].width }} × {{ Devices[2].height }}</span>
		<span v-if="Devices[3].selected" class="animate__animated animate__fadeIn">
			<svg t="1693312903898" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
				p-id="2576" width="25" height="25">
				<path
					d="M819.198 910.218 204.799 910.218c-50.267 0-91.022-40.75-91.022-91.02L113.777 204.822c0-50.29 40.755-91.045 91.022-91.045l614.398 0c50.27 0 91.02 40.755 91.02 91.045l0 614.376C910.218 869.468 869.468 910.218 819.198 910.218zM841.953 227.554c0-25.122-20.385-45.51-45.51-45.51L227.554 182.044c-25.122 0-45.51 20.387-45.51 45.51l0 568.889c0 25.125 20.387 45.535 45.51 45.535l568.889 0c25.125 0 45.51-20.39 45.51-45.535L841.953 227.554zM603.268 400.952l-57.14-57.115 0 335.802 55.505-55.5c13.335-13.31 34.93-13.335 48.265 0 13.33 13.335 13.33 34.95 0 48.29l-105.77 105.765c-1.615 3.415-3.525 6.78-6.37 9.625-7.1 7.08-16.475 10.1-25.76 9.67-9.262 0.46-18.66-2.59-25.76-9.69-2.842-2.85-4.8-6.15-6.347-9.58l-105.79-105.79c-13.335-13.34-13.335-34.955 0-48.29 13.332-13.31 34.927-13.335 48.262 0l55.502 55.5L477.865 343.837l-57.117 57.115c-13.335 13.357-34.952 13.335-48.287 0s-13.335-34.93 0-48.265l115.395-115.37c13.332-13.335 34.927-13.357 48.262 0l115.395 115.37c13.335 13.335 13.335 34.952 0 48.265C638.198 414.286 616.583 414.286 603.268 400.952z"
					fill="#c71d23" p-id="2577"></path>
			</svg>
			<input type="number" v-model="canvasWidth" max="100000"> px</span>
		<span v-if="Devices[3].selected" class="animate__animated animate__fadeIn"><svg t="1693314788367" class="icon "
				viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3702" width="25" height="25">
				<path
					d="M113.777 819.198 113.777 204.8c0-50.267 40.75-91.022 91.02-91.022l614.376 0c50.29 0 91.045 40.755 91.045 91.022l0 614.398c0 50.27-40.755 91.02-91.045 91.02L204.797 910.218C154.527 910.218 113.777 869.468 113.777 819.198zM796.438 841.953c25.125 0 45.51-20.385 45.51-45.51L841.948 227.554c0-25.122-20.385-45.51-45.505-45.51L227.552 182.044c-25.125 0-45.535 20.387-45.535 45.51l0 568.889c0 25.125 20.39 45.51 45.535 45.51L796.438 841.953zM623.043 603.269l57.115-57.14L344.357 546.129l55.5 55.505c13.31 13.335 13.335 34.93 0 48.265-13.335 13.33-34.95 13.33-48.29 0l-105.765-105.77c-3.415-1.615-6.78-3.525-9.625-6.37-7.08-7.1-10.1-16.475-9.67-25.76-0.46-9.262 2.59-18.66 9.69-25.76 2.85-2.842 6.15-4.8 9.58-6.348l105.79-105.79c13.34-13.335 34.955-13.335 48.29 0 13.31 13.332 13.335 34.927 0 48.262l-55.5 55.502 335.802 0-57.115-57.117c-13.355-13.335-13.335-34.952 0-48.287s34.93-13.335 48.265 0l115.37 115.395c13.335 13.332 13.36 34.927 0 48.262l-115.37 115.395c-13.335 13.335-34.95 13.335-48.265 0C609.708 638.198 609.708 616.583 623.043 603.269z"
					fill="#c71d23" p-id="3703"></path>
			</svg>
			<input type="number" v-model="canvasHeight" max="100000"> px
		</span>
		<button @click="exportAsImage">导出为图片</button>
		<button class="sharebutton" @click="shareLink">生成预览链接</button>
	</span>
	<div class="page-select">
		<PageSelect />
		<div id="gjs"></div>
	</div>
</template>
	
<script>
import grapesjs from 'grapesjs'; // 引入 GrapesJS
import zh from 'grapesjs/locale/zh.js'//引入中文
import en from 'grapesjs/locale/en.js'//引入英文
import 'grapesjs/dist/css/grapes.min.css'; // 引入样式
import 'grapesjs/dist/grapes.min.js';
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css';
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.js';
import Plugin from 'grapesjs-blocks-basic'; //basic-blocks
import BasicPlugin from 'grapesjs-preset-webpage'; //basic-blocks
import gjsForms from 'grapesjs-plugin-forms'; //form-blocks
// import Navbar from 'grapesjs-navbar'; 
import Countdown from 'grapesjs-component-countdown'; //倒计时
import Tabs from 'grapesjs-tabs';
import Tooltip from 'grapesjs-tooltip';
import CodePlugin from 'grapesjs-custom-code';
import Type from 'grapesjs-typed';
// import PresetPlugin from 'grapesjs-preset-newsletter';
import ExportPlugin from 'grapesjs-plugin-export'; //导出html和css
import ScriptPlugin from 'grapesjs-script-editor'; //js代码编辑
import html2canvas from 'html2canvas';
import 'animate.css'
import PageSelect from './PageSelect.vue';


export default {
	name: 'GrapesEditor',
	components: {
		PageSelect
	},
	mounted() {
		this.$watch(
			() => this.$route.params,
			() => {
				this.pageId = this.$route.params.protoId
				this.initEditor();
			},
			{ immediate: true }
		)
		this.initEditor();
		this.addBlock();
		let topPanel = document.querySelector('.gjs-pn-panel.gjs-pn-devices-c.gjs-one-bg.gjs-two-color .gjs-pn-buttons')
		let sizeSetter = document.querySelector('#size-setter')
		topPanel.appendChild(sizeSetter)
		this.ws = new WebSocket(`ws://43.138.14.231:9000/ws/page/2/`)
		// this.ws.onmessage = (message) => {
		// 	const data = JSON.parse(message.data).data
		// 	if (JSON.stringify(this.editor.getProjectData()) !== JSON.stringify(data)) {
		// 		this.editor.loadProjectData(data)
		// 	}
		// }
		//设置默认大小
	},
	unmounted() {
		this.ws.close()
	},
	data() {
		return {
			ws: '',
			pageId: null,
			pageName: 'page1',
			pagesNum: 1,
			canvasHeight: '1000',
			canvasWidth: '1000',
			Devices: [
				{
					selected: true,
					id: 'Desktop',
					width: '1920px',
					height: '1080px',
				},
				{
					selected: false,
					id: 'Tablet',
					width: '2388px',
					height: '1668px',
				},
				{
					selected: false,
					id: 'Mobile portrait',
					width: '1170px',
					height: '2532px',
				},
				{
					selected: false,
					id: 'Customization',
					width: '1000px',
					height: '1000px',
				},
			],
			editor: undefined,
			currentDevice: undefined
		}
	},
	watch: {
		//监听画布大小改变,更新设备配置
		canvasHeight(value) {
			if (value > 100000) {
				alert('超过最大高度')
				return
			}
			if (value <= 0) {
				alert('小于最小高度')
				return
			}
			if (this.editor !== undefined) {
				let oldName = this.editor.Devices.get('Customization') === null ? 'Customization1' : 'Customization'
				let newName = oldName === 'Customization1' ? 'Customization' : 'Customization1'
				let width = this.Devices[3].width//保持宽度不变
				this.editor.Devices.add({//添加一个设备
					id: newName,
					name: newName,
					height: value + 'px',
					width: width
				})
				// console.log(this.editor.Devices.get('Desktop').attributes.height)
				this.editor.Devices.select(newName)//选择该设备
				this.editor.Devices.remove(oldName)//把原来的设备删了
				this.Devices[3].id = newName//设置新id
				this.Devices[3].height = value + 'px'//设置新高度
				setTimeout(() => {
					this.editor.store()
				}, 100)
			}

		},
		canvasWidth(value) {
			if (value > 100000) {
				alert('超过最大宽度')
				return
			}
			if (value <= 0) {
				alert('小于最小宽度')
			}
			if (this.editor !== undefined) {
				let oldName = this.editor.Devices.get('Customization') === null ? 'Customization1' : 'Customization'
				let newName = oldName === 'Customization1' ? 'Customization' : 'Customization1'
				let height = this.Devices[3].height//保持高度不变
				this.editor.Devices.add({//添加一个设备
					id: newName,
					name: newName,
					height: height,
					width: value + 'px'
				})
				// console.log(this.editor.Devices.get('Desktop').attributes.height)
				this.editor.Devices.select(newName)//选择该设备
				this.editor.Devices.remove(oldName)//把原来的设备删了
				this.Devices[3].id = newName//设置新id
				this.Devices[3].width = value + 'px'//设置新宽度
				setTimeout(() => {
					this.editor.store()
				}, 100)
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
				height: 'calc(100vh - 70px)',
				showOffsets: 1,
				autosave: true,
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
					devices: [
						{
							id: 'Desktop',
							name: 'Desktop',
							width: '1920px',
							height: '1080px',
						},
						{
							id: 'Tablet',
							name: 'Tablet',
							width: '2388px',
							height: '1668px',
						},
						{
							id: 'Mobile portrait',
							width: '1170px',
							height: '2532px',
						},
						{
							id: 'Customization',
							name: 'Customization',
							width: this.canvasWidth + 'px',
							height: this.canvasHeight + 'px',
						}]
				},
				assetManager: [],//预加载资产，图片/图标等
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
					ScriptPlugin
				],
				pluginsOpts: {
					[BasicPlugin]: {
						blocks: []
					},
					[ExportPlugin]: {
						addExportBtn: true,
						btnLabel: '导出项目文件ZIP',
						fileName: this.fileName,
						root: {
							css: {
								'style.css': ed => ed.getCss(),
							},
							'index.html': ed => `<body>${ed.getHtml()}</body>`,
							'index.js': ed => ed.getJs()
						}
					},
					[ScriptPlugin]: {
						starter: `//对该元素节点进行代码编辑
						let el = this`,
						buttonLabel: '保存',

					},
					[Type]: {
						block: {
							category: 'Extra'
						}
					},
					[Tabs]: {
						tabsBlock: {
							category: 'Extra'
						}
					},
				},
				styleManager: [],
				storageManager: {
					type: 'remote',
					stepsBeforeSave: 1,
					autosave: true,
					autoload: true,
					options: {
						remote: {
							urlLoad: `http://localhost:3000/projects/${this.pageId}`,
							urlStore: `http://localhost:3000/projects/${this.pageId}`,
							// urlLoad: `http://localhost:3000/projects/1`,
							// urlStore: `http://localhost:3000/projects/1`,
							// The `remote` storage uses the POST method when stores data but
							// the json-server API requires PATCH.
							fetchOptions: opts => (opts.method === 'POST' ? { method: 'PATCH' } : {}),
							// As the API stores projects in this format `{id: 1, data: projectData }`,
							// we have to properly update the body before the store and extract the
							// project data from the response result.
							onStore: data => {
								data['size'] = {
									height: this.canvasHeight,
									width: this.canvasWidth,
								}
								data['Devices'] = this.Devices
								this.ws.send(JSON.stringify(data))
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
								return result.data
							}

						}
					},
				}
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
		},
		addBlock() {
			if (this.editor !== undefined) {
				this.editor.BlockManager.add('testBlock', {
					id: 'block',
					label: 'Block',
					category: 'Basic',
					media: '<svg t="1693317219863" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1506" width="100%" height="100%"><path d="M960 392.078222a98.602667 98.602667 0 0 1-98.588444 98.588445H148.366222A98.602667 98.602667 0 0 1 49.777778 392.078222V148.366222A98.602667 98.602667 0 0 1 148.366222 49.777778h713.059556a98.602667 98.602667 0 0 1 98.588444 98.588444v243.712z m-56.888889-243.712A41.699556 41.699556 0 0 0 861.411556 106.666667H148.366222A41.699556 41.699556 0 0 0 106.666667 148.366222v243.726222a41.699556 41.699556 0 0 0 41.699555 41.699556h713.059556a41.699556 41.699556 0 0 0 41.699555-41.699556V148.366222z" fill="#c71d23" p-id="1507"></path><path d="M163.555556 277.333333a14.222222 14.222222 0 0 1-14.222223-14.222222v-25.628444c0-36.352 17.720889-73.927111 56.32-73.927111h94.776889a14.222222 14.222222 0 1 1 0 28.444444H205.653333c-20.792889 0-27.875556 23.125333-27.875555 45.482667V263.111111a14.222222 14.222222 0 0 1-14.222222 14.222222zM152.092444 326.115556c-3.697778 0-7.409778-1.564444-10.097777-4.124445-2.702222-2.688-4.124444-6.4-4.124445-10.097778s1.422222-7.395556 4.124445-10.097777c5.404444-5.404444 14.791111-5.262222 20.053333 0 2.688 2.702222 4.266667 6.4 4.266667 10.097777s-1.564444 7.409778-4.124445 9.955556c-2.844444 2.688-6.4 4.266667-10.097778 4.266667zM661.333333 875.633778a98.602667 98.602667 0 0 1-98.588444 98.588444H148.366222A98.602667 98.602667 0 0 1 49.777778 875.633778V631.921778a98.602667 98.602667 0 0 1 98.588444-98.588445h414.392889a98.602667 98.602667 0 0 1 98.588445 98.588445v243.712z m-56.888889-243.712a41.699556 41.699556 0 0 0-41.699555-41.699556H148.366222A41.699556 41.699556 0 0 0 106.666667 631.921778v243.726222a41.699556 41.699556 0 0 0 41.699555 41.699556h414.392889a41.699556 41.699556 0 0 0 41.699556-41.699556V631.921778z" fill="#c71d23" p-id="1508"></path><path d="M974.222222 875.633778a98.602667 98.602667 0 0 1-98.588444 98.588444h-73.059556a98.602667 98.602667 0 0 1-98.588444-98.588444V631.921778a98.602667 98.602667 0 0 1 98.588444-98.588445h73.059556a98.602667 98.602667 0 0 1 98.588444 98.588445v243.712z m-56.888889-243.712a41.699556 41.699556 0 0 0-41.699555-41.699556h-73.059556a41.699556 41.699556 0 0 0-41.699555 41.699556v243.726222a41.699556 41.699556 0 0 0 41.699555 41.699556h73.059556a41.699556 41.699556 0 0 0 41.699555-41.699556V631.921778z" fill="#c71d23" p-id="1509"></path></svg>',
					attributes: { class: 'gjs-fonts gjs-f-b1', title: 'hello' },
					content: `<div style="text-align:center"><span>Hello World</span></div>`
				})
			}
		},
		exportAsImage() {
			let node = document.createElement('div')
			node.style.position = 'fixed'
			node.style.zIndex = -1
			node.style.top = 0
			node.style.left = 0
			node.style.height = this.canvasHeight + 'px'
			node.style.width = this.canvasWidth + 'px'
			node.innerHTML = `<div style="{
				height:${this.canvasHeight}px;
				width:${this.canvasWidth}px}">
			${this.editor.getHtml()}
			<style>
			img{
				display:inline;
			}
			${this.editor.getCss()}  
			</style>
			</div>`
			console.log(node.innerHTML)
			document.querySelector('iframe').appendChild(node)
			html2canvas(node).then(canvas => {
				let link = document.createElement('a')
				link.style.display = 'none'
				link.download = `${this.pageName}.png`
				link.href = canvas.toDataURL("image/png")
				link.click()
				link.remove()
				document.querySelector('iframe').removeChild(node)
			})

		},
		shareLink() {

		},
		switchDevice(deviceIndex) {
			this.Devices.forEach((device) => {
				device.selected = false
			})
			this.Devices[deviceIndex].selected = true
			this.editor.Devices.select(this.Devices[deviceIndex].id)
		}
	}
}
</script>

<style scoped>
#gjs {
	margin: 0 auto;
	display: inline-block;
	--frame-height: 1080px;
	--frame-width: 1920px;
}

:deep(.gjs-one-bg) {
	background-color: white;
}

:deep(.gjs-two-color) {
	color: rgba(199, 29, 35, 1);
}

:deep(.gjs-four-color-h:hover) {
	color: #ddd;
}

:deep(.gjs-four-color) {
	color: darkred;
}

/* 被选中边框颜色，未改成功 */
:deep(.gjs-selected) {
	outline-color: #c71d23;
	outline-style: solid;
	outline-offset: -2px;
}

:deep(.gjs-pn-views-container) {
	width: 20%;
}

:deep(.gjs-pn-options) {
	right: 20%;
}

:deep(.gjs-pn-views) {
	width: 20%;
}

:deep(.gjs-three-bg) {
	background-color: #c71d23;
	color: #eee;
}

:deep(.gjs-pn-commands) {
	display: none;
}

:deep(.gjs-cv-canvas) {
	overflow: auto;
}

:deep(.gjs-pn-devices-c .gjs-pn-btn) {
	display: none;
}

/* :deep(.gjs-pn-devices-c .gjs-pn-btn:nth-child(3)) {
	display: none;
}
:deep(.gjs-pn-devices-c .gjs-pn-btn:nth-child(2)) {
	display: none;
} */
:deep(.gjs-pn-btn) {
	transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.5s;
}


:deep(.gjs-pn-btn:hover) {
	background: rgb(199, 29, 35);
	color: #ddd;
}

:deep(.cm-s-hopscotch.CodeMirror) {
	background-color: white;
	color: black;
}

:deep(.cm-s-hopscotch .CodeMirror-gutters) {
	background: #eee;
	border-right: 0px;
}

:deep(.gjs-cm-editor#gjs-cm-css #gjs-cm-title) {
	color: #804f7b;
}

:deep(.CodeMirror) {
	font-family: consolas;
	height: 300px;
	color: black;
	direction: ltr;
}

:deep(.gjs-layer-name) {
	padding: 8px 0;
	display: inline-block;
	box-sizing: content-box;
	overflow: hidden;
	white-space: nowrap;
	margin: 0 30px 0 15px;
	max-width: 170px;
}

:deep(.gjs-layer-vis) {
	left: 0;
	top: 0;
	padding: 7px 10px 7px 10px;
	position: absolute;
	box-sizing: content-box;
	cursor: pointer;
	width: 20px;
	z-index: 1;
}

#size-setter {
	height: 30px;
	display: inline-block;
}

#size-setter svg {
	vertical-align: middle;
	margin-right: 10px;
	cursor: default;
	border-radius: 3px;
}

#size-setter input {
	vertical-align: middle;
	padding-left: 10px;
	width: 75px;
	border: #c71d23 2px solid;
	color: #c71d23;
	border-radius: 3px;
}

#size-setter span {
	display: inline-block;
	margin: 0 10px;
	font-weight: 700;
	font-family: consolas;
	vertical-align: top;
}

#size-setter button {
	font-weight: 500;
	cursor: pointer;
	padding: 0 10px;
	vertical-align: bottom;
	border: #c71d23 2px solid;
	color: #c71d23;
	border-radius: 5px;
	background: none;
	transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.5s;
}

#size-setter button:hover {
	background: #c71d23;
	color:white;
}

.selected-device svg {
	fill: white;
	background: #c71d23;
	box-shadow: #c71d23 0 0 3px;
}


.unselected-device svg:hover {
	fill: white;
	background: #c71d23;
}

.unselected-device {
	transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.5s;
}

.unselected-device:hover {
	transform: scale(1.3);
}


.unselected-device svg {
	fill: #c71d23;
	transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.5s;

}

.sharebutton {
	margin-left: 20px;
}
</style>