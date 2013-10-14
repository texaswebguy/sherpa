
//Load all angular modules from the core config and create sherpaApp namespace

var angular_modules = _.union(["ui.compat"], SHERPA.LOAD_ANGULAR_MODULES);
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
	sherpaApp.config(['$stateProvider', function($stateProvider){
	    _.each(SHERPA.PROTO_ROUTES, function(route){
	        $stateProvider.state(route);
	    });
	}]);

	sherpaApp.run(['$state', function($state){
	    $state.transitionTo('SHERPA.PROTO_ROUTES.'+_.first(_.keys(SHERPA.PROTO_ROUTES)))
	}]);

}
