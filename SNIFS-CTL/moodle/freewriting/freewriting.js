$(".forumng-post-outerbox:first").each(function (_i, _post) {
	_post = $(_post);
	var _a = _post.find(".forumng-replylink > a");
	var _url = _a.attr("href");
	//editpost.php?replyto=20
	var _replyto = _url.substr(_url.lastIndexOf("replyto=")+8);
	// 20
	$("body").append('<iframe class="forumng-inlineform" height="627" src="editpost.php?replyto=' + _replyto + '&iframe=1&mode=discuss" width="100%"></iframe>');
});


$(document).ready(function(){
	var count = $(".forumng-replies .forumng-post:not(.others):not(.deleted) .forumng-message").text().length;
	$(".forumng-post.forumng-full.forumng-read.forumng-p1").after('<div class = "your_writing">你的寫作內容 [總字數：' +count+ ' 個字]</div>');
	$(".forumng-expandtext").click();
	$("#id_submitbutton").val("儲存");
});

function iframe_has_loaded() {
	//window.location.reload();
}

/*$(function () {
	var count = $(".forumng-replies .forumng-message").text().length;
	//計算字串長度
	$("body").after('<div class="counter">總字數：' +count+ ' 個字</div>');
	//放在body中顯示字串長度
});
*/

/*
$(function () {
	
$(".forumng-expandtext").click();
$("#id_submitbutton").val("儲存");

});
*/







