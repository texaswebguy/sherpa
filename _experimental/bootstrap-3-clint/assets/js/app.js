  $('#carousel-example-gallery').carousel({
  interval: 10000
  });
  $('#carousel-example-gallery-caption').carousel({
  interval: 10000
  });

  $('[data-toggle=tooltip]').tooltip();

  $('[data-toggle="popover"]').popover({trigger:'manual'});
$('[data-toggle="popover"]').click(function(event){
  event.preventDefault();
  $('[data-toggle="popover"]').popover('destroy');
  $(this).popover('show');
  $('[data-dismiss="popover"]').click(function(event){
    event.preventDefault();
    $(this).parents('.popover').prev().popover('hide');
  });
});
$('[data-toggle="popover"][data-trigger="hover"]').mouseover(function(event){
  event.preventDefault();
  $('[data-toggle="popover"]').popover('destroy');
  $(this).popover('show');
});
$('[data-toggle="popover"][data-trigger="hover"]').mouseout(function(event){
  $(this).popover('destroy');
});
$('[data-toggle="popover"][data-trigger="hover"]').focus(function(event){
  $('[data-toggle="popover"]').popover('destroy');
  $(this).popover('show');
});

$('#custom-popover').click(function(event){
  event.preventDefault();
  $(this).popover('show');
  $('[data-dismiss="popover"]').click(function(event){
    event.preventDefault();
    $(this).parents('.popover').prev().popover('hide');
  });
});