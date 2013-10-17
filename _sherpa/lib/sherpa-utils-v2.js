
"use strict";


/**
 * A very modified version of this link:
 *
 * http://addyosmani.com/blog/essential-js-namespacing/
 */
// Adding JS libraries to Sherpa namespace
//______________________________________________________________________________________


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

Sherpa.getDateFromUuid = function(uuid) {
	var timestamp = parseInt((uuid).split(/-/)[0], 36);
	return dateFormat(timestamp);
}
Sherpa.uuid = function() {
	function s4() {
	  return Math.floor((1 + Math.random()) * 0x10000)
	             .toString(16)
	             .substring(1);
	};
	 return new Date().getTime().toString(36) + '-' + s4() + '-' + s4() + '-' +
	         s4() + '-' + s4() + s4() + s4();
}
Sherpa.sessionID = Sherpa.uuid();
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



Sherpa.msg = function(textkey,t_data) {
	
	var msg = Sherpa.viewModel.content[textkey], 
		regex = /\{[0-9]\}*/,
		i = 0;
	//TODO - need to get content from Data API
	if(t_data){
		if(_.isObject(t_data) && !_.isArray(t_data)) {
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
				msg = Sherpa.viewModel.content[textkey+"_plural"];
				if(msg) {
					//it is a plural/singular textkey
					if(t_data>1) {
						msg = msg.replace(msg.match(regex),t_data);
					} else {
						msg = Sherpa.viewModel.content[textkey+"_singular"];
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
		// Check to see if textkey is a markdown
		msg = Sherpa.viewModel.content[textkey+"_markdown"];
		if(!msg) {
			// TODO: figure out how big the containg element is and then truncate lorem ispum to fit
			msg = '<span class="missing-content" data-text-key="'+textkey+'">Lorem ispum...</span>';
			console.log(msg)
		} else {
			var convertMD = new Sherpa.converter();
			msg = convertMD.makeHtml(msg);
		}
	};
	return msg;
}


Sherpa.ready("amplify", function() {
    var props = ["publish", "subscribe", "unsubscribe", "store", "request"];
    Sherpa.namespace(amplify, "amplify", props);
})

Sherpa.ready("eve-js", function() {
    var props = ["debug", "register", "extend", "scope", "attach"];
    Sherpa.namespace(Eve, "Eve", props);
});

Sherpa.ready("csvParser", function() {
    var props = ["defaults", "hooks", "parsers", "toArray", "toArrays", "toObjects", "fromArrays", "fromObjects2CSV"];
    Sherpa.namespace($.csv, "jQuery-CSV", props);
});

Sherpa.ready("jwerty-js", function() {
    var props = ["key", "is", "fire","event", "KEYS"];
    Sherpa.namespace(jwerty, "hotkeys", props);
});
Sherpa.ready("showdown-js", function() {
    var props = ["extensions", "forEach", "converter"];
    Sherpa.namespace(Showdown, "Markdown", props);
});




//set up where to load libraries from
SHERPA.LIB_ORIGIN = "cdn";
if(SHERPA.RUN_AS_LOCAL) {
	SHERPA.LIB_ORIGIN = "local";
}

// JS and CSS loading utilities
//______________________________________________________________________________________

Sherpa.loadCoreJS = function(libName){
	try {
		var obj = {}
		obj[libName]=SHERPA.PATH_CORE_JS+SHERPA.LIB_JS[libName][SHERPA.LIB_ORIGIN];
		Sherpa.js(obj);
		if(SHERPA.ENABLE_CONSOLE_MESSAGES){console.log("Loaded JS: "+libName)}
	} catch (err) {
		console.error("Had trouble loading JS: "+libName)
	}
}
Sherpa.loadI18NJS = function(locale){
	try {	
		var obj = {}
		if(!locale){
			locale = SHERPA.DEFAULT_LOCALE;
		}
		obj["angular-i18n"]=SHERPA.PATH_CORE_JS+SHERPA.PATH_CORE_ANGULAR_I18N.replace(/{{.*}}/,locale)
		Sherpa.js(obj);
		if(SHERPA.ENABLE_CONSOLE_MESSAGES){console.log("Loaded i18n for: "+locale)}
	} catch (err) {
		console.error("Had trouble loading locale JS: "+locale)
	}
}
Sherpa.loadJS = function(jsFilename,libName){
		var obj = {}
		if(!libName) {_.str.underscored(_.str.humanize(jsFilename.replace(/.js/,"")))}
		obj[libName]=SHERPA.PATH_PROTO_JS+jsFilename;
		Sherpa.js(obj);
		if(SHERPA.ENABLE_CONSOLE_MESSAGES){console.log("Loaded JS: "+libName)}
}
Sherpa.loadCoreCSS = function(libName){
	try {	
		var obj = {},path="";
		if(libName=="css_theme"){
			path = SHERPA.PATH_CORE_CSS_THEME;
		} else {
			path = SHERPA.PATH_CORE_CSS;
		}
		obj[libName]=path+SHERPA.LIB_CSS[libName][SHERPA.LIB_ORIGIN];
		Sherpa.load(obj);
		if(SHERPA.ENABLE_CONSOLE_MESSAGES){console.log("Loaded CSS: "+libName)}
	} catch (err) {
		console.error("Had trouble loading locale JS: "+libName)
	}
}
Sherpa.loadCSS = function(cssFilename){
	var obj = {}
	obj[cssFilename.replace(/.js/,"")]=SHERPA.PATH_PROTO_CSS+cssFilename;
	Sherpa.load(obj);
	if(SHERPA.ENABLE_CONSOLE_MESSAGES){console.log("Loaded CSS: "+SHERPA.PATH_PROTO_CSS+cssFilename)}
}

// Project Info Utility
//______________________________________________________________________________________

Sherpa.projectInfoInit = function(){
	var project_info = {};
	return (function projectInfoRequest(project_info){
		Sherpa.request({
			resourceId: "project_info", 
			data: {
			  "filename" : SHERPA.PATH_PROTO_ASSETS+"config/project_info.csv"
			},
			success: function(responseCSV){
			  //Parse will depend on the data.parseTo options.
			  var table_obj = {};
			  var data_obj = $.csv.toObjects(responseCSV);
			  table_obj.items = [];
			  data_obj.shift();
			  _.each(data_obj, function(item){
			    table_obj.items.push(_.values(item));
			  });
			  project_info.data = _.map(table_obj.items, function(item) {var tempObj = {}; tempObj.label = item[0];tempObj.description = item[1];return tempObj})
			  project_info.title = table_obj.items[1][1]+" - "+table_obj.items[0][1];
			  Sherpa.viewModel.project_info = project_info;
			},
			error: function() {
				Sherpa.viewModel.project_info = {
					title: "No Project Data Found",
					data: []
				};
				console.error("No project info found");
			}
		});

	})(project_info);
}
// AJAX loading utilities
//______________________________________________________________________________________
Sherpa.ready("amplify", function(){

	Sherpa.request.define( "assets", "ajax", {
		url: SHERPA.PATH_PROTO_ASSETS+"{directory}/{type}_{locale}.json",
	    dataType: "json",
	    type: "GET"
	});


	Sherpa.request.define( "data", "ajax", {
		url: SHERPA.PATH_PROTO_ASSETS+"data/{filename}",
	    dataType: "text",
	    type: "GET"
	});

	Sherpa.request.define( "project_info", "ajax", {
		url:"{filename}",
	    dataType: "text",
	    type: "GET"
	});

	Sherpa.request.define( "documentation", "ajax", {
		url: SHERPA.DOCUMENTATION_PATH+"{id}/README.md",
	    dataType: "text",
	    type: "GET"
	});

});
