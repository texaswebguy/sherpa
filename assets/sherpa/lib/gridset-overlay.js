// Gridset Overlay JS

gs = {

	init: function () {
		
		if (window.location.href.match('gridset=show')) gs.show();
	
		gs.bind(document, 'keydown', function (e) { 
		
			if (!e) var e = window.event;
		
			if(e.metaKey || e.ctrlKey) {
				
				switch (e.which || e.keyCode) {
					case 71:
					
						var gw = document.getElementById('gridsetoverlaywrap');
					
						if (!gw) gs.show();
						else gs.remove(gw);
						
						gs.prevent(e);
						break;
						
				}
				
			}
		
		
		});
	
	},
	
	remove: function (gw) {
	
		document.body.removeChild(gw);
		
		if(window.detachEvent) window.detachEvent('onresize', gs.width);
		else window.removeEventListener('resize', gs.width, false);
	
	},
	
	width: function () {
		
		var swv = document.getElementById('gridscreenwidthval');
		if (swv) swv.innerHTML = window.innerWidth + 'px';
		
	},

	show: function () {
	
		var p = ['ma','mb','ta','tb','da','db','dc'],
			c = [3,4,9,8,12,16,18],
			w = [320,320,768,768,980,980,980],
			b = document.getElementsByTagName('body')[0],
			gw = '<div id="gridwrap"><div id="gridscreenwidthwrap"><p id="gridscreenwidth">Screen width: <strong id="gridscreenwidthval"></strong></p></div><div id="gridoverlay" class="wrapper">',
		
			k = 0, breaks = '',
			
			styles = '<style id="gridsetoverlaystyles" type="text/css">#gridsetoverlaywrap{position:static;}#gridwrap{display:block;position:fixed;top:0;left:0;width:100%;height:100%;z-index:1000;pointer-events:none;font-family:Helvetica, Arial, sans-serif !important;}#gridoverlay{position:relative;height:100%;overflow:hidden !important;background:none !important;}#gridoverlay div{display:block;position:static;height:100%;color:#bcbcff;}#gridoverlay .gridset{position:absolute;width:100%;height:100%;top:0;left:0;opacity:0.7;}#gridoverlay .gridset div{text-align:left;font-size:10px !important;border-right:1px solid #bcbcff;border-left:1px solid #bcbcff;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;}#gridoverlay div small{width:100%;display:block;text-align:center;color:#7D80DB;font-weight:700 !important;border-bottom:1px solid #bcbcff;border-top:1px solid #bcbcff;padding-top:0 !important;background-color:rgb(240,240,255) !important;text-transform:none !important;height:22px !important;line-height:22px !important;text-style:normal !important;}#gridoverlay .gridset:nth-child(2) div{border-style:dashed;padding-top:23px;}#gridoverlay .gridset:nth-child(2) small{border-style:dashed;}#gridoverlay .gridset:nth-child(3) div{border-style:dotted;padding-top:45px;}#gridoverlay .gridset:nth-child(3) small{border-style:dotted;}#gridsetoverlaywrap .noshow{display:none;}#gridscreenwidthwrap{display:block !important;width:100% !important;position:absolute !important;bottom:0 !important;left:0 !important;height:30px !important;border-top:1px solid #7D80DB !important;opacity:0.7 !important;background-color:rgb(240,240,255) !important;}#gridscreenwidth{display:block !important;width:100% !important;text-align:center !important;font-size:12px !important;line-height:1 !important;padding-top:8px !important;font-family:Helvetica, Arial, sans-serif !important; margin: 0 !important;color:#7D80DB !important;}@media only screen and (max-width:767px) {#gridsetoverlaywrap [class*=ma1],#gridsetoverlaywrap [class*=ma2],#gridsetoverlaywrap [class*=ma3],#gridsetoverlaywrap .ma-all{display:block;float:left;margin-right:-100%;}#gridsetoverlaywrap [class*=ma1]{width:31.25%;margin-left:0%;}#gridsetoverlaywrap [class*=ma2]{width:31.25%;margin-left:34.375%;}#gridsetoverlaywrap [class*=ma3]{width:31.25%;margin-left:68.75%;}#gridsetoverlaywrap .ma-hide{display:none !important;}#gridsetoverlaywrap [class*=mb1],#gridsetoverlaywrap [class*=mb2],#gridsetoverlaywrap [class*=mb3],#gridsetoverlaywrap [class*=mb4],#gridsetoverlaywrap .mb-all{display:block;float:left;margin-right:-100%;}#gridsetoverlaywrap [class*=mb1]{width:22.65625%;margin-left:0%;}#gridsetoverlaywrap [class*=mb2]{width:22.65625%;margin-left:25.78125%;}#gridsetoverlaywrap [class*=mb3]{width:22.65625%;margin-left:51.5625%;}#gridsetoverlaywrap [class*=mb4]{width:22.65625%;margin-left:77.34375%;}#gridsetoverlaywrap .mb-hide{display:none !important;}}@media only screen and (min-width:768px) and (max-width:979px) {#gridsetoverlaywrap [class*=ta1],#gridsetoverlaywrap [class*=ta2],#gridsetoverlaywrap [class*=ta3],#gridsetoverlaywrap [class*=ta4],#gridsetoverlaywrap [class*=ta5],#gridsetoverlaywrap [class*=ta6],#gridsetoverlaywrap [class*=ta7],#gridsetoverlaywrap [class*=ta8],#gridsetoverlaywrap [class*=ta9],#gridsetoverlaywrap .ta-all{display:block;float:left;margin-right:-100%;}#gridsetoverlaywrap [class*=ta1]{width:7.63888888%;margin-left:0%;}#gridsetoverlaywrap [class*=ta2]{width:7.63888888%;margin-left:11.54513888%;}#gridsetoverlaywrap [class*=ta3]{width:7.63888888%;margin-left:23.09027776%;}#gridsetoverlaywrap [class*=ta4]{width:7.63888888%;margin-left:34.63541664%;}#gridsetoverlaywrap [class*=ta5]{width:7.63888888%;margin-left:46.18055552%;}#gridsetoverlaywrap [class*=ta6]{width:7.63888888%;margin-left:57.7256944%;}#gridsetoverlaywrap [class*=ta7]{width:7.63888888%;margin-left:69.27083328%;}#gridsetoverlaywrap [class*=ta8]{width:7.63888888%;margin-left:80.81597216%;}#gridsetoverlaywrap [class*=ta9]{width:7.63888888%;margin-left:92.36111104%;}#gridsetoverlaywrap .ta-hide{display:none !important;}#gridsetoverlaywrap [class*=tb1],#gridsetoverlaywrap [class*=tb2],#gridsetoverlaywrap [class*=tb3],#gridsetoverlaywrap [class*=tb4],#gridsetoverlaywrap [class*=tb5],#gridsetoverlaywrap [class*=tb6],#gridsetoverlaywrap [class*=tb7],#gridsetoverlaywrap [class*=tb8],#gridsetoverlaywrap .tb-all{display:block;float:left;margin-right:-100%;}#gridsetoverlaywrap [class*=tb1]{width:9.073893229166664%;margin-left:0%;}#gridsetoverlaywrap [class*=tb2]{width:9.073893229166664%;margin-left:12.980143229167%;}#gridsetoverlaywrap [class*=tb3]{width:9.073893229166664%;margin-left:25.960286458333%;}#gridsetoverlaywrap [class*=tb4]{width:9.073893229166664%;margin-left:38.9404296875%;}#gridsetoverlaywrap [class*=tb5]{width:9.073893229166664%;margin-left:51.920572916667%;}#gridsetoverlaywrap [class*=tb6]{width:9.073893229166664%;margin-left:64.900716145833%;}#gridsetoverlaywrap [class*=tb7]{width:9.073893229166664%;margin-left:77.880859375%;}#gridsetoverlaywrap [class*=tb8]{width:9.073893229166664%;margin-left:90.861002604167%;}#gridsetoverlaywrap .tb-hide{display:none !important;}}@media only screen and (min-width:980px) {#gridsetoverlaywrap [class*=da1],#gridsetoverlaywrap [class*=da2],#gridsetoverlaywrap [class*=da3],#gridsetoverlaywrap [class*=da4],#gridsetoverlaywrap [class*=da5],#gridsetoverlaywrap [class*=da6],#gridsetoverlaywrap [class*=da7],#gridsetoverlaywrap [class*=da8],#gridsetoverlaywrap [class*=da9],#gridsetoverlaywrap [class*=da10],#gridsetoverlaywrap [class*=da11],#gridsetoverlaywrap [class*=da12],#gridsetoverlaywrap .da-all{display:block;float:left;margin-right:-100%;}#gridsetoverlaywrap [class*=da1]{width:4.59183673%;margin-left:0%;}#gridsetoverlaywrap [class*=da2]{width:4.59183673%;margin-left:8.67346938%;}#gridsetoverlaywrap [class*=da3]{width:4.59183673%;margin-left:17.34693876%;}#gridsetoverlaywrap [class*=da4]{width:4.59183673%;margin-left:26.02040814%;}#gridsetoverlaywrap [class*=da5]{width:4.59183673%;margin-left:34.69387752%;}#gridsetoverlaywrap [class*=da6]{width:4.59183673%;margin-left:43.3673469%;}#gridsetoverlaywrap [class*=da7]{width:4.59183673%;margin-left:52.04081628%;}#gridsetoverlaywrap [class*=da8]{width:4.59183673%;margin-left:60.71428566%;}#gridsetoverlaywrap [class*=da9]{width:4.59183673%;margin-left:69.38775504%;}#gridsetoverlaywrap [class*=da10]{width:4.59183673%;margin-left:78.06122442%;}#gridsetoverlaywrap [class*=da11]{width:4.59183673%;margin-left:86.7346938%;}#gridsetoverlaywrap [class*=da12]{width:4.59183673%;margin-left:95.40816318%;}#gridsetoverlaywrap .da-hide{display:none !important;}#gridsetoverlaywrap [class*=db1],#gridsetoverlaywrap [class*=db2],#gridsetoverlaywrap [class*=db3],#gridsetoverlaywrap [class*=db4],#gridsetoverlaywrap [class*=db5],#gridsetoverlaywrap [class*=db6],#gridsetoverlaywrap [class*=db7],#gridsetoverlaywrap [class*=db8],#gridsetoverlaywrap [class*=db9],#gridsetoverlaywrap [class*=db10],#gridsetoverlaywrap [class*=db11],#gridsetoverlaywrap [class*=db12],#gridsetoverlaywrap [class*=db13],#gridsetoverlaywrap [class*=db14],#gridsetoverlaywrap [class*=db15],#gridsetoverlaywrap [class*=db16],#gridsetoverlaywrap .db-all{display:block;float:left;margin-right:-100%;}#gridsetoverlaywrap [class*=db1]{width:2.4233673469387753%;margin-left:0%;}#gridsetoverlaywrap [class*=db2]{width:2.4233673469387753%;margin-left:6.5049999969388%;}#gridsetoverlaywrap [class*=db3]{width:2.4233673469387753%;margin-left:13.009999993878%;}#gridsetoverlaywrap [class*=db4]{width:2.4233673469387753%;margin-left:19.514999990816%;}#gridsetoverlaywrap [class*=db5]{width:2.4233673469387753%;margin-left:26.019999987755%;}#gridsetoverlaywrap [class*=db6]{width:2.4233673469387753%;margin-left:32.524999984694%;}#gridsetoverlaywrap [class*=db7]{width:2.4233673469387753%;margin-left:39.029999981633%;}#gridsetoverlaywrap [class*=db8]{width:2.4233673469387753%;margin-left:45.534999978571%;}#gridsetoverlaywrap [class*=db9]{width:2.4233673469387753%;margin-left:52.03999997551%;}#gridsetoverlaywrap [class*=db10]{width:2.4233673469387753%;margin-left:58.544999972449%;}#gridsetoverlaywrap [class*=db11]{width:2.4233673469387753%;margin-left:65.049999969388%;}#gridsetoverlaywrap [class*=db12]{width:2.4233673469387753%;margin-left:71.554999966327%;}#gridsetoverlaywrap [class*=db13]{width:2.4233673469387753%;margin-left:78.059999963265%;}#gridsetoverlaywrap [class*=db14]{width:2.4233673469387753%;margin-left:84.564999960204%;}#gridsetoverlaywrap [class*=db15]{width:2.4233673469387753%;margin-left:91.069999957143%;}#gridsetoverlaywrap [class*=db16]{width:2.4233673469387753%;margin-left:97.574999954082%;}#gridsetoverlaywrap .db-hide{display:none !important;}#gridsetoverlaywrap [class*=dc1],#gridsetoverlaywrap [class*=dc2],#gridsetoverlaywrap [class*=dc3],#gridsetoverlaywrap [class*=dc4],#gridsetoverlaywrap [class*=dc5],#gridsetoverlaywrap [class*=dc6],#gridsetoverlaywrap [class*=dc7],#gridsetoverlaywrap [class*=dc8],#gridsetoverlaywrap [class*=dc9],#gridsetoverlaywrap [class*=dc10],#gridsetoverlaywrap [class*=dc11],#gridsetoverlaywrap [class*=dc12],#gridsetoverlaywrap [class*=dc13],#gridsetoverlaywrap [class*=dc14],#gridsetoverlaywrap [class*=dc15],#gridsetoverlaywrap [class*=dc16],#gridsetoverlaywrap [class*=dc17],#gridsetoverlaywrap [class*=dc18],#gridsetoverlaywrap .dc-all{display:block;float:left;margin-right:-100%;}#gridsetoverlaywrap [class*=dc1]{width:1.700612244898%;margin-left:0%;}#gridsetoverlaywrap [class*=dc2]{width:1.700612244898%;margin-left:5.782244894898%;}#gridsetoverlaywrap [class*=dc3]{width:1.700612244898%;margin-left:11.564489789796%;}#gridsetoverlaywrap [class*=dc4]{width:1.700612244898%;margin-left:17.346734684694%;}#gridsetoverlaywrap [class*=dc5]{width:1.700612244898%;margin-left:23.128979579592%;}#gridsetoverlaywrap [class*=dc6]{width:1.700612244898%;margin-left:28.91122447449%;}#gridsetoverlaywrap [class*=dc7]{width:1.700612244898%;margin-left:34.693469369388%;}#gridsetoverlaywrap [class*=dc8]{width:1.700612244898%;margin-left:40.475714264286%;}#gridsetoverlaywrap [class*=dc9]{width:1.700612244898%;margin-left:46.257959159184%;}#gridsetoverlaywrap [class*=dc10]{width:1.700612244898%;margin-left:52.040204054082%;}#gridsetoverlaywrap [class*=dc11]{width:1.700612244898%;margin-left:57.82244894898%;}#gridsetoverlaywrap [class*=dc12]{width:1.700612244898%;margin-left:63.604693843878%;}#gridsetoverlaywrap [class*=dc13]{width:1.700612244898%;margin-left:69.386938738775%;}#gridsetoverlaywrap [class*=dc14]{width:1.700612244898%;margin-left:75.169183633673%;}#gridsetoverlaywrap [class*=dc15]{width:1.700612244898%;margin-left:80.951428528571%;}#gridsetoverlaywrap [class*=dc16]{width:1.700612244898%;margin-left:86.733673423469%;}#gridsetoverlaywrap [class*=dc17]{width:1.700612244898%;margin-left:92.515918318367%;}#gridsetoverlaywrap [class*=dc18]{width:1.700612244898%;margin-left:98.298163213265%;}#gridsetoverlaywrap .dc-hide{display:none !important;}}</style>';
						
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
		
		gs.width();
		gs.bind(window, 'resize', gs.width);
	
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

gs.init();