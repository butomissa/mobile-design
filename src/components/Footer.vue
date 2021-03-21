<template>
<div id="footer">
    <div class="footer-list">
        <div class="footer-title">{{ footer[0].title }}</div> <!-- 核心产品 -->
        <a class="footer-item" v-for="(item, index) of footer[0].item" :key="'item0' + index"
        :href="item.link">{{ item.text }}</a>
    </div>
    <div class="footer-list">
        <div class="footer-title">{{ footer[1].title }}</div> <!-- 解决方案 -->
        <a class="footer-item" v-for="(item, index) of footer[1].item" :key="'item1' + index"
        :href="item.link">{{ item.text }}</a>
        <div class="footer-title">{{ footer[2].title }}</div> <!-- 快速入口 -->
        <a class="footer-item" v-for="(item, index) of footer[2].item" :key="'item2' + index"
        @click="linkClick(2, index)">{{ item.text }}</a>
    </div>
    <div class="footer-list">
        <div class="footer-title">{{ footer[3].title }}</div> <!-- 友情链接 -->
        <a class="footer-item" v-for="(item, index) of footer[3].item" :key="'item3' + index"
        :href="item.link">{{ item.text }}</a>
    </div>
    <div class="footer-list">
        <div class="footer-title">{{ footer[4].title }}</div> <!-- 关于我们 -->
        <a class="footer-item" v-for="(item, index) of footer[4].item" :key="'item4' + index"
        :href="item.link">{{ item.text }}</a>
        <div class="footer-title">{{ footer[5].title }}</div> <!-- 咨询服务 -->
        <a class="footer-item" v-for="(item, index) of footer[5].item" :key="'item5' + index"
        :href="item.link">{{ item.text }}</a>
    </div>
    <div class="footer-list" style="width: 100%; max-width: 20.8rem">
        <div class="footer-title" style="clear: both">{{ contact.title }}</div> <!-- 联系我们 -->
        <a class="footer-item" v-for="(item, index) of contact.item" :key="'contact' + index"
        :href="item.link">{{ item.text }}</a>
        <!-- 二维码 -->
        <div id="footer-QR-title">
            <span class="iconfont icon-wechat"/>关注我们
        </div>
        <img :src="qr.qr" id="footer-QR-img">
        
    </div>
    <div class="footer-list" style="width: 0"></div> <!-- 让联系我们模块居左 -->
    <div id="footer-bottom">{{ wa }}</div>
</div>
</template>

<script>
export default {
    methods: {
        linkClick(item, index) {
            //to do: login check
            window.open(this.footer[item].item[index].link)
        },
    },
    data() {
        return {
            footer: [
                { title: "核心产品",
                item: [
                    { text: "核心产品 #A", link: "/product" },
                    { text: "核心产品 #B", link: "/product" },
                    { text: "核心产品 #C", link: "/product" },
                    { text: "核心产品 #D", link: "/product" },
                    { text: "核心产品 #E", link: "/product" },
                    { text: "核心产品 #F", link: "/product" },
                    { text: "核心产品 #G", link: "/product" },
                    { text: "核心产品 #H", link: "/product" },
                ]},
                { title: "解决方案",
                item: [
                    { text: "软件解决方案", link: "/solution" },
                    { text: "硬件解决方案", link: "/solution" },
                    { text: "软硬件解决方案", link: "/solution" },
                ]},
                { title: "快速入口",
                item: [
                    { text: "管理平台 0", link: "http://www.bing.com" },
                    { text: "管理平台 1", link: "http://www.bing.com" },
                    { text: "服务平台 A", link: "http://www.bing.com" },
                ]},
                { title: "友情链接",
                item: [
                    { text: "友情链接 0", link: "http://www.bing.com" },
                    { text: "友情链接 1", link: "http://www.bing.com" },
                    { text: "友情链接 2", link: "http://www.bing.com" },
                    { text: "友情链接 3", link: "http://www.bing.com" },
                    { text: "友情链接 4", link: "http://www.bing.com" },
                    { text: "友情链接 5", link: "http://www.bing.com" },
                    { text: "友情链接 6", link: "http://www.bing.com" },
                ]},
                { title: "关于我们",
                item: [
                    { text: "公司简介", link: "/about" },
                    { text: "生产合作", link: "/cooperation" },
                    { text: "加入我们", link: "/inputCoop" },
                ]},
                { title: "咨询服务",
                item: [
                    { text: "售前在线咨询", link:"/inputAdvisory" },
                    { text: "售后智能在线", link:"/inputAfterSale" },
                    { text: "意见反馈", link:"/inputFeedback" },
                ]},
            ],
            contact: { title: "联系我们",
            item: [
                { text: "官方网站: www.xxxxxxxxx.com.cn", link: "/" },
                { text: "地址: 广东广州天河区A大道B广场" },
                { text: "邮箱: xxxxxx@xxx.com" },
                { text: "电话: 17600000000" },
                { text: "官方微信公众号: ?" },
            ]},
            qr: { title: "微信公众号", qr: require("@/assets/img/QR.png"), text: "官方微信公众号: ?" },
            wa: "©2021 XX集团有限公司版权所有 粤ICP备xxxxxxxx号",
        }
    },
}
</script>

<style scoped>
#footer {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 4rem;
    padding: 0 4rem;
    width: 100%;
    background: var(--dark-20);
}
.footer-list {
    margin: 0;
    padding: 0 0 1rem 0;
    width: 44%;
    max-width: 12rem;
}
.footer-title {
    padding: 4rem 0 1rem 0;
    font-size: 1.6rem;
    color: white;
}
.footer-item {
    display: block;
    font-size: 1.4rem;
    line-height: 2.2;
    color: var(--dark-60);
}
.footer-item:hover {
    color: var(--primany);
}
#footer-QR-img {
    margin: 1rem 0 -1rem 0;
    height: 10rem;
    width: 10rem;
    border: .5rem solid hsla(0, 0%, 100%, 0.15);
}
#footer-QR-title {
    /* display: inline-block; */
    margin: 1rem auto .2rem auto;
    font-size: 1.6rem;
    white-space: nowrap;
    color: white;
}
#footer-QR-title > .icon-wechat {
    margin: auto .6rem auto 0;
    font-size: 1.6rem;
    color: white;
}
#footer-bottom {
    margin: 3rem 1.4rem;
    width: 100%;
    text-align: center;
    font-size: 1.4rem;
    line-height: 2.4rem;
    color: var(--dark-60);
}
</style>