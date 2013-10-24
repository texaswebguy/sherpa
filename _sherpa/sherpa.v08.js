
//______________________________________________________________________________________

/*!
 * SherpaJS     Sherpa Protoype Framework    
 * Author     	Bo Lora  (bolora)
 * License      APACHE / http://www.apache.org/licenses/LICENSE-2.0
 *
 * Version 0.8
 * http://bit.ly/uxprototyping
 */

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
	tag which is fired after the page Sherpa.viewModel is applied to knockout bindings.  While this
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

/*
	HeadJS     The only script in your <HEAD>    
	Author     Tero Piirainen  (tipiirai)
	Maintainer Robert Hoffmann (itechnology)
	License    MIT / http://bit.ly/mit-license

	Version 0.99
	http://headjs.com
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

// IE workarounds:
//______________________________________________________________________________________
/*
	In case we forget to take out console statements. 
	IE becomes very unhappy when we forget. Let's not make IE unhappy
*/

if(typeof(console)==="undefined"){
	var console={};
	console.log=console.error=console.info=console.debug=console.warn=console.trace=console.dir=console.dirxml=console.group=console.groupEnd=console.time=console.timeEnd=console.assert=console.profile=function(){}
}

//load JSON is not present
if(typeof JSON!=="object"){JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());


//     Underscore.js 1.5.2
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,h=e.reduce,v=e.reduceRight,g=e.filter,d=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,w=Object.keys,_=i.bind,j=function(n){return n instanceof j?n:this instanceof j?(this._wrapped=n,void 0):new j(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=j),exports._=j):n._=j,j.VERSION="1.5.2";var A=j.each=j.forEach=function(n,t,e){if(null!=n)if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a=j.keys(n),u=0,i=a.length;i>u;u++)if(t.call(e,n[a[u]],a[u],n)===r)return};j.map=j.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e.push(t.call(r,n,u,i))}),e)};var E="Reduce of empty array with no initial value";j.reduce=j.foldl=j.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduce===h)return e&&(t=j.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(E);return r},j.reduceRight=j.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduceRight===v)return e&&(t=j.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=j.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(E);return r},j.find=j.detect=function(n,t,r){var e;return O(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},j.filter=j.select=function(n,t,r){var e=[];return null==n?e:g&&n.filter===g?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&e.push(n)}),e)},j.reject=function(n,t,r){return j.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},j.every=j.all=function(n,t,e){t||(t=j.identity);var u=!0;return null==n?u:d&&n.every===d?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var O=j.some=j.any=function(n,t,e){t||(t=j.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};j.contains=j.include=function(n,t){return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:O(n,function(n){return n===t})},j.invoke=function(n,t){var r=o.call(arguments,2),e=j.isFunction(t);return j.map(n,function(n){return(e?t:n[t]).apply(n,r)})},j.pluck=function(n,t){return j.map(n,function(n){return n[t]})},j.where=function(n,t,r){return j.isEmpty(t)?r?void 0:[]:j[r?"find":"filter"](n,function(n){for(var r in t)if(t[r]!==n[r])return!1;return!0})},j.findWhere=function(n,t){return j.where(n,t,!0)},j.max=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.max.apply(Math,n);if(!t&&j.isEmpty(n))return-1/0;var e={computed:-1/0,value:-1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a>e.computed&&(e={value:n,computed:a})}),e.value},j.min=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.min.apply(Math,n);if(!t&&j.isEmpty(n))return 1/0;var e={computed:1/0,value:1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a<e.computed&&(e={value:n,computed:a})}),e.value},j.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=j.random(r++),e[r-1]=e[t],e[t]=n}),e},j.sample=function(n,t,r){return arguments.length<2||r?n[j.random(n.length-1)]:j.shuffle(n).slice(0,Math.max(0,t))};var k=function(n){return j.isFunction(n)?n:function(t){return t[n]}};j.sortBy=function(n,t,r){var e=k(t);return j.pluck(j.map(n,function(n,t,u){return{value:n,index:t,criteria:e.call(r,n,t,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={},i=null==r?j.identity:k(r);return A(t,function(r,a){var o=i.call(e,r,a,t);n(u,o,r)}),u}};j.groupBy=F(function(n,t,r){(j.has(n,t)?n[t]:n[t]=[]).push(r)}),j.indexBy=F(function(n,t,r){n[t]=r}),j.countBy=F(function(n,t){j.has(n,t)?n[t]++:n[t]=1}),j.sortedIndex=function(n,t,r,e){r=null==r?j.identity:k(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;r.call(e,n[o])<u?i=o+1:a=o}return i},j.toArray=function(n){return n?j.isArray(n)?o.call(n):n.length===+n.length?j.map(n,j.identity):j.values(n):[]},j.size=function(n){return null==n?0:n.length===+n.length?n.length:j.keys(n).length},j.first=j.head=j.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:o.call(n,0,t)},j.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},j.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},j.rest=j.tail=j.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},j.compact=function(n){return j.filter(n,j.identity)};var M=function(n,t,r){return t&&j.every(n,j.isArray)?c.apply(r,n):(A(n,function(n){j.isArray(n)||j.isArguments(n)?t?a.apply(r,n):M(n,t,r):r.push(n)}),r)};j.flatten=function(n,t){return M(n,t,[])},j.without=function(n){return j.difference(n,o.call(arguments,1))},j.uniq=j.unique=function(n,t,r,e){j.isFunction(t)&&(e=r,r=t,t=!1);var u=r?j.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:j.contains(a,r))||(a.push(r),i.push(n[e]))}),i},j.union=function(){return j.uniq(j.flatten(arguments,!0))},j.intersection=function(n){var t=o.call(arguments,1);return j.filter(j.uniq(n),function(n){return j.every(t,function(t){return j.indexOf(t,n)>=0})})},j.difference=function(n){var t=c.apply(e,o.call(arguments,1));return j.filter(n,function(n){return!j.contains(t,n)})},j.zip=function(){for(var n=j.max(j.pluck(arguments,"length").concat(0)),t=new Array(n),r=0;n>r;r++)t[r]=j.pluck(arguments,""+r);return t},j.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},j.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=j.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},j.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},j.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=new Array(e);e>u;)i[u++]=n,n+=r;return i};var R=function(){};j.bind=function(n,t){var r,e;if(_&&n.bind===_)return _.apply(n,o.call(arguments,1));if(!j.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));R.prototype=n.prototype;var u=new R;R.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},j.partial=function(n){var t=o.call(arguments,1);return function(){return n.apply(this,t.concat(o.call(arguments)))}},j.bindAll=function(n){var t=o.call(arguments,1);if(0===t.length)throw new Error("bindAll must be passed function names");return A(t,function(t){n[t]=j.bind(n[t],n)}),n},j.memoize=function(n,t){var r={};return t||(t=j.identity),function(){var e=t.apply(this,arguments);return j.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},j.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},j.defer=function(n){return j.delay.apply(j,[n,1].concat(o.call(arguments,1)))},j.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var c=function(){o=r.leading===!1?0:new Date,a=null,i=n.apply(e,u)};return function(){var l=new Date;o||r.leading!==!1||(o=l);var f=t-(l-o);return e=this,u=arguments,0>=f?(clearTimeout(a),a=null,o=l,i=n.apply(e,u)):a||r.trailing===!1||(a=setTimeout(c,f)),i}},j.debounce=function(n,t,r){var e,u,i,a,o;return function(){i=this,u=arguments,a=new Date;var c=function(){var l=new Date-a;t>l?e=setTimeout(c,t-l):(e=null,r||(o=n.apply(i,u)))},l=r&&!e;return e||(e=setTimeout(c,t)),l&&(o=n.apply(i,u)),o}},j.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},j.wrap=function(n,t){return function(){var r=[n];return a.apply(r,arguments),t.apply(this,r)}},j.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},j.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},j.keys=w||function(n){if(n!==Object(n))throw new TypeError("Invalid object");var t=[];for(var r in n)j.has(n,r)&&t.push(r);return t},j.values=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},j.pairs=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},j.invert=function(n){for(var t={},r=j.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},j.functions=j.methods=function(n){var t=[];for(var r in n)j.isFunction(n[r])&&t.push(r);return t.sort()},j.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},j.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},j.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)j.contains(r,u)||(t[u]=n[u]);return t},j.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]===void 0&&(n[r]=t[r])}),n},j.clone=function(n){return j.isObject(n)?j.isArray(n)?n.slice():j.extend({},n):n},j.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof j&&(n=n._wrapped),t instanceof j&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==String(t);case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;var a=n.constructor,o=t.constructor;if(a!==o&&!(j.isFunction(a)&&a instanceof a&&j.isFunction(o)&&o instanceof o))return!1;r.push(n),e.push(t);var c=0,f=!0;if("[object Array]"==u){if(c=n.length,f=c==t.length)for(;c--&&(f=S(n[c],t[c],r,e)););}else{for(var s in n)if(j.has(n,s)&&(c++,!(f=j.has(t,s)&&S(n[s],t[s],r,e))))break;if(f){for(s in t)if(j.has(t,s)&&!c--)break;f=!c}}return r.pop(),e.pop(),f};j.isEqual=function(n,t){return S(n,t,[],[])},j.isEmpty=function(n){if(null==n)return!0;if(j.isArray(n)||j.isString(n))return 0===n.length;for(var t in n)if(j.has(n,t))return!1;return!0},j.isElement=function(n){return!(!n||1!==n.nodeType)},j.isArray=x||function(n){return"[object Array]"==l.call(n)},j.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){j["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),j.isArguments(arguments)||(j.isArguments=function(n){return!(!n||!j.has(n,"callee"))}),"function"!=typeof/./&&(j.isFunction=function(n){return"function"==typeof n}),j.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},j.isNaN=function(n){return j.isNumber(n)&&n!=+n},j.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},j.isNull=function(n){return null===n},j.isUndefined=function(n){return n===void 0},j.has=function(n,t){return f.call(n,t)},j.noConflict=function(){return n._=t,this},j.identity=function(n){return n},j.times=function(n,t,r){for(var e=Array(Math.max(0,n)),u=0;n>u;u++)e[u]=t.call(r,u);return e},j.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))};var I={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};I.unescape=j.invert(I.escape);var T={escape:new RegExp("["+j.keys(I.escape).join("")+"]","g"),unescape:new RegExp("("+j.keys(I.unescape).join("|")+")","g")};j.each(["escape","unescape"],function(n){j[n]=function(t){return null==t?"":(""+t).replace(T[n],function(t){return I[n][t]})}}),j.result=function(n,t){if(null==n)return void 0;var r=n[t];return j.isFunction(r)?r.call(n):r},j.mixin=function(n){A(j.functions(n),function(t){var r=j[t]=n[t];j.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(j,n))}})};var N=0;j.uniqueId=function(n){var t=++N+"";return n?n+t:t},j.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;j.template=function(n,t,r){var e;r=j.defaults({},r,j.templateSettings);var u=new RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(D,function(n){return"\\"+B[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=new Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,j);var c=function(n){return e.call(this,n,j)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},j.chain=function(n){return j(n).chain()};var z=function(n){return this._chain?j(n).chain():n};j.mixin(j),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];j.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];j.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),j.extend(j.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);


_.mixin({merge: function(obj) {
	  var parentRE = /#{\s*?_\s*?}/,
	      slice = Array.prototype.slice,
	      hasOwnProperty = Object.prototype.hasOwnProperty,
	      tempObj={};
	 if(_.isArray(obj) && _.isArray(slice.call(arguments, 1)[0])) {
	 	// TODO this is to merge objects NOT arrays, we should make it handle arrays as a union
	 	// This should work console.log(_.merge(["dogs","cats"],["hamsters","dogs"])) >>> ["dogs","cats","hamsters"]
	 	_.each(slice.call(arguments, 1), function(arr){
	 		_.union(obj,arr);
	 	})
	 	return obj;
	 } else {
		  _.each(slice.call(arguments, 1), function(source) {
		    for (var prop in source) {
		      if (hasOwnProperty.call(source, prop)) {
		        if (_.isUndefined(obj[prop]) || _.isFunction(obj[prop]) || _.isNull(source[prop])) {
		          obj[prop] = source[prop];
		        }
		        else if (_.isString(source[prop]) && parentRE.test(source[prop])) {
		          if (_.isString(obj[prop])) {
		            obj[prop] = source[prop].replace(parentRE, obj[prop]);
		          }
		        }
		        else if (_.isArray(obj[prop]) || _.isArray(source[prop])){
		          if (!_.isArray(obj[prop]) || !_.isArray(source[prop])){
		            throw 'Error: Trying to combine an array with a non-array (' + prop + ')';
		          } else {
		          	obj[prop] = _.union(obj[prop],source[prop])
		          }
		        }
		        else if (_.isObject(obj[prop]) || _.isObject(source[prop])){
		          if (!_.isObject(obj[prop]) || !_.isObject(source[prop])){
		            throw 'Error: Trying to combine an object with a non-object (' + prop + ')';
		          } else {
		            obj[prop] = _.merge(obj[prop], source[prop]);
		          }
		        } else {
		          obj[prop] = source[prop];
		        }
		      }

		    }

		  });
		  
		  return obj;
		}
	}
});


// Sherpa GLOBALS:
//______________________________________________________________________________________
var SHERPA = {};
SHERPA.ENABLE_COUNTER = true; //has to set to true until the core config sets it otherwise.
Sherpa.viewModel = {}

// in case there are no overrides in the calling html
if(typeof(SHERPA_CONFIG_OVERRIDES)==="undefined"){
	var SHERPA_CONFIG_OVERRIDES = {};
}


/*
	The Sherpa.viewModel holds the context for the entire application/page. It has to be declared 
	here since all the sherpa core js files use it to store information.

	TODO: Since we have converted to angular this might need to be inside respective controllers.
	We need to evaluate if we want to keep one global viewModel for all views and how that really 
	affects angular's model.

*/


// GLOBAL Counter function for troubleshooting bottlenecks:
//______________________________________________________________________________________

Sherpa.counter = function (marker) {
	if(SHERPA.ENABLE_COUNTER || marker == "Sherpa INIT") {
		if(marker == "report") {
			var report = "--------------------------------------------------------------\nSherpa Counter Report\n--------------------------------------------------------------\n";
			_.each( _.keys(Sherpa.counter.obj.time_log), function(entry){
				if(Sherpa.counter.obj.time_log[entry].elapsed_time) {
					report += entry+": "+Sherpa.counter.obj.time_log[entry].elapsed_time/1000 +" seconds\n";
					report += "--------------------------------------------------------------\n";		
				}
			})
			console.log(report);
		} else {
			if(!Sherpa.counter.obj) {
				var obj = {
					count: 0,
					start_time: (new Date).getTime(),
					time_log: {},
					last_time: 0
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
		    	console.log(obj.count + ": "+marker + " - time: " + (obj.last_time - obj.start_time )/1000 + " seconds");
		    } else if (marker) {
		    	obj.time_log[marker].elapsed_time = obj.last_time - obj.time_log[marker].start;
		    	console.log(obj.count + ": "+marker + " - elapsed time: " + obj.time_log[marker].elapsed_time /1000 + " seconds");
		    } else {
			    console.log(obj.count + ": elapsed/total time:" + obj.elapsed_time + "/"  + obj.last_time);
		    }
		    Sherpa.counter.obj = obj;
		    return obj.new_time;
		}
		
	}
}
// initiate counter to start login of entire app
Sherpa.counter("Sherpa INIT");


//Set up Init variables, functions and load configuration file
//______________________________________________________________________________________

Sherpa.init = {
	getCoreConfig:{}, 
	getOverrideConfig:{}, 
	errorCount:0,
	config_filename:"",
	core_name: "_sherpa/",
	admin_console_path: "_sherpa/admin/",
	default_config_filename:'_sherpa/config/core-config.json',
	web_root_path: function(path){
		var filename = path.split("/")[path.split("/").length-1];
		if(filename){
			return path.replace(filename,"")
		} else {
			return path;
		}
	}(location.pathname),
	core_path : '',
	errorMsg: function(msg,title) {
	    var frag = document.createDocumentFragment(),
	        temp = document.createElement('div');
	    if(!title) {title = "Fatal Sherpa Error"}
	    temp.innerHTML = Sherpa.init.errorHTML({TITLE:title,MESSAGE:msg});
	    while (temp.firstChild) {
	        frag.appendChild(temp.firstChild);
	    }
	    if(document.body) {
	    	document.body.insertBefore(frag, document.body.childNodes[0]);
	    } else {
		    window.onload = function(){ 
			    document.body.insertBefore(frag, document.body.childNodes[0]);
			};	    	
	    }
	    $('#sherpa-error .close').click(function(){
	    	Sherpa.init.errorMsgDismiss();
	    })
		return false;
	},
	errorMsgDismiss: function() {
		$('#sherpa-error').remove();
	}
}
//TODO need to put QA into sherpa utils so that it doesn't have to be loaded separately. this is temporary so that utils doesn't fail
Sherpa.QA = {
	check:function(){},
	logEntry:function(){}
}

//Sherpa Fatal Error message template
//______________________________________________________________________________________
Sherpa.init.errorHTML=_.template("<div id=\"sherpa-error\"><style>body{opacity:1}</style><div style=\"opacity: 0.5; background:#000; height: 1814px; width: 1903px; position: fixed; left: 0px; top: 0px; z-index: 1001;\"><\/div><div style=\"position: relative; z-index: 1002; width:100%; max-width: 420px; margin:20px auto 1000px;\"><div tabindex=\"-1\" style=\"height: 100%; outline: 0px; width: 100%; overflow: visible;\"><div id=\"errorMsg\" style=\"display: block;font-family: 'Trebuchet MS', Verdana, Arial;  font-size: 16px;  text-align: left;\"><div style=\"height: 30px;  width: 100%;background: #B90000;  color: #fff;  font-size: 1.1em;  font-weight: bold;  line-height: 30px;\"><span style=\"padding-left: 10px;\"><%- TITLE %><span class=\"close\" style=\"float:right;color:#fff;opacity:1;padding:5px\">X</span><\/span><\/div><div id=\"errorMsg\" style=\"    color: #333;  background:#fff; margin: 0;  padding: 12px 4px 12px 8px;  font-size: 1em;\"><%- MESSAGE %><\/div><\/div><\/div><\/div></div>")


//checking to see if prototype file is inside the core_path
//______________________________________________________________________________________

if(location.pathname.match(Sherpa.init.core_name) && !location.pathname.match(Sherpa.init.admin_console_path)){
	var msg = "Please do not put any of your prototype files inside the \""+Sherpa.init.core_name.replace(/\//,"")+"\" folder."
	Sherpa.init.errorMsg(msg);
} else {
	if(location.pathname.match(Sherpa.init.admin_console_path)) {
		Sherpa.init.config_filename = Sherpa.init.default_config_filename.replace(Sherpa.init.core_name,"../");
	} else {
		//assume that prototype file is in the project root directory
		Sherpa.init.config_filename = Sherpa.init.default_config_filename;		
	}

}

//Set up AJAX functions to consume configuration file
//______________________________________________________________________________________
if (window.XMLHttpRequest) {
	// code for IE7+, Firefox, Chrome, Opera, Safari
	Sherpa.init.getCoreConfig=new XMLHttpRequest();
	//get override file that will be merged with core configurations
	if(SHERPA_CONFIG_OVERRIDES){
		Sherpa.init.getOverrideConfig=new XMLHttpRequest();
	}
} else {
	// code for IE6, IE5
	Sherpa.init.getCoreConfig=new ActiveXObject("Microsoft.XMLHTTP");
	//get override file that will be merged with core configurations
	if(SHERPA_CONFIG_OVERRIDES){
		Sherpa.init.getOverrideConfig=new ActiveXObject("Microsoft.XMLHTTP");
	}
}


//Load the GLOBAL Sherpa Configuration file:
//______________________________________________________________________________________

Sherpa.init.getCoreConfig.onreadystatechange=function() {
	if (Sherpa.init.getCoreConfig.readyState==4) {
		if(Sherpa.init.getCoreConfig.status==200) {
			try {
				SHERPA = JSON.parse(Sherpa.init.getCoreConfig.responseText);
				SHERPA.GLOBAL_CONFIG = Sherpa.init.config_filename;
				SHERPA.PATH_WEBROOT = Sherpa.init.web_root_path;
				SHERPA.PATH_CORE = Sherpa.init.core_path+Sherpa.init.core_name;
				SHERPA.CONFIG_OVERRIDES = SHERPA_CONFIG_OVERRIDES.GLOBAL_CONFIG;
			} catch (err) {
				Sherpa.init.errorMsg("The configuration file you specified "+SHERPA.GLOBAL_CONFIG+" has an error.");
			}
			if(SHERPA_CONFIG_OVERRIDES.GLOBAL_CONFIG) {
				Sherpa.init.getOverrideConfig.open("GET",SHERPA_CONFIG_OVERRIDES.GLOBAL_CONFIG,true);
				Sherpa.init.getOverrideConfig.send();
			} else {
				Sherpa.init.resetPaths(Sherpa,SHERPA,SHERPA_CONFIG_OVERRIDES,console);
			}
		} 
		if (Sherpa.init.getCoreConfig.status==404) {
			if(Sherpa.init.errorCount < 3) {
				Sherpa.init.errorCount++;
				//step back one directory to find config file
				Sherpa.init.core_path += '../';
				Sherpa.init.config_filename = Sherpa.init.core_path+Sherpa.init.default_config_filename;	
				Sherpa.init.getCoreConfig.open("GET",Sherpa.init.config_filename,true);
				Sherpa.init.getCoreConfig.send();
			} else {
				Sherpa.init.errorMsg(Sherpa.init.core_name+"/config/core_config.json was not found - please make sure you have"+Sherpa.init.core_name.replace(/\//,"")+" folder in your project folder.");
			}
		}
	}
}
Sherpa.init.getCoreConfig.open("GET",Sherpa.init.config_filename,true);
Sherpa.init.getCoreConfig.send();

Sherpa.init.getOverrideConfig.onreadystatechange=function() {
	if (Sherpa.init.getOverrideConfig.readyState==4) {
		if(Sherpa.init.getOverrideConfig.status==200) {
			try {
				SHERPA_CONFIG_OVERRIDES = JSON.parse(Sherpa.init.getOverrideConfig.responseText);
				Sherpa.init.resetPaths(Sherpa,SHERPA,SHERPA_CONFIG_OVERRIDES,console);
			} catch (err) {
				Sherpa.init.errorMsg("The configuration file you specified "+SHERPA_CONFIG_OVERRIDES.GLOBAL_CONFIG+" has an error.");
			}
		} 
		if (Sherpa.init.getOverrideConfig.status==404) {
			Sherpa.init.errorMsg("The configuration file you specified "+SHERPA_CONFIG_OVERRIDES.GLOBAL_CONFIG+" was not found - please make sure it is in place.");
		}
	}
}


// Merge config with overrides and setup all paths
//______________________________________________________________________________________
Sherpa.init.resetPaths = function(Sherpa,SHERPA,SHERPA_CONFIG_OVERRIDES,console){

	try{

		_.merge(SHERPA, SHERPA_CONFIG_OVERRIDES);

	} catch (err) {
		Sherpa.init.errorMsg("Something is wrong with your configurations override file: "+err);
	}

	//Prototype related paths
	SHERPA.PATH_PROTO_ASSETS = SHERPA.PATH_WEBROOT+SHERPA.PATH_PROTO_ASSETS;
	SHERPA.PATH_PROTO_DOCUMENTATION = SHERPA.PATH_PROTO_ASSETS+SHERPA.PATH_PROTO_DOCUMENTATION;
	SHERPA.PATH_PROTO_JS = SHERPA.PATH_PROTO_ASSETS+SHERPA.PATH_PROTO_JS;
	SHERPA.PATH_PROTO_CSS = SHERPA.PATH_PROTO_ASSETS+SHERPA.PATH_PROTO_CSS;

	//Sherpa core related paths
	SHERPA.PATH_CORE_JS = SHERPA.PATH_CORE+SHERPA.PATH_CORE_JS;
	SHERPA.PATH_CORE_COMPONENTS = SHERPA.PATH_CORE+SHERPA.PATH_CORE_COMPONENTS;
	SHERPA.PATH_CORE_BIN = SHERPA.PATH_CORE+SHERPA.PATH_CORE_BIN;
	SHERPA.PATH_CORE_CSS = SHERPA.PATH_CORE+SHERPA.PATH_CORE_CSS;
	SHERPA.PATH_CORE_CSS_THEME = SHERPA.PATH_CORE+SHERPA.PATH_CORE_CSS_THEME;



	//Change css theme filename
	//TODO add LESS option from core config
	SHERPA.LIB_CSS.css_theme.local = SHERPA.CSS_THEME_DEFAULT+".css";
	if(SHERPA.CSS_THEME_DEFAULT_REMOTE_URL){
		SHERPA.LIB_CSS.css_theme.cdn = SHERPA.CSS_THEME_DEFAULT_REMOTE_URL;
	}
	var undefinedError = JSON.stringify(SHERPA,null,1).match(/".*": ".*?undefined/g)
	if(undefinedError) {
		var errorMsg = "You have some undeclared variables in your configuration file: <ul>"
		for (var i = undefinedError.length - 1; i >= 0; i--) {
			errorMsg += "<li>"+undefinedError[i]+"</li>"
		};
		errorMsg += "</ul>";
		Sherpa.init.errorMsg(errorMsg);
	}

	try {
		//Set up Sherpa version information
		Sherpa.version = SHERPA.VERSION;
		Sherpa.version.summary = SHERPA.VERSION.prodName+" v"+SHERPA.VERSION.major+SHERPA.VERSION.minor+" - "+SHERPA.VERSION.releaseDate+" - ("+SHERPA.VERSION.codeName+")";
	} catch (err) {
		//TODO: if missing try to grab from server
		Sherpa.init.errorMsg("Sherpa Version information missing in: <br/><strong>"+SHERPA.GLOBAL_CONFIG+"</strong><br/><br/>"+err);
	}
	//Load default values in the Sherpa.viewModel
	Sherpa.viewModel.default_values = SHERPA.default_values;
	if(Sherpa.viewModel.default_values === undefined) {
		//TODO: if missing try to grab from server
		Sherpa.init.errorMsg("Sherpa default values missing in: <br/><strong>"+SHERPA.GLOBAL_CONFIG+"</strong><br/><br/>");
	}

	//Initiate Sherpa
	Sherpa.init.start(Sherpa,SHERPA,console);
}

// Main Sherpa JS boot up
//______________________________________________________________________________________

Sherpa.init.start = function(Sherpa,SHERPA,console){

	if(SHERPA.RUN_AS_LOCAL) {
		Sherpa.js({sherpautils: SHERPA.PATH_CORE_JS+SHERPA.LIB_JS["sherpautils"]["local"]});
		Sherpa.counter("Sherpa Utilities");
	} else {
		Sherpa.js({sherpautils: SHERPA.PATH_CORE_JS+SHERPA.LIB_JS["sherpautils"]["cdn"]});
		Sherpa.counter("Sherpa Utilities");
	}

	Sherpa.ready("sherpautils", function(){
		//Stop Sherpa Utils counter
		Sherpa.counter("Sherpa Utilities");

		// load all core CSS libraries
		//TODO add LESS option from core config

		_.each(SHERPA.LOAD_CSS_CORE, function(libName){
			Sherpa.loadCoreCSS(libName);
			Sherpa.counter("Loading CSS library: "+libName);
		});

		//load Gridset
		//TODO Need to figure out how to incorporate this into our core overrides instead of loading it separately

		if(Sherpa.browser.ie) {
			if(Sherpa.browser.ie9 || Sherpa.browser.ie10) {
				Sherpa.loadCoreCSS(SHERPA.LOAD_CSS_GRID_IE9);
			} else {
				Sherpa.loadCoreCSS(SHERPA.LOAD_CSS_GRID_IELT8);
			}
		} else {
			Sherpa.loadCoreCSS(SHERPA.LOAD_CSS_GRID);
		}

		// load all core JS libraries
		_.each(SHERPA.LOAD_JS_CORE, function(libName){
			Sherpa.loadCoreJS(libName);
		});


		//load angular i18N library and modules
		Sherpa.ready("angular", function(){
			Sherpa.counter("Loading JS: angular");
			_.each(SHERPA.LOAD_ANGULAR_MODULES, function(libName){
				Sherpa.loadCoreJS(libName);
			});
			//TODO: Right now all this is worth is for angular. Need to figure out hoe to intergrate use of this with msg directive 
			Sherpa.loadI18NJS();
		});

		Sherpa.ready("angular-i18n", function(){
			// load all core Sherpa libraries
			Sherpa.counter("Loading JS: angular-i18n");
			_.each(SHERPA.LOAD_JS_SHERPA, function(libName){
				Sherpa.loadCoreJS(libName);
			});
		});


		Sherpa.ready(_.last(SHERPA.LOAD_JS_SHERPA), function(){
			//make project info available
			Sherpa.projectInfoInit();
			
			// load prototype js and css
			Sherpa.loadJS(SHERPA.PROTO_JS,"prototype_app");
			Sherpa.loadCSS(SHERPA.PROTO_CSS);

			Sherpa.ready("prototype_app", function(){
				Sherpa.session.storeCleanUp();

				//Init Angular Page Compile

				Sherpa.counter("Compiling page with Angular");
				angular.bootstrap(document, ['sherpaApp']);

				Sherpa.counter("Sherpa INIT");
				Sherpa.counter("report");

			});

		});
		
	});
} // end Sherpa.init.start