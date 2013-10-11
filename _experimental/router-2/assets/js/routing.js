var app = angular.module('plunker', ['ui.state', 'contact']);

app.config(['$stateProvider', 'statesContact', function($stateProvider, statesContact){
    $stateProvider
    .state('root',{
      url: '',
      abstract: true,
      views: {
        'header': {
          templateUrl: 'header.html',
          controller: 'HeaderCtrl'
        },
        'footer':{
          templateUrl: 'footer.html'
        }
      }
    })
    .state('root.home', {
      url: '/',
      views: {
        'container@': {
          template: 'home page'
        }
      }
    })
    .state('root.about', {
      url: '/about',
      views: {
        'container@': {
          templateUrl: 'about.html'
        }
      }
    })
    angular.forEach(statesContact, function(state) {
      $stateProvider.state(state.name, state.options);
    })
    
  
}]);

app.controller('HeaderCtrl', ['$scope', function($scope){
  $scope.links = [
    {name: 'home', url:'/'},
    {name: 'about', url: '/about'},
    {name: 'contacts', url:'/contact'}
    ];
}]);

app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $state.transitionTo('root.home');
}]);


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

  angular.bootstrap(document, ['plunker']);