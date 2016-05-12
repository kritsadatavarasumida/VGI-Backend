<?php
//header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

isset($_REQUEST['streamname']) ? $stream_name = $_REQUEST['streamname'] : $stream_name = '';
$streamlist = exec('curl --digest -u wadmin:comlab03 -X GET --header "Accept:application/json; charset=utf-8" "http://104.199.155.2:8087/v2/servers/_defaultServer_/vhosts/_defaultVHost_/applications/vgi/instances/_definst_/incomingstreams/'.$stream_name.'.stream"');

echo $streamlist;

?>