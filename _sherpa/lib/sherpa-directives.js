//Load all angular modules from the core config and create sherpaApp namespace

Sherpa.counter("Angular directives");

/* 
    TODO
    this is in place to load any modules that are not in LOAD_ANGULAR_MODULES
    in some cases a module might have several keys. Will have to figure out how to deal with that
*/
var angular_modules = _.union([], SHERPA.LOAD_ANGULAR_MODULES);
Sherpa.counter("Angular modules loaded into directives: "+angular_modules);


/*
    load any angular module related CSS
    In the core-config.json it looks for a matching LIB_CSS entry and loads it
*/
_.each(SHERPA.LOAD_ANGULAR_MODULES, function(libName){
    if(SHERPA.LIB_CSS[libName]) {
        Sherpa.loadCoreCSS(libName,SHERPA.PATH_CORE_JS);
    }
});


var sherpaApp = angular.module('sherpaApp', angular_modules);


function getParentURL(targetParentIdName) {

    if (targetParentIdName) { //could be undefined, catch it here
        var tempUrl = "";
        _.each(SHERPA.PROTO_ROUTES, function (item) {
            if (targetParentIdName === item.id) {

                if (item.parentId) {
                    tempUrl = getParentURL(item.parentId) + item.url;
                } else {
                    tempUrl = item.url;
                }
            }
        }, this);

        return tempUrl;

    } else {
        return "";
    }
}

function getDefaultToRootArray(targetParentIdName) {

    var array = [];

    if (targetParentIdName) {

        var hasParent = true;

        while (hasParent) {
            var tempUrl = getParentURL(targetParentIdName);
            array.push(tempUrl);
            array.push(tempUrl + "/");

            if ( SHERPA.PROTO_ROUTES[targetParentIdName] ) {
                targetParentIdName = SHERPA.PROTO_ROUTES[targetParentIdName].parentId;
            } else {
                hasParent = false;
            }
        }

        array.push( "/");
    }

    return array;
}

if (!_.isUndefined(SHERPA.PROTO_ROUTES)) {

    var redirectURL = (SHERPA.DEFAULT_PROTO_ROUTE) ? SHERPA.DEFAULT_PROTO_ROUTE : "/";



    _.each(SHERPA.PROTO_ROUTES, function (route) {

        if (route.isDefault || route.isHomeDefault) {

            route.parentURL = getParentURL(route.parentId);
            redirectURL = route.parentURL + route.url;

        }

        if ( route.isHomeDefault ) {
//            console.log( "home array ---> " + getDefaultToRootArray( route.parentId ) );
            route.arrayUrls = getDefaultToRootArray( route.parentId );
        }

        //For ui-view to find parent
        if (route.parentId) {
            route.parent = SHERPA.PROTO_ROUTES[ route.parentId ];
        }


        //TODO to find html file
        /*
         $scope.$on('$viewContentLoaded',
         function(event){ ... });

         to add attribute with viewTemplateURL

         */

        /**
         * Target Specific views in html:
         * <section ui-view="masthead" ></section>
         *
         * @type {{}}
         */
        if ( route.view ) {
            var viewsObject = {};
            viewsObject[ route.view ] = {
                templateUrl: route.templateUrl
            };

            route.views = viewsObject;
        }

        if ( SHERPA.PROTO_ROUTES["globalData"] ){
            if ( route.data &&  SHERPA.PROTO_ROUTES["globalData"].data ) {
                route.data = _.merge( route.data, SHERPA.PROTO_ROUTES["globalData"].data );
            }

            if ( !route.data && SHERPA.PROTO_ROUTES["globalData"].data ) {
                route.data = SHERPA.PROTO_ROUTES["globalData"].data;
            }

        }


        /**
         * Set up animation callback
         */

//        route.onEnter = function() {
//            if ( this.animateEnter ) {
//                this.animateEnter();
//            }
//        };

//        route.onExit = function() { console.log("exiting " + route.id)};




    });


    sherpaApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {


        _.each(SHERPA.PROTO_ROUTES, function (route) {

            if (route.parentURL && route.redirectURL && !route.arrayUrls ) {
                $urlRouterProvider.when(route.parentURL, redirectURL);
                $urlRouterProvider.when(route.parentURL + "/", redirectURL);
            }

            if ( route.arrayUrls ) {
                len = route.arrayUrls.length;
                for ( var i = 0; i < len; i++ ) {
                    $urlRouterProvider.when(route.arrayUrls[i], redirectURL);
                }
            }


        });

        $urlRouterProvider.otherwise( redirectURL );


        _.each(SHERPA.PROTO_ROUTES, function (route) {



            //TODO to find html file
            /*
             $scope.$on('$viewContentLoaded',
             function(event){ ... });

             to add attribute with viewTemplateURL

             */
             
            $stateProvider.state(route.id, route);

        });
    }]);

    angular.module("ui.router").run(function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    });

    /*
     sherpaApp.run(['$state', function($state){

     $rootScope.$state = $state;
     $rootScope.$stateParams = $stateParams;

     $state.transitionTo(SHERPA.PROTO_ROUTES[_.first(_.keys(SHERPA.PROTO_ROUTES))])
     }]);
     */
}


