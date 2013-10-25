//Load all angular modules from the core config and create sherpaApp namespace

Sherpa.counter("Angular directives");
var angular_modules = _.union([], SHERPA.LOAD_ANGULAR_MODULES);
Sherpa.counter("Angular modules loaded into directives: "+angular_modules);

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
        var viewsObject = {};
        viewsObject[ route.view ] = {
            templateUrl: route.templateUrl
        };

        route.views = viewsObject;


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

sherpaApp.directive('spy', function($window, $location, $routeParams, jQuery, debounce,$timeout) {
    //re- written with underscore

    var slice = Array.prototype.slice,
        offset,offsets = [],
        targets = [],
        activeTarget,
        lastLocation = 0,
        refresh = function(options) {

            offsets = [];
            targets = [];
            $timeout(function() {
              slice.call(jQuery(options.target).children())
                .map(function(el) {       
                    //original was not getting the proper id
                    var target_id = jQuery(el).find('[href]').attr('href').replace(/#/,"");
                    var offset = jQuery("#"+target_id).offset().top;
                    return [offset, target_id];
                })
                .sort(function(a, b) {
                    return a[0] - b[0];
                })
                .forEach(function(el) {
                  offsets.push(el[0]);
                  targets.push(el[1]);
                });
                
              if(options.offset) {
                offset = options.offset === 'auto' ? offsets.length && offsets[0] : options.offset * 1;
              } else {
                offset = 10; // if not it will cause a NaN with var scrollTop = el[0].scrollTop + offset;
              }
            },700); //TODO, need to figure out a way to run this when the DOM is actually loaded. Adding a timeout for now

        },
        process = function(scope, el, options) {

          if(!offsets.length) return; //if there are no scroll spy items

          var scrollTop = el[0].scrollTop + offset,
              documentHeight = el[0].scrollHeight || document.body.scrollHeight,
              windowHeight = $(window).height(),
              activeTargetIndex = _.indexOf(targets, activeTarget),
              bottomOffset = documentHeight - _.last(offsets) - $('#'+_.last(targets)).height(),
              isAtBottom = documentHeight - bottomOffset < windowHeight + scrollTop;
              if(_.isUndefined(activeTarget)) { activeTarget = targets[0]; activeTargetIndex = 0} // sometimes because of an offset nothing will be targeted and in that case the top item should be active
            var spy = {
                direction: (function(){
                    if(lastLocation > scrollTop) {
                        return 'up';
                    } else {
                        return 'down';
                    }
                })(),
                currentLocation: scrollTop,
                currentOffset: offsets[activeTargetIndex],
                nextOffset: offsets[activeTargetIndex+1],
                prevOffset: offsets[activeTargetIndex-1],
                nextId: targets[activeTargetIndex+1],
                prevId: targets[activeTargetIndex-1]
            }
            lastLocation = spy.currentLocation;
             
            if(spy.direction == 'down') {
                //scrolling down 
                if(isAtBottom) {
                    activate(scope, _.last(targets), options);
                } else if( spy.nextId && spy.currentLocation >= spy.nextOffset) {
                    activate(scope, spy.nextId, options);
                }
            } else {
                //scrolling up
                if( spy.prevId && spy.currentLocation <= spy.prevOffset) {
                    //step down to previous id
                    activate(scope, spy.prevId, options);
                }
            }

        },
        activate = function(scope, selector, options) {

          // Save active target for process()
          activeTarget = selector;

          // Toggle active class on elements
          jQuery(options.target + ' > .active').removeClass('active');
          $('[href=#'+activeTarget+']').parent().addClass('active');

          // Use $location.search to trigger dom changes
          scope.$apply($location.search(options.search || 'section', selector));

        };

    return {
      restrict: 'EAC',
      link: function postLink(scope, iElement, iAttrs) {
        if(iAttrs.spy == 'scroll') {
            var refreshPositions = function() {
              refresh(iAttrs);
              process(scope, iElement, iAttrs);
            };
            var debouncedRefresh = debounce(refreshPositions, 300);

            scope.$on('$viewContentLoaded', debouncedRefresh);
            scope.$on('$includeContentLoaded', debouncedRefresh);

            angular.element($window).bind('scroll', function() {
              process(scope, iElement, iAttrs);
            });
        }
      }
    };

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
