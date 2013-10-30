var test = [{value: 1},
    {value: 2},
    {value: 3},
    {value: 4},
    {value: 5},
    {value: 6}];

/**
 * Create a global object with functionality using the observer software pattern.
 * @constructor
 */
function ObserverClass() {
    this.value = 2000;
    this.observers = [] //Contains functions to
}

ObserverClass.prototype = {

    constructor: ObserverClass,

    subscribe: function ( callbackFunction ) {
        this.observers.push( callbackFunction );
    },

    notify: function() {
      var len = this.observers.length;
      for ( var i = 0; i < len; i++ ) {
          this.observers[i].apply( null, null );
      }
    },

    setValue:function ( newValue ) {
        this.value = newValue;
        this.notify();
        return this.value; //so you don't return "undefined" in the console.
    }

}

/**
 *  Instantiate the ObserverClass and assign it to a global object.
 * @type {ObserverClass}
 */
var globalObject = new ObserverClass();



var app = angular.module('watchApp', []);
app.controller('watchCtrl', function($scope) {
    $scope.count = 0;
    $scope.b = test;

    $scope.$watch('b', function() {
        // do something here
        $scope.count += 1;
    }, true);

    $scope.objectValue = globalObject;

    $scope.$watch('objectValue', function() {
        // do something here
        $scope.count += 1;
    }, true);

    function callBack() {
        console.log( "callback from watchCtrl");

        //$digest makes $watch to (dirty) check if values are updated.
        $scope.$digest();
    }

    globalObject.subscribe( callBack );

});

app.controller('watchCtrl2', function($scope) {
    $scope.count = 0;
    $scope.b = test;

    $scope.$watch('b', function() {
        // do something here
        $scope.count += 1;
    }, true);

    $scope.objectValue = globalObject;

    $scope.$watch('objectValue', function() {
        // do something here
        $scope.count += 1;
    }, true);



    function callBack() {
        console.log( "callback from watchCtrl2");

        //$digest makes $watch to (dirty) check if values are updated.
        $scope.$digest();
    }

    globalObject.subscribe( callBack );
});

console.log( "To test, enter 'globalObject.setValue( [some value] )'.")