

sherpaApp.controller("mastheadController", function($scope) {
    $scope.routes = _.filter(SHERPA.PROTO_ROUTES, function(route){return !route.parent && route.view == "masthead"});
});



sherpaApp.controller("navTabController", function($scope) {

    $scope.routes = _.filter(SHERPA.PROTO_ROUTES, function(route){return route.view == "navTabs"});

//    $scope.routes[0].selected = true;

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

    $scope.selectItem = function (selectedItem) {
        _($scope.routes).each(function (item) {
            item.selected = false;
            if (selectedItem === item) {
                selectedItem.selected = true;
            }
        });
    };


});




sherpaApp.controller("asideNavController", function($scope) {

    $scope.routes = _.filter(SHERPA.PROTO_ROUTES, function(route){return route.view == "asideTabs"});

//    $scope.$state = $state;

/*
    var anySelected = false;

    _($scope.routes).each(function (item) {
        if (item.selected == true ) {
            anySelected = true;
        }
    });

    if ( !anySelected ) {
        $scope.routes[0].selected = true;
    }
*/

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

    $scope.selectItem = function (selectedItem) {

        _($scope.routes).each(function (item) {
            item.selected = false;
            if (selectedItem === item) {
                selectedItem.selected = true;
            }
        });


    };


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



