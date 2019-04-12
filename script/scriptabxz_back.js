// JavaScript Document
$(function() {
	sizeChanged();
});

$(window).resize(function() {
	sizeChanged();
});
function sizeChanged() {	
	$('.shaxuanx').height($(window).height() - 368 - $('.xuheight').height() );
	$('.xuanzekh').height($(window).height() - 328 );
	$('.xuanzenkh').height($(window).height() - 308 );
	$('.reyzpk').height($(window).height() - 115 );
	$('.reylbk').height($(window).height() - 165 );
	$('.ckshi ,.ckshi1').height($(window).height() - 10 );
	$('.sousuok').height($(window).height() - 50 );
	$('.sousuok').width($(window).width() - 175 );
	$('.shaxuanss').height( $('.sousuok').height() - 245 );
	$('.ifrshaih').height($(window).height() - 198 );
	$('.shaifre').height($(window).height() - 95 );
	$('.wapper_hongguan').height($(window).height() - 135 );
	var pdtop = $('.wapper_hongguan').height() + 130;
	$('.tablewapper').css({'padding-top':pdtop});
	var conyhei = $('table.conytb').height() + 100;
	$('.cony_fot').height(conyhei);
	$('.ckshi1').height($(window).height);
	$('.ckshi1, .ckshi').css({'top':0});
	$('.ckshi div.cengcdiv .ifrheight , .ckshi1 div.cengcdiv .ifrheight').height($(window).height() - 85 );
	$('.menu').height($(window).height() - 130 );
	$('.rightbiaodan').height($(window).height() - 137 );
	$('.section').height($(window).height() - 134 )
}
$(document).ready(function(){
$(".tuceng ul > li").mousedown(function(){
				 		//找menu对应的tab
						//debugger;
				 		//$(".menu_tab > div").removeClass("active");
						var className=$(this).attr('class');
						$(this).siblings('li').removeClass("tips");
						if("tips"!=className){
							$(this).addClass("tips");
						}
						else {
			                 $(this).removeClass("tips");
							 }
						});
						
$(".leftbt > span").mousedown(function(){
				 		//找menu对应的tab
						//debugger;
				 		//$(".menu_tab > div").removeClass("active");
						var className=$(this).attr('class');
						$(this).siblings('span').removeClass("tips");
						if("tips"!=className){
							$(this).addClass("tips");
						}
						else {
			                 $(this).removeClass("tips");
							 }
						});
	/**首页头部信息弹出*/
	$('#tanktuli').click(function() {
	     $('.xuanzetank').slideDown();
		  $('.xuanzetab').removeClass("weixzh");
	});
	$('#guanbi').click(function() {
	     $('.xuanzetank').slideUp();
		 $('.xuanzetab').addClass("weixzh");
	});
	/**页头弹出关闭*/
	$('.toprgjtset .zhangb').mouseenter(function() {
	$('.user-list').slideDown();
	}).mouseleave(function() {
		$('.user-list').slideUp();
	});
	
	//弹出机构单位选择
	// $('ul.myxx > li').click(function() {
	//      $('.danxuanqu').slideDown();
	// 	  $(this).addClass("active");
	// 	  $(this).siblings('li').removeClass("active");
	// });
	// $('#close').click(function() {
	//      $('.danxuanqu').slideUp();
	// 	 $('.xuanzetab').addClass("weixzh");
	// 	 $('ul.myxx > li').removeClass("active");
	// });


	$('#btn').click(function(e) {
		
	    if ($('#myModal').attr('class') == "reveal-modal ckshi") {
			$('#myModal').removeClass("ckshi");
			$('#myModal').addClass("ckshi1");
			var elem = document.getElementById("contentw");
			 requestFullScreen(elem);  
			sizeChanged();
		}
		/* 隐藏 */
		else {
			$('#myModal').removeClass("ckshi1");
			$('#myModal').addClass("ckshi");
			sizeChanged();
			if (typeof window.ActiveXObject !== "undefined") {      
				setTimeout(function(){
					var wscript = new ActiveXObject("WScript.Shell");    
					if (wscript !== null) {    
						wscript.SendKeys("{F11}");    
					}   
				 },25);
			}
			
			//	
		}
	});
	$('#renclose').click(function() {
	    if ($('#myModal').attr('class') == "reveal-modal ckshi1") {
			$('#myModal').removeClass("ckshi1");
			$('#myModal').addClass("ckshi");
			sizeChanged();
			if (typeof window.ActiveXObject !== "undefined") {      
				setTimeout(function(){
					var wscript = new ActiveXObject("WScript.Shell");    
					if (wscript !== null) {    
						wscript.SendKeys("{F11}");    
					}   
				 },25);
			}
		}
		/* 隐藏 */
		else {
		}
	
	});
	
	//一键清除筛选条件
	$('span#shaix').click(function() {
		  $(this).fadeOut();
	});
	/**登录人员信息弹出*/
	$('.daochu').mouseenter(function() {
	     $('.daochu-list').slideDown();
	}).mouseleave(function() {
		$('.daochu-list').slideUp();
	});

	
});
//	$(document).keydown(function (event) {
//            //判断当event.keyCode 为37时（即左方面键），执行函数to_left();
//            //判断当event.keyCode 为39时（即右方面键），执行函数to_right();
//            if (event.keyCode == 122) {
//                alert('左');
//            }
//     });
function setTabv(name, cursel, n) {
		  for (i = 1; i <= n; i++) {
			  var menu = document.getElementById(name + i);
			  var con = document.getElementById("cont_" + name + "_" + i);
			  menu.className = i == cursel ? ("nav" + i + " " + "tips" ): ("nav" + i);
			  con.style.display = i == cursel ? "block" : "none";
		  }
	  }