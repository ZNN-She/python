/**
 * Created by SNAKE on 2017/9/6.
 */
define(["jquery"],function($){
    // 获取生成模板
    function getTemplate() {
        return $.get("./view/component/footer.html", function(template) {
            $("[data-footer='footer']").replaceWith(template)
        });
    }
    function init(){
        getTemplate();
    }
    init();
});