Sherpa.counter("Sherpa Global Events");
//sherpa-global-events

Sherpa.globalEvents = {

	checkFormFactor: function(){
		var win = {};
		win.w = $(window).width();
		win.isDesktop = win.w > head_conf.screens[1];
		win.isTablet = win.w >= head_conf.screens[0] && win.w<= head_conf.screens[1];
		win.isMobile = win.w < head_conf.screens[0];
		viewModel.isDesktop = ko.observable(win.isDesktop);
		viewModel.isTablet = ko.observable(win.isTablet);
		viewModel.isMobile = ko.observable(win.isMobile);
		Sherpa.feature("desktop", viewModel.isDesktop);
		Sherpa.feature("tablet", viewModel.isTablet);
		Sherpa.feature("mobile", viewModel.isMobile);
	},
	checkLocalHost: function(){
		if(location.hostname === "localhost") {
			viewModel.localhost = true;
		} else {
			viewModel.localhost = false;
		}
		Sherpa.feature("localhost", viewModel.localhost);
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
	  	 		label: _.str.humanize(id)
	  	 	}
	  	 	breadcrumbs.push(temp_obj);
	  	 })
	  	 return breadcrumbs;
	  } else {
	  	$('html').attr('id',"home");
	  	return ["{id:'home',label_textkey:'text_breadcrumb_home',label:'Home'}"];
	  }
	},
	updateAside: function(){

		//$('aside .nav.affix').removeClass('affix');
		/* TODO: need to abstrack waypoints sticky to overtake data-spy="scroll" bootstrap selectors
		The version of waypoints sticky loaded provides a call back function which is critical in hard setting the width of the affix element
		*/
		$("aside .nav.affix li a").css('width','inherit');
		if(viewModel.isDesktop()){
			$('aside .nav.affix').css('width',Sherpa.globalEvents.aside_config().width);
			$("aside .nav li.active a .icon-ui-triangleleft").css('top',($("aside .nav li.active a").height()/2)-($("aside .nav li.active .icon-ui-triangleleft").height()/2)+5);
		}
		$.waypoints('refresh');
		
	},
	setupAside: function(){
		$('aside .nav:visible').waypoint('sticky', {
		  stuckClass: 'affix',
		  offset: Sherpa.globalEvents.aside_config().offset,
		  complete: function(){
			if(!viewModel.isDesktop()) {
				$("aside .nav.affix li.active a").css('width','100%');
			} else {
				$("aside .nav.affix:visible").css('width',Sherpa.globalEvents.aside_config().width);
			}
		  	
		  	$(".sticky-wrapper").height("inherit");
		  }
		});
		//TODO need all this functionality to be generic so that it works on all prototypes
		$('article').waypoint(function(direction) {
			if(direction=="down") {
				$('aside .nav li.active').removeClass('active');
				var id = '#'+$(this).attr('id');
				$('aside .nav li a[href='+id+']').parent().addClass('active');
			}
		}, { offset: Sherpa.globalEvents.aside_config().down_offset });



		$('article').waypoint(function(direction) {
			if(direction=="up") {
				$('aside .nav li.active').removeClass('active');
				var id = '#'+$(this).attr('id');
				$('aside .nav li a[href='+id+']').parent().addClass('active');
			}
		}, { 
			offset: function() { 
				return -$(this).height()+Sherpa.globalEvents.aside_config().up_offset;
			}
		});



		$(window).resize(function() {
			if(viewModel.isDesktop()){
				$('#menu').show(); //TODO not sure what this is
			} 
			Sherpa.globalEvents.updateAside();
		});

		Sherpa.globalEvents.updateAside();
		if($('aside .nav:visible li.active').length == 0) {
			$('aside .nav:visible li:first-child').addClass('active');
		}

	},
	aside_config:function(){
		var temp_obj = {};
		temp_obj.offset = 70;
		temp_obj.scrollto = {offset:{top:-60}}
		temp_obj.down_offset = 80;
		temp_obj.up_offset = 100;
		if($('aside').hasClass('da1-da3')) {
			temp_obj.width = $('.da1-da3:visible').width();
		}
		if($('aside').hasClass('da1-da4')) {
			temp_obj.width = $('.da1-da4:visible').width();
		}


		if(!viewModel.isDesktop()) {
			temp_obj.offset = 50;
			temp_obj.scrollto = {offset:{top:-50}}
			temp_obj.down_offset = 600;
			temp_obj.up_offset = 100;
			temp_obj.width = window.innerWidth-50;
		}

		if(viewModel.isMobile()) {
			temp_obj.offset = 50;
			temp_obj.scrollto = {offset:{top:-80}}
			temp_obj.down_offset = 600;
			temp_obj.up_offset = 100;
			temp_obj.width = window.innerWidth-50;
		}


		return temp_obj;
	},
	init: function(){
		Sherpa.globalEvents.checkFormFactor();
		Sherpa.globalEvents.checkLocalHost();
		viewModel.breadcrumb_path = Sherpa.globalEvents.breadcrumb();
		viewModel.page_title_textkey = "title_page_"+_.str.underscored($('html').attr('id'));
		
		Sherpa.globalEvents.checkFormFactor();
		

		$(window).resize(function() {
			Sherpa.globalEvents.checkFormFactor();
		});

		Sherpa.scope("*", function(){

			this.listen(".tabbable", "load", function(){
				$('.tabbable .nav li').removeClass('active');
				$('.tabbable .nav li:first').addClass('active');
			});

		});

		$(window).on('hashchange', function() {
			viewModel.breadcrumb_path = Sherpa.globalEvents.breadcrumb();
			viewModel.page_title_textkey = "title_page_"+_.str.underscored($('html').attr('id'));
			console.log("change page")
			window.setTimeout(function(){Sherpa.globalEvents.updateAside();},500);
		});

		Sherpa.scope("aside .nav", function(){
			this.listen("li.active a", "click", function(event){
				event.preventDefault();
				event.stopPropagation();
				$(event.target).parents(".nav").toggleClass('open');
			});
			this.listen('li:not("[class=active]") a', "click", function(event){
				event.preventDefault();
				$.scrollTo($(event.currentTarget).attr('href'),300, Sherpa.globalEvents.aside_config().scrollto); //might have to be different in mobile
				//TODO there is a bug that when you click on the top item it does not scroll high enough.  Might need to create a different event or add a condition.
				//TODO need to make sure there is not an actual page in the second
				var nav_id = "/"+$(event.currentTarget).attr('href').replace('#','');

				if(viewModel.breadcrumb_path.length>2) {
					nav_id = "#!";
					_.each(_.range(1,viewModel.breadcrumb_path.length-1),function(item){
						nav_id += "/"+viewModel.breadcrumb_path[item].id;
					});
					nav_id += "/"+$(event.currentTarget).attr('href').replace('#','');
					location.hash = nav_id;
				} else {
					location.hash = location.hash+nav_id;
				}
				if(!viewModel.isDesktop()){
					$(event.target).parents("aside .nav").toggleClass('open');
				}
				//TODO this is really specific to the Dell 308 look aside... need to figure out how this could be implemente
				$("aside .nav li.active a .icon-ui-triangleleft").css('top',($("aside .nav li.active a").height()/2)-($("aside .nav li.active .icon-ui-triangleleft").height()/2)+5);
			});
		});
		Sherpa.scope(".accordion", function(){
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

		window.setTimeout(function(){Sherpa.globalEvents.setupAside();},300);

	}
}

Sherpa.globalEvents.init();



 

Sherpa.counter("Sherpa Global Events");