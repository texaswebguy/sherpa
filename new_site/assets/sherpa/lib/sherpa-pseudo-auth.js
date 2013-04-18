Sherpa.ready("sherpaUtils", function(){

	//TODO Need to add sample user data here to create fake logins

	var q = Sherpa.urlQuery();
	var auth = Sherpa.store("authenticated");

	if( q.authenticated || auth == true ) {
	  viewModel.isAuthenticated = ko.observable(true);
	  Sherpa.store("authenticated", true);
	} else {
	  viewModel.isAuthenticated = ko.observable(false);
	  Sherpa.store("authenticated", false);
	}


});
