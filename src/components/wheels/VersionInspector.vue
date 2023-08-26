<template>
    <div id="inspector-wrapper">
        <editor-content :editor="editor"></editor-content>
    </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3';
export default {
    data() {
        return {
            inspector: undefined
        }

    },
    mounted() {
        this.inspector = new Editor({
            editable:false
        })
    },
    unmounted() {
        this.inspector.destroy()
    }
}
</script>

<style></style>