Sherpa.counter("Sherpa Prototype QA");

//sherpa-prototype-qa.js

console.log("prototype QA script will eventually run and do something here...");
Sherpa.QA = {};
Sherpa.QA.log = {};
Sherpa.QA.logEntry = function (description, tags) {
	var id = Sherpa.uuid();
	Sherpa.QA.log[id] = {
		id: id,
		tags: tags,
		description: description
	};
	Sherpa.QA.msg(id);
}
Sherpa.QA.find = function(query) {
	//TODO provide search through QA log
}
Sherpa.QA.msg = function(id) {
	if(SHERPA.ENABLE_PROTOTYPE_QA){
		console.error(Sherpa.QA.log[id].description+" :"+id);
	}
}

/*TODO 

The idea here is to build something that parses the various things and looks for possible bad practices.
Not so much errors because those will be visible in the console but any custom css that might violate 
certain rules. Other things like inline styles, etc.

*/
Sherpa.counter("Sherpa Prototype QA");
