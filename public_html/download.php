<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
	$language = $_POST["language"];
	$classes = json_decode($_POST["classes"]);
	$classNames = json_decode($_POST["names"]);
	
	
	$fileEnding = getFileEnding($language);
	
	
	if (isset($classNames) && isset($classes)){
	
		$zip = new ZipArchive;
		
		$filename = "./" . $classNames[count($classNames)-1] . uniqid() . ".zip";
		if ($zip->open($filename, ZipArchive::CREATE)!==TRUE) {
			exit("cannot open <$filename>\n");
		}
		
		
		
		
		for($i = 0; $i < count($classNames); $i++) {
			if ($fileEnding === "Cpp"){
				$j = $i *2 +1;
				$zip->addFromString( $classNames[$i]. ".h",$classes[$j]);
				$zip->addFromString( $classNames[$i]. "." . $fileEnding,$classes[$j+1]);
			} else {
				$zip->addFromString( $classNames[$i]. "." . $fileEnding,$classes[$i+1]);
			}
		
		}
		
		$zip->close();
		
		header('Content-Type: application/zip');
		header("Content-Transfer-Encoding: Binary"); 
		header("Content-disposition: attachment; filename=\"" . basename($filename) . "\""); 
		readfile($filename);
		
		unlink($filename);
	} else {
		header("Location: index.html");
		exit;
	}
		
} else {
	header("Location: index.html");
	exit;
}

function getFileEnding($lang){
	switch($lang){
		case "Python":
			return "py";
		case "Ruby":
			return "rb";
		case "Perl":
			return "pl";
			
	}
	return $lang;
}
