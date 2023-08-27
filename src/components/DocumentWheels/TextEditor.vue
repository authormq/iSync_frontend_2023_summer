<!-- 文本编辑器 -->
<template>
	<div id="editor-wrapper" v-if="editor">
		<!-- 气泡菜单 除了样式不要乱改 -->
		<bubble-menu :editor="editor" class="editor-bubble-menu">
			<div v-if="editor.isActive('codeBlock') === false">
				<button @click="editor.chain().focus().toggleBold().run()"
					:disabled="!editor.can().chain().focus().toggleBold().run()"
					:class="{ 'is-active': editor.isActive('bold') }">
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
				<select v-model="selectedFontFamily" @change="changeFont"
					:style="{ 'font-family': `${selectedFontFamily}` }">
					<option v-for="fontOption in fontOptions" :value="fontOption.value" :key="fontOption.value"
						:style="{ 'font-family': `${fontOption.label}` }">
						{{ fontOption.label }}
					</option>
				</select>
			</div>
		</bubble-menu>
		<!-- 悬浮菜单 -->
		<floating-menu :editor="editor" class="editor-floating-menu">
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
			<button @click="editable = !editable" :class="{ 'is-active': editable }">
				编辑模式
			</button>
			<!-- 加粗 B -->
			<button @click="editor.chain().focus().toggleBold().run()"
				:disabled="!editor.can().chain().focus().toggleBold().run()"
				:class="{ 'is-active': editor.isActive('bold') }">
				<svg t="1693059449497" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2491" width="15" height="15"><path d="M195.047619 914.285714v-73.142857h73.142857v-658.285714H195.047619v-73.142857h438.857143v1.340952c102.521905 11.337143 182.857143 93.208381 182.857143 193.706667 0 62.902857-31.451429 118.491429-80.11581 154.087619 76.873143 41.910857 128.877714 120.783238 128.877715 211.626666 0 127.24419-102.009905 231.033905-231.594667 242.712381L633.904762 914.285714H195.047619z m414.476191-414.47619H341.333333v341.333333h268.190477c101.424762 0 182.857143-76.897524 182.857142-170.666667s-81.432381-170.666667-182.857142-170.666666z m0-316.952381H341.333333v243.809524h268.190477l5.558857-0.097524c72.021333-2.681905 128.536381-56.783238 128.536381-121.807238 0-66.706286-59.465143-121.904762-134.095238-121.904762z" p-id="2492"></path></svg>
			</button>
			<!-- 斜体 I -->
			<button @click="editor.chain().focus().toggleItalic().run()"
				:disabled="!editor.can().chain().focus().toggleItalic().run()"
				:class="{ 'is-active': editor.isActive('italic') }">
				<svg t="1693059386616" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2334" width="15" height="15"><path d="M760.198095 97.52381v73.142857h-127.804952l-189.464381 707.047619h146.627048v73.142857H243.809524v-73.142857h123.392l189.44-707.047619H414.47619V97.52381h345.721905z" p-id="2335"></path></svg>
			</button>
			<!-- 删除线 -->
			<button @click="editor.chain().focus().toggleStrike().run()"
				:disabled="!editor.can().chain().focus().toggleStrike().run()"
				:class="{ 'is-active': editor.isActive('strike') }">
				<svg t="1693059874309" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3819" width="15" height="15"><path d="M756.037818 539.624727c61.998545 40.634182 93.486545 96.977455 93.486546 169.053091 0 71.493818-30.487273 128.954182-90.274909 171.194182-57.437091 39.796364-133.632 59.764364-228.584728 59.764364-96.116364 0-172.334545-22.272-227.421091-65.629091-63.301818-50.408727-98.443636-126.650182-105.495272-227.421091h70.330181c8.215273 78.498909 35.165091 137.146182 82.059637 175.825454 42.193455 34.001455 102.004364 51.595636 179.362909 51.595637 73.844364 0 133.632-15.290182 179.339636-43.426909 44.544-29.253818 68.002909-69.12 68.002909-118.365091 0-57.437091-29.323636-101.981091-85.597091-133.632-18.338909-10.705455-50.641455-23.901091-97.256727-38.958546H221.090909a34.909091 34.909091 0 0 1 0-69.818182h145.105455c-22.853818-8.448-39.959273-15.965091-51.2-22.528-64.512-36.328727-96.162909-89.088-96.162909-157.044363 0-72.680727 29.323636-127.790545 90.298181-166.469818C363.008 87.412364 433.338182 69.818182 517.748364 69.818182c91.461818 0 164.119273 22.272 218.018909 66.816 55.109818 44.544 86.760727 110.173091 93.789091 196.957091h-71.517091c-9.355636-65.629091-33.978182-114.874182-73.844364-148.875637-39.866182-34.001455-96.116364-50.408727-168.797091-50.408727-68.002909 0-120.738909 11.729455-159.418182 35.141818-44.544 25.832727-65.629091 65.675636-65.629091 118.411637 0 46.917818 25.762909 83.223273 78.49891 111.36 24.669091 11.729455 78.545455 30.510545 160.628363 53.922909 20.014545 5.725091 38.772364 11.264 56.32 16.663272H826.181818a34.909091 34.909091 0 0 1 0 69.818182h-70.144z" p-id="3820"></path></svg>
			</button>
			<!-- 下划线 -->
			<button @click="editor.chain().focus().toggleUnderline().run()"
				:disabled="!editor.can().chain().focus().toggleUnderline().run()"
				:class="{ 'is-active': editor.isActive('underline') }">
				<svg t="1693059944194" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4797" width="15" height="15"><path d="M360.423619 85.333333v73.142857H280.380952v319.561143c0 118.662095 99.718095 215.942095 224.889905 219.331048l6.729143 0.097524c128.292571 0 231.619048-98.645333 231.619048-219.428572V158.47619H658.285714v-73.142857h238.518857v73.142857H816.761905v319.561143c0 159.50019-132.705524 288.597333-297.155048 292.473905l-7.606857 0.097524c-167.936 0-304.761905-130.608762-304.761905-292.571429V158.47619H121.904762v-73.142857h238.518857zM170.666667 902.095238h685.007238v-73.142857H170.666667v73.142857z" p-id="4798"></path></svg>
			</button>
			<!-- 行内代码 -->
			<button @click="editor.chain().focus().toggleCode().run()"
				:disabled="!editor.can().chain().focus().toggleCode().run()"
				:class="{ 'is-active': editor.isActive('code') }">
				<svg t="1693060809541" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14588" width="15" height="15"><path d="M320 320L256 256 0 512.64 256 768l64-64-192-192 192-192zM768 256l-64 64 192 192-192 192 64 64 256-255.36L768 256zM353.28 896h96l224-768h-96l-224 768z" fill="#262626" p-id="14589"></path></svg>
			</button>
			<!-- 代码块 -->
			<button ref="a" @click="editor.chain().focus().toggleCodeBlock().run()"
				:class="{ 'is-active': editor.isActive('codeBlock') }">
				<svg t="1693060851190" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14739" width="15" height="15"><path d="M213.344 192v213.344c0 32-66.144 64-85.344 64v85.344c19.2 0 85.344 32 85.344 64v213.344A105.6 105.6 0 0 0 320 938.688h85.344v-85.344H320c-12.8 0-21.344-8.544-21.344-21.344v-213.344c0-44.8-27.744-81.056-59.744-106.656 34.144-25.6 59.744-61.856 59.744-106.656V192c0-12.8 8.544-21.344 21.344-21.344h85.344V85.312H320a105.6 105.6 0 0 0-106.656 106.656zM810.656 405.344V192A105.6 105.6 0 0 0 704 85.344h-85.344v85.344H704c12.8 0 21.344 8.544 21.344 21.344v213.344c0 44.8 27.744 81.056 59.744 106.656-34.144 25.6-59.744 61.856-59.744 106.656v213.344c0 12.8-8.544 21.344-21.344 21.344h-85.344v85.344H704a105.6 105.6 0 0 0 106.656-106.656v-213.344c0-32 66.144-64 85.344-64v-85.344c-19.2 0-85.344-32-85.344-64z" p-id="14740"></path></svg>
			</button>
			<!-- 橙色强调 #ffc078 -->
			<button @click="editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run()"
				:class="{ 'is-active': editor.isActive('highlight', { color: '#ffc078' }) }">
				<svg t="1693060307610" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13261" width="20" height="20"><path d="M1016.525 493.875c-9.984-9.984-26.215-9.984-36.199 0L796.723 677.478c-29.952 29.952-78.694 29.952-108.595 0L448.922 438.272c-14.439-14.438-22.375-33.69-22.375-54.323s7.936-39.885 22.375-54.323l183.603-183.604c9.984-9.984 9.984-26.214 0-36.198s-26.215-9.984-36.199 0L412.723 293.427c-24.115 24.115-37.376 56.218-37.376 90.522 0 14.592 2.458 28.825 7.066 42.189L7.526 801.024C2.714 805.837 0.051 812.339 0.051 819.149v76.8c0 14.131 11.469 25.6 25.6 25.6h486.4c6.81 0 13.312-2.714 18.125-7.475l170.086-170.087c13.364 4.66 27.597 7.066 42.19 7.066 34.252 0 66.406-13.261 90.52-37.376l183.604-183.603c9.984-9.984 9.984-26.215 0-36.199zM501.402 870.4H51.2v-40.602l358.502-358.502c1.024 1.075 1.997 2.15 3.021 3.174L651.93 713.677a88.439 88.439 0 0 0 3.174 3.02L501.402 870.4z" p-id="13262" fill="#ffc178"></path></svg>
			</button>
			<!-- 绿色强调 #8ce99a -->
			<button @click="editor.chain().focus().toggleHighlight({ color: '#8ce99a' }).run()"
				:class="{ 'is-active': editor.isActive('highlight', { color: '#8ce99a' }) }">
				<svg t="1693060307610" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13261" width="20" height="20"><path d="M1016.525 493.875c-9.984-9.984-26.215-9.984-36.199 0L796.723 677.478c-29.952 29.952-78.694 29.952-108.595 0L448.922 438.272c-14.439-14.438-22.375-33.69-22.375-54.323s7.936-39.885 22.375-54.323l183.603-183.604c9.984-9.984 9.984-26.214 0-36.198s-26.215-9.984-36.199 0L412.723 293.427c-24.115 24.115-37.376 56.218-37.376 90.522 0 14.592 2.458 28.825 7.066 42.189L7.526 801.024C2.714 805.837 0.051 812.339 0.051 819.149v76.8c0 14.131 11.469 25.6 25.6 25.6h486.4c6.81 0 13.312-2.714 18.125-7.475l170.086-170.087c13.364 4.66 27.597 7.066 42.19 7.066 34.252 0 66.406-13.261 90.52-37.376l183.604-183.603c9.984-9.984 9.984-26.215 0-36.199zM501.402 870.4H51.2v-40.602l358.502-358.502c1.024 1.075 1.997 2.15 3.021 3.174L651.93 713.677a88.439 88.439 0 0 0 3.174 3.02L501.402 870.4z" p-id="13262" fill="#8ce99a"></path></svg>
			</button>
			<!-- 蓝色强调 #74c0fc -->
			<button @click="editor.chain().focus().toggleHighlight({ color: '#74c0fc' }).run()"
				:class="{ 'is-active': editor.isActive('highlight', { color: '#74c0fc' }) }">
				<svg t="1693060307610" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13261" width="20" height="20"><path d="M1016.525 493.875c-9.984-9.984-26.215-9.984-36.199 0L796.723 677.478c-29.952 29.952-78.694 29.952-108.595 0L448.922 438.272c-14.439-14.438-22.375-33.69-22.375-54.323s7.936-39.885 22.375-54.323l183.603-183.604c9.984-9.984 9.984-26.214 0-36.198s-26.215-9.984-36.199 0L412.723 293.427c-24.115 24.115-37.376 56.218-37.376 90.522 0 14.592 2.458 28.825 7.066 42.189L7.526 801.024C2.714 805.837 0.051 812.339 0.051 819.149v76.8c0 14.131 11.469 25.6 25.6 25.6h486.4c6.81 0 13.312-2.714 18.125-7.475l170.086-170.087c13.364 4.66 27.597 7.066 42.19 7.066 34.252 0 66.406-13.261 90.52-37.376l183.604-183.603c9.984-9.984 9.984-26.215 0-36.199zM501.402 870.4H51.2v-40.602l358.502-358.502c1.024 1.075 1.997 2.15 3.021 3.174L651.93 713.677a88.439 88.439 0 0 0 3.174 3.02L501.402 870.4z" p-id="13262" fill="#74c0fc"></path></svg>
			</button>
			<!-- 紫色强调 #b197fc -->
			<button @click="editor.chain().focus().toggleHighlight({ color: '#b197fc' }).run()"
				:class="{ 'is-active': editor.isActive('highlight', { color: '#b197fc' }) }">
				<svg t="1693060307610" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13261" width="20" height="20"><path d="M1016.525 493.875c-9.984-9.984-26.215-9.984-36.199 0L796.723 677.478c-29.952 29.952-78.694 29.952-108.595 0L448.922 438.272c-14.439-14.438-22.375-33.69-22.375-54.323s7.936-39.885 22.375-54.323l183.603-183.604c9.984-9.984 9.984-26.214 0-36.198s-26.215-9.984-36.199 0L412.723 293.427c-24.115 24.115-37.376 56.218-37.376 90.522 0 14.592 2.458 28.825 7.066 42.189L7.526 801.024C2.714 805.837 0.051 812.339 0.051 819.149v76.8c0 14.131 11.469 25.6 25.6 25.6h486.4c6.81 0 13.312-2.714 18.125-7.475l170.086-170.087c13.364 4.66 27.597 7.066 42.19 7.066 34.252 0 66.406-13.261 90.52-37.376l183.604-183.603c9.984-9.984 9.984-26.215 0-36.199zM501.402 870.4H51.2v-40.602l358.502-358.502c1.024 1.075 1.997 2.15 3.021 3.174L651.93 713.677a88.439 88.439 0 0 0 3.174 3.02L501.402 870.4z" p-id="13262" fill="#b197fc"></path></svg>
			</button>
			<!-- 深红色强调 #cd4444 -->
			<button @click="editor.chain().focus().toggleHighlight({ color: '#ce4444' }).run()"
				:class="{ 'is-active': editor.isActive('highlight', { color: '#ce4444' }) }">
				<svg t="1693060307610" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13261" width="20" height="20"><path d="M1016.525 493.875c-9.984-9.984-26.215-9.984-36.199 0L796.723 677.478c-29.952 29.952-78.694 29.952-108.595 0L448.922 438.272c-14.439-14.438-22.375-33.69-22.375-54.323s7.936-39.885 22.375-54.323l183.603-183.604c9.984-9.984 9.984-26.214 0-36.198s-26.215-9.984-36.199 0L412.723 293.427c-24.115 24.115-37.376 56.218-37.376 90.522 0 14.592 2.458 28.825 7.066 42.189L7.526 801.024C2.714 805.837 0.051 812.339 0.051 819.149v76.8c0 14.131 11.469 25.6 25.6 25.6h486.4c6.81 0 13.312-2.714 18.125-7.475l170.086-170.087c13.364 4.66 27.597 7.066 42.19 7.066 34.252 0 66.406-13.261 90.52-37.376l183.604-183.603c9.984-9.984 9.984-26.215 0-36.199zM501.402 870.4H51.2v-40.602l358.502-358.502c1.024 1.075 1.997 2.15 3.021 3.174L651.93 713.677a88.439 88.439 0 0 0 3.174 3.02L501.402 870.4z" p-id="13262" fill="#cd4444"></path></svg>
			</button>
			<!-- 浅红色强调 #ee9999-->
			<button @click="editor.chain().focus().toggleHighlight({ color: '#ee9999' }).run()"
				:class="{ 'is-active': editor.isActive('highlight', { color: '#ee9999' }) }">
				<svg t="1693060307610" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13261" width="20" height="20"><path d="M1016.525 493.875c-9.984-9.984-26.215-9.984-36.199 0L796.723 677.478c-29.952 29.952-78.694 29.952-108.595 0L448.922 438.272c-14.439-14.438-22.375-33.69-22.375-54.323s7.936-39.885 22.375-54.323l183.603-183.604c9.984-9.984 9.984-26.214 0-36.198s-26.215-9.984-36.199 0L412.723 293.427c-24.115 24.115-37.376 56.218-37.376 90.522 0 14.592 2.458 28.825 7.066 42.189L7.526 801.024C2.714 805.837 0.051 812.339 0.051 819.149v76.8c0 14.131 11.469 25.6 25.6 25.6h486.4c6.81 0 13.312-2.714 18.125-7.475l170.086-170.087c13.364 4.66 27.597 7.066 42.19 7.066 34.252 0 66.406-13.261 90.52-37.376l183.604-183.603c9.984-9.984 9.984-26.215 0-36.199zM501.402 870.4H51.2v-40.602l358.502-358.502c1.024 1.075 1.997 2.15 3.021 3.174L651.93 713.677a88.439 88.439 0 0 0 3.174 3.02L501.402 870.4z" p-id="13262" fill="#ee9999"></path></svg>
			</button>
			<!-- 左对齐 -->
			<button @click="editor.chain().focus().setTextAlign('left').run()"
				:class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
				<svg t="1693060081222" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5924" width="15" height="15"><path d="M120 230h496c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zM120 654h496c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zM904 794H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM904 370H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z" p-id="5925"></path></svg>
			</button>
			<!-- 居中对齐 -->
			<button @click="editor.chain().focus().setTextAlign('center').run()"
				:class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
				<svg t="1693060101159" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6079" width="15" height="15"><path d="M264 230h496c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H264c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zM760 654c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H264c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496zM904 794H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM904 370H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z" p-id="6080"></path></svg>
			</button>
			<!-- 右对齐 -->
			<button @click="editor.chain().focus().setTextAlign('right').run()"
				:class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
				<svg t="1693060134407" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6234" width="15" height="15"><path d="M904 158H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM904 582H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM904 794H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM904 370H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z" p-id="6235"></path></svg>
			</button>
			<!-- 两端对齐 -->
			<button @click="editor.chain().focus().setTextAlign('justify').run()"
				:class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
				<svg t="1693060195477" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7241" width="15" height="15"><path d="M0 93.090909h1024v93.137455H0z" fill="#231815" p-id="7242"></path><path d="M0 332.334545h1024v93.09091H0z" fill="#231815" p-id="7243"></path><path d="M0 810.821818h1024v93.090909H0z" fill="#231815" p-id="7244"></path><path d="M0 571.578182h1024v93.090909H0z" fill="#231815" p-id="7245"></path></svg>
			</button>
			<select class="font-select" v-model="selectedFontFamily" @change="changeFont" :style="{ 'font-family': `${selectedFontFamily}` }">
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
			<button @click="editor.chain().focus().setParagraph().run()"
				:class="{ 'is-active': editor.isActive('paragraph') }">
				普通段落
			</button>
			<!-- 清除标记 -->
			<button @click="editor.chain().focus().unsetAllMarks().run()">
				<svg t="1693060935327" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15726" width="15" height="15"><path d="M667.257905 139.873524l3.85219 3.632762 252.903619 254.537143a73.142857 73.142857 0 0 1 0 103.107047L604.501333 822.686476H828.952381v73.142857H266.532571l-172.129523-173.226666a73.142857 73.142857 0 0 1 0-103.131429L567.344762 143.530667a73.142857 73.142857 0 0 1 99.913143-3.632762zM227.181714 589.604571L146.285714 671.036952l150.674286 151.649524h163.303619l-233.081905-233.081905zM619.227429 195.047619L278.747429 537.721905l253.70819 253.70819 339.675429-341.820952L619.227429 195.047619z" p-id="15727"></path></svg>
			</button>
			<button @click="editor.chain().focus().clearNodes().run()">
				清除节点
			</button>
			<!-- h1 -->
			<button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
				<svg t="1693061041243" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1321" width="20" height="20"><path d="M584.9 445.3V142.6h86.5v735h-86.5V531.7H152.5v345.9H66.1v-735h86.5v302.6l432.3 0.1zM843.7 877.6v-0.3h-79.8V826h79.8V558.6c-22.5 23.4-49.9 40.4-79.8 49.3v-59.1c17.2-5.2 33.8-12.9 49.1-23 16.2-10.6 30.9-23.7 43.9-38.9h39.9V826h61.7v51.3h-61.7v0.3h-53.1z" p-id="1322"></path></svg>
			</button>
			<!-- h2 -->
			<button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
				<svg t="1693061118323" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1479" width="20" height="20"><path d="M88 448h400V172c0-24.3 19.7-44 44-44s44 19.7 44 44v680c0 24.3-19.7 44-44 44s-44-19.7-44-44V536H88v316c0 24.3-19.7 44-44 44S0 876.3 0 852V172c0-24.3 19.7-44 44-44s44 19.7 44 44v276z m935.282 448H680c0.479-41.591 10.533-77.923 30.163-108.997 19.63-31.074 46.44-58.084 80.434-81.031 16.279-11.952 33.275-23.544 50.99-34.779 17.714-11.234 33.993-23.305 48.835-36.213 14.842-12.907 27.05-26.89 36.626-41.95 9.576-15.058 14.603-32.388 15.081-51.988 0-9.083-1.077-18.764-3.231-29.042-2.155-10.278-6.344-19.84-12.568-28.683-6.224-8.845-14.842-16.254-25.854-22.23-11.012-5.976-25.375-8.964-43.09-8.964-16.278 0-29.803 3.227-40.576 9.68-10.772 6.455-19.39 15.299-25.854 26.533-6.463 11.235-11.251 24.5-14.363 39.798-3.112 15.298-4.908 31.791-5.386 49.48h-81.87c0-27.728 3.71-53.423 11.13-77.087 7.422-23.664 18.553-44.101 33.395-61.311 14.842-17.21 32.916-30.715 54.222-40.516 21.305-9.8 46.081-14.7 74.33-14.7 30.641 0 56.255 5.02 76.843 15.059 20.587 10.04 37.224 22.707 49.912 38.005 12.688 15.298 21.665 31.91 26.931 49.838 5.267 17.927 7.9 35.018 7.9 51.272 0 20.078-3.112 38.244-9.336 54.498-6.224 16.254-14.603 31.193-25.136 44.818-10.533 13.625-22.502 26.174-35.908 37.647a538.302 538.302 0 0 0-41.653 32.27 1122.27 1122.27 0 0 0-43.09 28.683c-14.364 9.083-27.65 18.166-39.858 27.249-12.209 9.083-22.862 18.525-31.958 28.325-9.097 9.8-15.321 20.198-18.673 31.193h244.894V896z" p-id="1480"></path></svg>
			</button>
			<!-- h3 -->
			<button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
				<svg t="1693061135842" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1633" width="20" height="20"><path d="M88 448h400V172c0-24.3 19.7-44 44-44s44 19.7 44 44v680c0 24.3-19.7 44-44 44s-44-19.7-44-44V536H88v316c0 24.3-19.7 44-44 44S0 876.3 0 852V172c0-24.3 19.7-44 44-44s44 19.7 44 44v276zM815.551 597.802c13.128 0.47 26.257-0.469 39.385-2.813 13.129-2.344 24.85-6.447 35.165-12.308 10.316-5.86 18.638-13.948 24.968-24.263 6.33-10.315 9.494-22.975 9.494-37.978 0-21.1-7.15-37.978-21.45-50.638-14.301-12.66-32.704-18.989-55.21-18.989-14.066 0-26.257 2.813-36.572 8.44-10.315 5.626-18.872 13.245-25.67 22.857-6.799 9.612-11.84 20.395-15.121 32.352-3.283 11.956-4.69 24.263-4.22 36.923h-80.177c0.938-23.913 5.392-46.066 13.363-66.462 7.97-20.396 18.872-38.095 32.703-53.099 13.832-15.004 30.594-26.725 50.287-35.165C802.188 388.22 824.459 384 849.31 384c19.223 0 38.095 2.813 56.616 8.44 18.52 5.626 35.165 13.831 49.934 24.615 14.77 10.784 26.609 24.498 35.517 41.143 8.909 16.645 13.363 35.75 13.363 57.318 0 24.85-5.626 46.535-16.88 65.055-11.252 18.52-28.835 32-52.747 40.44v1.407c28.132 5.626 50.052 19.575 65.759 41.846 15.707 22.27 23.56 49.348 23.56 81.23 0 23.444-4.688 44.425-14.065 62.946-9.378 18.52-22.037 34.227-37.979 47.12-15.942 12.894-34.462 22.858-55.561 29.89-21.1 7.034-43.37 10.55-66.814 10.55-28.601 0-53.568-4.103-74.902-12.308-21.334-8.205-39.15-19.81-53.451-34.813-14.3-15.004-25.202-33.055-32.704-54.154-7.502-21.099-11.487-44.542-11.956-70.33h80.177c-0.938 30.008 6.447 54.975 22.154 74.902s39.268 29.89 70.682 29.89c26.726 0 49.114-7.62 67.166-22.857 18.051-15.239 27.077-36.923 27.077-65.055 0-19.224-3.751-34.462-11.253-45.715-7.502-11.252-17.348-19.81-29.539-25.67-12.19-5.86-25.905-9.494-41.143-10.901-15.239-1.407-30.828-1.875-46.77-1.407v-59.78z" p-id="1634"></path></svg>
			</button>
			<!-- h4 -->
			<button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
				<svg t="1693061157475" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1787" width="20" height="20"><path d="M88 448h400V172c0-24.3 19.7-44 44-44s44 19.7 44 44v680c0 24.3-19.7 44-44 44s-44-19.7-44-44V536H88v316c0 24.3-19.7 44-44 44S0 876.3 0 852V172c0-24.3 19.7-44 44-44s44 19.7 44 44v276z m936.246 331.56h-63.298v116.748h-75.957V779.56H674v-79.472L884.991 404h75.957v312.264h63.298v63.296zM735.89 716.264h149.1V499.648h-1.406L735.89 716.264z" p-id="1788"></path></svg>
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
			<button @click="saveDocument('manualsave')">保存到云端</button>
		</div>
		<editor-content :editor="editor" id="document-content" v-model="localContent"
			@update="$emit('update:docContent', editor.storage.content)" />
		<div id="hidden-area"></div>
		<div class="document-words">
			{{ editor.storage.characterCount.words() }} 个单词
			<div class="document-characters">{{ editor.storage.characterCount.characters() }} / {{ docLimit }} 个字符
				{{ editor.storage.collaborationCursor.users.length }}人正在编辑该文档
			</div>
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
import Mention from '@tiptap/extension-mention'
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

