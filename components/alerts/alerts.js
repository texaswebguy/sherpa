Sherpa.componentJS.alerts_alerts_js = function(options) {
    //TODO put default options in config
    var default_options = {
          type: 'attention',
          icon:'icon-small-alertnotice',
          title: "Lorem ipsum!",
          message: "Consectetur adipiscing elit. Etiam imperdiet scelerisque condimentum. Duis condimentum lorem at tellus aliquet a tempus lectus varius.",
          dismiss: true
    } 
    if(!_.isEmpty(options)){
      if(!options.icon && options.type){
        //assigns icon based on type

        switch(options.type) {
          case "success":
            options.icon = 'icon-small-checkmark';        
            break;
          case "information":
            options.icon = 'icon-small-alertinfo';        
            break;
          case "error":
            options.icon = 'icon-small-alerterror';        
            break;
          default:
            options.icon = 'icon-small-alertnotice';        
        }
        if(!options.type){
          Sherpa.QA.logEntry("You made reference to alert component and you provided options without a specific type. "+default_options.type+" was chosen by default","alerts, bad component reference")
        } else {
          Sherpa.QA.logEntry("Each alert type has a standard icon but you overwrote it. Please make sure this is an approved variant","Unapproved icon, alerts")
        }
      }
      return _.extend(default_options, options);
    } else {
      Sherpa.QA.logEntry("Alert component rendered with default options. Please make sure to put real content in your alert.","content, alerts")
      return default_options;
    }
}
