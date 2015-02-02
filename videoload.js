(function(){ "use strict";

//- check if site contains any video DIVs
var siteVideos = document.querySelectorAll(".html5video"), siteHasVideos = (siteVideos.length>0);

//- quit if no video refs found
if (!siteHasVideos) return false;

//- load yepnope async if not already active
if (typeof yepnope==="undefined"){
    var head = document.getElementsByTagName("head")[0], yn = document.createElement('script');
    yn.type = "text/javascript";
    yn.src = "http://static.twoday.net/cdn/files/yepnope154-min-js.js";
    yn.onload = yepnopeIsLoaded;
    head.appendChild(yn);
} else {
    yepnopeIsLoaded();
}

//- called when yepnope becomes available
function yepnopeIsLoaded(){
    yepnope(
        { test: (typeof jQuery === 'undefined'),
          yep: 'http://static.twoday.net/sys.files/js/jquery/jquery.min.js',
          complete: function(){
			var $videos = $(siteVideos);
			yepnope([
			{ load: 'http://static.twoday.net/cdn/files/video2day-min-js.js',
			  complete: function(){ $videos.video2day().init( {addFlexVideoClass: (typeof $.fn.foundation !== 'undefined')} ); }
			},
			{ test: $videos.hasClass("other"),
			  yep: [ 'http://static.twoday.net/cdn/files/video43-min-css.css', 'http://static.twoday.net/cdn/files/video43-min-js.js' ]
			} ]);
          }
        }
    );
}
})();