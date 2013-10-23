// Page level libraries
Sherpa.js({"pretty-print":"_sherpa/lib/google-code-prettify/prettify.js"}) 
Sherpa.js({"ZeroClipboard":SHERPA.PATH_CORE_JS+"ZeroClipboard.js"});

var initAside = function(){	
	$('.sherpa-aside').affix({
        offset: {
          top: function () { return $('.docs-masthead').height() },
          bottom: 270
        }
    })
    var fixWidth = function(){ 
    	var offset = 30;
    	if(Sherpa.viewModel.IsTabletDevice) {
    		offset = 36;
    	}
    	if(Sherpa.viewModel.IsPhoneDevice) {
    		offset = 0;
    	}
    	$('.sherpa-aside').width($('.sherpa-aside').parent().width()-offset);
    }
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


function initPrettyPrint(){

		window.setTimeout(function(){
			$('pre').addClass('prettyprint linenums');
			Sherpa.ready("pretty-print", function(){
				prettyPrint();
			});
		},1000);

	}

sherpaApp.directive('copysample', function(){
  return function(scope, elem, attr) {
  	var target_selector = attr.copysample;
  	$(elem).html($(target_selector)[0].innerHTML.replace(/</g,'&lt;'));
  }
});

sherpaApp.directive('loadclipboardtext', function(){
  return function(scope, elem, attr) {
  	var target_selector = attr.loadclipboardtext;
	var html = $(target_selector).clone(), list = html.find('ul').clone(),
		comment = '\n\t\t<!-- '+html.attr('id').replace(/#/,'');

	if(html.find('ul')) {
		comment += '\n\t\t\tOptions:';
		comment += _.str.rstrip(_.str.stripTags(list.html()));
	}
	comment += '\n\t\t-->';
	html.prepend(comment);
	html.find('hr').remove();
	html.find('ul').remove();
	html.find('button').remove();
	html.find('p').remove();
	html.find('h4').remove();
	//html.find('.well').remove();
	html.find('\p\p').remove();
	html.removeAttr('id');
	html = '\t'+html[0].outerHTML;

  	$(elem).attr('data-clipboard-text',html);
  	//data-clipboard-text
  }
});



// Controllers 

sherpaApp.controller("docsMastheadController", function($scope, $state) {

	$scope.routes = _.filter(SHERPA.PROTO_ROUTES, function(route){return !route.parent});
	$scope.$state = $state;
	$scope.current_name = $state.current.name;

});
sherpaApp.controller("homeController", function($scope, $state) {
    
	$('.footer-back-to-top').hide()

});
sherpaApp.controller("getStartedController", function($scope, $state) {
	$('.footer-back-to-top').show()
	$scope.initAside = initAside();

	$scope.prettyPrint = initPrettyPrint();
	$scope.scrollSpy = function(){

		
		window.setTimeout(function(){
			$('body').scrollspy({offset:-80});
			$('[data-spy="scroll"]').each(function () {
			  var $spy = $(this).scrollspy('refresh')
			});			
		},1000)

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
	console.log(">>>>>>>>>>>>>>>>>>>>>>>>hello")
 	$('.footer-back-to-top').show()
	$scope.prettyPrint = initPrettyPrint();
	$scope.initAside = initAside();
	$scope.sections = _.filter(SHERPA.PROTO_ROUTES, function(route){if(route.parent){return route.parent.name === "css-overview"}});
	$scope.navigation_sections = _.filter(SHERPA.PROTO_ROUTES, function(route){if(route.parent){return route.parent.name === "css-overview-navigation"}});
	$scope.scrollSpy = function(){
		$('body').scrollspy({offset:40});
		window.setTimeout(function(){
			$('[data-spy="scroll"]').each(function () {
			  var $spy = $(this).scrollspy('refresh')
			});			
		},1000);
	}
	$scope.example_modal = {
		title:'Hello my friend',
		body: 'I am a simple demo modal!',
		footer: '<a href="#" class="btn">Close</a> <a href="#" class="btn btn-primary">Save changes</a>',
		dismiss:true
	}
	Sherpa.ready("ZeroClipboard", function(){
		window.setTimeout(function(){
			activateClipboard();
		},1000);
	});
/*	$scope.alerts = function(){
		var alerts_html = $('#alerts-example-HTML .alert'),alerts=[];
		_.each(alerts_html, function(item) {	
			var tempObj = {}
			tempObj.id = $(item).parent().attr('id');
			tempObj.html= $('#'+tempObj.id).html();
			tempObj.html_sample= tempObj.html.replace(/</g,'&lt;');
			alerts.push(tempObj);
		});
		return alerts;
	}*/


});

sherpaApp.controller("navigationController", function($scope, $state) {
	var tempArray = [];
	_.each(SHERPA.PROTO_ROUTES, function(route){

		if(route.parent){

			console.log("2 nav route? ",route.parent)
			
		}
	});
	console.log("routes",tempArray)
	$scope.navigation_sections = _.filter(SHERPA.PROTO_ROUTES, function(route){if(route.parent){return route.parent.name === "css-overview-navigation"}});

});
sherpaApp.controller("cssGridController", function($scope, $state) {
 	$('.footer-back-to-top').show()   
	Sherpa.ready("ZeroClipboard", function(){
		activateClipboard();
	});	
});
sherpaApp.controller("prototypingController", function($scope, $state) {
	$('.footer-back-to-top').show()    



});
sherpaApp.controller("styleguidesController", function($scope, $state) {
	$('.footer-back-to-top').show()    



});


sherpaApp.controller("footerController", function($scope, $state) {
    
	$scope.init = function(){
		$('.footer-back-to-top').affix();
	}

});




function activateClipboard(){
	var clip = new ZeroClipboard( $('[data-copy="2-clipboard"]'), {
	  moviePath: SHERPA.PATH_CORE_BIN+"ZeroClipboard.swf"
	} );

	clip.on( 'load', function(client) {
	  // alert( "movie is loaded" );
	} );

	clip.on( 'complete', function(client, args) {
	  //TODO need to do global modal
	  Sherpa.publish("modal", {
	    title:'Your HTML is in your clipboard',
	    body: args.text,
	    dismiss:true
	  });
	  window.setTimeout(function(){Sherpa.publish("modal","hide")}, 3000);

	} );

	clip.on( 'mouseover', function(client) {
	  // alert("mouse over");

	} );

	clip.on( 'mouseout', function(client) {
	  // alert("mouse out");
	} );

	clip.on( 'mousedown', function(client) {

	  // alert("mouse down");
	} );

	clip.on( 'mouseup', function(client) {
	  // alert("mouse up");
	} );		
}

