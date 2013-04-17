/*********************************************************************************
Sherpa Protoype Framework

Rationale:
	There has been a proliferation of javascript frameworks in the past couple
	of years.  While many of these frameworks work well for there intended purpose
	there is one thing that many have in common.  Many require backend server technology
	such as node.js.

	For the purposes of UX modeling, we felt that it was important to come up with a
	framework that does not require any installation of backend server such as node.js,
	meteor.js, etc. 

	In essence, we want the simplicity of sending someone a zip file and have them be
	able to double click something and then point their browser to localhost to view 
	a fully functioning, full color, live prototype. This portability is essential when 
	working with diverse global teams.

How Sherpa is built:
	Sherpa is a collection of javascript technologies which we have found to be valuable 
	in the process of rapid UX prototyping. We start with the use of head.js as a way to
	load all the javascript libraries we need to deliver the framework. If Sherpa doesn't
	have something you need, if can be added.

Copyright 2013, Dell Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

**********************************************************************************/
'use strict'

/*********************************************************************************
IE Console workaround:
In case we forget to take out console statements. 
IE becomes very unhappy when we forget. Let's not make IE unhappy
*********************************************************************************/
if(typeof(console)==="undefined"){var console={};console.log=console.error=console.info=console.debug=console.warn=console.trace=console.dir=console.dirxml=console.group=console.groupEnd=console.time=console.timeEnd=console.assert=console.profile=function(){}};

/*********************************************************************************
HEAD JS  Configuration:
*********************************************************************************/

var head_conf = {
	screens: [767, 979, 1140],
	head: "Sherpa",
	screensCss: {
                                "gt" : true,
                                "gte": false,
                                "lt" : true,
                                "lte": false,
                                "eq" : false
	},
	page: ''
};


/*********************************************************************************/

/*!
 * HeadJS     The only script in your <HEAD>    
 * Author     Tero Piirainen  (tipiirai)
 * Maintainer Robert Hoffmann (itechnology)
 * License    MIT / http://bit.ly/mit-license
 *
 * Version 0.99
 * http://headjs.com
 */
