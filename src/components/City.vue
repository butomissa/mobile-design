<template>
<div id="city">
    <div ref="menu" id="menu" @click="menuClick">
        <span id="select-text" ref="selectText">{{ province[val[0]] }}&nbsp;{{ cities[val[0]].city[val[1]] }}</span>
        <span ref="arrow" class="iconfont icon-arrow"/>
    </div>
    <div id="list-form" v-show="show">
        <div id="list-header">
            <p id="list-cancel" @click="menuClick">取消</p>
            <p id="list-title">{{ title }}</p>
            <p id="list-OK" @click="okClick">确定</p>
        </div>
        <div id="list-container">
            <div ref="list0" class="list" @scroll="listScroll(0)">
                <div class="item" style="height: 10rem"></div>
                <div class="item" ref="item0" v-for="(item, index) of province" :key="'0' + index">{{ item }}</div>
                <div class="item" style="height: 10rem"></div>
            </div>
            <div ref="list1" class="list" @scroll="listScroll(1)">
                <div class="item" style="height: 10rem"></div>
                <div class="item" ref="item1" v-for="(item, index) of cities[cityId[0]].city" :key="'1' + index">{{ item }}</div>
                <div class="item" style="height: 10rem"></div>
            </div>
        </div>
    </div>
    <div id="mask" @touchstart="menuClick" v-show="show"></div>
</div>
</template>

