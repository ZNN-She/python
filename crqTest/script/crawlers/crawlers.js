/**
 * Created by SNAKE on 2017/9/29.
 */
window.$crawlers = {};

(function (window) {
    /**
     * Created by Administrator on 2016/12/29.
     */
    function g(a) {
        function b(a, b) {
            return a << b | a >>> 32 - b
        }

        function c(a, b) {
            var c, d, e, f, g;
            return e = 2147483648 & a,
                f = 2147483648 & b,
                c = 1073741824 & a,
                d = 1073741824 & b,
                g = (1073741823 & a) + (1073741823 & b),
                c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f : g ^ e ^ f
        }

        function d(a, b, c) {
            return a & b | ~a & c
        }

        function e(a, b, c) {
            return a & c | b & ~c
        }

        function f(a, b, c) {
            return a ^ b ^ c
        }

        function g(a, b, c) {
            return b ^ (a | ~c)
        }

        function h(a, e, f, g, h, i, j) {
            return a = c(a, c(c(d(e, f, g), h), j)),
                c(b(a, i), e)
        }

        function i(a, d, f, g, h, i, j) {
            return a = c(a, c(c(e(d, f, g), h), j)),
                c(b(a, i), d)
        }

        function j(a, d, e, g, h, i, j) {
            return a = c(a, c(c(f(d, e, g), h), j)),
                c(b(a, i), d)
        }

        function k(a, d, e, f, h, i, j) {
            return a = c(a, c(c(g(d, e, f), h), j)),
                c(b(a, i), d)
        }

        function l(a) {
            for (var b, c = a.length, d = c + 8, e = (d - d % 64) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; c > i;)
                b = (i - i % 4) / 4,
                    h = i % 4 * 8,
                    g[b] = g[b] | a.charCodeAt(i) << h,
                    i++;
            return b = (i - i % 4) / 4,
                h = i % 4 * 8,
                g[b] = g[b] | 128 << h,
                g[f - 2] = c << 3,
                g[f - 1] = c >>> 29,
                g
        }

        function m(a) {
            var b, c, d = "", e = "";
            for (c = 0; 3 >= c; c++)
                b = a >>> 8 * c & 255,
                    e = "0" + b.toString(16),
                    d += e.substr(e.length - 2, 2);
            return d
        }

        function n(a) {
            a = a.replace(/\r\n/g, "\n");
            for (var b = "", c = 0; c < a.length; c++) {
                var d = a.charCodeAt(c);
                128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 | 192),
                    b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224),
                    b += String.fromCharCode(d >> 6 & 63 | 128),
                    b += String.fromCharCode(63 & d | 128))
            }
            return b
        }

        var o, p, q, r, s, t, u, v, w, x = [], y = 7, z = 12, A = 17, B = 22, C = 5, D = 9, E = 14, F = 20, G = 4,
            H = 11, I = 16, J = 23, K = 6, L = 10, M = 15, N = 21;
        for (a = n(a),
                 x = l(a),
                 t = 1732584193,
                 u = 4023233417,
                 v = 2562383102,
                 w = 271733878,
                 o = 0; o < x.length; o += 16)
            p = t,
                q = u,
                r = v,
                s = w,
                t = h(t, u, v, w, x[o + 0], y, 3614090360),
                w = h(w, t, u, v, x[o + 1], z, 3905402710),
                v = h(v, w, t, u, x[o + 2], A, 606105819),
                u = h(u, v, w, t, x[o + 3], B, 3250441966),
                t = h(t, u, v, w, x[o + 4], y, 4118548399),
                w = h(w, t, u, v, x[o + 5], z, 1200080426),
                v = h(v, w, t, u, x[o + 6], A, 2821735955),
                u = h(u, v, w, t, x[o + 7], B, 4249261313),
                t = h(t, u, v, w, x[o + 8], y, 1770035416),
                w = h(w, t, u, v, x[o + 9], z, 2336552879),
                v = h(v, w, t, u, x[o + 10], A, 4294925233),
                u = h(u, v, w, t, x[o + 11], B, 2304563134),
                t = h(t, u, v, w, x[o + 12], y, 1804603682),
                w = h(w, t, u, v, x[o + 13], z, 4254626195),
                v = h(v, w, t, u, x[o + 14], A, 2792965006),
                u = h(u, v, w, t, x[o + 15], B, 1236535329),
                t = i(t, u, v, w, x[o + 1], C, 4129170786),
                w = i(w, t, u, v, x[o + 6], D, 3225465664),
                v = i(v, w, t, u, x[o + 11], E, 643717713),
                u = i(u, v, w, t, x[o + 0], F, 3921069994),
                t = i(t, u, v, w, x[o + 5], C, 3593408605),
                w = i(w, t, u, v, x[o + 10], D, 38016083),
                v = i(v, w, t, u, x[o + 15], E, 3634488961),
                u = i(u, v, w, t, x[o + 4], F, 3889429448),
                t = i(t, u, v, w, x[o + 9], C, 568446438),
                w = i(w, t, u, v, x[o + 14], D, 3275163606),
                v = i(v, w, t, u, x[o + 3], E, 4107603335),
                u = i(u, v, w, t, x[o + 8], F, 1163531501),
                t = i(t, u, v, w, x[o + 13], C, 2850285829),
                w = i(w, t, u, v, x[o + 2], D, 4243563512),
                v = i(v, w, t, u, x[o + 7], E, 1735328473),
                u = i(u, v, w, t, x[o + 12], F, 2368359562),
                t = j(t, u, v, w, x[o + 5], G, 4294588738),
                w = j(w, t, u, v, x[o + 8], H, 2272392833),
                v = j(v, w, t, u, x[o + 11], I, 1839030562),
                u = j(u, v, w, t, x[o + 14], J, 4259657740),
                t = j(t, u, v, w, x[o + 1], G, 2763975236),
                w = j(w, t, u, v, x[o + 4], H, 1272893353),
                v = j(v, w, t, u, x[o + 7], I, 4139469664),
                u = j(u, v, w, t, x[o + 10], J, 3200236656),
                t = j(t, u, v, w, x[o + 13], G, 681279174),
                w = j(w, t, u, v, x[o + 0], H, 3936430074),
                v = j(v, w, t, u, x[o + 3], I, 3572445317),
                u = j(u, v, w, t, x[o + 6], J, 76029189),
                t = j(t, u, v, w, x[o + 9], G, 3654602809),
                w = j(w, t, u, v, x[o + 12], H, 3873151461),
                v = j(v, w, t, u, x[o + 15], I, 530742520),
                u = j(u, v, w, t, x[o + 2], J, 3299628645),
                t = k(t, u, v, w, x[o + 0], K, 4096336452),
                w = k(w, t, u, v, x[o + 7], L, 1126891415),
                v = k(v, w, t, u, x[o + 14], M, 2878612391),
                u = k(u, v, w, t, x[o + 5], N, 4237533241),
                t = k(t, u, v, w, x[o + 12], K, 1700485571),
                w = k(w, t, u, v, x[o + 3], L, 2399980690),
                v = k(v, w, t, u, x[o + 10], M, 4293915773),
                u = k(u, v, w, t, x[o + 1], N, 2240044497),
                t = k(t, u, v, w, x[o + 8], K, 1873313359),
                w = k(w, t, u, v, x[o + 15], L, 4264355552),
                v = k(v, w, t, u, x[o + 6], M, 2734768916),
                u = k(u, v, w, t, x[o + 13], N, 1309151649),
                t = k(t, u, v, w, x[o + 4], K, 4149444226),
                w = k(w, t, u, v, x[o + 11], L, 3174756917),
                v = k(v, w, t, u, x[o + 2], M, 718787259),
                u = k(u, v, w, t, x[o + 9], N, 3951481745),
                t = c(t, p),
                u = c(u, q),
                v = c(v, r),
                w = c(w, s);
        var O = m(t) + m(u) + m(v) + m(w);
        return O.toLowerCase();
    }

    function f(a) {
        var b = [];
        for (var c in a)
            a[c] && b.push(c + "=" + encodeURIComponent(a[c]));
        return b.join("&")
    }

    function h(a) {
        var b = new RegExp("(?:^|;\\s*)" + a + "\\=([^;]+)(?:;\\s*|$)").exec(document.cookie);
        return b ? b[1] : void 0
    }

    /**
     * @param jsonp_url     jsonp数据的链接地址
     * @param params        参数传递的对象
     * @param callback_fun   回调函数
     */
