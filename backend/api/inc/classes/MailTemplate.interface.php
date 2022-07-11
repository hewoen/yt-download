<?php
const MIME_TYPE_HTML = "Content-Type: text/html";
interface MailTemplate{
	function __construct($props);
	public function getSubject();
	public function getHtml();
	public function getSender();

}