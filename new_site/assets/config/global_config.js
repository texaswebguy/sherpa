
// Sherpa Configuration
/*______________________________________________________________________________________

    WARNING: You should not touch this file unless you know what you are doing!

//______________________________________________________________________________________*/

var SHERPA = {};

SHERPA.RUN_AS_LOCAL = true; //set to false if you want this prototype to refer to Sherpa site
/* 
 * By default, prototypes run as local.  This means that all files associated with the prototypes 
 * are local and the prototype should be able to run locally without any internet connection.  
 * This is important for the purpose of creating a prototype that is highly portable and requires 
 * nothing but unziping a file to properly run even if not connected to the Internet. Doing a 
 * usability test in China will make you appreciate this feature.
 * 
 * When you set the prototype to "run from remote" it means that core references such as javascript 
 * and css files will be directed to whatever location is configured as the remote path. This does 
 * not mean you are running it on a remote server, it means that it is using resources from the 
 * remote server. Your copy of the prototype in a remote server can actually be configured to run 
 * locally and that's perfectly ok. This feature is useful if you want to keep common resources 
 * in one location so that your entire team uses the same resources.
*/

// Should not be changed, these are core dependencies
SHERPA.UNDERSCORE = "assets/sherpa/lib/underscore-min.js";

// JS PATH Configuration;
SHERPA.REMOTE_PATH = "https://rawgithub.com/DellGDC/sherpa/master/";
SHERPA.LOCAL_PATH = "";
SHERPA.JS_PATH = "assets/js/";
SHERPA.JS_LIB_PATH = "assets/sherpa/lib/";
SHERPA.CORE_PATH = "assets/sherpa/";
SHERPA.COMPONENTS_PATH = "components/";


// i18n Configuration
SHERPA.DEFAULT_LOCALE = "en";

// Configuration of framework informational functions
SHERPA.DISABLE_CONSOLE_MESSAGES = false; //disables console message like console.log
SHERPA.ENABLE_COUNTER = true; //enables hot key for showing grid overlay
SHERPA.ENABLE_GRIDSET_OVERLAY = true; //enables hot key for showing grid overlay
SHERPA.ENABLE_NOTES = false; //enables hot key for showing sherpa notes
SHERPA.ENABLE_PROTOTYPE_QA = false; //enables script to check html for sherpa errors

// CSS Configuration
SHERPA.CSS_CORE_REMOTE_PATH = "https://rawgithub.com/DellGDC/sherpa/master/assets/css/";
SHERPA.CSS_CORE_LOCAL_PATH = "assets/sherpa/css/";
SHERPA.CSS_REMOTE_PATH = "https://rawgithub.com/DellGDC/sherpa/master/assets/css/";
SHERPA.CSS_LOCAL_PATH = "assets/css/";

// GLOBAL Sherpa Computed Globals:
//______________________________________________________________________________________
// DO NOT EVER TOUCH!!!

if(SHERPA.RUN_AS_LOCAL) {
	SHERPA.JS_LIB_PATH = SHERPA.LOCAL_PATH+SHERPA.JS_LIB_PATH;
	SHERPA.JS_PATH = SHERPA.LOCAL_PATH+SHERPA.JS_PATH;
	SHERPA.CSS_CORE_PATH = SHERPA.CSS_CORE_LOCAL_PATH;
	SHERPA.CSS_PATH = SHERPA.CSS_LOCAL_PATH;
} else {
	SHERPA.JS_LIB_PATH = SHERPA.REMOTE_PATH+SHERPA.JS_LIB_PATH;
	SHERPA.JS_PATH = SHERPA.REMOTE_PATH+SHERPA.JS_PATH;
	SHERPA.CSS_CORE_PATH = SHERPA.CSS_CORE_REMOTE_PATH;
	SHERPA.CSS_PATH = SHERPA.CSS_REMOTE_PATH;
}



// JS Files
//______________________________________________________________________________________

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
	{ bootstrap: SHERPA.JS_LIB_PATH+"bootstrap-min.js"},,
	{ waypoints: "assets/sherpa/lib/waypoints.min.js"},
	{ waypointsSticky: "assets/sherpa/lib/waypoints-sticky.min.js"},
	{ dateFormat: SHERPA.JS_LIB_PATH+"date-format.js"}
]

SHERPA.PROTOTYPE_APP = "app.js";

// CSS Files
//______________________________________________________________________________________

SHERPA.CSS_CORE_LOAD = [
	{ bootstrap: SHERPA.CSS_CORE_PATH+"bootstrap.css" },
	{ sherpa_overides: SHERPA.CSS_CORE_PATH+"sherpa_override.css" }
];
SHERPA.CSS_GRID = SHERPA.CSS_CORE_PATH+"grid/gridset.css";
SHERPA.CSS_GRID_IE9 = SHERPA.CSS_CORE_PATH+"grid/gridset-ie-9.cssgridset.css";
SHERPA.CSS_GRID_LTIE9 = SHERPA.CSS_CORE_PATH+"grid/gridset-ie-lte8.css";
SHERPA.CSS_LOCAL_APP = SHERPA.CSS_PATH+"doc.css";


SHERPA.IE_JS_LOAD = [
	{ html5printshiv: SHERPA.JS_LIB_PATH+"html5shiv-printshiv.js"},
	{ html5Formshim: SHERPA.JS_LIB_PATH+"jquery.html5form.js"}
];

SHERPA.SHERPA_CORE_LOAD = [
	{ sherpaEventManager: SHERPA.JS_LIB_PATH+"sherpa-event-manager.js"},
	{ sherpaUtils: SHERPA.JS_LIB_PATH+"sherpa-utils.js"},
	{ sherpai18n: SHERPA.JS_LIB_PATH+"sherpa-i18n.js"},
	{ sherpaPseudoAuth: SHERPA.JS_LIB_PATH+"sherpa-pseudo-auth.js"},
	{ sherpaCustomWidgets: SHERPA.JS_LIB_PATH+"sherpa-custom-widgets.js"},
	{ sherpaGlobalEvents: SHERPA.JS_LIB_PATH+"sherpa-global-events.js"}
];

SHERPA.PROTOTYPE_QA_JS = SHERPA.JS_LIB_PATH+"sherpa-prototype-qa.js";

