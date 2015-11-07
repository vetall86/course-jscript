!function() {

	var addEvent = function(elem, event_name, handler) {
		if (elem.addEventListener) elem.addEventListener(event_name, handler, false);
		else if (elem.attachEvent) elem.attachEvent('on' + event_name, handler);
		else elem['on' + event_name] = handler;
		return;
	};
		
	function Steward () {};
	Steward.prototype = {
		constructor: Steward,
		onScroll: function(e) {
			var sTop = window.pageYOffset || document.documentElement.scrollTop;
			if ( sTop < 50 ) header.style.top = '0';
			else header.style.top = '-'+window.getComputedStyle(header).height;
			if ( sTop > parseInt( window.getComputedStyle(document.body).height ) - window.innerHeight-50 )
				footer.style.margin = '';
			else {
				footer.style.margin = '0';
			};
		},
		blockAlign: function(e, boxes) {
			var max, key;
			for ( key = 0; key < boxes.length; key++ ) {
				max = parseInt(window.getComputedStyle(boxes[key]).height) < max ? max : parseInt(window.getComputedStyle(boxes[key]).height);
			};
			for ( key = 0; key < boxes.length; key++ ) {
				boxes[key].style.height = max+'px';
			};
		},
		init: function() {
			var steward = this,
				list = document.getElementsByClassName('list_box');

			addEvent(window, "resize", function(e){
				var e = e || window.e;
				list.length > 0 && steward.blockAlign(e, list);
			});
			addEvent(window, "scroll", function(e) {
				var e = e || window.e;
				steward.onScroll(e);
			});

			list.length > 0 && steward.blockAlign(1, list);
			steward.onScroll();
		}
	};
	window.onload = function(e) {
		new Steward().init();
	};

}();
