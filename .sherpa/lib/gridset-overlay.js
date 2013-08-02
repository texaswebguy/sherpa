// Gridset Overlay JS

gs = {

	init: function () {
	
		gs.bind(document, 'keydown', function (e) { 
		
			if (!e) var e = window.event;
		
			if(e.metaKey || e.ctrlKey) {
				
				switch (e.which || e.keyCode) {
					case 71:
					
						var gw = document.getElementById('gridsetoverlaywrap');
					
						if (!gw) gs.show();
						else document.body.removeChild(gw);
						
						gs.prevent(e);
						break;
					
					case 191:
					
						if (document.getElementById('gridsetoverlaywrap')) {
						
							console.log(window.innerWidth);
							gs.prevent(e);
						
						}
						
						break;
						
				}
				
			}
		
		
		});
	
	},

	show: function () {
	
		var p = ['ma','mb','ta','tb','da','db'],
			c = [3,4,9,8,12,15],
			w = [320,320,768,768,980,980],
			b = document.getElementsByTagName('body')[0],
			gw = '<div id="gridwrap"><div id="gridoverlay" class="wrapper">',
		
			k = 0, breaks = '',
			
			styles = '<style id="gridsetoverlaystyles" type="text/css">#gridsetoverlaywrap{position:static;}#gridwrap{display:block;position:fixed;top:0;left:0;width:100%;height:100%;z-index:1000;pointer-events:none;font-family:Helvetica, Arial, sans-serif !important;}#gridoverlay{position:relative;height:100%;overflow:hidden !important;background:none !important;}#gridoverlay div{display:block;position:static;height:100%;color:#bcbcff;}#gridoverlay .gridset{position:absolute;width:100%;height:100%;top:0;left:0;opacity:0.7;}#gridoverlay .gridset div{text-align:left;font-size:10px !important;border-right:1px solid #bcbcff;border-left:1px solid #bcbcff;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;}#gridoverlay div small{width:100%;display:block;text-align:center;color:#7D80DB;font-weight:700 !important;border-bottom:1px solid #bcbcff;border-top:1px solid #bcbcff;padding-top:0 !important;background-color:rgb(240,240,255) !important;text-transform:none !important;height:22px !important;line-height:22px !important;text-style:normal !important;}#gridoverlay .gridset:nth-child(2) div{border-style:dashed;padding-top:23px;}#gridoverlay .gridset:nth-child(2) small{border-style:dashed;}#gridoverlay .gridset:nth-child(3) div{border-style:dotted;padding-top:45px;}#gridoverlay .gridset:nth-child(3) small{border-style:dotted;}#gridsetoverlaywrap .noshow{display:none;}@media only screen and (max-width:767px) {#gridsetoverlaywrap [class*=ma1],#gridsetoverlaywrap [class*=ma2],#gridsetoverlaywrap [class*=ma3],#gridsetoverlaywrap .ma-all{display:block;float:left;margin-right:-100%;}#gridsetoverlaywrap [class*=ma1]{width:31.011660452500898%;margin-left:0%;}#gridsetoverlaywrap [class*=ma2]{width:31.291044773749555%;margin-left:34.136660452501%;}#gridsetoverlaywrap [class*=ma3]{width:31.291044773749555%;margin-left:68.55270522625%;}#gridsetoverlaywrap .ma-hide{display:none !important;}#gridsetoverlaywrap [class*=mb1],#gridsetoverlaywrap [class*=mb2],#gridsetoverlaywrap [class*=mb3],#gridsetoverlaywrap [class*=mb4],#gridsetoverlaywrap .mb-all{display:block;float:left;margin-right:-100%;}#gridsetoverlaywrap [class*=mb1]{width:22.558207625420444%;margin-left:0%;}#gridsetoverlaywrap [class*=mb2]{width:22.633653135873363%;margin-left:25.68320762542%;}#gridsetoverlaywrap [class*=mb3]{width:22.616123342752438%;margin-left:51.441860761294%;}#gridsetoverlaywrap [class*=mb4]{width:22.66076589595376%;margin-left:77.182984104046%;}#gridsetoverlaywrap .mb-hide{display:none !important;}}@media only screen and (min-width:768px) and (max-width:979px) {#gridsetoverlaywrap [class*=ta1],#gridsetoverlaywrap [class*=ta2],#gridsetoverlaywrap [class*=ta3],#gridsetoverlaywrap [class*=ta4],#gridsetoverlaywrap [class*=ta5],#gridsetoverlaywrap [class*=ta6],#gridsetoverlaywrap [class*=ta7],#gridsetoverlaywrap [class*=ta8],#gridsetoverlaywrap [class*=ta9],#gridsetoverlaywrap .ta-all{display:block;float:left;margin-right:-100%;}#gridsetoverlaywrap [class*=ta1]{width:7.626075884699221%;margin-left:0%;}#gridsetoverlaywrap [class*=ta2]{width:7.632352493579263%;margin-left:11.532325884699%;}#gridsetoverlaywrap [class*=ta3]{width:7.632352493579263%;margin-left:23.070928378278%;}#gridsetoverlaywrap [class*=ta4]{width:7.632352493579263%;margin-left:34.609530871858%;}#gridsetoverlaywrap [class*=ta5]{width:7.632352493579263%;margin-left:46.148133365437%;}#gridsetoverlaywrap [class*=ta6]{width:7.632352493579263%;margin-left:57.686735859016%;}#gridsetoverlaywrap [class*=ta7]{width:7.632352493579263%;margin-left:69.225338352596%;}#gridsetoverlaywrap [class*=ta8]{width:7.632352493579263%;margin-left:80.763940846175%;}#gridsetoverlaywrap [class*=ta9]{width:7.632352493579263%;margin-left:92.302543339754%;}#gridsetoverlaywrap .ta-hide{display:none !important;}#gridsetoverlaywrap [class*=tb1],#gridsetoverlaywrap [class*=tb2],#gridsetoverlaywrap [class*=tb3],#gridsetoverlaywrap [class*=tb4],#gridsetoverlaywrap [class*=tb5],#gridsetoverlaywrap [class*=tb6],#gridsetoverlaywrap [class*=tb7],#gridsetoverlaywrap [class*=tb8],#gridsetoverlaywrap .tb-all{display:block;float:left;margin-right:-100%;}#gridsetoverlaywrap [class*=tb1]{width:9.167163792727461%;margin-left:0%;}#gridsetoverlaywrap [class*=tb2]{width:9.060568862943697%;margin-left:13.073413792727%;}#gridsetoverlaywrap [class*=tb3]{width:9.060568862943697%;margin-left:26.040232655671%;}#gridsetoverlaywrap [class*=tb4]{width:9.060568862943697%;margin-left:39.007051518615%;}#gridsetoverlaywrap [class*=tb5]{width:9.060568862943697%;margin-left:51.973870381559%;}#gridsetoverlaywrap [class*=tb6]{width:9.060568862943697%;margin-left:64.940689244502%;}#gridsetoverlaywrap [class*=tb7]{width:9.060568862943697%;margin-left:77.907508107446%;}#gridsetoverlaywrap [class*=tb8]{width:9.060568862943697%;margin-left:90.87432697039%;}#gridsetoverlaywrap .tb-hide{display:none !important;}}@media only screen and (min-width:980px) {#gridsetoverlaywrap [class*=da1],#gridsetoverlaywrap [class*=da2],#gridsetoverlaywrap [class*=da3],#gridsetoverlaywrap [class*=da4],#gridsetoverlaywrap [class*=da5],#gridsetoverlaywrap [class*=da6],#gridsetoverlaywrap [class*=da7],#gridsetoverlaywrap [class*=da8],#gridsetoverlaywrap [class*=da9],#gridsetoverlaywrap [class*=da10],#gridsetoverlaywrap [class*=da11],#gridsetoverlaywrap [class*=da12],#gridsetoverlaywrap .da-all{display:block;float:left;margin-right:-100%;}#gridsetoverlaywrap [class*=da1]{width:4.3579970652804345%;margin-left:0%;}#gridsetoverlaywrap [class*=da2]{width:4.608456667534804%;margin-left:8.4396297152804%;}#gridsetoverlaywrap [class*=da3]{width:4.608456667534804%;margin-left:17.129719032815%;}#gridsetoverlaywrap [class*=da4]{width:4.608456667534804%;margin-left:25.81980835035%;}#gridsetoverlaywrap [class*=da5]{width:4.608456667534804%;margin-left:34.509897667885%;}#gridsetoverlaywrap [class*=da6]{width:4.608456667534804%;margin-left:43.19998698542%;}#gridsetoverlaywrap [class*=da7]{width:4.608456667534804%;margin-left:51.890076302954%;}#gridsetoverlaywrap [class*=da8]{width:4.608456667534804%;margin-left:60.580165620489%;}#gridsetoverlaywrap [class*=da9]{width:4.608456667534804%;margin-left:69.270254938024%;}#gridsetoverlaywrap [class*=da10]{width:4.608456667534804%;margin-left:77.960344255559%;}#gridsetoverlaywrap [class*=da11]{width:4.608456667534804%;margin-left:86.650433573094%;}#gridsetoverlaywrap [class*=da12]{width:4.608456667534804%;margin-left:95.340522890628%;}#gridsetoverlaywrap .da-hide{display:none !important;}#gridsetoverlaywrap [class*=db1],#gridsetoverlaywrap [class*=db2],#gridsetoverlaywrap [class*=db3],#gridsetoverlaywrap [class*=db4],#gridsetoverlaywrap [class*=db5],#gridsetoverlaywrap [class*=db6],#gridsetoverlaywrap [class*=db7],#gridsetoverlaywrap [class*=db8],#gridsetoverlaywrap [class*=db9],#gridsetoverlaywrap [class*=db10],#gridsetoverlaywrap [class*=db11],#gridsetoverlaywrap [class*=db12],#gridsetoverlaywrap [class*=db13],#gridsetoverlaywrap [class*=db14],#gridsetoverlaywrap [class*=db15],#gridsetoverlaywrap .db-all{display:block;float:left;margin-right:-100%;}#gridsetoverlaywrap [class*=db1]{width:2.556662147710428%;margin-left:0%;}#gridsetoverlaywrap [class*=db2]{width:2.8749614500906544%;margin-left:6.6382947977104%;}#gridsetoverlaywrap [class*=db3]{width:2.8749614500906544%;margin-left:13.594888897801%;}#gridsetoverlaywrap [class*=db4]{width:2.8749614500906544%;margin-left:20.551482997892%;}#gridsetoverlaywrap [class*=db5]{width:2.8749614500906544%;margin-left:27.508077097982%;}#gridsetoverlaywrap [class*=db6]{width:2.8749614500906544%;margin-left:34.464671198073%;}#gridsetoverlaywrap [class*=db7]{width:2.8749614500906544%;margin-left:41.421265298164%;}#gridsetoverlaywrap [class*=db8]{width:2.8749614500906544%;margin-left:48.377859398254%;}#gridsetoverlaywrap [class*=db9]{width:2.8749614500906544%;margin-left:55.334453498345%;}#gridsetoverlaywrap [class*=db10]{width:2.8749614500906544%;margin-left:62.291047598436%;}#gridsetoverlaywrap [class*=db11]{width:2.8749614500906544%;margin-left:69.247641698526%;}#gridsetoverlaywrap [class*=db12]{width:2.8749614500906544%;margin-left:76.204235798617%;}#gridsetoverlaywrap [class*=db13]{width:2.8749614500906544%;margin-left:83.160829898708%;}#gridsetoverlaywrap [class*=db14]{width:2.8749614500906544%;margin-left:90.117423998798%;}#gridsetoverlaywrap [class*=db15]{width:2.8749614500906544%;margin-left:97.074018098889%;}#gridsetoverlaywrap .db-hide{display:none !important;}}</style>';
						
		while (p[k]) {
		
			var hides = '', 
				l = 0;
		
			if (w[k] != breaks && k == 0) gw += '<div>';
			else if (w[k] != breaks) gw += '</div><div>';
		
			while (p[l]) {
		
				if (l != k && w[l] != w[k]) hides += p[l] + '-hide ';
				l++;			
		
			}
		
			gw += '<div class="gridset ' + hides + '"><div class="'+p[k]+'1"><small>'+p[k]+'1</small></div>';
		
			var i = 1;
		
			while (i++ < c[k]) gw += '<div class="'+p[k]+i+'"><small>'+p[k]+i+'</small></div>';
		
			gw += '</div>';
		
			if (k == w.length - 1) gw += '</div>';
		
			breaks = w[k];
		
			k++;
		
		}
		
		gw += '</div></div>';
		
		var newgw = document.createElement('div');
		
		newgw.id = 'gridsetoverlaywrap';
		
		newgw.innerHTML = gw + styles;
		
		b.appendChild(newgw);
	
	},
	
	bind : function (t, e, f) {
		
		if (t.attachEvent) t.attachEvent('on' + e, f);
		else t.addEventListener(e, f, false);
	
	},
	
	prevent : function (e) {
	
		if (e.preventDefault) e.preventDefault();
		else event.returnValue = false;
	
	}


};

if (window.location.href.match('gridset=show')) gs.show();
else gs.init();