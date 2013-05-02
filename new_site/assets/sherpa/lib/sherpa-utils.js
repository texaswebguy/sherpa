Sherpa.counter("Sherpa Utils");
/* GDC utilities */

"use strict";

Sherpa.msg = function(textkey,t_data) {
	
	var msg = viewModel.content[textkey], 
		regex = /\{[0-9]\}*/,
		i = 0;
	//TODO - need to get content from Data API
	if(t_data){
		if(_.isObject(t_data) && !_.isArray(t_data)) {
			//data is ko.obserbable
			//TODO this is not reactive. Will have to worry about that when we do in page editing
			t_data = t_data();
		}
		
		if(_.isArray(t_data) && msg) {
			while(msg.match(regex)) {
				msg = msg.replace(msg.match(regex),t_data[i]);
				i++;
			}			  			
		} 
		else {
			// did not find content
			if(!_.isNaN(parseInt(t_data))){
				// is numerical data
				// check to see if there is a plural/singular
				msg = viewModel.content[textkey+"_plural"];
				if(msg) {
					//it is a plural/singular textkey
					if(t_data>1) {
						msg = msg.replace(msg.match(regex),t_data);
					} else {
						msg = viewModel.content[textkey+"_singular"];
					}
				} else {
					msg = msg.replace(msg.match(regex),t_data);
				}
			} else {
				//
				msg = msg.replace(msg.match(regex),t_data);
			}
		} 
	}
	if(!msg) {
		// text key does not exist
		// figure out how big the containg element is and then truncate lorem ispum to fit
		msg = '<span title="Missing textkey: '+textkey+'">Lorem ispum...</span>';
	};
	return msg;
}

Sherpa.linkedmsg = function (textkey, t_data) {
    var msg = Sherpa.msg(textkey, t_data),
        link_id = 0,
        done = false,
        url,
        urls = [],
        regex = /\[(.*?)\]/;

    while (!done) {
    	url = viewModel.resources[textkey + "_url_" + link_id];
    	if(url) {
    		urls.push(url);
    		link_id++;
    	} else {
    		done = true;
    	}
    }   
    if (urls.length) {
        _.each(urls, function(url){
            var to_be_replaced,
            	text,
            	url_html;
            to_be_replaced= msg.match(regex)[0],
            text = msg.match(regex)[1],
            url_html = '<a href="' + url + '">' + text + "</a>",
            msg = msg.replace(to_be_replaced, url_html);
        });
    }
    return msg;
}


