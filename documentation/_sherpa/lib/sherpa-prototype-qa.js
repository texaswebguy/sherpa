Sherpa.counter("Sherpa Prototype QA");

//sherpa-prototype-qa.js

Sherpa.QA = {};
Sherpa.QA.log = {};
Sherpa.QA.logEntry = function (description, tags) {
	var id = Sherpa.uuid();
	Sherpa.QA.log[id] = {
		id: id,
		tags: tags,
		description: description,
		url: location.href
	};
	Sherpa.QA.msg(id);
}
Sherpa.QA.find = function(query) {
	//TODO provide search through QA log
	return JSON.stringify(_.filter(Sherpa.QA.log, function(qaEntry){
		return JSON.stringify(qaEntry).match(query);
	}),null,5);
}
Sherpa.QA.msg = function(id) {
	if(SHERPA.ENABLE_PROTOTYPE_QA){
		console.error(Sherpa.QA.log[id].description+" :",Sherpa.QA.log[id]);
	}
}

Sherpa.QA.check = function (html,filename) {

/* pattern vs secondary_pattern 
	if pattern is a match then the system looks to see if secondary is NOT a match within the pattern match results.
*/
	var qa_rules = [
		{
			pattern: "style=",
			description: "Inline style detected in "+filename,
			tags:"inline styles"
		},
		{
			pattern: "class=\".*btn-tertiary.*\"",
			description: "btn-tertiary class name used in "+filename+ " and it should be deprecated. Please just use btn",
			tags:"Deprecated CSS class name"
		},
		{
			pattern: "<(a|p|span|small|h1|h2|h3|h4|h5|h6|strong|em|button).*>.*</(a|p|span|small|h1|h2|h3|h4|h5|h6|strong|em|button)>",
			secondary_pattern: "data-bind=\"msg:|data-bind=\"linkedmsg:|class=\"icon|<.*></.*>",
			description: "Non-localized text in  "+filename+ ". You should consider using data-bind=\"msg: 'textkey' to localize your content. ",
			tags:"Textkeys, localization, hard coded content"
		}

	]
	_.each(qa_rules, function(rule){
		var pattern = html.match(new RegExp(rule.pattern));
		if(pattern){
			if(rule.secondary_pattern) {
				if(!pattern[0].match(new RegExp(rule.secondary_pattern))) {
					Sherpa.QA.logEntry("HTML: "+pattern[0]+" - "+rule.description, rule.tags);
				}
			} else {
				Sherpa.QA.logEntry(rule.description, rule.tags);
			}
		}
	})

}


/*TODO 

The idea here is to build something that parses the various things and looks for possible bad practices.
Not so much errors because those will be visible in the console but any custom css that might violate 
certain rules. Other things like inline styles, etc.

*/
Sherpa.counter("Sherpa Prototype QA");
