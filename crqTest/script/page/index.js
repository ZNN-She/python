define(["restClient", "Vue", "commonDataService", "winAlert"], function (restClient, Vue, commonDataService, winAlert) {
    new Vue({
        el: "#home_page",
        data: {
            msg: "homePage",
            actionType: "rank", //rank keyword SKU comment
            search: {
                device: "PC", //PC PC_TM WX WX_TM
                type: "item", //item wangwang
                key: "",
                wangwang: "",
                keyword: "",
                rank: "zonghe", //zonghe sale renqi
                mode: "client",  //client  server
                serverAddress: "",
                minPrice: "",
                maxPrice: "",
                locs: "发货地"
            },
            customLocs: "",
            isShowKeyList: false,
            keyList: [
                {
                    imgSrc: "//img.alicdn.com/bao/uploaded/i2/TB1X8ypQVXXXXaqXVXXXXXXXXXX_!!0-item_pic.jpg",
                    shopName: "莱妮雅旗舰店",
                    title: "莱妮雅水光多肽婴儿面膜 补水保湿蚕丝面膜提亮肤色收毛孔正品",
                    itemId: "2131445454",
                    keyword: "水光多"
                }
            ],
            keywordList: [],
            conditionMap: commonDataService.CONDITION_MAP, //pcCondition pcTmallCondition wxTmallCondition wxCondition
            conditionActive: commonDataService.CONDITION_MAP.pcCondition, //默认pc
            serverList: [
                {
                    name: "湖北",
                    value: "湖北"
                }, {
                    name: "山东",
                    value: "山东"
                }, {
                    name: "浙江",
                    value: "浙江"
                }, {
                    name: "广东",
                    value: "广东"
                }, {
                    name: "安微",
                    value: "安微"
                }, {
                    name: "江苏",
                    value: "江苏"
                }, {
                    name: "全国",
                    value: "全国"
                }
            ],
            locsList: commonDataService.LOCS_LIST,
            showElement: {
                device: true,
                type: true,
                key: true,
                keyword: true,
                rank: true,
                mode: true
            },
            todayFocusTopList: [
                {
                    keyword: "啥的积分",
                    saleNum: "",
                    upOrDown: 1, //0 1
                    upOrDownNum: 123
                }
            ],
            weekFocusTopList: [
                {
                    keyword: "啥的积分",
                    saleNum: "",
                    upOrDown: 1, //0 1
                    upOrDownNum: 123
                }
            ],
            todaySearchCountList: [
                {
                    username: "大师傅",
                    keyword: "啥房间大"
                }
            ],
            allWebCatHotKeywords: [],
            allWebCat: [],
            allWebCatTops: [],
            isShowFooterFixed: true
        },
        methods: {
            init: function () {
            },
            switchActionType: function (type) {
                this.actionType = type;
                var self = this;
                switch (type) {
                    case "rank":
                        break;
                    case "keyword":
                        break;
                    case "SKU":
                        self.search.type = "item";
                        break;
                    case "comment":
                        self.search.type = "item";
                        break;
                    default :
                        break;
                }
                this.switchShowElement();
            },
            searchKeyFocus: function () {
                this.isShowKeyList = true;
            },
            searchKeyBlur: function () {
                var self = this;
                setTimeout(function () {
                    self.isShowKeyList = false;
                }, 200);
            },
            selectKeyList: function (keyItem) {
                this.search.key = keyItem.itemId;
                this.search.keyword = keyItem.keyword;
                this.isShowKeyList = false;
            },
            keywordKeyup: function () {
                var self = this;
                self.keywordList = [];
                var url = 'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1484358389415_666&k=1&bucketid=13&q=' + self.search.keyword;
                $.ajax({
                    url: url,
                    type: "GET",
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    timeout: 5000,
                    success: function (data) {
                        if (data.result.length > 0) {
                            //定位
                            var element = $("#inupt_hink");
                            var top = 0;
                            var padding_top = parseInt(element.css('padding-top'));
                            var padding_left = parseInt(element.css('padding-left'));
                            var line_height = parseInt(element.css('font-size')) + 10;
                            var left = 12;
                            var line = self.search.keyword.split("\n");
                            top = (line_height * line.length + top + padding_top) > 54 ? 54 : (line_height * line.length + top + padding_top);
                            element.css({"top": top, "left": left + padding_left});

                            $(data.result).each(function (index, item) {
                                self.keywordList.push({name: item[0], value: item[0]});
                            })
                        } else {

                        }
                    }
                })
            },
            selectKeyword: function (keywordItem) {
                this.search.keyword = keywordItem.value;
                this.keywordList = [];
            },
            keywordBlur: function () {
                var self = this;
                setTimeout(function () {
                    self.keywordList = [];
                }, 200);
            },
            locsClick: function (locsItem) {
                this.search.locs = locsItem ? locsItem.value : this.customLocs;
                this.customLocs = "";
            },
            inquire: function () {
                switch (this.actionType) {
                    case "rank":
                        console.log(this.getSearchParam());
                        window.location.href="/view/page/itemRank";
                        break;
                    case "keyword":
                        console.log(this.getSearchParam());
                        break;
                    case "SKU":
                        console.log(this.search.key);
                        if(!this.search.key){
                            $win.alert("请输入正确的儿宝贝链接或ID")
                        }
                        break;
                    case "comment":
                        if(!this.search.key){
                            $win.alert("请输入正确的儿宝贝链接或ID")
                        }
                        console.log(this.search.key);
                        break;
                    default:
                        break;
                }
            },
            getSearchParam: function () {
                var param = {};
                param.device = this.search.device;
                param.type = this.search.type;
                param.key = this.search.key;
                param.wangwang = this.search.wangwang;
                param.keyword = this.search.keyword;
                param.rank = this.search.rank;
                param.mode = this.search.mode;
                param.serverAddress = this.search.serverAddress;
                param.minPrice = this.search.minPrice;
                param.maxPrice = this.search.maxPrice;
                param.locs = this.search.locs == "发货地" ? "" : this.search.locs;
                //搜索条件
                param.condition = [];
                $(this.conditionActive).each(function (index, item) {
                    if (item.select) {
                        param.condition.push(item.value);
                    }
                });
                return param;
            },
            switchShowElement: function () {
                this.showElement.device = (this.actionType == "rank" || this.actionType == "keyword");
                this.showElement.type = this.actionType == "rank";
                this.showElement.key = this.actionType != "keyword";
                this.showElement.keyword = (this.actionType == "rank" || this.actionType == "keyword");
                this.showElement.rank = (this.actionType == "rank" || this.actionType == "keyword");
                this.showElement.mode = (this.actionType == "rank" || this.actionType == "keyword");
            },
            swatchAllWebCat: function (index) {
                this.allWebCat = this.allWebCatHotKeywords[index];
                for (var i = 0; i < this.allWebCatHotKeywords.length; i++) {
                    this.allWebCatHotKeywords[i].active = false;
                }
                this.allWebCatHotKeywords[index].active = true;
                this.swatchAllWebCatTops(0);
            },
            swatchAllWebCatTops: function (index) {
                this.allWebCatTops = this.allWebCat.catInfos[index].tops;
                for (var i = 0; i < this.all_web_cat.catInfos.length; i++) {
                    this.allWebCat.catInfos[i].active = false;
                }
                this.allWebCat.catInfos[index].active = true;
            },
            closeFooterFixed: function () {
                this.isShowFooterFixed = false;
            }
        },
        watch: {
            "search.device": function (curVal, oldVal) {
                //手机没有人气
                if ((curVal == "WX" || curVal == "WX_TM") && this.search.rank == "renqi") {
                    this.search.rank = "zonghe";
                }
                //天猫没有本机
                if ((curVal == "PC_TM" || curVal == "WX_TM") && this.search.mode == "client") {
                    this.search.mode = "server";
                }
                switch (curVal) {
                    case "PC":
                        this.conditionActive = this.conditionMap.pcCondition;
                        break;
                    case "PC_TM":
                        this.conditionActive = this.conditionMap.pcTmallCondition;
                        break;
                    case "WX":
                        this.conditionActive = this.conditionMap.wxCondition;
                        break;
                    case "WX_TM":
                        this.conditionActive = this.conditionMap.wxTmallCondition;
                        break;
                    default:
                        break;
                }
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            })
        }
    })
});