
/*
    Main Page Controller
    This controller provides:

        - all routing and state management for all prototype pages
        - global scope variables




*/

sherpaApp.controller("pageController", function($scope, $state,$http) {   


    if(SHERPA.PROTO_ROUTES) {
        //TODO not sure this is necessary since each page has their own controller
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
        //TODO - automatically insert masthead on every page
    }

    if(SHERPA.PROTO_FOOTER_URL) {
        $scope.footerUrl = SHERPA.PROTO_FOOTER_URL;
        //TODO - automatically insert footer on every page
    }

    //TODO not sure these are necessary
    $scope.version=Sherpa.version;
    $scope.SHERPA = SHERPA;
    $scope.viewModel = Sherpa.viewModel;

    //Automatically insert generic modal

    if(SHERPA.ENABLE_GLOBAL_MODAL){
        $http({method: 'GET', url: SHERPA.PATH_CORE_COMPONENTS+SHERPA.PATH_GLOBAL_MODAL}).
          success(function(data) {
            $('body').append(data);
          }).
          error(function(data, status, headers, config) {
            console.error("bad",status)
          });       
    }

    //Automatically insert admin console

    if(SHERPA.ENABLE_ADMIN_CONSOLE){
        $http({method: 'GET', url: SHERPA.PATH_CORE+"admin/index.html"}).
          success(function(data) {
            $('body').append(data);
          }).
          error(function(data, status, headers, config) {
            console.error("bad",status)
          });       
    }


});




sherpaApp.controller("sherpaAdmin", function($scope, $state, $http) {   

    Sherpa.load(
        {"jsoneditor-css":SHERPA.PATH_CORE+"admin/editor/jsoneditor-min.css"}
    );

    Sherpa.js(
        {"jsoneditor-js":SHERPA.PATH_CORE+"admin/editor/jsoneditor-min.js"},
        {"ace":SHERPA.PATH_CORE+"admin/editor/lib/ace/ace.js"},
        {"mode-json":SHERPA.PATH_CORE+"admin/editor/lib/ace/mode-json.js"},
        {"theme-textmate":SHERPA.PATH_CORE+"admin/editor/lib/ace/theme-textmate.js"},
        {"theme-jsoneditor":SHERPA.PATH_CORE+"admin/editor/lib/ace/theme-jsoneditor.js"},
        {"jsonlint":SHERPA.PATH_CORE+"admin/editor/lib/jsonlint/jsonlint.js"}
    );
    Sherpa.ready("jsonlint", function(){
        Sherpa.editor = {}
        Sherpa.editor.options = {
            mode: 'tree',
            modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
            error: function (err) {
                alert(err.toString());
            }
        };            
    });

    $scope.contentEditor = function(){
        Sherpa.ready("jsonlint", function(){
            Sherpa.request({
                resourceId: "assets", 
                data: {
                    "locale": Sherpa.locale,
                    "directory" : "content",
                    "type" : "messages"
                },
                success: function(responseJSON){
                    var content_json = responseJSON;
                    var content_container = document.getElementById('content-editor');
                    Sherpa.editor.content = new jsoneditor.JSONEditor(content_container, Sherpa.editor.options, content_json);  
                },
                error: function(){
                    console.error("JSON parse error in assets/content/messages_"+Sherpa.locale+".json")
                }
            });
        });        
    }
    $scope.saveContent = function(event){
        var new_content = Sherpa.editor.content.getText();
        post_data = {
            action: "update_file",
            filename_path: SHERPA.PATH_CONTENT_FILE+SHERPA.CONTENT_FILENAME,
            content: new_content
        }  
        amplify.request('sherpa-api', post_data, function (data) {
            try {
                data = JSON.parse(data);
            } catch (err) {
                console.error(data);
            }
            
            if(data.success) {
                //TODO -mcorporate modal
                alert(data.msg)
            } else {
                alert(data.msg)
            }
        });
    }
    $scope.resetContent = function(event){
        $('#content-editor').html("");
        $scope.contentEditor();
    }

    $scope.configEditor = function(){
        Sherpa.ready("jsonlint", function(){
            Sherpa.request({
                resourceId: "get_json", 
                data: {
                    "filename": SHERPA.CONFIG_OVERRIDES
                },
                success: function(responseJSON){
                    var config_json = responseJSON;
                    var config_container = document.getElementById('config-editor');
                    Sherpa.editor.config = new jsoneditor.JSONEditor(config_container, Sherpa.editor.options, config_json);  
                },
                error: function(){
                    console.error("JSON parse error in "+SHERPA.GLOBAL_CONFIG)
                }
            });
        });        
    }

    $scope.xrefEditor = function(){
        Sherpa.ready("jsonlint", function(){
            Sherpa.request({
                resourceId: "assets", 
                data: {
                    "locale": Sherpa.locale,
                    "directory" : "xref",
                    "type" : "resources"
                },
                success: function(responseJSON){
                    var xref_json = responseJSON;
                    var xref_container = document.getElementById('xref-editor');
                    Sherpa.editor.xref = new jsoneditor.JSONEditor(xref_container, Sherpa.editor.options, xref_json);  
                },
                error: function(){
                    console.error("JSON parse error in assets/content/resources_"+Sherpa.locale+".json")
                }
            });
        });        
    }



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

    $scope.editorUrl = SHERPA.PATH_CORE+"admin/editor/index.html";
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

