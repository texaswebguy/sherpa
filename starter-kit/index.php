<!doctype html>
<html lang="en" xmlns:ng="http://angularjs.org">
<head>
	<meta charset="utf-8">
    <title>Blank Page</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="text/javascript">
      var SHERPA_CONFIG_OVERRIDES = {};
        SHERPA_CONFIG_OVERRIDES= {
		    "PATH_PROTO_ASSETS": "_blank/assets/",
		    "PATH_WEBROOT": "",
		    "PATH_PROTO_ASSETS": "_blank/assets/"
		}
    </script>


	<!-- Don't touch 
	******************************************************************************** -->
	<style>body{opacity:0}body.ng-scope{opacity:1}</style>
	<script src="_sherpa/sherpa.v07-new.js"></script>	
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
						<h2 class="pull-right">Starter Kit</h2>
					</div>
				</div>
			</div>
		</div>		
	</header>	
	<section class="da-all ta-all ma-all top-offset-small">
		<div class="wrapper">       
			<div class="da1-da3 tb1-tb2 mb1-mb2">
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
								            	if(!($rootDir.$file == ".index.php") && !($rootDir.$file == ".start_server.bat" )){
								            		echo '<li><a href='.$file.'>'.$file.'</a></li>'; 
								            	}
								            }
								        }
								    }
								    closedir($dir);
								}
							}
							echo "<ul class=\"kit-sidebar nav nav-list\">";
							echo "<li class=\"nav-header\">Included Items</li>";
							list_dir(".");
							echo "</ul>";
						?>

			</div>
			<div class="da4-da12 tb3-tb8 mb3-mb4">

				<div class="well">
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
						cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
						proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

						<p>Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
						cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
						proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
		        </div>

			</div>
		</div>
	</section>
<footer id="footer" class="da-all ta-all ma-all gray-light">
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