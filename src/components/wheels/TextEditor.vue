<template>
	<div id="editor-wrapper" v-if="editor">
		<!-- 气泡菜单 除了样式不要乱改 -->
		<bubble-menu :editor="editor" class="editor-bubble-menu">
			<div v-if="editor.isActive('codeBlock') === false">
				<button @click="editor.chain().focus().toggleBold().run()"
					:disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
					加粗
				</button>
				<button @click="editor.chain().focus().toggleItalic().run()"
					:disabled="!editor.can().chain().focus().toggleItalic().run()"
					:class="{ 'is-active': editor.isActive('italic') }">
					倾斜
				</button>
				<button @click="editor.chain().focus().toggleStrike().run()"
					:disabled="!editor.can().chain().focus().toggleStrike().run()"
					:class="{ 'is-active': editor.isActive('strike') }">
					划掉
				</button>
				<button @click="editor.chain().focus().toggleUnderline().run()"
					:disabled="!editor.can().chain().focus().toggleUnderline().run()"
					:class="{ 'is-active': editor.isActive('underline') }">
					下划线
				</button>
				<select v-model="selectedFontFamily" @change="changeFont" :style="{ 'font-family': `${selectedFontFamily}` }">
					<option v-for="fontOption in fontOptions" :value="fontOption.value" :key="fontOption.value"
						:style="{ 'font-family': `${fontOption.label}` }">
						{{ fontOption.label }}
					</option>
				</select>
			</div>
		</bubble-menu>
		<!-- 悬浮菜单 -->
		<floating-menu v-if="!editor.isActive('codeBlock')" :editor="editor" class="editor-floating-menu">
			<button @click="editor.chain().focus().toggleTaskList().run()"
				:class="{ 'is-active': editor.isActive('taskList') }">
				{{ editor.isActive('taskList') ? '清除' : '创建' }}任务项
			</button>
			<button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
				h1
			</button>
			<button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
				h2
			</button>
			<button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
				h3
			</button>
			<button @click="editor.chain().focus().toggleCodeBlock().run()"
				:class="{ 'is-active': editor.isActive('codeBlock') }">
				代码块
			</button>
			<button @click="editor.chain().focus().toggleBlockquote().run()"
				:class="{ 'is-active': editor.isActive('blockquote') }">
				块引用
			</button>
			<button @click="editor.chain().focus().setHorizontalRule().run()">
				水平分栏
			</button>
		</floating-menu>
		<!-- 顶部工具栏 -->
		<div class="editor-bar">
			<div class="color-input">
				<input type="color" @input="editor.chain().focus().setColor($event.target.value).run()"
					:value="editor.getAttributes('textStyle').color">
			</div>字体颜色
			<button @click="editor.chain().focus().toggleBold().run()"
				:disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
				加粗
			</button>
			<button @click="editor.chain().focus().toggleItalic().run()"
				:disabled="!editor.can().chain().focus().toggleItalic().run()"
				:class="{ 'is-active': editor.isActive('italic') }">
				倾斜
			</button>
			<button @click="editor.chain().focus().toggleStrike().run()"
				:disabled="!editor.can().chain().focus().toggleStrike().run()"
				:class="{ 'is-active': editor.isActive('strike') }">
				划掉
			</button>
			<button @click="editor.chain().focus().toggleUnderline().run()"
				:disabled="!editor.can().chain().focus().toggleUnderline().run()"
				:class="{ 'is-active': editor.isActive('underline') }">
				下划线
			</button>
			<button @click="editor.chain().focus().toggleCode().run()"
				:disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
				代码碎片
			</button>
			<button @click="editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run()"
				:class="{ 'is-active': editor.isActive('highlight', { color: '#ffc078' }) }">
				橙色强调
			</button>
			<button @click="editor.chain().focus().toggleHighlight({ color: '#8ce99a' }).run()"
				:class="{ 'is-active': editor.isActive('highlight', { color: '#8ce99a' }) }">
				绿色强调
			</button>
			<button @click="editor.chain().focus().toggleHighlight({ color: '#74c0fc' }).run()"
				:class="{ 'is-active': editor.isActive('highlight', { color: '#74c0fc' }) }">
				蓝色强调
			</button>
			<button @click="editor.chain().focus().toggleHighlight({ color: '#b197fc' }).run()"
				:class="{ 'is-active': editor.isActive('highlight', { color: '#b197fc' }) }">
				紫色强调
			</button>
			<button @click="editor.chain().focus().toggleHighlight({ color: '#ce4444' }).run()"
				:class="{ 'is-active': editor.isActive('highlight', { color: '#ce4444' }) }">
				深红色强调
			</button>
			<button @click="editor.chain().focus().toggleHighlight({ color: '#ee9999' }).run()"
				:class="{ 'is-active': editor.isActive('highlight', { color: '#ee9999' }) }">
				浅红色强调
			</button>
			<button @click="editor.chain().focus().setTextAlign('left').run()"
				:class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
				左对齐
			</button>
			<button @click="editor.chain().focus().setTextAlign('center').run()"
				:class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
				居中对齐
			</button>
			<button @click="editor.chain().focus().setTextAlign('right').run()"
				:class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
				右对齐
			</button>
			<button @click="editor.chain().focus().setTextAlign('justify').run()"
				:class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
				两端对齐
			</button>
			<select v-model="selectedFontFamily" @change="changeFont" :style="{ 'font-family': `${selectedFontFamily}` }">
				<option v-for="fontOption in  fontOptions" :value="fontOption.value" :key="fontOption.value"
					:style="{ 'font-family': `${fontOption.label}` }">
					{{ fontOption.label }}
				</option>
			</select>
			<button @click="editor.chain().focus().toggleTaskList().run()"
				:class="{ 'is-active': editor.isActive('taskList') }">
				{{ editor.isActive('taskList') ? '清除' : '创建' }}任务项
			</button>
			<button @click="editor.chain().focus().sinkListItem('taskItem').run()"
				:disabled="!editor.can().sinkListItem('taskItem')">
				降低任务项级别
			</button>
			<button @click="editor.chain().focus().liftListItem('taskItem').run()"
				:disabled="!editor.can().liftListItem('taskItem')">
				抬升任务项级别
			</button>
			<button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
				普通段落
			</button>
			<button @click="editor.chain().focus().unsetAllMarks().run()">
				清除标记
			</button>
			<button @click="editor.chain().focus().clearNodes().run()">
				清除节点
			</button>
			<button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
				h1
			</button>
			<button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
				h2
			</button>
			<button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
				h3
			</button>
			<button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
				h4
			</button>
			<button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
				h5
			</button>
			<button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
				h6
			</button>
			<button @click="editor.chain().focus().toggleBulletList().run()"
				:class="{ 'is-active': editor.isActive('bulletList') }">
				bullet list
			</button>
			<button @click="editor.chain().focus().toggleOrderedList().run()"
				:class="{ 'is-active': editor.isActive('orderedList') }">
				ordered list
			</button>
			<button ref="a" @click="editor.chain().focus().toggleCodeBlock().run()"
				:class="{ 'is-active': editor.isActive('codeBlock') }">
				代码块
			</button>
			<button @click="editor.chain().focus().toggleBlockquote().run()"
				:class="{ 'is-active': editor.isActive('blockquote') }">
				块引用
			</button>
			<button @click="editor.chain().focus().setHorizontalRule().run()">
				水平分栏
			</button>
			<button @click="editor.chain().focus().setHardBreak().run()">
				hard break
			</button>
			<button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
				撤销
			</button>
			<button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
				重做
			</button>
			<button @click="switchFullScreen">
				{{ fullScreen ? '退出全屏模式' : '进入全屏模式' }}
			</button>
			<button @click="exportAsPDF">保存为PDF</button>
			<button @click="exportAsWord">保存为Word</button>
			<button @click="saveDocument">保存到云端</button>
		</div>
		<editor-content :editor="editor" id="document-content" />
		<div class="document-words">
			{{ editor.storage.characterCount.words() }} 个单词
			<div class="document-characters">{{ editor.storage.characterCount.characters() }} / {{ docLimit }} 个字符</div>
		</div>

	</div>
