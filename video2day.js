;(function($) { "use strict";

    $.fn.video2day = function(){
        var $videos = this,
            video2dayObj = {
                version: "0.3",
                defaults: {
                    'addFlexVideoClass': true, // true=Adds class "flex-video" to surrounding DIV (Foundation 5: enables responsive video layout)
                    'wualaSourceURL': "http://www.wuala.com", // Wuala Source URL
                    'wualaDirectURL': "http://content.wuala.com/contents" // Wuala Direct URL
                },
                vidParam : {
                    youtube: '<iframe width="{w}" height="{h}" src="http://www.youtube.com/embed/{v}" frameborder="0" allowfullscreen></iframe>',
                    vimeo: '<iframe width="{w}" height="{h}" src="http://player.vimeo.com/video/{v}?byline=0&amp;portrait=0" frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
                    vevo: '<iframe width="{w}" height="{h}" src="http://cache.vevo.com/m/html/embed.html?video={v}" frameborder="0" allowfullscreen></iframe>',
                    bliptv: '<iframe width="{w}" height="{h}" src="http://blip.tv/play/{v}?p=1" frameborder="0" allowfullscreen></iframe>',
                    dailymotion: '<iframe width="{w}" height="{h}" src="http://www.dailymotion.com/embed/video/{v}" frameborder="0" allowfullscreen></iframe>',
                    putpat: '<iframe width="{w}" height="{h}" src="http://www.putpat.tv/iframe/videos/{v}" frameborder="0" allowfullscreen></iframe>'
                },
                init: function(useroptions){
//----------------- Take over user options, if any
                    var options = $.extend( {}, video2dayObj.defaults, useroptions || {} ),
                        vidTypes = Object.keys(video2dayObj.vidParam).concat("other"),
                        self, html, width, height, vid, ratio, vidType, hasPoster, imageExt;
//----------------- For each of the html5video-instances...
                    $videos.each( function(){
//--------------------- Establish default values for each video (may be overwritten by class settings)
                        self = $(this);
                        html = "";
                        width = self.parents("div").width();
                        ratio = 16/9;
                        vidType = "";
                        hasPoster = false;
                        imageExt = "jpg";
//--------------------- Analyze class names: split class specs to array and process each single class
                        var classList = self.attr('class').toLowerCase().split(/\s+/);
                        $.each( classList, function(index, item){
                            switch(item.substr(0,6)){
//------------------------- User specified explicit width parameter
                            case "width-":
                              width = parseInt(item.substr(6,item.length-6), 10);
                              break;
//------------------------- User specified explicit aspect ratio (e.g. 4:3 as 1.3333, 16:9 as 1.7777, Widescreen 2.4:1 as 2.4)
                            case "ratio-":
                              ratio = parseFloat(item.substr(6,item.length-6));
                              break;
//------------------------- User wants a poster image to be displayed on the video before it starts playing
                            case "poster":
                              hasPoster = true;
                              break;
//------------------------- User specified poster image file type other than standard jpg
                            case "image-":
                              imageExt = item.substr(6,item.length-6);
                              break;
                            default:
                              if (vidTypes.indexOf(item)>=0){ vidType = item; }
                            }
                        });
//--------------------- Calculate height based on specified ratio (Default is 16/9)
                        height = Math.round(width/ratio);
//--------------------- Get the video-ID (YouTube, Vimeo, Vevo, BlipTV) or the File Link
                        vid = self.attr("id") || "";
//--------------------- Did user correctly specify the video id?
                        if (vid.length===0){
//------------------------- No, then prepare error text
                            html = '<p class="message">Bitte die Video-ID bzw. -URL im Parameter "id" ergänzen!</p>';
//--------------------- Did user correctly specify a valid video type?
                        } else  if (vidType.length===0){
//------------------------- No, then prepare error text
                            html = '<p class="message">Bitte '+vidTypes.join(", ")+' im class-Parameter "' + self.attr('class') + '" ergänzen!</p>';
                        } else if (vidType==="other"){
//------------------------- Generate the HTML5 player action with a hosted cloud mp4 file (e.g. Wuala, Dropbox); apply Wuala direct URL conversion
                              vid = vid.replace(options.wualaSourceURL, options.wualaDirectURL);
                              var poster = (hasPoster) ? ' poster="' + vid.substr(0,vid.lastIndexOf(".")+1) + imageExt + '"' : "";
                              html = '<video class="video-js vjs-default-skin" controls preload="auto" width="' + width + '" height="' + height + '" data-setup="{}"' + poster + '><source src="' + vid + '" type="video/mp4"></video>';
                        } else {
//----------------------- Generate the YouTube/Vimeo/Vevo/BlipTV video embed code
                          html = video2dayObj.vidParam[vidType].replace(/{w}/gi,width).replace(/{h}/gi,height).replace(/{v}/gi,vid);
                        }
//--------------------- Add "flex-video" responsive class in case Foundation5 is used
                        if (options.addFlexVideoClass){
                            if (!self.hasClass("flex-video")){ self.addClass("flex-video"); }
                        }
//--------------------- Push the iframe/object into the HTML (div)
                        self.append(html);
                    });
//----------------- Enable jQuery chaining
                    return $videos;
                }
            };
        return {
            init: video2dayObj.init
        };
    };
})(jQuery);