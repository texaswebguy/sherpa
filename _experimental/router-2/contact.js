angular.module('contact', ['ui.state'])
  .constant('statesContact', [
      { name: 'root.contact',
        options: {
          url: '/contact',
          views: {
            'container@': {
              templateUrl: 'contacts.html'
            }
          },
          controller:'ContactController'
      }}
    ])
  .config(['$stateProvider', function($stateProvider){    
  }])
  .controller('ContactController', ['$scope', function($scope){
    $scope.title = 'Contact Module'
  }])