(function(a,w){function f(a){p[p.length]=a}function m(a){q.className=q.className.replace(RegExp("\\b"+a+"\\b"),"")}function k(a,d){for(var b=0,c=a.length;b<c;b++)d.call(a,a[b],b)}function s(){q.className=q.className.replace(/ (w-|eq-|gt-|gte-|lt-|lte-|portrait|no-portrait|landscape|no-landscape)\d+/g,"");var b=a.innerWidth||q.clientWidth,d=a.outerWidth||a.screen.width;h.screen.innerWidth=b;h.screen.outerWidth=d;f("w-"+b);k(c.screens,function(a){b>a?(c.screensCss.gt&&f("gt-"+a),c.screensCss.gte&&f("gte-"+
a)):b<a?(c.screensCss.lt&&f("lt-"+a),c.screensCss.lte&&f("lte-"+a)):b===a&&(c.screensCss.lte&&f("lte-"+a),c.screensCss.eq&&f("e-q"+a),c.screensCss.gte&&f("gte-"+a))});var d=a.innerHeight||q.clientHeight,g=a.outerHeight||a.screen.height;h.screen.innerHeight=d;h.screen.outerHeight=g;h.feature("portrait",d>b);h.feature("landscape",d<b)}function r(){a.clearTimeout(u);u=a.setTimeout(s,100)}var n=a.document,g=a.navigator,t=a.location,q=n.documentElement,p=[],c={screens:[240,320,480,640,768,800,1024,1280,
1440,1680,1920],screensCss:{gt:!0,gte:!1,lt:!0,lte:!1,eq:!1},browsers:[{ie:{min:6,max:10}}],browserCss:{gt:!0,gte:!1,lt:!0,lte:!1,eq:!0},section:"-section",page:"-page",head:"head"};if(a.head_conf)for(var b in a.head_conf)a.head_conf[b]!==w&&(c[b]=a.head_conf[b]);var h=a[c.head]=function(){h.ready.apply(null,arguments)};h.feature=function(a,b,c){if(!a)return q.className+=" "+p.join(" "),p=[],h;"[object Function]"===Object.prototype.toString.call(b)&&(b=b.call());f((b?"":"no-")+a);h[a]=!!b;c||(m("no-"+
a),m(a),h.feature());return h};h.feature("js",!0);b=g.userAgent.toLowerCase();g=/mobile|midp/.test(b);h.feature("mobile",g,!0);h.feature("desktop",!g,!0);b=/(chrome|firefox)[ \/]([\w.]+)/.exec(b)||/(iphone|ipad|ipod)(?:.*version)?[ \/]([\w.]+)/.exec(b)||/(android)(?:.*version)?[ \/]([\w.]+)/.exec(b)||/(webkit|opera)(?:.*version)?[ \/]([\w.]+)/.exec(b)||/(msie) ([\w.]+)/.exec(b)||[];g=b[1];b=parseFloat(b[2]);switch(g){case "msie":g="ie";b=n.documentMode||b;break;case "firefox":g="ff";break;case "ipod":case "ipad":case "iphone":g=
"ios";break;case "webkit":g="safari"}h.browser={name:g,version:b};h.browser[g]=!0;for(var v=0,x=c.browsers.length;v<x;v++)for(var i in c.browsers[v])if(g===i){f(i);for(var A=c.browsers[v][i].max,l=c.browsers[v][i].min;l<=A;l++)b>l?(c.browserCss.gt&&f("gt-"+i+l),c.browserCss.gte&&f("gte-"+i+l)):b<l?(c.browserCss.lt&&f("lt-"+i+l),c.browserCss.lte&&f("lte-"+i+l)):b===l&&(c.browserCss.lte&&f("lte-"+i+l),c.browserCss.eq&&f("eq-"+i+l),c.browserCss.gte&&f("gte-"+i+l))}else f("no-"+i);"ie"===g&&9>b&&k("abbr article aside audio canvas details figcaption figure footer header hgroup mark meter nav output progress section summary time video".split(" "),
function(a){n.createElement(a)});k(t.pathname.split("/"),function(a,b){if(2<this.length&&this[b+1]!==w)b&&f(this.slice(1,b+1).join("-").toLowerCase()+c.section);else{var g=a||"index",h=g.indexOf(".");0<h&&(g=g.substring(0,h));q.id=g.toLowerCase()+c.page;b||f("root"+c.section)}});h.screen={height:a.screen.height,width:a.screen.width};s();var u=0;a.addEventListener?a.addEventListener("resize",r,!1):a.attachEvent("onresize",r)})(window);
(function(a,w){function f(a){var f=a.charAt(0).toUpperCase()+a.substr(1),a=(a+" "+r.join(f+" ")+f).split(" "),c;a:{for(c in a)if(k[a[c]]!==w){c=!0;break a}c=!1}return!!c}var m=a.document.createElement("i"),k=m.style,s=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),r=["Webkit","Moz","O","ms","Khtml"],n=a[a.head_conf&&a.head_conf.head||"head"],g={gradient:function(){k.cssText=("background-image:"+s.join("gradient(linear,left top,right bottom,from(#9f9),to(#fff));background-image:")+s.join("linear-gradient(left top,#eee,#fff);background-image:")).slice(0,
-17);return!!k.backgroundImage},rgba:function(){k.cssText="background-color:rgba(0,0,0,0.5)";return!!k.backgroundColor},opacity:function(){return""===m.style.opacity},textshadow:function(){return""===k.textShadow},multiplebgs:function(){k.cssText="background:url(//:),url(//:),red url(//:)";return/(url\s*\(.*?){3}/.test(k.background)},boxshadow:function(){return f("boxShadow")},borderimage:function(){return f("borderImage")},borderradius:function(){return f("borderRadius")},cssreflections:function(){return f("boxReflect")},
csstransforms:function(){return f("transform")},csstransitions:function(){return f("transition")},touch:function(){return"ontouchstart"in a},retina:function(){return 1<a.devicePixelRatio},fontface:function(){var a=n.browser.version;switch(n.browser.name){case "ie":return 9<=a;case "chrome":return 13<=a;case "ff":return 6<=a;case "ios":return 5<=a;case "android":return!1;case "webkit":return 5.1<=a;case "opera":return 10<=a;default:return!1}}},t;for(t in g)g[t]&&n.feature(t,g[t].call(),!0);n.feature()})(window);
(function(a,w){function f(){}function m(j,a){if(j){"object"===typeof j&&(j=[].slice.call(j));for(var b=0,c=j.length;b<c;b++)a.call(j,j[b],b)}}function k(a,b){var e=Object.prototype.toString.call(b).slice(8,-1);return b!==w&&null!==b&&e===a}function s(a){return k("Function",a)}function r(a){a=a||f;a._done||(a(),a._done=1)}function n(a){var b={};if("object"===typeof a)for(var e in a)a[e]&&(b={name:e,url:a[e]});else b=a.split("/"),b=b[b.length-1],e=b.indexOf("?"),b={name:-1!==e?b.substring(0,e):b,url:a};
return(a=i[b.name])&&a.url===b.url?a:i[b.name]=b}function g(a){var a=a||i,b;for(b in a)if(a.hasOwnProperty(b)&&a[b].state!==y)return!1;return!0}function t(a,b){b=b||f;a.state===y?b():a.state===D?d.ready(a.name,b):a.state===C?a.onpreload.push(function(){t(a,b)}):(a.state=D,q(a,function(){a.state=y;b();m(x[a.name],function(a){r(a)});u&&g()&&m(x.ALL,function(a){r(a)})}))}function q(j,c){var c=c||f,e;/\.css[^\.]*$/.test(j.url)?(e=b.createElement("link"),e.type="text/"+(j.type||"css"),e.rel="stylesheet",
e.href=j.url):(e=b.createElement("script"),e.type="text/"+(j.type||"javascript"),e.src=j.url);e.onload=e.onreadystatechange=function(j){j=j||a.event;if("load"===j.type||/loaded|complete/.test(e.readyState)&&(!b.documentMode||9>b.documentMode))e.onload=e.onreadystatechange=e.onerror=null,c()};e.onerror=function(){e.onload=e.onreadystatechange=e.onerror=null;c()};e.async=!1;e.defer=!1;var d=b.head||b.getElementsByTagName("head")[0];d.insertBefore(e,d.lastChild)}function p(){b.body?u||(u=!0,m(h,function(a){r(a)})):
(a.clearTimeout(d.readyTimeout),d.readyTimeout=a.setTimeout(p,50))}function c(){b.addEventListener?(b.removeEventListener("DOMContentLoaded",c,!1),p()):"complete"===b.readyState&&(b.detachEvent("onreadystatechange",c),p())}var b=a.document,h=[],v=[],x={},i={},A="async"in b.createElement("script")||"MozAppearance"in b.documentElement.style||a.opera,l,u,B=a.head_conf&&a.head_conf.head||"head",d=a[B]=a[B]||function(){d.ready.apply(null,arguments)},C=1,D=3,y=4;d.load=A?function(){var a=arguments,b=a[a.length-
1],e={};s(b)||(b=null);m(a,function(c,d){c!==b&&(c=n(c),e[c.name]=c,t(c,b&&d===a.length-2?function(){g(e)&&r(b)}:null))});return d}:function(){var a=arguments,b=[].slice.call(a,1),c=b[0];if(!l)return v.push(function(){d.load.apply(null,a)}),d;c?(m(b,function(a){if(!s(a)){var b=n(a);b.state===w&&(b.state=C,b.onpreload=[],q({url:b.url,type:"cache"},function(){b.state=2;m(b.onpreload,function(a){a.call()})}))}}),t(n(a[0]),s(c)?c:function(){d.load.apply(null,b)})):t(n(a[0]));return d};d.js=d.load;d.test=
function(a,b,c,g){a="object"===typeof a?a:{test:a,success:b?k("Array",b)?b:[b]:!1,failure:c?k("Array",c)?c:[c]:!1,callback:g||f};(b=!!a.test)&&a.success?(a.success.push(a.callback),d.load.apply(null,a.success)):!b&&a.failure?(a.failure.push(a.callback),d.load.apply(null,a.failure)):g();return d};d.ready=function(a,c){if(a===b)return u?r(c):h.push(c),d;s(a)&&(c=a,a="ALL");if("string"!==typeof a||!s(c))return d;var e=i[a];if(e&&e.state===y||"ALL"===a&&g()&&u)return r(c),d;(e=x[a])?e.push(c):x[a]=[c];
return d};d.ready(b,function(){g()&&m(x.ALL,function(a){r(a)});d.feature&&d.feature("domloaded",!0)});if("complete"===b.readyState)p();else if(b.addEventListener)b.addEventListener("DOMContentLoaded",c,!1),a.addEventListener("load",p,!1);else{b.attachEvent("onreadystatechange",c);a.attachEvent("onload",p);var z=!1;try{z=null==a.frameElement&&b.documentElement}catch(F){}z&&z.doScroll&&function E(){if(!u){try{z.doScroll("left")}catch(b){a.clearTimeout(d.readyTimeout);d.readyTimeout=a.setTimeout(E,50);
return}p()}}()}setTimeout(function(){l=!0;m(v,function(a){a()})},300)})(window);


