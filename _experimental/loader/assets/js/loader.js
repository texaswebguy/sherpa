
// Controllers 
sherpaApp.controller("pageController", function($scope) {
    
    $scope.lorem ="Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
    $scope.show_stuff = "Show Stuff"
    $scope.hide_stuff = "Hide Stuff"
    $scope.text_item_label = Sherpa.msg('text_item_label');
  	$scope.togglePulse = function(){
  		if($('html').hasClass('pulse')){
  			Sherpa.feature("pulse",false);
  		} else {
  			Sherpa.feature("pulse",true);
  		}
  	}
});

Sherpa.load("assets/css/jquery-ui.css");

$(function() {
    $( "#changeSpeed" ).slider({
      value:1,
      min: 0.5,
      max: 2,
      step: .1,
      slide: function( event, ui ) {
      	if(ui.value === 1) {
      		$( "#speed" ).text( ui.value + " second");
      	} else {
      		$( "#speed" ).text( ui.value + " seconds");
      	}
      	var newClass = $('html').attr('class').replace(/loader-speed-[0-9]|loader-speed-[0-9][0-9]/g,"");
      	$('html').attr('class',newClass+' loader-speed-'+(ui.value*10));
      	$("#toggle-pulse").click().click();
      }
    });
    $( "#speed" ).text( "1 second");
    $('html').addClass('loader-speed-10');

  	
  });

