<?php

class downloadmanager{
	private const JOB_LIFETIME_WHEN_FINISHED_IN_SECONDS = 2*60*60;
	private const MAX_JOB_LIFETIME__IN_SECONDS = 4*60*60;


	public function addToQueue($url,$type){
		job::createFromUrl($url,$type);
	}

	public static function clean(){
		global $DBCON;
		$ts_expire_when_finished = time() - self::JOB_LIFETIME_WHEN_FINISHED_IN_SECONDS;
		$ts_max_expire  = time() - self::MAX_JOB_LIFETIME__IN_SECONDS;
		$stmt = $DBCON->prepare("SELECT * FROM jobs WHERE (status = 3 AND ts_last_action < ?) OR ts_last_action < ?");
		if(!$stmt){
			die($DBCON->error);
		}
		$stmt->bind_param("ii", 
			$ts_expire_when_finished,
			$ts_max_expire);
		
		if(!$stmt->execute()){
			die($DBCON->error);
		}

		$res = $stmt->get_result();

		while($obj = $res->fetch_object()){
			$j = job::createByDbObj($obj);
			echo "removing ".$obj->title;
			$j->remove();
		}
		$stmt->close();
	}

	public static function doNextJob(){
		GLOBAL $DBCON;
		$res = $DBCON->query("SELECT * FROM jobs WHERE status=1 ORDER BY id LIMIT 1");
		if($res->num_rows == 0){
			return false;
		}
		$obj = $res->fetch_object();
		$res->close();
		$job = job::createByDbObj($obj);
		$job->doIt();
		return $obj->uid;
	}

	public static function getJobs($uid){
		GLOBAL $DBCON;
		$ret = array();
		$stmt = $DBCON->prepare("SELECT * FROM jobs WHERE uid=?");
		$stmt->bind_param("s",$uid);
		if(!$stmt->execute()){
			die($DBCON->error);
		}

		$result = $stmt->get_result();

		while($obj = $result->fetch_object()){
			$j = job::createByDbObj($obj);
			$ret[] = $j->getMetaInfo();
		}
		$stmt->close();

		return $ret;


	}


	public static function storeMailAddress($mail, $uid){
		global $DBCON;

		$pattern = "/^[a-zA-Z0-9\-_\.]+@[a-zA-Z0-9\-_\.]+\.[a-z]{2,}$/"; //Pattern to validate mail address
		if($mail==""){
			$stmt = $DBCON->prepare("DELETE FROM mail_notification WHERE uid = ?");
			$stmt->bind_param("s", $uid);
			db_error($stmt->execute());
		}
		elseif(!preg_match($pattern,$mail)){
			die("{success : false}");
		}
		else{

			$stmt = $DBCON->prepare("SELECT * FROM mail_notification WHERE uid=?");
			$stmt->bind_param("s", $uid);
			db_error($stmt->execute());
			$results = $stmt->get_result();
			if($results->num_rows == 0){
				$stmt = $DBCON->prepare("INSERT INTO mail_notification (mail,uid) VALUES (?,?)");
			}
			else{
				$stmt = $DBCON->prepare("UPDATE mail_notification SET mail = ? WHERE uid = ?");
			}
			$stmt->bind_param("ss", $mail, $uid);
			db_error($stmt->execute());
	}

	}


	public static function sendMailNotification($uid){
		global $DBCON;
		$stmt = $DBCON->prepare("SELECT id FROM jobs WHERE uid=? AND status<>3");
		$stmt->bind_param("s", $uid);
		db_error($stmt->execute());
		$result_jobs = $stmt->get_result();

		$stmt = $DBCON->prepare("SELECT id FROM jobs WHERE uid=? AND status=3");
		$stmt->bind_param("s", $uid);
		db_error($stmt->execute());
		$result_jobs2 = $stmt->get_result();

		if($result_jobs->num_rows==0 & $result_jobs2->num_rows > 0){
			$stmt = $DBCON->prepare("SELECT mail FROM mail_notification WHERE uid=?");
			$stmt->bind_param("s",$uid);
			db_error($stmt->execute());
			$result_mail = $stmt->get_result();
			if($result_mail->num_rows>0){
				$result_mail = $result_mail->fetch_object();
				require_once(HOMEDIR."inc/templates/NotificationMail.php");
				$template = new NotificationMail(array("uid" => $uid));
				$header =  $template->getSender()."\n";
				$header .= MIME_TYPE_HTML;
				mail($result_mail->mail, $template->getSubject(),$template->getHtml(), $header);
			}
		}
	}



}