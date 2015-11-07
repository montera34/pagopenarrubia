var win = $(window);
var winHeight = win.height();
var hashNow = location.hash;
var toAnimate = $('html, body');

// scroll function
function pnrScroll(el,hash) {
	hash = hash.replace(/^#/,"");
	var elOffset = $(el).offset().top;
	var elHeight = $(el).height();
	var offset = elOffset + (elHeight /2) - (winHeight /2);
	// animate
	toAnimate.animate({
		scrollTop: offset
		}, 500, function(){
			// when done, add hash to url
			// (default click behaviour)
			window.location.hash = hash;
			$(".active").removeClass("active");
			$("a[href='#"+hash+"']").parent().addClass('active');
		}
	);
};

$(document).ready(function() {

	// click event
	$("#pre a[href^='#']").on('click', function(e) {
		e.preventDefault();
		element = document.getElementById(e.target.getAttribute('data-menuanchor'));
		hash = e.target.getAttribute('href');
		pnrScroll(element,hash);
	});

	// window load event
	win.load(function() {
		if ( hashNow == '' ) { hashNow = '#inicio'; }
		element = document.getElementById($("a[href='"+hashNow+"']").get(0).getAttribute('data-menuanchor'));
		pnrScroll(element,hashNow);
	});

});
