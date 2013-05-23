Sherpa.counter("Sherpa i18n");
Sherpa.ready("sherpaUtils", function(){

	var q = Sherpa.urlQuery();
	var locale = Sherpa.store("locale"), content, messages_url;


	if( q.l || q.lang || q.locale) { 
		/*TODO Would like to make destinction between locale and language.
			For example: if you use l=en_US it could look for messages_en.json then overide with messages_en_US.json
			This would be useful in creating en_US, en_GB, en_HK, en_AU where the country modifier would just load
			overides for the messages_en file. If an unknown language pair country is encountered thet system would
			fall back to the language.  Example: en_ES would just use messages_en.json because messages_en_ES.json 
			did not exist.
		*/
	  locale = q.l || q.lang || q.locale;
	  Sherpa.store("locale", locale);
	  //stores local code in local storage so subsequent pages use the same locale/language
	}

	if(!locale) {
	  //Default language
	  locale = SHERPA.DEFAULT_LOCALE;
	  Sherpa.store("locale", locale);
	}
	Sherpa.feature("locale-"+locale, true);

	viewModel.locale = locale;
	Sherpa.locale = locale;

	Sherpa.request({
		resourceId: "assets", 
		data: {
			"locale": SHERPA.DEFAULT_LOCALE,
			"directory" : "content",
			"type" : "messages"
		},
		success: function(responseJSON){
			viewModel.content = responseJSON;
		}
	});
	//first loads default content file then overides with any locale specific values
	if(locale != SHERPA.DEFAULT_LOCALE) {
		Sherpa.request({
			resourceId: "assets", 
			data: {
				"locale": locale,
				"directory" : "content",
				"type" : "messages"
			},
			success: function(responseJSON){
				_.extend(viewModel.content, responseJSON);
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
			viewModel.resources = responseJSON;
		}
	});
	//first loads default resource file then overides with any locale specific values
	if(locale != SHERPA.DEFAULT_LOCALE) {
		Sherpa.request({
			resourceId: "assets", 
			data: {
				"locale": locale,
				"directory" : "xref",
				"type" : "resources"
			},
			success: function(responseJSON){
				_.extend(viewModel.resources, responseJSON);
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
			viewModel.config = responseJSON;
		}
	});
	//first loads default configuration file then overides with any locale specific values
	if(locale != SHERPA.DEFAULT_LOCALE) {
		Sherpa.request({
			resourceId: "assets", 
			data: {
				"locale": locale,
				"directory" : "config",
				"type" : "settings"
			},
			success: function(responseJSON){
				_.extend(viewModel.config, responseJSON);
				/* Copies all of the properties in the locale resource over 
				to the default resource to override properties. */

			}
		});
	}

});

Sherpa.counter("Sherpa i18n");
