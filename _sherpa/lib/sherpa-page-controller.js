
/*
    Main Page Controller
    This controller provides:

        - all routing and state management for all prototype pages
        - global scope variables




*/

sherpaApp.controller("pageController", function($scope, $state,$http) {   


    if(SHERPA.PROTO_ROUTES) {
        //TODO not sure this is necessary since each page has their own controller
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
        //TODO - automatically insert masthead on every page
    }

    if(SHERPA.PROTO_FOOTER_URL) {
        $scope.footerUrl = SHERPA.PROTO_FOOTER_URL;
        //TODO - automatically insert footer on every page
    }

    //TODO not sure these are necessary
    $scope.version=Sherpa.version;
    $scope.SHERPA = SHERPA;
    $scope.viewModel = Sherpa.viewModel;

    //Automatically insert generic modal

    if(SHERPA.ENABLE_GLOBAL_MODAL){
        $http({method: 'GET', url: SHERPA.PATH_CORE_COMPONENTS+"modal/global.html"}).
          success(function(data) {
            $('body').append(data);
          }).
          error(function(data, status, headers, config) {
            console.error("bad",status)
          });       
    }


});
