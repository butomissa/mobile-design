<template>
<div id="input-form">
    <Header/>
    <div id="form">
        <div class="title">{{ title }}<div class="sub-title">{{ text }}</div></div>
        <div class="input-item">
            <span class="input-title"><span class="star">*</span>售后分类</span>
            <Select :data="afterSale" title="请选择售后分类" v-model="afterSaleId" style="width: 100%"/>
        </div>
        <div class="error"/>
        <div class="input-item">
            <span class="input-title"><span class="star">*</span>{{ content[0].title }}</span>
            <input id="input0" class="input" @focus="inputFocus(0)" :placeholder="content[0].placeholder" v-model="content[0].data" />
        </div>
        <div class="error" id="error0"/>
        <div class="input-item">
            <span class="input-title"><span class="star">*</span>{{ content[1].title }}</span>
            <input id="input1" class="input" @focus="inputFocus(1)" :placeholder="content[1].placeholder" v-model="content[1].data" />
        </div>
        <div class="error" id="error1"/>
        <div class="input-item">
            <span class="input-title"><span class="star">*</span>{{ content[2].title }}</span>
            <input id="input2" class="input" style="width: calc(100% - 21rem)" @focus="inputFocus(2)" :placeholder="content[2].placeholder" v-model="content[2].data" />
            <div class="btn" id="get-verify" @click="getVerify">{{ verifyText }}</div>
        </div>
        <div class="error" id="error2"/>
        <div class="input-item">
            <span class="input-title"><span class="star">*</span>地市</span>
            <City v-model="cityId" style="width: 100%"/>
        </div>
        <div class="error"/>
        <div class="input-item">
            <span class="input-title"><span class="star">*</span>{{ content[3].title }}</span>
            <input id="input3" class="input" @focus="inputFocus(3)" :placeholder="content[3].placeholder" v-model="content[3].data" />
        </div>
        <div class="error" id="error3"/>
        <div class="input-item">
            <span class="input-title"><span class="star">*</span>{{ content[4].title }}</span>
            <input id="input4" class="input" @focus="inputFocus(4)" :placeholder="content[4].placeholder" v-model="content[4].data" />
        </div>
        <div class="error" id="error4"/>
        <div class="input-item" style="height: 8rem">
            <span class="input-title">{{ content[5].title }}</span>
            <textarea class="input" id="textarea" :placeholder="content[5].placeholder" v-model="content[5].data"></textarea>
        </div>
        <div id="btn" class="btn" @click="submitClick()">确 定</div>
    </div>
    <Footer/>
    <Float/>
    <div id="alert" v-show="showAlert">
        <div id="alert-title">{{ alertTitle }}</div>
        <div id="alert-text">{{ alertText }}</div>
        <div id="alert-btn" class="btn" @click="exitClick()">确 定</div>
    </div>
    <div id="mask" @click="exitClick()" v-show="showAlert"></div>
</div>
</template>

<script>
import City from '@/components/City'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Float from '@/components/Float'
import Select from '@/components/Select'

