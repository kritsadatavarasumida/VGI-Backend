<?php
ob_start();
include('/var/www/html/streammgmt/json/mysql2json.class.php');
include('/var/www/html/streammgmt/json/connect.php');
?>

<?php

//header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$streamlist = exec('curl --digest -u wadmin:comlab03 -s -X GET --header "Accept:application/json; charset=utf-8" "http://104.199.155.2:8087/v2/servers/_defaultServer_/vhosts/_defaultVHost_/applications/vgi/monitoring/current"');

$streamlist;

$token = strtok($streamlist, ",");
$i=0;
while ($token != false)
{
if ($i==4) {
    //echo $token;
    $bytein = substr($token,14);
    //echo $bytein;
}
if ($i==5) {
    //echo $token;
    $byteout = substr($token,15);
    //echo $byteout;

}
if ($i==6) {
    //echo $token;
    $connection = substr($token,19);
    //echo $connection;
}


$token = strtok(",");
$i++;
}

$sql="insert into tbl_current_usage (bytein,byteout,connection) values ('".$bytein."','".$byteout."','".$connection."')";
$result=mysql_query($sql) or die(mysql_error());
?>

