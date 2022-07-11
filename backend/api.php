<?php


	// Melde alle PHP-Fehler
	error_reporting(E_ALL);
	ini_set("display_errors", 1);

header("MIME-TYPE: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");


require_once("api/inc/core.php");
function checkAccess($session){
	if(!$session){
		die(
			"{access-denied: true}"
		);
	}
}

$session = AccessManagement::accessAllowed();

$action = $_GET['action'];
$json = array();

switch ($action) {
	case 'addJob':
		checkAccess($session);
	//print_r($_POST);
	//exit();
		$job = job::createFromUrl($_POST['url'], $_POST['type'], $session);
		echo(json_encode($job->getMetaInfo()));
		break;
	
	case 'removeJob':
		checkAccess($session);
		global $DBCON;
		$stmt = $DBCON->prepare("SELECT * FROM jobs where id = ? AND status <> 2 AND uid = '".$session."'");
		$stmt->bind_param("i",
			$_POST['id']
			);
		if(!$stmt)
			die($DBCON->error);
		$stmt->execute();
		$results = $stmt->get_result();
		if($obj = $results->fetch_object()){
			$job = job::createByDbObj($obj);
			$job->remove();
		}

		break;

	case 'getQueue':
		checkAccess($session);
		$queue = downloadmanager::getJobs($session);
		echo(json_encode($queue));
		break;

	case 'storeMailAddress':
		checkAccess($session);
		downloadmanager::storeMailAddress($_POST['mail'],$session);
	break;



	case 'login':
		$success = AccessManagement::login($_POST['password'], isset($_POST['remember']) && $_POST['remember']=="true") ? "true" : "false";
		echo("{\"success\":$success}");
	break;

	case 'checkLogin':
		$logged_in = $session || AccessManagement::autologin() ? "true" : "false";
		echo("{\"logged_in\":$logged_in}");
		break;

	case 'createSession':
		$success = AccessManagement::createSession($_GET['uid']) ? "true" : "false";
		echo "{\"success\":$success}";
		break;


	default:
		// code...
		break;
}