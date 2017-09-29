+function ($) {
    //定义 dropdown 类
    var Dropdown = function (element) {
            var $el = $(element).on('click', this.toggle)
            $('html').on('click', function () {
                $el.parent().removeClass('open')
            })
        },
        toggle = '[data-toggle="dp_dropdown"]'

    Dropdown.prototype = {
        toggle: function () {
            var selector,
                $parent,
                $this = $(this),
                isActive
            //判断按钮是否禁用
            if ($this.is('.disabled, :disabled')) return
            //增加API href||data_target
            selector = $this.attr('data_target')

            if (!selector) {
                selector = $this.attr('href')
                selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
            }
            $parent = $(selector)

            $parent.length || ($parent = $this.parent())

            isActive = $parent.hasClass('open')

            clearMenus()

            if (!isActive) $parent.addClass('open')

            return false
        }
    }

    function clearMenus() {
        $(toggle).parent().removeClass('open')
    }

    //定义插件
    $.fn.dropdown = function (option) {
        return this.each(function (index, el) {
            var $this = $(this),
                data = $this.data('dropdown');
            if (!data) $this.data('dropdown', (data = new Dropdown($this)))
            if (typeof option == 'string') data[options].call($this)

        });
    }
    $.fn.dropdown.Constructor = Dropdown
    //绑定页面事件
    $(function () {
        $('body').on('click', toggle, Dropdown.prototype.toggle)
        $('html').on('click', clearMenus)
    })

}(jQuery);

