var total_flyer = 0; //最新課程 總數
var flyer_item = 0; //最新課程 目前顯示的圖片
var flyer_item_move = 0; //最新課程 目前顯示的圖片
var flyer_max_move = 0; //最新課程 選單最大移動次數
var flyer_menu_count = 0;  //最新課程 選單目前移動次數
var flyer_menuX = 0;  //最新課程 選單目前位置

var leaderboard_max_move = 0; //曙光金榜 選單最大移動次數

var total_video = 0; //最新課程 總數
var video_item = 0 //影音專區 目前顯示的圖片
var video_item_move = 0; //影音專區 目前顯示的圖片
var video_max_move = 0; //影音專區 選單最大移動次數
var video_menu_count = 0;  //影音專區 選單目前移動次數
var video_menuX = 0;  //影音專區 選單目前位置
var default_menuX = 0;  //影音專區 基本位置
$(document).ready(function () {
	total_flyer = $("#flyer_group > div").length;
	total_video = $("#video_scroll li").length;
	$("#flyer_scroll ul li:first-child").addClass('on');
	$("#video_scroll ul li:first-child").addClass('on');

	leaderboard_max_move = $("#leaderboard_pic > li").length % 5;
	// console.log("leaderboard_max_move" , leaderboard_max_move);
	// 偵測螢幕寬度
	$(window).resize(function () {
		var wdth = $(window).width();
		if (wdth > 1280) {
			flyer_max_move = $("#flyer_group > div").length % 10;
			video_max_move = $("#video_group > div").length % 8;
			default_menuX = -122.5;
			moveX = default_menuX * video_menu_count;
			menu_moveHandler("video", moveX);
			flyer_ani();
			
		} else if ($(window).width() < 1280) {
			flyer_max_move = $("#flyer_group > div").length % 6;
			video_max_move = $("#video_group > div").length % 5;
			default_menuX = -116;
			moveX = default_menuX * video_menu_count;
			menu_moveHandler("video", moveX);
		}
		if ($(window).width() <= 768) {
			var moveX = ($("#flyer_group").width() / 2) - (($("#flyer_group > .flyer_item").width() + 30) / 2 + ($("#flyer_group > .flyer_item").width() + 30) * flyer_item_move);
			menu_moveHandler("flyer_group", moveX);
			menu_moveHandler("leaderboard", 0);
			$("#leaderboard_dots > li").removeClass("on");
			$("#leaderboard_dots li:first-child").addClass('on');
			flyer_ani();
		} else {
			moveX = flyer_item_move * -100;
			menu_moveHandler("flyer_group", moveX);
			removeclass("menu_f");
		}
	});

	if ($(window).width() > 1280 && total_flyer > 10) {
		$("#flyer_menu > button").css("display", "block");
		$("#flyer_scroll > ul").addClass("jc_start");
		flyer_menuX = -10;
		menu_moveHandler("flyer", flyer_menuX);
		flyer_max_move = $("#flyer_group > div").length % 10;
	} else if ($(window).width() < 1280 && total_flyer > 6) {
		$("#flyer_menu > button").css("display", "block");
		$("#flyer_scroll > ul").addClass("jc_start");
		flyer_menuX = -10
		menu_moveHandler("flyer", flyer_menuX);
		flyer_max_move = $("#flyer_group > div").length % 6;
	}
	if ($(window).width() <= 768) {
		var moveX = ($("#flyer_group").width() / 2) - (($("#flyer_group > .flyer_item").width() + 30) / 2 + ($("#flyer_group > .flyer_item").width() + 30) * flyer_item_move);
		menu_moveHandler("flyer_group", moveX);

	}
	if ($(window).width() > 1280 && total_video > 8) {
		$("#video_menu > button").css("display", "block");
		$("#video_scroll > ul").addClass("jc_start");
		video_menuX = 0;
		default_menuX = -122.5;
		moveX = default_menuX * video_menu_count;
		menu_moveHandler("video", moveX);
		video_max_move = $("#video_group > div").length % 8;
	} else if ($(window).width() < 1280 && total_video > 6) {
		$("#video_menu > button").css("display", "block");
		$("#video_scroll > ul").addClass("jc_start");
		default_menuX = -116;
		moveX = default_menuX * video_menu_count;
		menu_moveHandler("video", moveX);
		video_max_move = $("#video_group > div").length % 5;
	}
	$("#flyer_scroll ul li").click(function () {
		flyer_item_move = $(this).index();
		flyer_ani();
		let moveX = flyer_item_move * 100;
		$("#flyer_group").css("transform", "translateX(-" + moveX + "%)");
	});
	$("#video_scroll ul li").click(function () {
		video_item_move = $(this).index();
		$("#video_scroll ul li.on").removeClass('on');
		$(this).addClass("on");
		let moveX = video_item_move * 100;
		$("#video_group").css("transform", "translateX(-" + moveX + "%)");
	});
	$("#flyer_prev").click(() => {
		if (flyer_menu_count > 0) {
			flyer_menu_count--;
			flyer_menuX = flyer_menuX + 100;
			menu_moveHandler("flyer", flyer_menuX);
		}
	})
	$("#flyer_next").click(() => {
		if (flyer_menu_count < flyer_max_move) {
			flyer_menu_count++
			flyer_menuX = flyer_menuX - 100;
			$("#flyer_scroll > ul").css("transform", "translateX(" + flyer_menuX + "px)");
		}

	})
	$("#flyer_dots > li").click(function () {
		// $("#flyer_dots > li").removeClass("on");
		// $(this).addClass("on");
		flyer_item_move = $(this).index();
		var moveX = ($("#flyer_group").width() / 2) - (($("#flyer_group > .flyer_item").width() + 30) / 2 + ($("#flyer_group > .flyer_item").width() + 30) * flyer_item_move);
		menu_moveHandler("flyer_group", moveX);
		// $("#flyer_group > .flyer_item").removeClass("active");
		flyer_ani();
	})


	$("#leaderboard_dots > li").click(function () {
		$("#leaderboard_dots > li").removeClass("on");
		$(this).addClass("on");
		let move = -100 * $(this).index();
		menu_moveHandler("leaderboard", move);
		console.log($(this).index());
	})


	$("#video_prev").click(function () {
		if (video_menu_count > 0) {
			video_menu_count--;
			video_menuX = video_menu_count * (-122.5);
			menu_moveHandler("video", video_menuX);
		}
	})
	$("#video_next").click(function () {
		if (video_menu_count < video_max_move && $(window).width() > 1280) {
			video_menu_count++
			video_menuX = video_menu_count * (-116);
			$("#video_scroll > ul").css("transform", "translateX(" + video_menuX + "px)");
		} else if (video_menu_count < video_max_move && $(window).width() < 1280) {
			video_menu_count++
			video_menuX = video_menu_count * (-116);
			$("#video_scroll > ul").css("transform", "translateX(" + video_menuX + "px)");
		}
	})

	$("#menu_btn").click(function () {
		$("#menu_btn").toggleClass("active");
	})

	$("#news_box > li").click(function () {
		$("#alert_mask").css("display", "flex");
	})
	$("#alert_mask .close").click(function () {
		$("#alert_mask").css("display", "none");
	})
	// console.log("total_flyer" , total_flyer);
	// console.log("flyer_max_move" , flyer_max_move);
	// console.log("flyer_menu_count" , flyer_menu_count);
});
function menu_moveHandler(who, moveX) {
	// console.log(who);
	if (who == "flyer") {
		$("#flyer_scroll > ul").css("transform", "translateX(" + moveX + "px)");
	} else if (who == "video") {
		$("#video_scroll > ul").css("transform", "translateX(" + moveX + "px)");
	} else if (who == "flyer_group") {
		if ($(window).width() > 768) {
			$("#flyer_group").css("transform", "translateX(" + moveX + "%)");
		} else {
			$("#flyer_group").css("transform", "translateX(" + moveX + "px)");
		}
	} else if (who == "leaderboard") {
		$("#leaderboard_pic").css("transform", "translateX(" + moveX + "%)");
	}
}
function flyer_ani() {
	$("#flyer_group > .flyer_item").removeClass("active");
	let count = flyer_item_move + 1
	$("#flyer_group > .flyer_item:nth-child(" + count + ")").addClass("active");

	$("#flyer_dots > li").removeClass("on");
	$("#flyer_dots > li:nth-child(" + count + ")").addClass("on");

	$("#flyer_scroll ul li").removeClass('on');
	$("#flyer_scroll ul li:nth-child(" + count + ")").addClass("on");
}


