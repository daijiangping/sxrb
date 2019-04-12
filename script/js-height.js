// JavaScript Document
$(function() {
	sizeChanged();
});

$(window).resize(function() {
	sizeChanged();
});
function sizeChanged() {
	$('.journey-box , #smallImg-box , .shepbdiv').height($(window).height() - 50 );
	$('.shepbdiv').height($(window).height() - 40 );
/*	$('.magnify').width(($(window).width() - 180 ) / 2 );*/
	$('.magnify ,.imgwqpper ul li .imgkbj ,.topbj').height($(window).height() - 55 );
	$('.magnify ,.imgwqpper ul li .imgkbj').width(($(window).height() - 55 )*0.70683 );
	$('.imgwqppershu ul li .imgkbj').height(1170);
	$('.imgwqppershu ul li .imgkbj').width(827);
/*	$('.shepbdiv ul.three li div.magnify').width(($(window).width() - 180 ) / 3 );*/

}

$(document).ready(function(){
    /*返回顶部*/
    $('#roll_top').hide();
    $('.journey-box').scroll(function () {
        if ($('.journey-box').scrollTop() > 100) {
            $('#roll_top').fadeIn(400);//当滑动栏向下滑动时，按钮渐现的时间
        } else {
            $('#roll_top').fadeOut(0);//当页面回到顶部第一屏时，按钮渐隐的时间
        }
    });
    $('#roll_top').click(function () {
        $('.journey-box').animate({
            scrollTop : '0px'
        }, 300);//返回顶部所用的时间 返回顶部也可调用goto()函数
    });
	$('#tab_1').click(function() {
		 $('.calendar-box, #tab_1').hide();
	     $('.shepbdiv,#tab_2').show();
	});
	$('#tab_2').click(function() {
		 $('.shepbdiv, #tab_2').hide();
	     $('.calendar-box ,#tab_1').show();
	});
	
		$('.noactive').click(function() {
			if ($('#pailei').attr('class') == "imgwqpper") {
			$('#pailei').removeClass("imgwqpper").addClass('imgwqppershu');
			sizeChanged();
		}
		/* 隐藏 */
		else {
			$('#pailei').removeClass("imgwqppershu").addClass('imgwqpper');
			sizeChanged();
		}
	     $(this).toggleClass("noactive");
	});
});