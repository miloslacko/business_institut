$(function() {

	window.scrollTo = function(element, duration) {
		$('html, body').animate({
        	scrollTop: $(element).offset().top
	    }, duration);
	}

	// Main menu
	$.fn.smartmenus.defaults.showOnClick = true;
	initializeBootstrapSmartMenus();

	// Allow to access contact block by URL hash "#kontakt"
	$(window).on('hashchange', function() {
		if (window.location.hash.substr(1) == "kontakt")
		{
			var href = $("#kontakt [data-toggle]").removeClass("collapsed").attr("aria-expanded", "true").attr("href");
			$(href).addClass("in").css("height", "auto");
			scrollTo("#kontakt", "slow");
		}
	}).trigger("hashchange");

	// Readmore
	$('.nazory .readmore').each(function(e) {
		$(this).readmore({
			moreLink: '<a href="#">Zobrazit více</a>',
			lessLink: '<a href="#">Skrýt</a>',
			collapsedHeight: 150,
		});
	});

	// Resize images
	$('img[data-maxWidth][data-maxHeight]:not(.resized)').each(function()
	{
	    var width;
	    var height;
	    var img = $(this);

	    img.hide();
	    img.removeClass('loaded');

	    $("<img/>")
	        .attr("src", $(this).attr("src"))
	        .load(function()
	        {
	            width = this.width;
	            height = this.height;

	            $(this).css({width: 'auto!important', height: 'auto!important'});
	            $(this).removeAttr('width');
	            $(this).removeAttr('height');

	            var widthRatio = img.data().maxwidth / width;
	            var heightRatio = img.data().maxheight / height;

	            var resizeRatio = (widthRatio < heightRatio) ? widthRatio : heightRatio;

	            width = width * resizeRatio;
	            height = height * resizeRatio;

	            img.width(Math.floor(width));
	            img.height(Math.floor(height));

	            img.addClass('loaded resized');

	            img.show();
	        });
	});

});