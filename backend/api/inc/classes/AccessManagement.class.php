<?php
class AccessManagement{

	private const PASSWORD = "r2d2c3po";
	private const NAME_REMEMBER_COOKIE = "password";
	private const EXPIRE_REMEMBER_COOKIE_IN_SECONDS = 28*24*3600;
	private const NAME_OF_SESSION = "logged_in";

	private static bool $session_started=false;


	private static function startSession(){
		if (!self::$session_started){
			session_start();
			self::$session_started = true;
		}
	}


	public static function accessAllowed(){
		self::startSession();
		if(isset($_SESSION[self::NAME_OF_SESSION])){
			return $_SESSION[self::NAME_OF_SESSION];
		}

		return false;
	}


	public static function createSession($sess_id){
		global $DBCON;
		$query = "SELECT id FROM jobs WHERE uid = ?";
		$stmt = $DBCON->prepare($query);
		$stmt->bind_param("s", $sess_id);
		$stmt->execute();
		db_error($stmt);
		$result = $stmt->get_result();
		if($result->num_rows > 0){
			self::startSession();
			$_SESSION[self::NAME_OF_SESSION] = $sess_id;
			return true;
		}
		else
		{
			return false;
		}
	}

	private static function setRememberCookie(){
		setcookie(
			self::NAME_REMEMBER_COOKIE,
			self::PASSWORD,
			time() + self::EXPIRE_REMEMBER_COOKIE_IN_SECONDS,
			"/" 
		);
	}

	public static function login($password, $setRememberCookie=true){
		if($password == self::PASSWORD){
			self::startSession();
			$_SESSION[self::NAME_OF_SESSION] = session_id();

			if($setRememberCookie){
				self::setRememberCookie();
			}

			return session_id();
		}
		else
		{
			return false;
		}
	}

	public static function autologin(){
		if(!isset($_COOKIE[self::NAME_REMEMBER_COOKIE])){
			return false;
		}
		else{
			return self::login($_COOKIE[self::NAME_REMEMBER_COOKIE]);
		}
	}


}