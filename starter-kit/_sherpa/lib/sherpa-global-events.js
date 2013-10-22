Sherpa.counter("Sherpa Global Events");
//sherpa-global-events

Sherpa.globalEvents = {

	checkFormFactor: function(){
		var win = {};
		win.w = $(window).width();
		Sherpa.viewModel.IsDesktopDevice =  win.w > head_conf.screens[1];
		Sherpa.viewModel.IsTabletDevice = win.w >= head_conf.screens[0] && win.w<= head_conf.screens[1];
		Sherpa.viewModel.IsPhoneDevice = win.w < head_conf.screens[0];
		Sherpa.feature("desktop", Sherpa.viewModel.IsDesktopDevice);
		Sherpa.feature("tablet", Sherpa.viewModel.IsTabletDevice);
		Sherpa.feature("mobile", Sherpa.viewModel.IsPhoneDevice);
	},
	checkLocalHost: function(){
		if(location.hostname === "localhost") {
			Sherpa.viewModel.localhost = true;
		} else {
			Sherpa.viewModel.localhost = false;
		}
		Sherpa.feature("localhost", Sherpa.viewModel.localhost);
	},
	breadcrumb:function(){
	  if(location.hash.match("#!/")){
	  	 var path = location.hash.split("/");
	  	 path[0] = "home";
	  	 $('html').attr('id',path[path.length-1]);
	  	 var breadcrumbs = [];
	  	 _.each(path, function(id){
	  	 	var temp_obj = {
	  	 		id:id,
	  	 		label_textkey:'text_breadcrumb_'+id,
	  	 		label: _.str.humanize(id),
	  	 		href: "#!"+_.pluck(breadcrumbs,"id").slice(1).join("/")+"/"+id
	  	 	}
	  	 	breadcrumbs.push(temp_obj);
	  	 })
	  	 return breadcrumbs;
	  } else {
	  	$('html').attr('id',"home");
	  	return ["{id:'home',label_textkey:'text_breadcrumb_home',label:'Home'}"];
	  }
	},
	init: function(){
		Sherpa.globalEvents.checkFormFactor();
		Sherpa.globalEvents.checkLocalHost();
		Sherpa.viewModel.breadcrumb_path = Sherpa.globalEvents.breadcrumb();
		Sherpa.viewModel.page_title_textkey = "title_page_"+_.str.underscored($('html').attr('id'));
		
		Sherpa.globalEvents.checkFormFactor();
		

		$(window).resize(function() {
			Sherpa.globalEvents.checkFormFactor();
		});


		$(window).on('hashchange', function() {
			//TODO this is not firing on hash change
			Sherpa.viewModel.breadcrumb_path = Sherpa.globalEvents.breadcrumb();
			var new_id = 
			$('html').attr('id',location.hash.replace(/\//g,"-").replace(/#-/,""));
			Sherpa.viewModel.page_title_textkey = "title_page_"+_.str.underscored($('html').attr('id'));
		});

		
/*		Sherpa.scope(".accordion", function(){
			this.listen("[data-toggle=collapse]","click",function(event){
				event.preventDefault();
				event.stopPropagation(); //overrides the default bootstrap action for the accordion version
				//slide up all the link lists
				$(event.currentTarget).parents(".accordion").find("div.collapsible").slideUp('fast');
				$(event.currentTarget).parents(".accordion").find("[data-toggle=collapse]").addClass("collapsed");
				$(event.currentTarget).parents(".accordion").find("div.collapsible").removeClass("in");
				//slide down the link list below the h3 clicked - only if its closed
				if(!$(event.currentTarget).next().is(":visible")) {
					$(event.currentTarget).next().slideDown('fast');
					$(event.currentTarget).next().addClass("in");
					$(event.currentTarget).removeClass("collapsed");
				}
			});
		});
*/

		Sherpa.scope("*", function(){
			//This is a temporary fix to data-toggle=tooltip
			this.listen("[data-toggle=tooltip]", "mouseenter", function(event){
				if(!$(event.currentTarget).attr("data-placement")){
					var pointer_left = $(event.currentTarget).offset().left+30;
					var offset = $(event.currentTarget).next().find(".tooltip-inner").width()/2+10;
					var new_left = pointer_left-offset;
					if(pointer_left-new_left>100) {
						$(event.currentTarget).next().css('left',new_left);
						$(event.currentTarget).next().find(".tooltip-inner").css('left',0);
						$(event.currentTarget).next().find(".tooltip-arrow").css('left',offset);
						console.log(new_left, $(event.currentTarget).next().find(".tooltip-inner").offset().left)
					}			
				}
			});
			this.listen('.scroll', 'click', function(event){
				event.preventDefault();
				var options={offset:{top:0}};
				if($('.nav.affix:visible')) {
					if(Sherpa.viewModel.IsPhoneDevice) {
						//TODO this is not completely right. 
						options.offset.top = -$('.nav.affix:visible').height();
						console.log(options)						
					}
					if(!Sherpa.viewModel.IsPhoneDevice) {
						//desktop and tablet 
						options.offset.top = -20;
					}

				}


				var elem = $(event.currentTarget),targetId;
				if(elem.attr('href')){
					targetId = elem.attr('href');
				} else if (elem.attr('rel')){
					targetId = elem.attr('rel')
				}
				if(targetId){
					$.scrollTo(targetId,300,options);
				}    		
			});
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
			location.href = location.origin+"/"+Sherpa.init.admin_console_path;
		});

		// Enable hotkey help	
		Sherpa.key('alt+h', function () { 
			Sherpa.help.show();
		});

		if(SHERPA.ENABLE_CONTENT_EDIT) {
			// Enable editable hotkey
			Sherpa.help.add('CTRL SHIFT F2','Enables editable page');
			Sherpa.key('ctrl+shift+f2', function () { 
				if($('html').hasClass('editable')){
					Sherpa.feature("editable",false);
				} else {
					Sherpa.feature("editable",true);
				}
			});
			// Enable editable hotkey
			Sherpa.help.add('CTRL SHIFT F3','Edit all Texkkeys');
			Sherpa.key('ctrl+shift+f3', function () { 

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


			Sherpa.scope("*", function(){

				//TODO need to add a markdown checkbox to edit-controls. This would have to delete a non-markdown textkey if converted.

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
		   					isMarkdown = (function() {
		   						console.log(textkey)
		   						if(textkey.match("_markdown")) {
		   							return "checked";
		   						} else {
		   							return "";
		   						}
		   					})(),
		   					editControls = '<div class="edit-controls"><label for="is-markdown"><input type="checkbox" id="is-markdown" class="is-markdown" '+isMarkdown+'/> Markdown</label><button class="btn btn-mini cancel">Cancel</button>&nbsp;<button class="btn btn-mini btn-secondary save">Save</button></div>',
		   					contentContainer = $(event.currentTarget),
		   					id = Sherpa.uuid();
		   				Sherpa.session.store(id,_.escape($(event.currentTarget).html()));
	   					contentContainer.attr('data-orig-html-id',id);
	   					if(markdownFilename) {
   							Sherpa.request({
								resourceId: "get_md", 
								data: {
									"filename" : markdownFilename
								},
								success: function(responseMD){
									contentContainer.html('<pre>'+responseMD+'</pre>');
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
						originallyMarkdown = !_.isEmpty(textkey.match(/_markdown/)),
						isMarkdown = $(event.currentTarget).parent().find('.is-markdown').is(':checked'),
						t_data = $(event.currentTarget).parent().prev().attr('data-msgdata'),
						markdownFilename = $(event.currentTarget).parent().prev().attr('data-filename'),
						controls = $(event.currentTarget).parent(),
						contentContainer,
						post_data = {};
					
					controls.remove();

					if(markdownFilename){
						contentContainer = $('[data-filename="'+markdownFilename+'"].editing');
						newContent = contentContainer.find('pre').text();
						var convertMD = new Sherpa.converter();
						contentContainer.html(convertMD.makeHtml(newContent));
						contentContainer.removeClass("editing");
						post_data = {
							action: "update_file",
							filename_path: SHERPA.PATH_CORE_BIN.replace(/_sherpa|bin/g, "..")+markdownFilename,
							content: newContent
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
						if(originallyMarkdown != isMarkdown) {
							if(originallyMarkdown) {
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
						contentContainer.parent().html(Sherpa.msg(textkey.replace("_markdown",""),t_data));
						post_data = {
							action: "update_textkey",
							textkey: textkey,
							path: SHERPA.PATH_CONTENT_FILE,
							filename_path: SHERPA.CONTENT_FILENAME,
							content: Sherpa.viewModel.content[textkey]
						}
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
				    })


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

//todo insert editor

//<section ng-include="'../../_sherpa/admin/index.html'"></section>

		}



	}
}

Sherpa.globalEvents.init();



 

Sherpa.counter("Sherpa Global Events");