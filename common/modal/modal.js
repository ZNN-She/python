/**
 * Created by SNAKE on 2017/6/19.
 */
(function($) {
    // 当前文件路径
    var BASE_PATH = "";
    var CSS_PATH = "";

    function Modal(ele, option) {
        this.$ele = $(ele);
        this.options = option;
        this.closeFn = option.closeFn;
        this.dismissFn = option.dismissFn;

        this.init();
    }
    Modal.DEFAULTS = {
        backdrop:false,
        closeFn: null,
        dismissFn: null
    };
    Modal.prototype.init = function() {
        var self = this;
        self.$ele.on("click", '[data-dismiss="modal"]', function(event) {
            self.dismiss();
            event.stopPropagation(); //阻止冒泡
        });
        self.$ele.on("click", '[data-close="modal"]', function() {
            self.close();
            return false; //阻止冒泡
        });
        self.$ele.on("click", function(){
            self.options.backdrop && $(event.target).is(".modal") && self.dismiss();
        });
    };
    Modal.prototype.open = function() {
        var self = this;
        self.$ele.addClass('modal-open');
    };
    Modal.prototype.close = function() {
        var self = this;
        self.closeFn && self.closeFn.call(self, self);
        self.hide();
    };
    Modal.prototype.dismiss = function() {
        var self = this;
        self.dismissFn && self.dismissFn.call(self, self);
        self.hide();
    };
    Modal.prototype.hide = function() {
        var self = this;
        self.$ele.removeClass('modal-open');
    };

    function Plugin(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data("snake.modal");
            var options = $.extend(true, $.extend(Modal.DEFAULTS), $this.data(), typeof option == "object" && option);

            if (!data) $this.data("snake.modal", (data = new Modal(this, options)));
            if (typeof option == "string") data[option]();
        });
    }

    /*
     * 引进css
     * 使用时要 更引用路径
     */
    function _addStyle() {
        var style = document.createElement('link'); //创建一个style元素
        var head = document.head || document.getElementsByTagName('head')[0]; //获取head元素
        style.rel = 'stylesheet'; //这里必须显示设置style元素的type属性为text/css，否则在ie中不起作用
        style.setAttribute("href", CSS_PATH);
        head.appendChild(style); //把创建的style元素插入到head中
    }

    function _getCssPath(){
        $(document.scripts).each(function(index, el) {
            if(el.src.indexOf("modal.js") > -1){
                BASE_PATH = el.src;
                CSS_PATH = el.src.replace("modal.js","modal.css");
            }
        });
    }

    function _init() {
        _getCssPath();
        _addStyle();
    }

    _init();

    var old = $.fn.modal;

    $.fn.modal = Plugin;
    $.fn.modal.Constructor = Modal;

    // DROPDOWN NO CONFLICT
    // ====================
    $.fn.modal.noConflict = function() {
        $.fn.dropdown = old
        return this
    };

    $(window).on("load", function() {
        return $("[data-snake='modal']").each(function() {
            Plugin.call($(this), $(this).data());
        });
    });
})(jQuery);