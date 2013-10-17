
//Load all angular modules from the core config and create sherpaApp namespace

var angular_modules = _.union([], SHERPA.LOAD_ANGULAR_MODULES);
console.log(angular_modules)
var sherpaApp = angular.module('sherpaApp', angular_modules);


if(!_.isUndefined(SHERPA.PROTO_ROUTES)) {

	/*
		This works off the following object in the config overrides json
		 "PROTO_ROUTES": {
	    	"home": {
	            "name":"get-started",
	            "url":"/",
	            "label":"Getting Started",
	            "templateUrl":"pages/get-started/index.html",
	            "controller":"getStartedController"
	        }
		}
	*/

	sherpaApp.config(['$stateProvider', function($stateProvider, $urlRouterProvider){
	    _.each(SHERPA.PROTO_ROUTES, function(route, index){
	    	if(route.parent) {
	    		SHERPA.PROTO_ROUTES[index].parent = SHERPA.PROTO_ROUTES[route.parent];
	    	}
	        $stateProvider.state(route);
	    });
	}]);

	sherpaApp.run(['$state', function($state){
	    $state.transitionTo(SHERPA.PROTO_ROUTES[_.first(_.keys(SHERPA.PROTO_ROUTES))])
	}]);

}


sherpaApp.directive('scrollSpy', function($timeout){
	//TODO This is a hack
  return function(scope, elem, attr) {
  	if(attr.scrollSpy === 'refresh') {
  		$('body').scrollspy('refresh');
  	} else {
	  	$(elem).scrollspy();
	    scope.$watch(attr.scrollSpy, function(value) {
	      $timeout(function() { $('body').scrollspy('refresh') }, 500);
	    }, true);  		
  	}
  }
});


sherpaApp.directive('msg', function(){
	//This is a directive version of the msg version.  This will render html. 
	console.log("hello")
	return {
		template: Sherpa.msg(attr.msg, attr.msgdata)
	}
});
