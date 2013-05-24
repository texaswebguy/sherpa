Sherpa.counter("Sherpa Notes");
// Sherpa notes
console.log("hello notes")
Sherpa.notes = {

	init: function () {
	
		Sherpa.notes.bind(document, 'keydown', function (e) { 
		
			if (!e) var e = window.event;
		
			if(e.altKey) {
				
				switch (e.which || e.keyCode) {
					case 78:
						//ctrl n
						var notes = document.getElementById('sherpa_notes');
					
						if (!notes) Sherpa.notes.show();
						else document.body.removeChild(notes);
						
						Sherpa.notes.prevent(e);
						break;
					
						
				}
				
			}
		
		
		});
	
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
		var notes_style = '<style>#sherpa_notes{background:#fff;width:400px;-webkit-border-top-left-radius:3px;-webkit-border-bottom-left-radius:3px;-moz-border-radius-topleft:3px;-moz-border-radius-bottomleft:3px;border-top-left-radius:3px;border-bottom-left-radius:3px;float:right;-webkit-box-shadow:2px 2px 10px #999;box-shadow:2px 2px 10px #999;border:solid 1px #ccc;padding:10px 10px 0 10px;margin:0;position:absolute;top:45px;right:0}.design_notes_title{background:#333;color:#fff;margin:-31px -11px 0 -12px;padding:7px 5px 5px 27px;-webkit-border-top-left-radius:3px;-moz-border-radius-topleft:3px;cursor:move}.callout_number{position:absolute;background:orange;color:#fff;font-weight:bold;font-size:15px;padding:6px 10px 6px 10px;border-radius:50%;margin:0 0 0 -10px;display:none}#sherpa_notes ol{counter-reset:li;margin-left:10px;padding-left:0}#sherpa_notes ol>li{position:relative;margin:0 0 6px 2em;padding:4px 8px;list-style:none}#sherpa_notes ol>li:before{content:counter(li);counter-increment:li;position:absolute;top:-2px;left:-2em;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;width:1.8em;height:1.8em;margin-right:8px;padding:4px;color:#fff;background:orange;font-weight:bold;font-size:15px;text-align:center;border-radius:50%}#sherpa_notes li ol,#sherpa_notes li ul{margin-top:6px}#sherpa_notes ol ol li:last-child{margin-bottom:0}#sherpa_notes .icon-minus,#design_panel .icon-plus{cursor:pointer}#collapsible_notes{display:block}</style>',
		notes = '<div id="sherpa_notes">'+
		'	<h3 class="design_notes_title">'+
		'		<span id="design_notes_dragger">Design Notes</span>'+
		'		<div id="design_notes_closer" class="pull-right"><span class="icon-remove white_text"></span></div>'+
		'	</h3>'+
		'	<div id="collapsible_notes" style="overflow: hidden; display: block; ">'+
		'		<h1 id="designnotesgohere">Design notes go here</h1>'+
		'		<h2 id="blahblahblah">blah blah blah</h2>'+
		'		<ol>'+
		'		<li>This is <a href="http://example.com/" title="Title">an example</a> inline link.</li>'+
		'		<li>This is the left nav. <a href="http://www.delldesignlibrary.com/ux-patterns/search-and-filtering.html&amp;tab=02">comps</a></li>'+
		'		<li>these are bullets</li>'+
		'		<li>these are bullets</li>'+
		'		<li>these are bullets</li>'+
		'		<li>these are bullets</li>'+
		'		<li>these are bullets</li>'+
		'		</ol>'+
		'		<small class="template_info pull-right">Sherpa: 0.1</small>'+
		'	</div>'+
		'</div>',

		b = document.getElementsByTagName('body')[0];
	
		notes = notes + notes_style;
		
		$(b).append(notes);

	},	
	prevent : function (e) {
	
		if (e.preventDefault) e.preventDefault();
		else event.returnValue = false;
	
	}

};

if (window.location.href.match('notes=show')) Sherpa.notes.show();
else Sherpa.notes.init();
Sherpa.counter("Sherpa Notes");
