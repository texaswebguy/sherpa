Sherpa.counter("Sherpa Notes");
// Sherpa notes
// console.log("hello notes")
// load markdown converter
Sherpa.js({showdown:SHERPA.JS_LIB_PATH+"showdown.js"});
Sherpa.notes = {

	init: function () {
	
		Sherpa.notes.bind(document, 'keydown', function (e) { 
		
			if (!e) var e = window.event;
		
			if(e.altKey) {
				
				switch (e.which || e.keyCode) {
					case 78:
						//alt n
						var notes = document.getElementById('sherpa_notes');
						if (!notes) {
							Sherpa.notes.show();
							Sherpa.store("showNotes", true)
						} else {
							document.body.removeChild(notes);
							Sherpa.store("showNotes", null)
						}
						Sherpa.notes.prevent(e);
						break;
						
				}
				
			}
		});
		if(Sherpa.store("showNotes")){
			window.setTimeout(Sherpa.notes.show,800);
		};

	
	},

	bind : function (t, e, f) {
		
		if (t.attachEvent) t.attachEvent('on' + e, f);
		else t.addEventListener(e, f, false);
	
	},
	show: function () {
		/*TODO: this is just a mockup.  Eventualy this should read a .md file and run it through showdown to render html

		var markdown = something here to get a .md file associated with page
		var converter = new Showdown.converter();
	    var html = converter.makeHtml(markdown);

		*/
		//TODO this needs to be put in the uxmf component
		b = document.getElementsByTagName('body')[0],
		notes = Sherpa.notes.buildHTML();
		$(b).append(notes);
		$("#sherpa_notes").draggable({
			stop: function(){
				Sherpa.store("notes_location", $(this).attr("style"));
			}
		});
	},
	buildHTML : function() {

		var notes_body ='<p class="red-text">No design notes found for this page<p>'+
		'<p>To add design notes to this panel add markdown text inside a <code>&lt;div class="design-notes">&lt;/div></code> in whatever page you want to add notes to. Note: Make sure all your markdown text is not indented. Indentation in markdown gets interpreted as a code block.'
		if($("div:visible .design-notes")[0]){
			notes_body = "";
			var convertMD = new Sherpa.Markdown.converter();
			_.each($("div:visible .design-notes"), function(markdown){
				notes_body += convertMD.makeHtml($(markdown).text());
			});
		}

        var dynamicNotes;
        if (Sherpa.dynamicNotes != null) {
            dynamicNotes = Sherpa.dynamicNotes.getHTML();
        } else {
            dynamicNotes = "";
        }

        var notes_location = Sherpa.store("notes_location");
        if(notes_location){
        	notes_location = 'style="'+notes_location+'"';
        } else {
        	notes_location = "";
        }
        var notes = '<div id="sherpa_notes" '+notes_location+'>'+
		'	<h3 class="design_notes_title">'+
		'		<span id="design_notes_dragger">Design Notes</span>'+
		'		<div id="design_notes_control" class="text-right">'+
		'       	<span id="design_notes_closer" class="icon-ui-closecircle white_text"></span>'+
		'			<span id="design_notes_docker" class="icon-ui-triangleright white_text"></span>'+
		'       </div>'+
		'	</h3>'+
		'	<div id="collapsible_notes" style="overflow: hidden; display: block; ">'+
            dynamicNotes +
		notes_body+
		'     <p class="da-clear ta-clear ma-clear"><small class="template_info pull-right da-clear ta-clear ma-clear">Sherpa Version: '+Sherpa.VERSION+'</small></p>'+
		'	</div>'+
		'</div>'
		return notes;
	},
	prevent : function (e) {
	
		if (e.preventDefault) e.preventDefault();
		else event.returnValue = false;
	
	},
	update : function () {
		$($("#sherpa_notes")[0]).html($(Sherpa.notes.buildHTML()).html()).draggable({
			stop: function(){
				Sherpa.store("notes_location", $(this).attr("style"));
			}
		});


		
	}

};

/**
 * Override this object with custom dynamic object. Must have "getHTML()" method.
 * @type {{getHTML: Function}}
 */
Sherpa.dynamicNotes = {
    getHTML : function () {
        return "";
    }
}

//updates the notes content every time there is a hash change
$(window).on('hashchange', function() {
	window.setTimeout(Sherpa.notes.update,800);
});

if (window.location.href.match('notes=show')) Sherpa.notes.show();
else {
	Sherpa.notes.init();
}

Sherpa.scope("#sherpa_notes",function(){
	this.listen("#design_notes_closer","click",function(event){
		$('#sherpa_notes').remove();
		Sherpa.store("showNotes", null)
	}),
	this.listen("#design_notes_docker","click",function(event){
		$('#sherpa_notes').removeAttr("style");
		Sherpa.store("notes_location",null);
	})
})
Sherpa.counter("Sherpa Notes");
