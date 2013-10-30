var test = [{value: 1},
    {value: 2},
    {value: 3},
    {value: 4},
    {value: 5},
    {value: 6}];

var obj = {value: 1};

var app = angular.module('watchApp', []);
app.controller('watchCtrl', function($scope) {
    $scope.count = 0;
    $scope.b = test;

    $scope.$watch('b', function() {
        // do something here
        $scope.count += 1;
    }, true);

    $scope.objectValue = obj;

    $scope.$watch('objectValue', function() {
        // do something here
        $scope.count += 1;
    }, true);
});

app.controller('watchCtrl2', function($scope) {
    $scope.count = 0;
    $scope.b = test;

    $scope.$watch('b', function() {
        // do something here
        $scope.count += 1;
    }, true);

    $scope.objectValue = obj;

    $scope.$watch('objectValue', function() {
        // do something here
        $scope.count += 1;
    }, true);
});