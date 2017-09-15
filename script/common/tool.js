/**
 * Created by SNAKE on 2017/6/17.
 */
define([], function() {
    return {
        //url参数转 obj
        urlParamToJson: function(url) { //url参数转json对象
            var urlObject = {};
            if (/\?/.test(url)) {
                var urlString = url.substring(url.indexOf("?") + 1);
                var urlArray = urlString.split("&");
                for (var i = 0, len = urlArray.length; i < len; i++) {
                    var urlItem = urlArray[i];
                    var item = urlItem.split("=");
                    urlObject[item[0]] = item[1];
                }
                return urlObject;
            }
        },
        //获取url参数
        getUrlParam: function(name) { //
            //构造一个含有目标参数的正则表达式对象
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            //匹配目标参数
            var r = window.location.search.substr(1).match(reg);
            //返回参数值
            if (r != null) return unescape(r[2]);
            return null;
        },
        setTimeInfo: function setTimeInfo(time) {
            var taday = new Date();
            if (typeof time == "string" && time.indexOf("CST") != -1) {
                var dateArr = time.split(" ");
                var endTimeGTMStr = dateArr[0] + " " + dateArr[1] + " " + dateArr[2] + " " + dateArr[5] + " " + dateArr[3] + " GMT+0800";
                var endTime = new Date(endTimeGTMStr);
            } else {
                var endTime = new Date(time);
            }

            var mistiming = endTime.getTime() - taday.getTime();

            var days = parseInt(mistiming / (24 * 3600 * 1000)); //剩余天数

            var leave1 = mistiming % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
            var hours = parseInt(leave1 / (3600 * 1000)); //剩余小时

            var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
            var minutes = parseInt(leave2 / (60 * 1000)); //计算相差分钟数

            var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
            var seconds = Math.round(leave3 / 1000); //计算相差秒数
            return days + "天" + hours + "时" + minutes + "分";
        },
        formatDate: function formatDate(date, format) { //格式化日期,
            var paddNum = function(num) {
                num += "";
                return num.replace(/^(\d)$/, "0$1");
            };
            //指定格式字符
            var cfg = {
                yyyy: date.getFullYear(), //年 : 4位
                yy: date.getFullYear().toString().substring(2), //年 : 2位
                M: date.getMonth() + 1, //月 : 如果1位的时候不补0
                MM: paddNum(date.getMonth() + 1), //月 : 如果1位的时候补0
                d: date.getDate(), //日 : 如果1位的时候不补0
                dd: paddNum(date.getDate()), //日 : 如果1位的时候补0
                hh: paddNum(date.getHours()), //时: 如果1位的时候补0
                mm: paddNum(date.getMinutes()), //分: 如果1位的时候补0
                ss: paddNum(date.getSeconds()) //秒 : 如果1位的时候补0
            };
            format || (format = "yyyy-MM-dd hh:mm:ss");
            return format.replace(/([a-z])(\1)*/ig, function(m) {
                return cfg[m];
            });
        },
        //验证数字
        regExpNum: function checkNum(data) {
            if (data.length == 0) {
                return true;
            }
            var RegExp = /^[1-9]+.?[0-9]*$/;
            return RegExp.test(data);
        },
        //验证价格
        regExpPrice: function regExpPrice(price) {
            //000:错 0:对 0.:错 0.0:对 050:错 00050.12:错 70.1:对 70.11:对 70.111:错 500:正确 -1:错
            var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
            if (reg.test(price)) {
                return {
                    status: true,
                    msg: "价格正确！"
                };
            } else {
                return {
                    status: false,
                    msg: "不能出现非数字且只能有两位小数！"
                };
            }
        },
        //加减乘除
        floatAdd: function(arg1, arg2) {
            var r1, r2, m;
            try {
                r1 = arg1.toString().split(".")[1].length
            } catch (e) {
                r1 = 0
            }
            try {
                r2 = arg2.toString().split(".")[1].length
            } catch (e) {
                r2 = 0
            }
            m = Math.pow(10, Math.max(r1, r2));
            return (arg1 * m + arg2 * m) / m;
        },
        floatSub: function(arg1, arg2) {
            var r1, r2, m, n;
            try {
                r1 = arg1.toString().split(".")[1].length
            } catch (e) {
                r1 = 0
            }
            try {
                r2 = arg2.toString().split(".")[1].length
            } catch (e) {
                r2 = 0
            }
            m = Math.pow(10, Math.max(r1, r2));
            //动态控制精度长度
            n = (r1 >= r2) ? r1 : r2;
            return ((arg1 * m - arg2 * m) / m).toFixed(n);
        },
        floatMul: function(arg1, arg2) {
            var m = 0,
                s1 = arg1.toString(),
                s2 = arg2.toString();
            try {
                m += s1.split(".")[1].length
            } catch (e) {}
            try {
                m += s2.split(".")[1].length
            } catch (e) {}
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
        },
        floatDiv: function(arg1, arg2) {
            var t1 = 0,
                t2 = 0,
                r1, r2;
            try {
                t1 = arg1.toString().split(".")[1].length
            } catch (e) {}
            try {
                t2 = arg2.toString().split(".")[1].length
            } catch (e) {}

            r1 = Number(arg1.toString().replace(".", ""));

            r2 = Number(arg2.toString().replace(".", ""));

            return this.floatMul((r1 / r2), Math.pow(10, t2 - t1));
        },
        // 是否是ie -1:不是 6/7/8/9/10/11/edge:对应浏览器版本
        IEVersion: function() {
            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
            var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
            var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
            var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
            if (isIE) {
                var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                var fIEVersion = parseFloat(RegExp["$1"]);
                if (fIEVersion == 7) {
                    return 7;
                } else if (fIEVersion == 8) {
                    return 8;
                } else if (fIEVersion == 9) {
                    return 9;
                } else if (fIEVersion == 10) {
                    return 10;
                } else {
                    return 6; //IE版本<=7
                }
            } else if (isEdge) {
                return 'edge'; //edge
            } else if (isIE11) {
                return 11; //IE11
            } else {
                return -1; //不是ie浏览器
            }
        },
        //写cookies
        setCookie: function(c_name, value, expiredays) {　　　　
            var exdate = new Date();　　　　
            exdate.setDate(exdate.getDate() + expiredays);　　　　
            document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());　　
        }

        //读取cookies
        getCookie: function(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

            if (arr = document.cookie.match(reg))

                return (arr[2]);
            else
                return null;
        }
    }
})