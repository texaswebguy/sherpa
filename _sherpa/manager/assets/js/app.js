//sherpa manager init


//add manager routing
SHERPA.PROTO_ROUTES["sherpa-manager"] = {
    "id": "sherpa-manager",
    "url": "/sherpa-manager",
    "label": "Sherpa Manager",
    "templateUrl": SHERPA.PATH_CORE+"manager/index.html",
    "view":"page"
}
SHERPA.PROTO_ROUTES["sherpa-editor"] = {
    "id": "sherpa-editor",
    "url": "/sherpa-editor",
    "label": "Sherpa Editor",
    "templateUrl": SHERPA.PATH_CORE+"manager/editor/index.html",
    "view":"page"
}

//JS and CSS
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

Sherpa.manager = {};

Sherpa.request({
    resourceId: "get_json", 
    data: {
        "filename" : SHERPA.PATH_CORE+"manager/assets/content/messages_en.json"
    },
    success: function(responseJSON){
        Sherpa.manager.msg = responseJSON;
    }
});


//Configure global hotkeys
Sherpa.help = {
    entries: [],
    add: function(keycombo,description) {
        if(keycombo,description) {
            var tempObj = {};
            tempObj.keycombo = keycombo;
            tempObj.description = description;
            Sherpa.help.entries.push(tempObj);
        } else {
            Sherpa.init.errorMsg("Failed to add hot key help because keycombo and description were not properly provided. To properly register a hot key combo for the help use: Sherpa.help.add('key combo','Description of function attached to key combo');","Error while adding hot key help.")
        }
    },
    show: function(){
        //TODO put it in a modal
        var alertMsg = "Available Hot Keys:\n\n";
        _.each(Sherpa.help.entries, function(helpMsg){
            alertMsg+=helpMsg.keycombo+
            '\n'+helpMsg.description+
            '\n---------------------------------------------------------------'
        })
        alert(alertMsg);
    }
};


// Enable admin console hotkey
Sherpa.help.add('CTRL SHIFT F1','Redirects browser to Sherpa Admin Console');
Sherpa.key('ctrl+shift+f1', function () { 
    location.href = "#"+SHERPA.PROTO_ROUTES["sherpa-manager"].url;
});

// Enable hotkey help   
Sherpa.key('alt+h', function () { 
    //TODO - use global modal
    Sherpa.help.show();
});

