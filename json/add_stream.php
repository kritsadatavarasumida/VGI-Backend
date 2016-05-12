<?php
//header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
$streamlist = "";
$streamlist2 = "";
$streamlist3 = "";
$i = 0;

isset($_REQUEST['streamname']) ? $stream_name = $_REQUEST['streamname'] : $stream_name = '';
isset($_REQUEST['streamurl']) ? $stream_url = $_REQUEST['streamurl'] : $stream_url = '';
$streamlist = exec('curl --digest -u wadmin:comlab03 -X POST --header "Accept:application/json; charset=utf-8" --header "Content-type:application/json; charset=utf-8" "http://104.199.155.2:8087/v2/servers/_defaultServer_/vhosts/_defaultVHost_/applications/vgi/streamfiles/'.$stream_name.'" -d "{\"restURI\": \"http://104.199.155.2:8087/v2/servers/_defaultServer_/vhosts/_defaultVHost_/applications/vgi/streamfiles\",\"streamFiles\": [{\"id\": \"connectAppName=vgi&appInstance=_definst_&mediaCasterType=rtp\",\"href\": \"http://104.199.155.2:8087/v2/servers/_defaultServer_/vhosts/_defaultVHost_/applications/vgi/streamfiles/connectAppName=vgi&appInstance=_definst_&mediaCasterType=rtp\"}]}"');

while ( $i == 0 ) {

    if (substr($streamlist,11,4) == "true") {
        $streamlist2 = exec('curl --digest -u wadmin:comlab03 -X PUT --header "Accept:application/json; charset=utf-8" --header "Content-type:application/json; charset=utf-8" "http://104.199.155.2:8087/v2/servers/_defaultServer_/vhosts/_defaultVHost_/applications/vgi/streamfiles/'.$stream_name.'/adv" -d"{\"restURI\": \"http://104.199.155.2:8087/v2/servers/_defaultServer_/vhosts/_defaultVHost_/applications/vgi/streamfiles/'.$stream_name.'/adv\",\"version\": \"1430601267443\",\"advancedSettings\": [{\"enabled\": true,\"canRemove\": true,\"name\": \"uri\",\"value\": \"'.$stream_url.'\",\"defaultValue\": null,\"type\": \"String\",\"sectionName\": \"Common\",\"section\": null,\"documented\": true},{\"enabled\": true,\"canRemove\": true,\"name\": \"streamTimeout\",\"value\": \"0\",\"defaultValue\": \"12000\",\"type\": \"Integer\",\"sectionName\": \"Common\",\"section\": null,\"documented\": true},{\"enabled\": true,\"canRemove\": true,\"name\": \"reconnectWaitTime\",\"value\": \"0\",\"defaultValue\": "3000",\"type\": \"Integer\",\"sectionName\": \"Common\",\"section\": null,\"documented\": true}]}"');
        $streamlist = "";


    } else {
        echo substr($streamlist,11,4);
        echo 0;

    }
    if (substr($streamlist2,11,4) == "true") {
        $streamlist3 = exec('curl --digest -u wadmin:comlab03 -X PUT --header "Accept:application/json; charset=utf-8" "http://104.199.155.2:8087/v2/servers/_defaultServer_/vhosts/_defaultVHost_/streamfiles/'.$stream_name.'/actions/connect?connectAppName=vgi&appInstance=_definst_&mediaCasterType=rtp"');
        $streamlist2 = "";

    } else {
        echo 0;
    }
    if (substr($streamlist3,11,4) == "true") {
        $i=1;
        $streamlist3 = "";
        echo 1;
    } else {
        echo 0;
    }
}



?>