</template>

<script>
import StarterKit from '@tiptap/starter-kit'
import CharactorCount from '@tiptap/extension-character-count'
import Document from '@tiptap/extension-document'
import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import Typography from '@tiptap/extension-typography'//实时渲染markdown
import Highlight from '@tiptap/extension-highlight'//文本高亮
import Placeholder from '@tiptap/extension-placeholder'
import { Color } from '@tiptap/extension-color'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import { lowlight } from 'lowlight'//代码高亮
import CodeBlockLowLight from '@tiptap/extension-code-block-lowlight'//代码高亮
import { Editor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/vue-3'
//协作重要插件
import * as Y from 'yjs'
import { HocuspocusProvider } from '@hocuspocus/provider'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
//将文档下载到本地
import exportWord from 'js-export-word'
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
	name: 'TextEditor',
	components: {
		EditorContent,
		BubbleMenu,
		FloatingMenu
	},

	data() {
		return {
			userName: 'tempUser',
			userAvatar: '/src/assets/avatar.jpeg',
			docId: 1,
			docName: 'temp',
			docContent: '',
			docLimit: 100000,
			autoSavePeriod: 10000,
			fullScreen: false,
			editor: undefined,
			provider: undefined,
			selectedFontFamily: 'sans-serif',
			selectedFontSize: '',
			fontOptions: [
				{ value: 'consolas', label: 'consolas' },
				{ value: 'monospace', label: 'monospace' },
				{ value: 'cascadia code', label: 'cascadia code' },
				{ value: 'Arial', label: 'Arial' },
				{ value: 'Courier', label: 'Courier' },
				{ value: 'Courier new', label: 'Courier new' },
				{ value: 'PingFang SC', label: 'PingFang SC' },
				{ value: 'sans-serif', label: 'sans-serif' },
				{ value: 'Inter', label: 'Inter' },
				{ value: 'Comic Sans MS, Comic Sans', label: 'Comic Sans' },
				{ value: 'serif', label: 'serif' },
				{ value: 'monospace', label: 'monospace' },
				{ value: 'cursive', label: 'cursive' },
				{ value: 'Times New Roman', label: 'Times New Roman' }
			],
		}
	},
	methods: {
		//为协作光标获取随机颜色
		getRandomColor() {
			const letters = '0123456789ABCDEF';
			let color = '#';

			for (let i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			return color;
		},
		//更改字体
		changeFont() {
			this.editor.chain().focus().setFontFamily(this.selectedFontFamily || 'unset').run()
		},
		exportAsPDF() {
			let page = document.querySelector('#document-content')
			const docName = this.docName
			let pageWidth = page.offsetWidth//page宽度
			let pageHeight = page.offsetHeight//page高度
			let pageTop = page.offsetTop//到顶部距离
			let pageLeft = page.offsetLeft//到左端距离

			let canvas = document.createElement("canvas")
			let abs = 0

			let innerWidth = document.documentElement.clientWidth || document.body.clientWidth // 获得当前可视窗口的宽度（不包含滚动条）
			let outerWidth = window.innerWidth // 获得当前窗口的宽度（包含滚动条）
			if (outerWidth > innerWidth) {
				abs = (outerWidth - innerWidth) / 2    // 获得滚动条宽度的一半
			}
			canvas.width = pageWidth * 2   // 将画布宽高放大为page两倍
			canvas.height = pageHeight * 2

			let context = canvas.getContext("2d")
			context.scale(2, 2)
			context.translate(-pageLeft - abs, -pageTop)

			html2canvas(page, {
				dpi: 300,
				useCORS: true  //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。
			}).then((canvas) => {
				let pdf = new JsPDF('p', 'mm', 'a4')    //A4纸，纵向
				let ctx = canvas.getContext('2d')
				let a4w = 190, a4h = 277    //A4大小，210mm x 297mm，四边各保留10mm的边距，显示区域190x277
				let imgHeight = Math.floor(a4h * canvas.width / a4w)    //按A4显示比例换算一页图像的像素高度
				let renderedHeight = 0

				while (renderedHeight < canvas.height) {
					let page = document.createElement("canvas")
					page.width = canvas.width
					page.height = Math.min(imgHeight, canvas.height - renderedHeight)//可能内容不足一页
					//用getImageData剪裁指定区域，并画到前面创建的canvas对象中
					page.getContext('2d').putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0)
					pdf.addImage(page.toDataURL('image/jpeg', 1.0), 'JPEG', 10, 10, a4w, Math.min(a4h, a4w * page.height / page.width))    //添加图像到页面，保留10mm边距
					renderedHeight += imgHeight
					if (renderedHeight < canvas.height)
						pdf.addPage()//如果后面还有内容，添加一个空页
				}

				pdf.save(docName)
			}).then(() => {
				alert('成功保存为PDF')
			})
		},
		exportAsWord() {
			exportWord(document.querySelector('#document-content'), {
				addStyle: true,
				fileName: this.docName,
				// toImg: [],
				// success() {}
			})
		},
		switchFullScreen() {
			if (document.fullscreenElement === null) {
				document.getElementById('editor-wrapper').requestFullscreen()
				console.log('进入全屏')
				this.fullScreen = true
			} else {
				document.exitFullscreen()
				console.log('退出全屏')
				this.fullScreen = false
			}
		},
		saveDocument(mode = undefined) {
			let formData = new FormData()
			console.log(this.editor.getHTML());
			formData.append('document_content', this.editor.getHTML())
			this.$http.post(`/api/projects/file/${this.docId}/`, formData).then(() => {
				if (mode !== undefined) {
					alert('自动保存成功')
				}
				else {
					alert('保存成功')
				}
			})
		}
	},
	mounted() {
		this.yDOC = new Y.Doc()
		this.provider = new HocuspocusProvider({
			url: 'wss://summer.super2021.com/ws',
			//文档的标识对应一个 yDoc 属性
			name: this.docId,
			document: this.yDOC,
		})
		this.editor = new Editor({
			extensions: [
				Document,
				StarterKit.configure({
					history: false//使用collaboration的history
				}),
				CharactorCount.configure({
					limit: this.docLimit
				}),
				Collaboration.configure({
					document: this.yDOC
				}),
				CollaborationCursor.configure({
					provider: this.provider,
					user: {
						name: this.userName,
						color: this.getRandomColor(),
						avatar: this.userAvatar
					}
				}),
				Typography,
				Underline,
				Color,
				FontFamily,
				TaskList,
				TaskItem.configure({
					nested: true,
				}),
				Text,
				TextStyle,
				TextAlign.configure({
					types: ['heading', 'paragraph'],
				}),
				CodeBlockLowLight.configure({
					lowlight,
				}),
				Placeholder.configure(
					{
						placeholder: ({ node }) => {
							return '从这里开始编写文档'
						}
					}
				),
				Highlight.configure({
					multicolor: true
				})
			],
			content: '',
			onSelectionUpdate: () => {
				let selected = window.getSelection()
				if (selected.rangeCount !== 0) {
					let range = selected.getRangeAt(0)
					let node = range.commonAncestorContainer
					if (node.nodeType != 1) {
						node = node.parentNode
					}
					this.selectedFontSize = window.getComputedStyle(node).getPropertyValue('font-size')
					this.selectedFontFamily = window.getComputedStyle(node).getPropertyValue('font-family')
				}
			}
		})
		setInterval(() => {
			this.saveDocument('autosave')
		}, this.autoSavePeriod)
	},
	beforeUnmount() {
		this.editor.destroy()
		this.provider.destroy()
	},
}
</script>