<script>
export default {
    props: {
        left: { type: String, default: "8" },
        val: { type: Array },
    },
    model: {
        prop: "val",
        event: "val-event",
    },
    mounted() {
        for (let i = 0; i < this.cities.length; i++) {
            this.province.push(this.cities[i].province)
        }
        this.$nextTick(() => {
            if (this.val[0] < 0 || this.val[0] >= this.province.length) { this.cityId[0] = 0 }
            if (this.val[1] < 0 || this.val[1] >= this.cities[this.cityId[0]].length)  { this.cityId[1] = 0 }
            this.$emit('val-event', this.cityId.slice(0))
        })
        this.$refs.selectText.style.marginLeft = this.left + "px"
        this.$refs.arrow.style.marginRight = this.left + "px"
    },
    methods: {
        menuClick() {
            this.show = !this.show
            document.body.style.overflow = this.show ? "hidden" : "auto"
            if (this.show) {
                this.listShow(0, this.val[0])
                this.listShow(1, this.val[1])
                //滚动到当前值位置
                this.$nextTick(() => {
                    this.$refs["list0"].scrollTop = this.val[0] * 50
                    this.$refs["list1"].scrollTop = this.val[1] * 50
                })
            }
        },
        okClick() {
            this.$emit('val-event', this.cityId)
            this.menuClick()
        },
        listShow(list, index) { //当前值菜单样式
            let l = list === 0 ? this.province : this.cities[this.cityId[0]].city
            for (let i = 0; i < l.length; i++) {
                this.$refs["item" + list][i].removeAttribute("style") 
            }
            this.$refs["item" + list][index].style.color = "var(--primany)"
            this.$refs["item" + list][index].style.fontWeight = "500"
            this.$refs["item" + list][index].style.fontSize = "1.7rem"
            this.$refs["item" + list][index].style.borderTop = ".1rem solid var(--dark-90)"
            this.$refs["item" + list][index].style.borderBottom = ".1rem solid var(--dark-90)"
            if (index - 2 >= 0) { this.$refs["item" + list][index - 2].style.color = "var(--dark-60)" }
            if (index + 2 < l.length) { this.$refs["item" + list][index + 2].style.color = "var(--dark-60)" }
        },
        listScroll(list) {
            let oldScroll = this.$refs["list" + list].scrollTop
            let i = Math.floor((oldScroll + 25) / 50)
            this.listShow(list, i)
            // 停止scroll 0.1秒后当前值居中
            setTimeout(() => {
                if (this.$refs["list" + list].scrollTop === oldScroll) {
                    this.$set(this.cityId, list, Math.floor((oldScroll + 25) / 50))
                    this.$refs["list" + list].scrollTop = this.cityId[list] * 50
                    this.$nextTick(() => {
                        if (list === 0) {
                            this.listShow(1, 0)
                            this.$set(this.cityId, 1, 0)
                            this.$refs["list1"].scrollTop = 0
                        }
                    })
                }
            }, 100)
            // console.log(this.val, this.cityId)
        },
    },
    data() {
        return {
            show: false,
            title: "请选择地市",
            cityId: this.val,
            province: [],
            cities: [
                { province: "北京", city: [ "北京市" ] },
                { province: "上海", city: [ "上海市" ] },
                { province: "天津", city: [ "天津市" ] },
                { province: "重庆", city: [ "重庆市" ] },
                { province: "内蒙古", city: [ "呼和浩特市", "包头市", "乌海市", "赤峰市", "通辽市", "鄂尔多斯市", "呼伦贝尔市", "巴彦淖尔市", "乌兰察布市", "兴安盟", "锡林郭勒盟", "阿拉善盟", "丰镇市", "锡林浩特市", "二连浩特市", "满州里市", "牙克石市", "扎兰屯市", "霍林郭勒市", "乌兰浩特市", "根河市", "额尔古纳市", "阿尔山市" ] },
                { province: "山西", city: [ "太原市", "大同市", "阳泉市", "长治市", "晋城市", "朔州市", "忻州市", "临汾市", "运城市", "晋中市", "古交市", "霍州市", "潞城市", "高平市", "原平市", "介休市", "汾阳市", "孝义市", "河津市", "永济市", "侯马市", "吕梁市" ] },
                { province: "河北", city: [ "石家庄市", "邯郸市", "邢台市", "保定市", "张家口市", "承德市", "唐山市", "秦皇岛市", "沧州市", "廊坊市", "衡水市", "武安市", "霸州市", "泊头市", "任丘市", "黄骅市", "河间市", "迁安市", "遵化市", "三河市", "定州市", "安国市", "涿州市", "高碑店市", "辛集市", "晋州市", "藁城市", "新乐市", "鹿泉市", "沙河市", "南宫市", "冀州市", "深州市" ] },
                { province: "辽宁", city: [ "沈阳市", "大连市", "鞍山市", "抚顺市", "本溪市", "丹东市", "锦州市", "葫芦岛市", "营口市", "阜新市", "辽阳市", "铁岭市", "朝阳市", "盘锦市", "瓦房店市", "海城市", "兴城市", "调兵山市", "北票市", "开原市", "新民市", "庄河市", "凤城市", "北镇市", "灯塔市", "凌源市", "盖州市", "东港市", "普兰店市", "凌海市", "大石桥市" ] },
                { province: "吉林", city: [ "长春市", "吉林市", "四平市", "辽源市", "通化市", "白城市", "白山市", "松原市", "延边朝鲜族自治州", "公主岭市", "梅河口市", "集安市", "九台市", "桦甸市", "蛟河市", "榆树市", "洮南市", "大安市", "延吉市", "图们市", "敦化市", "龙井市", "珲春市", "德惠市", "磐石市", "舒兰市", "双辽市", "和龙市", "临江市" ] },
                { province: "黑龙江", city: [ "哈尔滨市", "齐齐哈尔市", "鹤岗市", "双鸭山市", "鸡西市", "大庆市", "伊春市", "牡丹江市", "佳木斯市", "七台河市", "绥化市", "黑河市", "大兴安岭地区", "绥芬河市", "同江市", "富锦市", "铁力市", "密山市", "安达市", "肇东市", "海伦市", "北安市", "五大连池市", "尚志市", "双城市", "讷河市", "海林市", "穆棱市", "虎林市", "宁安市", "五常市" ] },
                { province: "江苏", city: [ "南京市", "徐州市", "连云港市", "盐城市", "扬州市", "南通市", "镇江市", "常州市", "无锡市", "苏州市", "泰州市", "宿迁市", "淮安市", "仪征市", "常熟市", "张家港市", "江阴市", "丹阳市", "东台市", "兴化市", "宜兴市", "昆山市", "启东市", "新沂市", "溧阳市", "大丰市", "泰兴市", "江都市", "靖江市", "高邮市", "如皋市", "海门市", "句容市", "扬中市", "金坛市", "吴江市", "太仓市", "通州市", "邳州市", "姜堰市" ] },
                { province: "安徽", city: [ "合肥市", "淮南市", "淮北市", "芜湖市", "铜陵市", "蚌埠市", "马鞍山市", "安庆市", "黄山市", "宿州市", "滁州市", "巢湖市", "六安市", "阜阳市", "亳州市", "宣城市", "池州市", "界首市", "桐城市", "天长市", "宁国市", "明光市" ] },
                { province: "山东", city: [ "济南市", "青岛市", "淄博市", "枣庄市", "东营市", "烟台市", "威海市", "济宁市", "泰安市", "日照市", "莱芜市", "德州市", "滨州市", "临沂市", "聊城市", "潍坊市", "菏泽市", "青州市", "龙口市", "曲阜市", "新泰市", "胶州市", "诸城市", "莱阳市", "莱州市", "滕州市", "文登市", "荣成市", "即墨市", "平度市", "莱西市", "胶南市", "乐陵市", "临清市", "章丘市", "昌邑市", "高密市", "安丘市", "寿光市", "招远市", "栖霞市", "海阳市", "蓬莱市", "乳山市", "兖州市", "肥城市", "禹城市", "邹城市" ] },
                { province: "浙江", city: [ "杭州市", "宁波市", "温州市", "嘉兴市", "湖州市", "绍兴市", "金华市", "衢州市", "舟山市", "丽水市", "台州市", "余姚市", "海宁市", "兰溪市", "瑞安市", "江山市", "东阳市", "义乌市", "慈溪市", "奉化市", "诸暨市", "临海市", "龙泉市", "临安市", "富阳市", "建德市", "乐清市", "平湖市", "桐乡市", "上虞市", "永康市", "温岭市", "嵊州市" ] },
                { province: "江西", city: [ "南昌市", "景德镇市", "萍乡市", "新余市", "九江市", "鹰潭市", "上饶市", "宜春市", "吉安市", "赣州市", "抚州市", "瑞昌市", "德兴市", "丰城市", "樟树市", "乐平市", "贵溪市", "高安市", "南康市", "瑞金市", "井冈山市" ] },
                { province: "福建", city: [ "福州市", "厦门市", "三明市", "莆田市", "泉州市", "漳州市", "南平市", "宁德市", "龙岩市", "永安市", "石狮市", "福清市", "邵武市", "武夷山市", "福安市", "漳平市", "长乐市", "南安市", "晋江市", "龙海市", "建阳市", "建瓯市", "福鼎市" ] },
                { province: "湖南", city: [ "长沙市", "株洲市", "湘潭市", "衡阳市", "岳阳市", "常德市", "张家界市", "郴州市", "永州市", "娄底市", "怀化市", "益阳市", "邵阳市", "湘西土家族苗族自治州", "醴陵市", "湘乡市", "津市市", "韶山市", "资兴市", "冷水江市", "涟源市", "洪江市", "沅江市", "吉首市", "浏阳市", "武冈市", "临湘市", "耒阳市", "常宁市", "汨罗市" ] },
                { province: "湖北", city: [ "武汉市", "黄石市", "襄樊市", "荆州市", "荆门市", "鄂州市", "随州市", "孝感市", "咸宁市", "仙桃市", "天门市", "潜江市", "宜昌市", "十堰市", "神农架林区", "黄冈市", "恩施土家族苗族自治州", "老河口市", "枣阳市", "应城市", "安陆市", "广水市", "麻城市", "武穴市", "石首市", "洪湖市", "当阳市", "丹江口市", "恩施市", "利川市", "汉川市", "钟祥市", "松滋市", "枝江市", "大冶市", "宜都市", "赤壁市" ] },
                { province: "河南", city: [ "郑州市", "开封市", "洛阳市", "平顶山市", "焦作市", "鹤壁市", "新乡市", "安阳市", "濮阳市", "许昌市", "漯河市", "三门峡市", "济源市", "商丘市", "周口市", "驻马店市", "信阳市", "南阳市", "义马市", "汝州市", "禹州市", "卫辉市", "辉县市", "沁阳市", "舞钢市", "邓州市", "荥阳市", "登封市", "新郑市", "偃师市", "长葛市", "灵宝市", "永城市", "项城市", "巩义市", "林州市", "新密市", "孟州市" ] },
                { province: "广东", city: [ "广州市", "深圳市", "珠海市", "汕头市", "韶关市", "河源市", "梅州市", "惠州市", "汕尾市", "东莞市", "中山市", "江门市", "佛山市", "阳江市", "湛江市", "茂名市", "肇庆市", "清远市", "潮州市", "揭阳市", "云浮市", "从化市", "增城市", "南雄市", "乐昌市", "兴宁市", "陆丰市", "台山市", "开平市", "恩平市", "鹤山市", "阳春市", "吴川市", "廉江市", "高州市", "信宜市", "化州市", "高要市", "四会市", "罗定市", "英德市", "连州市", "普宁市", "雷州市" ] },
                { province: "海南", city: [ "海口市", "三亚市", "五指山市", "文昌市", "琼海市", "万宁市", "东方市", "儋州市" ] },
                { province: "广西", city: [ "南宁市", "柳州市", "桂林市", "梧州市", "北海市", "玉林市", "贵港市", "百色市", "河池市", "来宾市", "贺州市", "钦州市", "祟左", "防城港市", "凭祥市", "合山市", "崇左市", "岑溪市", "桂平市", "北流市", "宜州市", "东兴市" ] },
                { province: "贵州", city: [ "贵阳市", "六盘水市", "遵义市", "安顺市", "黔西南布依族苗族自治州", "黔东南苗族侗族自治州", "黔南布依族苗族自治州", "铜仁地区", "毕节地区", "赤水市", "铜仁市", "兴义市", "凯里市", "都匀市", "仁怀市", "毕节市", "清镇市", "福泉市" ] },
                { province: "四川", city: [ "成都市", "自贡市", "攀枝花市", "泸州市", "德阳市", "绵阳市", "广元市", "遂宁市", "内江市", "乐山市", "南充市", "宜宾市", "广安市", "巴中市", "雅安市", "眉山市", "阿坝藏族羌族自治州", "甘孜藏族自治州", "凉山彝族自治州", "资阳市", "达州市", "广汉市", "西昌市", "江油市", "彭州市", "崇州市", "都江堰市", "邛崃市", "峨眉山市", "简阳市", "绵竹市", "什邡市", "阆中市", "华蓥市", "万源市" ] },
                { province: "云南", city: [ "昆明市", "昭通市", "曲靖市", "玉溪市", "保山市", "普洱市", "临沧市", "丽江市", "西双版纳傣族自治州", "德宏傣族景颇族自治州", "怒江傈僳族自治州", "迪庆藏族自治州", "文山壮族苗族自治州", "红河哈尼族彝族自治州", "楚雄彝族自治州", "大理白族自治州", "个旧市", "开远市", "楚雄市", "大理市", "安宁市", "宣威市", "景洪市", "潞西市", "瑞丽市" ] },
                { province: "陕西", city: [ "西安市", "宝鸡市", "咸阳市", "榆林市", "延安市", "渭南市", "安康市", "汉中市", "铜川市", "商洛市", "韩城市", "华阴市", "兴平市" ] },
                { province: "甘肃", city: [ "兰州市", "金昌市", "白银市", "天水市", "嘉峪关市", "平凉市", "武威市", "张掖市", "酒泉市", "定西市", "庆阳市", "陇南市", "临夏回族自治州", "甘南藏族自治州", "玉门市", "临夏市", "合作市" ] },
                { province: "宁夏", city: [ "银川市", "石嘴山市", "吴忠市", "固原市", "青铜峡市", "灵武市", "中卫市" ] },
                { province: "青海", city: [ "西宁市", "海东地区", "海北藏族自治州", "黄南藏族自治州", "海南藏族自治州", "果洛藏族自治州", "玉树藏族自治州", "海西蒙古族藏族自治州", "格尔木市", "德令哈市", "冷湖行委" ] },
                { province: "新疆", city: [ "乌鲁木齐市", "克拉玛依市", "石河子市", "五家渠市", "阿拉尔市", "博尔塔拉蒙古自治州", "巴音郭楞蒙古自治州", "克孜勒苏柯尔克孜自治州", "伊犁哈萨克自治州", "图木舒克市", "吐鲁番地区", "哈密地区", "和田地区", "阿克苏地区", "喀什地区", "昌吉回族自治州", "塔城地区", "阿勒泰地区", "吐鲁番地区", "吐鲁番市", "哈密市", "和田市", "阿克苏市", "喀什市", "阿图什市", "库尔勒市", "昌吉市", "博乐市", "伊宁市", "塔城市", "阿勒泰市", "阜康市", "乌苏市", "奎屯市", "博乐市" ] },
                { province: "西藏", city: [ "拉萨市", "山南地区", "阿里地区", "林芝地区", "山南地区", "日喀则地区", "那曲地区", "昌都地区", "日喀则市", "那曲县", "昌都县", "林芝县" ] },
                { province: "中国香港", city: [ "香港地区" ] },
                { province: "中国澳门", city: [ "澳门地区" ] },
                { province: "中国台湾", city: [ "台湾全省" ] },
            ],
        }
    },
}
</script>

