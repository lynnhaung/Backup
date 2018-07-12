<?php
require("php/my_functions.php");
check_user_logined();
$username = get_username_from_cookie();
if ($username === NULL) {
	$username = "您尚未登入";
} 
else {
	$group = get_user_team($username);
	session_start();
	$_SESSION["discuss_user_name"] = $username;
	$_SESSION["discuss_group_name"] = $group;
	$_COOKIE["discuss_user_name"] = $username;
	$_COOKIE["discuss_group_name"] = $group;
	
	$username = $username . " (" . $group . "組) 同學您好";
	
}

?>
<!DOCTYPE html>
<html>

<head>
    <title>
        核能發電討論課程
    </title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <!-- Script Here -->
    <script src="jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="/google-analytics/config/exp-snifs-2018.js" type="text/javascript"></script>

    <!-- CSS Here -->
    <link rel="stylesheet" href="css/main.css" />
	<link rel="stylesheet" href="css/article.css" />
	<link rel="stylesheet" href="css/google-custom-search.css" />
    <link rel="stylesheet" type="text/css" href="semantic-ui/semantic.min.css">
    <!-- bootstrap Here -->
	<!--
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
	-->
</head>

<body>
	<div class="ui stackable menu">
	<div class="item">
		<h1 class="ui header" ondblclick="show_submit_report();">SNIFS</h1>
	</div>
	<div class="item">
		<?php echo $username ?>
	</div>
	<?php
		if (!(isset($_GET["mode"]) && $_GET["mode"] === "ctl")) {
			?>
		<div class="item">
			<button id="btn_snifs_switch_person" class="ui left attached button" onclick="open_snifs('personal');">個人</button>
		    <button id="btn_snifs_switch_group" class="right attached ui button" onclick="open_snifs('group');">小組</button>
		</div>
	<?php
		}
		?>
	<div class="item">
		<button id="btnArticles" class="ui left attached button" onclick="$('#report_guide').show();">報告格式</button>
		<button id="btnArticles" class="right attached ui button" onclick="$('#articleCard').show();">閱讀教材</button>
	</div>
	<div class="item">
		<!--
		<button id="btnDiscuss" class="ui left attached button">課程討論</button>
		<button id="btnTop" class="right attached ui button">跳到頁首</button>
		-->
		<button id="btnTop" class="ui button">討論區頁首</button>
	</div>
	<div class="item" id="submit_report_li" style="display: none;">
		<a href="/mod/assign/view.php?id=567&action=editsubmission" target="submit_report">
			<button id="btnWiki" class="ui primary button">繳交報告</button>
		</a>
		
	</div>
	<div class="right menu">
		<div class="item" id="external_search">
			<script>
			  (function() {
				var cx = '012091320069094462577:_4-dlv4dpxm';
				var gcse = document.createElement('script');
				gcse.type = 'text/javascript';
				gcse.async = true;
				gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(gcse, s);
			  })();
			</script>
			<gcse:search></gcse:search>
		</div>
	</div>
</div>

    <div class="MainContainer ui grid">
		<?php
		if (isset($_GET["mode"]) && $_GET["mode"] === "ctl") {
			?>
			<div class="eight wide column">
				<iframe id="discuss" name="discuss" class="frameBox" src="/mod/hsuforum/view.php?id=564&group=0" scrolling="yes"></iframe>
			</div>
			<?php
		}
		else {
			?>

			<div class="eight wide column">
				<iframe name="snifs" class="frameBox" id="snifs" src="/snifs-personal-layout/snifs-personal-layout.php?layout=personal" scrolling="yes"></iframe>
			</div>
			<div class="eight wide column">
				<iframe id="discuss" name="discuss" class="frameBox" src="/mod/hsuforum/view.php?id=564" scrolling="yes"></iframe>
			</div>
			<?php
		}
		?>
    </div>

    <div class="popupArticle" id="articleCard">
        <div class="article-content">
			<span id="btnClose" onclick="$(this).parents('.popupArticle:first').hide();">&times;</span>
			<?php echo file_get_contents("reading_article.html") ?>
        </div>
    </div>
	
	<div class="popupArticle" id="report_guide">
        <div class="article-content">
			<span id="btnClose" onclick="$(this).parents('.popupArticle:first').hide();">&times;</span>
			<?php echo file_get_contents("report_guide.html") ?>
        </div>
    </div>
	
	<!-- ------------------------------------ -->
	<script type="text/javascript" src="js/script.js"></script> 
    <script src="semantic-ui/semantic.min.js" type="text/javascript"></script>
</body>

</html>
