<?php
include('mysql2json.class.php');
include('connect.php');
?>

<?php
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
$num=0;
isset($_REQUEST['tagname']) ? $tagname = $_REQUEST['tagname'] : $tagname = '';
$sql="insert into tbl_tags (tag_name) values ('".$tagname."')";
$result=mysql_query($sql) or die(mysql_error());
$num=mysql_affected_rows();
$objJSON=new mysql2json();
print(trim($objJSON->getJSON($result,$num)));
?>

