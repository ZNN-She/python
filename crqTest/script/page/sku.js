/**
 * Created by SNAKE on 2017/9/12.
 */
define (["Vue","winAlert"], function (Vue,winAlert) {
    new Vue({
        el: "#sku-page",
        data: {
            navType: "search",   //search case stat
            search: {
                key: ""
            },
            isShowInstructions: false
        },
        methods: {
            switchNavType: function (type) {
                this.navType = type;
                this.isShowInstructions = false;
            },
            instructionsBtnClick: function () {
                this.isShowInstructions = !this.isShowInstructions;
            },
            init: function () {

            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.init();
            })
        }
    })
});