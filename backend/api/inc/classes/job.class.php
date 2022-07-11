<?php
//youtube-dl -o "jobs/12.%(ext)s" -x --audio-format mp3 https://www.youtube.com/watch?v=HCJd47DFz_4
class job{

private const TARGET_DIRECTORY = "/home/yt-download/www/files/";
private const BASEDOWNLOADURL = BASEURL."download.php";

const STATUS_IN_QUEUE = 1;
public const STATUS_IN_EXECUTION = 2;
public const STATUS_FINISHED = 3;
public const TYPE_VIDEO  = "video";
public const TYPE_AUDIO = "audio";

private $id=0;
private $ts_start;
private $ts_last_action;
private $url;
private $title="";
private $description="";
private $status=1;
private $type;
private $uid;

function __construct(){
	$this->ts_start = time();
	$this->ts_last_action = time();
}



public function save(){
	global $DBCON;
	if($this->id==0){ //Job is not inserted in DB
		$stmt = $DBCON->prepare("INSERT INTO jobs (ts_start,ts_last_action,url,title,description,status,type,uid) VALUE(?,?,?,?,?,?,?,?); ");
		if(!$stmt){
			die($DBCON->error);
		}
		$stmt->bind_param("iisssiss",
			$this->ts_start,
			$this->ts_last_action,
			$this->url,
			$this->title,
			$this->description,
			$this->status,
			$this->type,
			$this->uid

		);
		$result=$stmt->execute();
		if(!$result){
			die($DBCON->error);
		}
		$stmt->close();
		$res = $DBCON->query("SELECT LAST_INSERT_ID();");
		$this->id = $res->fetch_array()[0];
	}
	else //Job is aleardy inserted in DB
	{
		$stmt = $DBCON->prepare("UPDATE jobs SET ts_last_action = ?, url = ?, title = ?, description = ?,status = ?,type = ? WHERE id = ?");
		if(!$stmt){
			die($DBCON->error);
		}
		$stmt->bind_param("isssisi",
			$this->ts_last_action,
			$this->url,
			$this->title,
			$this->description,
			$this->status,
			$this->type,
			$this->id
		);
		$stmt->execute();
	}


}

public function getUrlEncodedFileName(){
	return urlencode($this->title).".".$this->getFileExtension();
}

private function getFileExtension(){
	$file = $this->findFile();
	return explode(".", $file)[1];
	}

private function findFile(){
	$dir_content = scandir(self::TARGET_DIRECTORY);
	foreach ($dir_content as $d) {
		if(preg_match("/".$this->id.'\./',$d)){
			return $d;
		}
	}
	return false;
}

private function getDownloadUrl(){
	return self::BASEDOWNLOADURL."?id=".$this->id."&auth=".$this->uid;
}

public function getMetaInfo(){
	return array(
		"id" => $this->id,
		"status" => $this->status,
		"url" => $this->url,
		"title" => $this->title,
		"description" => $this->description,
		"ts_start" => $this->ts_start,
		"ts_last_action" => $this->ts_last_action,
		"download_url" => $this->getDownloadUrl(),
		"type" => $this->type
		);
}

public function getPathToDownloadedFile(){
	return self::TARGET_DIRECTORY.$this->findFile();
}

private function getDownloadApi(){
	$pattern = "/(youtu\.be|youtube\.com)\//";
	return preg_match($pattern,$this->url) ? "yt-dlp" : "youtube-dl";
	
}

public function doIt(){
	print_r($this);
	$this->status=self::STATUS_IN_EXECUTION;
	$this->ts_last_action = time();
	$this->save();
	echo "\n";
	switch ($this->type) {

		case self::TYPE_VIDEO:
			echo "VIDEO";
			$cmd  = $this->getDownloadApi()." -o \"".self::TARGET_DIRECTORY."/".$this->id.".%(ext)s\" ".$this->url;
			break;

		case  self::TYPE_AUDIO:
			echo "AUDIO";
			$cmd = $this->getDownloadApi()." -o \"".self::TARGET_DIRECTORY."/".$this->id.".%(ext)s\" -x --audio-format mp3 ".$this->url;
		break;		
	}

	do{
		$retr = shell_exec($cmd);
	}
	while(preg_match("/ERROR/", $retr));

	$this->status=self::STATUS_FINISHED;
	$this->ts_last_action = time();
	$this->save();

}

public function remove(){
	global $DBCON;
	$file = $this->getPathToDownloadedFile();
	@unlink($file);
	$DBCON->query("DELETE FROM jobs WHERE id=".$this->id);

}

public static function createFromUrl($url,$type,$uid) : job{
	$c = new job();
	$c->id=0;
	$c->url = $url;
	$c->type = $type;
	$c->uid = $uid;
	$c->ts_start = time();
	$c->ts_last_action = time();
	$c->title = shell_exec("yt-dlp -e --skip-download $url");
	if($c->title)
		$c->save();
	return $c;
}

public static function createByDbObj($obj){
	$c = new job();
	$c->id = $obj->id;
	$c->status = $obj->status;
	$c->url = $obj->url;
	$c->title = $obj->title;
	$c->description = $obj->description;
	$c->type = $obj->type;
	$c->uid = $obj->uid;
	$c->ts_start = $obj->ts_start;
	$c->ts_last_action = $obj->ts_last_action;

	return $c;
}


}