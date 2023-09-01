<template>
    <!-- <div>{{ inspector?inspector.getHTML():'' }}</div> -->
    <div id="inspector-wrapper">
        <toc></toc>
        <editor-content v-if="showHistoryVersion" :editor="inspector"></editor-content>
    </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
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
import ContentTable from './Content.js'

// @
import Mention from '@tiptap/extension-mention'
import { VueRenderer } from '@tiptap/vue-3'
import tippy from 'tippy.js'
import MentionList from './MentionList.vue'
import Suggestion from '@tiptap/suggestion'
export default {
    components: {
        EditorContent
    },
    data() {
        return {
            //以下需要对接口
            inspector: undefined
        }
    },
    props: {
        showHistoryVersion: {
            default: false
        },
        content: {
            default: ''
        }
    },
    methods: {
        // //展示选择的信息
        // showVersionContent(versionId) {
        //     this.currentVersionId = versionId
        //     this.$http.get(`/api/projects/file/${this.docId}/version/show/${versionId}`).then((response) => {
        //         this.currentContent = response.data
        //         this.inspector.commands.setContent(response.data)
        //     })
        // },
        //覆盖版本，要求向上emit
        // coverDocument() {
        //     this.$http.post(`/api/projects/file/${this.docId}/version/${this.currentVersionId}/`).then(() => {
        //         this.$emit('updateContent', this.currentContent)
        //     })
        // }

    },
    watch: {
        content(value) {
            this.inspector.commands.setContent(value)
        }
    },
    mounted() {
        this.inspector = new Editor({
            extensions: [
                ContentTable,
                Document,
                		Mention.configure({
                    HTMLAttributes: {
                        class: 'mention',
                    },
                    // 只有登录状态才能@别人
                    suggestion: this.$cookies.isKey('user_id') ?
                        {
                            items: () => { return this.members },
                            //修改默认command
                            command: ({ editor, range, props }) => {
                                // increase range.to by one when the next node is of type "text"
                                // and starts with a space character
                                const nodeAfter = editor.view.state.selection.$to.nodeAfter
                                const overrideSpace = nodeAfter?.text?.startsWith(' ')

                                if (overrideSpace) {
                                    range.to += 1
                                }
                                editor
                                    .chain()
                                    .focus()
                                    .insertContentAt(range, [
                                        {
                                            type: 'mention',
                                            attrs: {
                                                ...props,
                                                id: props.id,
                                                label: props.name
                                            }
                                        },
                                        {
                                            type: 'text',
                                            text: ' ',
                                        },
                                    ])
                                    .run()
                                window.getSelection()?.collapseToEnd()
                                this.saveDocument('autosave')//每次@自动保存
                            },
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
                        } : {}
                }),
                StarterKit.configure({
                    history: false//使用collaboration的history
                }),
                CharactorCount.configure({
                    limit: this.docLimit
                }),
                Image.configure({
                    inline: true,
                    allowBase64: true
                }),
                Table.configure({
                    resizable: true,
                    // cellMinWidth: 25,
                    allowTableNodeSelection: true
                }),
                TableRow,
                TableHeader,
                TableCell,
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
                            return '从这里开始编写文档\n支持Markdown快捷键'
                        }
                    }
                ),
                Highlight.configure({
                    multicolor: true
                })
            ],
            editable: false,
            content: ''
        })
    },
    unmounted() {
        this.inspector.destroy()
    }
}
</script>

<style scoped>
#inspector-wrapper {
    width: 700px;
}

btn {
    align-self: flex-end;
    /* position: fixed;
    top: 100px;
    left: 100px; */
}
</style>