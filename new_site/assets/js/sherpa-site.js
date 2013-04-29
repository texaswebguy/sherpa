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
			$('.bs-docs-sidenav').width($('.da1-da3').width());
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
			$.scrollTo($(event.currentTarget).attr('href'),300, {offset:{top:-60}}); //might have to be different in mobile
			//TODO there is a bug that when you click on the top item it does not scroll high enough.  Might need to create a different event or add a condition.
			if(!viewModel.isDesktop()){
				$(event.target).parents(".bs-docs-sidenav").toggleClass('open');
				$(event.target).parents(".bs-docs-sidenav").scrollspy('refresh');
			}
		});

	});

	$('.code_sample_popup').click(function(event){
		event.preventDefault();
		var url = $(event.target).attr('href');
		window.open(url,'app.js','width=700,height=500,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0');
		return false;
	});



	$('[data-spy="scroll"]').each(function () {
	  var $spy = $(this).scrollspy('refresh');
	  //when this fires we want the size of the sidebar to be the same as .da1-da3.
	  //TODO need to figure out what we want to do for tablet and mobile.
	  $('.bs-docs-sidenav').width($('.da1-da3').width()) ;
	});



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

console.log("app.js loaded");