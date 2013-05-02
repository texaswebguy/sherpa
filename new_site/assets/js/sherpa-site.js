
Sherpa.counter("sherpa-site-app");
/* application for prototype */
Sherpa.ready("sherpaGlobalEvents", function(){

	var addToViewModel = {}, addToConfigs = {};

	//add any specific data/functions to view model
	addToViewModel = {
	    sherpa_masthead: [
	    	{ 
	    		id: 'get_started',
	    		label : 'Get Started',
	    		url : 'how-to.html',
	    		browser_title : "Sherpa - How to get started"
	    	},
	    	{ 
	    		id: 'scaffolding',
	    		label : 'Scaffolding',
	    		url : 'scaffolding.html',
	    		browser_title : "Sherpa - Scaffolding"
	    	},
	    	{ 
	    		id: 'base_css',
	    		label : 'Basic Elements',
	    		url : 'base-css.html',
	    		browser_title : "Sherpa - Basis CSS Elements"
	    	},
	    	{ 
	    		id: 'components',
	    		label : 'Components',
	    		url : 'components.html',
	    		browser_title : "Sherpa - Components"
	    	},
	    	{ 
	    		id: 'configuration',
	    		label : 'Configuration',
	    		url : 'configuration.html',
	    		browser_title : "Sherpa - Configuring your prototypes"
	    	},
	    	{ 
	    		id: 'functions',
	    		label : 'Functions',
	    		url : 'functions.html',
	    		browser_title : "Sherpa - Javascript Functions"
	    	}
	    ],
		user: {
			name:ko.observable("Carl Weatherspoon")
		},
		mycustomVar:"hello world",
	    question: ko.observable('How many roads must a man walk down before you can call him a man?'),
	    sample_date: "12/01/2014",
	    sample_preformated_date: Sherpa.dateFormat("12/01/2014"),
	    sample_price: "499.00",
	    sample_preformated_price: Sherpa.formatCurrency("499.00"),
	    checkbox_value: ko.observable(false),
	    checkbox_fade_value: ko.observable(false),
	    checkbox_slide_value: ko.observable(false),
	    dropdown_values : ["alpha", "beta", "charlie"],
	    selected_dropdown_value : ko.observable("alpha"),
	    selected_fade_dropdown_value : ko.observable("alpha"),
	    selected_slide_dropdown_value : ko.observable("alpha"),
	    show_sample_core_config : ko.observable(false),
	    simple_links_data : {
		    label : 'Sample links',
		    items: [
		        {
		            id : "action_1",
		            label : "Action 1",
		            url : "#action"
		        },
		        {
		            id : "action_2",
		            label : "Action 2",
		            url : "#action"
		        },
		        {
		            id : "action_3",
		            label : "Action 3",
		            url : "#action",
		            disabled: true
		        },
		        {
		            divider :  true
		        },
		        {
		            id : "action_4",
		            label : "Action 4",
		            url : "#action"
		        }
		    ]
		},
		sample_links_complex : {
		    label : 'Sample complex links',
	        items: [
	            {
	                id : "action_1",
	                label : "Action 1",
	                url : "#action"
	            },
	            {
	                id : "action_2",
	                label : "Action 2",
	                url : "#action"
	            },
	            {
	                id : "action_3",
	                label : "Action 3",
	                url : "#action",
	                disabled: true
	            },
	            {
	                divider :  true
	            },
	            {
	                id : "action_4",
	                label : "Action 4",
	                url : "#action",
	                items: [
	                    {
	                		id : "action_4_1",
	                        label : "Second Level Action 1",
	                        url : "#action"
	                    },
	                    {
	                		id : "action_4_2",
	                        label : "Second Level Action 2",
	                        url : "#action"
	                    },
	                    {
	                		id : "action_4_3",
	                        label : "Second Level Action 3",
	                        url : "#action",
	                        disabled: true
	                    }
	                ]
	            }
	        ]
	    },
	    sample_tab_section_data: {
	    	label: "Sample tab section",
	    	items: [
                {
            		id : "sub-section-1",
                    label : "Sub Section 1",
                    page_id : "sub-section-1"
                },
                {
            		id : "sub-section-2",
                    label : "Sub Section 2",
                    page_id : "sub-section-2"
                },
                {
            		id : "sub-section-3",
                    label : "Sub Section 3",
                    page_id : "sub-section-3"
                }
	        ]
	    },
		some_boolean_function : function(){
			var q = Sherpa.urlQuery();
			if(q.boolean_example === "true") {
				return true;
			} else {
				return false;
			}
		}
	    
	};

	addToConfigs = {
		sample_custom_config : true,
	    some_boolean_variable : true,
	    some_other_boolean_variable : false
	}

	$(window).resize(function() {
		if(viewModel.isDesktop()){
			$('#menu').show();
			$(".bs-docs-sidenav.affix").width($('.da1-da3').width());
		} else {
			//TODO Have to make sure that both tablet and mobile are indeed 100%
			$('.bs-docs-sidenav').width('100%');
		}
	});

	Eve.scope("#menu-toggle", function(){
		this.listen("span", "click", function(event){
			event.preventDefault();
			if($('#menu').hasClass('ta-hide ma-hide')){
				$('#menu').hide();
				$('#menu').toggleClass('ta-hide ma-hide ta-all ma-all');
				$('#menu').slideDown('fast');
			} else {
				$('#menu').slideUp('fast', function(){
					$('#menu').toggleClass('ta-hide ma-hide ta-all ma-all');
				});
			}
		})
	})


	Eve.scope(".bs-docs-sidenav", function(){
		this.listen("li.active a", "click", function(event){
			event.preventDefault();
			event.stopPropagation();
			$(event.target).parents(".bs-docs-sidenav").toggleClass('open');
		});
		this.listen('li:not("[class=active]") a', "click", function(event){
			event.preventDefault();
			console.log("hello")
			$.scrollTo($(event.currentTarget).attr('href'),300, {offset:{top:-60}}); //might have to be different in mobile
			//TODO there is a bug that when you click on the top item it does not scroll high enough.  Might need to create a different event or add a condition.
			if(!viewModel.isDesktop()){
				$(event.target).parents(".bs-docs-sidenav").toggleClass('open');
			}
		});


	});

	$('.code_sample_popup').click(function(event){
		event.preventDefault();
		var url = $(event.target).attr('href');
		window.open(url,'app.js','width=700,height=500,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0');
		return false;
	});



	$('.test-page-level-alert').click(function(event){
		event.preventDefault();
		Sherpa.publish( "alert_message", {
	      "type": "error",
	      "title":"Sample Title",
	      "message": "This is a sample message",
	      "dismiss":true,
	      "icon":"icon-alert-notice"
	    });
	});

	$('.bs-docs-sidenav').waypoint('sticky', {
	  stuckClass: 'affix',
	  offset: 70,
	  complete: function(){$(".bs-docs-sidenav.affix").width($('.da1-da3').width())}
	});
	/* TODO: need to abstrack waypoints sticky to overtake data-spy="scroll" bootstrap selectors
	The version of waypoints sticky loaded provides a call back function which is critical in hard setting the width of the affix element
	*/


	



//data-waypoint-trigger="true" data-waypoint-offsetUp="70" data-waypoint-offsetDown="100" data-waypoint-target="article"
/*	$('[data-waypoint-trigger="true"]').each(function () {
		var wp={};
		wp.trigger = $(this);
		wp.offsetUp = wp.trigger.attr('data-waypoint-offsetUp');
		wp.offsetDown = wp.trigger.attr('data-waypoint-offsetDown');
		wp.target = wp.trigger.attr('data-waypoint-target');
		if(!wp.offsetUp){wp.offsetUp=0}
		if(!wp.offsetDown){wp.offsetDown=0}
		if(!wp.target){console.error('You need to include a target selector attribute such as data-waypoint-target=".foobar"')} else {
			wp.activate = function(element){
				console.log($(element).html())
				wp.trigger.find('li.active').removeClass('active');
				wp.id = '#'+$(element).attr('id');
				wp.trigger.find('li a[href='+wp.id+']').parent().addClass('active');
			}
			$(wp.target).waypoint(function(direction) {
				if(direction=="down") {
					wp.activate($(this));
				}
				console.log(wp)
			}, { offset: wp.offsetUp });

			$(wp.target).waypoint(function(direction) {
				if(direction=="up") {
					wp.activate($(this));
				}
				console.log(wp.trigger.find('li a[href='+wp.id+']').parent().html())
			}, { 
				offset: function() { 
					return -$(this).height()+wp.offsetDown;
				}
			});
		}
		console.log(wp)
	});
*/


	$('article').waypoint(function(direction) {
		if(direction=="down") {
			$('.nav.nav-list.bs-docs-sidenav li.active').removeClass('active');
			var id = '#'+$(this).attr('id');
			$('.nav.nav-list.bs-docs-sidenav li a[href='+id+']').parent().addClass('active');
		}
	}, { offset: 80 });

	$('article').waypoint(function(direction) {
		if(direction=="up") {
			$('.nav.nav-list.bs-docs-sidenav li.active').removeClass('active');
			var id = '#'+$(this).attr('id');
			$('.nav.nav-list.bs-docs-sidenav li a[href='+id+']').parent().addClass('active');
		}
	}, { 
		offset: function() { 
			return -$(this).height()+100
		}
	});

	$('.bs-docs-sidenav.affix').css('width',$('.da1-da3').width());
	//TODO: hack to make up the fact that active class gets stripped - the problem is with scroll-spy
	Sherpa.ready("bootstrap", function(){
		_.each($('.tabbable'), function(tabs){
			$(tabs).find('li:first').addClass('active');
		});
	})

	$('.tab_color_switcher').change(function(event){
		event.preventDefault();
		$('#switch_my_color').attr('class',$(event.currentTarget).val());
	});
	


    // tooltip demo
    $('#tooltips').tooltip({
      selector: "a[rel=tooltip]"
    })

    $('.tooltip-test').tooltip()
    $('.popover-test').popover()

    // popover demo
    $("a[rel=popover]")
      .popover()
      .click(function(e) {
        e.preventDefault()
      })



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


});

Sherpa.counter("sherpa-site-app");