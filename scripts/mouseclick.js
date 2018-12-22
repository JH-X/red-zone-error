$( window ).on( "load", function() {
	
	
	$(".icons").children().each(function() {
		selectedIcons[$(this).attr('id')] = false;
	});
	
	$("#icon-computer").click(function(){
		switchToVideo();
	});
	
	animateButton($("#start-button"), $("#start-button-hover"), $("#start-button-clicked"));
	animateIconHighlight("icon-computer");
	animateIconHighlight("icon-recycle");
	outsideClick();

});

function switchToVideo() {

	var counter = 0;
	var timeLoop = setInterval(vLoop, 500)
	
	player.mute();
	player.seekTo(seconds=3, allowSeekAhead=true);
	
	function vLoop() {
		if (player.getCurrentTime() >= 6) {
			player.unMute();
			hideOverlay();
			clearInterval(timeLoop);
		}
		
		if (counter > 20) {
			clearInterval(timeLoop);
			console.log("hit counter 20");
		}
		counter++;
	}
}

function hideOverlay() {
	$(".videoMask").hide();
	resetAllIcons();
	$("body").css('cursor', 'none');
	$(".overlayWrapper").children().fadeOut();
}

function showOverlay() {
	$(".videoMask").show();
	$("body").css('cursor', '');
	$(".overlayWrapper").children().fadeIn();
}

function animateButton(idParent, idHover, idClicked, fadeRate=500) {
	
	idParent.mouseover(function() {
		idHover.stop();
		idHover.fadeTo(fadeRate, 1);
	});
	
	idParent.mouseleave(function() {
		idHover.stop();
		
		if (idClicked.css('opacity') == 1) {
			idClicked.fadeTo(fadeRate, 0);
			idHover.css('opacity', 0);
		}
		else {
			idHover.fadeTo(fadeRate, 0);
		}
	});
	
	idParent.mousedown(function() {
		if (idClicked.css('opacity') == 0) {
			idHover.stop();
			idHover.css('opacity', 0);
			idClicked.css('opacity', 1);
		}
	});
	
	idParent.mouseup(function() {
		if (idClicked.css('opacity') == 1) {
			idHover.stop();
			idHover.css('opacity', 1);
			idClicked.css('opacity', 0);
		}
	});
}

var selectedIcons = {};

function animateIconHighlight(idIcon) {
	
	var iconEl = $("#" + idIcon + " .icon-box");
	
	iconEl.mouseover(function() {
		var iconParent = $(this).parent();
		var iconHighlight = iconParent.children(".highlight");
		if (!selectedIcons[iconParent.attr('id')]) { // Not selected.
			hoverHighlight(iconHighlight);
		}
		else if (selectedIcons[iconParent.attr('id')]) { // Selected.
			selectHighlight(iconHighlight);
		}
	});
	
	iconEl.mouseleave(function() {
		var iconParent = $(this).parent();
		var iconHighlight = iconParent.children(".highlight");
		if (!selectedIcons[iconParent.attr('id')]) { // Not selected.
			removeHighlight(iconHighlight);
		}
		else if (selectedIcons[iconParent.attr('id')]) { // Selected.
			hotSelectHighlight(iconHighlight);
		}
	});
	
	iconEl.mousedown(function() {
		var iconParent = $(this).parent();
		var iconHighlight = iconParent.children(".highlight");
		
		$.each(selectedIcons, function(key, value) {
			if (key == iconParent.attr('id')) {
				selectedIcons[iconParent.attr('id')] = true;
				selectHighlight(iconHighlight);
			}
			else if (value){
				selectedIcons[key] = false;
				var otherIconHighlight = $("#" + key + " .highlight");
				removeHighlight(otherIconHighlight);
			}
		});
	});
	
	
}

function hoverHighlight(highlightEl) {
	highlightEl.css('background-color', 'rgba(102, 204, 255, 0.5)');
	highlightEl.css('border-style', 'solid');
}

function selectHighlight(highlightEl) {
	highlightEl.css('background-color', 'rgba(102, 204, 255, 0.75)');
	highlightEl.css('border-style', 'solid');
}

function hotSelectHighlight(highlightEl) {
	highlightEl.css('background-color', 'rgba(102, 204, 255, 0.90)');
	highlightEl.css('border-style', 'solid');
}

function removeHighlight(highlightEl) {
	highlightEl.css('background-color', '');
	highlightEl.css('border-style', 'hidden');
}

function selectIcon(idIcon) {
	idIcon.css('--selected', true);
}

function resetAllIcons() {
	$.each(selectedIcons, function(key, value) {
		selectedIcons[key] = false;
		removeHighlight($("#" + key + " .highlight"));
	});
}

function outsideClick() {
	$(document).mouseup(function (e) {
		
		var iconName = $(e.target).closest(".icon").attr('id');
		
		$.each(selectedIcons, function(key, value) {
			if (key != iconName) {
				selectedIcons[key] = false;
				removeHighlight($("#" + key + " .highlight"));
			}
			
		});
	});
}








































