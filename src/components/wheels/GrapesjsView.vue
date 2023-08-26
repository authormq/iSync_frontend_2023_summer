<template>
  <div id="gjs"></div>
  <!-- <div id="blocks"></div> -->
</template>
  
<script> 
  import grapesjs from 'grapesjs'; // 引入 GrapesJS
  import 'grapesjs/dist/css/grapes.min.css'; // 引入样式
	import 'grapesjs/dist/grapes.min.js';
  import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css';
	import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.js';
	// import plugin from 'grapesjs-preset-webpage';
	import plugin from 'grapesjs-preset-newsletter';

  export default {
  name: 'GrapesEditor',
  mounted() {
    this.initEditor();
		this.addBlock();
  },
	data(){
		return{
			editor:undefined
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
				height: '700px',
				showOffsets: 1,
        noticeOnUnload: 0,
				formElement: true,
				storageManager: {autoload: 0},
				plugins: [plugin],
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
			});
		},
		addBlock() {
			console.log(this.editor.blockManager)
			this.editor.BlockManager.add('testBlock', {
				id: 'block',
        label: 'Block',
        attributes: {class: 'gjs-fonts gjs-f-b1',title:'hello'},
        content: `<div style="text-align:center"><span>Hello World</span></div>`
    	})
		},
	}
}
</script>