Sherpa.formatCurrency = function(number_data){

	Sherpa.ready("i18n", function(){

		var amount, format, position;
		if(_.isObject(number_data)){
			try {
				amount = parseFloat(number_data.amount);
				if(number_data.format) { 
					if(number_data.format == 'decimal') {
						format = number_data.format;
					} else {
						format = 'nodecimal';
					}
				}
			} catch(err) {
				Sherpa.QA.logEntry('Bad formatcurrency: data-bind:="formatcurrency: {\'amount\': amount_var, \'format\' : \'decimal\'}',"functions, format error,sherpa-utils:formatCurrency");
			}
		} else {
			format = 'nodecimal'
			amount = Math.ceil(number_data);
		}
		try {
			format = viewModel.config.currency['format_'+format];
			// TODO what if viewModel.config.currency is not configured correctly?
			amount = amount * viewModel.config.currency.conversion_rate;
			amount = _.str.numberFormat(amount, format.decimals, format.decimal_separator, format.thousands_separator);
			position = viewModel.config.currency.symbol_position;
			if (position == "left") {
				return viewModel.config.currency.symbol+amount;
			} else {
				return amount+viewModel.config.currency.symbol;
			}
		} catch (err) {
			Sherpa.QA.logEntry("Looks like you don't have currency configuration in assets/config/settings_"+viewModel.locale+".json","i18n, ajax errors, sherpa-utils:formatCurrency");
			return { status: 'failed', error_msg: error_msg };
		}
	});
}
Sherpa.dateFormat = function(date) {
	Sherpa.ready("i18n", function(){

		var date_format;
		if(_.isObject(date)){
			try {
				date_format = date.format;
				date = date.date;
			} catch(err) {
				Sherpa.QA.logEntry('Bad formatdate: data-bind:="formatdate: {\'date\': date_var, \'format\' : \'dddd, mmmm dd, yyyy\'}',"functions, format error, sherpa-utils:dateFormat");

				//data-bind:="formatdatedate: {'date': date_var, 'format' : 'dddd, mmmm dd, yyyy'}"
				date = new Date();
				date_format = viewModel.config.default_date_format;
			}
		} else {
			date_format = viewModel.config.default_date_format;
		}
		return dateFormat(date, date_format);
	});
}
Sherpa.urlQuery = function () {
	if(location.search) {
		var query_string,query_obj = {}, query_array;
		query_string = location.search.replace(/\?|\//g,'');
		query_array = query_string.split('&');
		_.each(query_array, function(item){
			var itemArr = item.split('='),key,value;
			key = itemArr[0];
			value = itemArr[1];
			if(value) {
				query_obj[key] = value;
			} else {
				query_obj[key] = "";
			}
		})
		return query_obj
	} else {
		return false;
	}
}

Sherpa.uuid = function() {
	function s4() {
	  return Math.floor((1 + Math.random()) * 0x10000)
	             .toString(16)
	             .substring(1);
	};
	 return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	         s4() + '-' + s4() + s4() + s4();
}

Sherpa.insertComponent = function(component_name, component_type, element, bindingContext, options) {


	var filename, uuid = "",html;
	if(viewModel.localhost) {
		// TODO workaround to circumvent browser cache... need to look into this better
		uuid = "#"+Sherpa.uuid();
	}
	/*
	//TODO don't think we want to really allow this
	if(component_name.match("/")){
		//allows to pass a full deep path to a specific file inside the component folder
		var path = component_name.split("/");
		component_type = path[path.length-1];
		path.pop();
		component_name = path.join("/")
	}
	*/
	if(component_type) {
		filename = component_type+".html"+uuid;
	} else {
		filename = component_name+".html"+uuid
	}
	//console.log("fetching :",filename)

	Sherpa.request({
		resourceId: "getComponentHTML", 
		data: {filename: "components/"+component_name+"/"+filename}, 
		success: function(responseHTML, status){
			//console.log(status);
			//console.log(element)
			$(element).html(responseHTML);
			if(options){
				bindingContext.component_options = options;
			}
			ko.applyBindingsToDescendants(bindingContext, element);
			Sherpa.publish( "register_page_event", component_name );		    					
		},
		error: function( data, status ) {
			//no module exists
			filename = filename.split('#')[0];
			Sherpa.QA.logEntry('Missing component: filename '+'components/'+component_name+'/'+filename+' does not exist',"missing component, sherpa-utils:insertComponent");
			var responseHTML = '<div class="rounded-small red-stroke gray da-all da-padin"><h4>Missing Component</h4> <p>'+'components/'+component_name+'/'+filename+' does not exist</p></div>';
			$(element).html(responseHTML);
		}
	});
}

Sherpa.equalizeHeight = function(selector, add_px) {
    var max = 0, elements;
    elements = $(selector), _.each(elements, function (element) {
        $(element).height() > max && (max = $(element).height())
    }), add_px && (max += add_px), _.each(elements, function (element) {
        $(element).height(max)
    })
}

Sherpa.check_condition = function(params){
	/*
	* Sherpa.check_condition
	* This function checks for a ko condition (if:/ifnot:)
	* which might be passed through a custom binding.
	*/
	var condition = false,
		isConditional = !(_.isUndefined(params.if) && _.isUndefined(params.ifnot));

	if(isConditional) {
		if(!_.isUndefined(params.if)) {
			condition = params.if;
		} else {
			condition = !params.ifnot;
		}
	} else {
		condition = true;
	}
	return condition;
}

Sherpa.loadComponentJS = function(component_id, callback) {
	//TODO this may not work.... the functions are not available to the component in time of binding.
	Sherpa.js(SHERPA.COMPONENTS_PATH+component_id+"/"+component_id+".js", callback );
}



Sherpa.namespace = function ( source, framework, propList ) {

    for (var property in source) {
        //is the property in the approved propList?
        if (_.contains(propList, property)) {
            //Does the property already exist?
            if (typeof Sherpa[property] == 'undefined') {
                //TODO - clone to Sherpa - future goal
                Sherpa[property] = source[property];
            } else {
                Sherpa.QA.logEntry(property + " of " + framework + " aready exists on Sherpa.","namespace collision, sherpa-utils:namespace");
            }
        } else {
            console.log(property + " of " + framework + " is excluded from Sherpa namespace.");
        }

    }
};


/**
 * A very modified version of this link:
 *
 * http://addyosmani.com/blog/essential-js-namespacing/
 */
Sherpa.ready("amplify", function() {
    var props = ["publish", "subscribe", "unsubscribe", "store", "request"];

    Sherpa.namespace(amplify, "amplify", props);
})

Sherpa.ready("sherpaEventManager", function() {
    var props = ["debug", "register", "extend", "scope", "attach"];
    Sherpa.namespace(Eve, "Eve", props);
});

Sherpa.ready("csvParser", function() {
    var props = ["defaults", "hooks", "parsers", "toArray", "toArrays", "toObjects", "fromArrays", "fromObjects2CSV"];
    Sherpa.namespace($.csv, "jQuery-CSV", props);
});



// AJAX Data services

Sherpa.request.define( "getComponentHTML", "ajax", {
	url:"{filename}",
    dataType: "html",
    type: "GET"
});


Sherpa.request.define( "supportAutocomplete", "ajax", {
	url:"data-api/support_products.json",
    dataType: "json",
    type: "GET"
});


Sherpa.request.define( "assets", "ajax", {
	url:"assets/{directory}/{type}_{locale}.json",
    dataType: "json",
    type: "GET"
});


Sherpa.request.define( "data", "ajax", {
	url:"assets/data/{filename}",
    dataType: "text",
    type: "GET"
});

Sherpa.counter("Sherpa Utils");



