/**
 * Created by SNAKE on 2017/7/3.
 */
define([], function () {
    // 获取、添加模板
    function getTemplate() {
        var dtd= $.Deferred();
        $.get("./view/component/header.html", function(result) {
            $("[data-header='header']").replaceWith(result);
            dtd.resolve();
        });
        return dtd;
    }

    function init() {
        getTemplate();
    }
    init();
});
