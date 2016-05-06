<?php
include('mysql2json.class.php');
include('connect.php');
?>

<?php
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
$num=0;
isset($_REQUEST['firstname']) ? $firstname = $_REQUEST['firstname'] : $firstname = '';
isset($_REQUEST['lastname']) ? $lastname = $_REQUEST['lastname'] : $lastname = '';
isset($_REQUEST['username']) ? $username = $_REQUEST['username'] : $username = '';
isset($_REQUEST['password']) ? $password = $_REQUEST['password'] : $password = '';
$sql="insert into tbl_system_account (firstname,lastname,username,enabled,password) values ('".$firstname."','".$lastname."','".$username."',1,'".$password."')";
$result=mysql_query($sql) or die(mysql_error());
$num=mysql_affected_rows();
$objJSON=new mysql2json();
print(trim($objJSON->getJSON($result,$num)));
?>

