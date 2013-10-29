// Page level libraries
Sherpa.js({"pretty-print":"_sherpa/lib/google-code-prettify/prettify.js"}) 
Sherpa.js({"ZeroClipboard":SHERPA.PATH_CORE_JS+"ZeroClipboard.js"});


//TODO convert to directive that requires no change to bootstrap native code
/*sherpaApp.directive('affixAside', function(){
	return function(scope, elem, attr) {

	}
});*/

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

	$scope.routes = _.filter(SHERPA.PROTO_ROUTES, function(route){ return !route.parent && !route.hide});
	$scope.$state = $state;
	$scope.current_name = $state.current.name;

});sherpaApp.controller("whySherpaCtrl", function($scope, $state) {
	
	//var viewModel = $scope.$parent.viewModel;

    //TODO need to make an equalize directive Sherpa.equalizeHeight
	$scope.equalize= function(){
		window.setTimeout(function(){
			var max = 0;
			_.each($('.equalize'), function(item){
				if($(item).height() > max){
					max = $(item).height();
				}
			});
			$('.equalize').height(max);
		},500);
	}

});
sherpaApp.controller("homeController", function($scope, $state, $rootScope) {
    //var viewModel = $scope.$parent.viewModel;
	$('.footer-back-to-top').hide()
    $scope.$on('$viewContentLoaded', function(event){
        console.log("home Controller is done")
    });
});
sherpaApp.controller("getStartedController", function($scope, $state) {

	//var viewModel = $scope.$parent.viewModel;

	$('.footer-back-to-top').show()

	$scope.prettyPrint = initPrettyPrint();
	$scope.initAside = initAside();
/*	$scope.scrollSpy = function(){
		$('.set-aside').scrollspy({offset:40});
		window.setTimeout(function(){
			$('[data-spy="scroll"]').each(function () {
			  var $spy = $(this).scrollspy('refresh')
			});			
		},1000);
	}*/

	$scope.sections = [
		{
			templateUrl: "pages/get-started/starter-kit.md",
			label: "Your Starter Kit",
			id:"your-starter-kit"
		},
		{
			templateUrl: "pages/get-started/blank.md",
			label: "The Blank Folder",
			id:"the-blank-folder"
		},
		{
			templateUrl: "pages/get-started/index-file.md",
			label: "The index.html file",
			id:"the-index-html-file"
		},
		{
			templateUrl: "pages/get-started/configuration.md",
			label: "Configuring Your Prototype",
			id:"configuring-your-prototype"
		},
		{
			templateUrl: "pages/get-started/page-routing.md",
			label: "Page Routing",
			id:"page-routing"
		},
		{
			templateUrl: "pages/get-started/examples.md",
			label: "Examples",
			id:"examples"
		}
	]
	

});

sherpaApp.controller("cssOverviewController", function($scope, $state,$timeout) {

 	$('.footer-back-to-top').show()
	$scope.prettyPrint = initPrettyPrint(); //TODO make directive to do this with class
	$scope.initAside = initAside(); //TODO to make directive
	$scope.sections = _.filter(SHERPA.PROTO_ROUTES, function(route){if(route.parent){return route.parent === "css-overview"}});
	$scope.navigation_sections = _.filter(SHERPA.PROTO_ROUTES, function(route){if(route.parent){return route.parent === "css-overview-navigation"}});

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
	$scope.initTooltips = function(){
		$('[data-toggle="tooltip"]').tooltip();
	}
	$scope.initPopovers = function(){
		$('[data-toggle="popover"]').popover({trigger:'manual'});
		$('[data-toggle="popover"]').click(function(event){
		  event.preventDefault();
		  $('[data-toggle="popover"]').popover('destroy');
		  $(this).popover('show');
		  $('[data-dismiss="popover"]').click(function(event){
		    event.preventDefault();
		    $(this).parents('.popover').prev().popover('hide');
		  });
		});
		$('[data-toggle="popover"][data-trigger="hover"]').mouseover(function(event){
		  event.preventDefault();
		  $('[data-toggle="popover"]').popover('destroy');
		  $(this).popover('show');
		});
		$('[data-toggle="popover"][data-trigger="hover"]').mouseout(function(event){
		  $(this).popover('destroy');
		});
		$('[data-toggle="popover"][data-trigger="hover"]').focus(function(event){
		  $('[data-toggle="popover"]').popover('destroy');
		  $(this).popover('show');
		});
		 
		$('#custom-popover').click(function(event){
		  event.preventDefault();
		  $(this).popover('show');
		  $('[data-dismiss="popover"]').click(function(event){
		    event.preventDefault();
		    $(this).parents('.popover').prev().popover('hide');
		  });
		});
	}
	$scope.popoversHTML = (function(){
		var html = []
		_.each($('#popover-example-HTML [data-toggle="popover"]'), function(popover){
			var tempObj = {};
			tempObj.clipboardText = popover;
			tempObj.exampleHTML = popover.replace((/</g,'&lt;'));
			html.push(tempObj);
			console.log(html)
		});
		console.log(html)
		return html;
	})();
	$timeout(function(){
		$scope.paginationHTML = (function(){
			return $('#pagination-example-HTML .pagination');
		})();

	},1000);
	$scope.changeTabs = function(event){
		var new_val = $(event.currentTarget).val();
		if(new_val==="tabs-aside"){

			var html = $('#tabbable-aside-example-HTML').html();
			$('#tabs-HTML-code').html(html.replace(/\</g,"&lt;"));
			$('#tabs-HTML-code').removeClass("prettyprinted");
			$('#tabs-HTML button').attr('data-clipboard-text',html);
			initPrettyPrint();
			$('#tabbable-example-HTML').hide();
			$('#tabbable-aside-example-HTML').show();
			$.scrollTo('#tabs-lists-pills',300,{offset:-20})
		} else {
			var new_class = "tabbable "+$(event.currentTarget).val();
			$('#tabbable-example-HTML > .tabbable').attr('class', new_class);
			var html = $('#tabbable-example-HTML').html();
			$('#tabs-HTML-code').html(html.replace(/\</g,"&lt;"));
			$('#tabs-HTML-code').removeClass("prettyprinted");
			$('#tabs-HTML button').attr('data-clipboard-text',html);
			initPrettyPrint();
			$('#tabbable-example-HTML').show();
			$('#tabbable-aside-example-HTML').hide();
			$.scrollTo('#tabs-lists-pills',300,{offset:-20})
		}
		
	}

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

