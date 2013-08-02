Sherpa.ready("sherpaUtils", function(){

	Sherpa.subscribe('authenticate',function(auth){
		if( auth == true ) {
		  viewModel.isAuthenticated = ko.observable(true);
		  Sherpa.store("authenticated", true);
		} else {
		  viewModel.isAuthenticated = ko.observable(false);
		  Sherpa.store("authenticated", false);
		}
		Sherpa.feature("authenticated",viewModel.isAuthenticated)
	});

	//TODO Need to add sample user data here to create fake logins. The user data should be stored in the locale specific config

	var q = Sherpa.urlQuery();
	var auth = Sherpa.store("authenticated");
	if( q.authenticated == "false") {
	  Sherpa.publish('authenticate',false);
	} else {
		if( q.authenticated == "true" || auth == true) {
	  		Sherpa.publish('authenticate',true);
	  	} else {
	  		Sherpa.publish('authenticate',false);
	  	}
	}


});
