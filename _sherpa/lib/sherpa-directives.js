
//Load all angular modules from the core config and create sherpaApp namespace

var angular_modules = _.union([], SHERPA.LOAD_ANGULAR_MODULES);
console.log(angular_modules)
var sherpaApp = angular.module('sherpaApp', angular_modules);


if(!_.isUndefined(SHERPA.PROTO_ROUTES)) {

	sherpaApp.config(['$stateProvider', function($stateProvider, $urlRouterProvider){
	    _.each(SHERPA.PROTO_ROUTES, function(route){

            if ( route.parent ) {
                route.parent =  SHERPA.PROTO_ROUTES[route.parent];
            }

            /**
             * Target Specific views in html:
             * <section ui-view="masthead" ></section>
             *
             * @type {{}}
             */
            var viewsObject = {};
            viewsObject[ route.view ] = {
                templateUrl: route.templateUrl
            };

            route.views = viewsObject;

	        $stateProvider.state(route.name, route );
	    });
	}]);

	sherpaApp.run(['$state', function($state){
	    $state.transitionTo(SHERPA.PROTO_ROUTES[_.first(_.keys(SHERPA.PROTO_ROUTES))])
	}]);

}
