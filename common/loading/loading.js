(function ($) {
    function Loading(promise, element, options) {
        var self = this;

        self.option = $.extend(true, {}, options);
        self.$ele = $(element);
        self.promise = promise;

        self.show();

    }

    Loading.DEFAULT = {
        maskEle: '<div id="snake-loading" style="z-index:99999;position: absolute;width: 100%;height: 100%;top: 0;left: 0;background-color: rgba(3, 3, 3, 0.3);">' + '<div class="sk-fading-circle">' + '<div class="sk-circle1 sk-circle"></div>' + '<div class="sk-circle2 sk-circle"></div>' + '<div class="sk-circle3 sk-circle"></div>' + '<div class="sk-circle4 sk-circle"></div>' + '<div class="sk-circle5 sk-circle"></div>' + '<div class="sk-circle6 sk-circle"></div>' + '<div class="sk-circle7 sk-circle"></div>' + '<div class="sk-circle8 sk-circle"></div>' + '<div class="sk-circle9 sk-circle"></div>' + '<div class="sk-circle10 sk-circle"></div>' + '<div class="sk-circle11 sk-circle"></div>' + '<div class="sk-circle12 sk-circle"></div>' + '</div>' + '</div>'
    };
    Loading.prototype.show = function () {
        var self = this;

        self.$ele.append(self.option.maskEle);
        self.$ele.css("position", "relative");

        $.when(self.promise).then(
            function () {
                self.hide();
            }
        ).done(function () {
                self.hide();
            })
            .fail(function () {
                self.hide();
            });
    };
    Loading.prototype.hide = function (element) {
        var self = this;
        if (element) {
            $(element).children('#snake-loading').remove();
            element.css("position", "");
        } else {
            self.$ele.children('#snake-loading').remove();
            self.$ele.css("position", "");
        }
    };

    function Plugin(promise, element, options) {
        var option = $.extend({}, $.extend(Loading.DEFAULT), typeof options == "object" && options);
        //var height = "100%";
        //if(element){
        //    height = element.height() + "px";
        //}else{
        //    height = $(".body").height() + "px";
        //}
        //option.maskEle = option.maskEle.replace("height: 100%",("height: " + height));
        element = element || $("body .body");
        if(element.height() < window.screen.availHeight){
            option.maskEle = option.maskEle.replace("sk-fading-circle",("sk-fading-circle center"));
        }
        return element.each(function () {
            var $this = $(this);
            var data = $(this).data("snake.loading");
            var options = option;

            $this.data("snake.loading", (data = new Loading(promise, this, options)))
            if (typeof promise == "hide") {
                data.hide(option);
            }
        });
    }

    _addStyle = function () {
        var style = document.createElement('link'); //创建一个style元素
        var head = document.head || document.getElementsByTagName('head')[0]; //获取head元素
        style.rel = 'stylesheet'; //这里必须显示设置style元素的type属性为text/css，否则在ie中不起作用
        style.setAttribute("href", "/static/js/component/loading/loading.css");
        head.appendChild(style); //把创建的style元素插入到head中
    };

    function _init() {
        _addStyle();
    }

    _init();

    var old = $.fn.loading;

    jQuery.loading = $.fn.loading = Plugin;

    // DROPDOWN NO CONFLICT
    // ====================

    $.fn.loading.noConflict = function () {
        $.fn.loading = old;
        return this
    }
})(jQuery);
