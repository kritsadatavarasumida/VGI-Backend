<?php
include('mysql2json.class.php');
include('connect.php');
?>

<?php
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
$num=0;
isset($_REQUEST['uid']) ? $uid = $_REQUEST['uid'] : $uid = '';
isset($_REQUEST['firstname']) ? $firstname = $_REQUEST['firstname'] : $firstname = '';
isset($_REQUEST['lastname']) ? $lastname = $_REQUEST['lastname'] : $lastname = '';
isset($_REQUEST['status']) ? $status = $_REQUEST['status'] : $status = '';
isset($_REQUEST['password']) ? $password = $_REQUEST['password'] : $password = '';
if ($password != '') {
    $sql="update tbl_system_account set firstname = '".$firstname."', lastname = '".$lastname."', enabled = '".$status."', password ='".$password."' where uid = '".$uid."'";
} else {
    $sql="update tbl_system_account set firstname = '".$firstname."', lastname = '".$lastname."', enabled = '".$status."' where uid = '".$uid."'";
}
$result=mysql_query($sql) or die(mysql_error());
$num=mysql_affected_rows();
$objJSON=new mysql2json();
print(trim($objJSON->getJSON($result,$num)));
?>

