/**
 * Created by SNAKE on 2017/9/7.
 */
define(["jquery"],function ($) {
    // 获取生成模板
    function getTemplate() {
        var dtd = $.Deferred();
        return $.get("./view/component/smartUiBar.html", function(template) {
            $("[data-smartUiBar='smartUiBar']").replaceWith(template)
            dtd.resolve()
        });
        return dtd;
    }
    //初始化右边菜单
    function initSmartUiBar() {
        initSmartUiBarEvent();
    }

    function initSmartUiBarEvent() {
        var quannneghznaggui_modal = '<div id="home_page_modal_banner" class="modal">\
            <div class="modal-dialog banner" style="background: transparent;border: 0;box-shadow: initial;width: 550px;max-height: 100%;">\
            <div class="modal-content">\
            <div class="modal-body" style="position: relative;">\
            <img src="/image/home_page_modal_banner2.png" alt="">\
            <div data-dismiss="modal" style="width: 40px;height: 40px;position: absolute;right: 11px;top: 10px;cursor: pointer;"></div>\
            <a target="_blank" href="https://fuwu.taobao.com/ser/detail.htm?spm=a1z13.8114203.1234-fwlb.108.136238cb4oQh5G&service_code=FW_GOODS-1000041590&tracelog=category&scm=1215.1.1.50047508" style="width: 160px;height: 45px;position: absolute;left: 103px;bottom: 29px;cursor: pointer;"></a>\
            <a target="_blank" href="https://tb.cn/ISA5Rvw" style="width: 160px;height: 45px;position: absolute;left: 293px;bottom: 29px;cursor: pointer;"></a>\
            </div>\
            </div>\
            </div>\
            </div>';
        $("#quannneghznaggui_modal_btn").on("click", function() {
            //防止添加多个
            if (!$("#home_page_modal_banner")[0]) {
                $("body").append(quannneghznaggui_modal);
            }
            $("#home_page_modal_banner").modal('open');
        });
    }
    function init(){
        getTemplate().then(function () {
            initSmartUiBar();
        });
    }
    init();
});