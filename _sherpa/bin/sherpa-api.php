<?php
	//header('Content-Type: application/json');
	$web_root_path = $_SERVER['DOCUMENT_ROOT'];


	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		$action = $_POST['action'];
		$data = $_POST;
	} else {
		$action = $_GET['action'];
		$data = $_GET;
	}

	switch ($action) {
	    case "update_textkey":
	        if($data['filename_path'] && $data['content']) {
		        $new_content = $data['content'];
		        $textkey = $data['textkey'];	
		        $filename_path = $data['filename_path'];	
				$contents = json_decode(file_get_contents($filename_path),true);
				$contents[$textkey] = $new_content;
				preg_match("/_markdown/",$textkey,$isMarkdown, PREG_OFFSET_CAPTURE);
				if($isMarkdown) {
					if($contents[str_replace("_markdown","",$textkey)]) {
						//if non markdown version exists
						unset($contents[str_replace("_markdown","",$textkey)]);
					}
				} else {
					if($contents["{$textkey}_markdown"]) {
						//if markdown version exists
						unset($contents["{$textkey}_markdown"]);
					}					
				}

		   		$file    = fopen($data['filename_path'],'w+');
				fwrite($file,json_encode($contents, JSON_PRETTY_PRINT));
				fclose($file);
				$msg = array('success' => true, 'msg' => "Successfully saved $textkey" );
				echo json_encode($msg);
			} else {
		   		echo json_encode(array('success' => false, 'msg' => 'ERROR: You must provide filename_path and new content.'));
			}
	        break;
	    case "update_file":
	    	if($data['filename_path'] && $data['content']){
		        $content = $data['content'];
		        $filename_path = $data['filename_path'];
		   		$file    = fopen($filename_path,'w+');  
				fwrite($file, $content);
				fclose($file);
				$msg = array('success' => true, 'msg' => "Successfully saved $filename_path");
				echo json_encode($msg);
			} else {
		   		echo json_encode(array('success' => false, 'msg' => 'ERROR: You must provide filename_path and content.'));
			}
	        break;
	    case "export_content":
    		if($data['filename_path']){
		   		$content    = fopen($data['filename_path'],'r+');  
		   		echo $content;
		   	} else {
		   		echo json_encode(array('success' => false, 'msg' => 'ERROR: You must provide filename_path.'));
		   	}
	    	break;
	    case "foobar":
	        
			echo $web_root_path, $data['filename'];
	    	break;
	    default:
	    echo json_encode(array('success' => false, 'msg' => 'ERROR: The action provided was not recognized.'));
	}

?>