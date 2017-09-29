(function (window) {
	/*
	 * 这个方法被重写了后面需要用的用下面重写的方法
	 * 该方法有部分地方已在使用所以不要删除
	 * */
    window.getData = function iframeQ(conditionParams, itemId, type, rankType, limit, keyArray, needP4P, callback) {

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
})(window);