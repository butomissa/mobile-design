<template>
<div id="signup">
    <div id="header">
        <img id="logo" :src="logo">
        <p id="title">{{ title }}</p>
        <p id="text">注册账号</p>
    </div>
    <div id="signup-form">
        <div id="input-form">
            <div class="input-item" @click="putFocus(0)"> <!-- 账号 -->
                <input type="text" class="input" id="input0" @focus="inputFocus(0)"
                v-model.trim="input[0].data">
                <div class="label" id="label0">{{ input[0].name }}</div>
                <div class="placeholder" v-show="input[0].data === ''">请填写{{ input[0].name }}</div>
                <div class="error" id="error0"/>
            </div>
            <div class="input-item" @click="putFocus(1)"> <!-- 密码 -->
                <input type="password" class="input" id="input1" @focus="inputFocus(1)"
                v-model.trim="input[1].data">
                <div class="label" id="label1">{{ input[1].name }}</div>
                <div class="placeholder" v-show="input[1].data === ''">请填写{{ input[1].name }}</div>
                <div class="error" id="error1"/>
            </div>
            <div class="input-item" @click="putFocus(2)"> <!-- 再次填写密码 -->
                <input type="password" class="input" id="input2" @focus="inputFocus(2)"
                v-model.trim="input[2].data">
                <div class="label" id="label2">{{ input[2].name }}</div>
                <div class="placeholder" v-show="input[2].data === ''">请{{ input[2].name }}</div>
                <div class="error" id="error2"/>
            </div>
            <div class="input-item" @click="putFocus(3)"> <!-- 联系人姓名 -->
                <input type="text" class="input" id="input3" @focus="inputFocus(3)"
                v-model.trim="input[3].data">
                <div class="label" id="label3">{{ input[3].name }}</div>
                <div class="placeholder" v-show="input[3].data === ''">请填写{{ input[3].name }}</div>
                <div class="error" id="error3"/>
            </div>
            <div class="input-item" @click="putFocus(4)"> <!-- 身份证 -->
                <input type="text" class="input" id="input4" @focus="inputFocus(4)"
                v-model.trim="input[4].data">
                <div class="label" id="label4">{{ input[4].name }}</div>
                <div class="placeholder" v-show="input[4].data === ''">请填写{{ input[4].name }}</div>
                <div class="error" id="error4"/>
            </div>
            <div class="input-item" @click="putFocus(5)"> <!-- 手机号码 -->
                <input type="text" class="input" id="input5" @focus="inputFocus(5)"
                v-model.trim="input[5].data">
                <div class="label" id="label5">{{ input[5].name }}</div>
                <div class="placeholder" v-show="input[5].data === ''">请填写{{ input[5].name }}</div>
                <div class="error" id="error5"/>
            </div>
            <div class="input-item" @click="putFocus(6)"> <!-- 手机验证码 -->
                <input type="text" class="input" id="input6" @focus="inputFocus(6)"
                v-model.trim="input[6].data">
                <div class="label" id="label6">{{ input[6].name }}</div>
                <div class="placeholder" v-show="input[6].data === ''">请填写{{ input[6].name }}</div>
                <div class="btn" id="get-verify" @click="getVerify">{{ verifyText }}</div>
                <div class="error" id="error6"/>
            </div>
            <div class="input-item" @click="putFocus(7)"> <!-- 单位名称 -->
                <input type="text" class="input" id="input7" @focus="inputFocus(7)"
                v-model.trim="input[7].data">
                <div class="label" id="label7">{{ input[7].name }}</div>
                <div class="placeholder" v-show="input[7].data === ''">请填写{{ input[7].name }}</div>
                <div class="error" id="error7"/>
            </div>
            <div class="input-item"> <!-- 证件类型 -->
                <Select class="select" :data="cert" v-model="certId" title="请选择证件类型" left="1.2rem" fontSize="1.4rem"/>
                <div class="label" id="label8">{{ input[8].name }}</div>
                <div class="error" id="error8"/>
            </div>
            <div class="input-item" @click="putFocus(9)"> <!-- 证件号码 -->
                <input type="text" class="input" id="input9" @focus="inputFocus(9)"
                v-model.trim="input[9].data">
                <div class="label" id="label9">{{ input[9].name }}</div>
                <div class="placeholder" v-show="input[9].data === ''">请填写{{ input[9].name }}</div>
                <div class="error" id="error9"/>
            </div>
            <div id="btn-signup" @click="signupClick()">注册账号</div>
        </div>
        <div style="display: flex">
            <a id="btn-index" href="/">返回首页</a>
            <a id="btn-login" href="/login">已有账号, 直接登录</a>
        </div>
    </div>
</div>
</template>

<script>
import Select from '@/components/Select'

