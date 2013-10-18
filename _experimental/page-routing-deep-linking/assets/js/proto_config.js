

sherpaApp.controller("mastheadController", function($scope) {
    $scope.routes = _.filter(SHERPA.PROTO_ROUTES, function(route){return !route.parent && route.view == "masthead"});
});



sherpaApp.controller("navTabController", function($scope) {


    $scope.tabs = [
		{
			"id":"tab1",
            "url":"/tab1",
			"label":"Tab 1",
			"description":"",
            "view":"navTabs",
            "parent":"page-1",
			"tabPaneUrl":"assets/includes/horizTab/tab1.html"
		},
		{
			"id":"tab2",
            "url":"/tab2",
			"label":"Tab 2",
			"description":"",
            "view":"navTabs",
            "parent":"page-1",
            "tabPaneUrl":"assets/includes/horizTab/tab2.html"
		},
		{
			"id":"tab3",
            "url":"/tab3",
			"label":"Tab 3",
			"description":"",
            "view":"navTabs",
            "parent":"page-1",
            "tabPaneUrl":"assets/includes/horizTab/tab3.html"
		},
		{
			"id":"tab4",
            "url":"/tab4",
			"label":"Tab4",
			"description":"",
            "view":"navTabs",
            "parent":"page-1",
            "tabPaneUrl":"assets/includes/horizTab/tab4.html"
		}
	]

    $scope.routes = $scope.tabs;

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




sherpaApp.controller("asideNavController", function($scope) {
    /*$scope.tabs = [
        {
            "id":"aside-home",
            "url":"/home",
            "label":"Home",
            "description":"",
            "view":"asideTabs",
            "parent":"page-1",
            "tabPaneUrl":"assets/includes/home.html"
        },
        {
            "id":"aside-library",
            "url":"/library",
            "label":"Library",
            "description":"",
            "view":"asideTabs",
            "parent":"page-1",
            "tabPaneUrl":"assets/includes/library.html"
        },
        {
            "id":"aside-applications",
            "label":"Applications",
            "url":"/Applications",
            "description":"",
            "view":"asideTabs",
            "parent":"page-1",
            "tabPaneUrl":"assets/includes/applications.html"
        },
        {
            "id":"aside-profile",
            "url":"/profile",
            "label":"Profile",
            "description":"",
            "view":"asideTabs",
            "parent":"page-1",
            "tabPaneUrl":"assets/includes/profile.html"
        },
        {
            "id":"aside-settings",
            "url":"/settings",
            "label":"Settings",
            "description":"",
            "view":"asideTabs",
            "parent":"page-1",
            "tabPaneUrl":"assets/includes/settings.html"
        },
        {
            "id":"aside-help",
            "url":"/help",
            "label":"Help",
            "view":"asideTabs",
            "parent":"page-1",
            "description":"Lorem ispum dolor sit amet",
            "tabPaneUrl":"assets/includes/help.html"
        }
    ]*/

    $scope.routes = _.filter(SHERPA.PROTO_ROUTES, function(route){return !route.parent && route.view == "asideTabs"});


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

/**
 * Must go last among controllers
 */

// Controllers
/*sherpaApp.controller("pageController", function($scope) {

    $scope.lorem ="Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
    $scope.show_stuff = "Show Stuff"
    $scope.hide_stuff = "Hide Stuff"
    $scope.text_item_label = Sherpa.msg('text_item_label');
});*/



