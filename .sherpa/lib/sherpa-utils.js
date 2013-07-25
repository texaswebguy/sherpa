Sherpa.counter("Sherpa Utils");
/* GDC utilities */

"use strict";

Sherpa.componentJS = {};
Sherpa.includesJS = {};

Sherpa.uuid = function() {
	function s4() {
	  return Math.floor((1 + Math.random()) * 0x10000)
	             .toString(16)
	             .substring(1);
	};
	 return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	         s4() + '-' + s4() + s4() + s4();
}
Sherpa.sessionID = Sherpa.uuid();


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


Sherpa.truncate = function(element, options){

	var number_of_chars, 
	string = $(element).text(), 
	showMore = false, 
	truncated_string, 
	more_string, 
	truncate_id = Sherpa.uuid(),
	elipse = Sherpa.msg('text_truncate_elipse'),
	more_text = Sherpa.msg('text_truncate_more'),
	less_text = Sherpa.msg('text_truncate_less'),
	number_of_chars = 100,
	isValid = function(number){
		if(string.length > number_of_chars ) {
			return true;
		} else {
			return false;
		}		
	}

	if(_.isObject(options) && isValid()){
		try {
			if(options.length){
				number_of_chars = options.length;
			};
			if(options.showMore){showMore = true}
			if(options.moreText){more_text = options.moreText} // NOTE: if this option is used it will not be internationalized
			if(options.lessText){less_text = options.lessText} // NOTE: if this option is used it will not be internationalized
			if(options.elipse){elipse = options.elipse} // NOTE: if this option is used it will not be internationalized
		} catch(err) {
			Sherpa.QA.logEntry('Bad truncate syntax: data-bind:="format: {\'length\': length_var, \'showMore\' : true}',"functions, format error,sherpa-utils:truncate");
		}
	} else {
		if(_.isNumber(options) && !_.isEmpty(options) ){
			number_of_chars = options;
		} else {
			Sherpa.QA.logEntry('Bad truncate syntax: data-bind:="format: {\'length\': length_var, \'showMore\' : true}',"functions, format error,sherpa-utils:truncate");
		}
	}
	if(showMore && isValid()){
		truncated_string = _.str.prune(string,number_of_chars,"");
		more_string = string.replace(truncated_string,'');

		Eve.scope("#"+truncate_id+" + a", function(){
			this.listen("span", "click", function(event){
				event.preventDefault();
				//console.log($(event.currentTarget).parent().attr('data-target'))
				$(event.currentTarget).parent().toggleClass('truncate truncated');
				$("#"+$(event.currentTarget).parent().attr('data-target')).fadeToggle();
			});
		});
		return truncated_string+'<span class="hide" id="'+truncate_id+'">'+more_string+'</span><a class="truncate" data-target="'+truncate_id+'"><span class="more">'+elipse+' '+more_text+'</span><span class="less">&nbsp;'+less_text+'</span></a>'
	} else {
		if(!isValid()){
			return string;
		} else {
			return _.str.prune(string,number_of_chars,elipse);
		}
	}
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
		var error_msg = "Looks like you don't have currency configuration in assets/config/settings_"+viewModel.locale+".json";
		Sherpa.QA.logEntry(error_msg, "i18n, ajax errors, sherpa-utils:formatCurrency");
		return { status: 'failed', error_msg: error_msg };
	}
}
Sherpa.dateFormat = function(date) {

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
var responseHTMLSample = ""
Sherpa.insertComponent = function(component_name, component_type, element, bindingContext, options) {

	var filename, uuid = "",html, componentJS = component_name+"_"+component_type+"_js";

	if(viewModel.localhost) {
		// TODO workaround to circumvent browser cache... need to look into this better
		uuid = "#"+Sherpa.uuid();
	}

	if(component_type) {
		filename = component_type+".html"+uuid;
	} else {
		filename = component_name+".html"+uuid
	}
	//console.log("fetching :",filename)

	Sherpa.request({
		resourceId: "getComponentHTML", 
		data: {filename: SHERPA.COMPONENTS_PATH+component_name+"/"+filename}, 
		success: function(responseHTML, status){
			//console.log(status);
			if(!_.isUndefined(Sherpa.componentJS[componentJS])) {
				//Don't inject a script that already exists
				responseHTML = responseHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"");
				//$(responseHTML).find('#'+componentJS).remove();
				$(element).html(responseHTML);
			} else {
				//set it right away because ajax takes its time
				Sherpa.componentJS[componentJS] = true;
				$(element).html(responseHTML);
			}

			if(options){
				bindingContext.component_options = options;
			}
			ko.applyBindingsToDescendants(bindingContext, element);
			Sherpa.publish( "register_page_event", component_name );		    					
		},
		error: function( data, status ) {
			//no module exists
			filename = filename.split('#')[0];
			Sherpa.QA.logEntry('Missing component: filename '+SHERPA.COMPONENTS_PATH+component_name+'/'+filename+' does not exist',"missing component, sherpa-utils:insertComponent");
			var responseHTML = '<div class="rounded-small red-stroke gray da-all da-padin"><h4>Missing Component</h4> <p>'+SHERPA.COMPONENTS_PATH+component_name+'/'+filename+' does not exist</p></div>';
			$(element).html(responseHTML);
		}
	});
}

