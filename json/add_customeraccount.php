<?php
include('mysql2json.class.php');
include('connect.php');
?>

<?php
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
$num=0;
isset($_REQUEST['username']) ? $username = $_REQUEST['username'] : $username = '';
isset($_REQUEST['email']) ? $email = $_REQUEST['email'] : $email = '';
isset($_REQUEST['phone']) ? $phone = $_REQUEST['phone'] : $phone = '';
isset($_REQUEST['vgi']) ? $vgi = $_REQUEST['vgi'] : $vgi = '';
isset($_REQUEST['password']) ? $password = $_REQUEST['password'] : $password = '';
isset($_REQUEST['contact1']) ? $contact1 = $_REQUEST['contact1'] : $contact1 = '';
isset($_REQUEST['contact2']) ? $contact2 = $_REQUEST['contact2'] : $contact2 = '';
isset($_REQUEST['contact3']) ? $contact3 = $_REQUEST['contact3'] : $contact3 = '';
isset($_REQUEST['contact4']) ? $contact4 = $_REQUEST['contact4'] : $contact4 = '';
isset($_REQUEST['mobile1']) ? $mobile1 = $_REQUEST['mobile1'] : $mobile1 = '';
isset($_REQUEST['mobile2']) ? $mobile2 = $_REQUEST['mobile2'] : $mobile2 = '';
isset($_REQUEST['mobile3']) ? $mobile3 = $_REQUEST['mobile3'] : $mobile3 = '';
isset($_REQUEST['mobile4']) ? $mobile4 = $_REQUEST['mobile4'] : $mobile4 = '';
isset($_REQUEST['company_name']) ? $company_name = $_REQUEST['company_name'] : $company_name = '';
isset($_REQUEST['company_description']) ? $company_description = $_REQUEST['company_description'] : $company_description = '';
isset($_REQUEST['company_logo']) ? $company_logo = $_REQUEST['company_logo'] : $company_logo = '';


$sql="insert into tbl_customer_account (username,person1,person2,person3,person4,mobile1,mobile2,mobile3,mobile4,email,phone,vgi,password,company_name,company_description,company_logo) values ('";
$sql=$sql.$username."','".$contact1."','".$contact2."','".$contact3."','".$contact4."','".$mobile1."','".$mobile2."','".$mobile3."','".$mobile4."','".$email."','".$phone."','".$vgi."','".$password."','".$company_name."','".$company_description."','".$company_logo."')";
$result=mysql_query($sql) or die(mysql_error());
$num=mysql_affected_rows();
$objJSON=new mysql2json();
print(trim($objJSON->getJSON($result,$num)));
?>

