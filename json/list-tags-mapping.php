<?php
include('mysql2json.class.php');
include('connect.php');
?>

<?php
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
$num=0;
isset($_REQUEST['tid']) ? $tid = $_REQUEST['tid'] : $tid = '';
isset($_REQUEST['username']) ? $username = $_REQUEST['username'] : $username = '';
if ($tid != '' && $username != '' ) {
$sql="select * from v_tags_customer where tid='".$tid."' and username='".$username."'";

} else {
$sql="select * from v_tags_customer order by id";
}
$result=mysql_query($sql) or die(mysql_error());
$num=mysql_affected_rows();
$objJSON=new mysql2json();
print(trim($objJSON->getJSON($result,$num)));
?>

