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

var video_w = 0;
var video_h = 0;
var scale_w = 0;
var scale_h = 0;
var video_switch = true;
var default_menuX = 0;  //影音專區 基本位置

var now_w = $(window).width();
var now_h = $(window).height();

$(document).ready(function () {
	total_flyer = $("#flyer_group > div").length;
	total_video = $("#video_scroll li").length;
	if (now_w > 768) {
		video_w = $("#video_group .video_play").width();
		video_h = $("#video_group .video_play").height();
	} else {
		video_w = 990;
		video_h = 540;
	}


	$("#flyer_scroll ul li:first-child").addClass('on');
	$("#video_scroll ul li:first-child").addClass('on');

	leaderboard_max_move = $("#leaderboard_pic > li").length % 5;
	// 偵測螢幕寬度
	$(window).resize(function () {
		var wdth = $(window).width();
		var height = $(window).height();

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
		if (now_w != wdth) {
			if (wdth < 960 && wdth > 768) {
				scale_w = video_w + wdth - 960;
				scale_h = video_h + ((wdth - 960) * 0.6);
				$("#video_group .video_play").css("width", scale_w);
				$("#video_group .video_play").css("height", scale_h);

			} else {
				$("#video_group .video_play").css("width", "");
				$("#video_group .video_play").css("height", "");
			}
			now_w = wdth;
		} else if (now_h != height) {
			if (height < 850) {
				scale_w = video_w + ((height - 850) * (900 / 470));
				scale_h = video_h + ((height - 850));
				$("#video_group .video_play").css("width", scale_w);
				$("#video_group .video_play").css("height", scale_h);
			} else {
				$("#video_group .video_play").css("width", "");
				$("#video_group .video_play").css("height", "");
			}
			now_h = height;
		}

		// 850 880

	});

	if ($(window).width() > 768) {
		if ($(window).width() < 960) {
			scale_w = video_w + $(window).width() - 960;
			scale_h = video_h + (($(window).width() - 960) * 0.6);
			$("#video_group .video_play").css("width", scale_w);
			$("#video_group .video_play").css("height", scale_h);

		} else {
			$("#video_group .video_play").css("width", "");
			$("#video_group .video_play").css("height", "");
		}
		if ($(window).height() < 850) {
			scale_w = video_w + (($(window).height() - 850) * (900 / 470));
			scale_h = video_h + (($(window).height() - 850));
			$("#video_group .video_play").css("width", scale_w);
			$("#video_group .video_play").css("height", scale_h);
		} else {
			$("#video_group .video_play").css("width", "");
			$("#video_group .video_play").css("height", "");
		}

	}

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
		flyer_item_move = $(this).index();
		var moveX = ($("#flyer_group").width() / 2) - (($("#flyer_group > .flyer_item").width() + 30) / 2 + ($("#flyer_group > .flyer_item").width() + 30) * flyer_item_move);
		menu_moveHandler("flyer_group", moveX);
		flyer_ani();
	})

	$("#leaderboard_dots > li").click(function () {
		$("#leaderboard_dots > li").removeClass("on");
		$(this).addClass("on");
		let move = -100 * $(this).index();
		menu_moveHandler("leaderboard", move);
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
});


var menu_list = document.querySelectorAll("#menu li")
var scroll_box = document.querySelector("#scroll_box");

$("h1.logo").click(function () {
	scroll_box.scrollTo(0, -70);
})
$("#scroll_top").click(function () {
	scroll_box.scrollTo(0, -70);
})
for (let index = 0; index < menu_list.length; index++) {
	const element = menu_list[index];
	element.onclick = function () {
		let top = document.querySelector("#" + element.getAttribute('name') + "").offsetTop - 70;
		scroll_box.scrollTo(0, top);
		$("#menu_btn").toggleClass("active");
	}
}