/*********************************************************************************
GLOBAL Sherpa Configuration:
*********************************************************************************/
var SHERPA = {};

SHERPA.RUN_AS_LOCAL = true; //set to false if you want this prototype to refer to Sherpa site
// Please note that if you run local you run the risk of libraries and css being out of date.

//SHERPA.REMOTE_PATH = "https://rawgithub.com/DellGDC/sherpa/master/";
SHERPA.REMOTE_PATH = "";
SHERPA.LOCAL_PATH = "";
SHERPA.JS_PATH = "assets/js/";
SHERPA.JS_LIB_PATH = "assets/sherpa/lib/";
SHERPA.CSS_PATH = "assets/css/";
SHERPA.CORE_PATH = "assets/sherpa/";
SHERPA.COMPONENTS_PATH = "components/";
SHERPA.PROTOTYPE_APP = "app.js";
SHERPA.DEFAULT_LOCALE = "en";

SHERPA.ENABLE_COUNTER = false; //enables hot key for showing grid overlay
SHERPA.ENABLE_GRIDSET_OVERLAY = true; //enables hot key for showing grid overlay
SHERPA.ENABLE_NOTES = false; //enables hot key for showing sherpa notes
SHERPA.ENABLE_PROTOTYPE_QA = false; //enables script to check html for sherpa errors


