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
	// to compensate that head.ls does not add a tablet class
	if(win.isDesktop){
		$('html').addClass('desktop');
		$('html').removeClass('no-desktop');
	} else {
		$('html').removeClass('desktop');
		$('html').addClass('no-desktop');
	}
	if(win.isTablet){
		$('html').addClass('tablet');
		$('html').removeClass('no-tablet');
	} else {
		$('html').removeClass('tablet');
		$('html').addClass('no-tablet');
	}
	if(win.isMobile){
		$('html').addClass('mobile');
		$('html').removeClass('no-mobile');
	} else {
		$('html').removeClass('mobile');
		$('html').addClass('no-mobile');
	}
	viewModel.isDesktop = ko.observable(win.isDesktop);
	viewModel.isTablet = ko.observable(win.isTablet);
	viewModel.isMobile = ko.observable(win.isMobile);

}
if(location.hostname === "localhost") {
	viewModel.localhost = true;
} else {
	viewModel.localhost = false;
}


Eve.scope("*", function(){
	this.listen("[class*=-toggle]","click", function(event){
		event.preventDefault();
		$(event.target).toggleClass('open');
		$(event.target).find('[class^=icon-triangle]').toggleClass('icon-triangle-down icon-triangle-up');
		var id = $(event.target).attr('href');
		if(id){
			$(id).slideToggle();
		} else {
			console.error("The anchor tag must have a legitimate id/class target in the href");
		}
		
	});

});








Sherpa.counter("Sherpa Global Events");