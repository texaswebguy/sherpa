Sherpa.counter("Sherpa i18n");

	/*
	var q;
	var locale = Sherpa.store("locale"), content, messages_url;

	if( q.l || q.lang || q.locale) { 
	  locale = q.l || q.lang || q.locale;
	  Sherpa.store("locale", locale);
	  //stores local code in local storage so subsequent pages use the same locale/language
	}

	if(!locale) {
	  //Default language
	  locale = SHERPA.DEFAULT_LOCALE;
	  Sherpa.store("locale", locale);
	}
	*/
	Sherpa.locale = SHERPA.DEFAULT_LOCALE;
	Sherpa.feature("locale-"+Sherpa.locale, true);

	Sherpa.request({
		resourceId: "assets", 
		data: {
			"locale": SHERPA.DEFAULT_LOCALE,
			"directory" : "content",
			"type" : "messages"
		},
		success: function(responseJSON){
			Sherpa.viewModel.content = responseJSON;
		}
	});
	//first loads default content file then overides with any locale specific values
	if(Sherpa.locale != SHERPA.DEFAULT_LOCALE) {
		Sherpa.request({
			resourceId: "assets", 
			data: {
				"locale": Sherpa.locale,
				"directory" : "content",
				"type" : "messages"
			},
			success: function(responseJSON){
				_.extend(Sherpa.viewModel.content, responseJSON);
				/* Copies all of the properties in the locale content over 
				to the default content to override properties. 
				This is particularly useful when you have an en_GB content file. 
				Only a few content keys might need to be overwritten such as "color" vs "colour", etc.
				*/
			}
		});
	}



	//resources is used to store keys that contain resource reference URL info like links, images, local and remote.
	Sherpa.request({
		resourceId: "assets", 
		data: {
			"locale": SHERPA.DEFAULT_LOCALE,
			"directory" : "xref",
			"type" : "resources"
		},
		success: function(responseJSON){
			Sherpa.viewModel.resources = responseJSON;
		}
	});
	//first loads default resource file then overides with any locale specific values
	if(Sherpa.locale != SHERPA.DEFAULT_LOCALE) {
		Sherpa.request({
			resourceId: "assets", 
			data: {
				"locale": Sherpa.locale,
				"directory" : "xref",
				"type" : "resources"
			},
			success: function(responseJSON){
				_.extend(Sherpa.viewModel.resources, responseJSON);
				/* Copies all of the properties in the locale resource over 
				to the default resource to override properties. */
			}
		});
	}


	//configuration is used to store keys that contain configuration data for UI logic, currency conversions, etc.
	Sherpa.request({
		resourceId: "assets", 
		data: {
			"locale": SHERPA.DEFAULT_LOCALE,
			"directory" : "config",
			"type" : "settings"
		},
		success: function(responseJSON){
			Sherpa.viewModel.settings = responseJSON;
		}
	});
	//first loads default configuration file then overides with any locale specific values
	if(Sherpa.locale != SHERPA.DEFAULT_LOCALE) {
		Sherpa.request({
			resourceId: "assets", 
			data: {
				"locale": Sherpa.locale,
				"directory" : "config",
				"type" : "settings"
			},
			success: function(responseJSON){
				_.extend(Sherpa.viewModel.settings, responseJSON);
				/* Copies all of the properties in the locale resource over 
				to the default resource to override properties. */

			}
		});
	}
	
	if(SHERPA.PATH_CORE == "_sherpa/"){
		SHERPA.PATH_API_DOCUMENT_ROOT = "../../../"+location.pathname;
	} else {
		SHERPA.PATH_API_DOCUMENT_ROOT = SHERPA.PATH_CORE.replace(/\/_sherpa\//,location.pathname);
	}

	SHERPA.PATH_CONTENT_FILE = SHERPA.PATH_API_DOCUMENT_ROOT + SHERPA.PATH_PROTO_ASSETS+"content/";
	SHERPA.CONTENT_FILENAME = "messages_"+Sherpa.locale+".json"

Sherpa.counter("Sherpa i18n");
