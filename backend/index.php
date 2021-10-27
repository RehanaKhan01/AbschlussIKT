<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// response message
echo json_encode(
    array('message' => 'Welcome to Jewels Store Backend' )
);


?>