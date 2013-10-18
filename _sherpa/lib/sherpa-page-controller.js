
/*
    Main Page Controller
    This controller provides:

        - all routing and state management for all prototype pages
        - global scope variables




*/



sherpaApp.controller("pageController", function($scope, $state) {
    console.log( "EXECUTE --> sherpa-page-controller.js");
    if(SHERPA.PROTO_ROUTES) {
        var routes = [];
        _.each(_.keys(SHERPA.PROTO_ROUTES),function(route){
            routes.push('SHERPA.PROTO_ROUTES.'+route);
        })
        $scope.routes = routes;
    } else {
        $scope.routes = [];
    }
     
    $scope.setPage = function(page){
        $state.transitionTo(page);
    }


    if(SHERPA.PROTO_MASTHEAD_URL) {
        $scope.mastheadUrl = SHERPA.PROTO_MASTHEAD_URL;
    }

    if(SHERPA.PROTO_FOOTER_URL) {
        $scope.footerUrl = SHERPA.PROTO_FOOTER_URL;
    }

    $scope.version=Sherpa.version;
    $scope.SHERPA = SHERPA;
    $scope.viewModel = Sherpa.viewModel;


});

//TODO merge this
// Controllers
/*sherpaApp.controller("pageController", function($scope) {

 $scope.lorem ="Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
 $scope.show_stuff = "Show Stuff"
 $scope.hide_stuff = "Hide Stuff"
 $scope.text_item_label = Sherpa.msg('text_item_label');
 });*/
