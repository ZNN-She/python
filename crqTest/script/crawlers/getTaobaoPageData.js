/**
 * Created by SNAKE on 2017/7/31.
 * 获取淘宝商品搜索分页数据
 * 重写上面的方法
 */
//filter=reserve_price%5B12%2C56%5D & loc=%E4%B8%8A%E6%B5%B7
(function ($, win) {
    var _param = {
        taobaoUrl: "https://s.taobao.com/search?",
        keyword: "",        //商品关键词 conditionParams
        itemId: "",         //商品ID 和searchType配合使用
        nick: "",           //店铺旺旺 和searchType配合使用
        searchType: "list", //查询方式 list:返回商品list（默认 data.mods.itemlist.data.auctions）  item:返回指定商品(nid) wangwang:返回指定店铺商品(nid/nick) data:返回所有数据(data)
        type: "taobao",     //目前只支持淘宝查询 天猫不支持 type
        rankType: "",       //排序方式 zonghe:综合 sale:销量 renqi:人气 rankType
        P4P: false,         //是否过滤直通车  false:不过滤，true:过滤
        page: 1,
        parentPageIsOne: true, //上一页是否是第一页
        callBack: function (data) {
            console.log("getTaobaoPageData");
        }
    };

    win.getTaobaoPageData = function (data, callBack) {
        var param = $.extend({}, $.extend({}, _param), data);
        if (callBack) {
            param.callBack = callBack;
        }
        var paramBase = createBaseParamsMap();
        var url = getKeyPageUrl((param.taobaoUrl + getUrl(paramBase)), param);
        $.ajax({
            url: url,
            dataType: "jsonp",
            success: function (data) {
                data = serverToClient(data, param);
                if (param.searchType == "all") {
                    param.callBack(data);
                } else {
                    try {
                        var itemList = data.mods.itemlist.data.auctions;
                        var selectList = getSelectItemList(itemList, param);
                        param.callBack(selectList);
                    } catch (e) {
                        console.log(e);
                        param.callBack([], e);
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("请求错误:" + XMLHttpRequest.status + "|" + XMLHttpRequest.statusText);
            }
        })
    };


    /*创建基础参数拼装*/
    function createBaseParamsMap() {
        params = {};
        params["ssid"] = "s5-e";
        params["search_type"] = "item";
        params["sourceId"] = "tb.index";
        params["ie"] = "utf8";
        params["_input_charset"] = "utf-8";
        params["commend"] = "all";
        var date = new Date();
        params["initiative_id"] = "tbindexz_" + date.getFullYear() + (("0" + (date.getMonth() + 1)).slice(-2)) + date.getDate();//DateUtil.dateToStr(new Date(), DateUtil.YMd_noSpli);
        params["spm"] = "a21bo." + randomNumeric(5) + "." + randomNumeric(6) + "-taobao-item.2";
        params["ajax"] = "true";
        var randomInt = nextInt(301, 1500);
        params["_ksTS"] = date.getTime() + "_" + randomInt;
        // params["callback"]="jsonp" + (randomInt + 1);
        params["imgfile"] = "";
        //params["p4plefttype"]="3,1";
        //params["p4pleftnum"]="1,3";
        params["p4ppushleft"] = "1,48";
        params["source"] = "suggest";
        params["bcoffset"] = "4";
        params["ntoffset"] = "4";
        // params["stats_click"]="search_radio_all:1";
        // params["js"]= "1";
        //params["cd"]="false";
        return params;
    }

    /*获取关键词搜索分页链接*/
    function getKeyPageUrl(url, param) {
        param.rankType = param.rankType == "renqi" ? "renqi-desc" : param.rankType == "sale" ? "sale-desc" : "default";
        if (param.page > 1) {
            url += "&data-key=s";
            var dv = (param.page - 1) * 44;
            var s = (param.page - 2) * 44;

            url += "&data-value=" + dv;
            if (s > 0) {
                url += "&s=" + s;
            }
            url += "&sort=" + param.rankType;

            if (param.rankType == "default" && !param.parentPageIsOne) {
                if (param.page == 2) {
                    url += "&bcoffset=" + (-2);
                    url += "&ntoffset=" + 0;
                } else {
                    url += "&bcoffset=" + (-3 * param.page + 4);
                    url += "&ntoffset=" + (-3 * param.page + 10);
                }
            } else {
                if (param.page == 2) {
                    url += "&bcoffset=" + 1;
                    url += "&ntoffset=" + 0;
                } else {
                    url += "&bcoffset=" + (-3 * param.page + 7);
                    url += "&ntoffset=" + (-3 * param.page + 13);
                }
            }
        } else {
            url += "&data-key=s";
            url += "&data-value=" + param.rankType;
        }
        url += "&q=" + encodeURIComponent(param.keyword);
        /*去除无关参数传入*/
        /*var condition=getUrl(conditionParams)
         if(condition){
         url+="&"+condition
         }*/
        if (param.P4P && !param.parentPageIsOne) {
            url += "&p4ppushleft=" + encodeURIComponent("1,48");
        }
        /*else{//添加fs=1时默认是过滤掉天猫和直通车数据展示位信息，为防止搜索到数据误差过大该处不进行过滤
         url+="&fs=1"
         }*/
        //价格
        url = url + "&filter=reserve_price%5B" +　param.startPrice + "%2C" + param.endPrice + "%5D";
        //发货地
        url = url + "&loc" + encodeURI(param.locs);
        if (!param.parentPageIsOne) {
            url += "&s=44";
        }
        param.parentPageIsOne = false;
        return url;
    }

    /*封装url参数的拼接处理*/
    function getUrl(params) {
        var url = "";
        for (x in params) {
            var e = params[x];
            if (e instanceof Array) {
                for (var i = 0; i < e.length; i++) {
                    url += "&" + x + "=" + encodeURIComponent(e[i]);
                }
            } else {
                url += "&" + x + "=" + encodeURIComponent(e);
            }
        }
        if (url) {
            return url.substring(1);
        }
        return url;
    }

    /*产生指定字段随机数*/
    function nextInt(start, end) {
        return start + Math.floor(Math.random() * (end - start));
    }

    function randomNumeric(count) {
        if (count < 1) {
            return 0;
        }
        if (count == 1) {
            return Math.floor(Math.random());
        }

        var a = "" + Math.floor(Math.random() * Math.pow(10, count - 1));
        var b = count - a.length - 1;
        var zeroStr = "";
        for (var i = 0; i < b; i++) {
            zeroStr += 0;
        }
        return Math.floor(Math.random() * 8 + 1) + zeroStr + a;

    }

    function serverToClient(data,param) {
        try {
            var itemList = data.mods.itemlist.data.auctions;
            $.each(itemList, function (index, item) {
                item.page = data.mods.pager.data.currentPage;
                item.totalPage = data.mods.pager.data.totalPage;
                item.totalCount = data.mods.pager.data.totalCount;
                item.rank = item.page * 44 + index + 1;
                item.line = parseInt((index + 1) / 4) + 1;
            });
            return data;
        } catch (e) {
            console.log(e);
            param.callBack([], e);
        }
    }

    function getSelectItemList(itemList, param) {
        var selectList = [];
        switch (param.searchType) {
            case "list":
                selectList = itemList;
                break;
            case "item":
                $.each(itemList, function (index, item) {
                    if (item.nid == param.itemId) {
                        selectList.push(item);
                    }
                });
                break;
            case "wangwang":
                $.each(itemList, function (index, item) {
                    if (item.nick == param.nick) {
                        selectList.push(item);
                    }
                });
                break;
            default:
                selectList = itemList;
                break;
        }
        return selectList;
    }
})(jQuery, window);