export default {
    name: 'signup',
    components: {
        Select,
    },
    mounted() {
        if (document.getElementById("signup").offsetWidth >= 700) {
            document.getElementById("signup").style.transform = "scale(1.3, 1.3)"
            document.getElementById("signup").style.padding = "20rem 3rem 3rem 3rem"
        }
    },
    methods: {
        putFocus(index) {
            document.getElementById("input" + index).focus()
        },
        inputFocus(index) {
            document.getElementById("input" + index).removeAttribute("style")
            document.getElementById("label" + index).removeAttribute("style")
            document.getElementById("error" + index).innerText = ""
        },
        getVerify() {
            if (this.input[3].data === "") {
                document.getElementById("input3").style.borderColor = "var(--red)"
                document.getElementById("error3").innerText = "请填写正确的手机号"
            } else {
                document.getElementById("get-verify").style.background = "var(--dark-90)"
                document.getElementById("get-verify").style.color = "white"
                this.verifyText = "XX秒"
            }
        },
        signupClick() {
            for (let i = 0; i < 10; i++) {
                if (i != 4 && i != 8) {
                    document.getElementById("error" + i).innerText = ""
                    document.getElementById("input" + i).removeAttribute("style")
                    document.getElementById("label" + i).removeAttribute("style")
                }
                if (i === 2) {
                    if (this.input[2].data != this.input[1].data) {
                        document.getElementById("error2").innerText = "两次填写的密码不一致"
                        document.getElementById("input2").style.borderColor = "hsla(0, 88%, 60%, 1)"
                        document.getElementById("label2").style.color = "hsla(0, 88%, 60%, 1)"
                    }
                } else if (this.input[i].data === "" && i != 4 && i != 8) {
                    document.getElementById("error" + i).innerText = "请填写正确的" + this.input[i].name
                    document.getElementById("input" + i).style.borderColor = "hsla(0, 88%, 60%, 1)"
                    document.getElementById("label" + i).style.color = "hsla(0, 88%, 60%, 1)"
                }
            }
        },
    },
    data() {
        return {
            input: [
                { name: "账号", data: "" },
                { name: "密码", data: "" },
                { name: "再次填写密码", data: "" },
                { name: "联系人姓名", data: "" },
                { name: "联系人身份证号码（选填）", data: "" },
                { name: "联系人手机号码", data: "" },
                { name: "手机验证码", data: "" },
                { name: "单位/企业名称", data: "" },
                { name: "单位/企业证件类型", data: "" },
                { name: "单位/企业证件号码", data: "" },
            ],
            cert: [ "统一社会信用代码", "组织机构代码证", "其他有效证件" ],
            certId: 0,
            verifyImg: require("@/assets/img/verify.jpg"),
            logo: require("@/assets/logoLight.svg"),
            title: "A平台 · 统一认证平台",
            verifyText: "获取",
        }
    },
}
</script>

<style scoped>
#signup {
    display: flex;
    flex-direction: column;
    padding: 3rem;
    height: 100vh;
    width: 100vw;
    overflow: auto;
    background: url("../assets/img/login.jpg");
    background-size: cover;
    background-position: center;
}
#header {
    margin: auto auto 6% auto;
    text-align: center;
}
#logo {
    height: auto;
    width: 12rem;
}
#title {
    margin: 2rem auto 1rem auto;
    font-size: 1.8rem;
    color: white;
}
#text {
    font-size: 1.6rem;
    color: hsla(0, 0%, 100%, 0.6);
}

#signup-form {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 3rem 0;
    margin: 1rem auto auto auto;
    width: 100%;
    max-width: 44rem;
    border-radius: 2rem;
    background: white;
    box-shadow: var(--shadow-bar);
    animation: formShow 1s;
}
@keyframes formShow {
    0% { opacity: 0; }
    100% { opacity: 1; }
}

#input-form {
    display: flex;
    flex-direction: column;
    margin: auto;
    height: auto;
    width: calc(100% - 6rem);
}
.input-item {
    position: relative;
    padding: 1rem 0 0 0;
    margin: .6rem 0 0 0;
}
.label {
    position: absolute;
    padding: 0 .4rem;
    top: 0;
    left: .7rem;
    font-size: 1.4rem;
    color: var(--dark-60);
    background: white;
}
.input {
    padding-left: 1.2rem;
    height: 4.4rem;
    width: 100%;
    font-size: 1.4rem;
    border-radius: .4rem;
    border: .1rem solid var(--dark-90);
    outline: none;
    color: var(--dark-20);
    box-shadow: var(--shadow-bar);
    transition: all ease, 0.3s;
}
.input:focus, .input:hover, .input-item:hover > .input {
    border-color: var(--primany);
    color: var(--primany);
}
.input:focus ~ .label, .input-item:hover > .label {
    color: var(--primany);
}
.select {
    min-height: 4.4rem;
    height: 4.4rem;
    width: 100%;
    border-radius: .4rem;
    border: .1rem solid var(--dark-90);
    outline: none;
    box-shadow: var(--shadow-bar);
    transition: all ease, 0.3s;
}
.placeholder {
    position: absolute;
    top: 2.4rem;
    left: 1.3rem;
    font-size: 1.4rem;
    color: var(--dark-80);
}
.error {
    margin: .6rem auto 1rem 1.3rem;
    font-size: 1.4rem;
    height: 1.4rem;
    color: var(--red);
}
.verify-img {
    position: absolute;
    top: 1.2rem;
    right: .4rem;
}
#get-verify {
    position: absolute;
    padding: 1rem 0;
    top: 1.4rem;
    right: .4rem;
    width: 9rem;
    font-size: 1.6rem;
    transition: all ease, 0.3s;
}

#btn-signup {
    display: inline-block;
    margin: 1rem 0 3rem auto;
    width: 100%;
    font-size: 1.8rem;
    line-height: 4.4rem;
    text-align: center;
    border-radius: .4rem;
    color: white;
    background: var(--primany);
}

#btn-index, #btn-index:hover, #btn-index:visited {
    margin: auto auto 0 3rem;
    white-space: nowrap;
    font-size: 1.6rem;
    color: var(--dark-80);
}
#btn-login, #btn-login:hover, #btn-login:visited {
    margin: auto 3rem 0 auto;
    white-space: nowrap;
    font-size: 1.6rem;
    color: var(--primany);
}
</style>