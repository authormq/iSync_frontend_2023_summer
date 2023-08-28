<template>
    <div class="flex-container">
        <text-editor :isReadOnly="isReadOnlyIdentity" :doc-name="docName" :doc-id="docId" v-model:doc-content="docContent"
            @update-version="getVersionInfo" :showHistoryVersion="showHistoryVersion">
            <template #showHistoryButton>
                <button class="btn" @click="showHistoryVersion = !showHistoryVersion">历史版本</button>
                <ul v-if="showHistoryVersion">
                    <li v-for="data in versions" :key="data.versionId">
                        <button @click="showVersionContent(data.versionId)">
                            版本编号：{{ data.versionId }} 保存时间：{{ data.saveTime }}</button>
                    </li>
                </ul>
                <button class="change-btn" v-if="currentVersionId !== undefined" @click="coverDocument">以该版本替换当前文档</button>
            </template>
            <template #version>
                <version-inspector :content="currentVersionContent" :showHistoryVersion="showHistoryVersion"></version-inspector>
            </template>
            
        </text-editor>
        <!-- <version-inspector @updateContent="handleUpdateContent" :doc-id="docId" :versions="versions"></version-inspector> -->
    </div>
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
            showHistoryVersion:false,
            currentVersionId:undefined,
            docContent: '',
            docId: null,
            versions: [],
            members: [],
            docName: 'temp',
            isReadOnlyIdentity: false,
            currentVersionContent:''
        }
    },
    methods: {
        //展示选择的信息
        showVersionContent(versionId) {
            this.currentVersionId = versionId
            this.$http.get(`/api/projects/file/${this.docId}/version/show/${versionId}`).then((response) => {
                this.currentVersionContent = response.data
            })
        },
        //覆盖版本
        coverDocument() {
            this.$http.post(`/api/projects/file/${this.docId}/version/${this.currentVersionId}/`).then(() => {
                this.currentVersionContent
                this.handleUpdateContent(this.currentVersionContent)
            })
        },
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

<style scoped>
.flex-container {
    display: flex;
}
.btn {
    min-width: 60px;
}

.flex-container ul {
    /* display: block; */
    height: 50px;
    overflow: visible;
    /* height: 70px;
    width: 200px; */
    /* overflow-y: auto; */
}



.change-btn {
    min-width: 100px;
}

ul li button {
    min-width: 200px;
}
</style>