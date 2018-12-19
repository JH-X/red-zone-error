$( window ).on( "load", function() {
	
	$("#icon-computer").click(function(){
		switchToVideo();
	});
	
	animateButton($("#start-button"), $("#start-button-hover"), $("#start-button-clicked"));

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
	$(".overlayWrapper").children().fadeOut();
}

function showOverlay() {
	$(".videoMask").show();
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
