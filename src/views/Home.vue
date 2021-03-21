<template>
<div id="home">
    <Header ref="header"/>
    <div id="banner">
        <a class="banner-item" v-for="(item, index) of banner" :key="'banner' + index"
        :id="'banner' + index" :href="item.link" @touchmove="bannerTouch" @touchend="bannerEnd">
            <img :src="item.img" :id="'img' + index"></a>
        <div id="selector">
            <div class="selector-item" v-for="(item, index) of banner"
            :key="'selector' + index" :id="'selector' + index"/>
        </div>
        <span class="iconfont icon-arrow" style="left: 0; transform: rotate(90deg) scaleX(1.2)" @click="bannerClick(-2)"></span>
        <span class="iconfont icon-arrow" style="right: 0; transform: rotate(-90deg) scaleX(1.2)" @click="bannerClick(-1)"></span>
    </div>
    <div class="module">
        <div class="title float-title">{{ title[0].main }}<div class="sub-title">{{ title[0].sub }}</div></div>
        <div id="tab">
            <span class="tab-item" v-for="(item, index) of product" :key="'tab' + index"
            :id="'tab' + index" @click="tabClick(index)">{{ item.title }}</span>
        </div>
        <div id="product">
            <div class="product-item" v-for="(item, index) of product" :key="'product' + index">
                <div class="product-title">{{ item.title }}
                    <div class="product-text">{{ item.text }}</div>
                    <a class="product-btn btn" :href="item.link">{{ item.btnText }}</a>
                </div>
                <img :src="item.img" class="product-img">
            </div>
        </div>
    </div>
    <div class="module">
        <div class="title">{{ title[1].main }}<div class="sub-title">{{ title[1].sub }}</div></div>
        <div id="solution">
            <a class="solution-item" v-for="(item, index) of solution" :key="'solution' + index" :href="item.link">
                <img :src="item.img" class="solution-img">
                <div class="solution-title">{{ item.title }}</div>
                <div class="solution-text">{{ item.text }}</div>
                <div class="solution-btn">查 看 详 情&nbsp;<p class="iconfont icon-arrow"/></div>
            </a>
        </div>
    </div>
    <div class="module">
        <div class="title">{{ title[2].main }}<div class="sub-title">{{ title[2].sub }}</div></div>
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
    name: 'Home',
    components: {
        Header, Footer, Float,
    },
    mounted() {
        // header
        this.$refs.header.highlight(0)
        // banner
        document.getElementById("banner0").style.opacity = 1
        document.getElementById("banner0").style.zIndex = 0
        document.getElementById("selector0").style.width = "2rem"
        this.timer = setInterval(() => { this.bannerTimer() }, 4000)
        //product
        document.getElementById("tab0").style.boxShadow = "inset 0 -.3rem 0 -.1rem var(--primany)"
        document.getElementById("tab0").style.color = "var(--primany)"
    },
    beforeDestroy() {
        clearInterval(this.timer)
    },
    methods: {
        bannerTimer() {
            let index = (this.bannerNo + 1) % this.banner.length
            document.getElementById("banner" + index).style.zIndex = 0
            document.getElementById("banner" + index).style.opacity = 1
            document.getElementById("selector" + index).style.width = "2rem"
            document.getElementById("banner" + this.bannerNo).style.zIndex = -1
            document.getElementById("banner" + this.bannerNo).style.opacity = 0
            document.getElementById("selector" + this.bannerNo).style.width = "1rem"
            this.bannerNo = index
        },
        bannerClick(index) {
            // -1: banner顺序 +1; -2: banner顺序 -1; 其它: 跳转到指定banner;
            if (index === -1) { index = (this.bannerNo + 1) % this.banner.length }
            if (index === -2) { index = this.bannerNo === 0 ? (this.banner.length - 1) : (this.bannerNo - 1)}
            document.getElementById("banner" + this.bannerNo).style.zIndex = -1
            document.getElementById("banner" + index).style.zIndex = 0
            document.getElementById("banner" + this.bannerNo).style.opacity = 0
            document.getElementById("banner" + index).style.opacity = 1
            document.getElementById("selector" + this.bannerNo).style.width = "1rem"
            document.getElementById("selector" + index).style.width = "2rem"
            this.bannerNo = index
        },
        bannerTouch(e) {
            // 记录触摸开始结束的 X
            this.bannerX[0] === -1 ? this.bannerX[0] = e.touches[0].screenX : this.bannerX[1] = e.touches[0].screenX
        },
        bannerEnd() {
            // 如果滑动距离超过 banner 宽度的 20% 时触发切换
            let w = document.getElementById("banner").offsetWidth * 0.2
            if (this.bannerX[0] - this.bannerX[1] > w) { this.bannerClick(-2) }
            else if (this.bannerX[1] - this.bannerX[0] > w) { this.bannerClick(-1) }
            this.bannerX = [-1, -1]
        },
        tabClick(index) {
            let l = document.getElementById("tab").scrollWidth / this.product.length
            for (let i = 0; i < this.product.length; i++) {
                document.getElementById("tab" + i).removeAttribute("style")
            }
            document.getElementById("tab" + index).style.boxShadow = "inset 0 -.3rem 0 -.1rem var(--primany)"
            document.getElementById("tab" + index).style.color = "var(--primany)"
            document.getElementById("product").style.marginLeft = "calc(50% - 45rem - 90rem * " + index + ")"
            document.getElementById("tab").scrollLeft = l * (index - 1)
        },
    },
    data() {
        return {
            timer: '',
            bannerNo: 0,
            bannerX: [-1, -1],
            tabMoreLink: "more.htm",
            partnerMoreLink: "more.htm",
            banner: [
                { img: require("@/assets/img/banner-0.jpg"), link: "banner0.htm" },
                { img: require("@/assets/img/banner-1.jpg"), link: "banner1.htm" },
                { img: require("@/assets/img/banner-2.jpg"), link: "banner2.htm" },
            ],
            title: [
                { main: "产品展示模块", sub: "产品展示模块副标题 介绍文本" },
                { main: "方案展示模块", sub: "方案展示模块副标题 介绍文本" },
                { main: "合作伙伴", sub: "合作伙伴展示模块副标题 介绍文本" },
            ],
            tab: [
                { text: "展示产品 A" },
                { text: "展示产品 4267832" },
                { text: "展示产品 C" },
                { text: "展示产品 D" },
                { text: "展示产品 E" },
            ],
            product: [
                { title: "展示产品 A", text: "产品详细描述文案产品详细描述文案远程,抄表产品详细描述文案远程,抄表产品详细描述文案产品详细描述文案产品详细描述文案产品详细描述文案产品详细描述文案",
                  btnText: "产品详情", link: "/product", img: require("@/assets/img/product-0.png") },
                { title: "展示产品 426783", text: "采用7G网络通信，能够探测危险并提供准实时报警功能。报警信息通过蜂窝网络发往云端平台，平台可通过手机APP、短信、电话等方式向用户告警。",
                btnText: "产品详情", link: "/product", img: require("@/assets/img/product-1.png") },
                { title: "展示产品 C", text: "产品C 详细描述文案",
                btnText: "产品详情", link: "/product", img: require("@/assets/img/product-2.png") },
                { title: "展示产品 D", text: "产品D 详细描述文案",
                btnText: "产品详情", link: "/product", img: require("@/assets/img/product-3.png") },
                { title: "展示产品 E", text: "产品E 详细描述文案",
                btnText: "产品详情", link: "/product", img: require("@/assets/img/product-4.png") },
            ],
            solution: [
                { title: "软件解决方案", text: "硬件解决方案详细描述文案硬件解决方案详细描述文案硬件解决方案详细描述文案硬件解决方案详细描述文案硬件解决方案详细描述文案硬件解决方案详细描述文案硬件解决方案详细描述文案",
                img: require("@/assets/img/solution-0.jpg"), link: "/solution" },
                { title: "硬件解决方案", text: "硬件解决方案详细描述文案",
                img: require("@/assets/img/solution-1.jpg"), link: "/solution" },
                { title: "软硬件解决方案", text: "软硬件解决方案详细描述文案。",
                img: require("@/assets/img/solution-2.jpg"), link: "/solution" },
                { title: "更多解决方案", text: "更多专属行业解决方案",
                img: require("@/assets/img/solution-3.jpg"), link: "/solution" },
            ],
            partner: [
                { img: require("@/assets/img/logo-Huawei.svg") },
                { img: require("@/assets/img/logo-NTT-DoCoMo.svg") },
                { img: require("@/assets/img/logo-KT.png") },
                { img: require("@/assets/img/logo-Intel.svg") },
                { img: require("@/assets/img/logo-ZTE.svg") },
                { img: require("@/assets/img/logo-360.png") },
                { img: require("@/assets/img/logo-Doosan.svg") },
                { img: require("@/assets/img/logo-IBM.svg") },
                { img: require("@/assets/img/logo-Oracle.svg") },
                { img: require("@/assets/img/logo-Cisco.svg") },
                { img: require("@/assets/img/logo-Vodafone.svg") },
                { img: require("@/assets/img/logo-DFM.svg") },
                { img: require("@/assets/img/logo-Huawei.svg") },
                { img: require("@/assets/img/logo-NTT-DoCoMo.svg") },
                { img: require("@/assets/img/logo-KT.png") },
                { img: require("@/assets/img/logo-Intel.svg") },
                { img: require("@/assets/img/logo-ZTE.svg") },
                { img: require("@/assets/img/logo-360.png") },
                { img: require("@/assets/img/logo-Doosan.svg") },
                { img: require("@/assets/img/logo-IBM.svg") },
                { img: require("@/assets/img/logo-Oracle.svg") },
                { img: require("@/assets/img/logo-Cisco.svg") },
                { img: require("@/assets/img/logo-Vodafone.svg") },
                { img: require("@/assets/img/logo-DFM.svg") },
                { img: require("@/assets/img/logo-Huawei.svg") },
                { img: require("@/assets/img/logo-NTT-DoCoMo.svg") },
                { img: require("@/assets/img/logo-KT.png") },
                { img: require("@/assets/img/logo-Intel.svg") },
                { img: require("@/assets/img/logo-ZTE.svg") },
                { img: require("@/assets/img/logo-360.png") },
                { img: require("@/assets/img/logo-Doosan.svg") },
                { img: require("@/assets/img/logo-IBM.svg") },
                { img: require("@/assets/img/logo-Oracle.svg") },
                { img: require("@/assets/img/logo-Cisco.svg") },
                { img: require("@/assets/img/logo-Vodafone.svg") },
                { img: require("@/assets/img/logo-DFM.svg") },
            ],
        }
    },
}
</script>

