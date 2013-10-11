//______________________________________________________________________________________

/*

Title: Sherpa Protoype Framework
SubTitle: A stand-alone pure JavaScript User Experience Modeling Framework
<http://sherpa.gsdprototypes.com>

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

Copyright (c) 2013, Dell Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   <http://www.apache.org/licenses/LICENSE-2.0>

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

//_______________________________________________________________________________________

'use strict'



// HEAD JS Configuration:
//______________________________________________________________________________________

/*
	head.js <http://headjs.com/> provides the ability to preconfigure before it fires.
	One of the key configurations below is the ability to create a custom namespace with
	the "head" property. This wraps all the functionality of head.js under the Sherpa name
	and then we further use the Sherpa object for a wholistic purpose.

	head.js adds classes to the html tag which can be very handy.  However, we had to extend 
	this to other tags. For example, while the domready class is nice, we added a sherpaReady
	tag which is fired after the page viewModel is applied to knockout bindings.  While this
	causes a slight delay in the page becoming visible it prevents all the jerky motion that
	occurs when a page is being constructed on the client.

*/
var head_conf = {
	screens: [767, 979, 1140],
	head: "Sherpa",
	screensCss: {
        "gt" : false,
        "gte": false,
        "lt" : false,
        "lte": false,
        "eq" : false
	}
};

// Load HEAD JS:
//______________________________________________________________________________________

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



// Sherpa GLOBALS:
//______________________________________________________________________________________
var SHERPA = {}, viewModel = {};
if(typeof(SHERPA_CONFIG_OVERRIDES)==="undefined"){
	var SHERPA_CONFIG_OVERRIDES = {};
}


	/*
		The viewModel holds the context for the entire application/page. It has to be declared 
		here since all the sherpa core js files use it to store information.
	*/


//Load GLOBAL Sherpa Configuration file:
//______________________________________________________________________________________

