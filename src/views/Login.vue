<template>
<div id="login">
    <div id="header">
        <img id="logo" :src="logo">
        <p id="title">{{ title }}</p>
    </div>
    <div id="login-form">
        <div id="tab">
            <div class="tab-item" id="tab0" @click="tabSelect(0)">{{ tab[0] }}</div>
            <div class="tab-item" id="tab1" @click="tabSelect(1)">{{ tab[1] }}</div>
        </div>
        <div id="input-form">
            <div class="input-item" @click="putFocus(0)" v-show="currentTab === 0"> <!-- 账号 -->
                <input type="text" class="input" id="input0" @focus="inputFocus(0)"
                v-model.trim="input[0].data">
                <div class="label" id="label0">{{ input[0].name }}</div>
                <div class="placeholder" v-show="input[0].data === ''">请填写{{ input[0].name }}</div>
                <div class="error" id="error0"/>
            </div>
            <div class="input-item" @click="putFocus(3)" v-show="currentTab === 1"> <!-- 手机号 -->
                <input type="text" class="input" id="input3" @focus="inputFocus(3)"
                v-model.trim="input[3].data">
                <div class="label" id="label3">{{ input[3].name }}</div>
                <div class="placeholder" v-show="input[3].data === ''">请填写{{ input[3].name }}</div>
                <div class="error" id="error3"/>
            </div>
            <div class="input-item" @click="putFocus(1)" v-show="currentTab === 0"> <!-- 密码 -->
                <input type="password" class="input" id="input1" @focus="inputFocus(1)"
                v-model.trim="input[1].data">
                <div class="label" id="label1">{{ input[1].name }}</div>
                <div class="placeholder" v-show="input[1].data === ''">请填写{{ input[1].name }}</div>
                <div class="error" id="error1"/>
            </div>
            <div class="input-item" @click="putFocus(2)"> <!-- 图形验证码 -->
                <input type="text" class="input" id="input2" @focus="inputFocus(2)"
                v-model.trim="input[2].data">
                <div class="label" id="label2">{{ input[2].name }}</div>
                <div class="placeholder" v-show="input[2].data === ''">请填写{{ input[2].name }}</div>
                <img class="verify-img" :src="verifyImg">
                <div class="error" id="error2"/>
            </div>
            <div class="input-item" @click="putFocus(4)" v-show="currentTab === 1"> <!-- 手机验证码 -->
                <input type="text" class="input" id="input4" @focus="inputFocus(4)"
                v-model.trim="input[4].data">
                <div class="label" id="label4">{{ input[4].name }}</div>
                <div class="placeholder" v-show="input[4].data === ''">请填写{{ input[4].name }}</div>
                <div class="btn" id="get-verify" @click="getVerify">{{ verifyText }}</div>
                <div class="error" id="error4"/>
            </div>
            <div>
                <a id="btn-signup" href="/signup">注 册</a>
                <div id="btn-login" @click="loginClick()">登 录</div>
            </div>
            <a id="bottom" href="/">- 广东联通物联网平台 -</a>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Login',
    mounted() {
        this.tabSelect(0)
        if (document.getElementById("login").offsetWidth >= 700) {
            document.getElementById("login").style.transform = "scale(1.3, 1.3)"
        }
    },
    methods: {
        tabSelect(index) {
            document.getElementById("tab0").removeAttribute("style")
            document.getElementById("tab1").removeAttribute("style")
            document.getElementById("tab" + index).style.color = "var(--primany)"
            document.getElementById("tab" + index).style.background = "white"
            document.getElementById("tab" + (index === 0 ? 1 : 0)).style.borderRadius = index === 1 ? "2rem 2rem 2rem 0" : "2rem 2rem 0 2rem"
            this.currentTab = index
            for (let i = 0; i < 5; i++) {
                if (this.currentTab === 0 && i < 3 || this.currentTab === 1 && i > 1) { //tab判断
                    document.getElementById("error" + i).innerText = ""
                    document.getElementById("input" + i).removeAttribute("style")
                    document.getElementById("label" + i).removeAttribute("style")
                }
            }
        },
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
        loginClick() {
            for (let i = 0; i < 5; i++) {
                if (this.currentTab === 0 && i < 3 || this.currentTab === 1 && i > 1) { //tab判断
                    document.getElementById("error" + i).innerText = ""
                    document.getElementById("input" + i).removeAttribute("style")
                    document.getElementById("label" + i).removeAttribute("style")
                    if (this.input[i].data === "") {
                        document.getElementById("error" + i).innerText = "请填写正确的" + this.input[i].name
                        document.getElementById("input" + i).style.borderColor = "var(--red)"
                        document.getElementById("label" + i).style.color = "var(--red)"
                    }
                }
            }
        },
    },
    data() {
        return {
            currentTab: 0,
            tab: [ "账号登录",  "手机号登录", ],
            input: [
                { name: "账号", data: "" },
                { name: "密码", data: "" },
                { name: "图形验证码", data: "" },
                { name: "手机号", data: "" },
                { name: "手机验证码", data: "" },
            ],
            verifyImg: require("@/assets/img/verify.jpg"),
            logo: require("@/assets/logoLight.svg"),
            title: "A平台 · 统一认证平台",
            verifyText: "获取",
        }
    },
}
</script>

<style scoped>
#login {
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
    margin: auto auto calc(6% + 3rem) auto;
    text-align: center;
}
#logo {
    height: auto;
    width: 14rem;
}
#title {
    margin: 2.4rem auto 0 auto;
    font-size: 2rem;
    color: white;
}

#login-form {
    position: relative;
    display: flex;
    padding: 4.8rem 0 3rem 0;
    margin: 1rem auto auto auto;
    width: 100%;
    max-width: 44rem;
    border-radius: 0 0 2rem 2rem;
    background: white;
    box-shadow: var(--shadow-bar);
    animation: formShow 1s;
}
@keyframes formShow {
    0% { opacity: 0; }
    100% { opacity: 1; }
}
#tab {
    position: absolute;
    display: flex;
    top: -3rem;
    left: 0;
    width: 100%;
}
.tab-item {
    margin: auto;
    width: 50%;
    font-size: 1.6rem;
    line-height: 5.1rem;
    text-align: center;
    border-radius: 2rem 2rem 0 0;
    color: var(--dark-60);
    background: var(--dark-90);
    transition: all ease, 0.3s;
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
    z-index: 9;
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
    top: 1.4rem;
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
    margin: 1rem 10% 3rem 0;
    width: 45%;
    font-size: 1.8rem;
    line-height: 4.2rem;
    text-align: center;
    border-radius: .4rem;
    color: var(--primany);
    border: 1px solid var(--primany);
    background: var(--bg-primany);
}
#btn-login {
    display: inline-block;
    margin: 1rem 0 3rem auto;
    width: 45%;
    font-size: 1.8rem;
    line-height: 4.4rem;
    text-align: center;
    border-radius: .4rem;
    color: white;
    background: var(--primany);
}

#bottom, #bottom:hover, #bottom:visited {
    display: block;
    text-align: center;
    font-size: 1.4rem;
    letter-spacing: .4rem;
    color: var(--dark-80);
}
</style>