<style>
::selection {
	background: lightgray;
}

/* 最外层盒子 */
#editor-wrapper {
	position: relative;
	margin: 0 10px;
	background: white;
}

/* 颜色选择按钮样式 */
.color-input {
	padding: 3px 5px;
	margin: 3px 5px;
	display: inline-block;
	/* border-radius: 30px;
	overflow: hidden; */
	vertical-align: middle;
}

.color-input input {
	width: 30px;
	height: 30px;
}

/* 气泡菜单样式 */
.editor-bubble-menu {
	border-radius: 5px;
	background: #616161;
	width: fit-content;
	white-space: nowrap;
}

.editor-floating-menu {
	border-radius: 5px;
	background: #777;
	width: fit-content;
	white-space: nowrap;
}

/* 气泡菜单按钮样式 */
.editor-bubble-menu button {
	padding: 3px 5px;
	margin: 3px 5px;
	border-radius: 2px;
	background: #ddd;
	color: #616161;
	transition: all linear 0.2s;
	cursor: pointer;
}

.editor-floating-menu button {
	padding: 3px 5px;
	margin: 3px 5px;
	border-radius: 2px;
	background: #ddd;
	color: #616161;
	transition: all linear 0.2s;
	cursor: pointer;
}

/* 工具栏按钮样式 */
.editor-bar button {
	border-radius: 3px;
	background: #ddd;
	color: #616161;
	padding: 5px 10px;
	margin: 5px 10px;
	transition: all linear 0.2s;
	cursor: pointer;
}