if(SHERPA.ENABLE_CONTENT_EDIT) {
    // Enable editable hotkey
    Sherpa.help.add('CTRL SHIFT F2','Enables editable page');
    Sherpa.key('ctrl+shift+f2', function () { 
        if($('html').hasClass('editable')){
            Sherpa.feature("editable",false);
            Sherpa.store("editable",false);
        } else {
            Sherpa.feature("editable",true);
            Sherpa.store("editable",true);
        }
    });
    //add editable mode badge on page
    Sherpa.request({
        resourceId: "get_component", 
        data: {
            "filename" : "uxmf/editable-badge.html"
        },
        success: function(responseHTML){
            $('body').append(responseHTML);
        }
    });
    //Persist editable state after page reload
    if(Sherpa.store("editable")){
        Sherpa.fire('ctrl+shift+f2');
    }


    // Enable editable hotkey
    Sherpa.help.add('CTRL SHIFT F3','Edit all Texkkeys');
    Sherpa.key('ctrl+shift+f3', function () { 
        location.href = "#"+SHERPA.PROTO_ROUTES["sherpa-editor"].url;
    });

    // Enable content export hotkey
    Sherpa.help.add('CTRL SHIFT F4','Download content file - not working yet');
    Sherpa.key('ctrl+shift+f4', function () { 
        var post = {
            path: SHERPA.PATH_CONTENT_FILE,
            filename: SHERPA.CONTENT_FILENAME,
            content: Sherpa.viewModel.content,
            action:"export_content"
        }

        amplify.request('export_content', post, function (data) {
            if(data != 0) {
                alert("Export content failed: ",data)
            }
        })
        
    });

    //TODO - need to move this to a directive
    Sherpa.scope("*", function(){

        //TODO need to add a markdown checkbox to edit-controls. This would have to delete a non-markdown textkey if converted.

        this.listen('.editing a', 'click', function(event){
                event.preventDefault();
                event.stopPropagation();                    
        });
        this.listen('.editable', 'click', function(event){
            if(!$(event.currentTarget).hasClass('editing') && $('html').hasClass('editable')){
                event.preventDefault();
                event.stopPropagation();

                _.each($('.editing'),function(editing){
                    var textkey = $(editing).attr('data-textkey'),
                        markdownFilename = $(editing).attr('data-filename'),
                        contentContainer = $(editing),
                        controls = contentContainer.next(),
                        id = $(editing).attr('data-orig-html-id'),
                        originalText = _.unescape(Sherpa.session.store(id));
                    controls.remove();
                    contentContainer.removeClass("editing");
                    contentContainer.html(originalText);
                    contentContainer.removeAttr('contenteditable');
                    contentContainer.removeAttr('data-orig-html-id');
                })

                var textkey = $(event.currentTarget).attr('data-textkey'),
                    markdownFilename = $(event.currentTarget).attr('data-filename'),
                    isMarkdownTextkey = (function() {
                        //console.log(textkey)
                        if(textkey){
                            if(textkey.match("_markdown")) {
                                return "checked";
                            } else {
                                return "";
                            }                                   
                        }
                    })(),
                    editControls = '<div class="edit-controls"><label for="is-markdown"><input type="checkbox" id="is-markdown" class="is-markdown" '+isMarkdownTextkey+'/> Markdown</label><button class="btn btn-mini cancel">Cancel</button>&nbsp;<button class="btn btn-mini btn-secondary save">Save</button></div>',
                    contentContainer = $(event.currentTarget),
                    id = Sherpa.uuid();
                    //TODO make editControls into component as template
                Sherpa.session.store(id,_.escape($(event.currentTarget).html()));
                contentContainer.attr('data-orig-html-id',id);
                if(markdownFilename) {
                    Sherpa.request({
                        resourceId: "get_md", 
                        data: {
                            "filename" : markdownFilename
                        },
                        success: function(responseMD){
                            contentContainer.html('<pre>'+responseMD.replace(/</g,'&lt;')+'</pre>');
                        }
                    });
                } else {
                    contentContainer.html('<pre>'+Sherpa.viewModel.content[textkey]+'</pre>');
                }
                contentContainer.attr('contenteditable',true);
                contentContainer.after(editControls);
                contentContainer.addClass("editing");
            }
        });
        this.listen('.edit-controls .cancel', 'click', function(event){
            event.preventDefault();
            event.stopPropagation();

            var textkey = $(event.currentTarget).parent().prev().attr('data-textkey'),
                markdownFilename = $(event.currentTarget).parent().prev().attr('data-filename'),
                id = $(event.currentTarget).parent().prev().attr('data-orig-html-id'),
                originalText = _.unescape(Sherpa.session.store(id)),
                controls = $(event.currentTarget).parent(),
                contentContainer;

                if(markdownFilename){
                    contentContainer = $('[data-filename="'+markdownFilename+'"]');
                } else {
                    contentContainer = $('[data-textkey="'+textkey+'"]');
                }

            controls.remove();

            contentContainer.removeClass("editing");
            contentContainer.html(originalText);
            contentContainer.removeAttr('contenteditable');
            contentContainer.removeAttr('data-orig-html-id');
        });         
        this.listen('.edit-controls .save', 'click', function(event){
            event.preventDefault();
            event.stopPropagation();

            var textkey = $(event.currentTarget).parent().prev().attr('data-textkey'),
                wasMarkdownTextkey = (function() {
                    //console.log(textkey)
                    if(textkey){
                        return !_.isEmpty(textkey.match(/_markdown/));                                  
                    }
                })(),
                isMarkdownTextkey = (function() {
                    //console.log(textkey)
                    if(textkey){
                        return $(event.currentTarget).parent().find('.is-markdown').is(':checked');                                 
                    }
                })(),
                t_data = $(event.currentTarget).parent().prev().attr('data-msgdata'),
                markdownFilename = $(event.currentTarget).parent().prev().attr('data-filename'),
                controls = $(event.currentTarget).parent(),
                contentContainer,
                post_data = {},
                newContent,
                newMarkdown;
            
            controls.remove();

            if(markdownFilename){
                contentContainer = $('[data-filename="'+markdownFilename+'"].editing');
                newMarkdown = contentContainer.find('pre').text();
                var convertMD = new Sherpa.converter();
                newContent = convertMD.makeHtml(newMarkdown);
                contentContainer.removeClass("editing");
                contentContainer.removeAttr('contenteditable',true);
                post_data = {
                    action: "update_file",
                    filename_path: SHERPA.PATH_CORE_BIN.replace(/_sherpa|bin/g, "..")+markdownFilename,
                    content: newMarkdown
                }
            } else {
                //is a textkey
                if(t_data) {
                    if(t_data.match(/[A-z]/g)) {
                        //data is non numeric
                        if(_.isArray(t_data)) {
                            //make sure to convert any numeric elements
                            _.each(t_data, function(data) {
                                var tempArray = [];
                                if(data.match(/[A-z]/g)){
                                    tempArray.push(parseFloat(data));
                                } else {
                                    tempArray.push(data);
                                }
                            });
                        }
                    }
                } else if(_.isArray(t_data)) {
                    //data is an array
                    var tempArray = [];
                    _.each(t_data, function(data){
                        tempArray.push(parseFloat(data));
                    });
                    t_data = tempArray;
                }
                //TODO need to determin if taxtkey has been converted to markdown


                contentContainer = $('[data-textkey="'+textkey+'"].editing');

                //console.log("textkey",textkey,"new content",contentContainer.text())
                if(wasMarkdownTextkey != isMarkdownTextkey) {
                    if(wasMarkdownTextkey) {
                        //convert from markdown to regular
                        console.log("convert to regular")
                        delete Sherpa.viewModel.content[textkey];
                        Sherpa.viewModel.content[textkey.replace("_markdown","")] = contentContainer.text();
                        textkey = textkey.replace("_markdown","");
                    } else {
                        //convert to markdown
                        console.log("convert to markdown")
                        Sherpa.viewModel.content[textkey+"_markdown"] = contentContainer.text();
                        delete Sherpa.viewModel.content[textkey];
                        textkey = textkey+"_markdown";
                    }
                }
                Sherpa.viewModel.content[textkey] = contentContainer.text();
                if(_.isUndefined(t_data)){ var t_data = null};
                contentContainer.removeAttr('contenteditable');
                contentContainer.removeAttr('data-orig-html-id');
                contentContainer = $('[data-textkey="'+textkey+'"]');
                post_data = {
                    action: "update_textkey",
                    textkey: textkey,
                    filename_path: SHERPA.PATH_CONTENT_FILE+SHERPA.CONTENT_FILENAME,
                    content: Sherpa.viewModel.content[textkey]
                }
            }

            amplify.request('sherpa-api', post_data, function (data) {
                try {
                    data = JSON.parse(data);
                } catch (err) {
                    Sherpa.publish("modal", {
                      title:'We are sorry!',
                      title_description:'Something went wrong with updating the content.',
                      body: data
                    })      
                }
                
                if(data.success) {
                    //TODO right now we replace DOM with new content - need to do all this action inside angular directive
                    if(markdownFilename){
                        contentContainer.html(newContent);
                    } else {
                        contentContainer.parent().html(Sherpa.msg(textkey.replace("_markdown",""),t_data));                         
                    }
                    Sherpa.publish("modal", {
                      title:'Content was successfully updated',
                      body: data.msg
                    })
                    window.setTimeout(function(){
                        Sherpa.publish( 'modal','hide');
                    },2000);
                } else {
                    Sherpa.publish("modal", {
                      title:'We are sorry!',
                      title_description:'Something went wrong with updating the content.',
                      body: data.msg
                    });                      
                }
            });
        });
        this.listen('.editing', 'blur', function(event){
            window.setTimeout(function(){
                var textkey = $(event.currentTarget).attr('data-textkey'),
                    markdownFilename = $(event.currentTarget).attr('data-filename'),
                    contentContainer = $(event.currentTarget),
                    id = $(event.currentTarget).attr('data-orig-html-id'),
                    originalText = _.unescape(Sherpa.session.store(id)),
                    controls = contentContainer.next();

                if(originalText) {
                    controls.remove();
                    contentContainer.removeClass("editing");
                    contentContainer.html(originalText);
                    contentContainer.removeAttr('contenteditable');
                    contentContainer.removeAttr('data-orig-html-id');
                }
            },200);
        }); 
    });
}


Sherpa.ready("sherpa-directives", function(){
    //manager controllers
    sherpaApp.controller("sherpaManager", function($scope, $state, $http) {   
        $scope.msg = Sherpa.manager.msg;
        $http({method: 'GET', url: SHERPA.PATH_CORE+"manager/assets/api/services.php?action=list_prototypes"}).
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




    sherpaApp.controller("sherpaEditor", function($scope, $state, $http) {   
        $scope.msg = Sherpa.manager.msg;
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
    });
});