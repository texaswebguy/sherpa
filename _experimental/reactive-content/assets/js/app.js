
// Controllers 
sherpaApp.controller("testCtrl", function($scope) {

	//for persistant default use Sherpa.store()
	var defaultUserIdInContext = function(){
		var tempValue = Sherpa.store("userIdInContext");
		if(!tempValue) {
			tempValue = _.first(_.keys(SHERPA.USER_PROFILES))
		}
		return tempValue;
	}
	var userIdInContext = $scope.userIdInContext = defaultUserIdInContext();
    $scope.users = _.toArray(SHERPA.USER_PROFILES);
    $scope.user = SHERPA.USER_PROFILES[userIdInContext];

    //Watch for changes inside the controller
	$scope.$watch('userIdInContext', function(newUser) {
		if(_.isObject(newUser)){
			$scope.user = newUser;
			Sherpa.store("userIdInContext",newUser.id);
		} else if (newUser) {
			Sherpa.store("userIdInContext",newUser);
			$scope.user = SHERPA.USER_PROFILES[newUser];
		}
	});

    //Watch for changes outside the controller (in another controler or outside of angular)
	Sherpa.subscribe("changeUser",function(id,outsideOfAngular){
		// Sherpa.publish("changeUser",userid,true);
		$scope.user = SHERPA.USER_PROFILES[id];
		if(outsideOfAngular) {
			$scope.$apply();
		}
	});
	
	
});


sherpaApp.controller("testCtrl2", function($scope) {
	$scope.clickFunction = function(userID){
		Sherpa.publish("changeUser",userID);
		Sherpa.store("userIdInContext",userID);
	}
});

//non angular example that communicates with angular control
Sherpa.scope(".change-user",function(){
	this.listen(".btn", "click", function(event){
		event.preventDefault();
		var userID = $(event.currentTarget).attr('rel');
		Sherpa.store("userIdInContext",userID);
		Sherpa.publish("changeUser", userID, true);
	})
})