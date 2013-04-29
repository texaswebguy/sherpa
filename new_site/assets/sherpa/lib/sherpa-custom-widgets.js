Sherpa.counter("Sherpa Custom Widgets");
Sherpa.ready("sherpai18n", function(){


	ko.bindingHandlers['msg'] = {
	    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

			if(Sherpa.check_condition(allBindingsAccessor())) {
		    	var key = valueAccessor();
		    	var msg_error = 'When passing data to msg you must follow this format data-bind="msg: {textkey: \'text_example_textkey\', data: test_var}" or to pass a textkey to a placeholder us { placeholder: \'text_example_textkey\'}';
		    	var proccessed = false;
		    	if(_.isObject(key)){
		    		if(key.placeholder) {
		    			$(element).attr('placeholder',Sherpa.msg(key.placeholder));
		    			proccessed = true;
		    		} 
		    		if(key.value) {
		    			$(element).attr('value',Sherpa.msg(key.value));
		    			proccessed = true;
		    		}
		    		if(key.textkey) {
		    			$(element).html(Sherpa.msg(key.textkey,key.data));
		    			proccessed = true;
		    		}
		    		if(!proccessed) {
		    			console.error(msg_error);
		    		}
		    	} else {
		    		$(element).html(Sherpa.msg(key));
		    	}
		    } else {
		    	$(element).remove();
		    }
		    //TODO need to write an update function to make this reactive
	    }
	};

	ko.bindingHandlers['linkedmsg'] = {
	    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

			if(Sherpa.check_condition(allBindingsAccessor())) {
		    	var key = valueAccessor();
		    	var msg_error = 'When passing data to msg you must follow this format data-bind="msg: {textkey: \'text_example_textkey\', data: test_var}" or to pass a textkey to a placeholder us { placeholder: \'text_example_textkey\'}';
		    	var proccessed = false;
		    	if(_.isObject(key)){
		    		
		    		if(key.textkey) {
		    			$(element).html(Sherpa.linkedmsg(key.textkey,key.data));
		    			proccessed = true;
		    		}
		    		if(!proccessed) {
		    			console.error(msg_error);
		    		}
		    	} else {
		    		$(element).html(Sherpa.linkedmsg(key));
		    	}
		    } else {
		    	$(element).remove();
		    	//if the condition is false then remove object from DOM
		    	//TODO... the condition should be based on an observable which would automatically remove element when set to false
		    }
		    //TODO need to write an update function to make this reactive
	    }
	};

	ko.bindingHandlers['formatdate'] = {
	    init:function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			$(element).html(Sherpa.dateFormat(valueAccessor()));
			//TODO need to write an update function to make this reactive
	    }
	};


	ko.bindingHandlers['formatcurrency'] = {
	    init:function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			$(element).html(Sherpa.formatCurrency(valueAccessor()));
			//TODO need to write an update function to make this reactive
	    }
	};

	ko.bindingHandlers['visibleFade'] = {
	    init: function(element, valueAccessor) {
	        // Initially set the element to be instantly visible/hidden depending on the value
	        var condition = valueAccessor();
	        condition ? $(element).show() : $(element).hide();
	    },
	    update: function(element, valueAccessor) {
	        // Whenever the value subsequently changes, slowly fade the element in or out
	        var condition = valueAccessor();
	        condition ? $(element).fadeIn() : $(element).fadeOut();
	    }
	};
	ko.bindingHandlers['visibleFadeToggle'] = {
	    init: function(element, valueAccessor) {
	        // Initially set the element to be instantly visible/hidden depending on the value
	        var condition = valueAccessor();
	        condition ? $(element).show() : $(element).hide();
	    },
	    update: function(element, valueAccessor) {
	        // Whenever the value subsequently changes, slowly fade the element in or out
	        var condition = valueAccessor();
	        condition ? $(element).fadeIn() : $(element).hide();
	    }
	};
	ko.bindingHandlers['visibleSlide'] = {
	    init: function(element, valueAccessor) {
	        // Initially set the element to be instantly visible/hidden depending on the value
	        var condition = valueAccessor();
	        condition ? $(element).show() : $(element).hide();
	    },
	    update: function(element, valueAccessor) {
	        // Whenever the value subsequently changes, slowly fade the element in or out
	        var condition = valueAccessor();
	        condition ? $(element).slideDown() : $(element).slideUp();
	    }
	};
	ko.bindingHandlers['visibleSlideToggle'] = {
	    init: function(element, valueAccessor) {
	        // Initially set the element to be instantly visible/hidden depending on the value
	        var condition = valueAccessor();
	        condition ? $(element).show() : $(element).hide();
	    },
	    update: function(element, valueAccessor) {
	        // Whenever the value subsequently changes, slowly fade the element in or out
	        var condition = valueAccessor();
	        condition ? $(element).slideDown() : $(element).hide();
	    }
	};
	ko.bindingHandlers['component'] = {
	    init:function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
	    	// if the 
			if(Sherpa.check_condition(allBindingsAccessor())) {

		    	var component = valueAccessor();
		    	if(!component.type){
		    		component.type = component.name;
		    		//it's a default component
		    	}
		    	if(!component.data){
		    		component.data = bindingContext;
		    		//defaults to whatever data is in context. If not specified the the $root will be in context and the component might fail
		    	}
		    	Sherpa.insertComponent(component.name, component.type, element, component.data,component.options);

		    } else {
		    	$(element).remove();
		    	//if the condition is false then remove object from DOM
		    	//TODO... the condition should be based on an observable which would automatically remove element when set to false
		    }
	    }
	};

	// For documentation of code examples
	ko.bindingHandlers['prettyprint'] = {
        init:function(element) {
            var $element = $(element);
            Sherpa.ready("prettify",function(){
            	$element.html(prettyPrintOne($element.html(), undefined, true));
            });
        }
    };


	Sherpa.components = {};


});

Sherpa.counter("Sherpa Custom Widgets");
