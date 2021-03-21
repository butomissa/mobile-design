<template>
<div id="solution">
    <Header ref="header"/>
    <div id="banner-container">
        <img :src="banner.img" id="banner-img">
        <div id="banner">
            <div id="banner-title">{{ banner.title }}</div>
            <div id="banner-text">{{ banner.text }}</div>
            <div id="banner-btn-item">
                <a class="banner-btn btn" :href="banner.link">{{ banner.btn0 }}</a>
            </div>
        </div>
    </div>
    <div id="bar">
        <div class="bar-title" v-for="(item, index) of moduleName" :key="'title' + index"
        :id="'title' + index" @click="mtClick(index)">{{ item.title }}</div>
    </div>
    <div style="height: 5rem"></div>
    <div id="module0" class="module">
        <p class="title">{{ moduleName[0].title }}</p>
    </div>
    <div id="module1" class="module">
        <p class="title">{{ moduleName[1].title }}</p>
        <div id="part">
            <div class="part-item" v-for="(item, index) of part" v-show="item.sub"
            :id="'part' + index" :key="'part' + index">
                <div class="part-title">{{ item.title }}</div>
                <div class="part-sub">
                    <a class="part-sub-item" v-for="(val, num) of item.sub" :key="'partSub' + num" :href="val.link">
                        <span class="iconfont icon-repair"/>{{ val.text }}
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div id="module2" class="module">
        <p class="title">{{ moduleName[2].title }}</p>
        <div id="partner-container">
            <div id="partner">
                <div class="partner-item" v-for="(item, index) of partner" :key="'partner' + index">
                    <img :src="item.img" class="partner-img">
                </div>
            </div>
        </div>
    </div>
    <Footer/>
    <Float/>
</div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Float from '@/components/Float'

export default {
    name: 'Solution',
    components: {
        Header, Footer, Float,
    },
    mounted () {
        // header
        this.$refs.header.highlight(2)
        window.addEventListener('scroll', this.scrollToTop)
        this.scrollToTop
    },
    destroyed () {
        window.removeEventListener('scroll', this.scrollToTop)
    },
    methods: {
        scrollToTop() {
            const that = this
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            that.scrollTop = scrollTop
            // Chrome for Android 不支持position: sticky, 手动判断模块栏目位置
            if (scrollTop >= 300) {
                document.getElementById("bar").style.position = "fixed"
                document.getElementById("bar").style.top = "5rem"
            } else {
                document.getElementById("bar").removeAttribute("style")
            }
            // 当滚动到模块位置时改变模块栏目的文字颜色和下划线
            let l = document.getElementById("bar").scrollWidth / this.moduleName.length
            for (var i = 0; i < this.moduleName.length; i++) {
                document.getElementById("title" + i).removeAttribute("style")
                if ((i < this.moduleName.length - 1 && that.scrollTop >= (document.getElementById("module" + i).offsetTop - 120)
                && that.scrollTop < (document.getElementById("module" + (i + 1)).offsetTop - 120)) ||
                (i === this.moduleName.length - 1 && that.scrollTop >= (document.getElementById("module" + i).offsetTop - 120))) {
                    document.getElementById("title" + i).style.boxShadow = "inset 0 -.3rem 0 -.1rem var(--primany)"
                    document.getElementById("title" + i).style.color = "var(--primany)"
                    document.getElementById("bar").scrollLeft = l * (i - 1)
                }
            }
        },
        mtClick(index) {
            // 滚动到模块顶端 - 导航栏高度 5rem - 模块栏目高度 5rem
            document.documentElement.scrollTop = document.body.scrollTop = 
                document.getElementById("module" + index).offsetTop - 99
        },
    },
    data() {
        return {
            banner:{ title: "软硬件解决方案", text: "软硬件解决方案软硬件解决方案软硬件解决方案软硬件解决方案软硬件解决方案软硬件解决方案软硬件解决方案软硬件解决方案软硬件解决方案软硬件解决方案。",
                btn0: "我要咨询", link: "/inputAdvisory", img: require("@/assets/img/product-0.png") },
            moduleName: [
                { title: "方案详情" },
                { title: "产品组成" },
                { title: "客户案例" },
            ],
            part: [
                { title: "标准化产品",
                sub: [
                    { text: "标准化产品 A1", link: "/product" },
                    { text: "标准化产品 A2", link: "/product" },
                    { text: "标准化产品 A3", link: "/product" },
                    { text: "标准化产品 A4", link: "/product" },
                    { text: "标准化产品 A5", link: "/product" },
                ],
                },
                { title: "连接产品",
                sub: [
                    { text: "连接产品 B0", link: "/product" },
                    { text: "连接产品 B1", link: "/product" },
                ],
                },
                { title: "模组产品",
                sub: [
                    { text: "模组产品 C0", link: "/product" },
                    { text: "模组产品 C1", link: "/product" },
                    { text: "模组产品 C4", link: "/product" },
                ],
                },
                { title: "泛终端产品",
                sub: [
                    { text: "泛终端产品 D0", link: "/product" },
                    { text: "泛终端产品 D1", link: "/product" },
                    { text: "泛终端产品 D2", link: "/product" },
                    { text: "泛终端产品 D3", link: "/product" },
                ],
                },
            ],
            coreImg: require("@/assets/img/core.jpg"),
            partner: [  
                {img: require("@/assets/img/logo-Huawei.svg"), link: "" },
                {img: require("@/assets/img/logo-NTT-DoCoMo.svg"), link: "" },
                {img: require("@/assets/img/logo-KT.png"), link: "" },
                {img: require("@/assets/img/logo-Intel.svg"), link: "" },
                {img: require("@/assets/img/logo-ZTE.svg"), link: "" },
                {img: require("@/assets/img/logo-360.png"), link: "" },
            ],
        }
    }
}
</script>

