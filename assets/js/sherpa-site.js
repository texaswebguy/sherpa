
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
	    		file_name : 'pages/sherpa-site/how-to.html',
	    		url : '#!/get_started',
	    		browser_title : "Sherpa UX Prototyping - How to get started"
	    	},
	    	{ 
	    		id: 'scaffolding',
	    		label : 'Scaffolding',
	    		file_name : 'pages/sherpa-site/scaffolding.html',
	    		url : '#!/scaffolding',
	    		browser_title : "Sherpa UX Prototyping - Scaffolding"
	    	},
	    	{ 
	    		id: 'base_css',
	    		label : 'Basic Elements',
	    		file_name : 'pages/sherpa-site/base-css.html',
	    		url : '#!/base_css',
	    		browser_title : "Sherpa UX Prototyping - Basic HTML/CSS elements"
	    	},
	    	{ 
	    		id: 'components',
	    		label : 'Components',
	    		file_name : 'pages/sherpa-site/components.html',
	    		url : '#!/components',
	    		browser_title : "Sherpa UX Prototyping - Components"
	    	},
	    	{ 
	    		id: 'configuration',
	    		label : 'Configuration',
	    		file_name : 'pages/sherpa-site/configuration.html',
	    		url : '#!/configuration',
	    		browser_title : "Sherpa UX Prototyping - Configuring your prototypes"
	    	},
	    	{ 
	    		id: 'functions',
	    		label : 'Functions',
	    		file_name : 'pages/sherpa-site/functions.html',
	    		url : '#!/functions',
	    		browser_title : "Sherpa UX Prototyping - Javascript Functions"
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
			$(".sherpa-docs-sidenav.affix").width($('.da1-da3').width());
		} else {
			//TODO Have to make sure that both tablet and mobile are indeed 100%
			$('.sherpa-docs-sidenav').width('100%');
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


	Eve.scope(".sherpa-docs-sidenav", function(){
		this.listen("li.active a", "click", function(event){
			event.preventDefault();
			event.stopPropagation();
			$(event.target).parents(".sherpa-docs-sidenav").toggleClass('open');
		});
		this.listen('li:not("[class=active]") a', "click", function(event){
			event.preventDefault();
			$.scrollTo($(event.currentTarget).attr('href'),300, {offset:{top:-60}}); //might have to be different in mobile
			//TODO there is a bug that when you click on the top item it does not scroll high enough.  Might need to create a different event or add a condition.
			if(!viewModel.isDesktop()){
				$(event.target).parents(".sherpa-docs-sidenav").toggleClass('open');
			}
		});
	});

	$('.code_sample_popup').click(function(event){
		event.preventDefault();
		var url = $(event.target).attr('href');
		window.open(url,'app.js','width=700,height=500,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0');
		return false;
	});




	$('.tab_color_switcher').change(function(event){
		event.preventDefault();
		$('#switch_my_color').attr('class',$(event.currentTarget).val());
	});
	


    // tooltip demo
    $('#tooltips').tooltip({
      selector: "a[rel=tooltip]"
    })
    $('a[data-toggle=tooltip]').tooltip();

    $('.tooltip-test').tooltip()
    $('.popover-test').popover()

    // popover demo
    $("a[rel=popover]")
      .popover()
      .click(function(e) {
        e.preventDefault()
      })

    $('.showDefaultAside').click(function(event){
		event.preventDefault();
		$(this).hide();
		$('.hideDefaultAside').show();
		$('.aside').addClass('sherpa-docs-example');
	});
    $('.hideDefaultAside').click(function(event){
		event.preventDefault();
		$(this).hide();
		$('.showDefaultAside').show();
		$('.aside').removeClass('sherpa-docs-example');
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

Sherpa.counter("sherpa-site-app");