<template>
<div v-if="editor">
<button 
    :disabled="!editor.can().chain().focus().toggleBold().run()" 
    :class="{ 'is-active': editor.isActive('bold') }"
    @click="editor.chain().focus().toggleBold().run()">
    <strong>B</strong>
</button>
</div>
<EditorContent />
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
export default {
    name: 'TextWriter',
    components: {
        EditorContent
    },
    data() {
        return {
            editor:null
        }
    },
    mounted() {
        this.editor=new Editor({
            content: '<p>hahaha,this is a test</p>',
            extensions: [
                StarterKit,
            ],
        })
    },
    beforeUnmount() {
        this.editor.destroy()
    },
}
</script>

<style scoped></style>