Sherpa.insertInclude = function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

	var filename,includeID,html, includeJS, values = valueAccessor(), scrollTo;
//console.log("values",values)
	if(_.isObject(values)){
		filename = values.sourceUrl;
		scrollTo = values.scrollTo;
	} else {
		if(values) {
			filename = values;
		}
	}
	if(filename) {
		includeID = _.str.underscored(filename.replace(/\/|.html/g," "));
		Sherpa.request({
			resourceId: "getComponentHTML", 
			data: {filename: filename}, 
			success: function(responseHTML, status){
				//console.log(status);
				if(!_.isUndefined(Sherpa.includesJS[includeID])) {
					//Don't inject a script that already exists
					responseHTML = responseHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"");
					//$(responseHTML).find('#'+componentJS).remove();
					$(element).html(responseHTML);
				} else {
					//set it right away because ajax takes its time
					Sherpa.includesJS[includeID] = true;
					$(element).html(responseHTML);
					console.log("scrolling?",$(element).attr('id'), scrollTo, viewModel.breadcrumb_path[viewModel.breadcrumb_path.length-1].id === $(element).attr('id'))
					window.setTimeout(function(){
						if(scrollTo && viewModel.breadcrumb_path[viewModel.breadcrumb_path.length-1].id === $(element).attr('id')){
							console.log("scrolling man!")
							$.scrollTo('#'+$(element).attr('id'),300,{offset:{top:-60}});
						}
					},1000);
				}
				ko.applyBindingsToDescendants(bindingContext, element);
			},
			error: function( data, status ) {
				//no module exists
				filename = filename.split('#')[0];
				Sherpa.QA.logEntry('Missing include: filename '+filename+' does not exist',"missing include, sherpa-utils:insertInclude");
				var responseHTML = '<div class="rounded-small red-stroke gray da-all da-padin"><h4>Missing Include</h4> <p>'+filename+' does not exist</p></div>';
				$(element).html(responseHTML);
			}
		});
	} else {
		console.error("Need to provide a source url (sourceUrl) for the include")
	}
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
		isConditional = !(_.isUndefined(params['if']) && _.isUndefined(params.ifnot));

	if(isConditional) {
		if(!_.isUndefined(params['if'])) {
			condition = params['if'];
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

Sherpa.themeSwitcher = function(theme_id) {
	Sherpa.store("theme",theme_id);
	if(Sherpa.urlQuery().theme) {
		location.search=location.search.replace('theme='+Sherpa.urlQuery().theme, 'theme='+theme_id);
	} else {
		location.reload();
	}
	//NOTE: sherpa.js add a theme class name to the html element
}
Sherpa.keygen = function(){
	var temp_obj={};
	_.each($('p.sherpa, h2, h3, h4, h5, h6'), function(item){ 
		var prefix;
		if($(item).is('h2,h3,h4')){
			prefix = "title_";
		} else {
			prefix = "text_"
		}
		temp_obj[_.str.underscored(_.str.humanize(prefix+$('html').attr('id')+"-"+$(item).parents('[id]').attr('id')+_.str.truncate($(item).text(),10).replace("...|&lt;|&gt;","")))]=$(item).html(); 
	})
	JSON.stringify(temp_obj,null,5)
}

Sherpa.lorem = function(options){
	var regex = new RegExp("([\\w]+\\s+){"+_.random(10)+"}");
	if(_.isNumber(options) || _.isUndefined(options) ) {
		// no options just character count
		if(_.isUndefined(options)) {
			options = viewModel.core_config.lorem_ispum_default;
		}
		return _.str.capitalize(_.str.prune((_.shuffle(viewModel.core_config.lorem_ispum).join(" ")).replace(",","").replace(regex,""),options,"."));
	} else {
		if(options.startLorem) {
			options.startLorem = "Lorem ipsum dolor sit amet "
		} else {
			options.startLorem = ""
		}
		if(!options.paragraphs) {
			if(_.isUndefined(options.length) || !_.isNumber(options.length) ) {
				options.length = viewModel.core_config.lorem_ispum_default;
			}
			return _.str.capitalize(options.startLorem+_.str.prune((_.shuffle(viewModel.core_config.lorem_ispum).join(" ")).replace(",","").replace(regex,""),options.length,"."));
		} else {
			if(_.isUndefined(options.length) || !_.isNumber(options.length) ) {
				options.length = viewModel.core_config.lorem_ispum_default;
			}
			if(!_.isNumber(options.paragraphs) ) {
				options.paragraphs = 5;
			}
			return (function(){
				var temp_html = "";
				_.each(_.range(options.paragraphs), function(para) {
					regex = new RegExp("([\\w]+\\s+){"+_.random(10)+"}");
					if(para == 0 && options.startLorem) {
						options.startLorem = "Lorem ipsum dolor sit amet ";
					} else {
						options.startLorem = "";
					}
					temp_html += '<p>'+options.startLorem+_.str.capitalize(_.str.prune((_.shuffle(viewModel.core_config.lorem_ispum).join(" ")).replace(",","").replace(regex,""),options.length,"."))+'</p>\n';
				});
				return temp_html;				
			})();


			
		}
		
	}

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

Sherpa.ready("jwerty", function() {
    var props = ["key", "is", "fire","event", "KEYS"];
    Sherpa.namespace(jwerty, "hotkeys", props);
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

if(!SHERPA.ASSETS_PATH) {
	SHERPA.ASSETS_PATH = "assets/";
}

Sherpa.request.define( "assets", "ajax", {
	url: SHERPA.ASSETS_PATH+"{directory}/{type}_{locale}.json",
    dataType: "json",
    type: "GET"
});


Sherpa.request.define( "data", "ajax", {
	url:"assets/data/{filename}",
    dataType: "text",
    type: "GET"
});

Sherpa.request.define( "project_info", "ajax", {
	url:"{filename}",
    dataType: "text",
    type: "GET"
});

Sherpa.request.define( "core_config", "ajax", {
	url:SHERPA.CORE_PATH+"config/core_config.json",
    dataType: "json",
    type: "GET"
});

//Session Storage
Sherpa.session = {};
Sherpa.session.storeLog = function(key,id){
	var log = Sherpa.store('sessionLog');
	if(id) {
		if(!log) {
			log = {};
		}
		var temp_obj = {
			key:key,
			sessionID:Sherpa.sessionID,
			id:id
		}
		log[id] = temp_obj;
		Sherpa.store('sessionLog',log);
	} else {
		//return id
		if(!log) {
			return undefined;
		} else {
			try {
				return _.find(log,function(item){return item.key == key && item.sessionID == Sherpa.sessionID}).id
			} catch(err) {
				return undefined;
			}
		}
	}

};
Sherpa.session.store = function(key,obj){
	if(obj){
		//store
		var temp_obj = {
			key: key,
			data: obj,
			sessionID: Sherpa.sessionID
		}, id = Sherpa.uuid();
		Sherpa.store(id,temp_obj);
		Sherpa.session.storeLog(key,id);
		return id;
	} else {
		//retrieve
		var id = Sherpa.session.storeLog(key);
		if(id) {
			return Sherpa.store(id).data;
		} else {
			return undefined;
		}
		
	}
}
Sherpa.session.storeCleanUp = function(){
	var log = Sherpa.store('sessionLog');
	if(log) {
		//Sherpa.store('sessionLog',_.filter(log, function(item){return item.sessionID == Sherpa.sessionID}));
		_.each(log, function(item){
			if(item.sessionID != Sherpa.sessionID){
				Sherpa.store(item.id,null);
			}
		});		
	}
}


// Project specific information
Sherpa.ready("localJSApp", function() {
	window.setTimeout(function(){
		if(viewModel.core_config){
			Sherpa.request({
				resourceId: "project_info", 
				data: {
				  "filename" : viewModel.core_config.project_info_filename
				},
				success: function(responseCSV){
				  //Parse will depend on the data.parseTo options.
				  var table_obj = {};
				  var data_obj = $.csv.toObjects(responseCSV);
				  table_obj.keys = _.keys(data_obj[0]);
				  table_obj.items = [];
				  data_obj.shift();
				  console.log("data_obj",data_obj)
				  _.each(data_obj, function(item){
				    table_obj.items.push(_.values(item));
				  });
				  viewModel.projectInfo = ko.observable(table_obj);
				  viewModel.project_title = table_obj.items[1][1]+" - "+table_obj.items[0][1];
				  $('.project_title').text(viewModel.project_title)
				},
				error: function() {
					console.error("No project info found")
				}
			});
		}else {
			console.error("No project info file name found: viewModel.core_config.project_info_filename")
		} 
	},300);
});
Sherpa.counter("Sherpa Utils");



