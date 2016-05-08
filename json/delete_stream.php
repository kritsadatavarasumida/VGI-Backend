<?php
//header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
$i=0;
isset($_REQUEST['streamname']) ? $stream_name = $_REQUEST['streamname'] : $stream_name = '';
$streamlist = exec('curl --digest -u wadmin:comlab03 -X PUT --header "Accept:application/json; charset=utf-8" "http://192.168.158.132:8087/v2/servers/_defaultServer_/vhosts/_defaultVHost_/applications/vgi/instances/_definst_/incomingstreams/'.$stream_name.'.stream/actions/disconnectStream"');

while ( $i == 0 ) {

    if (substr($streamlist,11,4) == "true") {
        $i = 1;

        $streamlist = exec('curl --digest -u wadmin:comlab03 -X DELETE --header "Accept:application/json; charset=utf-8" "http://192.168.158.132:8087/v2/servers/_defaultServer_/vhosts/_defaultVHost_/applications/vgi/streamfiles/'.$stream_name.'"');

    }
}
echo $streamlist;


?>