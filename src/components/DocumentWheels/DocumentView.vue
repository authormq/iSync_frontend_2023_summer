<template>
    <text-editor :isReadOnly="isReadOnlyIdentity" :doc-name="docName" :doc-id="docId" v-model:doc-content="docContent"
        @update-version="getVersionInfo">
    </text-editor>
    <version-inspector @updateContent="handleUpdateContent" :doc-id="docId" :versions="versions"></version-inspector>
</template>

<script>
import TextEditor from './TextEditor.vue'
import VersionInspector from './VersionInspector.vue'
export default {
    name: 'DocumentView',
    components: {
        TextEditor,
        VersionInspector
    },
    data() {
        return {
            docContent: '',
            docId: null,
            versions: [],
            members: [],
            docName: 'temp',
            isReadOnlyIdentity: false
        }
    },
    methods: {
        getVersionInfo() {
            this.$http.get(`/api/projects/file/${this.docId}/version/list/`).then((response) => {
                this.versions = response.data.map(ele => {
                    return {
                        versionId: ele.version,
                        saveTime: ele.creatTime
                    }
                });
            })
        },
        handleUpdateContent(content) {
            this.docContent = content
            console.log(this.docContent)
        },
    },
    created() {
        this.docId = this.$route.params.docId
        this.$http.get(`/api/projects/file/${this.docId}/editable/`).then(response => {
            this.isReadOnlyIdentity = !response.data.editable
        })
    },
    mounted() {
        //打开当前文件
        this.docId = this.$route.params.docId
        this.$http.get(`/api/projects/file/${this.docId}/open/`).then((response) => {
            this.docName=response.headers['content-disposition'].match(/filename="([^"]+)"/)[1]
            this.docContent = response.data
        })
        //获取历史版本
        this.getVersionInfo()
        //获取当前团队所有用户
    }
}
</script>

<style></style>