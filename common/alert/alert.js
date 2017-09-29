/**
 * alert
 */
+ function($) {
    'use strict';

    // ALERT CLASS DEFINITION
    // ======================

    var dismiss = '[data-dismiss="alert"]';
    var Alert = function(el) {
        $(el).on('click', dismiss, this.close)
    };

    Alert.VERSION = '0.1.0';

    Alert.prototype.close = function(e) {
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
        return this.each(function() {
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

    $.fn.alert.noConflict = function() {
        $.fn.alert = old;
        return this
    };


    // ALERT DATA-API
    // ==============

    $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);


/**
 * rely jQuery bootstrap font
 */
(function($, win) {
    win.$alert = function(option) {
        var DEFAULTS = {
            type: "warning", //场景类型：warning,info,danger,success
            content: "", //内容
            autoClose: true, //是否自动关闭
            duration: 5000, //停留时间
            size: "" //尺寸
        };

        var config = $.extend({}, DEFAULTS, typeof option == "string" ? { content: option } : option);
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
            setTimeout(function() {
                domEl.alert('close');
            }, config.duration);
        }
    }


    // 当前文件路径
    var BASE_PATH = "";
    var CSS_PATH = "";
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
            if (el.src.indexOf("alert.js") > -1) {
                BASE_PATH = el.src;
                CSS_PATH = el.src.replace("alert.js", "alert.css");
            }
        });
    }

    function _init() {
        //自动加载样式
        _getCssPath();
        _addStyle();
    }

    _init();
}(jQuery, window));