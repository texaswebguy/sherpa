
/*
    Main Page Controller
    This controller provides:

        - all routing and state management for all prototype pages
        - global scope variables




*/
sherpaApp.controller("pageController", function($scope) {
   
    //page routing
    if(SHERPA.PAGE_ROUTES) {
        $scope.pages = SHERPA.PAGE_ROUTES;
    }

    if(SHERPA.PROTO_MASTHEAD_URL) {
        $scope.mastheadUrl = SHERPA.PROTO_MASTHEAD_URL;
    }

    if(SHERPA.PROTO_FOOTER_URL) {
        $scope.footerUrl = SHERPA.PROTO_FOOTER_URL;
    }

    $scope.SHERPA = SHERPA;
    $scope.viewModel = Sherpa.viewModel;


});