<style scoped>
#menu {
    position: relative;
    display: flex;
    height: 100%;
    width: 100%;
    text-align: left;
    border-bottom: .1rem solid var(--dark-90);
    transition: all ease, 0.3s;
}
#menu > span {
    margin: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.6rem;
    color: var(--dark-20);
    transition: all ease, 0.3s;
}
#menu > .icon-arrow {
    font-size: 1.4rem;
    transform: rotate(-90deg);
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
#list-form {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: white;
    animation: showList 0.3s;
    z-index: 12;
}
@keyframes showList {
    0% { opacity: 0; bottom: -2rem; }
    100% { opacity: 1; bottom: 0; }
}
#list-header {
    display: flex;
    margin: auto auto .1rem auto;
    justify-content: space-between;
    height: 5rem;
    border-bottom: .1rem solid var(--dark-90);
}
#list-header > p {
    padding: 1.7rem 2rem;
    font-size: 1.6rem;
}
#list-cancel {
    color: var(--dark-60);
}
#list-OK {
    color: var(--primany);
}
#list-container {
    display: flex;
}
.list {
    padding: 0 3rem;
    margin: 0;
    height: 25rem;
    width: 50%;
    overflow-y: auto;
}
.item {
    font-size: 1.6rem;
    line-height: 4.8rem;
    height: 5rem;
    white-space: nowrap;
    text-align: center;
    border: .1rem solid white;
    transition: all ease, 0.3s;
}
</style>