sherpaApp.directive('scrollSpy', function ($timeout) {
    //TODO This is a hack
    return function (scope, elem, attr) {
        if (!attr.scrollSpy === 'refresh') {
            $('body').scrollspy('refresh');
            $('.main-active').addClass("active"); //hack to prevent scrollspy from removing active from main nav
        } else {
            $(elem).scrollspy();
            scope.$watch(attr.scrollSpy, function (value) {
                $timeout(function () {
                    $('body').scrollspy('refresh')
                }, 500);
            }, true);
            $('.main-active').addClass("active");
        }
    }
});


sherpaApp.directive('msg', function () {
    //This is a directive version of the msg version.  This will render html.
    return function (scope, elem, attr) {
        $(elem).html(Sherpa.msg(attr.msg, attr.msgdata))
    }
});

if (SHERPA.ENABLE_GLOBAL_MODAL) {

    sherpaApp.directive('globalModal', function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attr, ctrl) {
                elem.bind('click', function (event) {
                    var options = attr.globalModal;
                    event.preventDefault();
                    event.stopPropagation();
                    if (!_.isObject(attr.globalModal)) {
                        try {
                            options = JSON.parse(attr.globalModal);
                            Sherpa.publish("modal", options);
                        } catch (err) {
                            console.error('Bad Options', err)
                        }
                    } else {
                        Sherpa.publish("modal", options);
                    }
                });
            }
        };
    });

}

sherpaApp.directive('lorem', function () {
    /*
     Puts lorem ispum into the element.
     Sherpa.lorem accepts a number or object with options
     {
     startLorem:true,
     length:200,
     paragraphs:5
     }

     Options can also be specified as attributes
     <div lorem="500" data-paragraphs="5"></div>

     */
    return function (scope, elem, attr) {
        if (!_.isObject(attr.lorem)) {
            attr.lorem = parseInt(attr.lorem);
        }
        if (attr.paragraphs || attr.startLorem || attr.numChars) {
            var tempObj = {};
            if (attr.paragraphs) {
                tempObj.paragraphs = attr.paragraphs;
            }
            if (attr.startLorem) {
                tempObj.startLorem = attr.startLorem;
            }
            if (attr.numChars) {
                tempObj.numChars = attr.numChars;
            } else {
                tempObj.numChars = attr.lorem;
            }
            $(elem).html(Sherpa.lorem(tempObj));
        } else {
            $(elem).html(Sherpa.lorem(attr.lorem));
        }

    }
});

sherpaApp.directive('markdown', function ($http,$compile) {
    //This is a directive version of the msg version.  This will render html.
    return {
        link: function (scope, elem, attr) {
            $http({method: 'GET', url: attr.markdown}).
                success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    var convertMD = new Sherpa.converter();
                    $(elem).html(convertMD.makeHtml(data));
                    $(elem).attr('data-filename', attr.markdown).addClass('editable');
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    var responseHTML = '<div class="rounded-small red-stroke gray da-all da-padin"><h4>Missing markdown file</h4> <p>' + attr.markdown + ' does not exist</p></div>';
                    $(elem).html(responseHTML);
                });
        }
    }
});


Sherpa.counter("Angular directives");
