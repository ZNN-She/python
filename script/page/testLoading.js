define(["loading"], function(loading) {
    //模拟请求
    function ajax() {
        var dtd = $.Deferred();
        setTimeout(function(){
        	dtd.resolve("resolve");
        }, 2000);
        // setTimeout(dtd.reject("reject"), 2000);
        // setTimeout(dtd.notify, 2000);
        return dtd; //此处也可以直接返回dtd
    };

    function init() {
        $("#loading").on("click", function(argument) {
            var promise = ajax();
            $("#loading").loading(promise);
        })
        $("#button").on("click", function(argument) {
        	var promise = ajax();
            $("body").loading(promise);
        })
    }
    init();
});