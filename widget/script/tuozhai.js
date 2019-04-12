// JavaScript Document
$(function () {
    $(".resizable1").resizable(
        {
            autoHide: true,
            handles: 'e',
            resize: function (e, ui) {
                var parent = ui.element.parent();
                var remainingSpace = parent.width() - ui.element.outerWidth(),
                    divTwo = ui.element.next(),
                    divTwoWidth = (remainingSpace - (divTwo.outerWidth() - divTwo.width())) / parent.width() * 100 + "%";
                divTwo.width(divTwoWidth);
            },
            stop: function (e, ui) {
                var parent = ui.element.parent();
                ui.element.css(
                    {
                        width: ui.element.width() / parent.width() * 100 + "%",
                    });
            }
        });
});
// $(function () {            //ul/li的折叠效果
//     $(".menu > ul").eq(0).show();
//     $(".menu h4").click(function () {
//         //找menu对应的tab
//         //$(".menu_tab > div").removeClass("active");
//         var className = $(this).attr('class');
//         $(this).parent().find('h4').removeClass("active");
//         if ("active" != className) {
//             $(this).addClass("active");
//         }
//
//
//         var val = ($(this).next().attr('class'));
//         var menu_value = (val.substring(val.length - 1));
//         $(".container .content .menu" + menu_value + " .tab:first-child").addClass("active");
//         $(".zhengst .menu .ulmenu" + menu_value + " li>a").removeClass("selected");
//         $(".zhengst .menu .ulmenu" + menu_value + " li a").eq(0).addClass("selected");//默认设置为被选中状态
//
//
//         // $("."+"val").child().child().("selected")
//
//         //这是ul收缩效果
//         $(this).next().stop().slideToggle();
//         $(this).siblings().next("ul").stop().slideUp();
//
//         // if($(".container .ulmenu"+menu_value+" li ").find("a").attr("class")==="selected"){
//         // 		$(".container .content .menu"+menu_value+" .tab:first-child")
//         // }
//     });
// });
$(function () {
    selectMenu(0);
    selectMenu(1);

    function selectMenu(index) {
        $(".select-menu-input").eq(index).val($(".select-this").eq(index).html());//在输入框中自动填充第一个选项的值
        $(".select-menu-div").eq(index).on("click", function (e) {
            e.stopPropagation();
            if ($(".select-menu-ul").eq(index).css("display") === "block") {
                $(".select-menu-ul").eq(index).hide();
                $(".select-menu-div").eq(index).find("i").removeClass("select-menu-i");
                $(".select-menu-ul").eq(index).animate({marginTop: "50px", opacity: "0"}, "fast");
            } else {
                $(".select-menu-ul").eq(index).show();
                $(".select-menu-div").eq(index).find("i").addClass("select-menu-i");
                $(".select-menu-ul").eq(index).animate({marginTop: "5px", opacity: "1"}, "fast");
            }
            for (var i = 0; i < $(".select-menu-ul").length; i++) {
                if (i !== index && $(".select-menu-ul").eq(i).css("display") === "block") {
                    $(".select-menu-ul").eq(i).hide();
                    $(".select-menu-div").eq(i).find("i").removeClass("select-menu-i");
                    $(".select-menu-ul").eq(i).animate({marginTop: "50px", opacity: "0"}, "fast");
                }
            }

        });
        $(".select-menu-ul").eq(index).on("click", "li", function () {//给下拉选项绑定点击事件
            $(".select-menu-input").eq(index).val($(this).html());//把被点击的选项的值填入输入框中
            $(".select-menu-div").eq(index).click();
            $(this).siblings(".select-this").removeClass("select-this");
            $(this).addClass("select-this");
        });
        $("body").on("click", function (event) {
            event.stopPropagation();
            if ($(".select-menu-ul").eq(index).css("display") === "block") {
                console.log(1);
                $(".select-menu-ul").eq(index).hide();
                $(".select-menu-div").eq(index).find("i").removeClass("select-menu-i");
                $(".select-menu-ul").eq(index).animate({marginTop: "50px", opacity: "0"}, "fast");

            }

        });

    }
})
$(function () {
    $("#container").switchPage({
        'loop': true,
        'keyboard': true,
        'direction': 'horizontal'
    });
});