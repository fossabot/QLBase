<?php

include_once("../controller/apps.php");
include_once("../controller/db_config.php");
include_once("../controller/session_ctrl.php");
include_once("../controller/validator.php");

if(!(isset($_COOKIE["sess_id"]) &&
    !empty($_COOKIE["sess_id"]) &&
    validateSession($_COOKIE["sess_id"]))) {
    http_response_code(403);
    return;
}

function jsonContentResponse() {
    header("Content-Type: application/json; charset=utf-8");
}

function failedResponse() {
    jsonContentResponse();
    echo "{\"result\": \"0\"}";
}

function successResponse() {
    jsonContentResponse();
    echo "{\"result\": \"1\"}";
}

if(isset($_GET["fetch"]) && empty($_GET["fetch"])) {
    jsonContentResponse();
    echo "{\"result\": \"1\", \"apps\": {";

    $str = "";
    foreach(getAppsOfCurrentUser() as $app) {
        $str .= "\"".$app[0]."\": \"".$app[1]."\",";
    }

    $str = substr($str, 0, strlen($str) - 1);
    echo $str."}}";
    return;
}
else if(isset($_GET["create"]) && empty($_GET["create"]) &&
    isset($_POST["name"]) && !empty($_POST["name"])) {

    $name = $_POST["name"];
    if(!validateAppName($name)) {
        failedResponse();
        return;
    }

    if(addNewApp($name))
        successResponse();
    else failedResponse();
    return;
}

http_response_code(403);

?>