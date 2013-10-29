<?php
	$web_root_path = $_SERVER['DOCUMENT_ROOT'];

	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		$action = $_POST['action'];
		$data = $_POST;
	} else {
		$action = $_GET['action'];
		$data = $_GET;
	}

	switch ($action) {
		case "list_prototypes":
			$count = 0;
			function list_dir($rootDir){ 

				if ($dir = opendir($rootDir)) {
				    while (false !== ($file = readdir($dir))) {

				        if ($file != "." && $file != ".." && $file != "Thumb.db" && $file != "launch_prototype.bat" && $file != "_dev-releases" && $file != "_scripts" && $file != "_sherpa" && $file != "_sherpa" && $file != "assets"&& $file != ".git" ) {
				        	$count++;
							if(is_dir($rootDir.$file)){ 
				            	echo '<li><strong>'.$file.'/</strong>';
				            	echo '<ul>'; 
				                list_dir($rootDir.$file."/");
				                echo '</ul></li>'; 
				            } else {
				            	if(!($rootDir.$file == "../../index.html")){
				            		echo '<li><a href="'.$rootDir.$file.'" class="view-file">'.$file.'</a></li>'; 
				            	}
				            }
				        }
				    }
				    closedir($dir);
				}
			}
			echo "<ul class=\"unstyled\">";
			//TODO these paths may not always be correct
			echo '<li><a href="../../index.html">Project Index Page</a></li>';
			list_dir("../../");
			echo "</ul>";
			break;
		case "browse_directories":
			//-- Directory Navigation with SCANDIR
			//-- 
			//-- optional placemenet
			$exclude_list = array(".", "..", "example.txt");

			if (isset($_GET["dir"])) {
			  $dir_path = "../../".$_GET["dir"];
			}
			else {
			  $dir_path = "../../";
			}

			//-- until here
			function dir_nav() {
			  global $exclude_list, $dir_path;
			  $directories = array_diff(scandir($dir_path), $exclude_list);
			  echo "<ul style='list-style:none;padding:0'>";
			  foreach($directories as $entry) {
			    if(is_dir($dir_path.$entry)) {
			      echo "<li style='margin-left:1em;'><a href='?dir=".$_GET["dir"].$entry."/"."'>".$entry."</a></li>";
			    }
			  }
			  echo "</ul>";
			  //-- separator
			  echo "<ul style='list-style:none;padding:0'>";
			  foreach($directories as $entry) {
			    if(is_file($dir_path.$entry)) {
			      echo "<li style='margin-left:1em;'><a href='?file=".$_GET["dir"].$entry."'>".$entry."</a></li>";
			    }
			  }
			  echo "</ul>";
			}
			dir_nav();
			//-- optional placement
			if (isset($_GET["file"])) {
			  echo "<div class=\"well well-gray-stroke\">";
			  highlight_file($dir_path.$_GET['file']);
			  echo "</div>";
			}
			//-- until here
			//--
			//-- Because I love php.net		
			break;
	    case "foobar":
	        
			echo $web_root_path, $data['filename'];
	    	break;
	    default:
	    echo json_encode(array('success' => false, 'msg' => 'ERROR: The action provided was not recognized.'));
	}

?>
