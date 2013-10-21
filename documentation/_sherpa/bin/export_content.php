<?php

	if($_POST) {
	   $content = json_encode($_POST['content'], JSON_PRETTY_PRINT);
	   $strFileName = $_POST['filename'];
	} else {
	   $content = json_encode($GET['content'], JSON_PRETTY_PRINT);
	   $strFileName = $_GET['filename'];
	}
	header("Content-type: " . "application/download");
	header("Content-Disposition: attachment; filename=\"{$strFileName}\"");
	echo $content;

?>