/* TODO - figure out a way to do CSS as well
SHERPA.CSS_REMOTE_PATH = "https://rawgithub.com/DellGDC/sherpa/master/assets/css/";
SHERPA.CSS_LOCAL_PATH = "assets/sherpa/css/";
SHERPA.CSS_FILES = ["bootstrap","sherpa_overides"];
SHERPA.CSS_LOCAL_APP = "assets/sherpa/css/docs.css";
*/



SHERPA.JS_CORE_LOAD = [
	{ jquery: SHERPA.JS_LIB_PATH+"jquery.min.js"}, 
	{ knockout: SHERPA.JS_LIB_PATH+"knockout.min.js"},
	{ amplify: SHERPA.JS_LIB_PATH+"amplify.min.js"}, 
	{ pager: SHERPA.JS_LIB_PATH+"pager.min.js"}, 
	{ history: SHERPA.JS_LIB_PATH+"jquery.history.js"},
	{ scrollTo: SHERPA.JS_LIB_PATH+"jquery.scrollTo.min.js"}, 
	{ underscoreString: SHERPA.JS_LIB_PATH+"underscore.string.min.js"},
	{ queryString: SHERPA.JS_LIB_PATH+"query-string.js"},
	{ jqueryUI: SHERPA.JS_LIB_PATH+"jquery-ui.min.js"},
	{ bootstrap: SHERPA.JS_LIB_PATH+"bootstrap-min.js"},
	{ dateFormat: SHERPA.JS_LIB_PATH+"date-format.js"},
	{ waypoints: SHERPA.JS_LIB_PATH+"waypoints.min.js"},
	{ waypointsSticky: SHERPA.JS_LIB_PATH+"waypoints-sticky.min.js"},
	{ waypointsInfinite: SHERPA.JS_LIB_PATH+"waypoints-infinite.min.js"}
]


/*********************************************************************************
 LOAD UNDERSCORE - CANNOT BE OVERRIDEN
 *********************************************************************************/
Sherpa.js({ underscore: "assets/sherpa/lib/underscore-min.js"});

/*********************************************************************************
GLOBAL Sherpa Globals Overides:
*********************************************************************************/


Sherpa.ready("underscore", function() {
	console.log("loaded: ","underscore")
    if(_.isObject(SHERPA_CONFIG_OVERRIDES) && !_.isEmpty(SHERPA_CONFIG_OVERRIDES) ) {
    	if(SHERPA_CONFIG_OVERRIDES.JS_CORE_LOAD){
	        SHERPA_CONFIG_OVERRIDES.JS_CORE_LOAD = _.union(SHERPA.JS_CORE_LOAD, SHERPA_CONFIG_OVERRIDES.JS_CORE_LOAD);
	    }
        _.extend(SHERPA, SHERPA_CONFIG_OVERRIDES);

        //TODO fix binding - _.extend(SHERPA, SHERPA_CONFIG_OVERRIDES).bind(loadCoreJSLibs);
        
    }

	_.each(SHERPA.JS_CORE_LOAD, function(lib){
		console.log("loaded: ",_.keys(lib)[0]);
		Sherpa.js(lib);
	});

});

