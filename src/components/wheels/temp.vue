<template>
    <editor-content :editor="editor" />
    <div v-if="editor"> {{ editor.storage.collaborationCursor.users.length }}</div>
</template>

<script>
import Collaboration from '@tiptap/extension-collaboration'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Text from '@tiptap/extension-text'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { WebrtcProvider } from 'y-webrtc'
import * as Y from 'yjs'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'

export default {
    name: 'temp',
    components: {
        EditorContent,
    },

    data() {
        return {
            editor: null,
            provider: null,
        }
    },

    mounted() {
        const ydoc = new Y.Doc()
        // this.provider = new WebrtcProvider('tiptap-collaboration-extension', ydoc)
        this.provider = new WebrtcProvider('111', ydoc)
        this.editor = new Editor({
            extensions: [
                Document,
                Paragraph,
                Text,
                Collaboration.configure({
                    document: ydoc,
                }),
                CollaborationCursor.configure({
                    provider: this.provider,
                    user: {
                        name: 'acbb',
                        color: "#ff332f",
                        // avatar: this.userAvatar
                    }
                }),
                Placeholder.configure({
                    placeholder: 'Write something … It’ll be shared with everyone else looking at this example.',
                }),
            ],
            content:''
        })
        console.log(this.editor.getHTML())
        setTimeout(() => {
            if (this.editor.getHTML() === '<p></p>') {
                this.editor.commands.insertContentAt(0,'wdwdwdwdwdw')
            }
        },100)
    },
}
</script>
<style>
/* Give a remote user a caret */
.collaboration-cursor__caret {
    border-left: 1px solid #0D0D0D;
    border-right: 1px solid #0D0D0D;
    margin-left: -1px;
    margin-right: -1px;
    pointer-events: none;
    position: relative;
    word-break: normal;
}

/* Render the username above the caret */
.collaboration-cursor__label {
    border-radius: 3px 3px 3px 0;
    color: #0D0D0D;
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
</style>