<style scoped>
#home {
    margin: 0 auto;
    width: 100%;
    max-width: 90rem;
}
#banner {
    position: relative;
    height: 18rem;
    width: 100%;
    overflow: hidden;
}
.banner-item {
    position: absolute;
    margin-left: calc(50% - 45rem);
    top: 0;
    height: 100%;
    width: 90rem;
    opacity: 0;
    z-index: -1;
    transition: all ease, 1s;
}
#selector {
    position: absolute;
    margin: 17rem auto auto auto;
    left: 50%;
    transform: translateX(-50%);
}
.selector-item {
    float: left;
    margin: auto .4rem;
    height: .4rem;
    width: 1rem;
    opacity: 0.6;
    cursor: pointer;
    border-radius: .4rem;
    background: white;
    transition: all ease, 1s;
}
#banner > .icon-arrow {
    position: absolute;
    top: 7.2rem;
    font-size: 3.6rem;
    color: white;
    opacity: 0.7;
    text-shadow: 0 0 2rem black;
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
.sub-title {
    padding: 1rem 0 0 0;
    font-size: 1.4rem;
    line-height: 1.4;
    font-weight: 400;
    color: var(--dark-60);
}
.float-title {
    position: absolute;
    top: 0;
}

#tab {
    position: absolute;
    top: 21rem;
    left: 10%;
    height: 3rem;
    width: 80%;
    color: var(--dark-20);
    white-space: nowrap;
    overflow-x: scroll;
    z-index: 9;
}
.tab-item {
    padding: .75rem .2rem;
    margin: 0 1.3rem;
    font-size: 1.5rem;
    white-space: nowrap;
    transition: all ease, 0.2s;
}