// function jsonp_Template(jsonp_url, params, callback_fun) {
//     $.ajax({
//         // async:false,
//         url: jsonp_url,
//         type: "GET",
//         dataType: 'jsonp',
//         jsonpCallback:callback_fun,
//         data: params,
//         timeout: 5000,
//         beforeSend:function (req) {
//             req.setRequestHeader("Cookie", "_m_h5_tk000=cd48bfa945d6d5ff401351e383e8e934_1483069406586;_m_h5_tk_enc000=ca2f3c58d724a966a57095ec2b49b5d9;");
//         },
//         error: function(xhr){
//             console.log("请求出错(请检查相关度网络状况.)");
//             console.log(xhr);
//             console.log(xhr.toString());
//         }
//     });
// }
    function json_Template(json_url, params, callback_fun, callback_params) {
        $.ajax({
            // async:false,
            url: json_url,
            type: "POST",
            dataType: 'json',
            data: params,
            // timeout: 5000,
            success: function (data) {
                if (callback_fun) {
                    callback_fun(data.data, callback_params);
                }
            },
            error: function (xhr) {
                console.log(xhr);
            }
        });
    }

    var mtop_api = {};
    var mtop_default_params = {
        appKey: "12574478",
        api: "mtop.taobao.ocean.quest.detail.pc",
        v: "1.0",
        type: "jsonp",
        dataType: "jsonp"
    };
// function getMtopFromRemote(itemId, callback, server_domain, fromInner) {
//     var url = "https://api.m.taobao.com/h5/mtop.taobao.ocean.quest.detail.pc/1.0/";
//     var params = $.extend({}, mtop_default_params);
//     params.t = (new Date).getTime();
//     var data = '{"itemId":"'+itemId+'"}';
//     params.sign = g(getDefaultToken() + "&" + params.t + "&" + params.appKey + "&" + data);
//     mtop_api.callback = callback;
//     mtop_api.itemId = itemId;
//     mtop_api.server_domain = server_domain;
//     if(!fromInner){
//         mtop_api.retryTimes = 0;
//     }
//     jsonp_Template(url, params, "mtopjsonp3");
// }
    function getDefaultToken() {
        return h("mtop");
    }

