<template>
<div id="product">
    <Header ref="header"/>
    <div id="banner-container">
        <img :src="banner.img" id="banner-img">
        <div id="banner">
            <div id="banner-title">{{ banner.title }}</div>
            <div id="banner-text">{{ banner.text }}</div>
            <div id="banner-btn-item">
                <a class="banner-btn btn" :href="banner.link">{{ banner.btn0 }}</a>
                <a class="banner-btn btn">{{ banner.btn1 }}</a>
            </div>
        </div>
    </div>
    <div id="bar">
        <span class="bar-title" v-for="(item, index) of moduleName" :key="'title' + index"
        :id="'title' + index" @click="mtClick(index)">{{ item.title }}</span>
    </div>
    <div style="height: 5rem"></div>
    <div id="module0" class="module">
        <p class="title">{{ moduleName[0].title }}</p>
        <div id="feature">
            <div class="feature-item" v-for="(item, index) of feature" :key="'feature' + index">
                <div class="iconfont" :class="item.icon"/>
                <div class="feature-title">{{ item.title }}
                <div class="feature-text">{{ item.text }}</div></div>
            </div>
        </div>
    </div>
    <div id="module1" class="module">
        <p class="title">{{ moduleName[1].title }}</p>
    </div>
    <div id="module2" class="module">
        <p class="title">{{ moduleName[2].title }}</p>
        <div id="scenes">
            <div class="scenes-item" v-for="(item, index) of scenes" :key="'scenes' + index">
                <img :src="item.img" class="scenes-img">
                {{ item.title }}
            </div>
        </div>
    </div>
    <div id="module3" class="module">
        <p class="title-light">{{ moduleName[3].title }}</p>
        <img :src="coreImg" id="core-img">
        <div id="core">
            <div class="core-item" v-for="(item, index) of core" :key="'core' + index">
                <p class="core-title"><span class="iconfont" :class="item.icon"/>{{ item.title }}</p>
                <div class="core-text">{{ item.text }}</div>
            </div>
        </div>
    </div>
    <div id="module4" class="module">
        <p class="title">{{ moduleName[4].title }}</p>
    </div>
    <div id="module5" class="module">
        <p class="title">{{ moduleName[5].title }}</p>
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
    name: 'Product',
    components: {
        Header, Footer, Float,
    },
    mounted () {
        // header
        this.$refs.header.highlight(1)
        window.addEventListener('scroll', this.scrollToTop)
        this.scrollToTop()
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
            if (scrollTop >= 400) {
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
            banner: { title: "核心产品 A", text: "核心产品描述，核心产品描述核心产品描述核心产品描述，核心产品描述核心产品描述，核心产品描述，核心产品描述核心产品描述。",
                btn0: "我要购买", btn1: "我要体验", link: "/inputBuy", img: require("@/assets/img/product-0.png")
            },
            moduleName: [
                { title: "产品功能" },
                { title: "产品方案" },
                { title: "应用场景" },
                { title: "核心优势" },
                { title: "/* 自定义 */" },
                { title: "客户案例" },
            ],
            feature: [
                { icon: "icon-phone", title: "产品特性 0", text: "连接管理能力更新迭代，满足多种运营需求的统一平台，支持“全球连接”。" },
                { icon: "icon-online", title: "产品特性 1", text: "功能描述功能描述功能描述功能描述功能描述" },
                { icon: "icon-service", title: "产品特性 2", text: "功能描述功能描述功能描述功能描述功能描述" },
                { icon: "icon-repair", title: "产品特性 3", text: "功能描述功能描述功能描述功能描述功能描述" },
                { icon: "icon-phone", title: "产品特性 4", text: "功能描述" },
                { icon: "icon-online", title: "产品特性 5", text: "功能描述功能描述功能描述功能描述功能描述" },
                { icon: "icon-service", title: "产品特性 6", text: "功能描述功能描述" },
                { icon: "icon-repair", title: "产品特性 7", text: "功能描述功能描述功能描述功能描述功能描述" },
                { icon: "icon-feedback", title: "产品特性 8", text: "功能描述功能描述功能描述功能描述功能描述功能描述功能描述功能描述功能描述功能描述功能描述功能描述功能描述功能描述功能描述" },
            ],
            scenes: [
                { title: "九小场所", img: require("@/assets/img/scenes-0.jpg") },
                { title: "医院", img: require("@/assets/img/scenes-1.jpg") },
                { title: "学校", img: require("@/assets/img/scenes-2.jpg") },
                { title: "商城", img: require("@/assets/img/scenes-3.jpg") },
                { title: "出租屋", img: require("@/assets/img/scenes-4.jpg") },
                { title: "工厂", img: require("@/assets/img/scenes-5.jpg") },
                { title: "城中村", img: require("@/assets/img/scenes-6.jpg") },
                { title: "古建筑", img: require("@/assets/img/scenes-7.jpg") },
            ],
            core: [
                { icon: "icon-phone", title: "核心功能 A", text: "专用网络的建设，基于“人物分离”、“一级架构”、“集中专用”、“叠加组网”、“承载组网方式不变”和“信令组网方式不变”等6大原则，2/3/4G/NB等网络能力已覆盖全国。" },
                { icon: "icon-online", title: "核心功能 B", text: "为客户提供一点接入、全国/全球部署的一站式服务，有效提高客户支撑服务效率，降低了业务的运营和服务成本。" },
                { icon: "icon-service", title: "核心功能 C", text: "端到端加密通道、SIM卡级数据加密配合核心网络安全架构，构建了完整的数据安全传输通道，满足客户专用性、高安全性和高可靠性需求。" },
                { icon: "icon-repair", title: "核心功能 D", text: "基于全球相关质量体系标准要求,结合行业特点定制开发了专用SIM卡产品，完全能够满足各行业对于物联网专用SIM卡的硬件尺寸适配性、环境质量适应性、安全管理可靠性的需求。" },
                { icon: "icon-phone", title: "核心功能 E", text: "基于eSIM的“全球连接”解决方案，实现全球一点接入、统一管理、一致体验；实现：一份合同、一点支撑、一点服务、一点出账、一点付费的高效部署方案。" },
            ],
            coreImg: require("@/assets/img/core.jpg"),
            partner: [  
                { img: require("@/assets/img/logo-Huawei.svg"), link: "" },
                { img: require("@/assets/img/logo-NTT-DoCoMo.svg"), link: "" },
                { img: require("@/assets/img/logo-KT.png"), link: "" },
                { img: require("@/assets/img/logo-Intel.svg"), link: "" },
                { img: require("@/assets/img/logo-ZTE.svg"), link: "" },
                { img: require("@/assets/img/logo-360.png"), link: "" },
                { img: require("@/assets/img/logo-Doosan.svg"), link: "" },
                { img: require("@/assets/img/logo-IBM.svg"), link: "" },
            ],
        }
    }
}
</script>

