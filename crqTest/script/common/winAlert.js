/**
 * $win.alert()
 * $win.confirm()
 * $("#").modal()
 */


/**
 * alert
 */
+function ($) {
    'use strict';

    // ALERT CLASS DEFINITION
    // ======================

    var dismiss = '[data-dismiss="alert"]';
    var Alert = function (el) {
        $(el).on('click', dismiss, this.close)
    };

    Alert.VERSION = '0.1.0';

    Alert.prototype.close = function (e) {
        var $this = $(this);
        var selector = $this.attr('data-target');

        if (!selector) {
            selector = $this.attr('href');
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        }

        var $parent = $(selector);

        if (e) e.preventDefault();

        if (!$parent.length) {
            $parent = $this.hasClass('alert') ? $this : $this.parent()
        }

        $parent.trigger(e = $.Event('close.bs.alert'));

        if (e.isDefaultPrevented()) return;

        $parent.removeClass('in');

        function removeElement() {
            // detach from parent, fire event then clean up data
            $parent.detach().trigger('closed.bs.alert').remove()
        }

        $.support.transition && $parent.hasClass('fade') ?
            $parent
                .one('bsTransitionEnd', removeElement)
                .emulateTransitionEnd(150) :
            removeElement()
    };


    // ALERT PLUGIN DEFINITION
    // =======================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('bs.alert');

            if (!data) $this.data('bs.alert', (data = new Alert(this)));
            if (typeof option == 'string') data[option].call($this)
        })
    }

    var old = $.fn.alert;

    $.fn.alert = Plugin;
    $.fn.alert.Constructor = Alert;


    // ALERT NO CONFLICT
    // =================

    $.fn.alert.noConflict = function () {
        $.fn.alert = old;
        return this
    };


    // ALERT DATA-API
    // ==============

    $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);


/**
 * $win.alert()
 * $win.modal()
 */
(function ($, win) {
    win.$win = {
        alert: function (option) {
            var DEFAULTS = {
                type: "warning",//场景类型：warning,info,danger,success
                content: "",//内容
                autoClose: true,//是否自动关闭
                duration: 5000,//停留时间
                size: ""//尺寸
            };

            var config = $.extend({}, DEFAULTS, typeof option == "string" ? {content: option} : option);
            var domEl = $(
                '<div class="alert alert-fixed alert-dismissible">' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '</div>');
            domEl.append('<div><span class="glyphicon glyphicon-exclamation-sign" style="font-size: 35px;vertical-align: middle;"></span><span style="display: inline-block;vertical-align: middle;padding-left: 5px;">' + config.content + '</span></div>');
            domEl.addClass('alert-' + config.type);
            domEl.appendTo($("body"));
            //自动关闭
            if (config.autoClose) {
                setTimeout(function () {
                    domEl.alert('close');
                }, config.duration);
            }

        },
        confirm: function (option) {
            var DEFAULTS = {
                type: "default", //default,success,error
                // img: "images/component/alert/alert-question.png",//图标
                content: "",//内容
                title: "",//内容标题
                windowTitle: "系统提示",//窗口名称
                closeText: "确定",//确认按钮文本
                cancelText: "取消",//取消按钮文本
                showClose: true,//显示确认按钮
                showCancel: true,//显示取消按钮
                size: "sm",//尺寸 sm lg
                closeLink: "",//链接
                cancelLink: "",//链接
                closeCallback: "",
                cancelCallback: ""
            };
            var TEMPLATE = '<div class="modal modal-open confirm">\
                                <div class="{{size}}">\
                                    <div class="modal-header">\
                                        <button type="button" class="close" data-confirm="cancel">\
                                        <span aria-hidden="true">&times;</span></button>\
                                        <h3 class="modal-title">{{windowTitle}}</h3>\
                                    </div>\
                                    <div class="modal-body">\
                                        <div class="show-table" style="overflow: auto">\
                                            <div class="confirm-icon {{type}}-icon">\
                                                <span class="{{glyphicon}}"></span>\
                                            </div>\
                                            <div class="confirm-content">\
                                                <h4 class="confirm-title">{{title}}</h4>\
                                                <div>{{content}}</div>\
                                            </div>\
                                        </div>\
                                    </div>\
                                    <div class="modal-footer">\
                                        <div class="text-center">\
                                            <a class="btn btn_primary" data-confirm="close" href="{{closeLink}}" target="_blank">{{closeText}}</a>\
                                            <a class="btn btn_default" data-confirm="cancel" href="{{cancelLink}}" target="_blank">{{cancelText}}</a>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>';

            var config = $.extend({}, DEFAULTS, typeof option == "string" ? {content: option} : option);

            var tmp = TEMPLATE;
            tmp = tmp.replace("{{windowTitle}}", config.windowTitle);
            tmp = tmp.replace("{{img}}", config.img);
            tmp = tmp.replace("{{title}}", config.title);
            tmp = tmp.replace("{{content}}", config.content);
            tmp = tmp.replace("{{closeText}}", config.closeText);
            tmp = tmp.replace("{{cancelText}}", config.cancelText);
            tmp = tmp.replace("{{type}}", config.type);
            tmp = tmp.replace("{{size}}", config.size == "lg" ? "modal-dialog modal-lg" : "modal-dialog");
            switch (config.type) {
                case "default":
                    tmp = tmp.replace("{{glyphicon}}", "glyphicon glyphicon-ok");
                case "success":
                    tmp = tmp.replace("{{glyphicon}}", "glyphicon glyphicon-ok");
                case "error":
                    tmp = tmp.replace("{{glyphicon}}", "glyphicon glyphicon-remove");
                default:
                    tmp = tmp.replace("{{glyphicon}}", "glyphicon glyphicon-ok");
                    break;
            }
            if (config.closeLink) {
                tmp = tmp.replace("{{closeLink}}", config.closeLink);
            } else {
                tmp = tmp.replace("{{closeLink}}", "javascript:void(0)");
            }
            if (config.cancelLink) {
                tmp = tmp.replace("{{cancelLink}}", config.cancelLink);
            } else {
                tmp = tmp.replace("{{cancelLink}}", "javascript:void(0)");
            }


            var $tmp = $(tmp);
            $tmp.config = config;
            $tmp.closeCallback = config.closeCallback;
            $tmp.cancelCallback = config.cancelCallback;
            if (!config.showClose) {
                $tmp.find('.modal-footer').find('[data-confirm="close"]').css("display", "none");
            }
            if (!config.showCancel) {
                $tmp.find('.modal-footer').find('[data-confirm="cancel"]').css("display", "none");
            }
            if (!config.closeLink) {
                $tmp.on("click", '[data-confirm="close"]', function () {
                    $tmp.remove();
                    config.closeCallback && $tmp.closeCallback();
                });
            }
            if (!config.cancelLink) {
                $tmp.on("click", '[data-confirm="cancel"]', function () {
                    $tmp.remove();
                    config.cancelCallback && $tmp.cancelCallback();
                });
            }
            $tmp.appendTo($("body"));
        }
    };
}(jQuery, window));


