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
		
		var scaleString = "translate(-50%, -50%) " + "scale(" + scale + ")";
		
		$overlayContainer.css({
			'-webkit-transform': scaleString,
			'-moz-transform': scaleString,
			'-o-transform': scaleString,
			'-ms-transform': scaleString,
			'transform': scaleString
		});
	}
	
	function loadOverlay() {
		
		$overlayContainer.css({'display': 'inline'});
		
		$(window).ready(function() {
			setDraggable("icon-computer");
			setDraggable("icon-recycle");
			setDroppable("icon-computer");
			setDroppable("icon-recycle");
		});
	}
	
	function setDraggable(idIcon) {
		
		var draggableEl = $("#" + idIcon + " .icon-box");
		
		var click = {x:0, y:0};
		var minLeft = parseFloat($overlayContainer.css("paddingLeft"));
		var minTop = parseFloat($overlayContainer.css("paddingTop"));
		var maxLeft = minLeft + $overlayContainer.width() - draggableEl.outerWidth();
		var maxTop = minTop + $overlayContainer.height() - draggableEl.outerHeight();
		
		draggableEl.draggable({
			
			start: function(event) {
				click.x = event.clientX;
				click.y = event.clientY;
			},
			
			drag: function(event, ui) {
				
				var original = ui.originalPosition;
				var left = (event.clientX - click.x + original.left) / scale;
				var top = (event.clientY - click.y + original.top) / scale; 
				
				ui.position = {
					//left: Math.max(minLeft, Math.min(maxLeft, left)),
					//top: Math.max(minTop, Math.min(maxTop, top))
					left: left,
					top: top
				};
			},
			
			opacity: 0.5, scroll: false, helper: "clone", distance: 5, zIndex: 2
		});
	}
	
	function setDroppable(idIcon) {
		
		$("#" + idIcon + " .icon-box").droppable({
			
			tolerance: "pointer",
			
			over: function(event, ui) {
				hotSelectHighlight($(this).next());
			},
			
			out: function(event, ui) {
				removeHighlight($(this).next());
			},
			
			drop: function(event, ui) {
				removeHighlight(ui.draggable.next());
				selectedIcons[ui.draggable.parent().attr('id')] = false;
			}
		});
	}
	
	$(window).resize(function(){
		scaleOverlay();
	});
	
	scaleOverlay();
	loadOverlay();
	
});