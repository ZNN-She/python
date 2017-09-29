/**
 * Created by SNAKE on 2017/9/11.
 */
define(["restClient", "Vue", "winAlert", "commonDataService"], function (restClient, Vue, winAlert, commonDataService) {
    new Vue({
        el: "#item-rank-page",
        data: {
            navType: "search",   //search case
            search: {
                device: "PC", //PC PC_TM WX WX_TM
                type: "item", //item wangwang
                key: "",
                wangwang: "",
                keyword: "",
                rank: "zonghe", //zonghe sale renqi
                minPrice: "",
                maxPrice: "",
                mode: "client",  //client  server
                serverAddress: ""
            },
            keyList: [
                {
                    imgSrc: "//img.alicdn.com/bao/uploaded/i2/TB1X8ypQVXXXXaqXVXXXXXXXXXX_!!0-item_pic.jpg",
                    shopName: "莱妮雅旗舰店",
                    title: "莱妮雅水光多肽婴儿面膜 补水保湿蚕丝面膜提亮肤色收毛孔正品",
                    itemId: "2131445454",
                    keyword: "水光多"
                }
            ],
            isShowKeyList: false,
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
            isShowInstructions: false,
            isShowExplainItem:false,
            isShowExplainWangwang:false
        },
        methods: {
            switchNavType: function (type) {
                this.navType = type;
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
            inquire: function () {

            },
            instructionsBtnClick: function () {
                this.isShowInstructions = !this.isShowInstructions;
            },
            explainItemClick:function () {
                this.isShowExplainItem = !this.isShowExplainItem;
            },
            explainWangwangClick:function () {
                this.isShowExplainWangwang = !this.isShowExplainWangwang;
            },
            init: function () {
                console.log("itemRank");
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
    });
});