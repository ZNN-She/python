(function($, win) {
    win.$confirm = function(option) {
        var DEFAULTS = {
            type: "default", //default,success,error
            // img: "images/component/alert/alert-question.png",//图标
            content: "", //内容
            title: "", //内容标题
            windowTitle: "系统提示", //窗口名称
            closeText: "确定", //确认按钮文本
            cancelText: "取消", //取消按钮文本
            showClose: true, //显示确认按钮
            showCancel: true, //显示取消按钮
            size: "sm", //尺寸 sm lg
            closeLink: "", //链接
            cancelLink: "", //链接
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

        var config = $.extend({}, DEFAULTS, typeof option == "string" ? { content: option } : option);

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
            $tmp.on("click", '[data-confirm="close"]', function() {
                $tmp.remove();
                config.closeCallback && $tmp.closeCallback();
            });
        }
        if (!config.cancelLink) {
            $tmp.on("click", '[data-confirm="cancel"]', function() {
                $tmp.remove();
                config.cancelCallback && $tmp.cancelCallback();
            });
        }
        $tmp.appendTo($("body"));
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
            if (el.src.indexOf("confirm.js") > -1) {
                BASE_PATH = el.src;
                CSS_PATH = el.src.replace("confirm.js", "confirm.css");
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