export default {
    components: {
        Header, Footer, Float, City, Select,
    },
    methods: {
        submitClick() {
            this.check();
            if (!this.hasError) {
                this.showAlert = true
                document.body.style.overflow = "hidden"
            }
        },
        inputFocus(index) {
            document.getElementById("input" + index).removeAttribute("style")
            document.getElementById("error" + index).innerText = ""
        },
        getVerify() {
            document.getElementById("get-verify").style.background = "var(--dark-80)"
            this.verifyText = "XX秒"
        },
        check() {
            this.hasError = false;
            for (var i = 0; i < 4; i++) { this.inputFocus(i) }
            for (i = 0; i < this.content.length - 2; i++) {
                if (this.content[i].data === "") {
                    document.getElementById("error" + i).innerText = "请填写正确的 " + this.content[i].title
                    document.getElementById("input" + i).style.borderColor = "var(--red)"
                    this.hasError = true
                }
            }
        },
        exitClick() {
            this.showAlert = false
            document.body.style.overflow = "auto"
        }
    },
    data() {
        return {
            hasError: false, showAlert: false,
            title: "售后智能在线",
            text: "为了更好为您服务，请填写以下信息，我们将尽快与您联系",
            content: [
                { title: "联系人", placeholder: "请填写联系人姓名", data: "" },
                { title: "联系号码", placeholder: "请填写联系人号码", data: "" },
                { title: "验证码", placeholder: "请填写验证码", data: "" },
                { title: "详细地址", placeholder: "请填写详细地址，精确到门牌号", data: "" },
                { title: "单位名称", placeholder: "请填写单位名称", data: "" },
                { title: "问题描述", placeholder: "请大致描述您的问题，以便开展下一步工作", data: "" },
            ],
            afterSale: [ "售后/保障分类 0", "售后/保障分类 1", "售后/保障分类 2" ],
            afterSaleId: 0,
            cityId: [19, 0],
            verifyText: "获取",
            alertTitle: "已收到您的问题咨询",
            alertText: "我们将尽快与您联系",
        }
    },
}
</script>

<style scoped>
#input-form {
    margin: 0 auto;
    width: 100%;
    max-width: 90rem;
}
#form {
    display: flex;
    flex-direction: column;
    width: 100%;
}
.title {
    margin: auto;
    padding: 6rem 4rem 4rem 4rem;
    font-size: 2.4rem;
    line-height: 1.4;
    font-weight: 600;
    text-align: center;
    color: var(--dark-20);
    z-index: 2;
}
.sub-title {
    padding: 1rem 0 0 0;
    font-size: 1.6rem;
    line-height: 1.4;
    font-weight: 400;
    color: var(--dark-60);
}

.input-item {
    display: flex;
    padding: 0 2rem;
    margin: 0 auto;
    height: 4rem;
    width: 100%;
    max-width: 50rem;
}
.star {
    margin: auto .4rem auto auto;
    color: var(--red);
    font-size: 1.6rem;
}
.input-title {
    display: block;
    margin: auto 1rem auto 0;
    min-width: 8rem;
    text-align: right;
    font-size: 1.6rem;
    white-space: nowrap;
}
.input {
    margin: auto;
    padding: .8rem;
    height: 4rem;
    width: 100%;
    font-size: 1.6rem;
    border: 0;
    border-bottom: .1rem solid var(--dark-90);
    outline: none;
    transition: all ease, 0.3s;
}
.input:focus, .input:hover {
    border-color: var(--primany);
}
.error {
    margin: auto;
    padding: .6rem 0 1.2rem 11.8rem;
    font-size: 1.4rem;
    height: 3.2rem;
    width: 100%;
    max-width: 50rem;
    text-align: left;
    color: var(--red);
    transition: all ease, 0.3s;
}
#get-verify {
    margin: auto auto auto 2rem;
    padding: 1rem 0;
    min-width: 10rem;
    font-size: 16px;
    line-height: 16px;
    transition: all ease, 0.3s;
}
#textarea {
    margin: auto;
    resize: none;
    height: 8rem;
    line-height: 1.5;
}

#btn {
    margin: 4rem auto;
    width: 14rem;
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
#alert {
    position: fixed;
    display: flex;
    flex-direction: column;
    padding: 4rem 3rem;
    height: 26rem;
    width: 80%;
    max-width: 50rem;
    top: 50%;
    left: 50%;
    text-align: center;
    background: white;
    transform: translate(-50%, -50%);
    z-index: 12;
}
#alert-title {
    font-size: 2rem;
    font-weight: 800;
}
#alert-text {
    margin: 3rem auto auto auto;
    font-size: 1.6rem;
    line-height: 1.5;
    color: var(--dark-60);
}
#alert-btn {
    margin: auto auto 0 auto;
    width: 14rem;
}
</style>