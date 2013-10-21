<?php

	$web_root_path = $_SERVER['DOCUMENT_ROOT'];
	if($_POST) {
	   $action = $_POST['action'];
	   $data = $_POST;
	} else {
	   $action = $_GET['action'];
	   $data = $_GET;
	}

	switch ($action) {
	    case "update_textkey":
	        $content = json_encode($data['content'], JSON_PRETTY_PRINT);
	   		$file    = fopen($data['filename_path'],'w+');  
			fwrite($file, $content);
			fclose($file);
			echo 'Successfully saved '+$data['textkey'];
	        break;
	    case "update_markown":
	        $content = $data['content'];
	   		$file    = fopen($web_root_path+$data['filename'],'w+');  
			fwrite($file, $content);
			fclose($file);
			echo 'Successfully saved '+$data['filename'];
	        break;
	    case "export_content":
	        $content = json_encode($data['content'], JSON_PRETTY_PRINT);
	   		$file    = fopen($data['filename_path'],'w+');  
			header("Content-type: " . "application/download");
			header("Content-Disposition: attachment; filename=\"{$strFileName}\"");
			echo $content;
	    	break;
	    default:
	        echo "ERROR: No action provided";
	}

?>