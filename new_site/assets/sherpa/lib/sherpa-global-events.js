counter("Sherpa Global Events");
//sherpa-global-events

$(window).resize(function() {
	check_ff();
});

$(document).ready(function() {
	check_ff();
});

function check_ff(){

	var win = {};
	win.w = $(window).width();
	win.isDesktop = win.w > head_conf.screens[1];
	win.isTablet = win.w >= head_conf.screens[0] && win.w<= head_conf.screens[1];
	win.isMobile = win.w < head_conf.screens[0];
	// to compensate that head.ls does not add a tablet class
	if(win.isTablet){
		$('html').addClass('tablet');
		$('html').removeClass('no-tablet');
	} else {
		$('html').removeClass('tablet');
		$('html').addClass('no-tablet');
	}
	viewModel.isDesktop = ko.observable(win.isDesktop)
	viewModel.isTablet = ko.observable(win.isTablet)
	viewModel.isMobile = ko.observable(win.isMobile)
}
if(location.hostname === "localhost") {
	viewModel.localhost = true;
} else {
	viewModel.localhost = false;
}
counter("Sherpa Global Events");