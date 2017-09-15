/**
 * Created by SNAKE on 2017/9/7.
 */
define([],function () {
    // 获取生成模板
    function getTemplate() {
        var dtd = $.Deferred();
        return $.get("view/component/smartUiBar.html", function(template) {
            $("[data-smartUiBar='smartUiBar']").replaceWith(template)
            dtd.resolve()
        });
        return dtd;
    }
    //初始化右边菜单
    function initSmartUiBar() {
        
    }
    function init(){
        getTemplate().then(function () {
            initSmartUiBar();
        });
    }
    init();
});