<style scoped>
#solution {
    margin: 0 auto;
    width: 100%;
    max-width: 90rem;
}
#banner-container {
    position: relative;
    display: flex;
    margin-left: calc(50% - 45rem);
    height: 40rem;
    width: 90rem;
    background: var(--bg-primany);
}
#banner {
    margin: 7rem auto 0 auto;
    width: 80vw;
    max-width: 60rem;
}
#banner-img { position: absolute; bottom: 0; left: 0; z-index: -1; }
#banner-title {
    font-size: 2.6rem;
    font-weight: 800;
    letter-spacing: .2rem;
    color: var(--primany);
}
#banner-text {
    margin: 2.4rem auto auto 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    height: 7.8rem;
    font-size: 1.6rem;
    line-height: 2.6rem;
    font-weight: 400;
    letter-spacing: 0;
    text-align: justify;
    color: var(--dark-20);
}
#banner-btn-item {
    display: flex;
    margin: 2rem auto auto 0;
    flex-wrap: wrap;
    width: 50%;
}
.banner-btn {
    margin: 2rem 2rem auto 0;
    width: 12rem;
    letter-spacing: 0;
}

#bar {
    position: absolute;
    height: 5rem;
    width: 100%;
    max-width: 90rem;
    white-space: nowrap;
    overflow-x: scroll;
    text-align: center;
    background: white;
    box-shadow: var(--shadow-bar);
    z-index: 9;
}
.bar-title {
    display: inline-block;
    margin: .5rem 2rem;
    font-size: 1.5rem;
    line-height: 4rem;
    white-space: nowrap;
    color: var(--dark-20);
    transition: all ease, 0.3s;
}
.module {
    position: relative;
    width: 100%;
    max-width: 90rem;
    text-align: center;
    overflow: hidden;
}
.title {
    padding: 6rem 4rem 0 4rem;
    width: 100%;
    font-size: 2.2rem;
    line-height: 1.4;
    font-weight: 600;
    color: var(--dark-20);
    z-index: 2;
}

#part {
    display: flex;
    flex-wrap: wrap;
}
.part-item {
    display: flex;
    padding: 2rem;
    margin: 2rem 2rem auto 2rem;
    width: 100%;
    border-radius: 2rem;
    border: .2rem dashed var(--dark-90);
    background: hsla(0, 0%, 97%, 1);
}
.part-title {
    margin: auto 1rem auto auto;
    font-size: 1.6rem;
    width: 10rem;
    white-space: nowrap;
    font-weight: 600;
    color: var(--dark-20);
}
.part-sub {
    display: flex;
    margin: auto;
    flex-wrap: wrap;
    width: 100%;
    text-align: center;
}
.part-sub-item {
    position: relative;
    margin: 1rem 1rem;
    padding: 2rem 0;
    overflow: hidden;
    width: 100%;
    max-width: 15.8rem;
    font-size: 1.6rem;
    text-align: center;
    border-radius: .6rem;
    color: var(--primany);
    border: 1px solid var(--primany);
    background: var(--bg-primany);
}

.part-sub-item > .iconfont {
    position: absolute;
    right: -2rem;
    bottom: -4rem;
    font-size: 9rem;
    opacity: 0.1;
    transform: rotate(15deg);
    color: var(--primany);
}

#partner-container {
    display: flex;
    margin: 2rem auto 3rem auto;
    height: 36rem;
    width: 100%;
    overflow-y: scroll;
}
#partner {
    display: flex;
    margin: auto 2.4rem;
    flex-wrap: wrap;
    width: 100%;
    transition: all ease, 0.3s;
}
.partner-item {
    display: flex;
    margin: .8rem auto;
    height: 24vw;
    width: 40vw;
    max-height: 12rem;
    max-width: 20rem;
    background: hsla(0, 0%, 97%, 1);
    border: 1px solid hsla(0, 0%, 90%, 1);
}
.partner-img {
    margin: auto;
    max-height: 70%;
    max-width: 70%;
}
</style>