//tooltip
+function ($) {
    //定义类
    var Tooltip = function (element, options) {
        this.type =
            this.options =
                this.timeout =
                    this.hoverState =
                        this.$element = null

        this.init('tooltip', element, options)

    }

    Tooltip.DEFAULTS = {
        template: '<div class="tooltip top" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: 'hover focus',
        selector: false,
        animation: true,
        placement: 'top',
        title: '',
        delay: 0,
        container: false,
        html: false,
        viewport: {
            selector: 'body',
            padding: 0
        }
    }

    Tooltip.prototype.init = function (type, element, options) {
        this.type = type;
        this.$element = $(element);
        this.options = this.getOptions(options);
        this.viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport);

        var triggers = this.options.trigger.split(' ')

        //绑定事件
        for (var i = triggers.length; i--;) {
            var trigger = triggers[i];
            if (trigger == 'click') {
                this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
            } else if (trigger != 'manual') {
                var eventIn = trigger == 'hover' ? 'mouseenter' : 'focusin';
                var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';

                this.$element.on(eventIn, this.options.selector, $.proxy(this.enter, this))
                this.$element.on(eventOut, this.options.selector, $.proxy(this.leave, this))
            }
        }

        this.options.selector ?
            (this._options = $.extend({}, this.options, {trigger: 'manual', selector: ''})) :
            this.fixTitle()
    }
    Tooltip.prototype.fixTitle = function () {
        var $e = this.$element
        if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
            $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
        }
    }
    Tooltip.prototype.getTitle = function () {
        var title
        var $e = this.$element
        var o = this.options

        title = $e.attr('data-original-title')
            || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title)

        return title
    }
    Tooltip.prototype.enter = function (obj) {
        var self = obj instanceof this.constructor ?
            obj : $(obj.currentTarget).data(this.type);

        clearTimeout(self.timeout);
        self.hoverState = 'in'

        if (!self.options.delay || !self.options.delay.show) return self.show()

        self.timeout = setTimeout(function () {
            self.hoverState == 'in' && self.show()
        }, self.options.dalay.show)
    }
    Tooltip.prototype.leave = function (obj) {
        var self = obj instanceof this.constructor ?
            obj : $(obj.currentTarget).data(this.type);

        clearTimeout(self.timeout)

        self.hoverState = 'out'

        if (!self.options.delay || !self.options.delay.hide) return self.hide()

        self.timeout = setTimeout(function () {
            self.hoverState == 'out' && self.hide()
        }, self.options.dalay.hide)
    }
    Tooltip.prototype.show = function () {
        var e = $.Event('show.' + this.type)
        var that = this
        var $tip = this.tip();

        this.$element.trigger(e)

        var tipId = this.getUID(this.type)

        this.setContent()
        $tip.attr('id', tipId)

        var placement = this.options.placement;

        $tip
            .detach()
            .css({
                top: 0,
                left: 0,
                display: 'block'
            })
            .addClass(placement)
            .data(this.type, this)

        this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

        var pos = this.getPosition()
        var actualWidth = $tip[0].offsetWidth
        var actualHeight = $tip[0].offsetHeight

        var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

        this.applyPlacement(calculatedOffset, placement)

        var complete = function () {
            that.$element.trigger('shown.' + that.type)
            that.hoverState = null
        }

        $.support.transition && this.$tip.hasClass('fade') ?
            $tip
                .one('bsTransitionEnd', complete)
                .emulateTransitionEnd(150) :
            complete()
    }
    Tooltip.prototype.hide = function () {
        var that = this
        var $tip = this.tip()
        var e = $.Event('hide.' + this.type)

        function complete() {
            if (that.hoverState != 'in') $tip.detach()
            that.$element.trigger('hidden.' + that.type)
        }

        this.$element.trigger(e)

        if (e.isDefaultPrevented()) return

        $tip.removeClass('in')

        $.support.transition && this.$tip.hasClass('fade') ?
            $tip
                .one('bsTransitionEnd', complete)
                .emulateTransitionEnd(150) :
            complete()

        this.hoverState = null

        return this
    }
    Tooltip.prototype.applyPlacement = function (offset, placement) {
        var $tip = this.tip();
        var width = $tip[0].offsetWidth;
        var height = $tip[0].offsetHeight;

        var marginTop = parseInt($tip.css('margin-top'), 10);
        var marginLeft = parseInt($tip.css('margin-left'), 10);

        if (isNaN(marginTop)) marginTop = 0;
        if (isNaN(marginLeft)) marginLeft = 0;

        offset.top = offset.top + marginTop;
        offset.left = offset.left + marginLeft;

        $.offset.setOffset($tip[0], $.extend({
            using: function (props) {
                $tip.css({
                    top: Math.round(props.top),
                    left: Math.round(props.left)
                })
            }
        }, offset), 0)

        $tip.addClass('in')

        var actualWidth = $tip[0].offsetWidth
        var actualHeight = $tip[0].offsetHeight

        if (placement == 'top' && actualHeight != height) {
            offset.top = offset.top + height - actualHeight
        }

        var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);

        if (delta.left) offset.left += delta.left
        else offset.top += delta.top

        var arrowDelta = delta.left ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
        var arrowPosition = delta.left ? 'left' : 'top'
        var arrowOffsetPosition = delta.left ? 'offsetWidth' : 'offsetHeight'

        $tip.offset(offset)
        this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], arrowPosition)
    }
    Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
        this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + '%') : '')
    }
    Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
        var delta = {top: 0, left: 0};
        if (!this.$viewport) return delta

        var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
        var viewportDimensions = this.getPosition(this.$viewport)

        if (/right|left/.test(placement)) {
            var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll
            var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
            if (topEdgeOffset < viewportDimensions.top) { // top overflow
                delta.top = viewportDimensions.top - topEdgeOffset
            } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
                delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
            }
        } else {
            var leftEdgeOffset = pos.left - viewportPadding
            var rightEdgeOffset = pos.left + viewportPadding + actualWidth
            if (leftEdgeOffset < viewportDimensions.left) { // left overflow
                delta.left = viewportDimensions.left - leftEdgeOffset
            } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
                delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
            }
        }

        return delta
    }
    Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
        return placement == 'bottom' ? {
            top: pos.top + pos.height,
            left: pos.left + pos.width / 2 - actualWidth / 2
        } :
            placement == 'top' ? {
                top: pos.top - actualHeight,
                left: pos.left + pos.width / 2 - actualWidth / 2
            } :
                placement == 'left' ? {
                    top: pos.top + pos.height / 2 - actualHeight / 2,
                    left: pos.left - actualWidth
                } :
                    /* placement == 'right' */
                    {
                        top: pos.top + pos.height / 2 - actualHeight / 2,
                        left: pos.left + pos.width
                    }

    }
    Tooltip.prototype.getPosition = function ($element) {
        $element = $element || this.$element;
        var $el = $element[0];
        var isBody = $el.tagName == 'BODY'

        return $.extend({}, {
            scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop(),
            width: isBody ? $(window).width() : $element.outerWidth(),
            height: isBody ? $(window).height() : $element.outerHeight()
        }, isBody ? {
            top: 0,
            left: 0
        } : $element.offset())

    }
    Tooltip.prototype.setContent = function () {
        var $tip = this.tip()
        var title = this.getTitle();

        $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
        $tip.removeClass('fade in top bottom left right')
    }
    Tooltip.prototype.toggle = function (e) {
        var self = this
        self.tip().hasClass('in') ? self.leave(self) : self.enter(self);

    }
    Tooltip.prototype.tip = function () {
        return (this.$tip = this.$tip || $(this.options.template))
    }
    Tooltip.prototype.getUID = function (prefix) {
        do prefix += ~~(Math.random() * 1000000)
        while (document.getElementById(prefix))
        return prefix
    }
    Tooltip.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
    }
    Tooltip.prototype.getOptions = function (options) {
        var options = $.extend({}, Tooltip.DEFAULTS, this.$element.data(), options);
        if (options.delay && typeof options.delay == 'number') {
            options.delay = {
                show: options.delay,
                hide: options.delay
            }
        }

        return options;
    }

    //定义插件
    function Plugin(option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('tooltip'),
                options = typeof option == 'object' && option;

            if (!data) $this.data('tooltip', (data = new Tooltip(this, options)));
            if (typeof option == 'string') data[option]();

        })
    }

    var old = $.fn.tooltip;

    $.fn.tooltip = Plugin;
    $.fn.tooltip.Constructor = Tooltip;

    $.fn.tooltip.noConflict = function () {
        $.fn.tooltip = old;
        return this
    }


}(jQuery);

