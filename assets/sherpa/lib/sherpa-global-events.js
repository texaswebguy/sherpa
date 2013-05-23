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



Eve.scope("*", function(){

	this.listen(".tabbable", "load", function(){
		$('.tabbable .nav li').removeClass('active');
		$('.tabbable .nav li:first').addClass('active');
	});

});

viewModel.breadcrumb_path = breadcrumb();

$(window).on('hashchange', function() {
	viewModel.breadcrumb_path = breadcrumb();
});

function breadcrumb(){
  if(location.hash.match("#!/")){
  	 var path = location.hash.split("/");
  	 path[0] = "home";
  	 $('html').attr('id',path[path.length-1]);
  	 return path;
  } else {
  	$('html').attr('id',"home");
  	return ["home"];
  }
}

function setUpAside(){

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


Sherpa.counter("Sherpa Global Events");