(function(SHERPA_CONFIG_OVERRIDES){
	Sherpa.init = {
		getCoreConfig:{}, 
		getOverrideConfig:{}, 
		errorCount:0,
		config_filename:"",
		core_name: ".sherpa/",
		default_config_filename:'.sherpa/config/core_config.json',
		web_root_path: function(path){
			var filename = path.split("/")[path.split("/").length-1];
			if(filename){
				return path.replace(filename,"")
			} else {
				console.log("has clean path", path)
				return path;
			}
		}(location.pathname),
		core_path : ''
	}
	Sherpa.QA = {
		check:function(){},
		logEntry:function(){},
	}
console.log(Sherpa.init.web_root_path)

	// IE Console workaround and disable:
	//______________________________________________________________________________________

	/*
		In case we forget to take out console statements. 
		IE becomes very unhappy when we forget. Let's not make IE unhappy
	*/
	Sherpa.init.disableConsole = function (){
		var console={};
		console.log=console.error=console.info=console.debug=console.warn=console.trace=console.dir=console.dirxml=console.group=console.groupEnd=console.time=console.timeEnd=console.assert=console.profile=function(){}
	}
	if(typeof(console)==="undefined"){
		Sherpa.disableConsole();
	}


	//checking to see if prototype file is inside the core_path
	if(location.pathname.match(Sherpa.init.core_name)){
		Sherpa.init.config_filename = location.pathname.split(Sherpa.init.core_name)[0]+Sherpa.init.default_config_filename;
		Sherpa.init.core_path = location.pathname.split(Sherpa.init.core_name)[0];
	} else {
		//assume that prototype file is in the project root directory
		Sherpa.init.config_filename = Sherpa.init.default_config_filename;
	}


	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		Sherpa.init.getCoreConfig=new XMLHttpRequest();
		if(SHERPA_CONFIG_OVERRIDES){
			Sherpa.init.getOverrideConfig=new XMLHttpRequest();
		}
	} else {
		// code for IE6, IE5
		Sherpa.initgetCoreConfig=new ActiveXObject("Microsoft.XMLHTTP");
		if(SHERPA_CONFIG_OVERRIDES){
			Sherpa.init.getOverrideConfig=new ActiveXObject("Microsoft.XMLHTTP");
		}
	}


	Sherpa.init.getCoreConfig.onreadystatechange=function() {
		if (Sherpa.init.getCoreConfig.readyState==4) {
			if(Sherpa.init.getCoreConfig.status==200) {
				SHERPA = JSON.parse(Sherpa.init.getCoreConfig.responseText);
				SHERPA.GLOBAL_CONFIG = Sherpa.init.config_filename;
				SHERPA.WEBROOT_PATH = Sherpa.init.web_root_path;
				SHERPA.CORE_PATH = Sherpa.init.core_path;
				if(SHERPA_CONFIG_OVERRIDES.GLOBAL_CONFIG) {
					Sherpa.init.getOverrideConfig.open("GET",SHERPA_CONFIG_OVERRIDES.GLOBAL_CONFIG,true);
					Sherpa.init.getOverrideConfig.send();
				} else {
					Sherpa.init.resetPaths(Sherpa,SHERPA,SHERPA_CONFIG_OVERRIDES,console,viewModel);
				}
			} 
			if (Sherpa.init.getCoreConfig.status==404) {
				if(Sherpa.init.errorCount < 3) {
					Sherpa.init.errorCount++;
					Sherpa.init.core_path += '../';
					Sherpa.init.config_filename = Sherpa.init.core_path+Sherpa.init.default_config_filename;	
					Sherpa.init.getCoreConfig.open("GET",Sherpa.init.config_filename,true);
					Sherpa.init.getCoreConfig.send();
				} else {
					console.error(".sherpa/config/core_config.json was not found - please make sure you have .sherpa folder in your project.")
				}
			}
		}
	}
	Sherpa.init.getCoreConfig.open("GET",Sherpa.init.config_filename,true);
	Sherpa.init.getCoreConfig.send();

	Sherpa.init.getOverrideConfig.onreadystatechange=function() {
		if (Sherpa.init.getOverrideConfig.readyState==4) {
			if(Sherpa.init.getOverrideConfig.status==200) {
				SHERPA_CONFIG_OVERRIDES = JSON.parse(Sherpa.init.getOverrideConfig.responseText);
				Sherpa.init.resetPaths(Sherpa,SHERPA,SHERPA_CONFIG_OVERRIDES,console,viewModel);
			} 
			if (Sherpa.init.getOverrideConfig.status==404) {
				alert("The configuration file you specified "+SHERPA_CONFIG_OVERRIDES.GLOBAL_CONFIG+" was not found - please make sure it is in place.");
			}
		}
	}


})(SHERPA_CONFIG_OVERRIDES);

Sherpa.init.resetPaths = function(Sherpa,SHERPA,SHERPA_CONFIG_OVERRIDES,console,viewModel){

	if(SHERPA_CONFIG_OVERRIDES) {
		for (var key in SHERPA_CONFIG_OVERRIDES) {
			SHERPA[key]=SHERPA_CONFIG_OVERRIDES[key];
		};
	} 
	SHERPA.CSS_CORE_PATH = SHERPA.CORE_PATH+SHERPA.CSS_CORE_PATH;
	SHERPA.JS_LIB_PATH = SHERPA.CORE_PATH+SHERPA.JS_LIB_PATH;
	SHERPA.BIN_PATH = SHERPA.CORE_PATH+SHERPA.BIN_PATH;
	SHERPA.COMPONENTS_PATH = SHERPA.CORE_PATH+SHERPA.COMPONENTS_PATH;
	SHERPA.ASSETS_PATH = SHERPA.WEBROOT_PATH+SHERPA.ASSETS_PATH;
	SHERPA.JS_PATH = SHERPA.WEBROOT_PATH+SHERPA.JS_PATH;
	SHERPA.CSS_LOCAL_PATH = SHERPA.WEBROOT_PATH+SHERPA.CSS_LOCAL_PATH;
	SHERPA.CSS_CORE_LOAD.css_theme = SHERPA.DEFAULT_THEME;
	SHERPA.CSS_PATH = SHERPA.WEBROOT_PATH+SHERPA.CSS_PATH;
	SHERPA.DOCUMENTATION_PATH = SHERPA.WEBROOT_PATH+SHERPA.DOCUMENTATION_PATH;
	Sherpa.version = SHERPA.VERSION;
	Sherpa.version.summary = "Dell Sherpa v"+SHERPA.VERSION.major+SHERPA.VERSION.minor+" - "+SHERPA.VERSION.releaseDate+" - ("+SHERPA.VERSION.codeName+")";
	viewModel.default_values = SHERPA.default_values;
	if(SHERPA.DISABLE_CONSOLE_MESSAGES){
		Sherpa.init.disableConsole();
	}
	Sherpa.init.start(Sherpa,SHERPA,console,viewModel);
}

