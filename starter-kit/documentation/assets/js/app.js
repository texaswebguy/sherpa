
// Controllers 
sherpaApp.controller("pageController", function($scope) {
    
    $scope.lorem ="Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
    $scope.show_stuff = "Show Stuff"
    $scope.hide_stuff = "Hide Stuff"
    $scope.viewModel = Sherpa.viewModel;

});

sherpaApp.controller("docsMastheadController", function($scope) {
    
     $scope.version=Sherpa.version;
     $scope.navbar = [
     	{
     		id:"get-started",
     		label:"Getting Started",
     		templateUrl:"pages/get-started/index.html",
     		controller:"getStartedController"
     	},
     	{
     		id:"css-overview",
     		label:"CSS Overview",
     		templateUrl:"pages/css-overview/index.html",
     		controller:"cssOverviewController"
     	},
     	{
     		id:"prototyping",
     		label:"Prototyping",
     		templateUrl:"pages/prototyping/index.html",
     		controller:"prototypingController"
     	},
     	{
     		id:"styleguides",
     		label:"Styleguides",
     		templateUrl:"pages/styleguides/index.html",
     		controller:"styleguidesController"
     	}

     ]
     $scope.navbarActiveIndex=0;
     $scope.openPage = function(event){
     	event.preventDefault();
     	console.log($(event.currentTarget).attr('id'))
     }

});

$('.footer-back-to-top').affix();