function menu_moveHandler(who, moveX) {
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
			if (document.querySelectorAll("#menu_f ~ .school_menu_second > li").length == 1) {

				let sec_span = document.querySelector("#menu_f ~ .school_menu_second span");
				sec_span.classList.add("active");
				change("menu_f");
				element.setAttribute('id', '');
				if ($(window).width() > 768) {
					removeclass("menu_f");
				}
			}

		} else if (menu_f_active == -1) {
			element.classList.add("active");
			element.setAttribute('id', 'menu_f');
			menu_f_active = i;
			if (document.querySelectorAll("#menu_f ~ .school_menu_second > li").length == 1) {
				let sec_span = document.querySelector("#menu_f ~ .school_menu_second span");
				sec_span.classList.add("active");
				change("menu_f");
				element.setAttribute('id', '');
				if ($(window).width() > 768) {
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
		if ($(window).width() > 768) {
			removeclass("menu_f");
		}
		element.classList.add("active");
		element.setAttribute('id', 'now_page');

		change("now_page");
	}
}


function change(who) {
	if (who == "menu_f") {
		var img = document.querySelector("#menu_f ~ .school_menu_second img");
		var department = document.querySelector("#menu_f ~ .school_menu_second .department");
		var school_phone = document.querySelector("#menu_f ~ .school_menu_second .school_phone");
		var school_add = document.querySelector("#menu_f ~ .school_menu_second .school_add");
	} else if (who == "now_page") {
		var img = document.querySelector("#now_page ~ .school_menu_third img");
		var department = document.querySelector("#now_page ~ .school_menu_third .department");
		var school_phone = document.querySelector("#now_page ~ .school_menu_third .school_phone");
		var school_add = document.querySelector("#now_page ~ .school_menu_third .school_add");
	}

	school_int.classList.remove("active");

	setTimeout(function () {
		document.querySelector("#school_int img").setAttribute('src', img.getAttribute('src'));
		document.querySelector("#school_int h1").innerHTML = department.innerHTML;
		document.querySelector("#school_int h2").innerHTML = department.getAttribute('data-dep');
		document.querySelector("#school_int .school_phone").innerHTML = school_phone.innerHTML;
		document.querySelector("#school_int .school_add").innerHTML = school_add.innerHTML;
		school_int.classList.add("active");
	}, 300);
}
function removeclass(who) {
	if (who == "menu_s") {
		for (let i = 0; i < s_menu_s.length; i++) {
			s_menu_s[i].classList.remove("active");
			s_menu_s[i].setAttribute('id', '');
		}
	} else if (who == "menu_f") {

		for (let i = 0; i < s_menu_f.length; i++) {
			s_menu_f[i].classList.remove("active");
		}
	}
}

const flyer_group = document.querySelector("#flyer_group");
let startX = 0;
let startTime = 0;
let move = 0;
const startDrag = function (e) {
	flyer_group.classList.add("active");
	startX =e.touches[0].pageX;
	startTime = new Date().getTime();
}
const dragHandler = function (e) {
	if (flyer_group.classList.contains("active")) {
		move = e.touches[0].pageX - startX;
	}
}
const stopDrog = function (e) {
	flyer_group.classList.remove("active");
	if ( move > 10 && $(window).width() <= 768) {
		flyer_item_move --
		if(flyer_item_move >= 0){
			var moveX = ($("#flyer_group").width() / 2) - (($("#flyer_group > .flyer_item").width() + 30) / 2 + ($("#flyer_group > .flyer_item").width() + 30) * flyer_item_move);
			menu_moveHandler("flyer_group", moveX);
			flyer_ani();
		}else{
			flyer_item_move = 0
		}
	
	} else if (move < -10  && $(window).width() <= 768) {
		flyer_item_move ++;
		if( flyer_item_move < $("#flyer_dots > li").length){			
			var moveX = ($("#flyer_group").width() / 2) - (($("#flyer_group > .flyer_item").width() + 30) / 2 + ($("#flyer_group > .flyer_item").width() + 30) * flyer_item_move);
			menu_moveHandler("flyer_group", moveX);
			flyer_ani();
		}else{
			flyer_item_move = $("#flyer_dots > li").length - 1 ;
		}
	
	}
	move = 0
}



flyer_group.addEventListener('touchstart', startDrag);
flyer_group.addEventListener('touchmove', dragHandler);
flyer_group.addEventListener('touchend', stopDrog);

