<template>
<div id="select">
    <div ref="menu" id="menu" @click="menuClick">
        <span id="select-text" ref="selectText">{{ data[val] }}</span>
        <span ref="arrow" class="iconfont icon-arrow"/>
    </div>
    <div id="list-form" v-show="show">
        <div id="list-header">
            <p id="list-cancel" @click="menuClick">取消</p>
            <p id="list-title">{{ title }}</p>
            <p id="list-OK" @click="okClick">确定</p>
        </div>
        <div ref="list" id="list" @scroll="listScroll()">
            <div class="item" style="height: 10rem"></div>
            <div class="item" ref="item" v-for="(item, index) of data" :key="index">{{ item }}</div>
            <div class="item" style="height: 10rem"></div>
        </div>
    </div>
    <div id="mask" @touchstart="menuClick" v-show="show"></div>
</div>
</template>

<script>
export default {
    props: {
        data: { type: Array },
        left: { type: String, default: ".8rem" },
        val: { type: Number, default: 0 },
        title: { type: String, default: "请选择" },
        fontSize: { type: String, default: "1.6rem" },
    },
    model: {
        prop: "val",
        event: "val-event",
    },
    mounted() {
        this.$nextTick(() => {
            if (this.val < 0 || this.val >= this.data.length) {
                this.$emit('val-event', 0)
            }
        })
        this.$refs.selectText.style.marginLeft = this.left
        this.$refs.arrow.style.marginRight = this.left
        this.$refs.selectText.style.fontSize = this.fontSize
        this.$refs.arrow.style.fontSize = this.fontSize
    },
    methods: {
        menuClick() {
            this.show = !this.show
            document.body.style.overflow = this.show ? "hidden" : "auto"
            if (this.show) {
                this.listShow(this.val)
                //滚动到当前值位置
                this.$nextTick(() => {
                    this.$refs.list.scrollTop = this.val * 50
                })
            }
        },
        okClick() {
            this.$emit('val-event', Math.floor(this.$refs.list.scrollTop / 50))
            this.menuClick()
        },
        listShow(index) { //当前值菜单样式
            for (let i = 0; i < this.data.length; i++) {
                this.$refs.item[i].removeAttribute("style") 
            }
            this.$refs.item[index].style.color = "var(--primany)"
            this.$refs.item[index].style.fontWeight = "500"
            this.$refs.item[index].style.fontSize = "1.7rem"
            this.$refs.item[index].style.borderTop = ".1rem solid var(--dark-90)"
            this.$refs.item[index].style.borderBottom = ".1rem solid var(--dark-90)"
            if (index - 2 >= 0) { this.$refs.item[index - 2].style.color = "var(--dark-60)" }
            if (index + 2 < this.data.length) { this.$refs.item[index + 2].style.color = "var(--dark-60)" }
        },
        listScroll() {
            let oldScroll = this.$refs.list.scrollTop
            let i = Math.floor((oldScroll + 25) / 50)
            this.listShow(i)
            // 停止scroll 0.1秒后当前值居中
            setTimeout(() => {
                if (this.$refs.list.scrollTop === oldScroll) {
                    this.$refs.list.scrollTop = Math.floor((oldScroll + 25) / 50) * 50
                }
            }, 100)
        },
    },
    data() {
        return {
            show: false,
            list: [],
        }
    },
}
</script>

<style scoped>
#menu {
    position: relative;
    display: flex;
    height: 100%;
    width: 100%;
    text-align: left;
    border-bottom: .1rem solid var(--dark-90);
    transition: all ease, 0.3s;
}
#menu > span {
    margin: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--dark-20);
    transition: all ease, 0.3s;
}
#menu > .icon-arrow {
    font-size: 1.4rem;
    transform: rotate(-90deg);
}
#mask {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: var(--bg-dark-3);
    z-index: 11;
}
#list-form {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: white;
    animation: showList 0.3s;
    z-index: 12;
}
@keyframes showList {
    0% { opacity: 0; bottom: -2rem; }
    100% { opacity: 1; bottom: 0; }
}
#list-header {
    display: flex;
    margin: auto auto .1rem auto;
    justify-content: space-between;
    height: 5rem;
    border-bottom: .1rem solid var(--dark-90);
}
#list-header > p {
    padding: 1.7rem 2rem;
    font-size: 1.6rem;
}
#list-cancel {
    color: var(--dark-60);
}
#list-OK {
    color: var(--primany);
}
#list {
    padding: 0 4rem;
    margin: .1rem auto auto auto;
    height: 25rem;
    overflow-y: auto;
}
.item {
    font-size: 1.6rem;
    line-height: 4.8rem;
    height: 5rem;
    white-space: nowrap;
    text-align: center;
    border: .1rem solid white;
    transition: all ease, 0.3s;
}
</style>