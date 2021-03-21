<template>
<div id="about">
    <Header ref="header"/>
    <img :src="banner" id="img">
    <div id="title"><div id="subtitle">{{ subtitle }}</div>{{ title }}</div>
    <div id="bar">
        <span class="bar-title" v-for="(item, index) of moduleName" :key="'title' + index"
        :id="'title' + index" @click="mtClick(index)">{{ item.title }}</span>
    </div>
    <div style="height: 5rem"></div>
    <div id="module0" class="module">
        <p class="title">{{ moduleName[0].title }}</p>
        <div class="about-item" v-for="(item, index) of about" :key="'about' + index">
            <span class="about-title">{{ item.title }}<span class="about-en">{{ item.en }}</span></span>
            <span class="about-text" v-for="(text, val) of item.text" :key="'text' + val">{{ text }}</span>
        </div>
    </div>
    <div id="module1" class="module">
        <p class="title">{{ moduleName[1].title }}</p>
        <div id="news">
            <a id="big-news" :href="bigNews[0].link">
                <img :src="newsImg[1]" id="big-news-img">
                <div id="big-news-title">{{ bigNews[0].title }}</div>
                <div id="big-news-text">{{ bigNews[0].text }}</div>
            </a>
            <div id="news-list">
                <a class="news-item" v-for="(item, index) of newsList" :key="'news' + index" :href="item.link">
                    <img :src="newsImg[0]" class="news-img">
                    <div class="news-title">{{ item.title }}
                        <div class="news-text">{{ item.text }}</div>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div id="module2" class="module">
        <p class="title">{{ moduleName[2].title }}</p>
        <div id="honor">
            <div class="honor-item" v-for="(item, index) of honor"
            :key="'honor' + index" :id="'honor' + index">
                <img :src="item.img" class="honor-img">
                <div class="honor-title">{{ item.title }}</div>
                <div class="honor-text">{{ item.text }}</div>
            </div>
        </div>
    </div>
    <div id="module3" class="module">
        <p class="title">{{ moduleName[3].title }}</p>
        <div id="contact">
            <a class="contact-item" v-for="(item, index) of contact"
            :key="'contact' + index" :id="'contact' + index" :href="item.link">
                <div class="iconfont" :class="item.icon"/>
                <div class="contact-title">{{ item.title }}
                    <div class="contact-text">{{ item.text }}</div>
                </div>
            </a>
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
    name: 'About',
    components: {
        Header, Footer, Float,
    },
    mounted() {
        // header
        this.$refs.header.highlight(4)
        window.addEventListener('scroll', this.scrollToTop)
        window.addEventListener('resize', this.resize)
        this.scrollToTop()
        this.resize()
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
        resize() {
            if (document.getElementById("about").offsetWidth >= 700) {
                //新闻模块
                document.getElementById("news").style.flexDirection = "row-reverse"
                document.getElementById("big-news").style.width = "50%"
                document.getElementById("news-list").style.width = "calc(50% - 4rem)"
                //资质荣誉模块
                for (let i = 0; i < this.honor.length; i++) {
                    document.getElementById("honor" + i).style.width = "calc(33.3% - 1.6rem)"
                }
                //联系我们模块
                for (let i = 0; i < this.contact.length; i++) {
                    document.getElementById("contact" + i).style.width = "calc(50% - 2rem)"
                }
            } else {
                document.getElementById("news").removeAttribute("style")
                document.getElementById("big-news").removeAttribute("style")
                document.getElementById("news-list").removeAttribute("style")
                for (let i = 0; i < this.honor.length; i++) {
                    document.getElementById("honor" + i).removeAttribute("style")
                }
                for (let i = 0; i < this.contact.length; i++) {
                    document.getElementById("contact" + i).removeAttribute("style")
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
            banner: require("@/assets/img/about.jpg"),
            title: "关于我们",
            subtitle: "XX公司广东分公司 A平台",
            moduleName: [
                { title: "XX公司广东分公司 A平台", top: 420 },
                { title: "新闻资讯", top: 946 },
                { title: "资质荣誉", top: 1656 },
                { title: "联系我们", top: 2356 },
            ],
            about: [
                { title: "XX公司", en: "XX Company™",
                text: [ "XX集团有限公司（简称“XX公司”）于2077年7月7日创立，Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." ],
                },
                { title: "XX公司广东分公司", en: "XX Company™ Guangdong Branch",
                text: [ 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.' ],
                },
                { title: "XX公司广东分公司 A平台", en: "XX Company™ Guangdong Branch A Platform",
                text: [ "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
                    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
                    'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.' ],
                },
            ],
            newsImg: [ require("@/assets/img/news.jpg"), require("@/assets/img/bignews.jpg") ],
            newsList: [
                { title: "反击美国禁令！中国芯片业收入达8848亿，欧洲17国也将行动",
                text:"自去年9月美国发布芯片新规后，这场芯片较量已经逐步蔓延成为了“全球大战”。",
                link: "/news" },
                { title: "中国商家“占领”亚马逊 日媒：师从中国的时代已然到来",
                text:"最近20年，随着中国互联网飞速发展，输出中国经验的“Copy from China”（师从中国）的时代已然到来。",
                link: "/news" },
                { title: "胡润全球富豪榜发布：马斯克财富达到1.28万亿，首次成为世界首富",
                text:"胡润研究院今日发布《2021世茂港珠澳口岸城·胡润全球富豪榜》, 计算截止日期为2021年1月15日。",
                link: "/news" },
                { title: "年报深解：英伟达或将由盛转衰？三大挑战不容忽视",
                text:"当前，从市值来看，全球价值最高的芯片企业，是芯片设计巨头英伟达。而它正处于前所未有的辉煌时期。",
                link: "/news" },
            ],
            bigNews: [
                { title: "年报深解：英伟达或将由盛转衰？三大挑战不容忽视",
                text:"当前，从市值来看，全球价值最高的芯片企业，是芯片设计巨头英伟达。而它正处于前所未有的辉煌时期。",
                link: "/news" },
            ],
            honor: [
                { img: require("@/assets/img/honor-1.jpg"), title: "资质荣誉 A", text: "A平台收入规模、连接规模、新增连接数三项第一。" },
                { img: require("@/assets/img/honor-0.jpg"), title: "资质荣誉 B", text: "第四次荣任广东省产业联盟轮值主席，会员单位由70家发展至200多家，连续多年举办行业峰会。" },
                { img: require("@/assets/img/honor-2.jpg"), title: "资质荣誉 C", text: "A平台连接数已达77亿，其中子平台B连接数超过7777万。" },
            ],
            contact: [
                { icon: "icon-phone", title: "售前咨询电话 (周一至周五 9:00-17:30)", text: "提供购买咨询，帮您排忧解惑！热线电话：020-77777777" },
                { icon: "icon-online", title: "售前在线咨询 (周一至周五 9:00-17:30)", text: "售前咨询在线客服，常见问题在线解答！", link:"/inputAdvisory" },
                { icon: "icon-service", title: "售后智能在线", text: "售后问题智能诊断，匹配最合适的人工服务", link:"/inputAfterSale" },
                { icon: "icon-repair", title: "意见反馈", text: "为了提升服务质量，我们期待您的建议", link:"/inputFeedback" },
            ],
        }
    }
}
</script>

<style scoped>
#about {
    position: relative;
    margin: 0 auto;
    width: 100vw;
    max-width: 90rem;
    overflow: hidden;
}
#img {
    margin: 0 0 0 calc(50% - 45rem);
    z-index: -2;
}
#title {
    position: absolute;
    top: 22rem;
    left: 5%;
    height: 30rem;
    max-width: 60rem;
    font-size: 5rem;
    line-height: 8rem;
    font-weight: 600;
    letter-spacing: .4rem;
    white-space: nowrap;
    color: var(--dark-20);
}
#subtitle {
    font-size: 2rem;
    font-weight: 400;
    letter-spacing: 0;
    color: var(--dark-20);
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