// Main Sherpa JS boot up
//______________________________________________________________________________________

Sherpa.init.start = function(Sherpa,SHERPA,console,viewModel){
console.log(Sherpa,SHERPA,console,viewModel)
	// GLOBAL Counter function for troubleshooting bottlenecks:
	//______________________________________________________________________________________

	Sherpa.counter = function (marker) {
		if(SHERPA.ENABLE_COUNTER) {
			if(marker == "report") {
				console.log(JSON.stringify(Sherpa.counter.obj.time_log,null,5));
			} else {

				if(!Sherpa.counter.obj) {
					var obj = {
						count: 0,
						start_time: (new Date).getTime(),
						time_log: {},
						last_time: 0,
						memory_usage: (console.memory.totalJSHeapSize/console.memory.jsHeapSizeLimit*100).toPrecision(3)+"%"
					};
					obj.new_time = obj.start_time;
				} else {
					var obj = Sherpa.counter.obj;
					obj.new_time = (new Date).getTime();
				}
				obj.count++;
			    obj.elapsed_time = (obj.new_time - obj.last_time) / 1000;
			    obj.last_time = obj.new_time;
			    if(marker && obj.time_log[marker] == undefined) {
			    	//never seen this marker
			    	obj.time_log[marker]={};
			    	obj.time_log[marker].start = obj.new_time;
			    	console.log(obj.count + ": "+marker + " - starting timer at:" + (obj.last_time - obj.start_time )/1000 + " seconds - memory:"+obj.memory_usage);
			    } else if (marker) {
			    	obj.time_log[marker].elapsed_time = obj.last_time - obj.time_log[marker].start;
			    	console.log(obj.count + ": "+marker + " - elapsed time:" + obj.time_log[marker].elapsed_time /1000 + " seconds - memory:"+obj.memory_usage);
			    } else {
				    console.log(obj.count + ": elapsed/total time:" + obj.elapsed_time + "/"  + obj.last_time+" - memory:"+obj.memory_usage);
			    }
			    Sherpa.counter.obj = obj;
			}
			return obj.new_time;
		}
	}
	// initiate counter to start login of entire app
	Sherpa.counter("Sherpa INIT");

	// LOAD UNDERSCORE - CANNOT BE OVERRIDEN
	//______________________________________________________________________________________

	/* 
		We decided that underscore is such a vital part of this framework, we better load 
		it before anything else. Who wants to do for loops??
	*/
	console.log("......................................>",SHERPA.JS_LIB_PATH,"<------->",SHERPA.UNDERSCORE)
	Sherpa.js({ underscore: SHERPA.JS_LIB_PATH+SHERPA.UNDERSCORE});

	// GLOBAL Sherpa Globals Overides:
	//______________________________________________________________________________________

	/*
		Global overrides is a way to specify global variables from the html document.  In some
		cases you might have different prototype html pages and maybe you have a need to have
		different configuration.  For example, you might want a different js file to control 
		a particular page.

	*/

	Sherpa.ready("underscore", function() {


		// Load CSS Files:
		//______________________________________________________________________
		// load all core css and theme if config is set to reset theme	
		Sherpa.counter("Loading Core CSS");
		_.each(SHERPA.CSS_CORE_LOAD, function(css){
			//theme implementation				
			if(!(_.keys(css)[0] == "css_theme" && !SHERPA.RESET_THEME_ONLOAD)) {
				css[_.keys(css)[0]]= SHERPA.CSS_CORE_PATH+_.values(css)[0];
				console.log("Loading css: ",css);
				Sherpa.load(css);
			}
		});
		Sherpa.counter("Loading Core CSS");


		Sherpa.counter("Loading Core JS libraries");
		
	    if(_.isObject(SHERPA_CONFIG_OVERRIDES) && !_.isEmpty(SHERPA_CONFIG_OVERRIDES) ) {
	    	if(SHERPA_CONFIG_OVERRIDES.JS_CORE_LOAD){
		        SHERPA_CONFIG_OVERRIDES.JS_CORE_LOAD = _.union(SHERPA.JS_CORE_LOAD, SHERPA_CONFIG_OVERRIDES.JS_CORE_LOAD);
		    	SHERPA_CONFIG_OVERRIDES.JS_CORE_LOAD = _.reject(SHERPA_CONFIG_OVERRIDES.JS_CORE_LOAD, function(num){ return num == undefined; });
		    }
	        _.extend(SHERPA, SHERPA_CONFIG_OVERRIDES);

	        //TODO fix binding - _.extend(SHERPA, SHERPA_CONFIG_OVERRIDES).bind(loadCoreJSLibs);
	        
	    }
		// Load JS CORE:
		//______________________________________________________________________
		console.log("load js core")
		_.each(SHERPA.JS_CORE_LOAD, function(lib){
			console.log("Loading js: ",_.keys(lib)[0]);
			lib[_.keys(lib)[0]]= SHERPA.JS_LIB_PATH+_.values(lib)[0];
			Sherpa.js(lib);
		});

		Sherpa.counter("Loading Core JS libraries");



		// Load Theme CSS:
		//______________________________________________________________________

		Sherpa.ready("sherpaUtils", function(){
			Sherpa.counter("Loading CSS");

			if(Sherpa.urlQuery().theme) {
				Sherpa.store("theme", Sherpa.urlQuery().theme);
				console.log("theme in url: ", Sherpa.store("theme"))
			} else {
				if(SHERPA.DEFAULT_THEME && SHERPA.RESET_THEME_ONLOAD){
					Sherpa.store("theme", SHERPA.DEFAULT_THEME);
				} else {
					Sherpa.store("theme", "bootstrap");
				}
			}

			//CSS theme implementation
			var theme_id = Sherpa.store("theme");
			$('html').addClass("theme-"+theme_id);
			$('#theme-logic-css').remove();
			$('body').prepend('<style id="theme-logic-css">[class^=theme-only] {display:none;};[class^=theme-hide] {display:block;};.theme-'+theme_id+' .theme-only-'+theme_id+' {display:block;};.theme-'+theme_id+' .theme-hide-'+theme_id+' {display:none;}</style>');

			if(!SHERPA.RESET_THEME_ONLOAD){				
				css = {css_theme:"themes/"+Sherpa.store("theme")+".css"}
				console.log("loading theme css: ",css);
				Sherpa.load(css);
			}
			// Load Local CSS File:
			//______________________________________________________________________
			Sherpa.load({local_css: SHERPA.CSS_PATH+SHERPA.PROTOTYPE_CSS});

			Sherpa.counter("Loading CSS");
		});







		// IE Workarounds:
		//______________________________________________________________________________________
		// TODO everything breaks in IE right now so this is not much to worry about right now

		if (Sherpa.browser.ie)  {
			Sherpa.counter("Loading IE Workarounds");

			if($('html').hasClass('ie9') && SHERPA.CSS_GRID_IE9) {
				Sherpa.load({grid: SHERPA.CSS_CORE_PATH+SHERPA.CSS_GRID_IE9});
			} else {
				if(SHERPA.CSS_GRID_LTIE9) {
					Sherpa.load({grid: SHERPA.CSS_CORE_PATH+SHERPA.CSS_GRID_LTIE9});
				}
			}

			_.each(SHERPA.IE_JS_LOAD, function(lib){
				console.log("Loading js: ",_.keys(lib)[0]);
				lib[_.keys(lib)[0]]= SHERPA.JS_LIB_PATH+_.values(lib)[0];
				Sherpa.js(lib);
			});

			Sherpa.counter("Loading IE Workarounds");
		} else {
			if(SHERPA.CSS_GRID) {
				Sherpa.counter("Loading CSS Grid");
				Sherpa.load({grid: SHERPA.CSS_CORE_PATH+SHERPA.CSS_GRID});
				console.log("Loading css: grid");		
				Sherpa.counter("Loading CSS Grid");
			}
		}
			


	});


	// Sherpa ready init functions:
	//______________________________________________________________________________________

	Sherpa.ready("dateFormat", function(){
		//dateFormat is the last core js library that loads so we wait for all to load before begining.

		//Load all sherpa core js files: utilities, custom widgets for knockout, pager, amplify, etc.
		Sherpa.counter("Loading Sherpa Core JS");
		_.each(SHERPA.SHERPA_CORE_LOAD, function(lib){
			lib[_.keys(lib)[0]]= SHERPA.JS_LIB_PATH+_.values(lib)[0];
			console.log("Loading js: ",lib)
			Sherpa.js(lib);
		});
		Sherpa.counter("Loading Sherpa Core JS");

		// Need to wait for i18n to load so that messages are in context (viewModel.content)
		Sherpa.ready("sherpai18n", function(){

			
			// load local app
			Sherpa.counter("Loading prototype JS application");
			Sherpa.js(
				{ localJSApp: SHERPA.JS_PATH+SHERPA.PROTOTYPE_APP}
			);				
			Sherpa.counter("Loading prototype JS application");

		    Sherpa.ready("localJSApp", function(){

				if(SHERPA.ENABLE_GRIDSET_OVERLAY){
					Sherpa.counter("Loading Gridset Overlay application");
					//if configured, load gridset overlay
					SHERPA.GRIDSET_OVERLAY_JS[_.keys(SHERPA.GRIDSET_OVERLAY_JS)[0]]= SHERPA.JS_LIB_PATH+_.values(SHERPA.GRIDSET_OVERLAY_JS)[0];
					Sherpa.js(SHERPA.GRIDSET_OVERLAY_JS);
					// Adds additional control for visually isolating each grid a/b when control-g is invoked
					Sherpa.key('ctrl+shift+a', function () { 
						if($('html').hasClass("show-a-grid")){
							Sherpa.feature("show-a-grid",false)
						} else {
							Sherpa.feature("show-a-grid",true) 
							Sherpa.feature("show-b-grid",false) 
						} 
					});
					Sherpa.key('ctrl+shift+b', function () { 
						if($('html').hasClass("show-b-grid")){
							Sherpa.feature("show-b-grid",false)
						} else {
							Sherpa.feature("show-b-grid",true) 
							Sherpa.feature("show-a-grid",false) 
						} 
					});
					Sherpa.counter("Loading Gridset Overlay application");
				}
				if(SHERPA.ENABLE_NOTES){
					//if configured, load sherpa notes
					Sherpa.counter("Loading Sherpa Notes application");
					SHERPA.NOTES_JS[_.keys(SHERPA.NOTES_JS)[0]]= SHERPA.JS_LIB_PATH+_.values(SHERPA.NOTES_JS)[0];
					Sherpa.js(SHERPA.NOTES_JS);
					Sherpa.counter("Loading Sherpa Notes application");
				}
				if(SHERPA.PROTOTYPE_QA){
					//if configured, load sherpa qa
					Sherpa.counter("Loading Sherpa QA application");
					SHERPA.PROTOTYPE_QA[_.keys(SHERPA.PROTOTYPE_QA)[0]]= SHERPA.JS_LIB_PATH+_.values(SHERPA.PROTOTYPE_QA)[0];
					Sherpa.js(SHERPA.PROTOTYPE_QA);
					Sherpa.counter("Loading Sherpa QA application");
				} 

				Sherpa.counter("Loading page routing and initiating page startup");
		    	// extend viewModel with a $__page__ that points to pager.page that points to a new Page

		    	pager.Href.hash = '#!/';

				pager.extendWithPage(viewModel);
			    //apply view model to allknockout bindings 
				ko.applyBindings(viewModel);
				// run this method - listening to hashchange
				pager.start();
				pager.start({id:'available_templates'});


				// turn on the page
			    $('html').addClass('sherpaReady');
			    Sherpa.counter("Loading page routing and initiating page startup");

			    Sherpa.session.storeCleanUp();


				// Mark the end of the sherpa init sequence
				Sherpa.counter("Sherpa INIT");
			}); // end Sherpa.ready - local app

		}); // end Sherpa.ready - i18n

	}); // end Sherpa.ready
} // end SherpaInit