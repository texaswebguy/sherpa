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




Sherpa.counter("Sherpa Global Events");