// function mtopjsonp3(data) {
//     console.log("mtopjsonp3"+JSON.stringify(data));
//     var _mtop = data;
//     var d = _mtop.ret;
//     if (d instanceof Array && (d = d.join(",")),
//         d.indexOf("TOKEN_EMPTY") > -1 || d.indexOf("TOKEN_EXOIRED") > -1 || d.indexOf("FAIL_SYS_ILLEGAL_ACCESS") > -1) {
//         //令牌无效
//         getMtop(mtop_api.itemId, mtop_api.callback, mtop_api.server_domain);
//     }else if(d instanceof Array && (d = d.join(",")),
//         d.indexOf("SUCCESS") > -1){
//         console.log("success");
//         if(mtop_api.callback){
//             mtop_api.callback(_mtop.data);
//         }
//     }else{
//         console.log(data);
//     }
// }
    function getCallbackJson(data) {
        if (!data)return null;
        var f = data.indexOf("(");
        if (f < 0)return data;
        var t = data.substring(f + 1);
        return t.substring(0, t.length - 1);
    }

    /**
     * 现在的一个缺陷是如果是多页，有一页的访问失败的话，需要重新来过，后期优化
     * @param data
     * @param callback_params
     */
    function mtopLocalCallback(data, callback_params) {
        data = data ? JSON.parse(data) : null;
        !data && console.log("fmtop没查到");
        if (data && data.ret) {
            var _mtop_str = getCallbackJson(data.msg.mtopjsonp);
            var _mtop = JSON.parse(_mtop_str);
            var d = _mtop.ret;
            if (d instanceof Array && (d = d.join(",")),
                d.indexOf("TOKEN_EMPTY") > -1 || d.indexOf("TOKEN_EXOIRED") > -1 || d.indexOf("FAIL_SYS_ILLEGAL_ACCESS") > -1) {
                //令牌无效
                getMtopDetail(callback_params[0], callback_params[1], callback_params[2], true, callback_params[3]);
            } else if (d instanceof Array && (d = d.join(",")),
                d.indexOf("SUCCESS") > -1) {
                // console.log("success");
                // if(_mtop.data.hasMore && eval(_mtop.data.hasMore)){
                //     //存数据
                //     var _cards = mtop_api.cards;
                //     if(!_cards){
                //         _cards = [];
                //     }
                //     _cards = _cards.concat(_mtop.data.cards);
                //     mtop_api.cards = _cards;
                //     mtop_api.retryTimes = 0;
                //     getMtopDetail(callback_params[0], callback_params[1], callback_params[2], true, '{"itemId":"'+_mtop.data.itemId+'","cursor":"'+_mtop.data.cursor+'"}');
                // }else {
                if (callback_params[1]) {
                    // var _cards = mtop_api.cards;
                    // if(!_cards){
                    //     _cards = [];
                    // }
                    // _mtop.data.cards = _cards.concat(_mtop.data.cards);
                    var mtop_data = processingData(_mtop.data);
                    callback_params[1](mtop_data);
                }
                // }
            } else {
            }
        } else {
        }
    }

    /**
     * 处理返回的数据列表
     * @param mtop_data   返回的json数据
     */
    function processingData(mtop_data) {
        var processed_data = {};
        processed_data.total = mtop_data.questCount;
        processed_data.hasMore = mtop_data.hasMore;
        var data = mtop_data.cards;
        var answers = [];
        for (var i = 0; i < data.length; i++) {
            var answer = {};
            answer.question = data[i].question;
            answer.nick = data[i].nick;
            answer.createTime = data[i].gmtCreate;
            answer.count = data[i].count;
            answer.ansquestion_answer = [];
            var number = null;
            number = data[i];
            for (var j = 0; j < number.answers.length; j++) {
                var respond = {};
                respond.createTime = number.answers[j].createTime;
                respond.desc = number.answers[j].desc;
                respond.type = number.answers[j].eliteNum;
                respond.nick = number.answers[j].user.nick;
                answer.ansquestion_answer.push(respond);
            }
            answers.push(answer);
        }
        processed_data.answers = answers;
        return processed_data;
    }

    /**
     *
     * @param itemId
     * @param callbackFun
     * @param server_domain
     * @param fromInner
     * @param page_data
     */
    function getMtopDetail(itemId, callbackFun, server_domain, fromInner, page_data) {
        var params = {};
        params.t = (new Date).getTime();
        if (page_data) {
            params.data = page_data;
        } else {
            params.data = '{"itemId":"' + itemId + '"}';
        }
        params.sign = g(getDefaultToken() + "&" + params.t + "&12574478&" + params.data);
        var htk = h("htk")
        console.log(htk);
        if (htk) {
            params.htk = htk;
            params.htk_enc = h("htk_enc");
        }
        // var url = "/item/getMtop.json";
        var url = "/Comment/get_mtop";
        if (server_domain) {
            url = server_domain + url;
        }
        mtop_api.maxRetryTimes = mtop_api.maxRetryTimes || 5;
        if (!fromInner) {
            mtop_api.retryTimes = 0;
        }
        mtop_api.retryTimes = mtop_api.retryTimes || 0;
        mtop_api.retryTimes++;
        if (mtop_api.retryTimes > mtop_api.maxRetryTimes) {
            console.log("retry times out!");
            return;
        }
        json_Template(url, params, mtopLocalCallback, [itemId, callbackFun, server_domain, params.data]);
    }

    /**
     * 提供给外部（问大家功能）调用的方法
     * @param itemId
     * @param callbackFun
     * @param server_domain
     * @param fromInner
     */
    window.$crawlers.getMtop = function (itemId, callbackFun, pageNum, server_domain) {
        var page_data = null;
        if (!pageNum || pageNum <= 1) {
            page_data = '{"itemId":"' + itemId + '"}';
        } else {
            page_data = '{"itemId":"' + itemId + '","cursor":"' + pageNum + '"}';
        }
        getMtopDetail(itemId, callbackFun, server_domain, false, page_data);
    };
})(window);

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
        url = url + "&filter=reserve_price%5B" + param.startPrice + "%2C" + param.endPrice + "%5D";
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

    function serverToClient(data, param) {
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

    win.$crawlers.getTaobaoPageData = function (data, callBack) {
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
})(jQuery, window);


