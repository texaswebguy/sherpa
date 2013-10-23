

sherpaApp.controller("mastheadController", function($scope) {
    $scope.routes = _.filter(SHERPA.PROTO_ROUTES, function(route){return !route.parent && route.view == "masthead"});
});



sherpaApp.controller("navTabController", function($scope, $state ) {

//    console.log( $rootScope );


    $scope.$state = $state;

    $scope.routes = _.filter(SHERPA.PROTO_ROUTES, function(route){return route.view == "navTabs"});

    $scope.selectItem = function (selectedItem) {

        SHERPA.PROTO_ROUTES[ $state.current.name ].animateExit( $state, selectedItem.id );

//       console.log( selectedItem.id );
//       console.log( $state.current.name );


       $scope.title = selectedItem.id;

        _($scope.routes).each(function (item) {
            item.selected = false;
            if (selectedItem === item) {
                selectedItem.selected = true;
            }
        });
    };

    $scope.setDefault = function ( item ) {
        console.log( "DEFAULT --> " + item );
    }


});




sherpaApp.controller("asideNavController", function($scope, $state) {

    $scope.$state = $state;

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

/**
 * Custom Animation Methods
 */

SHERPA.PROTO_ROUTES["tab1"].animateExit = function( $state, target ) {
    console.log("animateExit tab1 ");
    $state.go( target );
};

SHERPA.PROTO_ROUTES["tab1"].animateEnter = function() {

    console.log("animateEnter tab1");
};

SHERPA.PROTO_ROUTES["tab2"].animateExit = function( $state, target ) {
    console.log("animateExit tab2 ");
    $state.go( target );
};

SHERPA.PROTO_ROUTES["tab2"].animateEnter = function() {
    console.log("animateEnter tab2");
};

SHERPA.PROTO_ROUTES["tab3"].animateExit = function( $state, target ) {
    console.log("animateExit tab3 ");
    $state.go( target );
};

SHERPA.PROTO_ROUTES["tab3"].animateEnter = function() {
    console.log("animateEnter tab3");
};

SHERPA.PROTO_ROUTES["tab4"].animateExit = function( $state, target ) {
    console.log("animateExit tab4 ");
    $state.go( target );
};

SHERPA.PROTO_ROUTES["tab4"].animateEnter = function() {
    console.log("animateEnter tab4");
};




