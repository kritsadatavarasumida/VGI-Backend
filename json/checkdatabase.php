<?php

ob_start();
isset($_REQUEST['command']) ? $command = $_REQUEST['command'] : $command = '';
passthru('service '.$command.' status');
$status = ob_get_clean();
//echo $status;

$token = strtok($status, ":");
//echo $token;
$token = strtok(":");
//echo $token;
$token = strtok(":");
//echo $token;
$token = strtok("\n");
$message = $token;
$token = strtok($token,' ');
//echo $token;
if ($token == 'active') {
    $arr = array('service' => $command, 'status' => $token, 'reason' => $message);
} else {
    $arr = array('service' => $command, 'status' => 'error', 'reason' => 'unknown');
}

echo json_encode($arr);

?>