<?php
include('mysql2json.class.php');
include('connect.php');
?>

<?php
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
$num=0;
isset($_REQUEST['tid']) ? $tid = $_REQUEST['tid'] : $tid = '';
isset($_REQUEST['tagname']) ? $tagname = $_REQUEST['tagname'] : $tagname = '';

$sql="update tbl_tags set tag_name = '".$tagname."' where tid = '".$tid."'";

$result=mysql_query($sql) or die(mysql_error());
$num=mysql_affected_rows();
$objJSON=new mysql2json();
print(trim($objJSON->getJSON($result,$num)));
?>

