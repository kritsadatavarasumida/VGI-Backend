<?php
include('mysql2json.class.php');
include('connect.php');
?>

<?php
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
$num=0;
isset($_REQUEST['cid']) ? $cid = $_REQUEST['cid'] : $cid = '';
isset($_REQUEST['username']) ? $username = $_REQUEST['username'] : $username = '';
isset($_REQUEST['company_name']) ? $company_name = $_REQUEST['company_name'] : $company_name = '';
isset($_REQUEST['company_logo']) ? $company_logo = $_REQUEST['company_logo'] : $company_logo = '';
isset($_REQUEST['company_description']) ? $company_description = $_REQUEST['company_description'] : $company_description = '';
isset($_REQUEST['mobile1']) ? $mobile1 = $_REQUEST['mobile1'] : $mobile1 = '';
isset($_REQUEST['mobile2']) ? $mobile2 = $_REQUEST['mobile2'] : $mobile2 = '';
isset($_REQUEST['mobile3']) ? $mobile3 = $_REQUEST['mobile3'] : $mobile3 = '';
isset($_REQUEST['mobile4']) ? $mobile4 = $_REQUEST['mobile4'] : $mobile4 = '';
isset($_REQUEST['person1']) ? $person1 = $_REQUEST['person1'] : $person1 = '';
isset($_REQUEST['person2']) ? $person2 = $_REQUEST['person2'] : $person2 = '';
isset($_REQUEST['person3']) ? $person3 = $_REQUEST['person3'] : $person3 = '';
isset($_REQUEST['person4']) ? $person4 = $_REQUEST['person4'] : $person4 = '';
isset($_REQUEST['email']) ? $email = $_REQUEST['email'] : $email = '';
isset($_REQUEST['phone']) ? $phone = $_REQUEST['phone'] : $phone = '';
isset($_REQUEST['password']) ? $password = $_REQUEST['password'] : $password = '';
if ($password != '') {
    $sql="update tbl_system_account set password ='".$password."' where cid = '".$cid."'";
}
$result=mysql_query($sql) or die(mysql_error());
if ($username != '') {
    $sql="update tbl_system_account set username ='".$username."' where cid = '".$cid."'";
}
$result=mysql_query($sql) or die(mysql_error());
if ($company_name != '') {
    $sql="update tbl_system_account set company_name ='".$company_name."' where cid = '".$cid."'";
}
$result=mysql_query($sql) or die(mysql_error());
if ($company_logo != '') {
    $sql="update tbl_system_account set company_logo ='".$company_logo."' where cid = '".$cid."'";
}
$result=mysql_query($sql) or die(mysql_error());
if ($company_description != '') {
    $sql="update tbl_system_account set company_description ='".$company_description."' where cid = '".$cid."'";
}
$result=mysql_query($sql) or die(mysql_error());
if ($mobile1 != '') {
    $sql="update tbl_system_account set mobile1 ='".$mobile1."' where cid = '".$cid."'";
}
$result=mysql_query($sql) or die(mysql_error());
if ($mobile2 != '') {
    $sql="update tbl_system_account set mobile2 ='".$mobile2."' where cid = '".$cid."'";
}
$result=mysql_query($sql) or die(mysql_error());
if ($mobile3 != '') {
    $sql="update tbl_system_account set mobile3 ='".$mobile3."' where cid = '".$cid."'";
}
$result=mysql_query($sql) or die(mysql_error());
if ($mobile4 != '') {
    $sql="update tbl_system_account set mobile4 ='".$mobile4."' where cid = '".$cid."'";
}
$result=mysql_query($sql) or die(mysql_error());
if ($person1 != '') {
    $sql="update tbl_system_account set person1 ='".$person1."' where cid = '".$cid."'";
}
$result=mysql_query($sql) or die(mysql_error());
if ($person2 != '') {
    $sql="update tbl_system_account set person2 ='".$person2."' where cid = '".$cid."'";
}
$result=mysql_query($sql) or die(mysql_error());
if ($person3 != '') {
    $sql="update tbl_system_account set person3 ='".$person3."' where cid = '".$cid."'";
}
$result=mysql_query($sql) or die(mysql_error());
if ($person4 != '') {
    $sql="update tbl_system_account set person4 ='".$person4."' where cid = '".$cid."'";
}
$result=mysql_query($sql) or die(mysql_error());
if ($email != '') {
    $sql="update tbl_system_account set email ='".$email."' where cid = '".$cid."'";
}
$result=mysql_query($sql) or die(mysql_error());
if ($phone != '') {
    $sql="update tbl_system_account set phone ='".$phone."' where cid = '".$cid."'";
}
$result=mysql_query($sql) or die(mysql_error());
$num=mysql_affected_rows();
$objJSON=new mysql2json();
print(trim($objJSON->getJSON($result,$num)));
?>

