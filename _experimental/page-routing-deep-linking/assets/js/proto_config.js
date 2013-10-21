

sherpaApp.controller("mastheadController", function($scope) {
    $scope.routes = _.filter(SHERPA.PROTO_ROUTES, function(route){return !route.parent && route.view == "masthead"});
});



sherpaApp.controller("navTabController", function($scope) {

    $scope.routes = _.filter(SHERPA.PROTO_ROUTES, function(route){return route.view == "navTabs"});

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

    $scope.selectItem = function (selectedItem) {

        _($scope.routes).each(function (item) {
            item.selected = false;
            if (selectedItem === item) {
                selectedItem.selected = true;
            }
        });


    };


});



