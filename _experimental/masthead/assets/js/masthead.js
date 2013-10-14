
// Controllers 

sherpaApp.controller("mastheadController", function($scope,$state) {
    
	$scope.routes = SHERPA.PROTO_ROUTES;
	$scope.$state = $state;
	console.log($state)
	
});
sherpaApp.controller("footerController", function($scope,$state) {
    
	$scope.routes = SHERPA.PROTO_ROUTES;
	$scope.$state = $state;
});
