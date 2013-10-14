
// Controllers 

sherpaApp.controller("mastheadController", function($scope,$state) {
    
	$scope.routes = _.filter(SHERPA.PROTO_ROUTES, function(route){return !route.parent});
	$scope.$state = $state;
	
});
sherpaApp.controller("footerController", function($scope,$state) {
    
	$scope.routes = _.filter(SHERPA.PROTO_ROUTES, function(route){return !route.parent});
	$scope.$state = $state;
});

sherpaApp.controller("page3Tabs", function($scope,$state) {

	$scope.tabs = _.filter(SHERPA.PROTO_ROUTES, function(route){
		if(route.parent) {
			return route.parent.name === $state.current.name;
		}
	});
	$scope.$state = $state;
	$scope.isActive = function(state, name){
		if (state === name) {
			return 'active';
		}
	}
	$scope.hash = location.hash;

});


sherpaApp.controller("asideNavController", function($scope,$state) {

	$scope.tabs = _.filter(SHERPA.PROTO_ROUTES, function(route){
		if(route.parent) {
			return route.parent.name === $state.current.name;
		}
	});
	$scope.$state = $state;
	$scope.isActive = function(state, name){
		if (state === name) {
			return 'active';
		}
	}
	$scope.hash = location.hash;

});