.editor-bar button:hover {
	transform: scale(1.05);
}

.editor-bubble-menu button:hover {
	transform: scale(1.05);
}

/* 加粗等按钮为激活状态时的样式 */
.editor-bar button.is-active {
	background: #616161;
	color: #ddd;
	font-weight: 700;
}

.editor-bar button[disabled="true"] {
	opacity: 0.5;
}

/* 文档字数和单词统计 */
.document-words {
	position: sticky;
	bottom: 0;
	left: 0;
}

.document-characters {
	position: sticky;
	bottom: 0;
	left: 0;
}

/* 编辑器内容区 */
#document-content {
	padding: 20px 0;
}


.ProseMirror {
	padding: 20px;
	line-height: 2;
	border-radius: 5px;
	margin-top: 25px;
	background: #ccc;
	white-space: normal;
	transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.5s;
}

.ProseMirror:hover {
	box-shadow: #666 3px 3px 3px 3px;
	background: #ddd;
	outline: #616161 1px solid;
	margin-top: 10px;
	transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.5s;
}

.ProseMirror:focus {
	margin-top: 0;
	box-shadow: #666 5px 5px 5px 5px;
	background: #fff;
	outline: #616161 5px solid;
	transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.7s;
}


/* 加粗样式 */
.ProseMirror strong {
	font-weight: 700;
}

