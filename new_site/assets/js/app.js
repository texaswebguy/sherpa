/* application for prototype */
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

$(document).ready(function() {
      $("#menu-toggle").click(function(event) {
        event.preventDefault();
        $('#menu').slideToggle('fast');
      });
    });


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

console.log("app.js loaded");