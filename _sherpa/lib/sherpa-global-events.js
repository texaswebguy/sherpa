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
		//TODO need to move most of this this to page controller using angular $location
		Sherpa.globalEvents.checkFormFactor();
		Sherpa.globalEvents.checkLocalHost();
		Sherpa.viewModel.breadcrumb_path = Sherpa.globalEvents.breadcrumb();
		Sherpa.viewModel.page_title_textkey = "title_page_"+_.str.underscored($('html').attr('id'));
		
		Sherpa.globalEvents.checkFormFactor();

		//allows bookmarks of in page anchors 

		var hashQuery = Sherpa.hashQuery();
		if(hashQuery){
			if(hashQuery.section) {
				
				var offset = $('body').attr('data-offset'), options="";
				if(offset) {
					options = {offset:{top:parseInt(offset)+20}}
				}
				window.setTimeout(function(){
					$.scrollTo('#'+hashQuery.section,300);
				},2500)
			};
		}

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
		});
	}
}

Sherpa.globalEvents.init();

Sherpa.counter("Sherpa Global Events");