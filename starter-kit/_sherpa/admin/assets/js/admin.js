
// Controllers 
sherpaApp.controller("pageController", function($scope) {
    
    $scope.lorem ="Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
    $scope.show_stuff = "Show Stuff"
    $scope.hide_stuff = "Hide Stuff"
    $scope.version=Sherpa.version;
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

_.each($('#data ul'),function(list){
	if(!($(list).find('li').text()).match(/.json/)){
		$(list).parent().hide();
	}
})

$('.footer-back-to-top').affix();