/* 倾斜样式 */
.ProseMirror em {
	font-style: italic;
}

/* 划掉样式 */
.ProseMirror s {
	text-decoration: line-through;
}

/* 下划线样式 */
.ProseMirror u {
	text-decoration: underline;
}


/* 一坨任务项样式 */
.ProseMirror ul[data-type="taskList"] {
	list-style: none;
	padding: 0;
}

.ProseMirror ul[data-type="taskList"] p {
	margin: 0;
}

.ProseMirror ul[data-type="taskList"] li {
	display: flex;
}

.ProseMirror ul[data-type="taskList"] li>label {
	flex: 0 0 auto;
	margin-right: 0.5rem;
	user-select: none;
}

.ProseMirror ul[data-type="taskList"] li div {
	flex: 1 1 auto;
}

.ProseMirror ul[data-type="taskList"] li ul li,
.ProseMirror ul[data-type="taskList"] li ol li {
	display: list-item;
}

.ProseMirror ul[data-type="taskList"] li ul[data-type="taskList"]>li {
	display: flex;
}

/* 各级标题 */
.ProseMirror h1,
.ProseMirror h1 span {
	font-size: 45px;
}

.ProseMirror h2,
.ProseMirror h2 span {
	font-size: 37px;
}

.ProseMirror h3,
.ProseMirror h3 span {
	font-size: 30px;
}

