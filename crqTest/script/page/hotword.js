/**
 * Created by SNAKE on 2017/9/12.
 */
define(["Vue", "restClient", "commonDataService"], function (Vue, restClient, commonDataService) {
    new Vue({
        el: "#hot-word-page",
        data: {
            navType: "search",   //search case
            search: {
                device: "PC", //PC PC_TM WX WX_TM
                keyword: "",
                rank: "zonghe", //zonghe sale renqi
                minPrice: "",
                maxPrice: "",
                mode: "server",  //client  server
                serverAddress: "",
                locs: "发货地"
            },
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
            customLocs: "",
            locsList: commonDataService.LOCS_LIST,
            isShowInstructions: false,
            resultType: "list", //list price time seller
            isShowExplainItem: false,
            page:1
        },
        methods: {
            switchNavType: function (type) {
                this.navType = type;
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

            },
            instructionsBtnClick: function () {
                this.isShowInstructions = !this.isShowInstructions;
            },
            switchResultType: function (type) {
                this.resultType = type;
            },
            explainItemClick: function () {
                this.isShowExplainItem = !this.isShowExplainItem;
            },
            switchPage:function (page) {
                this.page = page;
            },
            init: function () {
                console.log("hotword");
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            })
        }
    })
});