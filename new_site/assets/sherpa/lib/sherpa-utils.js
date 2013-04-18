counter("Sherpa Utils");
/* GDC utilities */

"use strict";

Sherpa.msg = function(textkey,t_data) {
	
	var msg = viewModel.content[textkey];
	//TODO - need to get content from Data API
	if(t_data){
		//console.log('has data',t_data)
		var regex = /\{[0-9]\}*/;
		if(_.isObject(t_data) && !_.isArray(t_data)) {
			//data is ko.obserbable
			//TODO this is not reactive
			t_data = t_data();
			//console.log('has ko data',t_data)
		}
		
		if(_.isArray(t_data) && msg) {
			var i = 0;
			while(msg.match(regex)) {
				msg = msg.replace(msg.match(regex),t_data[i]);
				i++;
			}			  			
		} 
		else {
			//console.log('its not an array')
			if(!_.isNaN(parseInt(t_data))){
				//check to see if there is a plural/singular
				if(viewModel.content[textkey+"_plural"]) {
					//it is a plural/singular textkey
					if(t_data>1) {
						msg = viewModel.content[textkey+"_plural"];
						msg = msg.replace(msg.match(regex),t_data);
					} else {
						msg = viewModel.content[textkey+"_singular"];
					}
				} else {
					msg = msg.replace(msg.match(regex),t_data);
				}
			} else {
				//console.log(regex, msg)
				msg = msg.replace(msg.match(regex),t_data);
			}
		} 
	}
	if(!msg) {
		//text key does not exist
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
    console.log(msg.match(regex)[1])
    if (urls.length) {
        _.each(urls, function(url){
            var to_be_replaced,text,url_html;
            to_be_replaced= msg.match(regex)[0],
            text = msg.match(regex)[1],
            url_html = '<a href="' + url + '">' + text + "</a>",
            msg = msg.replace(to_be_replaced, url_html);
        });
    }
    return msg;
}

Sherpa.formatCurrency = function(number_data){
	var amount, format, position;
	if(_.isObject(number_data)){
				try {
					amount = parseFloat(number_data.amount);
					if(number_data.format) { 
						if(number_data.format == 'decimal') {
							format = number_data.format;
						} else {
							format = 'nodecimal'
						}
					}
				} catch(err) {
					console.error('Bad formatcurrency: data-bind:="formatcurrency: {\'amount\': amount_var, \'format\' : \'decimal\'}')
					//data-bind:="date: {'date': date_var, 'format' : 'dddd, mmmm dd, yyyy'}"
				}
			} else {
				format = 'nodecimal'
				amount = Math.ceil(number_data);
			}
console.log('format_'+format, viewModel.config.currency)
			format = viewModel.config.currency['format_'+format];
			amount = amount * viewModel.config.currency.conversion_rate;
			amount = _.str.numberFormat(amount, format.decimals, format.decimal_separator, format.thousands_separator);
			position = viewModel.config.currency.symbol_position;
			if (position == "left") {
				return viewModel.config.currency.symbol+amount;
			} else {
				return amount+viewModel.config.currency.symbol;
			}
}
Sherpa.dateFormat = function(date) {
	var date_format;
	if(_.isObject(date)){
		try {
			date_format = date.format;
			date = date.date;
		} catch(err) {
			console.error('Bad formatdate: data-bind:="formatdate: {\'date\': date_var, \'format\' : \'dddd, mmmm dd, yyyy\'}')

			//data-bind:="formatdatedate: {'date': date_var, 'format' : 'dddd, mmmm dd, yyyy'}"
			date = new Date();
			date_format = viewModel.config.default_date_format;
		}
	} else {
		date_format = viewModel.config.default_date_format;
	}
	return dateFormat(date, date_format);
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

Sherpa.getComponentHTML = function(component_name, component_type, element, bindingContext) {
	var filename, uuid = "";
	if(viewModel.localhost) {
		uuid = "#"+Sherpa.uuid();
	}
	if(component_name.match("/")){
		//allows to pass a full deep path to a specific file inside the component folder
		var path = component_name.split("/");
		component_type = path[path.length-1];
		path.pop();
		component_name = path.join("/")
	}
	if(component_type) {
		filename = component_type+".html"+uuid;
	} else {
		filename = component_name+".html"+uuid
	}
	//console.log("fetching :",filename)
	return amplify.request({
		resourceId: "getComponentHTML", 
		data: {filename: "components/"+component_name+"/"+filename}, 
		success: function(html, status){
			//console.log(status);
			//console.log(element)
			$(element).html(html);
			ko.applyBindingsToDescendants(bindingContext, element);
			amplify.publish( "register_page_event", component_name );
		},
		error: function( data, status ) {
			//no module exists
			filename = filename.split('#')[0];
			var html = '<div class="rounded-small red-stroke gray da-all da-padin"><h4>Missing Component</h4> <p>'+'components/'+component_name+'/'+filename+' does not exist</p></div>';


			$(element).html(html);

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
	var condition = false;
	var isConditional = !(_.isUndefined(params.if) && _.isUndefined(params.ifnot));
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

_.extend(Sherpa, amplify); //puts all the amplify functions in the Sherpa namespace

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

counter("Sherpa Utils");