.ProseMirror h4,
.ProseMirror h4 span {
	font-size: 25px;
}

.ProseMirror h5,
.ProseMirror h5 span {
	font-size: 20px;
}

.ProseMirror h6,
.ProseMirror h6 span {
	font-size: 18px;
}

.ProseMirror h1,
.ProseMirror h2,
.ProseMirror h3,
.ProseMirror h4,
.ProseMirror h5,
.ProseMirror h6 {
	font-weight: 700;
}

/* placeholder样式 */
.tiptap p.is-editor-empty:first-child::before {
	color: #adb5bd;
	content: attr(data-placeholder);
	float: left;
	height: 0;
	pointer-events: none;
}

/* 块引用 */
.ProseMirror blockquote {
	display: inline-block;
	padding-left: 1rem;
	border-left: 3px solid #888;
}

/* 代码碎片文字样式 */
.ProseMirror code {
	font-size: 0.9em;
	padding: 0.25em;
	margin: 0 0.25em;
	border-radius: 0.25em;
	background: #ccc;
	color: #616161;
	font-family: monoca, cascadia code, monospace;
	box-decoration-break: clone;
}

.ProseMirror pre {
	background: #0D0D0D;
	color: #FFF;
	font-family: 'JetBrainsMono', monospace;
	padding: 0.75rem 1rem;
	border-radius: 0.5rem;
}


.ProseMirror pre code {
	color: inherit;
	padding: 0;
	background: none;
	font-size: 0.8rem;
}

/* 代码块样式 */
.ProseMirror .hljs-comment,
.ProseMirror .hljs-quote {
	color: #616161;
}

.ProseMirror .hljs-variable,
.ProseMirror .hljs-template-variable,
.ProseMirror .hljs-attribute,
.ProseMirror .hljs-tag,
.ProseMirror .hljs-name,
.ProseMirror .hljs-regexp,
.ProseMirror .hljs-link,
.ProseMirror .hljs-name,
.ProseMirror .hljs-selector-id,
.ProseMirror .hljs-selector-class {
	color: #F98181;
}

.ProseMirror .hljs-number,
.ProseMirror .hljs-meta,
.ProseMirror .hljs-built_in,
.ProseMirror .hljs-builtin-name,
.ProseMirror .hljs-literal,
.ProseMirror .hljs-type,
.ProseMirror .hljs-params {
	color: #FBBC88;
}

.ProseMirror .hljs-string,
.ProseMirror .hljs-symbol,
.ProseMirror hljs-bullet {
	color: #B9F18D;
}

.ProseMirror .hljs-title,
.ProseMirror .hljs-section {
	color: #FAF594;
}

.ProseMirror .hljs-keyword,
.ProseMirror .hljs-selector-tag {
	color: #70CFF8;
}

.ProseMirror .hljs-emphasis {
	font-style: italic;
}

.ProseMirror .hljs-strong {
	font-weight: 700;
}

.ProseMirror img {
	max-width: 100%;
	height: auto;
}

.ProseMirror blockquote {
	padding-left: 1rem;
	border-left: 2px solid rgba(#0D0D0D, 0.1);
}

.ProseMirror hr {
	border: 2px solid rgba(#555);
	margin: 2rem 0;
}
</style>