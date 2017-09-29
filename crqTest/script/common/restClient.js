/**
 * Created by nanning_zhang on 2016/7/10.
 */
/*登录注册弹窗*/


var userLogin = userLogin();
//第三方登录未绑定手机号
if(USER_INFO.userName&&!(/^1\d{10}$/.test(USER_INFO.userName))){
    userLogin.addModal('bindMobile');
}
var restClient = (function (window, undefined) {

    var DEFAULT = {
        url: null,
        type: "get",
        dataType: 'json',
        //timeout: 30000,
        contentType: "application/json; charset=utf-8",
        data: null,
        success: function (data) {
            if (data.code == 0 || data.code == 200) {

            } else if (data.code == 301) {
                data.link ? window.location.href = data.link : $win.alert(data.msg);
            } else if (data.code == 401) {
                $win.alert("请升级更高版本");
            } else if (data.code == 1001) {
                $win.alert(data.msg);

            } else {
                $win.alert(data.msg || data.type);
            }
        },
        error: function (xhr, type, errorThrown) {
            //异常处理；
            $win.alert("请求失败，请刷新页面再试一下哦");
            //$win.alert("请求错误:" + xhr.status + "|" + xhr.statusText);
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
        if(headers){
            settings.data = param;
        }else{
            settings.data = data && JSON.stringify(data);
            if(param){
                var urlParam = null;
                for(var key in param){
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
        } else if (data.code == 401) {
            //$win.alert("请升级更高版本");
            if(data.data.indexOf('-2')>-1){
                userLogin.addModal('wechatWord');
            }
            if(data.data.indexOf('-3')>-1||data.data.indexOf('-4')>-1||data.data.indexOf('-5')>-1||data.data.indexOf('-0')>-1){
                userLogin.addModal('invite');
                $('.remind-mes').html(data.msg);
            }
            if(data.data.indexOf('-1')>-1){
                userLogin.addModal('bindMobile');
            }
        } else if (data.code == 1001 || data.code == 3000) {

            //$win.alert("请登录后，再查询");

            userLogin.addModal('login');

        } else {
            $win.alert(data.type || (data.code + data.msg));
        }
    }
    /**
     * 0 success
     * 400 参数错误
     * 401 权限不足
     * 409 冲突(主要指业务逻辑上的错误)
     * 500 后天服务操作错误
     * 301 重定向
     * 1001未登录 3000
     * 1002 java请求失败
     */
    function needGlobalResolve(data) {
        var sourceCode = ["301", "400", "401","409", "500", "1001", "1002", "3000"];
        return sourceCode.indexOf(String(data.code)) != -1;
    }

    //生成回调
    function getCallback(options, deferred) {
        var successHandler, errorHandler;
        //创建成功回调
        if (options.custom) {
            successHandler = options.successCallback;
        } else {
            successHandler = function (data) {
                if (data.code == 0 || data.code == 200) {
                    //绑定了微信未绑定店铺
                    /*if(data.ext&&data.ext.scanned_wx && !data.ext.bind_shop){
                     var isBindStore = getCookie('isBindStore');
                     if(!isBindStore){

                     userLogin.addModal('bindStore');
                     setCookie('isBindStore',true,7);
                     }
                     } */

                    options.successCallback && options.successCallback.call(this, data);
                } else if (needGlobalResolve(data)) {
                    globalResolve(data);
                    deferred && deferred.resolve();
                } else {//执行失败回调
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
            deferred && deferred.reject();
            errorHandler = options.errorCallback;
        } else {
            errorHandler = function (xhr, type, errorThrown) {
                deferred && deferred.reject();
                $win.alert("请求错误：" + xhr.status + "|" + xhr.statusText, "text");
            }
        }

        return {
            success: successHandler,
            error: errorHandler
        }
    }

    return {
        get: function (url, param, action, deferred) {
            var callback = getAction(action, deferred);
            return $.ajax(getOption(url, "get", param, null, callback.success, callback.error));
        },
        post: function (url, param, data, action, deferred) {
            var callback = getAction(action, deferred);
            return $.ajax(getOption(url, "post", param, data, callback.success, callback.error));
        },
        put: function (url, param, data, action, deferred) {
            var callback = getAction(action, deferred);
            return $.ajax(getOption(url, "put", param, data, callback.success, callback.error));
        },
        deletes: function (url, param, data, action, deferred) {
            var callback = getAction(action, deferred);
            return $.ajax(getOption(url, "delete", param, data, callback.success, callback.error));
        },
        postFormData: function (url, param, action, deferred) {
            var callback = getAction(action, deferred);
            var headers = {'contentType': 'application/x-www-form-urlencoded'};
            return $.ajax(getOption(url, "post", param, null, callback.success, callback.error, headers));
        }
    }
}(window));

//写cookies
function setCookie(c_name, value, expiredays){
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie=c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

//读取cookies
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

    if(arr=document.cookie.match(reg))

        return (arr[2]);
    else
        return null;
}
function userLogin() {
    var closeStr = '<img src="http://static.charenqi.cn/src/images/pwd_close.png" class="user_close" style="width:15px;position: absolute; right: 10px; top: 12px; z-index: 9; cursor: pointer;">'
    $('body').on("click",".bindShop_btn",function(e){
        e.stopPropagation();
        e.preventDefault();
        userLogin.addModal('bindStore');
    })
    $('body').on("click",".bindWechat_btn",function(e){
        e.stopPropagation();
        e.preventDefault();
        userLogin.addModal('wechatWord');
    })
    $('body').on("keyup",'.user-login input',function(){
        if($(this).val().length>0){
            var name = $(this).attr('name');
            var closeBtn = $(this).parent().find('.user_close');
            ((closeBtn.length<1)&&name!="checkCode")&&$(this).parent().append(closeStr);
            (name == 'authCode') && $(this).parent().find('.user_close').css('right','130px');
            (name == 'password') && $(this).parent().find('.user_close').css({'right':'37px','top': '12px'});
            $(".error").remove();
        }else{
            $(".user_close").remove();
        }
    })
    document.onkeydown = function(e) {
        var e = e || event;
        //只组织form表单的默认事件，其他的不阻止，不然会出现textarea不换行的情况
        if($(e.target).parents("form").length && e.keyCode == 13) {
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        }
    }
    $('body').on("focus",'.user-login input',function(){
        if($(this).val().length>0){
            var name = $(this).attr('name');
            var closeBtn = $(this).parent().find('.user_close');
            ((closeBtn.length<1)&&name!="checkCode")&&$(this).parent().append(closeStr);

            (name == 'authCode') && $(this).parent().find('.user_close').css('right','130px');
            (name == 'password') && $(this).parent().find('.user_close').css({'right':'37px','top': '12px'});
            $(".error").remove();
        }else{
            $(".user_close").remove();
        }
    })
    $('body').on("blur",'.user-login input',function(){
        var that = $(this);
        setTimeout(function(){
            that.parent().find('.user_close').remove();
        },1000)
    })
    $('body').on("click",'.user_close',function(){
        $(this).parent().find('input').val("");
    })
    //密码显示隐藏
    $('body').on('click','.pwd_show',function(e){

        var passwordInput = $('input[name="password"]');
        var $thisSrc = $(this).attr('src') ;
        if($thisSrc=="http://static.charenqi.cn/src/images/pwd_show1s.png"){
            passwordInput[0].type ='text';
            $(this).attr('src',"http://static.charenqi.cn/src/images/pwd_show2s.png");
        }else{
            passwordInput[0].type ='password';
            $(this).attr('src',"http://static.charenqi.cn/src/images/pwd_show1s.png");
        }

    })
    $('body').on('click','.toLogin',function(e){
        if($('#signIn').length>0){
            $('#signIn').remove()
        }
        userLogin.addModal('login');

    })
    $('body').on('click','.passwordToLogin',function(e){
        if($('#findPassword').length>0){
            $('#findPassword').remove()
        }
        userLogin.addModal('login');

    })
    $('body').on('click','.login-btn',function(e){

        e.stopPropagation();
        e.preventDefault();
        userLogin.loginFn();

    })
    $('body').on('click','.find-password',function(e){
        if($('#login').length>0){
            $('#login').remove()
        }
        userLogin.getCheckImg();
        userLogin.addModal('findPassword');

    })
    $('body').on('click','.validCode-btn',function(e){

        userLogin.getCheckCode();

    })
    $('body').on('click','.sign-in',function(e){
        if($('#login').length>0){
            $('#login').remove()
        }
        userLogin.getCheckImg();
        userLogin.addModal('signIn');

    })
    $('body').on('click','.findPassword-btn',function(e){
        e.stopPropagation();
        e.preventDefault();
        userLogin.forget();

    })
    $('body').on('click','.signIn-btn',function(e){
        e.stopPropagation();
        e.preventDefault();
        userLogin.register();

    })
    $('body').on('click','.command-btn',function(e){
        e.stopPropagation();
        e.preventDefault();
        userLogin.addCommand();

    })
    $('body').on('click','.bindStore-btn',function(e){
        e.stopPropagation();
        e.preventDefault();
        userLogin.bindShop();

    })

    $('body').on('click','.login_btn',function(e){
        e.stopPropagation();
        e.preventDefault();
        userLogin.addModal('login');

    })
    $('body').on('click','.register_btn',function(e){
        e.stopPropagation();
        e.preventDefault();
        userLogin.addModal('signIn');

    })
    $('body').on('click','.user-login .close',function(e){
        e.stopPropagation();
        e.preventDefault();
        $('.user-login').parent().remove();
    })
    //QQ登录
    $('body').on('click','.QQ-login',function(e){
        var winH = $(window).height();
        var winW = $(window).width();
        var top = (winH-500)/2 +'px';
        var left = (winW-600)/2+'px';
        /*window.open('http://www.charenqi.cn/users/qq_login',"TencentLogin",
         "width=600,height=500,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=0,top="+top+",left="+left);*/
        window.open('http://www.charenqi.cn/users/qq_login');
    })
    //微信登录
    $('body').on('click','.wechat-login',function(e){
        var winH = $(window).height();
        var winW = $(window).width();
        var top = (winH-500)/2 +'px';
        var left = (winW-600)/2+'px';
        /*window.open('http://www.charenqi.cn/users/wx_login',"WechatLogin",
         "width=600,height=500,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=0,top="+top+",left="+left); */
        window.open('http://www.charenqi.cn/users/wx_login');
    })
    //绑定手机号
    $('body').on('click','.bindMobile-btn ',function(e){
        e.stopPropagation();
        e.preventDefault();
        userLogin.bindMobileFn();
    })

    return userLogin = {
        bindMobileFn:function(){
            var phoneNum = $('input[name="phoneNum"]').val();
            var authCode = $('input[name="authCode"]').val();

            if(!(/^1\d{10}$/.test(phoneNum))){
                $('input[name="phoneNum"]').parent().append('<label id="phoneNum-error" class="error" for="phoneNum">手机号不符合规则</label>');
                return false;
            }

            if(!(/^[\d]{6}$/.test(authCode))){
                $('input[name="authCode"]').parent().append('<label id="authCode-error" class="error" for="authCode">验证码不符合规则</label>');
                return false;
            }

            var action = {
                successCallback: function(data){
                    $('.error').remove();
                    if(data.code==0){
                        $('#bindMobile').remove();
                        location.reload();
                    }
                },
                failCallback: function(data){
                    $('.error').remove();
                    if(data.code==1005){
                        $('input[name="phoneNum"]').parent().append('<label id="phoneNum-error" class="error" for="phoneNum">'+data.msg+'</label>');
                    }
                    if(data.code==1006){
                        $('input[name="authCode"]').parent().append('<label id="authCode-error" class="error" for="authCode">'+data.msg+'</label>');
                    }
                }
            };
            restClient.postFormData("/users/bind_mobile", {mobile:phoneNum,code:authCode},action);
        },
        register:function(){
            var phoneNum = $('input[name="phoneNum"]').val();
            var password = $('input[name="password"]').val();
            var authCode = $('input[name="authCode"]').val();
            var QQ       = $('input[name="QQ"]').val();

            if(!(/^1\d{10}$/.test(phoneNum))){
                $('input[name="phoneNum"]').parent().append('<label id="phoneNum-error" class="error" for="phoneNum">手机号不符合规则</label>');
                return false;
            }

            if(!(/^[\d]{6}$/.test(authCode))){
                $('input[name="authCode"]').parent().append('<label id="authCode-error" class="error" for="authCode">验证码不符合规则</label>');
                return false;
            }

            if(password.length<6){
                $('input[name="password"]').parent().append('<label id="password-error" class="error" for="phoneNum">密码最少6位</label>');
                return false;
            }
            if(!(/^[1-9]\d{4,11}$/.test(QQ))){
                $('input[name="QQ"]').parent().append('<label id="password-error" class="error" for="phoneNum">QQ未填或不符合规则</label>');
                return false;
            }

            var action = {
                successCallback: function(data){
                    $('.error').remove();
                    if(data.code==0){
                        $('#signIn').remove();
                        location.reload();
                    }

                },
                failCallback: function(data){
                    $('.error').remove();
                    if(data.code==1005){
                        $('input[name="phoneNum"]').parent().append('<label id="phoneNum-error" class="error" for="phoneNum">'+data.msg+'</label>');
                    }
                    if(data.code==1006){
                        $('input[name="authCode"]').parent().append('<label id="authCode-error" class="error" for="authCode">'+data.msg+'</label>');

                    }
                    if(data.code==1100){
                        $('input[name="QQ"]').parent().append('<label id="password-error" class="error" >'+data.msg+'</label>');

                    }
                }
            };
            restClient.postFormData("/users/register", {mobile:phoneNum,password:password,code:authCode,qq_number:QQ}, action)
        },
        loginFn:function(){
            var phoneNum = $('input[name="phoneNum"]').val();
            var password = $('input[name="password"]').val();
            var rember = $('input[name="rember"]').is(':checked')?1:0;

            if(!(/^1\d{10}$/.test(phoneNum))){
                $('input[name="phoneNum"]').parent().append('<label id="phoneNum-error" class="error" for="phoneNum">手机号不符合规则</label>');
                return false;
            }
            if(password.length<6){
                $('input[name="password"]').parent().append('<label id="password-error" class="error" for="phoneNum">密码最少6位</label>');
                return false;
            }
            var action = {
                successCallback: function(data){
                    $('.error').remove();
                    if(data.code==0){
                        var gotoUrl = $('#login').data('gotoUrl');
                        var blank = $('#login').data('blank');
                        if(gotoUrl){
                            blank?(window.location.href = gotoUrl)
                                :window.open(gotoUrl);
                        }else{
                            location.reload();
                        }
                        $('#login').remove();

                    }

                },
                failCallback: function(data){
                    $('.error').remove();
                    if(data.code==1101||data.code==1102){
                        $('input[name="phoneNum"]').parent().append('<label id="phoneNum-error" class="error" for="phoneNum">'+data.msg+'</label>');
                    }
                }
            };
            restClient.postFormData("/users/login", {username:phoneNum,password:password,remember:rember},action)
        },
        forget:function(){
            var phoneNum = $('input[name="phoneNum"]').val();
            var password = $('input[name="password"]').val();
            var authCode = $('input[name="authCode"]').val();

            if(!(/^1\d{10}$/.test(phoneNum))){
                $('input[name="phoneNum"]').parent().append('<label id="phoneNum-error" class="error" for="phoneNum">手机号不符合规则</label>');
                return false;
            }

            if(!(/^[\d]{6}$/.test(authCode))){
                $('input[name="authCode"]').parent().append('<label id="authCode-error" class="error" for="authCode">验证码不符合规则</label>');
                return false;
            }

            if(password.length<6){
                $('input[name="password"]').parent().append('<label id="password-error" class="error" for="phoneNum">密码最少6位</label>');
                return false;
            }
            var action = {
                successCallback: function(data){
                    $('.error').remove();
                    if(data.code==0){
                        $win.alert('密码修改成功！');
                        $('#findPassword').remove();
                    }

                },
                failCallback: function(data){
                    $('.error').remove();
                    if(data.code==1005){
                        $('input[name="phoneNum"]').parent().append('<label id="phoneNum-error" class="error" for="phoneNum">'+data.msg+'</label>');
                    }
                    if(data.code==1006){
                        $('input[name="authCode"]').parent().append('<label id="authCode-error" class="error" for="authCode">'+data.msg+'</label>');
                    }
                    if(data.code==1101){
                        $('input[name="password"]').parent().append('<label id="password-error" class="error" >'+data.msg+'</label>');
                    }
                }
            };

            restClient.postFormData("/users/forget", {mobile:phoneNum,password:password,code:authCode}, action)
        },
        getCheckCode:function(){
            var phoneNum = $('input[name="phoneNum"]').val();
            var checkCode = $('input[name="checkCode"]').val();
            var type = $('#signIn').length>0?1:$('#findPassword').length>0?2:4;
            var a = this.a;
            if(!(/^1\d{10}$/.test(phoneNum))){
                $('input[name="phoneNum"]').parent().append('<label id="phoneNum-error" class="error" for="phoneNum">手机号不符合规则</label>');
                return false;
            }
            if(!(/^[\d\w]{4}$/.test(checkCode))){
                $('input[name="checkCode"]').parent().append('<label id="checkCode-error" class="error" for="phoneNum">验证码不符合规则</label>');
                return false;
            }

            var action = {
                successCallback: function(data){
                    $('.error').remove();
                    if(data.code==0){
                        a = 60;
                        timer1 = setInterval(function(_this){
                            a-=1;
                            $('.message-btn').text(a+"秒后重新获取");
                            $('.message-btn').removeClass('validCode-btn');
                            if(a < 0){
                                clearInterval(timer1);
                                $('.message-btn').text("获取短信校验码");
                                $('.message-btn').addClass('validCode-btn');
                            }
                        },1000);
                    }

                },
                failCallback: function(data){
                    $('.error').remove();
                    if(data.code==1005){
                        $('input[name="phoneNum"]').parent().append('<label id="phoneNum-error" class="error" for="phoneNum">'+data.msg+'</label>');
                    }
                    if(data.code==1004){
                        $('input[name="checkCode"]').parent().append('<label id="checkCode-error" class="error" for="phoneNum">'+data.msg+'</label>');
                    }
                    if(data.code==1104){
                        $('input[name="authCode"]').parent().append('<label id="authCode-error" class="error" >'+data.msg+'</label>');
                    }
                }
            };

            restClient.postFormData('/users/send_message',{'mobile':phoneNum,'operate_type':type,'rand_code':checkCode},action);
        },
        getCheckImg:function(){
            var action = {

                errorCallback:function(data){
                    console.log(data);
                    // $(findPassword).find('.checkImg').append('<img src='+data.responseText+'>');
                }
            };
            restClient.get('/user/verify_img',null,action);
        },
        addCommand:function(){
            var command = $('input[name="command"]').val();

            restClient.postFormData('/users/add_command',{'command':command},function(data){
                console.log(data);
                if(data.code==0){

                    $('#wechatWord').remove();
                    userLogin.addModal('bindStore');
                    setCookie('isBindStore',true,7);
                }

            });
        },
        bindShop:function(){
            var itemLink = $('input[name="item-link"]').val();
            var titleCode = this.randomStr;
            if(itemLink.length<1){
                $('input[name="item-link"]').parent().append('<label id="item-link-error" class="error" for="item-link">商品链接不能为空</label>');
                return false;
            }
            var action = {
                successCallback: function(data){
                    $('.error').remove();
                    if(data.code==0){
                        $win.alert('店铺绑定成功');
                        $('#bindShop').remove();
                    }

                },
                failCallback: function(data){
                    $('.error').remove();
                    if(data.code==1105){
                        $('input[name="item-link"]').parent().append('<label id="item-link-error" class="error" for="item-link">'+data.msg+'</label>');
                    }

                }
            };
            restClient.postFormData('/users/bind_shop',{'title_code':titleCode,'goods_link':itemLink},action);
        },
        wechatWord:
        '<div id="wechatWord" class="modal">'+
        '<div class="modal-dialog user-login user-login-l" >'+
        '   <form class=" form-horizontal" name="wechatWord" >'+
        '        <div class="modal-content signIn bindStore">'+
        '            <div class="modal-header">'+
        '                <button class="close" >'+
        '                    <span>×</span>'+
        '                </button>'+
        '                <div class="modal-title">'+
        '                    3次免费机会已用完，请加微信即可永久免费使用部分功能'+
        '                </div>'+
        '            </div>'+
        '            <div class="modal-body">'+
        '                    <div class="form-group">'+
        '                        <p class="text-center">请添加运营微信为好友，并在其<span style="font-size:16px;color:red;font-weight: bold;">朋友圈封面</span>领取口令</p>'+
        '                        <div class="text-center" style="float:left;" >'+
        '                            <img class="weChatQR" src="http://static.charenqi.cn/src/images/QRcode.jpg" style="width:240px;"><p style="color:#ccc;">添加微信</p>'+
        '                        </div>'+
        '                        <div class="text-center" >'+
        '                            <img src="http://static.charenqi.cn/src/images/wechatFr.jpg" style="height:224px;width: 267px;"><p style="color:#ccc;">口令在朋友圈封面</p>'+
        '                        </div>'+
        '                        '+
        '                    </div>'+
        '                '+
        '                    <div class="form-group" style="margin-left:100px;margin-top:30px;">'+
        '                        <label class="col-xs-3 control-label">'+
        '                            注册口令：'+
        '                        </label>'+
        '                        <div class="col-xs-5">'+
        '                            <input type="text" class="form-control" name="command" placeholder="请输入注册口令">'+
        '                        </div>'+
        '                    </div>'+
        '            </div>'+
        '            <div class="modal-footer" >                '+
        '                <button class="btn btn-save command-btn" >下一步</button>'+
        '            </div>'+
        '            </div>'+
        '            </form>'+
        '            </div>'+
        '        </div>',
        bindStore:
        '<div id="bindStore" class="modal">'+
        '<div class="modal-dialog user-login user-login-l" >'+
        '<form class=" form-horizontal" name="findPassword" >'+
        '<div class="modal-content signIn bindStore">'+
        '            <div class="modal-header">'+
        '                <button class="close" >'+
        '                    <span>×</span>'+
        '                </button>'+
        '                <div class="modal-title">'+
        '                    请验证卖家身份加入<span>TOP商家分享群</span>免费听课及开通<span>更多功能权限</span>'+
        '                </div>'+
        '            </div>'+
        '            <div class="modal-body">'+
        '                    <div class="form-group">'+
        '                        <label class="col-xs-3 control-label"><span style="color:red">*</span>验证码</label>'+
        '                        <div class="col-xs-9">'+
        '                            <div class="input-group" style="width:220px;">                              '+
        '                              <input type="text" id="code-text" style="background-color: #fff;color:#a94442;" class="form-control" name="authCode" >'+
        '                              <div class="input-group-addon copy-btn" style="cursor:pointer;">复制</div>'+
        '                            </div>'+
        '                            <p style="padding-top:10px;">1.将验证码加到您的店铺里某个<span style="color: red">不常用的商品或者运费链接</span>的商品标题上，例：</p>'+
        '                            <p style="padding-top:10px;"><img src=\'/static/images/store_tutorial.jpg\'></p>'+
        '                            <p style="padding-top:10px;">2.再将这个商品的详情页链接，复制到下面输入框</p>'+
        '                        </div>'+
        '                    </div>'+
        '                    <div class="form-group">'+
        '                        <label class="col-xs-3 control-label"><span style="color:red">*</span>商品网址(URL)</label>'+
        '                        <div class="col-xs-9">'+
        '                            <input type="text" class="form-control" name="item-link" placeholder="请输入商品网址">'+
        '                        </div>'+
        '                    </div>'+
        '            </div>'+
        '            <div class="modal-footer" >'+
        '                <button class="btn btn-save bindStore-btn" >立即验证</button>'+
        '            </div>'+
        '         </form>'+
        ' </div>'+
        '</div>',

        findPassword:
        '<div id="findPassword" class="modal">'+
        '<div class="modal-dialog user-login" >'+
        '<form class=" form-horizontal" name="findPassword" >'+
        '<div class="modal-content signIn">'+
        '            <div class="modal-header">'+
        '                <button class="close" >'+
        '                    <span>×</span>'+
        '                </button>'+
        '               '+
        '                <div class="modal-title">找回密码 <span class="passwordToLogin" style="font-size:14px;color:#24ade8;margin-left:3px;cursor:pointer;">返回登录</span></div>'+
        '            </div>'+
        '            <div class="modal-body">'+

        '                    <div class="form-group">'+
        '                        <label class="col-xs-3 control-label" >手机号</label>'+
        '                        <div class="col-xs-9">'+
        '                            <input type="text" class="form-control" name="phoneNum" require  minlength="11" placeholder="可用于登录和找回密码">'+
        '                        </div>'+
        '                    </div>'+
        '                    <div class="form-group">'+
        '                        <label class="col-xs-3 control-label" >验证码</label>'+
        '                        <div class="col-xs-9 checkImg" style="position: relative;">'+
        '                            <input type="text" style="width: 120px;" class="form-control" name="checkCode" placeholder="验证码">'+
        '                             <img id="code" src="/users/verify_img?t='+Math.random()+'" onclick="this.src='+'\'/users/verify_img?t='+Math.random()+'\'" style="position:absolute;right:110px;top:1px;width:90px;height:37px" />'+
        '                        </div>'+
        '                    </div>'+
        '                    <div class="form-group">'+
        '                        <label class="col-xs-3 control-label">短信验证码</label>'+
        '                        <div class="col-xs-9">'+
        '                            <div class="input-group">                              '+
        '                              <input type="text" class="form-control" name="authCode" autocomplete="off" placeholder="请填写短信验证码">'+
        '                              <div class="input-group-addon validCode-btn message-btn" style="cursor:pointer;">获取短信验证码</div>'+
        '                            </div>'+
        '                            '+
        '                        </div>'+
        '                    </div>'+
        '                    <div class="form-group">'+
        '                        <label class="col-xs-3 control-label">设置新密码</label>'+
        '                        <div class="col-xs-9">'+
        '                            <input type="password" class="form-control" name="password" placeholder="请设置登录密码">'+
        '                               <img src="http://static.charenqi.cn/src/images/pwd_show1s.png" class="pwd_show" style="position:absolute; right:10px; top:15px; z-index:9; cursor:pointer;width:21px;">'+
        '                        </div>'+
        '                    </div>'+
        '                </form>'+
        '                '+
        '            </div>'+
        '            <div class="modal-footer" >'+
        '                <button class="btn btn-save findPassword-btn" >确认</button>'+
        '                '+
        '            </div>'+
        '            </div>'+
        '            </form>'+
        '            </div>'+
        '        </div>',

        login:
        '<div id="login" class="modal">'+
        '<div class="modal-dialog user-login " >'+
        '<form name="login" >'+
        '<div class="modal-content login">'+
        '          <div class="modal-header">'+
        '                <button class="close" >'+
        '                    <span>×</span>'+
        '                </button>'+
        '                <div class="modal-title">用户登录</div>'+
        '           </div>'+
        '          <div class="modal-body">'+
        '                    <div class="form-group">'+
        '                        <label class="sr-only" >注册手机号</label>'+
        '                        <div class="input-group">'+
        '                          <div class="input-group-addon" >'+
        '                            <i class="glyphicon glyphicon-user"></i>'+
        '                          </div>'+
        '                          <input  type="text" class="form-control" require  minlength="11" name="phoneNum" placeholder="注册手机号">                          '+
        '                        </div>'+
        '                    </div>'+
        '                    <div class="form-group">'+
        '                        <label class="sr-only" >填写正确密码</label>'+
        '                        <div class="input-group">'+
        '                          <div class="input-group-addon" style="color: #ccc;">'+
        '                            <i class="glyphicon glyphicon-lock"></i>'+
        '                            '+
        '                          </div>'+
        '                          <input  type="password" require minlength="6" class="form-control" name="password" placeholder="填写正确密码">                          '+
        '                               <img src="http://static.charenqi.cn/src/images/pwd_show1s.png" class="pwd_show" style="position:absolute; right:10px; top:15px; z-index:9; cursor:pointer;width:21px;">'+
        '                        </div>'+
        '                    </div>'+
        '                    <p>'+
        '                        <input type="checkbox" name="rember" checked="checked">&nbsp;&nbsp;下次自动登录'+
        '                        <span style="float:right">'+
        '                            <a class="find-password" style="cursor:pointer;color:#24ade8;">找回密码</a>&nbsp;&nbsp;|&nbsp;&nbsp;'+
        '                            <a class="sign-in" style="cursor:pointer;color:#24ade8;">立即注册</a>'+
        '                        </span>'+
        '                    </p>'+
        '           </div>'+
        '           <div class="modal-footer" >'+
        '                <button class="btn btn-save login-btn">登录</button>'+
        '                <div class="other-login">'+
        '                    <p class="other-login-txt">'+
        '                        <span class="line"></span>'+
        '                        <span class="text">其他方式登录</span> '+
        '                        <span class="line" ></span>'+
        '                    </p>'+
        '                    <div class="other-imgs" style="text-align:center;">'+
        '                        <img src="http://static.charenqi.cn/src/images/QQ.png" class="QQ-login" style="width: 46px;margin-right:25px;cursor:pointer;display: inline-block;">'+
        '                        <img src="http://static.charenqi.cn/src/images/wechat.png" class="wechat-login" style="width: 46px;cursor:pointer;display: inline-block;">'+
        '                    </div>'+
        '               </div>'+
        '          </div>'+
        '</div>'+
        '</form>'+
        '</div>'+
        '</div>',

        signIn:
        '<div id="signIn" class="modal">'+
        '<div class="modal-dialog user-login " >'+
        '<form class=" form-horizontal" name="signIn" style="margin-bottom:0px;">'+
        '<div class="modal-content signIn">'+
        '           <div class="modal-header">'+
        '                <button class="close" >'+
        '                    <span>×</span>'+
        '                </button>'+
        '            <div class="modal-title">注册</div>'+
        '    </div>'+
        '    <div class="modal-body" style="margin-top:13px;padding-bottom:0px;">'+
        '            <div class="form-group">'+
        '                <label class="col-xs-3 control-label" >手机号</label>'+
        '                <div class="col-xs-9">'+
        '                    <input type="text" class="form-control" name="phoneNum" placeholder="可用于登录和找回密码">'+
        '                </div>'+
        '            </div>'+
        '            <div class="form-group">'+
        '                        <label class="col-xs-3 control-label" >验证码</label>'+
        '                        <div class="col-xs-9 checkImg" style="position: relative;">'+
        '                            <input type="text" style="width: 120px;" class="form-control" name="checkCode" placeholder="验证码">'+
        '                             <img id="code" src="/users/verify_img?t='+Math.random()+'" onclick="this.src='+'\'/users/verify_img?t='+Math.random()+'\'" style="position:absolute;right:110px;top:1px;width:90px;height:37px" />'+
        '                        </div>'+
        '             </div>'+
        '            <div class="form-group">'+
        '                <label class="col-xs-3 control-label">短信验证码</label>'+
        '                <div class="col-xs-9">'+
        '                    <div class="input-group">'+
        '                      <input type="text" class="form-control" name="authCode" autocomplete="off" placeholder="请填写短信验证码">'+
        '                      <div class="input-group-addon validCode-btn message-btn" style="cursor:pointer;">获取短信验证码</div>'+
        '                    </div>'+
        '                    '+
        '                </div>'+
        '            </div>'+
        '            <div class="form-group">'+
        '                <label class="col-xs-3 control-label">密码</label>'+
        '                <div class="col-xs-9">'+
        '                    <input type="password" class="form-control" name="password" placeholder="请设置登录密码">'+
        '                               <img src="http://static.charenqi.cn/src/images/pwd_show1s.png" class="pwd_show" style="width:21px;position:absolute; right:10px; top:15px; z-index:9; cursor:pointer;">'+
        '                </div>'+
        '            </div>'+
        '            <div class="form-group">'+
        '                <label class="col-xs-3 control-label">QQ</label>'+
        '                <div class="col-xs-9">'+
        '                    <input type="text" class="form-control" name="QQ" placeholder="请输入联系人QQ">'+
        '                </div>'+
        '            </div>'+
        '            <p class="text-remind">'+
        '                <span style="margin-left: 20px;">'+
        '                    <a class="toLogin" style="cursor:pointer;">我有账号，去登录</a>'+
        '                </span>'+
        '            </p>'+
        '    </div>'+
        '    <div class="modal-footer" >'+
        '        <button class="btn btn-save signIn-btn" style="margin-bottom:0;">注册</button>'+
        '                <div class="other-login">'+
        '                    <p class="other-login-txt" style="line-height: 52px;height: 52px;">'+
        '                        <span class="line"></span>'+
        '                        <span class="text">其他方式登录</span> '+
        '                        <span class="line" ></span>'+
        '                    </p>'+
        '                    <div class="other-imgs" style="text-align:center;">'+
        '                        <img src="http://static.charenqi.cn/src/images/QQ.png" class="QQ-login" style="width: 46px;margin-right:25px;cursor:pointer;display: inline-block;">'+
        '                        <img src="http://static.charenqi.cn/src/images/wechat.png" class="wechat-login" style="width: 46px;cursor:pointer;display: inline-block;">'+
        '                    </div>'+
        '               </div>'+
        '    </div>'+
        '        </form>'+
        '    </div>'+
        '    </div>',
        invite:
        '<div id="invite" class="modal">'+
        '    <div class="modal-dialog user-login " style="width:355px;">'+
        '        <div class="modal-content signIn bindStore">'+
        '            <div class="modal-header">'+
        '                <button class="close" >'+
        '                    <span>×</span>'+
        '                </button>'+
        '                <div class="modal-title">'+
        '                    友情提示'+
        '                </div>'+
        '            </div>'+
        '            <div class="modal-body" style="padding: 20px;height: 60px;">'+
        '            <div class="remind-mes"></div>'+
        '            </div>'+
        '            <div class="modal-footer" >'+
        '                <button class="btn btn-save " style="width: 170px;"><a href="http://www.charenqi.cn/user/index" target="_blank" style="color:#fff;">邀请好友</a></button>'+
        '            </div>'+
        '        </div>'+
        '    </div>'+
        '</div>',
        bindMobile:
        '<div id="bindMobile" class="modal">'+
        '    <div class="modal-dialog user-login" >'+
        '        <form class=" form-horizontal" name="bindMobile" >  '+
        '            <div class="modal-content signIn">  '+
        '                <div class="modal-header">  '+
        '                    <button class="close" >  '+
        '                       <span>×</span>  '+
        '                   </button> '+
        '                    <div class="modal-title"> '+
        '                        账号绑定'+
        '                    </div>  '+
        '                </div>  '+
        '                <div class="modal-body clearfix">'+
        '                    <div style="float:left;">'+
        '                        <div style="padding: 20px 20px 0 10px;border-right: 1px solid #ccc;">'+
        '                            <img src="http://static.charenqi.cn/src/images/login_4.png" style="width:85px;" />'+
        '                        </div>'+
        '                    </div>'+
        '                    <div style="float:right;width:325px;"> '+
        '                         <div class="form-group">  '+
        '                             <label class="col-xs-3 control-label" >手机号</label>  '+
        '                             <div class="col-xs-8">  '+
        '                                 <input type="text" class="form-control" name="phoneNum" require  minlength="11" placeholder="可用于登录和找回密码">  '+
        '                             </div>  '+
        '                         </div>  '+
        '                         <div class="form-group">  '+
        '                             <label class="col-xs-3 control-label" >验证码</label>  '+
        '                             <div class="col-xs-5 checkImg" style="position: relative;">  '+
        '                                 <input type="text" style="width: 112px;" class="form-control" name="checkCode" placeholder="验证码">  '+
        '                                  <img id="code" src="/users/verify_img?t="+Math.random() onclick="this.src=\'/users/verify_img?t=\'"+Math.random() style="position:absolute;right:-90px;top:1px;width:90px;height:37px;" />  '+
        '                             </div>  '+
        '                         </div>  '+
        '                         <div class="form-group"> '+
        '                             <label class="col-xs-3 control-label">短信验证码</label>  '+
        '                             <div class="col-xs-8"> '+
        '                                 <div class="input-group">'+
        '                                   <input type="text" style="width: 112px;" class="form-control" name="authCode" autocomplete="off" placeholder="短信验证码">  '+
        '                                   <div class="input-group-addon validCode-btn message-btn" style="cursor:pointer;">获取短信验证码</div>  '+
        '                                 </div>  '+
        '                             </div>  '+
        '                         </div>'+
        '                         <div class="form-group">  '+
        '                             <label class="col-xs-3 control-label"></label>  '+
        '                             <div class="col-xs-8">  '+
        '                                <button class="btn bindMobile-btn" '+
        '                                    style="margin-top: 10px;padding: 8px 20px;background-color: #0289FF;color: #fff;">'+
        '                                    立即绑定'+
        '                                </button>'+
        '                             </div> '+
        '                         </div>'+
        '                     </div>'+
        '                </div>  '+
        '            </div>  '+
        '        </form>  '+
        '    </div>  '+
        '</div>',
        randomStr:'',
        addModal:function(name){
            var body = $('body');
            var html = this[name];
            var that = this;
            if($("#"+name).length < 1){
                body.append(html);
            }

            $("#"+name).modal("open");
            var bannerTop = (($(window).height() - $("#"+name+' .user-login').height()) / 2) + 'px';
            $('.user-login').css('margin-top', bannerTop);
            var form = $("form[name='"+name+"']");

            /*form.validate({
             rules: {
             phoneNum:{
             number:true
             }
             }
             });*/
            if(name=="bindStore"){
                this.randomStr = getRanNum();
                $('input[name="authCode"]').val(this.randomStr);
                //绑定复制验证码时间
                $('body').on('click','.copy-btn',function(){
                    document.getElementById("code-text").select();
                    document.execCommand("copy",false,null);
                })

            }
            if(name=="wechatWord"){
                var picNo = USER_INFO.userId? (USER_INFO.userId%4):0;
                //替换微信图片
                var weChatQRsrc = "http://static.charenqi.cn/src/images/focused_wx/llvcode_xiugai_"+picNo+".jpg";

                $('.weChatQR').attr('src',weChatQRsrc);
            }

            function getRanNum(){
                var result = "";
                for(var i=0;i<4;i++){
                    var ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
                    //大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里

                    result+=String.fromCharCode(65+ranNum);
                }
                var num = String(Math.floor(Math.random () * 10000));

                return num+'-'+result;
            }


        }

    }

}
