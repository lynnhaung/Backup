<?php
$enableEcho = true;

header("Content-Type:text/html; charset=utf-8");

//斷詞
ini_set('memory_set', '64M');

require_once "./jieba/src/class/Jieba.php";
require_once "./jieba/src/class/Finalseg.php";
//斷詞+詞性
require_once "./jieba/src/class/Posseg.php";
require_once "./jieba/src/vendor/multi-array/MultiArray.php";
require_once "./jieba/src/vendor/multi-array/Factory/MultiArrayFactory.php";

use Fukuball\Jieba\Jieba;
use Fukuball\Jieba\Finalseg;
//斷詞+詞性
use Fukuball\Jieba\Posseg;
Jieba::init();
Finalseg::init();
//斷詞+詞性
Posseg::init();

//資料庫連接 (MySQL _ Moodle)
$dbhost = 'localhost:3306';
$dbuser = 'root';
$dbpass = 'la2391';
$dbname = 'moodle';

$conn = mysql_connect($dbhost, $dbuser, $dbpass) ;
mysql_query("SET NAMES 'UTF8'");
mysql_select_db($dbname);

if (!$conn) {
	die(' 連線失敗，輸出錯誤訊息 : ' . mysql_error());
}

//抓當前最新 討論區post_id
$sql_newid = "SELECT post_id AS source_id FROM discussion_snifs_all ORDER BY source_id DESC LIMIT 1";
$result_newid = mysql_query($sql_newid);
$row_newid = mysql_fetch_row($result_newid);

$new_id = $row_newid[0];

//抓目前斷詞最新ID
$sql_old_anno_id = "SELECT source_id FROM snifs_jiebacut ORDER BY id DESC LIMIT 1";
$result_old_anno_id = mysql_query($sql_old_anno_id);
$old_id_row = mysql_fetch_row($result_old_anno_id);

if($old_id_row == ""){
    //抓討論區資料
    $sql_hsuforum = "SELECT post_id AS source_id, account AS user_account, discussion_id AS source, message AS tocut FROM discussion_snifs_all ORDER BY source_id ASC";
    $result_hsuforum = mysql_query($sql_hsuforum);
    $num_hsuforum = mysql_num_rows($result_hsuforum);

    for ($i = 0; $i < $num_hsuforum; $i++){
        $user_account = "user_account"."$i";
        $source = "source"."$i";
        $source_id = "source_id"."$i";
        $toCut = "toCut"."$i";

        while($row_hsuforum = mysql_fetch_row($result_hsuforum)){
            $$user_account = $row_hsuforum[1];
            //echo $$user_account;
            switch ($row_hsuforum[2]){
                case "2":
                    $$source = "D";
                    break;
                case "3":
                    $$source = "A";
                    break;
                case "4":
                    $$source = "B";
                    break;
                case "5":
                    $$source = "C";
                    break;

            }
            $$source_id = $row_hsuforum[0];
            $$toCut = strip_tags($row_hsuforum[3]);

            //斷詞
            $seg_list = "seg_list"."$i";
            $$seg_list = Posseg ::cut($$toCut);
//            sleep(1);
            
            foreach ($$seg_list as $cutComplete){
                $sql_insert = "INSERT INTO snifs_jiebacut (user_account, source, source_id, words, tag) VALUES ('".$$user_account."','".$$source."',".$$source_id.",'".$cutComplete['word']."','".$cutComplete['tag']."')";
                $result_insert = mysql_query($sql_insert);
                //sleep(1);
            }
            sleep(1);
        }
    }
    echo "First Time Use.";
}else{
    $old_id = $old_id_row[0];

    if($new_id == $old_id){

		if ($enableEcho === true) {
        echo "No New Data";
		}
	}
	else{
        //抓新資料筆數
        $sql_hsuforum = "SELECT COUNT(post_id) FROM discussion_snifs_all WHERE post_id > $old_id ORDER BY post_id DESC";
        $result_hsuforum = mysql_query($sql_hsuforum);
        $num_hsuforum = mysql_num_rows($result_hsuforum);

        //抓討論區資料
        $sql_hsuforum = "SELECT post_id AS source_id, account AS user_account, discussion_id AS source, message AS tocut FROM discussion_snifs_all WHERE post_id > $old_id ORDER BY source_id ASC";
        $result_hsuforum = mysql_query($sql_hsuforum);
        $num_hsuforum = mysql_num_rows($result_hsuforum);

        for ($i = 0; $i < $num_hsuforum; $i++){
            $user_account = "user_account"."$i";
            $source = "source"."$i";
            $source_id = "source_id"."$i";
            $toCut = "toCut"."$i";

            while($row_hsuforum = mysql_fetch_row($result_hsuforum)){
                $$user_account = $row_hsuforum[1];
                //echo $$user_account;
                switch ($row_hsuforum[2]){
                    case "2":
                        $$source = "D";
                        break;
                    case "3":
                        $$source = "A";
                        break;
                    case "4":
                        $$source = "B";
                        break;
                    case "5":
                        $$source = "C";
                        break;

                }
                $$source_id = $row_hsuforum[0];
                $$toCut = strip_tags($row_hsuforum[3]);

                //斷詞
                $seg_list = "seg_list"."$i";
                $$seg_list = Posseg ::cut($$toCut);
                sleep(1);
                
                foreach ($$seg_list as $cutComplete){
                    $sql_insert = "INSERT INTO snifs_jiebacut (user_account, source, source_id, words, tag) VALUES ('".$$user_account."','".$$source."',".$$source_id.",'".$cutComplete['word']."','".$cutComplete['tag']."')";
                    $result_insert = mysql_query($sql_insert);
                    //sleep(1);
                }
                sleep(1);
            }
        }
        if ($enableEcho === true) {
			echo "Data Updated";
		}
    }
}


mysql_close($conn);
?>
