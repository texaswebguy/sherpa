Sherpa.counter("Sherpa Notes");
// Sherpa notes
// console.log("hello notes")
// load markdown converter
Sherpa.js({showdown:SHERPA.JS_LIB_PATH+"showdown.js"});
Sherpa.feature("sherpa-notes",false);
Sherpa.store("notes-collapsed",false);
Sherpa.notes = {

	init: function () {
	
		Sherpa.notes.bind(document, 'keydown', function (e) { 
		
			if (!e) var e = window.event;
		
			if(e.altKey) {
				
				switch (e.which || e.keyCode) {
					case 78:
						//alt n
						var notes = document.getElementById('sherpa-notes');
						if (!notes) {
							Sherpa.notes.show();
							Sherpa.store("showNotes", true);
						} else {
							Sherpa.notes.cleanUpNotes();
							Sherpa.store("showNotes", null);
							Sherpa.feature("sherpa-notes",false);
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
		$('#sherpa-notes').draggable({
			handle: ".design_notes_title",
			stop: function(){
				Sherpa.store("notes_location", $(this).attr("style"));
			}
		});
		Sherpa.feature("sherpa-notes",true); // adds sherpa-notes to html element
		window.setTimeout(Sherpa.notes.checkAnnotations,200);
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
        var notes = '<div id="sherpa-notes" '+notes_location+'>'+
		'	<h3 class="design_notes_title">'+
		'		<span>Design Notes</span>'+
		'		<div id="design-notes-control" class="right-text">'+
		'       	<span id="design-notes-collapser" data-toggle="collapse" data-target="#collapsible-notes"><span class="icon-ui-collapse"></span><span class="icon-ui-expand"></span></span>'+
		'       	<span id="design_notes_closer" class="icon-ui-closecircle"></span>'+
		'			<span id="design_notes_docker" class="icon-ui-triangleright"></span>'+
		'       </div>'+
		'	</h3>'+
		'	<div id="collapsible-notes" class="collapse">'+
            dynamicNotes +
		notes_body+
		'     <div id="sherpa-notes-annotations"><h3>Annotations</h3><ol></ol></div>'+
		'     <p  id="sherpa-notes-version" class="da-clear ta-clear ma-clear"><small class="template_info pull-right da-clear ta-clear ma-clear">Sherpa Version: '+Sherpa.VERSION+'</small></p>'+
		'	</div>'+
		'</div>'
		return notes;
	},
	prevent : function (e) {
	
		if (e.preventDefault) e.preventDefault();
		else event.returnValue = false;
	
	},
	checkCollapsibleState : function() {
		if(Sherpa.store("notes-collapsed")) {

		} else {
			
		}
	},
	update : function () {
		$($("#sherpa-notes")[0]).html($(Sherpa.notes.buildHTML()).html());
		$('#sherpa-notes').draggable({
			handle: ".design_notes_title",
			stop: function(){
				Sherpa.store("notes_location", $(this).attr("style"));
			}
		});
		Sherpa.notes.checkAnnotations();
	},
	checkAnnotations: function(){
		console.log($('.sherpa-notes [data-notes=true]').length,"notes");
		var $annotations = $('.sherpa-notes [data-notes=true]:visible');
		if($annotations.length) {
			_.each($annotations, function(el,index){
				var id = $(el).attr('id'),
					list_item = '<li><span class="sherpa-notes-find" data-notes-id="'+id+'"></span><span class="sherpa-notes-title" data-notes-id="'+id+'">',
					title = $(el).attr('data-notes-title'),
					description = $(el).attr('data-notes-description'),
					callout_number = index+1,
					callout = '';
				
				if(title) {
					list_item += title+'</span>';
				} else {
					//TODO check for id
					title = _.str.titleize(_.str.humanize(id));
					list_item += title+'</span>';
				}
				
				if(description) {
					list_item += '<p class="sherpa-notes-description" data-notes-id="'+id+'">'+description+'</p>';
				}
				list_item += '</li>';

				callout = '<div class="sherpa-notes-callout" title="'+title+'">'+callout_number+'</div>';

				$(el).prepend(callout);

				$('#sherpa-notes-annotations ol').append(list_item);
			});
			$("#sherpa-notes-annotations").show();
		} else {
			$("#sherpa-notes-annotations").hide();
		}

	},
	cleanUpNotes: function(){
		$('#sherpa-notes').remove();
		$('.sherpa-callout-number').remove();
		Sherpa.feature("sherpa-notes",false);
		Sherpa.store("showNotes", null);
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

Sherpa.scope("#sherpa-notes",function(){
	this.listen("#design_notes_closer","click",function(event){
		Sherpa.notes.cleanUpNotes();
	});
	this.listen("#design_notes_docker","click",function(event){
		$('#sherpa-notes').removeAttr("style");
		Sherpa.store("notes_location",null);
	});
	this.listen(".sherpa-notes-find","click", function(event){
		event.preventDefault();
		$.scrollTo('#'+$(event.currentTarget).attr('data-notes-id'),300,{offset:{top: -100}});
	});

	this.listen(".sherpa-notes-title, [data-notes=true]","click", function(event){
		event.preventDefault();
		console.log("display help");
		 Sherpa.publish("modal", {
		    title:'Documentation',
		    title_description:'description that goes under title (optional)',
		    body: 'contents go here'
		  })

	});
	this.listen("#design-notes-collapser","click",function(event){
		if($(event.currentTarget).hasClass("collapsed")){
			Sherpa.store("notes-collapsed",true);
		} else {
			Sherpa.store("notes-collapsed",false);
		}
	});


})
Sherpa.counter("Sherpa Notes");
