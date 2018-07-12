
//alert($(".forumng-replylink > a").length);
//$(".forumng-replylink > a").click();

$(".forumng-post-outerbox:first").each(function (_i, _post) {
	_post = $(_post);
	var _a = _post.find(".forumng-replylink > a");
	var _url = _a.attr("href");
	//editpost.php?replyto=20
	var _replyto = _url.substr(_url.lastIndexOf("replyto=")+8);
	//alert(_replyto);
	// 20
	_post.append('<iframe class="forumng-inlineform" height="627" src="editpost.php?replyto=' + _replyto + '&iframe=1&mode=discuss" width="100%"></iframe>');
});


$(function () {
	
	$(".forumng-expandtext").click();
	$("#id_submitbutton").val("儲存");
	// $("#id_submitbutton").click(function() {
		// setTimeout( function () { 
			// window.top.location.reload();//
		// }, 1000);
	// });
	
	
	var _loading_placeholder = $('<div class="loading-placeholder"><img src="/freewriting/spin.gif" /><br />讀取中</div>');
	_loading_placeholder.css({
		"text-align": "center",
		"font-size": "1rem",
		"font-weight": "bold",
	});
	
	_loading_placeholder.appendTo($(".forumng-post-outerbox:first"));
	
	$(".forumng-post-outerbox iframe").on("load", function () {
		$(".forumng-post-outerbox iframe").on("load", function () {
			setTimeout(function () {
				$(".forumng-post-outerbox").addClass("show-iframe");
				_loading_placeholder.remove();
			}, 1000);
		});
	});
	
});

function iframe_has_loaded() {
	//window.location.reload();
}








