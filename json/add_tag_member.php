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
$sql="select * from tbl_customer_account where username='".$username."'";
$result=mysql_query($sql) or die(mysql_error());
$row = mysql_fetch_assoc($result);
$sql="insert into tbl_tags_mapping (tid,cid) values ('".$tid."','".$row['cid']."')";
$result=mysql_query($sql) or die(mysql_error());
$num=mysql_affected_rows();
$objJSON=new mysql2json();
if ($result > 0) {
echo 1;
} else {
echo 0;
}
?>

