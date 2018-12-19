$(document).ready(function(){
	
	var $overlayContainer = $("#overlayContainer");
	var overlayHeight = $overlayContainer.outerHeight();
	var overlayWidth = $overlayContainer.outerWidth();
	var scale;
	
	function scaleOverlay() {
		scale = Math.min(
			$(window).outerWidth() / overlayWidth,
			$(window).outerHeight() / overlayHeight
		);
		
		scaleString = "translate(-50%, -50%) " + "scale(" + scale + ")";
		
		$overlayContainer.css({
			'-webkit-transform': scaleString,
			'-moz-transform': scaleString,
			'-o-transform': scaleString,
			'-ms-transform': scaleString,
			'transform': scaleString
		});
	}
	
	function loadOverlay() {
		
		//createIcon("icon-computer", "images/icons/computer.png", 18, 12, 83, 90);
		//createIcon("icon-recycle", "images/icons/recycle.png", 161, 8, 90, 93);
		
		$overlayContainer.css({'display': 'inline'});
		
		$(window).ready(function() {
			setDraggable($("#icon-computer"));
			setDraggable($("#icon-recycle"));
			setDraggable($("#testicon"));
		});
	}
	
	function createIcon(id, imgPath, top, left, width, height) {
		
		var $iconEl = $("<div>").attr({ id: id }).appendTo($overlayContainer);
		$iconEl.css({
			'z-index': 4,
			'position': 'absolute',
			'top': top + 'px',
			'left': left + 'px',
			'width': width + 'px',
			'height': height + 'px',
			'background-image': 'url(images/highlight.png)'
		});
		
		var $iconImg = $("<div>").appendTo($iconEl);
		$iconImg.css({
			'width': width + 'px',
			'height': height + 'px',
			'background-image': 'url(' + imgPath + ')',
			'background-size': 'contain',
			'background-repeat': 'no-repeat'
		});
	}
	
	function setDraggable(el) {
		
		var click = {x:0, y:0};
		var minLeft = parseFloat($overlayContainer.css("paddingLeft"));
		var minTop = parseFloat($overlayContainer.css("paddingTop"));
		var maxLeft = minLeft + $overlayContainer.width() - el.outerWidth();
		var maxTop = minTop + $overlayContainer.height() - el.outerHeight();
		
		el.draggable({
			
			start: function(event) {
				click.x = event.clientX;
				click.y = event.clientY;
			},
			
			drag: function(event, ui) {

				var original = ui.originalPosition;
				var left = (event.clientX - click.x + original.left) / scale;
				var top = (event.clientY - click.y + original.top) / scale; 
				
				ui.position = {
					left: Math.max(minLeft, Math.min(maxLeft, left)),
					top: Math.max(minTop, Math.min(maxTop, top))
				};
			},
			containment: "parent", opacity: 0.5, scroll: false, distance: 5, helper: "clone", zIndex: 1
		});
	}
	
	$(window).resize(function(){
		scaleOverlay();
	});
	
	scaleOverlay();
	loadOverlay();
	
});