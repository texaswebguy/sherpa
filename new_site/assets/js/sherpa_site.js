/* application for prototype */
Sherpa.ready("sherpaGlobalEvents", function(){

	var addToViewModel = {}, addToConfigs = {};

	//add any specific data/functions to view model
	addToViewModel = {
		user: {
			name:ko.observable("Carl Weatherspoon")
		},
	    question: ko.observable('How many roads must a man walk down before you can call him a man?'),
	    test:true
	};

	addToConfigs = {
		sample_custom_config : true
	}


	$(window).resize(function() {
		if(viewModel.isDesktop()){
			$('#menu').show()
		}
	});

	Eve.scope("#menu-toggle", function(){
		this.listen("span", "click", function(event){
			event.preventDefault();
			console.log("hello");
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
		this.listen("li a", "click", function(event){
			event.preventDefault();
			$('body').scrollTo($(event.currentTarget).attr('href'),300);
		})
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

console.log("app.js loaded");