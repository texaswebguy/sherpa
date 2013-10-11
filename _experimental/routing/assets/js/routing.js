

// Controllers 
sherpaApp.controller("pageController", function($stateProvider, $urlRouterProvider){
  
	  // For any unmatched url, send to /route1
	  $urlRouterProvider.otherwise("/route1")
	  
	  $stateProvider
	  .state('contacts', {
	    templateUrl: 'contacts.html',
	    controller: function($scope){
	      $scope.contacts = [{ name: 'Alice' }, { name: 'Bob' }];
	    }
	  })
	  .state('contacts.list', {
	    templateUrl: 'contacts.list.html'
	  });
});


sherpaApp.controller('MainCtrl', function ($state) {
	$state.transitionTo('contacts.list');
})





