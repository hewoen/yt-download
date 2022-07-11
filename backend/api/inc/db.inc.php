<?php
function db_error($stmt){
	if(!$stmt){
		global $DBCON;
		die($DBCON->error);
	}
}

define("DB_HOST", "localhost"); 
define("DB_USER", "yt_download"); 
define("DB_DATABASE", "yt_download");
define("DB_PASS", "Banane!97"); 
global $DBCON;
$DBCON = new mysqli(DB_HOST, DB_USER, DB_PASS,DB_DATABASE);
?>