#product {
    display: flex;
    margin-left: calc(50% - 45rem);
    overflow: hidden;
    transition: all ease, 0.2s;
}
.product-item {
    position: relative;
    height: 60rem;
    width: 90rem;
    min-width: 90rem;
    background: var(--bg-primany);
}
.product-img { position: absolute; bottom: 0; left: 0; z-index: -1; }
.product-title {
    margin: 29rem auto 0 auto;
    width: 80vw;
    max-width: 70rem;
    font-size: 2.6rem;
    font-weight: 800;
    letter-spacing: .2rem;
    text-align: left;
    color: var(--primany);
}
.product-text {
    margin: 2rem auto auto 0;
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
.product-btn {
    margin: 4rem auto auto 0;
    width: 12rem;
    letter-spacing: 0;
}

#solution {
    display: flex;
    padding: 2rem 2rem 0 2rem;
    flex-wrap: wrap;
    width: 100%;
}
.solution-item {
    position: relative;
    margin: 2vw auto;
    height: 60vw;
    width: 90vw;
    max-height: 26rem;
    max-width: 39rem;
    background: var(--dark-20);
    z-index: 1;
    /* transition: all ease, 0.3s; */
}
.solution-img {
    position: absolute;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0.4;
    z-index: -1;
}
.solution-img, .solution-img:hover, .solution-img:visited {
    border: 0px; /* IE 9/10 超链接图片边框 */
}
.solution-title {
    margin: 4.2rem auto 2rem auto;
    width: 100%;
    font-size: 2rem;
    text-align: center;
    color: white;
    /* transition: all ease, 0.3s; */
}
.solution-text {
    margin: 0 auto;
    display: -webkit-box;
    height: 7.2rem;
    width: 80%;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    font-size: 1.4rem;
    line-height: 2.4rem;
    text-align: justify;
    color: white;
    /* transition: all ease, 0.3s; */
}
.solution-btn {
    position: absolute;
    bottom: 0;
    width: 100%;
    font-size: 1.6rem;
    line-height: 4rem;
    text-align: center;
    overflow: hidden;
    color: white;
    background: var(--bg-dark-3);
    transition: all ease, 0.3s;
}
.solution-btn > .icon-arrow {
    display: inline-block;
    font-size: 1.2rem;
    color: white;
    transform: rotate(-90deg) translateX(.1rem);
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
    max-width: 90rem;
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