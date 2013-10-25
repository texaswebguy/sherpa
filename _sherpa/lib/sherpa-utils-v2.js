
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
                Sherpa.QA.logEntry("The key "+ property + " of " + framework + " JS library aready exists on Sherpa.","namespace collision, sherpa-utils:namespace");
            }
        } else {
            Sherpa.counter("The key "+ property + " of " + framework + " JS library is excluded from Sherpa namespace.");
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
	Sherpa.counter("Cleaned up session data");
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



Sherpa.msg = function(textkey,t_data) {
	if(t_data === "undefined") {
		t_data = undefined;
	}
	var msg = Sherpa.viewModel.content[textkey], 
		regex = /\{[0-9]\}*/,
		i = 0,
		textkey_attr = textkey;
	if(t_data){
		if(_.isObject(t_data) && !_.isArray(t_data)) {
			//TODO should test taking this out because this is knockout related when a data element is ko.observable it is a function
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
						textkey_attr = textkey+"_plural";
					} else {
						msg = Sherpa.viewModel.content[textkey+"_singular"];
						textkey_attr = textkey+"_singular"
					}
				} else {
					msg = Sherpa.viewModel.content[textkey];
					try {
						msg = msg.replace(msg.match(regex),t_data);
					} catch (err) {
						msg = undefined;
					}
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
			if(SHERPA.ENABLE_CONTENT_EDIT) {
				msg = '<span class="editable" data-textkey="'+textkey+'" data-msgdata="'+t_data+'">Lorem ispum...</span>';
			} else {
				msg = 'Lorem ispum...';
			}
			
		} else {
			var convertMD = new Sherpa.converter();
			if(SHERPA.ENABLE_CONTENT_EDIT) {
				msg = '<div class="editable markdown" data-textkey="'+textkey+'_markdown">'+convertMD.makeHtml(msg)+'</div>'
			} else {
				msg = convertMD.makeHtml(msg);
			}
		}
	} else {
		if(SHERPA.ENABLE_CONTENT_EDIT) {
			msg = '<span class="editable" data-textkey="'+textkey_attr+'" data-msgdata="'+t_data+'">'+msg+'</span>'
		} 
	}
	return msg;
}

Sherpa.lorem = function(options){
	var regex = new RegExp("([\\w]+\\s+){"+_.random(10)+"}");
	if(_.isNumber(options) || _.isUndefined(options) ) {
		// no options just character count
		if(_.isUndefined(options)) {
			options = Sherpa.viewModel.default_values.lorem_ispum_default;
		}
		return _.str.capitalize(_.str.prune((_.shuffle(Sherpa.viewModel.default_values.lorem_ispum).join(" ")).replace(",","").replace(regex,""),options,"."));
	} else {
		if(options.startLorem) {
			options.startLorem = "Lorem ipsum dolor sit amet "
		} else {
			options.startLorem = ""
		}
		if(!options.paragraphs) {
			if(_.isUndefined(options.numChars) || !_.isNumber(options.numChars) ) {
				if(options.numChars.match(/,/)){
					var range = [];
					_.each((options).split(/,/), function(num){return range.push(parseInt(num))});
					options.numChars = _.random(range[0],range[1]);
				} else {
					options.numChars = Sherpa.viewModel.default_values.lorem_ispum_default;
				}				
			}
			return _.str.capitalize(options.startLorem+_.str.prune((_.shuffle(Sherpa.viewModel.default_values.lorem_ispum).join(" ")).replace(",","").replace(regex,""),options.numChars,"."));
		} else {
			if(_.isUndefined(options.numChars) || !_.isNumber(options.numChars) ) {
				options.numChars = Sherpa.viewModel.default_values.lorem_ispum_default;
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
					temp_html += '<p>'+options.startLorem+_.str.capitalize(_.str.prune((_.shuffle(Sherpa.viewModel.default_values.lorem_ispum).join(" ")).replace(",","").replace(regex,""),options.numChars,"."))+'</p>\n';
				});
				return temp_html;				
			})();


			
		}
		
	}

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
		Sherpa.counter("Loading JS: "+libName);
		Sherpa.ready(libName,function(){
			Sherpa.counter("Loading JS: "+libName);
		});
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
		Sherpa.counter("Loading i18n for: "+locale);
		Sherpa.ready("angular-i18n",function(){
			Sherpa.counter("Loading i18n for: "+locale);
		});	
	} catch (err) {
		console.error("Had trouble loading locale JS: "+locale)
	}
}
Sherpa.loadJS = function(jsFilename,libName){
	try {	
		var obj = {}
		if(!libName) {_.str.underscored(_.str.humanize(jsFilename.replace(/.js/,"")))}
		obj[libName]=SHERPA.PATH_PROTO_JS+jsFilename;
		Sherpa.js(obj);
		Sherpa.counter("Loading JS: "+libName);
		Sherpa.ready(libName,function(){
			Sherpa.counter("Loading JS: "+libName);
		});
	} catch (err) {
		console.error("Had trouble loading JS: "+libName)
	}}
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
		Sherpa.counter("Loading CSS: "+libName);
	} catch (err) {
		console.error("Had trouble loading CSS: "+libName)
	}
}
Sherpa.loadCSS = function(cssFilename){
	var obj = {}
	obj[cssFilename.replace(/.js/,"")]=SHERPA.PATH_PROTO_CSS+cssFilename;
	Sherpa.load(obj);
	Sherpa.counter("Loading CSS: "+SHERPA.PATH_PROTO_CSS+cssFilename);
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

//TODO get rid of amplify request and use angular $http

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

	Sherpa.request.define( "get_md", "ajax", {
		url: "{filename}",
	    dataType: "text",
	    type: "GET"
	});

	Sherpa.request.define( "sherpa-api", "ajax", {
		url: SHERPA.PATH_CORE_BIN+SHERPA.API_APP,
	    type: "POST"
	});

	Sherpa.request.define( "get_json", "ajax", {
		url: "{filename}",
	    dataType: "json",
	    type: "GET"
	});

	Sherpa.request.define( "get_component", "ajax", {
		url: SHERPA.PATH_CORE_COMPONENTS+"{filename}",
	    dataType: "html",
	    type: "GET"
	});


});
