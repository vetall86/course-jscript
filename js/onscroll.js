!function() {

	var addEvent = function(elem, event_name, handler) {
		if (elem.addEventListener) elem.addEventListener(event_name, handler, false);
		else if (elem.attachEvent) elem.attachEvent('on' + event_name, handler);
		else elem['on' + event_name] = handler;
	return;};
		
	function Steward (data) {

	};

	Steward.prototype = {
		constructor: Steward,
		onScroll: function(e) {
			var sTop = window.pageYOffset || document.documentElement.scrollTop;
			if ( sTop < 50 ) header.style.top = '0';
			else header.style.top = '-'+window.getComputedStyle(header).height;
			if ( sTop > parseInt( window.getComputedStyle(document.body).height ) - window.innerHeight-50 )
				footer.style.margin = '-'+window.getComputedStyle(footer).height+' 0';
			else footer.style.margin = '0';
		},
		tableAlign: function(e) {
			var tbw = parseInt(window.getComputedStyle(table_box).width)*0.97;
			attendance.style.transform = 'scale('+(tbw)/parseInt(window.getComputedStyle(attendance).width)+')';
			table_box.style.height = parseInt(window.getComputedStyle(attendance).height)*(tbw)/parseInt(window.getComputedStyle(attendance).width)+15+'px';
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
				// attendance = document.getElementById('attendance');
			addEvent(window, "resize", function(e){
				var e = e || window.e;
				// !!attendance && steward.tableAlign(e);
				list.length > 0 && steward.blockAlign(e, list);
			});
			addEvent(window, "scroll", function(e){
				var e = e || window.e;
				steward.onScroll(e);
			});
			// !!attendance && steward.tableAlign();
			list.length > 0 && steward.blockAlign(1, list);
		}
	};
	window.worker = new Steward;


}();

window.onload = function(e) {
	worker.init();

	console.log(e);
};