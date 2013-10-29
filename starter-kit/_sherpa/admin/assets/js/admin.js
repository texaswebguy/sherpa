
sherpaApp.controller("sherpaAdmin", function($scope, $state, $http) {   

    $http({method: 'GET', url: SHERPA.PATH_CORE+"admin/admin-service.php?action=list_prototypes"}).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.list_prototypes = data;
        window.setTimeout(function(){
            $scope.$apply();
        },200);      
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        $scope.list_prototypes = "oops!";

      });


    $scope.viewModel = Sherpa.viewModel;
    $scope.showHelp = function(e){
        e.preventDefault();
        Sherpa.fire('alt+h');
    }
    $scope.js_libraries = {
        installed: (function(){
            var libs = [];
            _.each(SHERPA.LOAD_JS_CORE,function(lib){
                var tempObj = {};
                tempObj.label = _.str.titleize(_.str.humanize(lib));
                tempObj.url = SHERPA.LIB_JS[lib].cdn;
                libs.push(tempObj);
            });
            return libs;
        })(),
        available: (function(){
            var libs = [];
            _.each(_.keys(SHERPA.LIB_JS),function(libName){
                var tempObj = {},url = SHERPA.LIB_JS[libName].cdn;
                if(_.filter(SHERPA.LOAD_JS_CORE,function(lib){return lib === libName}).length == 0) {
                console.log("available",libName,!SHERPA.LOAD_JS_CORE[libName],url)
                    tempObj.label = _.str.titleize(_.str.humanize(libName));
                    if(url) {
                        tempObj.url = url;
                    } else {
                        tempObj.url = SHERPA.PATH_CORE_JS+SHERPA.LIB_JS[libName].local;
                    }
                    libs.push(tempObj);                 
                }
            });
            return libs;
        })(),
    }
    $scope.project_info = Sherpa.viewModel.project_info;
//_.str.titleize(_.str.humanize("sherpaCustomWidgets"))
});



$('.footer-back-to-top').affix();