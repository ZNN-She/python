/**
 * Created by SNAKE on 2017/7/3.
 */
define(["jquery"], function ($) {
    var $headerLiEle = $(".header .header_nav .header_nav_bar>ul>li");
    var $headerAEle = $(".header .header_nav .header_nav_bar>ul>li>a");
    var href = window.location.href;
    // 获取、添加模板
    function getTemplate() {
        var dtd= $.Deferred();
        $.get("./view/component/header.html", function(result) {
            $("[data-header='header']").replaceWith(result);
            dtd;
        });
        return dtd.promise();
    }
    //设置头的选中状态
    function initActiveType() {
        for (var i = 0; i < $headerAEle.length; i++) {
            if ($headerAEle[i].href.toLowerCase() == href.toLowerCase()) {
                $headerLiEle.removeClass("active");
                $headerLiEle.eq(i).addClass("active");
            }
        }
    }

    function initHeaderEvent() {
        $('.header .header_nav .header_nav_bar>ul>li').on('mouseover', function() {
            $(this).children().eq(1).slideDown(200);
        });
        $('.header .header_nav .header_nav_bar>ul>li').on('mouseleave', function() {
            $(this).children().eq(1).slideUp(200);
        });
    }

    function init() {
        getTemplate().then(function () {
            initActiveType();
            initHeaderEvent();
        });
    }
    init();
});
