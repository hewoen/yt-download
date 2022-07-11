<?php
	const HOMEDIR = "/home/yt-download/www/api/";
	const BASEURL = "http://yt-download.woenne.de/";
	require(HOMEDIR."inc/db.inc.php");
	require(HOMEDIR."inc/classes/job.class.php");
	require(HOMEDIR."inc/classes/downloadmanager.class.php");
	require(HOMEDIR."inc/classes/AccessManagement.class.php");
	require(HOMEDIR."inc/classes/MailTemplate.interface.php");