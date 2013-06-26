Sherpa.counter("Sherpa Notes");
// Sherpa notes
// console.log("hello notes")
// load markdown converter
Sherpa.js({showdown:"assets/sherpa/lib/showdown.js"});
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
			window.setTimeout(Sherpa.notes.show,500);
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
		var notes_style = '<style>#sherpa_notes{background:#fff;width:400px;-webkit-border-top-left-radius:3px;-webkit-border-bottom-left-radius:3px;-moz-border-radius-topleft:3px;-moz-border-radius-bottomleft:3px;border-top-left-radius:3px;border-bottom-left-radius:3px;float:right;-webkit-box-shadow:2px 2px 10px #999;box-shadow:2px 2px 10px #999;border:solid 1px #ccc;padding:10px 10px 0 10px;margin:0;position:absolute;top:45px;right:0;z-index:9999;}.design_notes_title{background:#333;color:#fff;margin:-31px -11px 0 -12px;padding:7px 5px 5px 27px;-webkit-border-top-left-radius:3px;-moz-border-radius-topleft:3px;cursor:move}.callout_number{position:absolute;background:orange;color:#fff;font-weight:bold;font-size:15px;padding:6px 10px 6px 10px;border-radius:50%;margin:0 0 0 -10px;display:none}#sherpa_notes ol{counter-reset:li;margin-left:10px;padding-left:0}#sherpa_notes ol>li{position:relative;margin:0 0 6px 2em;padding:4px 8px;list-style:none}#sherpa_notes ol>li:before{content:counter(li);counter-increment:li;position:absolute;top:-2px;left:-2em;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;width:1.8em;height:1.8em;margin-right:8px;padding:4px;color:#fff;background:orange;font-weight:bold;font-size:15px;text-align:center;border-radius:50%}#sherpa_notes li ol,#sherpa_notes li ul{margin-top:6px}#sherpa_notes ol ol li:last-child{margin-bottom:0}#sherpa_notes .icon-minus,#design_panel .icon-plus{cursor:pointer}#collapsible_notes{display:block}</style>',
		b = document.getElementsByTagName('body')[0],
		notes = Sherpa.notes.buildHTML() + notes_style;
		$(b).append(notes);

	},
	buildHTML : function() {

		var notes_body ='<p class="red-text">No design notes found for this page<p>'+
		'<p>To add design notes to this panel add markdown text inside a <code>&lt;div class="design-notes">&lt;/div></code> in whatever page you want to add notes to.'
		if($("div:visible .design-notes")[0]){
			notes_body = "";
			var convertMD = new Sherpa.Markdown.converter();
			_.each($("div:visible .design-notes"), function(markdown){
				notes_body += convertMD.makeHtml($(markdown).text());
			});
		}
		var notes = '<div id="sherpa_notes">'+
		'	<h3 class="design_notes_title">'+
		'		<span id="design_notes_dragger">Design Notes</span>'+
		'		<div id="design_notes_closer" class="pull-right"><span class="icon-remove white_text"></span></div>'+
		'	</h3>'+
		'	<div id="collapsible_notes" style="overflow: hidden; display: block; ">'+
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
		$($("#sherpa_notes")[0]).html($(Sherpa.notes.buildHTML()).html());
	}

};

//updates the notes content every time there is a hash change
$(window).on('hashchange', function() {
	window.setTimeout(Sherpa.notes.update,500);
});

if (window.location.href.match('notes=show')) Sherpa.notes.show();
else Sherpa.notes.init();
Sherpa.counter("Sherpa Notes");
