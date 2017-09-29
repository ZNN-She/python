/**
 * Created by nanning_zhang on 2016/7/10.
 */
define([], function() {
    var DEFAULT = {
        url: null,
        type: "get",
        dataType: 'json',
        timeout: 10000,
        contentType: "application/json; charset=utf-8",
        data: null,
        success: function(data) {
            if (data.code == 0) {

            } else if (data.code == 301) {
                data.link ? window.location.href = data.link : $win.alert(data.msg);
            } else {
                $win.alert(data.msg);
            }
        },
        error: function(xhr, type, errorThrown) {
            //异常处理；
            $win.alert("请求错误:" + xhr.status + "|" + xhr.statusText);
        }
    };

    function getOption(url, type, param, data, successCallback, errorCallback, headers) {
        var settings = {
            url: url,
            type: type,
            data: "",
            success: successCallback,
            error: errorCallback
        };
        if (headers) {
            settings.data = param;
        } else {
            settings.data = data && JSON.stringify(data);
            if (param) {
                var urlParam = null;
                for (var key in param) {
                    urlParam = urlParam ? (urlParam + "&" + key + "=" + param[key]) : (key + "=" + param[key]);
                }
                settings.url = settings.url + "?" + urlParam;
            }
        }
        settings = $.extend({}, DEFAULT, settings);
        settings.contentType = headers ? headers.contentType : settings.contentType;
        return settings;
    }

    //获取相应回调集合
    function getAction(callback, deferred) {
        var options = {};
        var DEFAULTS = {
            successCallback: null, //成功回调
            errorCallback: null, //错误回调
            failCallback: null, //完成动作
            custom: false, //自定义
            deferred: deferred
        };

        options = typeof(callback) == "object" ? $.extend({}, DEFAULTS, callback) : $.extend({}, DEFAULTS, {
            successCallback: callback
        });

        return getCallback(options, deferred);
    }

    function globalResolve(data) {
        if (data.code == 301) {
            data.link ? window.location.href = data.link : $win.alert(data.msg);
        } else {
            $win.alert(data.type || (data.code + data.msg));
        }
    }
    /**
     * 0 success
     * 301 重定向
     */
    function needGlobalResolve(data) {
        var sourceCode = ["301"];
        if (typeof codes == "string" || typeof codes == "number") {
            sourceCode.indexOf(String(codes)) != -1 && sourceCode.splice(sourceCode.indexOf(String(codes)), 1);
        } else if (codes instanceof Array) {
            codes.forEach(function (item) {
                sourceCode.indexOf(String(item)) != -1 && sourceCode.splice(sourceCode.indexOf(String(item)), 1);
            });
        }
        return sourceCode.indexOf(String(data.code)) != -1;
    }

    //生成回调
    function getCallback(options, codes) {
        var successHandler, errorHandler;
        //创建成功回调
        if (options.custom) {
            successHandler = options.successCallback;
        } else {
            successHandler = function(data) {
                if (data.code == 0) {
                    options.successCallback && options.successCallback.call(this, data);
                } else if (needGlobalResolve(data,codes)) {
                    globalResolve(data);
                } else { //执行失败回调
                    if (options.failCallback) {
                        options.failCallback && options.failCallback(data);
                    } else {
                        $win.alert(data.msg || data.type);
                    }
                }
            }
        }
        //创建失败回调
        if (options.errorCallback && typeof options.errorCallback == "function") {
            errorHandler = options.errorCallback;
        } else {
            errorHandler = function(xhr, type, errorThrown) {
                $win.alert("请求错误：" + xhr.status + "|" + xhr.statusText, "text");
            }
        }

        return {
            success: successHandler,
            error: errorHandler
        }
    }

    return {
        get: function(url, param, action, codes) {
            var callback = getAction(action, codes);
            return $.ajax(getOption(url, "get", param, null, callback.success, callback.error));
        },
        post: function(url, param, data, action, codes) {
            var callback = getAction(action, codes);
            return $.ajax(getOption(url, "post", param, data, callback.success, callback.error));
        },
        put: function(url, param, data, action, codes) {
            var callback = getAction(action, codes);
            return $.ajax(getOption(url, "put", param, data, callback.success, callback.error));
        },
        deletes: function(url, param, data, action, codes) {
            var callback = getAction(action, codes);
            return $.ajax(getOption(url, "delete", param, data, callback.success, callback.error));
        },
        postFormData: function(url, param, action, codes) {
            var callback = getAction(action, codes);
            var headers = { 'contentType': 'application/x-www-form-urlencoded' };
            return $.ajax(getOption(url, "post", param, null, callback.success, callback.error, headers));
        }
    }
})