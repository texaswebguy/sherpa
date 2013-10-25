sherpaApp.controller("mastheadController", function ($scope) {
    $scope.routes = _.filter(SHERPA.PROTO_ROUTES, function (route) {
        return !route.parent && route.view == "masthead"
    });
});


sherpaApp.controller("navTabController", function ($scope, $state) {

//    console.log( $rootScope );


    $scope.$state = $state;
    SHERPA.STATE = $state;

    $scope.routes = _.filter(SHERPA.PROTO_ROUTES, function (route) {
        return route.view == "navTabs";
    });



    $scope.selectItem = function (selectedItem) {
        selectedStateItem = selectedItem.id;

        SHERPA.PROTO_ROUTES[ $state.current.name ].animateExit($state, selectedItem.id);

        console.log( $state.current.data.userStatus.current );
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

    $scope.$on('$viewContentLoaded',
        function(event){
              SHERPA.PROTO_ROUTES[ $state.current.name ].animateEnter();
        });

/*
    $scope.animateEnter = function (id) {
        SHERPA.PROTO_ROUTES[ id ].animateEnter();
    }
*/
});


sherpaApp.controller("asideNavController", function ($scope, $state) {

    $scope.$state = $state;

    $scope.routes = _.filter(SHERPA.PROTO_ROUTES, function (route) {
        return route.view == "asideTabs"
    });

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

SHERPA.PROTO_ROUTES["tab1"].animateExit = function ($state, target) {
    console.log("animateExit tab1 ");
    $state.go(target);
    $state.current.data.userStatus.current = "scanned";
};

SHERPA.PROTO_ROUTES["tab1"].animateEnter = function () {

    console.log("animateEnter tab1");
};

SHERPA.PROTO_ROUTES["tab2"].animateExit = function ($state, target) {
    console.log("animateExit tab2 ", target);

    TweenMax.to($('#tab2P'), .5, {opacity: 0});
    $state.go(target, null, {delay:.5});

};

SHERPA.PROTO_ROUTES["tab2"].animateEnter = function () {
    TweenMax.to($('#tab2P'), .5, {opacity: 1});
    console.log("animateEnter tab2 from ng-init");
};

SHERPA.PROTO_ROUTES["tab3"].animateExit = function ($state, target) {
    console.log("animateExit tab3 ");
    $state.go(target);
};

SHERPA.PROTO_ROUTES["tab3"].animateEnter = function () {
    console.log("animateEnter tab3");
};

SHERPA.PROTO_ROUTES["tab4"].animateExit = function ($state, target) {
    console.log("animateExit tab4 ");
    $state.go(target);
};

SHERPA.PROTO_ROUTES["tab4"].animateEnter = function () {
    console.log("animateEnter tab4");
};




