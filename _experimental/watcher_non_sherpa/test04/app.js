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
    this.value1 = 2000;
    this.observers = []; //Contains functions to
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

    setValue1:function ( newValue ) {
        this.value1 = newValue

        this.notify();

        return this.value1; //so "undefined" is not returned in the console.
    }

}

/**
 *  Instantiate the ObserverClass and assign it to a global object.
 * @type {ObserverClass}
 */
var globalObject = new ObserverClass()


/**
 * Two goals.
 *
 * 1. If the data object is already instantiated ( think Sherpa core ).
 * can can we add another observer array on the fly, and maintain similar functionality.
 *
 * 2. For large datasets, it would be prudent to break observers into smaller data
 * sets to iterate updates faster. Meaning, you only want to update content that is
 * subsribed to a data set, and not have to iterate through the entire
 * data set for every update. For example, if we have a data set that has 500 elements,
 * and we only want to update 10 observing ng-models, put the 10 controllers ( models ) into
 * their own observer set. Then we only loop through 10 elemets rather than 500.
 *
 * @type {number}
 */
globalObject.value2 = 3000;
globalObject.updateValue1 = false;
globalObject.observers2 = [];
ObserverClass.prototype.subscribe2 = function ( callback ) {
    this.observers2.push( callback );
}
ObserverClass.prototype.notify2 = function() {
    var len = this.observers2.length;
    for ( var i = 0; i < len; i++ ) {
        this.observers2[i].apply( null, null );
    }
}
ObserverClass.prototype.setValue2 = function( newValue ) {
    this.value2 = newValue;

    this.notify2();

    return this.value2; //so "undefined" is not returned in the console.
}



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

    /**
     * For progrommatic updates of value1.
     */
    function callBack() {
        console.log( "callback from watchCtrl");

        //$digest makes $watch to (dirty) check if values are updated.
        $scope.$digest();
    }

    globalObject.subscribe( callBack );

});

app.controller('watchCtr2', function($scope) {
    $scope.count = 0;
    $scope.b = test;

    $scope.$watch('b', function() {
        // do something here
        $scope.count += 1;
    }, true);

    $scope.objectValue = globalObject;

    $scope.$watch('objectValue', function() {
        $scope.count += 1;
    }, true);


    /**
     * For programmatic updates of value1 and value2.
     */
    function callBack() {
        console.log( "callback from watchCtr2");

        //$digest makes $watch to (dirty) check if values are updated.
        $scope.$digest();
    }

    globalObject.subscribe( callBack );
    globalObject.subscribe2( callBack );
});


app.controller('watchCtr3', function($scope) {
    $scope.count = 0;
    $scope.b = test;

    $scope.$watch('b', function() {
        $scope.count += 1;
    }, true);

    $scope.objectValue = globalObject;

    $scope.$watch('objectValue', function() {
        $scope.count += 1;
    }, true);


    /**
     * For programmatic updates of value2.
     */
    function callBack() {
        console.log( "callback from watchCtr3");

        //$digest makes $watch to (dirty) check if values are updated.
        $scope.$digest();
    }

    globalObject.subscribe2( callBack );

});

app.controller('watchCtr4', function($scope) {
    $scope.count = 0;
    $scope.b = test;

    $scope.$watch('b', function() {
        $scope.count += 1;
    }, true);

    $scope.objectValue = globalObject;

    $scope.$watch('objectValue', function(oldValue) {

        /**
         * globalObject.updateValue1 is set via onBlur and onFocus functions on html input field.
         *
         * When value2 is updated via the input field and onBlue sets updateValue1 to true, we pass value2 to value1.
         */
        if ( globalObject.updateValue1 ) {
            globalObject.setValue1( $scope.objectValue.value2 );
        }

        $scope.count += 1;

    }, true);


    /**
     * For progrommatic update of value2.
     */
    function callBack() {
        console.log( "callback from watchCtr4");

        //$digest makes $watch to (dirty) check if values are updated.
        $scope.$digest();
    }

    globalObject.subscribe2( callBack );

});

console.log( "To test value, enter 'globalObject.setValue1( [some value] )'.");
console.log( "To test value2, enter 'globalObject.setValue2( [some value] )'.");