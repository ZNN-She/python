//config配置
var REQUIRY_CONFIG = {
    baseUrl: "./script/",
    paths: {
        /* lib */
        "Vue": "../lib/vue/vue",
        "jquery": "/lib/jquery/jquery-3.0.0",
        "jquery.1.7.2": "/lib/jquery/jquery-1.7.2",
        "jquery.1.8.3": "/lib/jquery/jquery-1.8.3",
        "highcharts": "/lib/highcharts/highcharts",
        "echarts": "/lib/echarts/echarts.min",
        "laydate": "/lib/laydate/laydate",
        "swiper": "/lib/swiper",

        /* project common */
        "loading": "../common/loading/loading",
        "easyform": "../common/easyform/easyform",
        "pagination": "../common/pagination/jquery.pagination",

        /* script common */
        "winAlert": "common/winAlert",
        "tool": "common/tool",
        "search": "common/search",
        "restClient": "common/restClient",
        "leftMenuWamp": "common/leftMenuWamp",
        "bootstrapExtend": "common/bootstrapExtend",
        "commonDataService": "common/commonDataService",

        /* component */
        "header": "component/header",
        "footer": "component/footer",
        "smartUiBar": "component/smartUiBar",

        /* crawlers */
        "crawlers": "crawlers/crawlers",

        /* page */
        "index": "page/index",
        "itemRank": "page/itemRank",
        "hotword": "page/hotword",
        "sku": "page/sku",
        "skuDetail": "page/skuDetail",

        /* activity */

        /* other*/
        "baidu": "https://hm.baidu.com/hm.js?96911eef4698192a43f328da2787bfe0"
    },
    shim: {
        "restClient": {
            deps: ["jquery", "winAlert", "bootstrapExtend"]
        },
        "footer": {
            deps: ["jquery"]
        },
        "header": {
            deps: ["jquery"]
        },
        "smartUiBar": {
            deps: ["jquery"]
        }
    }
};
require.config(REQUIRY_CONFIG);

/*
 *全局变量
 *USER_INFO 用户信息
 */
window.USER_INFO = {};

// 根据路径加载对应的js
require(["require", "jquery", "footer", "header", "smartUiBar", "baidu"],
    function (require, $, footer, header, smartUiBar, baidu) {
        //获取当前页面html的名字
        var htmlName = "index"; //默认加载index.js
        var pathname = location.pathname;
        htmlName = pathname == "/" ? htmlName : pathname.split("/").pop().split(".").shift();
        //判断是否存在对应模块
        if (String(REQUIRY_CONFIG.paths[htmlName]) == "undefined") {
            console.log("不存在对应的js模板,模板名字要和html名字一致");
        } else {
            // require 加载.html文件对应的js模块
            require([htmlName], function (htmlName) {

            }, function (error) {
                console.log("Error：" + htmlName + "\n" + error.stack);
            });
        }
    });