.about-item {
    margin: auto;
    padding: 0 4rem;
    width: 100%;
    max-width: 90rem;
}
.about-title {
    display: block;
    margin: 4rem auto 1.4rem auto;
    font-size: 1.8rem;
    font-weight: 600;
    text-align: left;
    color: var(--dark-20);
}
.about-en {
    margin: auto 1.4rem;
    font-size: 1.4rem;
    line-height: 2rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--dark-80);
}
.about-text {
    display: block;
    margin: 1rem auto;
    font-size: 1.6rem;
    line-height: 2.8rem;
    text-align: justify;
    text-indent: 2em;
    color: var(--dark-40);
}

#news {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    width: 100%;
    text-align: center;
}
#big-news {
    display: block;
    margin: .6rem auto;
    padding: 1.6rem;
    width: 90vw;
    background: white;
    box-shadow: var(--shadow-btn);
}
#big-news-img {
    max-height: 100%;
    max-width: 100%;
    background: var(--dark-90);
}
#big-news-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 1.6rem auto 1rem auto;
    font-size: 1.6rem;
    font-weight: 600;
    text-align: left;
    color: var(--primany);
}
#big-news-text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    height: 6.6rem;
    font-size: 1.5rem;
    line-height: 2.2rem;
    text-align: justify;
    color: var(--dark-60);
}

