<?php
class NotificationMail implements MailTemplate{
	private $uid;

	function __construct($props){
		$this->uid = $props['uid'];
	}

	public function getSender(){
		return "From: noreply@yt-download.woenne.de";
	}

	public function getSubject(){
		return "Your download jobs are finished";
	}

	public function getHtml(){
		$link = BASEURL."login/".$this->uid;
		return 
		"<h1>Download jobs finished</h1>\n".
		"Your download jobs at ".BASEURL." are finished. Click the following link to get your clips:<br>\n".
		"<a href='$link'>$link</a>";
	}
}