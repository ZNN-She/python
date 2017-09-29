/**
 * Created by SNAKE on 2017/7/4.
 */
//下拉菜单

function dropDownMenu(nodes, clas, cla_active, lower_level, lists, left_small_menu) {
    var nodes = nodes;           // 事件源
    var clas = clas;            // 标识属性
    var cla_active = cla_active;      //选中的样式
    var lower_level = lower_level;     //标识有下级class名
    var lists = lists;           // 标识下级是否展开
    var left_small_menu = left_small_menu; // 下级class名
    var cla = $(this).attr(clas);
    nodes.removeClass(cla_active);
    $(this).parents(".left_big_menu").siblings().removeClass(cla_active);
    if (!nodes.attr("class")) {
        nodes.removeClass("active");
        $(this).addClass("active");
    } else {
        //判断有没有下级
        if (cla.indexOf(lower_level) >= 0) {
            //有下级
            if (cla.indexOf(lists) <= -1) {
                //没有展开
                $(this).find(left_small_menu).show();
                $(this).addClass(lists);
            } else {
                //已经展开
                $(this).find(left_small_menu).hide();
                $(this).removeClass(lists);
            }
        } else {
            //没有下级
            $(this).addClass(cla_active);
        }
    }
}

var menu = $("#left_menu_wamp .left_big_menu");
var small_menu = $("#left_menu_wamp .left_small_menu li");
//一级
menu.on("click", function () {
    var _dropDownMenu = $.proxy(dropDownMenu, $(this));
    _dropDownMenu(menu, "class", "active", "lower_level", "lists", ".left_small_menu");
});
//二级
small_menu.on("click", function () {
    var _dropDownMenu = $.proxy(dropDownMenu, $(this));
    _dropDownMenu(small_menu, "", "active", "", "", "");
});
var menu1 = [
    {
        'left_big_menu': 'store_condition'
    },
    {
        'left_big_menu': 'store_data_detail'
    },
    {
        'left_big_menu': [
            {'left_small_menu': 'store_sale_data'},
            {'left_small_menu': 'store_hot_goods'},
            {'left_small_menu': 'store_unsold_goods'}
        ]
    },
    {
        'left_big_menu': [
            {'left_small_menu': 'store_new_goods'},
            {'left_small_menu': 'store_shelves'},
            {'left_small_menu': 'store_change_name'},
            {'left_small_menu': 'store_change_price'}
        ]
    },
    {
        'left_big_menu': [
            {'left_small_menu': 'store_bargain'},
            {'left_small_menu': 'store_taobao_guest'},
            {'left_small_menu': 'store_site_activities'}
        ]
    }
];
var url = location.href.split("/")[4].split("?")[0];
for (var i = 0; i < menu1.length; i++) {
    if (typeof menu1[i]['left_big_menu'] == 'string') {
        if (menu1[i]['left_big_menu'] == url) {
            $("#left_menu_wamp .left_big_menu").eq(i).trigger('click');
            break;
        }
    } else {
        for (var j = 0; j < menu1[i]['left_big_menu'].length; j++) {
            if (menu1[i]['left_big_menu'][j]['left_small_menu'] == url) {
                menu.eq(i).trigger('click');
                menu.eq(i).find('.left_small_menu li').eq(j).addClass("active");
                break;
            }
        }
    }
}