/* Tab */
+function ($) {
    'use strict';

    // TAB CLASS DEFINITION
    // ====================

    var Tab = function (element) {
        this.element = $(element)
    }

    Tab.prototype.show = function () {
        var $this = this.element
        var $ul = $this.closest('ul:not(.dropdown-menu)')
        var selector = $this.data('target')

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        }

        if ($this.parent('li').hasClass('active')) return

        var previous = $ul.find('.active:last a')[0]
        var e = $.Event('show.bs.tab', {
            relatedTarget: previous
        })

        $this.trigger(e)

        if (e.isDefaultPrevented()) return

        var $target = $(selector)

        this.activate($this.closest('li'), $ul)
        this.activate($target, $target.parent(), function () {
            $this.trigger({
                type: 'shown.bs.tab',
                relatedTarget: previous
            })
        })
    }

    Tab.prototype.activate = function (element, container, callback) {
        var $active = container.find('> .active')
        var transition = callback
            && $.support.transition
            && $active.hasClass('fade')

        function next() {
            $active
                .removeClass('active')
                .find('> .dropdown-menu > .active')
                .removeClass('active')

            element.addClass('active')

            if (transition) {
                element[0].offsetWidth // reflow for transition
                element.addClass('in')
            } else {
                element.removeClass('fade')
            }

            if (element.parent('.dropdown-menu')) {
                element.closest('li.dropdown').addClass('active')
            }

            callback && callback()
        }

        transition ?
            $active
                .one('bsTransitionEnd', next)
                .emulateTransitionEnd(150) :
            next()

        $active.removeClass('in')
    }


    // TAB PLUGIN DEFINITION
    // =====================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('bs.tab')

            if (!data) $this.data('bs.tab', (data = new Tab(this)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.tab

    $.fn.tab = Plugin
    $.fn.tab.Constructor = Tab


    // TAB NO CONFLICT
    // ===============

    $.fn.tab.noConflict = function () {
        $.fn.tab = old
        return this
    }


    // TAB DATA-API
    // ============

    $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
        e.preventDefault()
        Plugin.call($(this), 'show')
    })

}(jQuery);