<template>
<div id="float">
    <div class="float-item" id="float-top" @click="backTop">
        <div class="iconfont icon-arrow"/>
    </div>
</div>
</template>

<script>
export default {
    mounted () {
        window.addEventListener('scroll', this.scrollToTop);
    },
    destroyed () {
        window.removeEventListener('scroll', this.scrollToTop);
    },
    methods: {
        backTop () {
            const that = this;
            let timer = setInterval(() => {
                let ispeed = Math.floor(-that.scrollTop / 5);
                document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed;
                if (that.scrollTop === 0) {
                    clearInterval(timer);
                }
            }, 16);
        },
        scrollToTop () {
            const that = this;
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            that.scrollTop = scrollTop;
            if (that.scrollTop > 200) {
                document.getElementById("float").style.bottom = "1.6rem";
            } else {
                document.getElementById("float").style.bottom = "-4rem";
            }
        },
    },
    data() {
        return {
            floatContact: [
                { icon: "icon-phone", title: "售前咨询电话", text: "020-77777777" },
                { icon: "icon-online", title: "售前在线咨询", text: "方案匹配购买咨询，常见问题在线解答", link:"/inputAdvisory" },
                { icon: "icon-service", title: "售后智能在线", text: "售后问题智能诊断，匹配最合适的人工服务", link:"/inputAfterSale" },
                { icon: "icon-feedback", title: "意见反馈", text: "为了提升服务质量，我们期待您的建议", link:"/inputFeedback" },
            ],
        }
    },
}
</script>

<style scoped>
#float {
    position: fixed;
    right: 1.6rem;
    bottom: -4rem;
    transition: all ease, 0.3s;
    z-index: 8;
}
.float-item {
    position: relative;
    margin: 1rem auto 0 auto;
    padding: 1rem 0;
    width: 3.8rem;
    text-align: center;
    border-radius: .3rem;
    border: .1rem solid var(--bg-dark-1);
    background: white;
    transition: all ease, 0.3s;
}
.float-item > .iconfont {
    font-size: 1.6rem;
    color: var(--dark-20);
    transform: rotate(180deg);
    transition: all ease, 0.3s;
}
</style>