/**
 * Created by SNAKE on 2017/6/15.
 */
(function ($, win) {
    //搜索操作
    win.$searchCrq = function () {
        /*
         * 本地搜索：单品查&&(PC||WX)
         * 排序人气：PC||PC_TM
         * */
        var $search_device = $("[data-search='search_device']").eq(0); //搜索入口 PC/PC_TM/WX/WX_TM
        var $search_type = $("[data-search='search_type']").eq(0); //查询模式
        var $search_key = $("[data-search='search_key']").eq(0);   //宝贝链接
        var $search_wangwang = $("[data-search='search_wangwang']").eq(0);   //店铺旺旺
        var $search_word = $("[data-search='search_word']").eq(0); //关键词
        var $search_rank_line = $("[data-search='search_rank_line']").eq(0); //排序
        var $search_price = $("[data-search='search_price']").eq(0); //价格
        var $search_marked_words = $("#search_marked_words");  //提示语

        var $search_locs = $("[data-search='search-locs']").eq(0);
        var $search_locs_text = $("[data-search='search-locs']").find(".search-locs-text").eq(0);
        var $locs_hover_box = $("[data-search='search-locs']").find(".locs-hover-box").eq(0);
        var $search_locs_btn = $("[data-search='search-locs-btn']").eq(0);
        var $search_locs_input = $("[data-search='search-locs-input']").eq(0);

        var $search_rank = $("[data-search='search_rank']").eq(0); //排序方式 zonghe/sales/moods
        var $fixed_cc = $("[data-search='fixed_cc']").eq(0); //筛选条件 pc_condition/pc_tmall_condition/wx_tmall_condition/wx_condition
        var $search_mode = $("[data-search='search_mode']").eq(0); //搜索方式  client/server
        var $search_address = $("[data-search='search_address']").eq(0); //千人千面

        var $search_rank_moods = $search_rank.find("[for='RANK_MOODS']").eq(0); //人气单选的label
        var $search_mode_client = $search_mode.find("[for='CLIENT']").eq(0); //本机单选的label

        var $pc_condition = $("[data-search='pc_condition']").eq(0); //PC筛选条件
        var $pc_tmall_condition = $("[data-search='pc_tmall_condition']").eq(0); //PC_TM筛选条件
        var $wx_tmall_condition = $("[data-search='wx_tmall_condition']").eq(0); //WX_TM筛选条件
        var $wx_condition = $("[data-search='wx_condition']").eq(0); //WX筛选条件

        function getParam() {
            var device = $search_device.find("input:radio:checked").val() || "";

            var param = {};
            param.search_key = $search_key.find("input").val();
            param.search_word = $search_word.find("textarea").val() ? $search_word.find("textarea").val().replace(/(\n\n)/g, "\n") : "";
            // param.search_word = $search_word.find("textarea").val() ? $search_word.find("textarea").val().replace(/(\r)|(\n)/g, ",") : "";
            // param.search_word = $search_word.find("textarea").val();
            param.device = device.indexOf("PC") > -1 ? 0 : 1;
            param.type = device.indexOf("TM") > -1 ? 1 : 0;
            param.rankTypes = $search_rank.find("input:radio:checked").val();
            param.condition = "";
            param.crawLoc = $search_mode.find("input:radio:checked").val() == "client" ? "client" : $search_address.find("input:radio:checked").val();
            param.startPrice = $search_price.find("input").eq(0).val();
            param.endPrice = $search_price.find("input").eq(1).val();
            param.searchType = $search_type.find("input:radio:checked").val();
            param.searchWangawng = $search_wangwang.find("input").val();
            param.locs = $search_locs_text.text() == "发货地" ? "" : ($search_locs_text.text().replace(/，/g,","));
            switch (device) {
                case "PC":
                    $pc_condition.find("input:checkbox:checked").each(function (index, ele) {
                        param.condition = param.condition ? (param.condition + "," + $(ele).val()) : $(ele).val();
                        param.conditionPCs = param.condition;
                    });
                    break;
                case "PC_TM":
                    $pc_tmall_condition.find("input:checkbox:checked").each(function (index, ele) {
                        param.condition = param.condition ? (param.condition + "," + $(ele).val()) : $(ele).val();
                        param.conditionPCTmalls = param.condition;
                    });
                    break;
                case "WX":
                    $wx_condition.find("input:checkbox:checked").each(function (index, ele) {
                        param.condition = param.condition ? (param.condition + "," + $(ele).val()) : $(ele).val();
                        param.conditionWXs = param.condition;
                    });
                    break;
                case "WX_TM":
                    $wx_tmall_condition.find("input:checkbox:checked").each(function (index, ele) {
                        param.condition = param.condition ? (param.condition + "," + $(ele).val()) : $(ele).val();
                        param.conditionWXTmalls = param.condition;
                    });
                    break;
                default :
                    break;
            }
            return param;
        }

        function setParam() {
            var param = getSessionParam();
            if (!param)return;
            var device_type = param.device == 0 ? (param.type == 0 ? "PC" : "PC_TM") : (param.type == 0 ? "WX" : "WX_TM");
            var conditions = param.condition ? param.condition.split(",") : [];

            $search_key.find("input").val(param.search_key);
            // $search_word.find("textarea").val(param.search_word ? param.search_word.replace(/,/g, "\r\n") : "");
            $search_word.find("textarea").val(param.search_word);

            $search_device.find("input:radio[name='search_device'][value='" + device_type + "']").prop("checked", true);

            $search_rank.find("input:radio[name='search_rank'][value='" + param.rankTypes + "']").prop("checked", true);

            $pc_condition.addClass("search_condition_hide");
            switch (device_type) {
                case "PC":
                    $pc_condition.removeClass("search_condition_hide");
                    $.each(conditions, function (index, item) {
                        $pc_condition.find("input:checkbox[name='pc_condition'][value='" + item + "']").prop("checked", true);
                    });
                    break;
                case "PC_TM":
                    $pc_tmall_condition.removeClass("search_condition_hide");
                    $.each(conditions, function (index, item) {
                        $pc_tmall_condition.find("input:checkbox[name='pc_tmall_condition'][value='" + item + "']").prop("checked", true);
                    });
                    break;
                case "WX":
                    $wx_condition.removeClass("search_condition_hide");
                    $.each(conditions, function (index, item) {
                        $wx_condition.find("input:checkbox[name='wx_condition'][value='" + item + "']").prop("checked", true);
                    });
                    break;
                case "WX_TM":
                    $wx_tmall_condition.removeClass("search_condition_hide");
                    $.each(conditions, function (index, item) {
                        $wx_tmall_condition.find("input:checkbox[name='wx_tmall_condition'][value='" + item + "']").prop("checked", true);
                    });
                    break;
                case "PC":
                    $pc_condition.removeClass("search_condition_hide");
                    $.each(conditions, function (index, item) {
                        $pc_condition.find("input:checkbox[name='pc_condition'][value='" + item + "']").prop("checked", true);
                    });
                    break;
                default :
                    break;
            }

            if (param.crawLoc == "client") {
                $search_mode.find("input:radio[name='search_mode'][value='client']").prop("checked", true);
                //本地隐藏千人千面
                $search_address.addClass("search_address_hide");

                $search_marked_words.find("label").text("本机查询：");
                $search_marked_words.find("div").text("此排名查询为，去除浏览器缓存和个性化基础上的真实本地排名，可能会和您浏览器自己查询排名有一定差异，此为正常情况。");
            } else {
                $search_mode.find("input:radio[name='search_mode'][value='server']").prop("checked", true);
                $search_address.find("input:radio[name='search_address'][value='" + param.crawLoc + "']").prop("checked", true);
                //云服务显示千人千面
                $search_address.removeClass("search_address_hide");

                $search_marked_words.find("label").text("云服务器查询：");
                $search_marked_words.find("div").text("利用部署在全国各地的云服务器，排除浏览器缓存和个性化影响，真实去查询全国各地的宝贝排名，方便了解不同地域的排名情况；");
            }

            $search_price.find("input").eq(0).val(param.startPrice);
            $search_price.find("input").eq(1).val(param.endPrice);

            //天猫隐藏本机 无线隐藏手机
            if (device_type.indexOf("TM") > -1) {
                $search_mode_client.addClass("search_client_hide");
            }
            if (device_type.indexOf("WX") > -1) {
                $search_rank_moods.addClass("search_moods_hide");
            }

            //查询模式 旺旺
            $search_wangwang.find("input").val(param.searchWangawng);
            if(param.searchType == "wangwang" && (window.location.pathname == "/Item_rank" || window.location.pathname == "/home" || window.location.pathname == "/")){
                $search_key.css("display","none");
                $search_wangwang.css("display","");
                $search_type.find("input:radio[name='search_type'][value='wangwang']").prop("checked", true);
            }

            $search_locs_text.text(param.locs == "" ? "发货地" : param.locs);
        }

        function getSessionParam() {
            return sessionStorage.crq_search_param ? JSON.parse(sessionStorage.crq_search_param) : null;
        }

        function setSessionParam(param) {
            param = param ? param : getParam();
            sessionStorage.crq_search_param = JSON.stringify(param);
        }

        function _initEvent() {
            //搜索入口切换
            $search_device.on("change", "label", function () {
                //无线隐藏人气  天猫隐藏本机 切换响应的筛选条件
                $fixed_cc.find(".fixed_cc_list").addClass("search_condition_hide");
                switch ($search_device.find("input:radio:checked").val()) {
                    case "PC":
                        $search_rank_moods.removeClass("search_moods_hide");
                        $search_mode_client.removeClass("search_client_hide");
                        $pc_condition.removeClass("search_condition_hide");
                        break;
                    case "PC_TM":
                        $search_rank_moods.removeClass("search_moods_hide");
                        //隐藏本地 选中服务 显示千人千面
                        $search_mode_client.addClass("search_client_hide");
                        $search_mode.find("input:radio[name='search_mode'][value='server']").prop("checked", true);
                        $search_address.removeClass("search_address_hide");

                        $pc_tmall_condition.removeClass("search_condition_hide");

                        $search_marked_words.find("label").text("云服务器查询：");
                        $search_marked_words.find("div").text("利用部署在全国各地的云服务器，排除浏览器缓存和个性化影响，真实去查询全国各地的宝贝排名，方便了解不同地域的排名情况；");
                        break;
                    case "WX":
                        //隐藏人气 选中综合
                        $search_rank_moods.addClass("search_moods_hide");
                        $search_rank.find("input:radio[name='search_rank'][value='zonghe']").prop("checked", true);

                        $search_mode_client.removeClass("search_client_hide");

                        $wx_condition.removeClass("search_condition_hide");
                        break;
                    case "WX_TM":
                        //隐藏人气 选中综合
                        $search_rank_moods.addClass("search_moods_hide");
                        $search_rank.find("input:radio[name='search_rank'][value='zonghe']").prop("checked", true);
                        //隐藏本地 选中服务 显示千人千面
                        $search_mode_client.addClass("search_client_hide");
                        $search_mode.find("input:radio[name='search_mode'][value='server']").prop("checked", true);
                        $search_address.removeClass("search_address_hide");

                        $wx_tmall_condition.removeClass("search_condition_hide");

                        $search_marked_words.find("label").text("云服务器查询：");
                        $search_marked_words.find("div").text("利用部署在全国各地的云服务器，排除浏览器缓存和个性化影响，真实去查询全国各地的宝贝排名，方便了解不同地域的排名情况；");
                        break;
                    default :
                        break;
                }
            });
            //查询模式切换
            $search_type.on("change", "label", function(){
                if($search_type.find("input:radio:checked").val() == "item"){
                    $search_key.css("display","");
                    $search_wangwang.css("display","none");
                }else {
                    $search_wangwang.css("display","");
                    $search_key.css("display","none");
                }
            });
            //搜索方式切换
            $search_mode.on("change", "label", function () {
                if ($search_mode.find("input:radio:checked").val() == "client") {
                    $search_address.addClass("search_address_hide");

                    $search_marked_words.find("label").text("本机查询：");
                    $search_marked_words.find("div").text("此排名查询为，去除浏览器缓存和个性化基础上的真实本地排名，可能会和您浏览器自己查询排名有一定差异，此为正常情况。");
                } else {
                    $search_address.removeClass("search_address_hide");

                    $search_marked_words.find("label").text("云服务器查询：");
                    $search_marked_words.find("div").text("利用部署在全国各地的云服务器，排除浏览器缓存和个性化影响，真实去查询全国各地的宝贝排名，方便了解不同地域的排名情况；");
                }
            });
            //发货地
            $locs_hover_box.on("click", ".box-item", function(){
                var event = arguments[0]||window.event;
                $search_locs_text.text($(event.target).text());
            });
            $search_locs_btn.on("click", function(){
                if($search_locs_input.val() == ""){
                    return;
                }
                $search_locs_text.text($search_locs_input.val().replace(/，/g,","));
                $search_locs_input.val("");
            });

            //价格验证
            $search_price.on("change", "input", function () {
                var val = $(this).val().replace(/[^\d|.]/g, "");
                val == "" ? $(this).val(val) : $(this).val(parseFloat(val).toFixed(2));
            });
        }

        function _init() {
            _initEvent();
            setParam();
        }

        _init();
        return {
            getParam: getParam,
            setParam: setParam,
            getSessionParam: getSessionParam,
            setSessionParam: setSessionParam,
            cleanSessionParam: function () {
                sessionStorage.crq_search_param = JSON.stringify(null);
            }
        };
    }();

    //缓存操作
    win.$crqMemory = function () {
        return {
            isLocalStorage: function () {
                return window.localStorage ? true : false;
            },
            //存值
            set: function (item, value) {
                if (this.isLocalStorage) {
                    try {
                        localStorage[item] = value;
                    } catch (e) {
                        return;
                    }
                }
            },
            //取值
            get: function (item) {
                if (this.isLocalStorage) {
                    return localStorage[item];
                }
            },
            //删除一个值
            del: function (item) {
                if (this.isLocalStorage) {
                    localStorage.removeItem(item);
                }
            },
            //全部清除
            clear: function () {
                if (this.isLocalStorage) {
                    localStorage.clear();
                }
            },
            //json存储
            json_set: function (item, value) {
                if (this.isLocalStorage) {
                    try {
                        localStorage[item] = JSON.stringify(value);
                    } catch (e) {
                        return;
                    }
                }
            },
            //json取值
            json_get: function (item) {
                if (this.isLocalStorage) {
                    var data = localStorage[item] ? JSON.parse(localStorage[item]) : '';
                    return data;
                }
            },
            //遍历，用于测试
            display: function () {
                if (this.isLocalStorage) {
                    var data = '';
                    for (var i = 0; i < localStorage.length; i++) {
                        key = localStorage.key(i);
                        value = localStorage.getItem(key);
                        data += "\nkey:" + key + " value:" + value;
                    }
                    return data;
                }
            }
        }
    }();
})(jQuery, window);
