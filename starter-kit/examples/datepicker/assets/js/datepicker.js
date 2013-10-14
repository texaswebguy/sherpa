
// Controllers 
sherpaApp.controller("pageController", function($scope) {
    
    $scope.lorem ="Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
    $scope.show_stuff = "Show Stuff"
    $scope.hide_stuff = "Hide Stuff"
    var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    $scope.datepicker = {
	  "date": dateFormat(now,"mm/dd/yyyy")
	}
});


_.each( $('.datepicker'), function(element, index){
	var datepicker = $(element).datepicker()
	.on('focus', function(ev) {
		//hide any other date pickers opened
		$('.datepicker.dropdown-menu').hide();
		$($('.datepicker.dropdown-menu')[index]).show();
	})
	.on('changeDate', function(ev) {
		ev.stopPropagation();
		if (ev.date.valueOf() > datepicker.date.valueOf()) {
			var newDate = new Date(ev.date)
			newDate.setDate(newDate.getDate() + 1);
			datepicker.setValue(newDate);
		}
		$('.datepicker.dropdown-menu').hide();
	})
	.data('datepicker');
});



