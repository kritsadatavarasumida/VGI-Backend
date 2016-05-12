<?php
//header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

isset($_REQUEST['streamname']) ? $stream_name = $_REQUEST['streamname'] : $stream_name = '';
$streamlist = exec('curl --digest -u wadmin:comlab03 -X PUT --header "Accept:application/json; charset=utf-8" "http://104.199.155.2:8087/v2/servers/_defaultServer_/vhosts/_defaultVHost_/streamfiles/'.$stream_name.'/actions/connect?connectAppName=vgi&appInstance=_definst_&mediaCasterType=rtp"');

echo $streamlist;

?>