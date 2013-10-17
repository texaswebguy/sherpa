
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
  	if(!attr.scrollSpy === 'refresh') {
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
  return function(scope, elem, attr) {
  	$(elem).html(Sherpa.msg(attr.msg, attr.msgdata))
  }
});


sherpaApp.directive('lorem', function(){
	/*
		Puts lorem ispum into the element.
		Sherpa.lorem accepts a number or object with options
		{
			startLorem:true,
			length:200,
			paragraphs:5
		}

		Options can also be specified as attributes
		<div lorem="500" data-paragraphs="5"></div>

	*/
  return function(scope, elem, attr) {
	if(!_.isObject(attr.lorem)){
		attr.lorem=parseInt(attr.lorem);
	}
	if(attr.paragraphs || attr.startLorem || attr.numChars) {
		var tempObj = {};
		if(attr.paragraphs) {
			tempObj.paragraphs = attr.paragraphs;
		}
		if(attr.startLorem) {
			tempObj.startLorem = attr.startLorem;
		}
		if(attr.numChars) {
			tempObj.numChars = attr.numChars;
		} else {
			tempObj.numChars = attr.lorem;
		}
		$(elem).html(Sherpa.lorem(tempObj));
	} else {
		$(elem).html(Sherpa.lorem(attr.lorem));
	}
	
  }
});

sherpaApp.directive('markdown', function($http){
	//This is a directive version of the msg version.  This will render html. 
  return function(scope, elem, attr) {
  	$http({method: 'GET', url: attr.markdown}).
	  success(function(data, status, headers, config) {
	    // this callback will be called asynchronously
	    // when the response is available
	  	var convertMD = new Sherpa.converter();
		$(elem).html(convertMD.makeHtml(data));
		$(elem).attr('data-filename',attr.markdown).addClass('editable');
	  }).
	  error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
		var responseHTML = '<div class="rounded-small red-stroke gray da-all da-padin"><h4>Missing markdown file</h4> <p>'+attr.markdown+' does not exist</p></div>';
	    $(elem).html(responseHTML);
	  });
  }
});


