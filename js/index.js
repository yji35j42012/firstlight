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
var default_menuX = 0;  //影音專區 基本位置
$(document).ready(function(){
	total_flyer = $("#flyer_group > div").length;
	total_video = $("#video_scroll li").length;
	$("#flyer_scroll ul li:first-child").addClass('on');
	$("#video_scroll ul li:first-child").addClass('on');

	// 偵測螢幕寬度
	$(window).resize(function() {
        var wdth=$(window).width();
		if(wdth > 1280){
			flyer_max_move = $("#flyer_group > div").length % 10;
			video_max_move = $("#video_group > div").length % 8;
			// moveX = -10;
			// menu_moveHandler("flyer" , moveX);
			default_menuX = -122.5;
			moveX = default_menuX * video_menu_count;
			menu_moveHandler("video" , moveX);
		}else if($(window).width() < 1280){
			flyer_max_move = $("#flyer_group > div").length % 6;
			video_max_move = $("#video_group > div").length % 5;
			// moveX = -10;
			// menu_moveHandler("flyer" , moveX);
			default_menuX = -116;
			moveX = default_menuX * video_menu_count;
			menu_moveHandler("video" , moveX);
		}

    });

	if($(window).width() > 1280 && total_flyer > 10){
		console.log('bbb');
		$("#flyer_menu > button").css("display","block");
		$("#flyer_scroll > ul").addClass("jc_start");
		flyer_menuX = -10;
		console.log(flyer_menuX);
		menu_moveHandler("flyer" , flyer_menuX);
		flyer_max_move = $("#flyer_group > div").length % 10;
	}else if($(window).width() < 1280 && total_flyer > 6){
		$("#flyer_menu > button").css("display","block");
		$("#flyer_scroll > ul").addClass("jc_start");
		flyer_menuX = -10
		menu_moveHandler("flyer" , flyer_menuX);
		flyer_max_move = $("#flyer_group > div").length % 6;
	}

	if($(window).width() > 1280 && total_video > 8){
		$("#video_menu > button").css("display","block");
		$("#video_scroll > ul").addClass("jc_start");
		video_menuX = 0;
		default_menuX = -122.5;
		moveX = default_menuX * video_menu_count;
		menu_moveHandler("video" , moveX);
		video_max_move = $("#video_group > div").length % 8;
	}else if($(window).width() < 1280 && total_video > 6){
		$("#video_menu > button").css("display","block");
		$("#video_scroll > ul").addClass("jc_start");
		default_menuX = -116;
		moveX = default_menuX * video_menu_count;
		menu_moveHandler("video" , moveX);
		video_max_move = $("#video_group > div").length % 5;
	}

	$("#flyer_scroll ul li").click(function() {
		$("#flyer_scroll ul li.on").removeClass('on');
		$(this).addClass("on");
		flyer_item_move = $(this).index();
		let moveX = flyer_item_move * 100 ;
		$("#flyer_group").css("transform","translateX(-"+ moveX + "%)");
	});

	$("#video_scroll ul li").click(function() {
		$("#video_scroll ul li.on").removeClass('on');
		$(this).addClass("on");
	});

	$("#flyer_prev").click(() => {
		if(flyer_menu_count > 0){
			flyer_menu_count--;
			flyer_menuX = flyer_menuX + 100 ;
			menu_moveHandler("flyer" , flyer_menuX);	
		}
	})
	$("#flyer_next").click(() => {
		if(flyer_menu_count < flyer_max_move){
			flyer_menu_count++
			flyer_menuX = flyer_menuX -100 ;
			$("#flyer_scroll > ul").css("transform","translateX("+flyer_menuX+"px)");
		}
		
	})

	$("#video_prev").click(function(){
		if(video_menu_count > 0){
			video_menu_count--;
			video_menuX = video_menu_count * (-122.5) ;
			menu_moveHandler("video" , video_menuX);	
		}
	})
	$("#video_next").click(function(){
		if(video_menu_count < video_max_move && $(window).width() > 1280){
			video_menu_count++
			video_menuX = video_menu_count *  (-116);
			$("#video_scroll > ul").css("transform","translateX("+video_menuX+"px)");
		}else if(video_menu_count < video_max_move && $(window).width() < 1280){
			video_menu_count++
			video_menuX = video_menu_count *  (-116);
			$("#video_scroll > ul").css("transform","translateX("+video_menuX+"px)");
		}
	})

	$("#menu_btn").click(function(){
		$("#menu_btn").toggleClass("active");
	})
	
	// $("#school_menu_first li").click(function(){
	// 	$("#school_menu_first li .school_menu_second").removeClass('active');
	// 	let count = $(this).index() + 1;
	// 	$("#school_menu_first li:nth-child("+ count +") .school_menu_second").addClass("active");
		
	// })
	// $("#school_menu_first .school_menu_second li").click(function(){
	// 	$("#school_menu_first li .school_menu_third").removeClass('active');
	// 	let count = $(this).index() + 1;
	// 	$("#school_menu_first .school_menu_second li:nth-child("+ count +") .school_menu_third").addClass("active");
	// })

	// console.log("total_flyer" , total_flyer);
	// console.log("flyer_max_move" , flyer_max_move);
	// console.log("flyer_menu_count" , flyer_menu_count);
});


function menu_moveHandler(who , moveX){
	console.log(who);
	if(who == "flyer"){
		console.log('asas');
		$("#flyer_scroll > ul").css("transform","translateX("+ moveX + "px)");
	}else if(who == "video"){
		$("#video_scroll > ul").css("transform","translateX("+ moveX + "px)");
	}
}

var s_menu_f = document.querySelectorAll("#school_menu_first > li > span");
var s_menu_s = document.querySelectorAll("#school_menu_second > li > span");

var menu_f_active = -1 ;
var menu_s_active = -1 ;

for(let i = 0 ; i<s_menu_f.length ; i++){
	const element = s_menu_f[i];
	element.onclick = function () {
		if(menu_f_active !== i && menu_f_active !==-1){
			removeclass("menu_s");
			s_menu_f[menu_f_active].classList.remove("active");
			element.classList.add("active");
			menu_f_active = i;
		}else if(menu_f_active == -1){
			element.classList.add("active");
			menu_f_active = i;
		}else{
			removeclass("menu_s");
			element.classList.remove("active")
			menu_f_active = -1;
		}
    }
}
for(let i = 0 ; i<s_menu_s.length ; i++){
	const element = s_menu_s[i];
	element.onclick = function () {
		console.log('aaa');
		removeclass("menu_s");
		element.classList.add("active");
		
	}
}

function removeclass(who){
	if(who == "menu_s"){
		for(let i = 0 ; i<s_menu_s.length ; i++){
			s_menu_s[i].classList.remove("active");
		}
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