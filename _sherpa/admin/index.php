<!doctype html>
<html lang="en" xmlns:ng="http://angularjs.org">
<head>
	<meta charset="utf-8">
    <title>Dell Sherpa Admin</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="text/javascript">
    //TODO need to pass the global config through get
      var SHERPA_CONFIG_OVERRIDES = {};
        SHERPA_CONFIG_OVERRIDES.GLOBAL_CONFIG = "assets/config/admin.json";
    </script>

	<!-- Don't touch 
	******************************************************************************** -->
	<style>body{opacity:0}body.ng-scope{opacity:1}</style>
	<script src="../sherpa.v07.js"></script>	
	<!-- Sherpa js adds all the js and css files you need.
	******************************************************************************** -->	
</head>
<body ng-controller="pageController">
	<a id="top"></a>
	<header>
		<div  class="da-all ta-all ma-all gray-light">
			<div class="wrapper">
				<div class="da-all ta-all ma-all">
					<div class="utility-nav">
						<div class="pull-left">{{version.releaseName}}</div>
          				<div class="pull-right">Sherpa v{{version.major}}{{version.minor}} - {{version.releaseDate}}</div>

					</div>
				</div>
			</div>
		</div>
		<div class="da-all ta-all ma-all blue">
			<div class="wrapper">
				<div class="da-all ta-all ma-all">
					<div class="main-nav">
						<i aria-hidden="true" class="icon-ui-dell masthead"></i>
						<h2 class="brand pull-left">Sherpa</h2>
						<h2 class="pull-right">Admin Console</h2>
					</div>
				</div>
			</div>
		</div>		
	</header>	
	<section class="da-all ta-all ma-all top-offset-small">
		<div class="wrapper tabbable">       
			<aside class="da1-da3 tb1-tb2 mb1-mb2">
				<ul class="nav nav-list" id="admin-menu">
					<li class="nav-header">Project</li>
					<li class="active"><a href="#info" data-toggle="tab">Project Information</a></li>
					<li><a href="#prototypes" data-toggle="tab">Prototype Index Pages</a></li>
					<li><a href="#data" data-toggle="tab">Prototype Content</a></li>
					<li class="nav-header">Sherpa Related</li>
					<li><a href="http://open.gsdprototypes.com/sherpa" target="_blank">Sherpa Site</a></li>
					<li><a href="../config/core_config.json" target="_blank">Core Settings</a></li>
					<li><a href="#js-libraries" data-toggle="tab">JavaScript Libraries</a></li>
					<li class="divider"></li>
					<li><a href="#" ng-click="showHelp($event)">Help</a></li>
				</ul>
			</aside>
			<section class="da4-da12 tb3-tb8 mb3-mb4">
				<div class="well tab-content" id="admin-content">
					<div class="tab-pane fade active in" id="info">
				      <h2>Project Info - {{project_info.title}}</h2>

					  <table class="table table-striped">
						  <tbody>
						    <tr ng-repeat="item in project_info.data">
						      <th class="span3">{{item.label}}</th>
						      <td ng-bind-html="item.description"></td>
						    </tr>
						  </tbody>
						</table>
				    </div>
				    <div class="tab-pane fade" id="prototypes">
				      <h2>Prototypes</h2>

						<?php
							$count = 0;
							function list_dir($rootDir){ 

								if ($dir = opendir($rootDir)) {
								    while (false !== ($file = readdir($dir))) {

								        if ($file != "." && $file != ".." && $file != "Thumb.db" && $file != "launch_prototype.bat" && $file != "_sherpa" && $file != "_sherpa" && $file != "assets" ) {
								        	$count++;
											if(is_dir($rootDir.$file)){ 
								            	echo '<li><strong>'.$file.'/</strong>';
								            	echo '<ul>'; 
								                list_dir($rootDir.$file."/");
								                echo '</ul></li>'; 
								            } else {
								            	if(!($rootDir.$file == "../../index.html")){
								            		echo '<li><a href='.$rootDir.$file.'>'.$file.'</a></li>'; 
								            	}
								            }
								        }
								    }
								    closedir($dir);
								}
							}
							echo "<ul class=\"unstyled\">";
							echo '<li><a href="../../index.html">Project Index Page</a></li>';
							list_dir("../../");
							echo "</ul>";
						?>
				    </div>
				    <div class="tab-pane fade" id="data" ng-include="editor/index.html">
						
				    </div>
				    <div class="tab-pane fade" id="js-libraries">
				      <h2>JavaScript Libraries</h2>
				      <h4>Installed Libraries</h4>

						<table class="table table-striped">
						  <thead>
						    <tr>
						      <th>Library</th>
						      <th>Url</th>
						    </tr>
						  </thead>
						  <tbody>
						    <tr ng-repeat="lib in js_libraries.installed">
						      <td>{{lib.label}}</td>
						      <td><a href="{{url}}" target="_blank">{{lib.url}}</a></td>
						    </tr>
						  </tbody>
						</table>
  
				      <h4>Available Libraries</h4>
						<table class="table table-striped">
						  <thead>
						    <tr>
						      <th>Library</th>
						      <th>Url</th>
						    </tr>
						  </thead>
						  <tbody>
						    <tr ng-repeat="lib in js_libraries.available">
						      <td>{{lib.label}}</td>
						      <td><a href="{{url}}" target="_blank">{{lib.url}}</a></td>
						    </tr>
						  </tbody>
						</table>
				    </div>
					<div class="tab-pane fade" id="file-browser">
				      <h2>Browse Project Files</h2>

						<?php
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
						?>
					</div>
				</div>
			</section>
		</div>
	</section>
<footer id="footer" class="da-all ta-all ma-all gray-light  top-offset-small">
  <div class="wrapper">
    <div class="da-all ta-all ma-all">
      <p itemscope="" itemtype="http://schema.org/Organization">
        </p><h4>2013 <span class="divider">/</span> <span itemprop="brand">Dell Sherpa</span><small class="pull-right text-gray" itemprop="name">Dell, Inc.</small></h4>
        <p>A responsive prototyping framework for user experience design.
        </p>
      <p></p>
    </div>

  </div>
    <p class="footer-back-to-top pull-right" data-spy="affix" data-offset-top="100"><a class="scroll text-white" href="#top"><i aria-hidden="true" class="icon-ui-collapse"></i> Back to top</a></p>
</footer>




</body>

</html>