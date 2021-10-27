<?php
// Turn off all error reporting
error_reporting(0);

//  Include DB-Class
include_once '../config/database.php';

// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Instantiate DB & connect
$database = new Database();
$dbConn = $database->connect();
?>