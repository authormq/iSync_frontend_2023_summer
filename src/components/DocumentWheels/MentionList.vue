<template>
    <div class="items">
        <template v-if="items.length">
            <button class="item" :class="{ 'is-selected': index === selectedIndex }"
                v-for="(item, index) in items.sort((a, b) => compareItem(a, b))" :key="item.index"
                @click="selectItem(index)">
                {{ item.username }}
                <span class="identity-tag" :class="identityClass[item.identity]">{{ item.identity }}</span>
            </button>
        </template>
        <div class="item" v-else>
            No result
        </div>
    </div>
</template>

<script>
import { time } from 'echarts'
export default {
    props: {
        items: {
            type: Array,
            required: true,
        },

        command: {
            type: Function,
            required: true,
        },
    },

    data() {
        return {
            selectedIndex: 0,
            identityClass: {
                '团队创建者': 'leader',
                '团队管理员': 'admin',
                '团队成员': 'member'
            }
        }
    },

    watch: {
        items() {
            this.selectedIndex = 0
        },
    },

    methods: {
        compareItem(a, b) {
            let pair = { '团队创建者': 666, '团队管理员': 66, '团队成员': 6 }
            return pair[a.identity] < pair[b.identity]
        },
        onKeyDown({ event }) {
            if (event.key === 'ArrowUp') {
                this.upHandler()
                return true
            }

            if (event.key === 'ArrowDown') {
                this.downHandler()
                return true
            }

            if (event.key === 'Enter') {
                this.enterHandler()
                return true
            }

            return false
        },

        upHandler() {
            this.selectedIndex = ((this.selectedIndex + this.items.length) - 1) % this.items.length
        },

        downHandler() {
            this.selectedIndex = (this.selectedIndex + 1) % this.items.length
        },

        enterHandler() {
            this.selectItem(this.selectedIndex)
        },

        selectItem(index) {
            const item = this.items[index]
            if (item) {
                let currentTime = String(new Date().getTime())
                //获取当前时间作为@的ID(精确到毫秒)
                let atId = `at_${item.id}_${currentTime}`
                this.command({
                    id: atId,
                    name: item.username
                })
                this.$bus.emit('wssend', {
                    docId: item.docId,
                    id: item.id,
                    file_element: atId//本次@的ID
                })
            }
        },
    },
}
</script>

<style scoped lang="css">
.items {
    padding: 0.2rem;
    position: relative;
    border-radius: 10px;
    background: #FFF;
    color: rgba(0, 0, 0, 0.8);
    overflow: hidden;
    font-size: 0.9rem;
    box-shadow:
        0 0 0 1px rgba(0, 0, 0, 0.05),
        0px 10px 20px rgba(0, 0, 0, 0.1),
    ;
}

.item {
    display: block;
    margin: 0;
    width: 100%;
    text-align: left;
    background: transparent;
    border-radius: 10px;
    border: 2px solid transparent;
    padding: 0.2rem 0.4rem;
    transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.4s;

}

.item.is-selected {
    background: rgb(199, 29, 35);
    color: white
}


.identity-tag {
    display: flex;
    padding: 2px 5px;
    right: 5px;
    vertical-align: middle;
    font-family: Arial, Helvetica, sans-serif;
    display: inline-block;
    border-radius: 0.3rem;
    font-weight: 700;
    font-size: 0.8rem;
}

.identity-tag.leader {
    background: rgb(139, 20, 25);
    color: #ddd
}

.identity-tag.admin {
    background: rgb(199, 29, 35);
    color: #ddd
}

.identity-tag.member {
    color: #444;
    background: #ddd;
}

.item.is-selected .identity-tag.identity-tag.leader {
    background: white;
    color: rgb(139, 20, 25);
}

.item.is-selected .identity-tag.identity-tag.admin {
    background: white;
    color: rgb(199, 29, 35)
}

.item.is-selected .identity-tag.identity-tag.member {
    background: white;
    color: #444
}
</style>