/*********************************************************************************
GLOBAL Counter for troubleshooting bottlenecks:
*********************************************************************************/

var count = 0, last_time = 0, start_time = 0, time_log = {}, see = "----------------->";
var counter = function (e) {
	if(SHERPA.ENABLE_COUNTER) {
	    count++;
	    var t = " ",
	        n = (new Date).getTime(),
	        r = (n - last_time) / 1e3;
	    last_time = n;
	    var i = (last_time - start_time) / 1e3 + " secs";
	    console.log( e && (time_log[e] ? (r = r = (n - time_log[e].last_time) / 1e3, t = " END: " + e) : (time_log[e] = {
	        last_time: last_time
	    }, t = " START: " + e)), count + ": elapsed/total time:" + r + "/" + i + t );
	}
}
counter("Sherpa INIT");




/*********************************************************************************
GLOBAL Sherpa Computed Globals:
*********************************************************************************/
if(SHERPA.RUN_AS_LOCAL) {
	SHERPA.JS_LIB_PATH = SHERPA.LOCAL_PATH+SHERPA.JS_LIB_PATH;
	SHERPA.JS_PATH = SHERPA.LOCAL_PATH+SHERPA.JS_PATH;
} else {
	SHERPA.JS_LIB_PATH = SHERPA.REMOTE_PATH+SHERPA.JS_LIB_PATH;
	SHERPA.JS_PATH = SHERPA.REMOTE_PATH+SHERPA.JS_PATH;
}




/*********************************************************************************
IE Workarounds:
*********************************************************************************/
if (Sherpa.browser.ie)  {
	Sherpa.js(
		{ html5shiv: SHERPA.JS_LIB_PATH+"html5shiv.js"}, 
		{ html5printshiv: SHERPA.JS_LIB_PATH+"html5shiv-printshiv.js"}
		{ html5Formshim: SHERPA.JS_LIB_PATH+"jquery.html5form.js"}
	);
}
	

/*********************************************************************************
Sherpa ready init functions:
*********************************************************************************/
var viewModel = {};

/**
 * Defined here to be used for adding additional configs with _.extend();
 *
 * prevents error when not using sherpa-i18n.js (which defines property);
 */
viewModel.config = {};

Sherpa.ready(function(){


	//Load all sherpa utilities, custom widgets for knockout, pager, amplify, etc.
	Sherpa.js(
		{ sherpaEventManager: SHERPA.JS_LIB_PATH+"sherpa-event-manager.js"},
		{ sherpaUtils: SHERPA.JS_LIB_PATH+"sherpa-utils.js"},
		{ sherpai18n: SHERPA.JS_LIB_PATH+"sherpa-i18n.js"},
		{ sherpaPseudoAuth: SHERPA.JS_LIB_PATH+"sherpa-pseudo-auth.js"},
		{ sherpaCustomWidgets: SHERPA.JS_LIB_PATH+"sherpa-custom-widgets.js"},
		{ sherpaGlobalEvents: SHERPA.JS_LIB_PATH+"sherpa-global-events.js"}
	);


	//Enables Gridset overlay if configured
	if(SHERPA.ENABLE_GRIDSET_OVERLAY){
		Sherpa.js({ gridSet: SHERPA.JS_LIB_PATH+"gridset-overlay.js"});
	}

	//Enables Sherpa Notes if configured
	if(SHERPA.ENABLE_NOTES){
		Sherpa.js(
			{ showdown: SHERPA.JS_LIB_PATH+"showdown.js"},
			{ sherpaNotes: SHERPA.JS_LIB_PATH+"sherpa-notes.js"}
		);
	}


	//Wait till all of sherpa specific functions are loaded
	Sherpa.ready("sherpai18n", function(){

		//load local app
		Sherpa.js(
			{ localJSApp: SHERPA.JS_PATH+SHERPA.PROTOTYPE_APP}
		);

	    Sherpa.ready("localJSApp", function(){
		    //apply all bindings to view model
			ko.applyBindings(viewModel);

			//turn on the page
		    $('html').addClass('sherpaReady');

			//Enables prototype QA if configured
			if(SHERPA.ENABLE_PROTOTYPE_QA){
				Sherpa.js(
					{ sherpaPrototypeQA: SHERPA.JS_LIB_PATH+"sherpa-prototype-qa.js"}
				);

			}

			counter("Sherpa INIT");
			

		});

	});


});





/*********************************************************************************/