(function (window) {
    parent.isPageOne = true;
    /*获取关键词搜索分页链接*/
    function getKeyPageUrl(burl, paramBase, conditionParams, rankType, key, page, needP4P) {
        var url = burl + getUrl(paramBase);
        var rankTypeN = rankType == "renqi" ? "renqi-desc" : rankType == "sale" ? "sale-desc" : "default";
        if (page > 1) {
            url += "&data-key=s";
            var dv = (page - 1) * 44;
            var s = (page - 2) * 44;
            url += "&data-value=" + dv;
            if (s > 0) {
                url += "&s=" + s;
            }
            url += "&sort=" + rankTypeN;

            if (rankTypeN == "default" && !parent.isPageOne) {
                if (page == 2) {
                    url += "&bcoffset=" + (-2);
                    url += "&ntoffset=" + 0;
                } else {
                    url += "&bcoffset=" + (-3 * page + 4);
                    url += "&ntoffset=" + (-3 * page + 10);
                }
            } else {
                if (page == 2) {
                    url += "&bcoffset=" + 1;
                    url += "&ntoffset=" + 0;
                } else {
                    url += "&bcoffset=" + (-3 * page + 7);
                    url += "&ntoffset=" + (-3 * page + 13);
                }
            }
        } else {
            url += "&data-key=s";
            url += "&data-value=" + rankTypeN;
        }
        url += "&q=" + encodeURIComponent(key);
        /*去除无关参数传入*/
        /*var condition=getUrl(conditionParams)
         if(condition){
         url+="&"+condition
         }*/
        if (needP4P && !parent.isPageOne) {
            url += "&p4ppushleft=" + encodeURIComponent("1,48");
        }
        /*else{//添加fs=1时默认是过滤掉天猫和直通车数据展示位信息，为防止搜索到数据误差过大该处不进行过滤
         url+="&fs=1"
         }*/
        if (!parent.isPageOne) {
            url += "&s=44";
        }
        parent.isPageOne = false;
        return url;
    }

    /*该传参封装为筛选过滤 fs=1是默认过滤天猫和直通车宝贝展示信息*/
    /*function setFs(conditionParams){
     hasProperty=false
     for(x in conditionParams){
     hasProperty=true
     break;
     }
     if(hasProperty){
     conditionParams["fs"]=1
     }else{
     conditionParams["p4ppushleft"]="1,48";
     }
     }*/
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

    /*function createBaseParamsMap(){
     params={}
     params["ssid"]="s5-e";
     params["search_type"]="item";
     params["sourceId"]="tb.index";
     params["ie"]="utf8";
     params["_input_charset"]="utf-8";
     params["commend"]="all";
     var date=new Date()
     params["initiative_id"]="tbindexz_" + date.getFullYear()+(date.getMonth()+1)+date.getDate()//DateUtil.dateToStr(new Date(), DateUtil.YMd_noSpli);
     params["spm"]="a21bo." +randomNumeric(7) RandomStringUtils.randomNumeric(7) + "." +randomNumeric(4) RandomStringUtils.randomNumeric(4) + "-taobao-item.2";
     params["ajax"]="true";
     var randomInt = nextInt(301, 1500);
     params["_ksTS"]=date.getTime()System.currentTimeMillis() + "_" + randomInt;
     // params["callback"]="jsonp" + (randomInt + 1);
     params["imgfile"]="";
     params["p4plefttype"]="3,1";
     params["p4pleftnum"]="1,3";
     params["p4ppushleft"]="1,48";
     params["style"]="grid";
     params["bcoffset"]="0";
     params["ntoffset"]="0";
     params["stats_click"]="search_radio_all:1";
     params["js"]= "1";
     params["cd"]="false";
     return params
     }*/
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

    /*
     * 这个方法被重写了后面需要用的用下面重写的方法
     * 该方法有部分地方已在使用所以不要删除
     * */
    window.$crawlers.getData = function iframeQ(conditionParams, itemId, type, rankType, limit, keyArray, needP4P, callback) {

        var burl = "https://s.taobao.com/search?";
        var retf = function (obj) {
            return obj
        };
        var keyIndex = 0;
        var pageIndex = 1;
        var no = 0;
        var cpageMax = limit;
        var result = {};
        var valAry = [];
        valAry.length = keyArray.length;
        var babyitem;
        var cAjax;
        var responses = [];
        var stop = false;
        var nodata = true;
        var domain = parent.domain;

        function sendData(code) {
            var cr;
            if (code == 404) {
                cr = get404()
            }
            if (code == 500) {
                cr = get500()
            }
            if (code == 200) {
                cr = get200()
            }
            callback(cr)
        }

        function get200() {
            var r = {item: babyitem, result: {list: valAry, resultCode: 0}, responses: responses};
            if (nodata) {
                r.result.list = null;
                r.result.resultCode = 404
            } else {
                var title = null;
                var storeName = null;
                var picUrl = null;
                var storeId = null;
                for (var i = 0; i < valAry.length; i++) {
                    var dataOne = valAry[i];
                    if (!Boolean(title) && Boolean(dataOne.title)) {
                        title = dataOne.title.replace(/<span class=H>/g, "").replace(/<\/span>/g, "").replace(/\s/g, "");
                    }
                    if (!Boolean(storeId) && Boolean(dataOne.storeId)) {
                        storeId = dataOne.storeId;
                    }
                    if (!Boolean(picUrl) && Boolean(dataOne.picUrl)) {
                        picUrl = dataOne.picUrl;
                    }
                    if (!Boolean(storeName) && Boolean(dataOne.storeName)) {
                        storeName = dataOne.storeName;
                    }
                    if (title && storeId && picUrl && storeName) {
                        break;
                    }
                }
                for (var i = 0; i < valAry.length; i++) {
                    var dataOne = valAry[i];
                    if (Boolean(title) && Boolean(dataOne.title)) {
                        dataOne.title = title;
                    }
                    if (Boolean(storeId) && Boolean(dataOne.storeId)) {
                        dataOne.storeId = storeId;
                    }
                    if (Boolean(picUrl) && Boolean(dataOne.picUrl)) {
                        dataOne.picUrl = picUrl;
                    }
                    if (Boolean(storeName) && Boolean(dataOne.storeName)) {
                        dataOne.storeName = storeName;
                    }
                }
            }
            return r;
        }

        function get404() {
            return {item: babyitem, result: {}};
        }

        function get500() {
            return {item: babyitem, result: {resultCode: 500}};
        }

        getOneKeyPageData();
        // TODO
        function getOneKeyPageData() {
            if (stop) {
                return
            }
            var paramBase = createBaseParamsMap()
            var url = getKeyPageUrl(burl, paramBase, conditionParams, rankType, keyArray[keyIndex], pageIndex, needP4P);
            //console.log(url)
            var fnName = paramBase.callback;
            window[fnName] = retf;
            cAjax = $.ajax({
                url: url,
                dataType: "jsonp",
                jsonpCallback: fnName,
                success: function (rst) {
                    deleteFn(fnName);
                    /*console.log(JSON.parse(rst.mods.p4p.data.p4pdata))
                     console.log(rst)*/
                    doresult(rst)
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    if (stop) {
                        return;
                    }
                    deleteFn(fnName);
                    sendData(500);
                }
            })
        }

        function deleteFn(fnName) {
            try {
                delete window[fnName];
            } catch (obj) {
            }
        }

        /*function doresult(rst){
         if(stop){
         return
         }
         if(type=="taobao"){
         doTaobaoResult(rst)
         }
         if(type=="p4p"){
         doP4pResult(rst)
         }
         }*/
        /*淘宝宝贝*/
        function nofind() {
            var rank = {/*pageIndex:pageIndex,index:i+1,*/rank: -2, location: "MAIN"};
            var ranks = {};
            ranks[rankType] = rank;
            turnKey({
                index: keyIndex + 1,
                itemId: itemId,
                /*title:babyitem.title,
                 storeName:babyitem.wangwangId,
                 picUrl:babyitem.picUrl,*/
                type: "TAOBAO",
                keyword: keyArray[keyIndex],
                loction: "MAIN",
                ranks: ranks
            })
        }

        function nofindP4P() {
            var rank = {/*pageIndex:pageIndex,index:i+1,*/index: -2};
            turnKey({
                index: keyIndex + 1,
                itemId: itemId,
                /*title:babyitem.title,
                 storeName:babyitem.wangwangId,
                 picUrl:babyitem.picUrl,*/
                type: "P4P",
                keyword: keyArray[keyIndex],
                rank: rank
            })
        }

        function doresult(rst) {
            if (stop) {
                return
            }
            for (var w = 0; w < 1; w++) {
                if (pageIndex == 1) {
                    if (!rst || !rst.mods || !rst.mods.itemlist || !rst.mods.itemlist.data) {
                        nofind();
                        break;
                    }
                    //console.log(rst)
                    var right = Boolean(rst.mods.pager.data && (!rst.mods.tips.data));
                    //console.log(right)
                    var samilar = Boolean(rst.mods.tips && rst.mods.tips.data && rst.mods.tips.data.recLinks.length == 0);
                    //console.log(samilar)
                    if (!(right || samilar)) {
                        nofind();
                        break;
                    }
                    if (rst.mods.pager.data) {
                        cpageMax = rst.mods.pager.data.totalPage < limit ? rst.mods.pager.data.totalPage : limit
                    } else {
                        cpageMax = 1
                    }
                }
                if (type == "taobao") {
                    paraTaobao(rst)
                } else if (type == "p4p") {
                    paraP4P(rst)
                }

            }
            pageIndex += 1;
            if (pageIndex > cpageMax) {
                keyIndex += 1;
                pageIndex = 1;
                no = 0;
                cpageMax = limit
            }
            if (keyIndex >= keyArray.length) {
                sendData(200);
                return;
            }

            setTimeout(getOneKeyPageData, 10);
        }

        /*直通车数据处理*/
        function paraP4P(rst) {
            var iAry = rst.mods.itemlist.data.auctions;
            var notfind = true;
            var pageI = 0;
            for (var i = 0; i < iAry.length; i++) {
                var item = iAry[i];
                if (!item.p4p) {
                    continue;
                }
                pageI++;
                no++;
                //console.log("第"+pageIndex+"页，第"+(i+1)+"个，id="+iAry[i].nid+",title="+item.title)
                /*main 主展示块直通车数据处理*/
                if (item.nid == itemId && (item.p4p)) {
                    var rank = {pageIndex: pageIndex, index: pageI, rank: no, location: "MAIN"};
                    responses[keyIndex] = encodeURIComponent(JSON.stringify(rst));
                    nodata = false;
                    turnKey({
                        itemId: itemId,
                        title: item.title,
                        storeId: item.user_id,
                        storeName: item.nick,
                        p4p: true,
                        tmall: false,
                        picUrl: item.pic_url,
                        type: "P4P",
                        keyword: keyArray[keyIndex],
                        index: keyIndex + 1,
                        loction: "MAIN",
                        rank: rank
                    });
                    notfind = false;
                    return;
                }

            }
            var p4pdata = JSON.parse(rst.mods.p4p.data.p4pdata);
            pageI = 0;
            /*right 右部直通车数据处理*/
            if (p4pdata && p4pdata.right && p4pdata.right.data && p4pdata.right.data.ds1) {
                var rightData = p4pdata.right.data.ds1;
                for (var i = 0; i < rightData.length; i++) {
                    pageI++;
                    no++;
                    var item = rightData[i];
                    if (itemId == item.RESOURCEID) {
                        var rank = {pageIndex: pageIndex, index: pageI, rank: no, location: "RIGHT"};
                        responses[keyIndex] = encodeURIComponent(JSON.stringify(rst));
                        nodata = false;
                        turnKey({
                            itemId: itemId,
                            title: item.ADGTITLE,
                            storeId: item.SELLERID,
                            storeName: item.WANGWANGID,
                            p4p: true,
                            tmall: false,
                            picUrl: item.TBGOODSLINK,
                            type: "P4P",
                            keyword: keyArray[keyIndex],
                            index: keyIndex + 1,
                            loction: "RIGHT",
                            rank: rank
                        });
                        notfind = false;
                        return;
                    }
                }
            }
            pageI = 0;
            /*bottom  底部块直通车数据处理*/
            if (p4pdata && p4pdata.bottom && p4pdata.bottom.data && p4pdata.bottom.data.ds1) {
                var rightData = p4pdata.bottom.data.ds1;
                for (var i = 0; i < rightData.length; i++) {
                    pageI++;
                    no++;
                    var item = rightData[i];
                    if (itemId == item.RESOURCEID) {
                        var rank = {pageIndex: pageIndex, index: pageI, rank: no, location: "BOTTOM"};
                        responses[keyIndex] = encodeURIComponent(JSON.stringify(rst));
                        nodata = false;
                        turnKey({
                            itemId: itemId,
                            title: item.ADGTITLE,
                            storeId: item.SELLERID,
                            storeName: item.WANGWANGID,
                            p4p: true,
                            tmall: false,
                            picUrl: item.TBGOODSLINK,
                            type: "P4P",
                            keyword: keyArray[keyIndex],
                            index: keyIndex + 1,
                            loction: "BOTTOM",
                            rank: rank
                        });
                        notfind = false;
                        return;
                    }
                }
            }
            if (pageIndex == cpageMax && notfind) {
                nofindP4P()
            }
        }

        /*淘宝数据处理*/
        function paraTaobao(rst) {
            var iAry = rst.mods.itemlist.data.auctions;
            var notfind = true;
            for (var i = 0; i < iAry.length; i++) {
                no++;
                var item = iAry[i];
                // console.log("第"+pageIndex+"页，第"+(i+1)+"个，id="+iAry[i].nid+",title="+item.title)
                if (item.nid == itemId /*&&(!item.p4p)*/) {
                    babyitem = item;
                    var ranks = {};
                    var rank = {pageIndex: pageIndex, index: i + 1, rank: no, location: "MAIN"};
                    ranks[rankType] = rank;
                    responses[keyIndex] = encodeURIComponent(JSON.stringify(rst));
                    nodata = false;
                    turnKey({
                        itemId: itemId,
                        title: item.title,
                        storeId: item.user_id,
                        storeName: item.nick,
                        // p4p:false,
                        // tmall:false,
                        picUrl: item.pic_url,
                        type: "TAOBAO",
                        keyword: keyArray[keyIndex],
                        index: keyIndex + 1,
                        loction: "MAIN",
                        ranks: ranks
                    });
                    notfind = false;
                    break;
                }

            }
            if (pageIndex == cpageMax && notfind) {
                nofind();
            }
        }

        function turnKey(vale) {
            valAry[keyIndex] = vale;
            keyIndex += 1;
            pageIndex = 0;
            cpageMax = limit;
            no = 0;
        }

        function stopAjax() {
            stop = true;
            if (cAjax) {
                cAjax.abort()
            }

        }

        return stopAjax

    };
})(window);


