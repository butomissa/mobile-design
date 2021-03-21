<template>
<div id="news">
    <Header/>
    <div id="main">
        <div id="left">
            <div id="title">{{ title }}</div>
            <span id="date"></span>
            <span id="author">{{ author }}</span>
            <div class="content" v-for="(item, index) of content" :key="'content' + index">
                <img class="content-img" v-if="item.img" :src="item.img">
                <span class="content-title" v-if="item.title">{{ item.title }}</span>
                <span class="content-text" v-for="(text, val) of item.text" :key="'text' + val">{{ text }}</span>
            </div>
        </div>
        <div id="right">
            <div id="list-title">新闻列表</div>
            <a class="news-item" v-for="(item, index) of newsList" :key="'news' + index" :href="item.link">
                <img :src="newsImg[0]" class="news-img">
                <div class="news-title">{{ item.title }}
                    <div class="news-text">{{ item.text }}</div>
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
    name: 'News',
    components: {
        Header, Footer, Float,
    },
    mounted() {
        let d = new Date()
        document.getElementById("date").innerText = d.getFullYear() + "年" + d.getMonth() + "月" + d.getDate() + "日 " +
            d.getHours().toString().padStart(2,"0") + ":" + d.getMinutes().toString().padStart(2,"0") + ":" + d.getSeconds().toString().padStart(2,"0")
    },
    methods: {
        
    },
    data() {
        return {
            banner: require("@/assets/img/about.jpg"),
            title: "年报深解：英伟达或将由盛转衰？三大挑战不容忽视",
            author: "A平台资讯",
            content: [
                { img: require("@/assets/img/solution-0.jpg"),
                text: [ "以纳米尺度工艺制造的芯片，是人类自工业革命至今能够量产的最精巧、最神奇的造物。目前高性能芯片的运算能力早已远超人类，且正在源源不断地帮人类把人工智能（AI）这种过往只存在于科幻小说和科学家们头脑中的概念转化为现实。",
                "与此同时，小小的芯片也成为了国际博弈的重要筹码，竟可以让芯片强国死死卡住别国的发展命脉。" ],
                },
                { title: "英伟达迎来巅峰时刻",
                text: [ "近日，英伟达公布了其截至1月31日的2021财年年报。年报显示，整个2021财年，英伟达营收同比增长53%至167亿美元，净利润同比增长55%至43亿美元。营收、净利润均实现高速增长，双双创下新的历史纪录。",
                "英伟达2021财年收入的高速增长，尤其值得一提。不仅在2021财年实现了上市以来最高的增速，而且单是第四财季50.03亿美元的营收额，就与其5年前2016财年整个财年的营收额相当。",
                "资本市场并没有辜负英伟达的努力。在过去短短5年间，其股价实现了20倍的爆炸式增长。当前英伟达总市值依旧保持在3300亿美元以上的高位，稳坐全球市值第一芯片（设计）公司的宝座。",
                "若横向对比英特尔，我们可以轻易发现，资本市场对英伟达的成长潜力明显怀有更多期待。在截止12月26日的2020财年，英特尔全财年营收高达779亿美元，净利润高达209亿元。无论是营收，还是净利润，英特尔都相当于英伟达同时期的4倍多。但就市值而言，英特尔近日维持在2400亿美元左右，相当于英伟达的2/3。",
                "为何资本市场对英伟达如此偏爱？因为面向汹涌而来的人工智能大潮，英伟达已经走在了所有芯片企业的前面。资本市场对英伟达的高看，正是出于对英伟达在人工智能领域领先优势的看好。" ],
                },
                { title: "受强劲的市场需求推动", img: require("@/assets/img/solution-1.jpg"),
                text: [ "英伟达在2021财年亮眼的表现，确实对得起外界的期待。在2021财年，英伟达在游戏、专业可视化、数据中心、汽车行业（智能座舱）四大领域的业务均取得突破性的业绩增长。",
                "尤其在游戏和数据中心两大核心领域，英伟达创下了新的财年收入纪录。2021财年，英伟达游戏GPU实现收入77.6亿美元、占其总收入的46.5%。游戏业务的增长，部分得益于AI技术提升了其产品的市场竞争力。",
                "当然，数据中心业务同样如此。在英伟达166.8亿美元的财年收入中，“云”（数据中心）业务贡献67亿美元，占比40.2%。这一业务按年增长率高达124%，也是英伟达增长最快的业务。而英伟达在2021财年成功完成对Mellanox的收购，也为其数据中心业务业绩增长提供了巨大的助力。",
                "首先，在游戏行业，高性能显卡的需求仍在稳健增长。次时代游戏的接连发布、高分辨率高刷新率屏幕的普及等因素，都在同时刺激全球玩家对游戏显卡进行更新换代，而在全球游戏GPU市场，过去包括AMD在内，其他厂商对英伟达都没有太大威胁。" ],
                },
                { title: "不容忽视的三大挑战", img: require("@/assets/img/solution-2.jpg"),
                text: [ "英伟达2021财年能够实现破纪录的高速增长，离不开外界宏观条件的积极影响。但对英伟达而言，外部环境的影响，不可能永远都是积极的。事实上，现在由外部环境产生的三大挑战已经摆在英伟达面前，能否应对好这三大挑战，将对英伟达的未来发展产生重大影响。",
                "总之，若考虑到这些问题，那么英伟达的处境，就并不像表面看起来那样乐观。其在2021财年的惊人增长，想要在之后再次复制难度颇大。从这个角度看，或许当前英伟达的辉煌成绩，将会成为其下个阶段由盛转衰的开始。" ],
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
        }
    }
}
</script>

<style scoped>
#news {
    margin: 0 auto;
    width: 100%;
    max-width: 90rem;
}
#main {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}
#left {
    padding: 6.4rem 2rem 0 2rem;
    margin: 0 auto;
    width: 100%;
    max-width: 50rem;
    text-align: left;
}
#right {
    padding: 7rem 2rem 0 2rem;
    margin: 0 auto;
    width: 100%;
    max-width: 40rem;
    text-align: left;
}
#title {
    padding: 0 0 1.6rem 0;
    width: 100%;
    font-size: 2.6rem;
    line-height: 1.4;
    font-weight: 800;
    color: var(--dark-20);
}
#date {
    margin: auto 1.6rem auto 0;
    font-size: 1.4rem;
    color: var(--dark-60);
}
#author {
    font-size: 1.4rem;
}
.content {
    padding: 2rem 0 0 0;
    text-align: center;
}
.content-img {
    margin: 1rem auto;
    height: auto;
    width: 100%;
    max-width: 40rem;
}
.content-title {
    display: block;
    margin: 1rem auto;
    font-size: 2rem;
    line-height: 1.2;
    font-weight: 600;
    text-align: left;
    color: var(--dark-20);
}
.content-text {
    display: block;
    margin: 1rem auto auto auto;
    font-size: 1.6rem;
    line-height: 1.7;
    text-align: justify;
    text-indent: 2em;
    color: var(--dark-40);
}

#list-title {
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--dark-20);
}
.news-item {
    display: flex;
    margin: 1.6rem auto;
    padding: 1rem;
    width: 100%;
    height: 9.2rem;
    /* min-height: 92px; */
    background: white;
    box-shadow: var(--shadow-box);
}
.news-img {
    height: 7.2rem;
    width: auto;
}
.news-title {
    margin: auto;
    padding: 0 .6rem 0 1.2rem;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.6rem;
    /* line-height: 20px; */
    font-weight: 600;
    color: var(--primany);
}
.news-text {
    display: -webkit-box;
    padding: .6rem 0 0 0;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    height: 4.6rem;
    overflow: hidden;
    text-align: justify;
    font-size: 1.4rem;
    line-height: 2rem;
    font-weight: 400;
    white-space: normal;
    color: var(--dark-60);
}
</style>