var s_menu_f = document.querySelectorAll("#school_menu_first > li > span");
var s_menu_s = document.querySelectorAll("#school_menu_first .school_menu_second > li > span");

var menu_f_active = -1;
var menu_s_active = -1;

for (let i = 0; i < s_menu_f.length; i++) {
	const element = s_menu_f[i];
	element.onclick = function () {
		if (menu_f_active !== i && menu_f_active !== -1) {
			removeclass("menu_s");
			s_menu_f[menu_f_active].classList.remove("active");
			s_menu_f[menu_f_active].setAttribute('id', '');
			element.classList.add("active");
			element.setAttribute('id', 'menu_f');
			menu_f_active = i; 
			console.log('aaass');
			console.log(document.querySelectorAll("#menu_f ~ .school_menu_second > li").length);
			if (document.querySelectorAll("#menu_f ~ .school_menu_second > li").length == 1) {
				let img = document.querySelector("#menu_f ~ .school_menu_second img");
				let department = document.querySelector("#menu_f ~ .school_menu_second .department");
				let school_phone = document.querySelector("#menu_f ~ .school_menu_second .school_phone");
				let school_add = document.querySelector("#menu_f ~ .school_menu_second .school_add");
				let sec_span = document.querySelector("#menu_f ~ .school_menu_second span");
				sec_span.classList.add("active");
				sec_span.style.display= "none";

				school_int.classList.remove("active");
				change(img, department, school_phone, school_add);
				
				element.setAttribute('id', '');
				if($(window).width() > 768){
					removeclass("menu_f");
				}
			}

		} else if (menu_f_active == -1) {
			element.classList.add("active");
			element.setAttribute('id', 'menu_f');
			menu_f_active = i; 
			if (document.querySelectorAll("#menu_f ~ .school_menu_second > li").length == 1) {
				let img = document.querySelector("#menu_f ~ .school_menu_second img");
				let department = document.querySelector("#menu_f ~ .school_menu_second .department");
				let school_phone = document.querySelector("#menu_f ~ .school_menu_second .school_phone");
				let school_add = document.querySelector("#menu_f ~ .school_menu_second .school_add");
				let sec_span = document.querySelector("#menu_f ~ .school_menu_second span");
				sec_span.classList.add("active");
				sec_span.style.display= "none";
				school_int.classList.remove("active");
				change(img, department, school_phone, school_add);
				element.setAttribute('id', '');
				if($(window).width() > 768){
					removeclass("menu_f");
				}
			}
		} else {
			removeclass("menu_s");
			element.classList.remove("active")
			element.setAttribute('id', '');
			menu_f_active = -1;
		}
	}
}
for (let i = 0; i < s_menu_s.length; i++) {
	const element = s_menu_s[i];
	element.onclick = function () {
		removeclass("menu_s");
		if($(window).width() > 768){
			removeclass("menu_f");
		}
		element.classList.add("active");
		element.setAttribute('id', 'now_page');
		let img = document.querySelector("#now_page ~ .school_menu_third img");
		let department = document.querySelector("#now_page ~ .school_menu_third .department");
		let school_phone = document.querySelector("#now_page ~ .school_menu_third .school_phone");
		let school_add = document.querySelector("#now_page ~ .school_menu_third .school_add");
		let school_int = document.querySelector("#school_int", img);
		school_int.classList.remove("active");
		change(img, department, school_phone, school_add);
	}
}



function removeclass(who) {
	if (who == "menu_s") {
		for (let i = 0; i < s_menu_s.length; i++) {
			s_menu_s[i].classList.remove("active");
			s_menu_s[i].setAttribute('id', '');
		}
	}else if(who == "menu_f"){
		menu_f_active = -1;
		for (let i = 0; i < s_menu_f.length; i++) {
			s_menu_f[i].classList.remove("active");
		}
	}
}
function change(img, department, school_phone, school_add) {
	setTimeout(function () {
		document.querySelector("#school_int img").setAttribute('src', img.getAttribute('src'));
		document.querySelector("#school_int h1").innerHTML = department.innerHTML;
		document.querySelector("#school_int h2").innerHTML = department.getAttribute('data-dep');
		document.querySelector("#school_int .school_phone").innerHTML = school_phone.innerHTML;
		document.querySelector("#school_int .school_add").innerHTML = school_add.innerHTML;
		school_int.classList.add("active");
	}, 300);
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