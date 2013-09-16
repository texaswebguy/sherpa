/* application for prototype */
Sherpa.ready("sherpaGlobalEvents", function(){
	var addToViewModel = {}, addToConfigs = {};


	// Page level libraries
	Sherpa.js({"pretty-print":".sherpa/lib/google-code-prettify/prettify.js"})
	Sherpa.js({"ZeroClipboard":".sherpa/lib/ZeroClipboard.js"});

	//add any specific data/functions to view model
	addToViewModel = {
		showPage: function() {
			$('#'+this.id).show();
		},
		pageInit: function(){
			Sherpa.ready("ZeroClipboard", function(){
				activateClipboard();
			});	
			Sherpa.ready("pretty-print", function(){
				prettyPrint();
			});
			$('[data-toggle="tooltip"]').tooltip();

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

			$('.change-container-color a').click(function(event){
				event.preventDefault();
				var className = $(event.currentTarget).attr('class');
				$("#solid-colored-container-example").attr('class','well well-large well-'+className);
				$("#solid-colored-container-example-code").html('&lt;div class="well well-large well-'+className+'">...&lt;/div>');

			});
			$('.change-container-bleed a').click(function(event){
				event.preventDefault();
				var className = $(event.currentTarget).attr('class');
				$("#color-bleed-container-example").attr('class','well well-large well-'+className+' well-bleed');
				$("#color-bleed-container-example-code").html('&lt;div class="well well-large well-'+className+' well-bleed">...&lt;/div>');
				$("#color-bleed-container-example-code").attr('data-clipboard-text',$('#color-bleed-container-example')[0].outerHTML);

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
				var sampleHtml = '<p class="text-'+className+'">This text is <strong>'+$(event.currentTarget).text()+'</strong>.</p>';
				$("#text-color-sample-code").html('&lt;p class="text-'+className+'">...&lt;/p>');
				$("#text-color-sample").html(sampleHtml);
			});

			$('.launch-demo-modal').click(function(event){
				  Sherpa.publish("modal", {
				    title:'Hello my friend',
				    body: 'I am a simple demo modal!',
				    footer: '<a href="#" class="btn">Close</a> <a href="#" class="btn btn-primary">Save changes</a>',
				    dismiss:true
				  });
			});

		},
		equalizeThumbnails: function(){
			var max = 0;
			_.each($('.thumbnail'), function(thumbnail) {
				var height = $(thumbnail).height();
				if(height > max) {
					max = height;
				}
			});
			$('.thumbnail').height(max);
		}

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

	


	Sherpa.scope('header .navbar', function(){
		this.listen('.navbar-search.active .icon-ui-closecircle', 'click', function(event){
			$('header .navbar-search input').val("");
			$('header .navbar-search').removeClass('active');
			$('section, article, [data-keywords]').fadeIn();			
		});

		this.listen('.nav a', 'click', function(event){
			event.preventDefault();
			var self = $(event.currentTarget), target = self.attr('href');
			switch(target) {

				case "#download-theme":
				location.href = "dell-308-theme.zip";
				break;
				case "#known-issues":
				location.href = "https://github.com/DellGDC/sherpa/tree/magnum-308-theme-october/.sherpa/css-source/themes/dell-308";
				break;
				default:
					$('header .nav li').removeClass('active');
					if(!self.parents('.nav > li.dropdown')) {
						self.parent().addClass('active');
					} else {
						self.parents('.nav > li.dropdown').addClass('active');
						self.parent().addClass('active');
					}
					if(target != "#" && target) {
						$.scrollTo(target,300,{offset:{top:-100}});
					}		
			}

		});
	});

	function search_page(search_term) {
		if(search_term) {
			_.each($('section, [data-keywords]'), function(section){
				var search_text = _.str.clean(_.str.stripTags($(section).text()));
				search_text += $(section).attr('data-keywords');
				if(search_text.match(search_term, "gi")){
					$(section).fadeIn();
				} else {
					$(section).hide();
				}
			});
			if(!$('[data-keywords]:visible').length) {
				Sherpa.publish("modal", {
				    title:'Oh Snap! We found nothing!',
				    body: "This search engine ain't that good so take it easy! Scale your search down!",
				    dismiss:true
				});
				$('section, [data-keywords]').show();
			}
		} else {
			$('section, [data-keywords]').fadeIn();
		}
		// need to implement something like window.find(aString, aCaseSensitive, aBackwards, aWrapAround, aWholeWord, aSearchInFrames, aShowDialog); for when inside of a page.
	}
	Sherpa.scope('*', function(){
		this.listen('a.scroll','click', function(event){
			var target = $(event.currentTarget).attr('href');
			event.preventDefault();
			$('#header-308-site .nav > li.active').removeClass('open');
			$.scrollTo(target,300,{offset:{top:-($('header').height()+10)}});	
		});
		this.listen('.sub-nav .icon-ui-close','click', function(event){
			$('#header-308-site .nav > li.active').removeClass('open');	
			$('.sub-nav').collapse('hide');	
		});	
	});


	Sherpa.scope('#header-308-site ', function(){
		this.listen('ul.nav > li.active > a','mouseenter', function(event){
			if($("#"+$('html').attr('id')+' .sub-nav')) {
				$('#header-308-site .nav > li.active').addClass('open');
				$("#"+$('html').attr('id')+' .sub-nav').collapse('show');				
			}
		});

		this.listen('ul.nav > li.active > a','click', function(event){
			if($("#"+$('html').attr('id')+' .sub-nav')) {
				if($('#header-308-site .nav > li.active').hasClass('open')) {
					$('#header-308-site .nav > li.active').removeClass('open');
				} else {
					$('#header-308-site .nav > li.active').addClass('open');
				}
			}
			
		});	
		this.listen('input.search-tags', 'keyup', function(event){
			if($(event.currentTarget).val()) {
				$('header .navbar-search').addClass('active');
				if($(event.currentTarget).val().length > 2) {
					search_page($(event.currentTarget).val());
				}
			} else {
				$('header .navbar-search').removeClass('active');
			}
		});
		this.listen('.navbar-search.active .icon-ui-close', 'click', function(event){
			$('header .navbar-search').removeClass('active');
			$('input.search-tags').val("");
			search_page();
		});


	});	
	Sherpa.scope('[id*=-variations]', function(){
		this.listen('input[type="radio"],input[type="checkbox"]', 'click', function(event){
			var self = $(event.currentTarget)[0], id = $(self).attr('id');

			switch(id) {
				case "tabs-bordered":
					$('#tabbable-example-HTML .tabbable').addClass('tabs-bordered');
					$('#tabbable-example-HTML .tabbable').removeClass('tabs-left');
					$('#tabbable-example-HTML .tabbable').removeClass('tabs-gray-light');
					$('#tabbable-example-HTML .tabbable').removeClass('tabs-aside');
					$('#tabbable-example-HTML').show();
					$('#tabbable-aside-example-HTML').hide();
					tabsReset();
				break;
				case "tabs-left":
					$('#tabbable-example-HTML .tabbable').addClass('tabs-left');
					$('#tabbable-example-HTML .tabbable').removeClass('tabs-bordered');
					$('#tabbable-example-HTML .tabbable').removeClass('tabs-aside');
					$('#tabbable-example-HTML .tabbable').removeClass('tabs-gray-light');
					$('#tabbable-example-HTML').show();
					$('#tabbable-aside-example-HTML').hide();
					tabsReset();	
				break;
				case "tabs-gray-light":
					$('#tabbable-example-HTML .tabbable').addClass('tabs-left');
					$('#tabbable-example-HTML .tabbable').addClass('tabs-gray-light');
					$('#tabbable-example-HTML .tabbable').removeClass('tabs-bordered');
					$('#tabbable-example-HTML .tabbable').removeClass('tabs-aside');
					$('#tabbable-example-HTML').show();
					$('#tabbable-aside-example-HTML').hide();
					tabsReset();
				break;
				case "tabs-standard":
					$('#tabbable-example-HTML .tabbable').removeClass('tabs-gray-light');
					$('#tabbable-example-HTML .tabbable').removeClass('tabs-bordered');
					$('#tabbable-example-HTML .tabbable').removeClass('tabs-aside');
					$('#tabbable-example-HTML .tabbable').removeClass('tabs-left');
					$('#tabbable-example-HTML').show();
					$('#tabbable-aside-example-HTML').hide();
					tabsReset();
				break;				
				case "tabs-aside":
					$('#tabbable-example-HTML').hide();
					$('#tabbable-aside-example-HTML').show();
					tabsReset('aside');
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
			function tabsReset(aside){
				if(aside) {
					aside = "list";
				} else {
					$('#tabs-HTML-code').html($('#tabbable-example-HTML').html().replace(/</g,'&lt;'));
					$('#tabs-HTML-code').removeClass('prettyprinted');				
					prettyPrint();
					$('#tabs-HTML [data-copy]').attr('data-clipboard-text',$('#tabbable-example-HTML').html());				
				}
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

