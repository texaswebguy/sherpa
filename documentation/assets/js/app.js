
// Controllers 

sherpaApp.controller("docsMastheadController", function($scope, $state) {
    
     $scope.version=Sherpa.version;
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


});



$('.footer-back-to-top').affix();