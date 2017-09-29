(function (window) {
    /**
     * Created by Administrator on 30/12/2016.
     */
    var storeExtInfo = {};

    function store_ext_info(sellerIds, callback_fun) {
        storeExtInfo.callback_fun = callback_fun;
        for (var i = 0; i < sellerIds.length; i++) {
            $.ajax({
                // async:false,
                url: "https://s.taobao.com/api?app=api&m=get_shop_card&sid=" + sellerIds[i],
                type: "GET",
                dataType: 'jsonp',
                data: {
                    index: i,
                    timeout: 5000
                },
                success: function (res) {
                    var DSR = res.matchDescription + "_" + res.serviceAttitude + "_" + res.deliverySpeed;
                    var shellerId = res.userId;
                    var _data = {};
                    if (res.levelClasses != "" && res.levelClasses.length) {
                        var classNames = res.levelClasses;
                        var level = classNames.length;
                        var levelName = "red";
                        var className = classNames[0].levelClass;
                        if (className.indexOf("level-guan") != -1) {
                            levelName = "cap";
                        }
                        if (className.indexOf("level-jinguan") != -1) {
                            levelName = "crown";
                        }
                        if (className.indexOf("level-xin") != -1) {
                            levelName = "red";
                        }
                        if (className.indexOf("level-zuan") != -1) {
                            levelName = "blue";
                        }
                        _data = {store_dsr: DSR, store_rate: "s_" + levelName + "_" + level, shellerId: shellerId};

                    } else {
                        _data = {store_dsr: DSR, store_rate: "", shellerId: shellerId};

                    }
                    // console.log(res);
                    if (storeExtInfo.callback_fun) {
                        storeExtInfo.callback_fun(_data);
                    }
                },
                error: function (xhr) {
                    console.log("请求出错(请检查相关度网络状况.)");
                    console.log(xhr);
                }
            });
        }
    }


    var storeExtInfo1 = {};

    function store_ext_info1(sellerIds, callback_fun, temp_i) {
        storeExtInfo.callback_fun = callback_fun;
        for (var i = 0; i < sellerIds.length; i++) {
            $.ajax({
                // async:false,
                url: "https://s.taobao.com/api?app=api&m=get_shop_card&sid=" + sellerIds[i],
                type: "GET",
                dataType: 'jsonp',
                data: {
                    index: i,
                    timeout: 5000
                },
                success: function (res) {
                    var DSR = res.matchDescription + "_" + res.serviceAttitude + "_" + res.deliverySpeed;
                    var shellerId = res.userId;
                    var _data = {};
                    if (res.levelClasses != "") {
                        var classNames = res.levelClasses;
                        var level = classNames.length;
                        var levelName = "red";
                        var className = classNames[0].levelClass;
                        if (className.indexOf("level-guan") != -1) {
                            levelName = "cap";
                        }
                        if (className.indexOf("level-jinguan") != -1) {
                            levelName = "crown";
                        }
                        if (className.indexOf("level-xin") != -1) {
                            levelName = "red";
                        }
                        if (className.indexOf("level-zuan") != -1) {
                            levelName = "blue";
                        }
                        _data = {store_dsr: DSR, store_rate: "s_" + levelName + "_" + level, shellerId: shellerId};

                    } else {
                        _data = {store_dsr: DSR, store_rate: "", shellerId: shellerId};

                    }
                    // console.log(res);
                    if (storeExtInfo.callback_fun) {
                        storeExtInfo.callback_fun(_data, temp_i);
                    }
                },
                error: function (xhr) {
                    console.log("请求出错(请检查相关度网络状况.)");
                    console.log(xhr);
                }
            });
        }
    }

    window.store_ext_info = store_ext_info;
    window.store_ext_info1 = store_ext_info1;
})(window);