/**
 * modal
 */
(function ($) {
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
        show: true,
        marginTop: 100, //定位模态框距离顶部的距离
        backdrop: true, //点击遮罩是否关闭模态框
        closeFn: null,
        dismissFn: null
    };
    Modal.prototype.init = function () {
        var self = this;
        self.$ele.on("click", '[data-dismiss="modal"]', function (event) {
            self.dismiss();
            event.stopPropagation(); //阻止冒泡
        });
        self.$ele.on("click", '[data-close="modal"]', function () {
            self.close();
            return false; //阻止冒泡
        });
        self.$ele.on("click", function () {
            self.options.backdrop && $(event.target).is(".modal") && self.dismiss();
        });
    };
    Modal.prototype.open = function () {
        var self = this;
        self.$ele.addClass('modal-open');
    };
    Modal.prototype.close = function () {
        var self = this;
        self.closeFn && self.closeFn.call(self, self);
        self.hide();
    };
    Modal.prototype.dismiss = function () {
        var self = this;
        self.dismissFn && self.dismissFn.call(self, self);
        self.hide();
    };
    Modal.prototype.hide = function () {
        var self = this;
        self.$ele.removeClass('modal-open');
    };

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data("snake.modal");
            var options = $.extend(true, $.extend(Modal.DEFAULTS), $this.data(), typeof option == "object" && option);

            $(this).find(".modal-dialog").css("margin-top", option.marginTop + "px");

            if (!data) $this.data("snake.modal", (data = new Modal(this, options)));
            if (typeof option == "string") data[option]();
            else if (options.show) data.open();
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

    function _getCssPath() {
        $(document.scripts).each(function (index, el) {
            if (el.src.indexOf("modal.js") > -1) {
                BASE_PATH = el.src;
                CSS_PATH = el.src.replace("modal.js", "modal.css");
            }
        });
    }

    function _init() {
        //自动加载样式
        // _getCssPath();
        // _addStyle();
    }

    _init();

    var old = $.fn.modal;

    $.fn.modal = Plugin;
    $.fn.modal.Constructor = Modal;

    // DROPDOWN NO CONFLICT
    // ====================
    $.fn.modal.noConflict = function () {
        $.fn.dropdown = old;
        return this
    };

    $(window).on("load", function () {
        return $("[data-snake='modal']").each(function () {
            Plugin.call($(this), $(this).data());
        });
    });
})(jQuery);