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
    window.getMtop = function(itemId, callbackFun, pageNum, server_domain) {
        var page_data = null;
        if (!pageNum || pageNum <= 1) {
            page_data = '{"itemId":"' + itemId + '"}';
        } else {
            page_data = '{"itemId":"' + itemId + '","cursor":"' + pageNum + '"}';
        }
        getMtopDetail(itemId, callbackFun, server_domain, false, page_data);
    };
})(window);