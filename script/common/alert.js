+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.2.0'

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

(function($,win){
    win.$win = {
        alert:function(option){
            var DEFAULTS = {
                type: "warning",//场景类型：warning,info,danger,success
                content: "",//内容
                autoClose: true,//是否自动关闭
                duration: 5000,//停留时间
                size: ""//尺寸
            };

            var config = $.extend({}, DEFAULTS, typeof option == "string" ? {content: option} : option);
            var domEl= $(
                '<div class="alert alert-fixed alert-dismissible">' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                '<span aria-hidden="true">&times;</span>'+
                '</button>' +
                '</div>');
            domEl.append('<div>'+config.content+'</div>');
            domEl.addClass('alert-'+config.type);
            domEl.appendTo($("body"));
            //自动关闭
            if(config.autoClose){
                setTimeout(function(){
                    domEl.alert('close');
                },config.duration);
            }

        },
        confirm:function(option){
            var DEFAULTS = {
                img: "images/component/alert/alert-question.png",//图标
                content: "",//内容
                title: "",//内容标题
                windowTitle: "系统提醒",//窗口名称
                closeText: "确定",//确认按钮文本
                cancelText: "取消",//取消按钮文本
                showClose: true,//显示确认按钮
                showCancel: true,//显示取消按钮
                size: "sm",//尺寸
                redirect: ""//链接
            };

            var config = $.extend({}, DEFAULTS, typeof option == "string" ? {content: option} : option);


        }

    };
}(jQuery,window));