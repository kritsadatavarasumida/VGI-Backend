<?php
include('mysql2json.class.php');
include('connect.php');
?>

<?php
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
$num=0;
isset($_REQUEST['hashedpassword']) ? $hashedpassword = $_REQUEST['hashedpassword'] : $hashedpassword = '';
isset($_REQUEST['username']) ? $username = $_REQUEST['username'] : $username = '';
$sql="select * from tbl_customer_account where password = '".$hashedpassword."' and username = '".$username."' and enabled=1";
$result=mysql_query($sql) or die(mysql_error());
$num=mysql_affected_rows();
if ($num > 0) {
    $lastlogin = "update tbl_system_account set lastlogin = now() where username='".$username."'";
    $res=mysql_query($lastlogin);
}
$objJSON=new mysql2json();
print(trim($objJSON->getJSON($result,$num)));
?>