// @
import { VueRenderer } from '@tiptap/vue-3'
import tippy from 'tippy.js'
import MentionList from './MentionList.vue'
import Suggestion from '@tiptap/suggestion'

export default {
	name: 'TextEditor',
	components: {
		EditorContent,
		BubbleMenu,
		FloatingMenu
	},
	props: {
		docId: {
			type: Number,
			default: 1
		},
		docName: {
			type: String,
			default: 'temp'
		},
		docContent: {
			type: String,
		}
	},
	emits: ['update:docContent','updateVersion'],
	data() {
		return {
			userName: 'tempUser',
			userAvatar: '/src/assets/avatar.jpeg',
			localContent: '',
			docLimit: 100000,
			autoSavePeriod: 10000,
			editable: false,
			fullScreen: false,
			editor: undefined,
			selectedFontFamily: 'sans-serif',
			selectedFontSize: '',
			provider: undefined,
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
		//根据亮度匹配协作光标的字体颜色
		getFontColor(background) {
			// 将背景颜色转换为RGB格式
			const r = parseInt(background.substr(1, 2), 16);
			const g = parseInt(background.substr(3, 2), 16);
			const b = parseInt(background.substr(5, 2), 16);

			// 计算亮度（根据公式 Y = 0.299*R + 0.587*G + 0.114*B）
			const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

			// 根据亮度选择字体颜色
			const fontColor = brightness > 0.5 ? '#444' : '#eee';

			return fontColor;
		},

		//更改字体
		changeFont() {
			this.editor.chain().focus().setFontFamily(this.selectedFontFamily || 'unset').run()
		},
		exportAsPDF() {
			let original = document.querySelector('#document-content')
			let page = original.cloneNode(true)//需要对原样式进行一些修改，因此深拷贝

			//修改样式和显示内容
			page.querySelectorAll('.ProseMirror').forEach(element => {
				element.style.backgroundColor = 'white';
			});
			page.querySelectorAll('.collaboration-cursor__caret, .collaboration-cursor__label').forEach(element => {
				element.style.display = 'none';
			});
			original.style.display = 'none'//隐藏显示
			document.querySelector('#hidden-area').appendChild(page)

			const docName = this.docName
			let abs = 0
			let innerWidth = document.documentElement.clientWidth || document.body.clientWidth // 获得当前可视窗口的宽度（不包含滚动条）
			let outerWidth = window.innerWidth // 获得当前窗口的宽度（包含滚动条）
			if (outerWidth > innerWidth) {
				abs = (outerWidth - innerWidth) / 2    // 获得滚动条宽度的一半
			}
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
				original.style.display = 'block'//恢复显示
				document.querySelector('#hidden-area').removeChild(page)
				console.log('成功保存为PDF')
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
		saveDocument(mode) {
			let formData = new FormData()
			formData.append('source', this.editor.getHTML())
			if (mode === 'manualsave') {
				this.$http.post(`/api/projects/file/${this.docId}/store/`, formData).then(() => {
					console.log('保存成功')
					this.$emit('updateVersion')
				})
			} else {
				this.$http.post(`/api/projects/file/${this.docId}/autostore/`, formData).then(() => {
					console.log('自动保存成功')
				})
			}
		}
	},
	watch: {
		editable() {
			this.editor.setEditable(this.editable)
		},
		docContent() {
			this.editor.commands.setContent(this.docContent)
		},
		selectedFontFamily(newValue) {
			if (newValue === '') {
				this.selectedFontFamily = 'sans-serif'
			}
		}
	},
	mounted() {
		const yDOC = new Y.Doc()//协作文档载体
		this.provider = new HocuspocusProvider({//用户端
			url: 'ws://43.138.14.231:1234',
			//文档的标识对应一个 yDoc 属性
			name: String(this.docId),
			document: yDOC,
		})
		//加载保存时间最近的文件,然后初始化编辑器
		//查询团队成员,然后初始化编辑器
		this.$http.get(`/api/teams/1/`).then((response) => {
			let identityMap = {
				'leader': '团队创建者',
				'admin': '团队管理员',
				'member':'团队成员'
			}
			this.members = response.data.members.map(element => {
				return {
					id: element.user.id,
					username: element.user.username,
					identity: identityMap[element.identity]
				}
			})
		})
		this.editor = new Editor({
			extensions: [
				Document,
				Mention.configure({
						HTMLAttributes: {
							class: 'mention',
						},
						suggestion: {
							items: () => { return this.members },
							render: () => {
								let component
								let popup
								return {

									onStart: props => {
										component = new VueRenderer(MentionList, {
											props,
											editor: props.editor,
										})

										if (!props.clientRect()) {
											return
										}

										popup = tippy('body', {
											getReferenceClientRect: props.clientRect,
											appendTo: () => document.body,
											content: component.element,
											showOnCreate: true,
											interactive: true,
											trigger: 'manual',
											placement: 'bottom-start',
										})
									},

									onUpdate(props) {
										component.updateProps(props)
										if (!props.clientRect()) {
											return
										}
										popup[0].setProps({
											getReferenceClientRect: props.clientRect,
										})
									},

									onKeyDown(props) {
										if (props.event.key === 'Escape') {
											popup[0].hide()
											return true
										}

										return component.ref?.onKeyDown(props)
									},

									onExit() {
										popup[0].destroy()
										component.destroy()
									},
								}
							}
						}
					}),
				StarterKit.configure({
					history: false//使用collaboration的history
				}),
				CharactorCount.configure({
					limit: this.docLimit
				}),
				Collaboration.configure({
					document: yDOC
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
							return '从这里开始编写文档 支持Markdown快捷键'
						}
					}
				),
				Highlight.configure({
					multicolor: true
				})
			],
			content: '',
			editable: this.editable,
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
			},
		})
		//设置自动保存
		setInterval(() => {
			this.saveDocument('autosave')
		}, this.autoSavePeriod)
		//只有没有人在同时编辑的时候才加载，否则使用正在共享编辑的版本
		//好像并不需要，后端还是能保存一段时间？
		setTimeout(() => {
			if (this.editor.storage.collaborationCursor.users.length === 1 && this.editor.storage.content === '<p></p>') {
				console.log('插入保存的内容' + this.editor.storage.collaborationCursor.users.length)
				this.editor.commands.clearContent()
				setTimeout(() => {
					this.editor.commands.setContent(this.docContent)
				}, 100)
			}
		}, 1000)
		//修改协作光标的文字颜色
		document.querySelectorAll('.ProseMirror .collaboration-cursor__label').forEach(elm => {
			elm.style.color = this.getFontColor(elm.style.backgroundColor)
		})
	},
	unmounted() {
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
	padding: 20px;
	overflow: auto;
}


.ProseMirror {
	min-height: 100px;
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

/* placeholder样式 */
.ProseMirror p.is-editor-empty:first-child::before {
	font-weight: 700;
	color: #777 !important
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
	font-size: 0.9em;
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

/* 协作光标样式 */
.ProseMirror .collaboration-cursor__caret {
	border-left: 1px solid #0D0D0D;
	border-right: 1px solid #0D0D0D;
	margin-left: -1px;
	margin-right: -1px;
	pointer-events: none;
	position: relative;
	word-break: normal;
}

/* Render the username above the caret */
.ProseMirror .collaboration-cursor__label {
	border-radius: 3px 3px 3px 0;
	color: #eee;
	font-size: 12px;
	font-style: normal;
	font-weight: 600;
	left: -1px;
	line-height: normal;
	padding: 0.1rem 0.3rem;
	position: absolute;
	top: -1.4em;
	user-select: none;
	white-space: nowrap;
}

.font-select {
	width: 190px;
	height: 40px;
	padding-left: 10px;
	border-radius: 5px;
	border: 1px solid lightgrey;
	color: grey;
	font-size: 18px;
}
.font-select:focus-visible {
	outline: 0;
	border: 3px solid rgba(199,29,35, 1);
}
</style>