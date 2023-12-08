<?php

include_once("../controller/apps.php");
include_once("../controller/validator.php");

header('Content-Type: application/json; charset=utf-8');

function failedResponse() {
    echo "{\"result\": \"0\"}";
}

if(isset($_SERVER["REQUEST_METHOD"]) && $_SERVER["REQUEST_METHOD"] === "POST" &&
    isset($_POST["key"]) && !empty($_POST["key"]) &&
    isset($_POST["id"]) && !empty($_POST["id"])) {

    $key = $_POST["key"];
    if(!validateApiKey($key)) {
        failedResponse();
        return;
    }

    $id = $_POST["id"];
    if(!validateAppId($id)) {
        failedResponse();
        return;
    }

    echo shell_exec("../bin/traffic ".$key." ".$id);
    return;
}

failedResponse();

?>