<style scoped>
#product {
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
.title-light {
    position: absolute;
    padding: 6rem 4rem 0 4rem;
    width: 100%;
    font-size: 2.2rem;
    line-height: 1.4;
    color: white;
    z-index: 2;
}

#feature {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    text-align: left;
}
.feature-item {
    position: relative;
    display: flex;
    margin: 4rem auto 0 auto;
    width: 80%;
    max-width: 28rem;
}
.feature-item > .iconfont {
    margin: auto 1.6rem auto auto;
    padding: 1.1rem;
    font-size: 2.6rem;
    border-radius: 1rem;
    color: var(--primany);
    background: var(--bg-primany);
    border: .1rem solid hsla(200, 98%, 48%, 0.3);
}
.feature-title {
    margin: .3rem auto auto auto;
    width: 100%;
    font-size: 1.8rem;
    white-space: nowrap;
    font-weight: 600;
    color: var(--dark-20);
}
.feature-text {
    margin: .6rem auto auto 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    height: 4rem;
    overflow: hidden;
    text-align: justify;
    font-size: 1.4rem;
    line-height: 2rem;
    white-space: normal;
    color: var(--dark-60);
}

#scenes {
    display: flex;
    padding: 2rem 2%;
    flex-wrap: wrap;
    width: 100%;
}
.scenes-item {
    display: flex;
    margin: auto;
    padding: 1.6rem 2%;
    flex-direction: column;
    font-size: 1.6rem;
    text-align: center;
    letter-spacing: .2rem;
    color: var(--primany);
}
.scenes-img {
    margin: auto auto 1.4rem auto;
    height: 14rem;
    width: 14rem;
    border-radius: 50%;
    border: .6rem solid white;
    box-shadow: .02rem .1rem 0 .1rem var(--primany), 0 1rem 3.2rem -1.2rem hsla(200, 37%, 31%, 0.5);
}

#core {
    display: flex;
    flex-wrap: wrap;
    padding: 12rem 2% 3rem 2%;
    width: 100%;
    justify-content: space-between;
    overflow: hidden;
}
#core-img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}
.core-item {
    margin: 2.5% auto;
    width: 30rem;
    padding: 3rem 2rem 2rem 2rem;
    border-radius: .6rem;
    background: hsla(0, 0%, 100%, 0.05);
}
.core-title {
    display: flex;
    margin: auto auto 1rem auto;
    align-items: center;
    font-size: 1.8rem;
    font-weight: 600;
    white-space: nowrap;
    color: var(--primany);
}
.core-title > .iconfont {
    padding: 0 1rem 0 0;
    font-size: 3rem;
    font-weight: 400;
    color: var(--primany);
}
.core-text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    height: 10rem;
    overflow: hidden;
    text-align: justify;
    font-size: 1.4rem;
    line-height: 2rem;
    color: white;
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