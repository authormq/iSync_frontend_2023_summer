<template>
    <div v-if="!isLoaded" class="mask" :style="{
        'position': 'fixed',
        'left': '0',
        'top': '0',
        'width': '100%',
        'height': '100%',
        'background': 'rgba(200,200,200,0.5)'
    }">
        <div :style="{
            'display': 'inline-block',
            'vertical-align': 'middle',
            'margin':'0 auto'
        }">
            <div :style="{
                'width': '10px',
                'aspect-ratio': '1',
                'borderRadius': '10px',
                'border': '3px dotted #777',
                'animation': 'rotate 1s infinite linear'
            }"></div><span>正在加载内容...</span>
        </div>
    </div>
    <div class="flex-container">
        <text-editor :isReadOnly="isReadOnlyIdentity" :doc-name="docName" :doc-id="docId" v-model:doc-content="docContent"
            @update-version="getVersionInfo" :showHistoryVersion="showHistoryVersion">
            <template #showHistoryButton>
                <button class="btn" @click="change" v-tooltip="'历史记录'">
                    <svg t="1693229044900" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="27713" width="40" height="40">
                        <path
                            d="M512 144C310.4 144 144 310.4 144 512S310.4 880 512 880 880 713.6 880 512 713.6 144 512 144z m0 672c-166.4 0-304-137.6-304-304s137.6-304 304-304 304 137.6 304 304-137.6 304-304 304z"
                            fill="#707070" p-id="27714"></path>
                        <path d="M528 275.2h-32v252.8H768v-32h-240z" fill="#707070" p-id="27715"></path>
                    </svg>
                </button>
                <ul v-show="showHistoryVersion" class="his-list" ref="draggable">
                    <li v-show="currentVersionId !== undefined"><button @click="coverDocument">替换</button></li>
                    <li v-for="data in versions" :key="data.versionId">
                        <button @click="showVersionContent(data.versionId)">
                            版本编号：{{ data.versionId }} 保存时间：{{ data.saveTime }}</button>
                    </li>
                </ul>
                <!-- <button class="change-btn" v-if="currentVersionId !== undefined" @click="coverDocument">以该版本替换当前文档</button> -->
            </template>
            <template #version>
                <version-inspector :content="currentVersionContent"
                    :showHistoryVersion="showHistoryVersion"></version-inspector>
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
            isLoaded: false,//等待后端返回全部文档内容
            showHistoryVersion: false,
            currentVersionId: undefined,
            docContent: '',
            docId: null,
            versions: [],
            members: [],
            docName: 'temp',
            isReadOnlyIdentity: false,
            currentVersionContent: '',
            isDragging: false,
            offsetX: 0,
            offsetY: 0
        }
    },
    methods: {
        change() {
            setTimeout(() => {
                this.showHistoryVersion = true
            }, 1);
        },
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
                console.log(this.currentVersionContent)
                this.handleUpdateContent(this.currentVersionContent)
                this.showHistoryVersion = false
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
            this.docName = response.headers['content-disposition'].match(/filename="([^"]+)"/)[1]
            this.docContent = response.data
            this.isLoaded = true
        })
        //获取历史版本
        this.getVersionInfo()
        //获取当前团队所有用户

        // 设置历史记录面板的拖拽响应
        this.$nextTick(() => {
            // 摁下鼠标的响应
            this.$refs.draggable.addEventListener('mousedown', (e) => {
                const div = this.$refs.draggable
                this.isDragging = true
                this.offsetX = e.clientX - div.getBoundingClientRect().left
                this.offsetY = e.clientY - div.getBoundingClientRect().top
                div.style.cursor = 'grabbing'
            })
            // 鼠标拖动的响应（前提：摁下鼠标）
            document.addEventListener('mousemove', (e) => {
                if (!this.isDragging) return
                const newX = e.clientX - this.offsetX
                const newY = e.clientY - this.offsetY
                const div = this.$refs.draggable
                div.style.left = `${newX}px`
                div.style.top = `${newY}px`
            })
            // 鼠标松开的响应
            document.addEventListener('mouseup', () => {
                if (this.showHistoryVersion) {
                    this.isDragging = false
                    this.$refs.draggable.style.cursor = 'grab'
                }
            })
            // 鼠标点击的响应（点击区不在拖动面板内，隐藏面板）
            document.addEventListener('click', (e) => {
                if (this.showHistoryVersion) {
                    const range = this.$refs.draggable.getBoundingClientRect()
                    if (!(
                        e.clientX >= range.left &&
                        e.clientX <= range.right &&
                        e.clientY >= range.top &&
                        e.clientY <= range.bottom
                    )) {
                        this.showHistoryVersion = false
                    }
                }
            })
        })
    }
}
</script>

<style scoped>
.flex-container {
    display: flex;
}

.change-btn {
    min-width: 100px;
}

.his-list {
    overflow-y: auto;
    max-height: 450px;
    position: fixed;
    right: 0;
    top: 20%;
    width: 200px;
    padding: 20px;
    border-radius: 10px;
    background-color: rgb(240, 240, 240);
    box-shadow: -1px 1px 10px grey;
}

.his-list li button {
    margin: 0;
    width: 100%;
    margin-bottom: 15px;
}

.his-list li:first-child button {
    height: 45px;
    padding-top: 5px;
    padding-bottom: 5px;
    color: rgba(199, 29, 35, 1);
    font-size: 20px;
    font-weight: bold;
}

.his-list li:last-child button {
    margin-bottom: 0;
}


@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>