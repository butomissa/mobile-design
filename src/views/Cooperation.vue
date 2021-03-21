<template>
<div id="cooperation">
    <Header ref="header"/>
    <img :src="banner" id="img">
    <div id="title"><div id="subtitle">{{ subtitle }}</div>{{ title }}</div>
    <div class="module">
        <div id="text">
            <span class="text-item" v-for="(item, index) of coopText"
            :key="'text' + index">{{ item.para }}</span>
        </div>
        <a class="btn submit-btn" href="/inputCoop">{{ btnText }}</a>
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
    name: 'Cooperation',
    components: {
        Header, Footer, Float,
    },
    mounted() {
        // header
        this.$refs.header.highlight(3)
    },
    data() {
        return {
            btnText: "申请加入",
            banner: require("@/assets/img/cooperation.jpg"),
            title: "生产合作",
            subtitle: "XX公司广东分公司 A平台",
            coopText: [
                { para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non feugiat dui. Aenean rutrum convallis quam rutrum tempor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam ante odio, semper sed nisi vitae, vestibulum fermentum odio. Vivamus diam enim, mattis eget sapien quis, aliquet iaculis massa. Cras lacus leo, rhoncus vitae bibendum ac, molestie non enim. Praesent consequat nisl turpis. Sed vehicula augue vitae tellus molestie, ut accumsan elit vestibulum. Maecenas at urna a ante molestie elementum. Maecenas quis erat velit. Duis posuere congue justo ut gravida. Mauris suscipit iaculis sem quis feugiat. Aenean ut lacus a magna lobortis porta. Nam auctor varius pulvinar. Vivamus cursus mattis tincidunt. Donec lacinia neque sit amet molestie interdum." },
                { para: "Phasellus ullamcorper odio vitae lorem laoreet efficitur. Pellentesque semper, dolor vitae porta congue, tellus neque cursus tellus, in laoreet massa velit eu purus. Curabitur dictum nisl non suscipit fringilla. Aenean hendrerit lobortis erat sit amet mattis. Etiam quis turpis neque. Nam nec blandit turpis. Curabitur vel suscipit massa, sed pellentesque leo. Pellentesque eu finibus ligula." },
                { para: "Pellentesque dapibus nisl eget nunc euismod, in vulputate lectus egestas. Aenean nec pellentesque est, vitae ultricies nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque ac mattis eros. Donec vel sapien sit amet ante tristique semper. Cras tempus purus vitae neque blandit porttitor. Suspendisse volutpat neque eu tempus imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris lobortis lobortis magna quis gravida. Donec condimentum dui id malesuada congue. Vestibulum mollis mauris eros, eu gravida nibh dapibus vel. Praesent viverra odio a mi blandit dignissim. Phasellus quis quam dictum, vehicula eros et, dictum dolor. In dictum purus vel tortor pellentesque, vitae maximus est lobortis. Nunc velit justo, pulvinar at ipsum id, efficitur laoreet tellus. Morbi non feugiat turpis." },
                { para: "Cras quis est congue, lacinia massa ut, tristique nulla. Vestibulum posuere dolor in ex tempus dictum posuere vel mauris. Etiam laoreet, velit at ultricies ornare, sapien nibh vulputate felis, in rutrum sem quam ac tortor. Nunc a urna sed arcu pretium tincidunt id a risus. Curabitur efficitur erat et sem fermentum gravida. Donec quis justo et nisl bibendum vulputate eget vel ligula. Integer quis ultricies elit. Fusce odio erat, suscipit sed lacus eu, venenatis accumsan massa. Mauris ornare elementum diam, tempus commodo nulla ullamcorper non. Pellentesque rhoncus turpis non viverra porta." },
                { para: "Suspendisse quam ex, facilisis vel dapibus sed, tincidunt vitae orci. Nunc in ultrices dui, et volutpat metus. Maecenas semper sapien a urna dapibus egestas. Cras et ligula a dolor blandit mattis. Sed scelerisque porttitor porttitor. Nunc semper cursus ullamcorper. Quisque bibendum mauris non nulla viverra dapibus vel aliquam diam. Sed pulvinar magna in elit mattis, eu convallis sapien molestie." },
            ],
        }
    }
}
</script>

<style scoped>
#cooperation {
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
    color: white;
}
#subtitle {
    font-size: 2rem;
    font-weight: 400;
    letter-spacing: 0;
    color: white;
}

.module {
    position: relative;
    width: 100%;
    text-align: center;
    overflow: hidden;
}
#text {
    margin: 4rem auto;
    padding: 0 4rem;
    width: 100%;
    text-align: justify;
    text-indent: 2em;
    color: var(--dark-20);
}
.text-item {
    display: block;
    margin: 1rem auto;
    font-size: 1.6rem;
    line-height: 1.5;
}

.submit-btn {
    width: 18rem;
}
</style>