Sherpa.counter("Sherpa Global Events");
//sherpa-global-events


check_ff();

$(window).resize(function() {
	check_ff();
});



function check_ff(){

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

}

if(location.hostname === "localhost") {
	viewModel.localhost = true;
} else {
	viewModel.localhost = false;
}

Sherpa.feature("localhost", viewModel.localhost);



Sherpa.scope("*", function(){

	this.listen(".tabbable", "load", function(){
		$('.tabbable .nav li').removeClass('active');
		$('.tabbable .nav li:first').addClass('active');
	});

});

viewModel.breadcrumb_path = breadcrumb();
viewModel.page_title_textkey = "title_page_"+_.str.underscored($('html').attr('id'));

$(window).on('hashchange', function() {
	viewModel.breadcrumb_path = breadcrumb();
	viewModel.page_title_textkey = "title_page_"+_.str.underscored($('html').attr('id'));
});

function breadcrumb(){
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
}

function setUpAside(){

	$('.sherpa-docs-sidenav.affix').removeClass('affix');
	$('.sherpa-docs-sidenav:visible').waypoint('sticky', {
	  stuckClass: 'affix',
	  offset: 70,
	  complete: function(){
	  	$(".sherpa-docs-sidenav.affix:visible").width($('.da1-da3:visible').width());
	  	$(".sticky-wrapper").height("inherit");
	  }
	});
	/* TODO: need to abstrack waypoints sticky to overtake data-spy="scroll" bootstrap selectors
	The version of waypoints sticky loaded provides a call back function which is critical in hard setting the width of the affix element
	*/

	//TODO need all this functionality to be generic so that it works on all prototypes
	$('article').waypoint(function(direction) {
		if(direction=="down") {
			$('.nav.nav-list.sherpa-docs-sidenav li.active').removeClass('active');
			var id = '#'+$(this).attr('id');
			$('.nav.nav-list.sherpa-docs-sidenav li a[href='+id+']').parent().addClass('active');
		}
	}, { offset: 80 });

	$('article').waypoint(function(direction) {
		if(direction=="up") {
			$('.nav.nav-list.sherpa-docs-sidenav li.active').removeClass('active');
			var id = '#'+$(this).attr('id');
			$('.nav.nav-list.sherpa-docs-sidenav li a[href='+id+']').parent().addClass('active');
		}
	}, { 
		offset: function() { 
			return -$(this).height()+100
		}
	});

	$('.sherpa-docs-sidenav.affix').css('width',$('.da1-da3:visible').width());
	//TODO: hack to make up the fact that active class gets stripped - the problem is with scroll-spy
	Sherpa.ready("bootstrap", function(){
		_.each($('.tabbable'), function(tabs){
			$(tabs).find('li:first').addClass('active');
		});
	});
	$('.nav.nav-list.sherpa-docs-sidenav:visible li:first-child').addClass('active');

}

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



 

Sherpa.counter("Sherpa Global Events");