(function (window) {
    /**
     * Created by Administrator on 2016/12/17.
     */
    var randNumber = Math.floor(Math.random() * 1000);
    var skuObj = {};
    var commentObj = {}
    var processed_data = {};
    var skuMap = {
        //评论sku
        "rateList": {
            //淘宝宝贝
            taobao_url: "https://rate.taobao.com/feedRateList.htm",
            //天猫宝贝
            tmall_url: "https://rate.tmall.com/list_detail_rate_tab.htm",
            /*taobao_callback: "jsonp_tbcrate_SKU",
             tmall_callback: "jsonp_tmallcrate_SKU"*/
        }
    };
    var routeMap = {
        //用户评价
        "userComments": {
            url: "https://rate.taobao.com/feedRateList.htm",
            tmall_url: "https://rate.tmall.com/list_detail_rate_tab.htm",
            taobao_callback: "jsonp_tbcrate_reviews_list",
            tmall_calllback: "jsonp_tmallcrate_review_list"
        }
    };

    /**
     * Generating random number ：产生随机数
     * */
    function rand() {
        randNumber = randNumber + Math.floor(Math.random() * 150);
        return randNumber;
    }

    /**
     * timeSramp：时间戳
     */
    function timestamp() {
        var timestamp = new Date().getTime();
        return timestamp;
    }

    /**
     * taobao用户评论回调函数
     * @param data
     */
    function jsonp_tbcrate_reviews_list(data) {
        var processed_data = {};
        processed_data.total = data.total;
        var comments = [];
        if (routeMap.userComments.defaultParams.rateType == "1") {
            //优质好评
            $.each(data.comments, function (index, obj) {
                var comment = {};
                comment.user_nick = obj.user.nick;
                comment.user_displayRatePic = obj.user.displayRatePic;
                comment.content = obj.content;
                comment.sku = obj.auction.sku;
                comment.date = obj.date;
                comment.useful = obj.useful;
                if (obj.append) {
                    var appendComments = {};
                    appendComments.content = obj.append.content;
                    appendComments.days = obj.append.dayAfterConfirm;
                    comment.append = appendComments;
                }
                comments.push(comment);
            });
        } else if (routeMap.userComments.defaultParams.rateType == "3") {
            //图片好评
            $.each(data.comments, function (index, obj) {
                var comment = {};
                comment.user_nick = obj.user.nick;
                comment.user_displayRatePic = obj.user.displayRatePic;
                comment.content = obj.content;
                comment.sku = obj.auction.sku;
                comment.date = obj.date;
                comment.useful = obj.useful;
                if (obj.photos) {
                    var taobao_photo = [];
                    $.each(obj.photos, function (i, j) {
                        var taobao_photos = {};
                        taobao_photos.url = j.url;
                        taobao_photo.push(taobao_photos);
                    });
                    comment.photos = taobao_photo;
                }
                if (obj.append) {
                    var appendComments = {};
                    var photo = [];
                    $.each(obj.append.photos, function (a, b) {
                        var photos = {};
                        photos.url = b.url;
                        photo.push(photos);
                    });
                    appendComments.content = obj.append.content;
                    appendComments.days = obj.append.dayAfterConfirm;
                    appendComments.photos = photo;
                    comment.append = appendComments;
                }
                comments.push(comment);
            });
        }
        commentObj.change = eval(processed_data.total);
        commentObj.page = parseInt(commentObj.change / parseInt(routeMap.userComments.defaultParams.pageSize));
        if (commentObj.change % parseInt(routeMap.userComments.defaultParams.pageSize) != 0) {
            commentObj.page++;
        }
        var isContinue = false;
        if (routeMap.userComments.defaultParams.currentPage <= commentObj.page) {
            isContinue = true;
        }
        else if (data.total == "0") {
            isContinue = true;
        }
        if (isContinue) {
            processed_data.comments = comments;
            routeMap.userComments.local_callback(processed_data);
        } else {
            commentObj.pageNum = commentObj.page;
            commentObj.params = {
                auctionNumId: routeMap.userComments.defaultParams.itemId,
                currentPageNum: commentObj.pageNum,
                orderType: "sort_weight",
                rateType: routeMap.userComments.defaultParams.rateType,
                folded: "0",
                pageSize: routeMap.userComments.defaultParams.pageSize
            }
            jsonp_Template(routeMap.userComments.taobao_url, commentObj.params, routeMap.userComments.taobao_callback);
        }
    }

    /**
     *天猫宝贝用户评论 回调函数
     * @param data
     */
    function jsonp_tmallcrate_review_list(data) {
        var datao = data.rateDetail;
        var processed_data = {};
        processed_data.total = datao.ratePaginator.items;
        var comments = [];
        if (routeMap.userComments.defaultParams.rateType == "1") {
            //优质好评
            $.each(datao.rateList, function (index, obj) {
                var comment = {};
                comment.user_nick = obj.displayUserNick;
                comment.user_displayRatePic = obj.tmallSweetPic;
                comment.content = obj.rateContent;
                comment.sku = obj.auctionSku;
                comment.date = obj.rateDate;
                comment.useful = obj.displayRateSum;
                if (obj.appendComment) {
                    var appendComments = {};
                    appendComments.content = obj.appendComment.content;
                    appendComments.days = obj.appendComment.days;
                    var photos = [];
                    if (obj.appendComment.pics.length != 0) {
                        for (var x = 0; x < obj.appendComment.pics.length; x++) {
                            var photo = {};
                            photo.url = obj.appendComment.pics[x];
                            photos.push(photo);
                        }
                        appendComments.photos = photos;
                    }
                    comment.append = appendComments;
                }
                comments.push(comment);
            });
        } else if (routeMap.userComments.defaultParams.rateType == "3") {
            //图片好评
            $.each(datao.rateList, function (index, obj) {
                var comment = {};
                comment.user_nick = obj.displayUserNick;
                comment.user_displayRatePic = obj.tmallSweetPic;
                comment.content = obj.rateContent;
                comment.sku = obj.auctionSku;
                comment.date = obj.rateDate;
                comment.useful = obj.displayRateSum;
                var pics = [];
                for (var i = 0; i < obj.pics.length; i++) {
                    var tuPian = {};
                    tuPian.url = obj.pics[i];
                    pics.push(tuPian);
                }
                comment.photos = pics;
                if (obj.appendComment) {
                    var appendComments = {};
                    appendComments.content = obj.appendComment.content;
                    appendComments.days = obj.appendComment.days;
                    var photos = [];
                    if (obj.appendComment.pics.length != 0) {
                        for (var x = 0; x < obj.appendComment.pics.length; x++) {
                            var photo = {};
                            photo.url = obj.appendComment.pics[x];
                            photos.push(photo);
                        }
                        appendComments.photos = photos;
                    }
                    comment.append = appendComments;
                }
                comments.push(comment);
            });
        }
        commentObj.change = eval(processed_data.total);
        commentObj.page = parseInt(commentObj.change / parseInt(routeMap.userComments.defaultParams.pageSize));
        if (commentObj.change % parseInt(routeMap.userComments.defaultParams.pageSize) != 0) {
            commentObj.page++;
        }
        var isContinue = false;
        if (routeMap.userComments.defaultParams.currentPage <= commentObj.page) {
            isContinue = true;
        }
        else if (datao.ratePaginator.items == "0") {
            isContinue = true;
        }
        if (isContinue) {
            processed_data.comments = comments;
            routeMap.userComments.local_callback(processed_data);
        } else {
            commentObj.pageNum = commentObj.page;
            if (routeMap.userComments.defaultParams.rateType == "1") {
                commentObj.params = {
                    itemId: routeMap.userComments.defaultParams.itemId,
                    sellerId: routeMap.userComments.defaultParams.sellerId,
                    currentPage: commentObj.pageNum,
                    order: "3",
                    picture: "0",
                    content: "0", /*needFold:"0",*/
                    pageSize: routeMap.userComments.defaultParams.pageSize
                }
            } else {
                commentObj.params = {
                    itemId: routeMap.userComments.defaultParams.itemId,
                    sellerId: routeMap.userComments.defaultParams.sellerId,
                    currentPage: commentObj.pageNum,
                    order: "3",
                    picture: "1",
                    content: "0", /*needFold:"0",*/
                    pageSize: routeMap.userComments.defaultParams.pageSize
                }
            }
            jsonp_Template(routeMap.userComments.tmall_url, commentObj.params, routeMap.userComments.tmall_callback);
        }
    }

    /**
     * SKU_淘宝宝贝  回调函数
     * @param data
     */
    function jsonp_tbcrate_SKU(data, deferred) {
        if (!processed_data.total) {
            processed_data.total = data.total;  //全部的
            processed_data.opinion = false;
        }
        var comments = [];
        if (data.comments != null) {
            $.each(data.comments, function (index, obj) {
                var comment = {};
                if (obj.auction.sku != "") {
                    processed_data.opinion = true;
                    comment.sku = obj.auction.sku;
                    comments.push(comment);
                }
            });
        }
        if (!processed_data.comments) {
            processed_data.comments = [];
        }
        processed_data.comments = processed_data.comments.concat(comments);
        skuObj.change = eval(processed_data.total);
        skuObj.page = parseInt(skuObj.change / 20);
        if (skuObj.change % 20 != 0) {
            skuObj.page++;
        }
        skuObj.curPage++;
        var isContinue = false;
        if (skuMap.rateList.pageNums && skuMap.rateList.pageNums > 0) {
            if (skuObj.curPage <= skuObj.page && skuObj.curPage <= skuMap.rateList.pageNums) {
                isContinue = true;
            }
        } else {
            if (skuObj.curPage <= skuObj.page) {
                isContinue = true;
            }
        }
        if (isContinue) {
            skuObj.pageNum = skuObj.curPage;
            skuObj.params = {
                auctionNumId: skuMap.rateList.defaultParams.itemId,
                currentPageNum: skuObj.pageNum/*,folded:"0"*/
            };
            deferred.resolve(skuMap.rateList.taobao_url, skuObj.params, skuMap.rateList.taobao_callback);
        }
        else {
            if (processed_data.opinion == true) {
                processed_data.commentsSum = handlerData(processed_data.comments);
                processed_data.commentsDetail = handlerSkuDetail_taobao(processed_data.comments);
            }
            delete processed_data.comments;
            skuMap.rateList.local_callback(processed_data);
            deferred.reject();
        }
    }

    /**
     * SKU_天猫宝贝   回调函数
     *
     */
    function jsonp_tmallcrate_SKU(data, deferred) {
        var datao = data.rateDetail;
        if (!processed_data.total) {
            processed_data.total = datao.ratePaginator.items;  //全部的
            processed_data.opinion = false;
        }
        var comments = [];
        if (datao.rateList != null) {
            $.each(datao.rateList, function (index, obj) {
                var comment = {};
                if (obj.auctionSku != "") {
                    processed_data.opinion = true;
                    comment.sku = obj.auctionSku;
                    comments.push(comment);
                }
            });
        }

        if (!processed_data.comments) {
            processed_data.comments = [];
        }
        processed_data.comments = processed_data.comments.concat(comments);
        skuObj.change = eval(processed_data.total);
        skuObj.page = parseInt(skuObj.change / 20);
        if (skuObj.change % 20 != 0) {
            skuObj.page++;
        }
        skuObj.curPage++;
        if (skuObj.page > 99) {
            skuObj.page = 99;
        }
        var isContinue = false;
        if (skuMap.rateList.pageNums && skuMap.rateList.pageNums > 0) {
            if (skuObj.curPage <= skuObj.page && skuObj.curPage <= skuMap.rateList.pageNums) {
                isContinue = true;
            }
        } else {
            if (skuObj.curPage <= skuObj.page) {
                isContinue = true;
            }
        }
        if (isContinue) {
            skuObj.pageNum = skuObj.curPage;
            skuObj.params = $.extend(skuMap.rateList.defaultParams, {content: "0"});
            skuObj.params = $.extend(skuMap.rateList.defaultParams, {append: "0"});
            skuObj.params = $.extend(skuMap.rateList.defaultParams, {__ksTS: timestamp() + "_" + rand()});
            skuObj.params = $.extend(skuMap.rateList.defaultParams, {currentPage: skuObj.pageNum});
            deferred.resolve(skuMap.rateList.tmall_url, skuObj.params, skuMap.rateList.tmall_callback);
        }
        else {
            if (processed_data.opinion == true) {
                processed_data.commentsSum = handlerData(processed_data.comments);
                processed_data.commentsDetail = handlerSkuDetail_tmall(processed_data.comments);

            }
            delete processed_data.comments;
            skuMap.rateList.local_callback(processed_data);
            deferred.reject();
        }
    }

    /**
     *  处理SKU不同属性的总个数
     * @param comments
     * @returns {{}}
     */
    function handlerData(comments) {
        var _comments = {};
        $.each(comments, function (index, comment) {
            var _sku = comment.sku;
            var _nums = _comments[_sku];
            if (!_nums) {
                _nums = 0;
            }
            _nums++;
            _comments[_sku] = _nums;
        });
        return _comments;
        // var comm_arrays = [];
        // $.each(_comments, function (key, value) {
        //     comm_arrays.push({sku_key:key, sku_value:value});
        // });
        // comm_arrays.sort(skuSort);
        // return comm_arrays;
    }

    /*function skuSort(a, b) {
     if(!a && !b){
     return 0;
     }
     if(!a){
     return 1;
     }
     if(!b){
     return -1;
     }
     return b.sku_value - a.sku_value;
     }*/
    /**
     * 处理taobao_SKU单独属性分开计算的方法
     * @param comments
     * @returns {*}
     */
    function handlerSkuDetail_taobao(comments) {
        var _comments = null;
        var empty_sku_nums = 0;
        $.each(comments, function (index, comment) {
            var _sku = comment.sku;
            if (!_sku || "" == _sku.trim()) {
                empty_sku_nums++;
                return true;
            }
            if (!_comments) {
                _comments = [];
                var _sku_types = _sku.split("&nbsp;&nbsp");
                $.each(_sku_types, function (index, sku_d) {
                    _comments.push({});
                });
            }
            var _sku_detail = _sku.split("&nbsp;&nbsp");
            $.each(_sku_detail, function (index, sku_d) {
                var _t_detail = _comments[index];
                var _num_d = _t_detail[sku_d];
                if (!_num_d) {
                    _num_d = 0;
                }
                _num_d++;
                _t_detail[sku_d] = _num_d;
            });
        });
        if (empty_sku_nums > 0) {
            $.each(_comments, function (index, comment) {
                comment[""] = empty_sku_nums;
            });
        }
        return _comments;
    }

    /**
     * 处理tmall_SKU单独属性分开计算的方法
     * @param comments
     * @returns {*}
     */
    function handlerSkuDetail_tmall(comments) {
        var _comments = {};
        $.each(comments, function (index, comment) {
            var _sku = comment.sku;
            var _sku_detail = _sku.split(";");
            $.each(_sku_detail, function (index, sku_d) {
                var sd = sku_d.split(":");
                var subSd = _comments[sd[0]];
                if (!subSd) {
                    subSd = {};
                }
                var _num_d = subSd[sku_d];
                if (!_num_d) {
                    _num_d = 0;
                }
                _num_d++;
                subSd[sku_d] = _num_d;
                _comments[sd[0]] = subSd;
            });
        })
        var result = [];
        $.each(_comments, function (key, val) {
            // var o = {};
            // o[key] = val;
            // var sd = key.split(":");
            // var a =
            result.push(val);
        });

        return result;
    }

    /**
     *  用户评论方法（优质好评和图片好评）本方法只针对taobao
     * @param itemId
     * @param userId
     * @param currentPage
     * @param rateType  为空的话 全部 、 好评是 1 、图片是 3、 追评是2、 中评是0、 差评是-1
     * @param callbackFun
     *
     */
    function userComments(itemId, sellerId, currentPage, pageSize, rateType, channel, callbackFun) {
        commentObj.pageNum = 1;
        commentObj.curPage = 1;
        commentObj.params = null;
        commentObj.data = null;
        registCallback("userComments", callbackFun);
        routeMap.userComments.defaultParams = {
            itemId: itemId,
            sellerId: sellerId,
            currentPage: currentPage,
            rateType: rateType,
            pageSize: pageSize
        };
        if ("taobao" == channel) {
            commentObj.params = {
                auctionNumId: itemId,
                currentPageNum: currentPage,
                orderType: "sort_weight",
                rateType: rateType,
                folded: "0",
                pageSize: pageSize
            }
            jsonp_Template(routeMap.userComments.url, commentObj.params, routeMap.userComments.taobao_callback);
        } else if ("tmall" == channel) {
            if (rateType == 1) {
                //needFold:"0",该项为天猫隐藏评论内容，如果去掉则展示隐藏评论
                commentObj.params = {
                    itemId: itemId,
                    sellerId: sellerId,
                    currentPage: currentPage,
                    order: "3",
                    picture: "0",
                    content: "0", /*needFold:"0",*/
                    pageSize: pageSize
                }
            } else if (rateType == 3) {
                //needFold:"0",该项为天猫隐藏评论内容，如果去掉则展示隐藏评论
                commentObj.params = {
                    itemId: itemId,
                    sellerId: sellerId,
                    currentPage: currentPage,
                    order: "3",
                    picture: "1",
                    content: "0", /*needFold:"0",*/
                    pageSize: pageSize
                }
            }
            jsonp_Template(routeMap.userComments.tmall_url, commentObj.params, routeMap.userComments.tmall_calllback);
        } else {
            throw"搜索渠道错误！";
        }

    }

    /**
     *  宝贝  SKU查询方法封装
     * @param itemId  商品Id
     * @pageNums  获取页数
     * @sellerId   天猫商品要传改数据
     * @channel     taobao  or tmall 判断
     *
     * @param callbackFun    回调
     */

    function commentsSKU(itemId, callbackFun, pageNums, channel, sellerId) {
        skuObj.pageNum = 1;
        skuObj.curPage = 1;
        skuObj.params = null;
        skuObj.data = null;
        regist_Callback("rateList", callbackFun, pageNums);
        // console.log(callbackFun.prototype.constructor.name);
        //目前的页面是没有同时查找2个宝贝的请求
        //如果浏览器有同时查找2个不同渠道的宝贝将会出现冲突
        skuMap.rateList.defaultParams = {itemId: itemId, sellerId: sellerId};
        if ("taobao" == channel) {
            skuObj.params = {auctionNumId: itemId, currentPageNum: skuObj.pageNum/*,folded:"0"*/};
            /*skuMap.rateList.url = skuMap.rateList.taobao_url;*/
            return jsonp_Template_sku(skuMap.rateList.taobao_url, skuObj.params, channel);

        } else if ("tmall" == channel) {
            rand();
            skuObj.params = {
                itemId: itemId,
                sellerId: sellerId,
                _ksTS: timestamp() + "_" + (randNumber - 1),
                append: "0",
                content: "0",
                currentPage: skuObj.pageNum,
                order: "3",
                pageSize: "10"
            };
            /* skuMap.rateList.url = skuMap.rateList.tmall_url;*/
            return jsonp_Template_sku(skuMap.rateList.tmall_url, skuObj.params, channel);

        } else {
            throw "搜索渠道错误！";

        }

    }

    /**
     * SKU回调函数判断回调函数是否一致
     * @param function_name
     * @param callbackFun
     */
    function regist_Callback(function_name, callbackFun, pageNums) {

        if (callbackFun) {
            if (skuMap[function_name].local_callback) {
                if (skuMap[function_name].local_callback.prototype.constructor.name != callbackFun.prototype.constructor.name) {
                    throw "回调函数不一致！";
                }
            } else {
                skuMap[function_name].local_callback = callbackFun;
            }
        }
        if (pageNums) {
            if (skuMap[function_name].pageNums) {
                if (skuMap[function_name].pageNums != pageNums) {
                    throw "获取页数不一致！";
                }
            } else {
                skuMap[function_name].pageNums = pageNums;
            }
        }
    }

    /**
     *  用户评论判断回调函数是否一致
     * */
    function registCallback(function_name, callbackFun) {
        if (callbackFun) {
            // if(routeMap[function_name].local_callback) {
            //     if (routeMap[function_name].local_callback.prototype.constructor.name != callbackFun.prototype.constructor.name) {
            //         throw "回调函数不一致！";
            //     }
            // }else {
            routeMap[function_name].local_callback = callbackFun;
            // }
        }
    }

    /**
     *  Good praise and graphic
     * @param url
     * @param params
     * @param callback_fun
     */
    function jsonp_Template(url, params, callback_fun) {
        $.ajax({
            // async:false,
            cache: true,
            url: url + "?_ksTS=" + timestamp() + "_" + rand(),
            type: "GET",
            dataType: 'jsonp',
            jsonpCallback: callback_fun,
            data: params,
            timeout: 30000,
            error: function (xhr) {
                console.log("请求出错(请检查相关度网络状况.)");
                console.log(xhr);
                console.log(xhr.toString());
            }
        });
    }

    /**
     * @param jsonp_url     jsonp数据的链接地址
     * @param params        参数传递的对象
     * @param callback_fun   回调函数
     */
    function jsonp_Template_sku(jsonp_url, params) {
        var deferred = $.Deferred();
        var promise = deferred.promise();

        $.ajax({
            cache: true,
            url: jsonp_url,
            type: "GET",
            dataType: 'jsonp',
            jsonpCallback: "jsonp" + randNumber,
            data: params,
            timeout: 30000,
            success: function (data) {
                if (data.rgv587_flag && data.rgv587_flag == 'sm') {
                    $win.alert('因淘宝对爬取评价限制IP比较厉害，因此造成查询速度变慢甚至经常失败。如若查询不到结果，请半小时后再试。 我们会尽快解决这个问题。');
                    deferred.reject();
                } else {
                    if (jsonp_url == "https://rate.taobao.com/feedRateList.htm") {
                        jsonp_tbcrate_SKU(data, deferred);
                        console.log(data);
                    } else {
                        jsonp_tmallcrate_SKU(data, deferred);
                        console.log(data);
                    }
                }
            },
            error: function (xhr) {
                console.log("请求出错(请检查相关度网络状况.)");
                console.log(xhr.toString());
                deferred.reject();
            }
        });

        return promise.then(jsonp_Template_sku);

    }


    window.$crawlers.commentsSKU = commentsSKU;
    window.$crawlers.userComments = userComments;
})(window);

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

    window.$crawlers.store_ext_info = store_ext_info;
    window.$crawlers.store_ext_info1 = store_ext_info1;
})(window);