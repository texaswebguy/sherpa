<?php

//TODO need to save just the textkey not the whole file
	if($_POST) {
	   $content = json_encode($_POST['content'], JSON_PRETTY_PRINT);
	   $file      = fopen($_POST['filename_path'],'w+');   
	} else {
	   $content = json_encode($GET['content'], JSON_PRETTY_PRINT);
	   $file      = fopen($GET['filename_path'],'w+');   
	}

	fwrite($file, $content);
	fclose($file);
	echo 'Successfully saved '+$_POST['textkey'];

?>