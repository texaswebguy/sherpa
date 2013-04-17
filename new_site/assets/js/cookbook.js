/* application for prototype */
var addToViewModel = {}, addToConfigs = {};

//add any specific data/functions to view model
addToViewModel = {
	user: {
		name:ko.observable("Carl Weatherspoon")
	},
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
    sample_dropdown_1 : {
        items: [
            {
                id : "action_1",
                label_textkey : "",
                label : "Action 1",
                url : "#action"
            },
            {
                id : "action_2",
                label_textkey : "",
                label : "Action 2",
                url : "#action"
            },
            {
                id : "action_3",
                label_textkey : "",
                label : "Action 3",
                url : "#action",
                disabled: true
            },
            {
                divider :  true
            },
            {
                id : "action_4",
                label_textkey : "",
                label : "Action 4",
                url : "#action",
                items: [
                    {
                		id : "action_4_1",
                        label_textkey : "",
                        label : "Second Level Action 1",
                        url : "#action"
                    },
                    {
                		id : "action_4_2",
                        label_textkey : "",
                        label : "Second Level Action 2",
                        url : "#action"
                    },
                    {
                		id : "action_4_3",
                        label_textkey : "",
                        label : "Second Level Action 3",
                        url : "#action",
                        disabled: true
                    }
                ]
            }
        ]
    },
    sample_dropdown_2 : {
        items: [
            {
                id : "action_1",
                label_textkey : "",
                label : "Action 1",
                url : "#action"
            },
            {
                id : "action_2",
                label_textkey : "",
                label : "Action 2",
                url : "#action"
            },
            {
                id : "action_3",
                label_textkey : "",
                label : "Action 3",
                url : "#action"
            }
        ]
    }

};

addToConfigs = {
	sample_custom_config : true,
    some_boolean_variable : true,
    some_other_boolean_variable : false,
}

var some_boolean_function = function(){
	var q = Sherpa.urlQuery();
	if(q.boolean_example === "true") {
		return true;
	} else {
		return false;
	}
}

Eve.scope(".bs-docs-sidenav", function(){
	this.listen("li a", "click", function(event){
		event.preventDefault();
		$('body').scrollTo($(event.currentTarget).attr('href'),300);
		$(event.currentTarget).parents(".bs-docs-sidenav").find("li").removeClass('active');
		$(event.currentTarget).parent().addClass('active');
		$('#bs-docs-sidenav').scrollspy('refresh');
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

