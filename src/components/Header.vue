<template>
<div id="header">
    <div id="nav">
        <a href="/" id="logo"><img :src="logo">A平台门户网站</a>
        <p class="iconfont icon-menu" @click="showSider(true)"/>
    </div>
    <div id="sider">
        <!-- 用户信息 -->
        <p class="iconfont icon-close" @click="showSider(false)"></p>
        <div id="user">
            <template v-if="userName === '点击登录'">
                <a class="user-name" href="/login">{{ userName }}</a>
                <a class="user-btn" href="/signup">注册账号</a>
                <p class="user-btn" @click="changeUser(true)"
                    style="color: hsla(0, 0%, 80%, 1); margin-left: 2rem">登录(测试用)</p>
            </template>
            <template v-else>
                <p class="user-name">{{ userName }}</p>
                <p class="user-btn" @click="changeUser(false)">注销</p>
            </template>
        </div>
        <!-- 菜单 -->
        <div id="menu">
            <!-- 首页 -->
            <a id="menu0" class="menu menu-1st" href="/"><span class="iconfont icon-index"/>{{ menu[0].text }}</a>
            <!-- 产品服务 -->
            <p id="menu1" class="menu menu-1st" @click="showMenu(-1, 1)">
                <span class="iconfont icon-product"/>{{ menu[1].text }}
                <span :style="{transform: menu[1].fold ? 'rotate(-90deg)' : 'rotate(0deg)'}" class="iconfont icon-arrow"/></p>
            <ul v-show="!menu[1].fold">
                <li v-for="(menu2, index2) of menuProduct" :key="'menu1_' + index2">
                    <p class="menu menu-2nd" @click="showMenu(1, index2)">
                        {{ menu2.text }}<span :style="{transform: menu2.fold ? 'rotate(-90deg)' : 'rotate(0deg)'}" class="iconfont icon-arrow"/></p>
                    <ul>
                        <li v-for="(menu3, index3) of menu2.item" :key="'menu1_' + '_' + index2 + '_' + index3" v-show="!menu2.fold">
                            <p class="menu menu-3rd">{{ menu3.text }}</p>
                            <ul>
                                <li v-for="(menu4, index4) of menu3.content" :key="'menu1_'+ index2 + '_' + index3 + '_' + index4">
                                    <a class="menu menu-4th" :href="menu4.link">{{ menu4.text }}</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
            <!-- 解决方案 -->
            <p id="menu2" class="menu menu-1st" @click="showMenu(-1, 2)">
                <span class="iconfont icon-solution"/>{{ menu[2].text }}
                <span :style="{transform: menu[2].fold ? 'rotate(-90deg)' : 'rotate(0deg)'}" class="iconfont icon-arrow"/></p>
            <ul v-show="!menu[2].fold">
                <li v-for="(menu2, index2) of menuSolution" :key="'menu2_' + index2">
                    <a class="menu menu-2nd" :href="menu2.link">{{ menu2.text }}</a>
                </li>
            </ul>
            <!-- 生态合作 -->
            <p id="menu3" class="menu menu-1st" @click="showMenu(-1, 3)">
                <span class="iconfont icon-cooperation"/>{{ menu[3].text }}
                <span :style="{transform: menu[3].fold ? 'rotate(-90deg)' : 'rotate(0deg)'}" class="iconfont icon-arrow"/></p>
            <ul v-show="!menu[3].fold">
                <li v-for="(menu2, index2) of menuCooperation" :key="'menu3_' + index2">
                    <a class="menu menu-2nd" :href="menu2.link">{{ menu2.text }}</a>
                </li>
            </ul>
            <!-- 关于我们 -->
            <a id="menu4" class="menu menu-1st" href="/about"><span class="iconfont icon-about"/>{{ menu[4].text }}</a>
            <!-- 联系我们 -->
            <p id="menu5" class="menu menu-1st" @click="showMenu(-1, 5)">
                <span class="iconfont icon-contact"/>{{ menu[5].text }}
                <span :style="{transform: menu[5].fold ? 'rotate(-90deg)' : 'rotate(0deg)'}" class="iconfont icon-arrow"/></p>
            <ul v-show="!menu[5].fold">
                <li v-for="(menu2, index2) of menuContact" :key="'menu5_' + index2">
                    <a class="menu menu-2nd" :href="menu2.link">{{ menu2.text }}</a>
                </li>
            </ul>
            <!-- 控制台 -->
            <a id="menu6" class="menu menu-1st" href=""><span class="iconfont icon-console"/>{{ menu[6].text }}</a>
        </div>
        
    </div>
    <div id="mask" @click="showSider(false)"></div>
    <div style="height: 5rem"></div>
