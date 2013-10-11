Sherpa.counter("Sherpa Global Events");
//sherpa-global-events

Sherpa.globalEvents = {

	checkFormFactor: function(){
		var win = {};
		win.w = $(window).width();
		Sherpa.viewModel.IsMobileDevice =  win.w > head_conf.screens[1];
		Sherpa.viewModel.IsTabletDevice = win.w >= head_conf.screens[0] && win.w<= head_conf.screens[1];
		Sherpa.viewModel.IsPhoneDevice = win.w < head_conf.screens[0];
		Sherpa.feature("desktop", Sherpa.viewModel.isDesktop);
		Sherpa.feature("tablet", Sherpa.viewModel.isTablet);
		Sherpa.feature("mobile", Sherpa.viewModel.isMobile);
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
			Sherpa.viewModel.breadcrumb_path = Sherpa.globalEvents.breadcrumb();
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
				var elem = $(event.currentTarget),targetId;
				if(elem.attr('href')){
					targetId = elem.attr('href');
				} else if (elem.attr('rel')){
					targetId = elem.attr('rel')
				}
				if(targetId){
					$.scrollTo(targetId,300);
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
		Sherpa.help.add('alt+a','Redirects browser to Sherpa Admin Console');
		Sherpa.key('alt+a', function () { 
			location.href = location.origin+"/"+Sherpa.init.admin_console_path;
		});

		// Enable hotkey help	
		Sherpa.key('alt+h', function () { 
			Sherpa.help.show();
		});

	}
}

Sherpa.globalEvents.init();



 

Sherpa.counter("Sherpa Global Events");