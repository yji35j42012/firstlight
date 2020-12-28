var total_flyer = 0; //最新課程 總數
var flyer_item = 0; //最新課程 目前顯示的圖片
var flyer_item_move = 0; //最新課程 目前顯示的圖片
var flyer_max_move = 0; //最新課程 選單最大移動次數
var flyer_menu_count = 0;  //最新課程 選單目前移動次數
var flyer_menuX = 0;  //最新課程 選單目前位置

var total_video = 0; //最新課程 總數
var video_item = 0 //影音專區 目前顯示的圖片
var video_item_move = 0; //影音專區 目前顯示的圖片
var video_max_move = 0; //影音專區 選單最大移動次數
var video_menu_count = 0;  //影音專區 選單目前移動次數
var video_menuX = 0;  //影音專區 選單目前位置
$(document).ready(function(){
	total_flyer = $("#flyer_group > div").length;
	$("#flyer_menu_box ul li:first-child").addClass('on');

	// 偵測螢幕寬度
	$(window).resize(function() {
        var wdth=$(window).width();
		if(wdth > 1280){
			flyer_max_move = $("#flyer_group > div").length % 10;
		}else if($(window).width() < 1280){
			flyer_max_move = $("#flyer_group > div").length % 6;
		}
    });

	if($(window).width() > 1280 && total_flyer > 10){
		$("#flyer_menu > button").css("display","block");
		$("#flyer_menu_box > ul").addClass("jc_start");
		flyer_menuX = -10
		menu_moveHandler("flyer" , flyer_menuX);
		flyer_max_move = $("#flyer_group > div").length % 10;
	}else if($(window).width() < 1280 && total_flyer > 6){
		$("#flyer_menu > button").css("display","block");
		$("#flyer_menu_box > ul").addClass("jc_start");
		flyer_menuX = -10
		menu_moveHandler("flyer" , flyer_menuX);
		flyer_max_move = $("#flyer_group > div").length % 6;
	}

	$("#flyer_menu_box ul li").click(function() {
		$("#flyer_menu_box ul li.on").removeClass('on');
		$(this).addClass("on");
		flyer_item_move = $(this).index();
		let moveX = flyer_item_move * 100 ;
		$("#flyer_group").css("transform","translateX(-"+ moveX + "%)");
	});

	$("#flyer_prev").click(() => {
		// console.log("prev");
		if(flyer_menu_count > 0){
			flyer_menu_count--;
			flyer_menuX = flyer_menuX + 100 ;
			menu_moveHandler("flyer" , flyer_menuX);	
		}
	})
	$("#flyer_next").click(() => {
		// console.log("next");
		if(flyer_menu_count < flyer_max_move){
			flyer_menu_count++
			flyer_menuX = flyer_menuX -100 ;
			$("#flyer_menu_box > ul").css("transform","translateX("+flyer_menuX+"px)");
		}
		
	})
	
	// console.log("total_flyer" , total_flyer);
	// console.log("flyer_max_move" , flyer_max_move);
	// console.log("flyer_menu_count" , flyer_menu_count);
});


function menu_moveHandler (who , moveX){
	if(who == "flyer"){
		$("#flyer_menu_box > ul").css("transform","translateX("+ moveX + "px)");
	}
}





























// let data = {
//     flyer_data: {
//         flyer_menu: [
//             {
//                 flyer_id: 1,
//                 flyer_name: "居仁國小",
//                 flyer_src: "./images/flyer/01.jpg",
//                 isActive: true,

//             },
//             {
//                 flyer_id: 2,
//                 flyer_name: "居仁國中",
//                 flyer_src: "./images/flyer/02.jpg",
//                 isActive: false,

//             },
//         ],
//         flyer_scroll:false,
//         flyer_now_pic: 0,
//         flyer_max_move:0,
//         flyer_move_count:0,
//         flyer_menu_style:{
//             flyer_menu_iscenter:"center",
//             flyer_menu_move:0,
//         },
//         flyer_group_move: 0 ,
//         flyer_group: "transform: translateX(1px)",
//     },
//     menuActive: false,
// }