#news-list {
    display: flex;
    margin: 0 auto;
    flex-wrap: wrap;
    /* flex-direction: column; */
    justify-content: space-between;
    width: 90vw;
}
.news-item {
    display: flex;
    margin: .6rem auto;
    padding: 1.6rem;
    width: 100%;
    background: white;
    box-shadow: var(--shadow-btn);
}
.news-img {
    margin: auto;
    height: 9rem;
    width: 12rem;
}
.news-title {
    margin: auto 0 auto 1.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    font-size: 1.6rem;
    font-weight: 600;
    text-align: left;
    color: hsla(200, 98%, 48%, 1);
    transition: all ease, 0.3s;
}
.news-text {
    display: -webkit-box;
    margin: .6rem auto auto auto;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    height: 6rem;
    overflow: hidden;
    text-align: justify;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 400;
    white-space: normal;
    color: var(--dark-60);
}

#honor {
    display: flex;
    margin: auto;
    flex-wrap: wrap;
    justify-content: space-between;
    width: calc(100% - 2rem);
    max-width: 86rem;
}
.honor-item {
    position: relative;
    margin: 2rem auto;
    padding: 2rem;
    width: 90%;
    box-shadow: var(--shadow-box);
}
.honor-img {
    max-height: 100%;
    max-width: 100%;
}
.honor-title {
    position: absolute;
    padding: 2rem;
    left: -.2rem;
    bottom: 40%;
    font-size: 2.2rem;
    font-weight: 800;
    transform: rotate(-4deg);
    color: white;
    background: var(--primany);
    box-shadow: 1rem .6rem 0 0 hsla(200, 98%, 48%, 0.3);
}
.honor-text {
    display: -webkit-box;
    margin: 1.4rem auto auto auto;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    height: 6.6rem;
    font-size: 1.6rem;
    line-height: 2.2rem;
    text-align: justify;
    color: var(--dark-20);
}

#contact {
    display: flex;
    flex-wrap: wrap;
    padding: 0 2rem 3rem 2rem;
    width: 100%;
}
.contact-item {
    display: flex;
    margin: 1.4rem auto 0 auto;
    padding: 1.4rem;
    width: 100%;
    border-radius: 1.2rem;
    background: white;
    box-shadow: var(--shadow-btn);
}
.contact-item > .iconfont {
    margin: auto;
    padding: 1rem;
    font-size: 2rem;
    border-radius: 50%;
    border: 1px solid var(--primany);
    background: var(--bg-primany);
    color: var(--primany);
}
.contact-title {
    margin: auto auto auto 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    font-size: 1.4rem;
    font-weight: 600;
    text-align: left;
    color: var(--primany);
}
.contact-text {
    display: -webkit-box;
    margin: .4rem auto 0 auto;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    white-space: normal;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2rem;
    color: var(--dark-60);
}
</style>