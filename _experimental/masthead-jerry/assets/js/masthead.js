
// Controllers 

sherpaApp.controller("mastheadController", function($scope) {

    $scope.routes = _.filter(SHERPA.PROTO_ROUTES, function(route){return !route.parent});

    //TODO Convert JSON to object notation



});
