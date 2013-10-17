
/*
    Main Page Controller
    This controller provides:

        - all routing and state management for all prototype pages
        - global scope variables




*/



sherpaApp.controller("pageController", function($scope, $state) {
    console.log( "EXECUTE --> sherpa-page-controller.js");
    if(SHERPA.PROTO_ROUTES) {
        var routes = [];
        _.each(_.keys(SHERPA.PROTO_ROUTES),function(route){
            routes.push('SHERPA.PROTO_ROUTES.'+route);
        })
        $scope.routes = routes;
    } else {
        $scope.routes = [];
    }
     
    $scope.setPage = function(page){
        $state.transitionTo(page);
    }


    if(SHERPA.PROTO_MASTHEAD_URL) {
        $scope.mastheadUrl = SHERPA.PROTO_MASTHEAD_URL;
    }

    if(SHERPA.PROTO_FOOTER_URL) {
        $scope.footerUrl = SHERPA.PROTO_FOOTER_URL;
    }

    $scope.version=Sherpa.version;
    $scope.SHERPA = SHERPA;
    $scope.viewModel = Sherpa.viewModel;


});