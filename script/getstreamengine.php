<?php
include('/var/www/html/streammgmt/json/mysql2json.class.php');
include('/var/www/html/streammgmt/json/connect.php');
?>

<?php

//header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$result = exec("service WowzaStreamingEngine status 2> /dev/null | grep Active: | cut -d' ' -f 5");

if ($result == "active" ) {
echo 1;
} else {
echo 0;
}
?>

