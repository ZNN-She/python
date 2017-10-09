//config配置
var REQUIRY_CONFIG = {
    // baseUrl: "/script/", //test
    baseUrl: "/python/script/",  
    paths: {
        /* lib */
        "jquery": "../lib/jquery/dist/jquery",
        "bootstrap": "../lib/jquery/dist/js/bootstrap",
        "Vue": "../lib/vue/dist/vue",

        /* project common */
        "alert": "../common/alert/alert",
        "confirm": "../common/confirm/confirm",
        "modal": "../common/modal/modal-0.1.0",
        "loading": "../common/loading/loading-0.1.0",
        "pagination": "../common/pagination/jquery.pagination",

        /* script common */
        "$tool": "common/tool",
        "$http": "common/http",
        "$commonData": "common/commonData",

        /* component */
        "header": "component/header",
        "footer": "component/footer",
        "smartUiBar": "component/smartUiBar",

        /* page */
        "index": "page/index",
        "testLoading": "page/testLoading"
    },
    shim: {
        "$http": {
            deps: ["jquery", "alert"]
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
require(["require", "jquery"], function(require, $, ) {
    //获取当前页面html的名字
    var htmlName = "index"; //默认加载index.js
    var pathname = location.pathname.split("/").pop().split(".").shift();
    htmlName = pathname == "" ? htmlName : pathname;
    //判断是否存在对应模块
    console.log(htmlName);
    if (String(REQUIRY_CONFIG.paths[htmlName]) == "undefined") {
        console.log("不存在对应的js模板,模板名字要和html名字一致");
    } else {
        // require 加载.html文件对应的js模块
        require([htmlName], function(htmlName) {

        }, function(error) {
            console.log("Error：" + htmlName + "\n" + error.stack);
        });
    }
});