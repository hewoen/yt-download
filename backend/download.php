<?php
	// Melde alle PHP-Fehler
	error_reporting(E_ALL);
	ini_set("display_errors", 1);

require_once("api/inc/core.php");

function fileNotFound(){
	die("<h1>File was not found :(  Maybe it was already deleted.</h1>");
}

global $DBCON;
$stmt = $DBCON->prepare("SELECT * FROM jobs WHERE id=? AND status=".job::STATUS_FINISHED." AND uid=?");
$stmt->bind_param(
	"is",
	$_GET['id'],
	$_GET['auth']
);

if(!$stmt->execute()){
	die($DBCON->error);
}

$res = $stmt->get_result();

if($res->num_rows == 0){
	fileNotFound();
}

$obj = $res->fetch_object();
$job = job::createByDbObj($obj);
$metainfo = $job->getMetaInfo();

$file = $job->getPathToDownloadedFile();

if (file_exists($file)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="'.$job->getUrlEncodedFileName().'"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file));
    readfile($file);
    exit;
}
else{
	fileNotFound();
}

