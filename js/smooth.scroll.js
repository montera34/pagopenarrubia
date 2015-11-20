var win = $(window);
var winHeight = win.height();
var hashIni = location.hash;
var toAnimate = $('html, body');
//var toAnimate = $(window);

// fadein current band and fadeout the rest
function showBandContent(hash) {
	elId = $("a[href='#"+hash+"']").get(0).getAttribute('data-menuanchor');
	$(".section-text").fadeOut();
	$("#"+elId+" .section-text").fadeIn(1400);
}

// change hash and active element function
function changeHash(hash) {
	hash = hash.replace(/^#/,"");
	window.location.hash = hash;
	$(".active").removeClass("active");
	$("a[href='#"+hash+"']").parent().addClass('active');
	showBandContent(hash);
}

// scroll function
function pnrScroll(el,hash,eventType) {
	hash = hash.replace(/^#/,"");
	elOffset = $(el).offset().top;
	elHeight = $(el).height();
	if ( eventType == 'resize' ) { winHeight = $(window).height(); }
	offset = elOffset + (elHeight /2) - (winHeight /2);
	// animate
	if ( eventType == 'noFnAfter' || eventType == 'resize' ) {
//		toAnimate.animate({
//			scrollTop: offset
//			}, 1200);
		toAnimate.scrollTo(offset,1200);
	} else {
//		toAnimate.animate({
//			scrollTop: offset
//			}, 1200, changeHash(hash));
		toAnimate.scrollTo(offset,1200,{onAfter:changeHash(hash)});
	}
};

$(document).ready(function() {

	// hide bands
	$(".section-text").hide();

	// Add margin to main container in huge screens
	if ( win.width() > 1280 ) {
		$("#fullpage").addClass("height-corrective");
	}

	// click event
	$("#pre a[href^='#']").on('click', function(e) {
		e.preventDefault();
		element = document.getElementById(e.target.getAttribute('data-menuanchor'));
		hash = e.target.getAttribute('href');
		pnrScroll(element,hash,"noFnAfter");
	});

	// window load event
	win.load(function() {
		if ( hashIni == '' ) { hashIni = '#inicio'; }
		element = document.getElementById($("a[href='"+hashIni+"']").get(0).getAttribute('data-menuanchor'));
		pnrScroll(element,hashIni);
	});

	// window resize event
	$(window).resize(function() {
		if(this.resizeTO) clearTimeout(this.resizeTO);
		this.resizeTO = setTimeout(function() {
			$(this).trigger('resizeEnd');
		}, 500);
	});
	$(window).bind("resizeEnd", function() {
		hashNow = location.hash;
		el = document.getElementById($("a[href='"+hashNow+"']").get(0).getAttribute('data-menuanchor'));
		pnrScroll(el,hashNow,"resize");

		if ( win.width() > 1280 ) {
			$("#fullpage").addClass("height-corrective");
		}

	});

	// window scroll event
	win.scroll(function () {
		// current hash and band
		hashNow = location.hash;
		el = document.getElementById($("a[href='"+hashNow+"']").get(0).getAttribute('data-menuanchor'));
		elOffset = $(el).offset().top;

		// prev hash and band
		if ( hashNow === '#inicio' ) {
			prevHash = "#inicio";
			prevEl = document.getElementById($("a[href='"+hashNow+"']").get(0).getAttribute('data-menuanchor'));
		} else {
			prevHash = $("a[href='"+hashNow+"']").parent().prev().children('a').get(0).getAttribute('href');
			prevEl = document.getElementById($("a[href='"+hashNow+"']").parent().prev().children("a").get(0).getAttribute('data-menuanchor'));
		}

		// next hash and band
		if ( hashNow === '#contacto' ) {
			nextHash = "#contacto";
			nextEl = document.getElementById($("a[href='"+hashNow+"']").get(0).getAttribute('data-menuanchor'));
		} else {
			nextHash = $("a[href='"+hashNow+"']").parent().next().children('a').get(0).getAttribute('href');
			nextEl = document.getElementById($("a[href='"+hashNow+"']").parent().next().children("a").get(0).getAttribute('data-menuanchor'));
		}
		nextElOffset = $(nextEl).offset().top;

		var offsetToPrev = elOffset - (winHeight /2);
		var offsetToNext = nextElOffset - (winHeight /2);
		if ( win.scrollTop() < offsetToPrev && prevHash !== hashNow ) {
			changeHash(prevHash);
		}
		if ( win.scrollTop() > offsetToNext && nextHash !== hashNow ) {
			changeHash(nextHash);
		}
	});

	// mouse wheel events
	$('html').on('mousewheel', function(event) {
		// scroll down
		if ( event.deltaY < 0 ) {
			if ( hashNow != '#contacto' ) {
				nextHash = $(".active").next().children('a').get(0).getAttribute('href');
				nextElement = document.getElementById($(".active").next().children("a").get(0).getAttribute('data-menuanchor'));
				pnrScroll(nextElement,nextHash,"noFnAfter");	
			}
		}
		// scroll up
		if ( event.deltaY > 0 ) {
			if ( hashNow != '#inicio' ) {
				prevHash = $(".active").prev().children('a').get(0).getAttribute('href');
				prevElement = document.getElementById($(".active").prev().children("a").get(0).getAttribute('data-menuanchor'));
				pnrScroll(prevElement,prevHash,"noFnAfter");
			}

		}
	});
	// keypress events
	$(document).keydown(function(e) {
		hashNow = location.hash;
		switch(e.which) {
//			case 37: // left
//			break;

			case 38: // up
			if ( hashNow != '#inicio' ) {
				prevHash = $(".active").prev().children('a').get(0).getAttribute('href');
				prevElement = document.getElementById($(".active").prev().children("a").get(0).getAttribute('data-menuanchor'));
				pnrScroll(prevElement,prevHash,"noFnAfter");
			}
			break;

//			case 39: // right
//			break;

			case 40: // down
			if ( hashNow != '#contacto' ) {
				nextHash = $(".active").next().children('a').get(0).getAttribute('href');
				nextElement = document.getElementById($(".active").next().children("a").get(0).getAttribute('data-menuanchor'));
				pnrScroll(nextElement,nextHash,"noFnAfter");	
			}
			break;

			default: return; // exit this handler for other keys
		}
		e.preventDefault(); // prevent the default action (scroll / move caret)
	});

});
