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


    window.commentsSKU = commentsSKU;
    window.userComments = userComments;
})(window);