/* application for prototype */
Sherpa.ready("sherpaGlobalEvents", function(){
	var addToViewModel = {}, addToConfigs = {};

	//add any specific data/functions to view model
	addToViewModel = {
	};

	addToConfigs = {
	};



	/*********************************************************************************
	Please don't touch below
	*********************************************************************************/

	//join additional data/functions to view model
	_.extend(viewModel, addToViewModel);
	_.extend(viewModel.config, addToConfigs);

	addToViewModel = null;
	addToConfigs = null;

	/*********************************************************************************
	                              INSTRUCTIONS
	**********************************************************************************

	To add custom data or functions for your prototype add them to the addToViewModel

	You can add data:

	addToViewModel = {
		user: {
			name:ko.observable("Bo")
		},
	    question: ko.observable('How many roads must a man walk down before you can call him a man?')
	};

	You can add a function:

	addToViewModel.functionName = function(foobar) {
		alert(foobar)
	}


	You can add other custome js files by using:

	Sherpa.js(SHERPA.JS_PATH+"foobar.js")

	Sherpa.js({"mycustomejs": SHERPA.JS_PATH+"foobar.js"})

	Sherpa.ready("mycustomejs", function(){
		//do stuff here after your js is loaded
	});


	**********************************************************************************/
	// pretty print
	Sherpa.js({"pretty-print":".sherpa/lib/google-code-prettify/prettify.js"})
	Sherpa.ready("pretty-print", function(){
		prettyPrint();
	})
	


	//initCopyHTMLButtons();
	/*
	$('#icons [data-toggle="popover"]').popover({'trigger':'manual'});

	});
	$('#icons [data-toggle="popover"]').click(function(event) {
		event.stopPropagation();
	    var $pElem= $(this);

	    $('#icons [data-toggle="popover"]').popover('destroy');
	    if(!$(this).next().hasClass('popover')){
	    	$pElem.popover('show');
	    } else {
	    	$pElem.popover('destroy');
	    }
	});
	*/
	Sherpa.js({"ZeroClipboard":".sherpa/lib/ZeroClipboard.js"});
	Sherpa.ready("ZeroClipboard", function(){
		activateClipboard();
	});

	function activateClipboard(){
		var clip = new ZeroClipboard( $('[data-copy="2-clipboard"]'), {
		  moviePath: ".sherpa/bin/ZeroClipboard.swf"
		} );

		clip.on( 'load', function(client) {
		  // alert( "movie is loaded" );
		} );

		clip.on( 'complete', function(client, args) {
		  //alert("Copied text to clipboard: " + args.text );
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

	$('[data-toggle="tooltip"]').tooltip();
	$('.change-container-color a').click(function(event){
		event.preventDefault();
		var className = $(event.currentTarget).attr('class');
		$("#solid-colored-container-example").attr('class','well well-large well-'+className);
		$("#solid-colored-container-example-code").html('&lt;div class="well well-large well-'+className+'">...&lt;/div>');

	});
	$('.change-container-color-stroke a').click(function(event){
		event.preventDefault();
		var className = $(event.currentTarget).attr('class');
		$("#color-stroke-container-example").attr('class','well well-large well-'+className+'-stroke');
		$("#color-stroke-container-example-code").html('&lt;div class="well well-large well-'+className+'-stroke">...&lt;/div>');

	});
	$('.change-container-color-stroke-title a').click(function(event){
		event.preventDefault();
		var className = $(event.currentTarget).attr('class');
		$("#color-stroke-container-title-example").attr('class','well well-large well-'+className+'-stroke');
		$("#color-stroke-container-title-example-code").html('&lt;div class="well well-large well-'+className+'-stroke">&lt;h4 class="container-title">A really long title goes here&lt;/h4>...&lt;/div>');

	});
	$('.change-container-color-text a').click(function(event){
		event.preventDefault();
		var className = $(event.currentTarget).attr('class');
		$("#text-color-sample-code").html('&lt;p class="text-'+className+'">...&lt;/p>');
		$("#text-color-sample").html('<p class="text-'+className+'">This text is <strong>'+$(event.currentTarget).text()+'</strong>.</p>');
	});

	Sherpa.scope('header .navbar', function(){
		this.listen('.navbar-search.active .icon-ui-closecircle', 'click', function(event){
			$('header .navbar-search input').val("");
			$('header .navbar-search').removeClass('active');
			$('section').fadeIn();			
		});
		this.listen('.navbar-search input', 'keyup', function(event){
			if($(event.currentTarget).val()) {
				$('header .navbar-search').addClass('active');
				if($(event.currentTarget).val().length > 2) {
					search_page($(event.currentTarget).val());
				}
			} else {
				$('header .navbar-search').removeClass('active');
			}
		});
		this.listen('.nav a', 'click', function(event){
			event.preventDefault();
			var self = $(event.currentTarget), target = self.attr('href');
			$('header .nav li').removeClass('active');
			if(!self.parents('.nav > li.dropdown')) {
				self.parent().addClass('active');
				console.log("not in dropdown")
			} else {
				self.parents('.nav > li.dropdown').addClass('active');
				self.parent().addClass('active');
			}
			if(!target === "#" || target) {
				$.scrollTo(target,300,{offset:{top:-60}});
			}
		});
	});

	function search_page(search_term) {
		if(search_term) {
			_.each($('section'), function(section){
				var search_text = _.str.clean(_.str.stripTags($(section).text()));

				if(search_text.match(search_term, "gi")){
					$(section).fadeIn();
				} else {
					$(section).hide();
				}
			});
			if(!$('section:visible').length) {
				Sherpa.publish("modal", {
				    title:'Oh Snap! We found nothing!',
				    body: "This search engine ain't that good so take it easy! Scale your search down!",
				    dismiss:true
				});
				$('section').show();
			}
		} else {
			$('section').fadeIn();
		}
	}
	Sherpa.scope('[id*=-variations]', function(){
		this.listen('input[type="checkbox"]', 'click', function(event){
			var self = $(event.currentTarget)[0], id = $(self).attr('id');
			switch(id) {
				case "tabs-bordered":
					if(self.checked) {
						$('#tabbable-example-HTML .tabbable').addClass('tabs-bordered');
						$('#tabbable-example-HTML .tabbable').removeClass('tabs-left');
						$('#tabbable-example-HTML .tabbable').removeClass('tabs-gray-light');
						$('#tabbable-example-HTML .tabbable').removeClass('tabs-aside');
					} else {
						$('#tabbable-example-HTML .tabbable').removeClass('tabs-bordered');
					}
					$('#tabs-left')[0].checked = false;
					$('#tabs-aside')[0].checked = false;
					$('#tabs-gray-light')[0].checked = false;
					tabsReset();
				break;
				case "tabs-left":
					if(self.checked) {
						$('#tabbable-example-HTML .tabbable').addClass('tabs-left');
						$('#tabbable-example-HTML .tabbable').removeClass('tabs-bordered');
						$('#tabbable-example-HTML .tabbable').removeClass('tabs-aside');
					} else {
						$('#tabbable-example-HTML .tabbable').removeClass('tabs-left');
					}
					$('#tabs-aside')[0].checked = false;
					$('#tabs-bordered')[0].checked = false;
					tabsReset();	
				break;
				case "tabs-gray-light":
					if(self.checked) {
						$('#tabbable-example-HTML .tabbable').addClass('tabs-gray-light');
						$('#tabbable-example-HTML .tabbable').removeClass('tabs-bordered');
						$('#tabbable-example-HTML .tabbable').removeClass('tabs-aside');
					} else {
						$('#tabbable-example-HTML .tabbable').removeClass('tabs-gray-light');
					}	
					$('#tabs-aside')[0].checked = false;
					$('#tabs-bordered')[0].checked = false;
					tabsReset();
				break;
				case "tabs-aside":
					if(self.checked) {
						$('#tabbable-example-HTML .tabbable').addClass('tabs-aside');
						$('#tabbable-example-HTML .tabbable').removeClass('tabs-left');
						$('#tabbable-example-HTML .tabbable').removeClass('tabs-gray-light');
						$('#tabbable-example-HTML .tabbable').removeClass('tabs-bordered');
					} else {
						$('#tabbable-example-HTML .tabbable').removeClass('tabs-aside');
					}
					$('#tabs-left')[0].checked = false;
					$('#tabs-bordered')[0].checked = false;
					$('#tabs-gray-light')[0].checked = false;
					tabsReset();
				break;
				case "list-aside":
					if(self.checked) {
						$('#aside-example-HTML').show();
						$('#list-example-HTML').hide();
						$('list-HTML-code').html($('#aside-example-HTML').html().replace(/</g,'&lt;'));
						listReset('aside');
					} else {
						$('#aside-example-HTML').hide();
						$('#list-example-HTML').show();
						$('list-HTML-code').html($('#list-example-HTML').html().replace(/</g,'&lt;'));
						listReset();
					}	
					
				break;
			}
			function tabsReset(){
				$('#tabs-HTML-code').html($('#tabbable-example-HTML').html().replace(/</g,'&lt;'));
				$('#tabs-HTML-code').removeClass('prettyprinted');
				prettyPrint();
				$('#tabs-HTML [data-copy]').attr('data-clipboard-text',$('#tabbable-example-HTML').html());				
			}
			function listReset(aside){
				if(!aside) {
					aside = "list";
				}
				$('#list-HTML-code').html($('#'+aside+'-example-HTML').html().replace(/</g,'&lt;'));
				$('#list-HTML-code').removeClass('prettyprinted');
				prettyPrint();
	
				$('#list-HTML [data-copy]').attr('data-clipboard-text',$('#'+aside+'-example-HTML').html());			
			}

		});
	});

});



console.log("app.js loaded");