</div>
</template>

<script>
export default {
    mounted() {},
    methods: {
        showSider(isShow) {
            document.getElementById("sider").style.display = isShow ? "block" : "none"
            document.getElementById("mask").style.display = isShow ? "block" : "none"
            document.body.style.overflowY = isShow ? "hidden" : "auto"
        },
        changeUser(isLogin) {
            //测试用
            this.userName = isLogin ? "平台用户名称" : "点击登录"
        },
        showMenu(parent, index) {
            if (parent === -1) { this.$set(this.menu[index], "fold", !this.menu[index].fold) }
            else { this.$set(this.menuProduct[index], "fold", !this.menuProduct[index].fold) }
        },
        highlight(index) {
            for (let i = 0; i < this.menu.length; i++) {
                document.getElementById("menu" + i).removeAttribute("style")
            }
            document.getElementById("menu" + index).style.color = "var(--primany)"
            document.getElementById("menu" + index).style.background = "hsla(200, 90%, 96%, 1)"
            document.getElementById("menu" + index).style.boxShadow = "inset .4rem 0 0 -.1rem var(--primany)"
        }
    },
    data() {
        return {
            logo: require("@/assets/logo.svg"),
            userName: "点击登录",
            menu: [
                { text: "首页" },
                { text: "产品服务", fold: true },
                { text: "解决方案", fold: true },
                { text: "生态合作", fold: true },
                { text: "关于我们" },
                { text: "联系我们", fold: true },
                { text: "管理平台" },
            ],
            menuProduct: [
                { text: "标准化应用产品", fold: true,
                item: [
                    { text: "产品子类型",
                    content: [
                        { text: "产品 0", link: "/product" },
                        { text: "产品 1", link: "/product" },
                        { text: "产品 2", link: "/product" },
                        { text: "产品 3", link: "/product" },
                        { text: "产品 4", link: "/product" },
                    ]},
                    { text: "高级产品子类型",
                    content: [
                        { text: "高级产品 0", link: "/product" },
                        { text: "高级产品 1", link: "/product" },
                        { text: "高级产品 2", link: "/product" },
                        { text: "高级产品 3", link: "/product" },
                        { text: "高级产品 4", link: "/product" },
                    ]},
                    { text: "辅助类产品",
                    content: [
                        { text: "辅助类产品 0", link: "/product" },
                        { text: "辅助类产品 1", link: "/product" },
                    ]},
                    { text: "办公生产类产品",
                    content: [
                        { text: "办公生产类产品 0", link: "/product" },
                        { text: "办公生产类产品 1", link: "/product" },
                        { text: "办公生产类产品 2", link: "/product" },
                    ]},
                    { text: "新型产品",
                    content: [
                        { text: "新型产品 0", link: "/product" },
                        { text: "新型产品 1", link: "/product" },
                        { text: "新型产品 2", link: "/product" },
                        { text: "新型产品 3", link: "/product" },
                    ]},
                    { text: "家庭类产品",
                    content: [
                        { text: "家庭类产品 0", link: "/product" },
                        { text: "家庭类产品 1", link: "/product" },
                        { text: "家庭类产品 2", link: "/product" },
                    ]},
                ]},
                { text: "智能硬件产品", fold: true,
                item: [
                    { text: "智能硬件类产品",
                    content: [
                        { text: "智能硬件类产品 A", link: "/product" },
                        { text: "智能硬件类产品 B", link: "/product" },
                    ]},
                ]},
                { text: "智能连接产品", fold: true,
                item: [
                    { text: "智能连接产品",
                    content: [
                        { text: "物联网 eSIM 国内服务产品", link: "/product" },
                        { text: "物联网 eSIM 国外服务产品", link: "/product" },
                    ]},
                ]},
                { text: "平台产品", fold: true,
                item: [
                    { text: "智能软件类产品",
                    content: [
                        { text: "智能软件类产品 AII型", link: "/product" },
                        { text: "智能软件类产品 BVI型", link: "/product" },
                    ]},
                ]},
            ],
            menuSolution: [
                { text: "硬件解决方案", link: "/solution" },
                { text: "软件解决方案", link: "/solution" },
                { text: "软硬件解决方案", link: "/solution" },
            ],
            menuCooperation: [
                { text: "生产合作", link: "/cooperation" },
                { text: "申请加入", link: "/inputCoop" },
            ],
            menuContact:  [
                { text: "售前咨询 020-77777777" },
                { text: "售前在线咨询", link:"/inputAdvisory" },
                { text: "售后智能在线", link:"/inputAfterSale" },
                { text: "意见反馈", link:"/inputFeedback" },
            ],
        }
    },
}
</script>

