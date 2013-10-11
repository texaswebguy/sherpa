
// Controllers 
sherpaApp.controller("pageController", function($scope) {
    
    $scope.lorem ="Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
    $scope.show_stuff = "Show Stuff"
    $scope.hide_stuff = "Hide Stuff"
    $scope.text_item_label = Sherpa.msg('text_item_label');
});



sherpaApp.controller("asideNavController", function($scope) {
	$scope.tabs = [
		{
			"id":"aside-home",
			"label":"Home",
			"description":"",
			"tabPaneUrl":"assets/includes/home.html"
		},
		{
			"id":"aside-library",
			"label":"Library",
			"description":"",
			"tabPaneUrl":"assets/includes/library.html"
		},
		{
			"id":"aside-applications",
			"label":"Applications",
			"description":"",
			"tabPaneUrl":"assets/includes/applications.html"
		},
		{
			"id":"aside-profile",
			"label":"Profile",
			"description":"",
			"tabPaneUrl":"assets/includes/profile.html"
		},
		{
			"id":"aside-settings",
			"label":"Settings",
			"description":"",
			"tabPaneUrl":"assets/includes/settings.html"
		},
		{
			"id":"aside-help",
			"label":"Help",
			"description":"Lorem ispum dolor sit amet",
			"tabPaneUrl":"assets/includes/help.html"
		}
	]
	$scope.activeTabIndex = 0;
	$scope.isActiveTab = function(index){
		if($scope.activeTabIndex === index) {
			return "active";
		}
	}
	$scope.isActivePane = function(index){
		if($scope.activeTabIndex === index) {
			return "tab-pane fade active in";
		} else {
			return "tab-pane fade";
		}
	}
	$scope.includeTabContent = function(index) {
		return $scope.tabs[index].tabPaneUrl;
	}


});


