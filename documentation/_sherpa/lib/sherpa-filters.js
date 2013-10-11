
// Filters
//___________________________________________________________________________________________
sherpaApp.filter('msg', function(){
    return function(textkey, data) {
        return Sherpa.msg(textkey, data);
    }
});