<style scoped>
#nav {
    position: fixed;
    display: flex;
    height: 5rem;
    width: 100%;
    max-width: 90rem;
    align-items: center;
    background: white;
    border-bottom: .1rem solid var(--bg-dark-1);
    z-index: 10;
}
#logo {
    display: flex;
    padding-left: 1.6rem;
    align-items: center;
    font-size: 1.6rem;
    white-space: nowrap;
}
#logo > img {
    margin-right: .8rem;
    height: 1.6rem;
}
#nav > .iconfont{
    display: flex;
    margin: auto 0 auto auto;
    padding: 1.5rem;
    font-size: 2rem;
}

/* 侧边栏 */
#mask {
    position: fixed;
    display: none;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: var(--bg-dark-3);
    z-index: 11;
}
#sider {
    position: fixed;
    display: none;
    top: 0;
    right: 0;
    height: 100%;
    width: 70%;
    max-width: 40rem;
    /* overflow-y: hidden; */
    background: white;
    animation: showMenu 0.3s;
    z-index: 12;
}
#sider > .iconfont {
    position: absolute;
    display: flex;
    top: 0;
    right: 0;
    padding: 1.5rem;
    font-size: 2rem;
}
@keyframes showMenu {
    0% { opacity: 0; right: -20%; }
    100% { opacity: 1; right: 0; }
}
#user {
    padding: 5rem 0 2rem 0;
    margin: 0 2rem 1rem 2rem;
    box-shadow: 0 .2rem 0 -.1rem var(--bg-dark-1);
}
.user-name {
    display: block;
    margin-bottom: 2rem;
    font-size: 2.2rem;
    font-weight: 600;
}
.user-btn {
    display: inline-block;
    padding: 0;
    font-size: 1.6rem;
    color: var(--primany);
}

/* 菜单 */
#menu {
    padding-bottom: 2rem;
    height: calc(100% - 12.8rem);
    overflow-y: auto;
}
.menu {
    display: flex;
    align-items: center;
    line-height: 1;
}
.menu > .iconfont {
    margin: auto .8rem auto 0;
    font-size: 1.5rem;
    color: var(--primany);
}
.menu > .icon-arrow {
    margin: auto 0 auto auto;
    font-size: 1.2rem;
    color: var(--dark-60);
    transform: rotate(-90deg);
    transition: all ease, 0.2s;
}
.menu-1st {
    position: sticky;
    padding: 0 2rem;
    top: -.1rem;
    height: 4.4rem;
    font-size: 1.6rem;
    background: white;
    z-index: 3;
}
.menu-2nd {
    position: sticky;
    padding: 0 2rem 0 4.4rem;
    top: 4.3rem;
    height: 4.4rem;
    font-size: 1.5rem;
    background: var(--dark-98);
    z-index: 2;
}
.menu-3rd {
    padding: 0 2rem 0 4.4rem;
    height: 4.4rem;
    font-size: 1.4rem;
    color: var(--dark-60);
    background: var(--dark-96);
    z-index: 1;
}
.menu-4th {
    padding: 0 2rem 0 5.8rem;
    height: 4.4rem;
    font-size: 1.5rem;
    background: var(--dark-96);
    z-index: 1;
}
</style>
