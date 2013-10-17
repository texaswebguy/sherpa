// Page level libraries
Sherpa.js({"pretty-print":"_sherpa/lib/google-code-prettify/prettify.js"}) 


var initAside = function(){	
	$('.sherpa-aside').affix({
        offset: {
          top: function () { return $('.docs-masthead').height() }
        , bottom: 270
        }
    })
    var fixWidth = function(){ $('.sherpa-aside').width($('.sherpa-aside').parent().width());}
	$(window).resize(function() {
		fixWidth();
	});    
	fixWidth();




/*	$('.sherpa-aside li > a').click(function(event){
		$('.sherpa-aside li').removeClass('active');
		$(event.currentTarget).parent().addClass('active');
	});
*/


}

// Controllers 

sherpaApp.controller("docsMastheadController", function($scope, $state) {
    
    
	$scope.routes = _.filter(SHERPA.PROTO_ROUTES, function(route){return !route.parent});
	$scope.$state = $state;


});
sherpaApp.controller("homeController", function($scope, $state) {
    



});
sherpaApp.controller("getStartedController", function($scope, $state) {

	$scope.initAside = initAside();

	$scope.prettyPrint = function(){
		$('pre').addClass('prettyprint linenums');
		Sherpa.ready("pretty-print", function(){
			prettyPrint();
		});
	}
	$scope.scrollSpy = function(elem){

	$('body').scrollspy();
	window.setTimeout(function(){
		$('[data-spy="scroll"]').each(function () {
		  var $spy = $(this).scrollspy('refresh')
		});			
	},500)

	}
	$scope.sections = [
		{
			templateUrl: "pages/get-started/starter-kit.md",
			label: "Your Starter Kit",
			url:"#yourstarterkit"
		},
		{
			templateUrl: "pages/get-started/blank.md",
			label: "The Blank Folder",
			url:"#theblankfolder"
		},
		{
			templateUrl: "pages/get-started/index-file.md",
			label: "The index.html file",
			url:"#theindexhtmlfile"
		},
		{
			templateUrl: "pages/get-started/configuration.md",
			label: "Configuring Your Prototype",
			url:"#configuringyourprototype"
		},
		{
			templateUrl: "pages/get-started/page-routing.md",
			label: "Page Routing",
			url:"#pagerouting"
		},
		{
			templateUrl: "pages/get-started/examples.md",
			label: "Examples",
			url:"#examples"
		}
	]

});

sherpaApp.controller("cssOverviewController", function($scope, $state) {
    

	$scope.sections = _.filter(SHERPA.PROTO_ROUTES, function(route){return route.parent === "css-overview"});


});
sherpaApp.controller("prototypingController", function($scope, $state) {
    



});
sherpaApp.controller("styleguidesController", function($scope, $state) {
    



});


sherpaApp.controller("footerController", function($scope, $state) {
    
	$scope.init = function(){
		$('.footer-back-to-top').affix();
	}

});