;(function($) { "use strict";

    $.fn.video2day = function(){
        var $videos = this,
            video2dayObj = {
                version: "0.5",
                defaults: {
                    'addFlexVideoClass': false, // true=Adds class "flex-video" to surrounding DIV (Foundation 5: enables responsive video layout)
                    'position': 'bottom' // target position of video: "top"=prepend=video at top, "bottom"=append=video at bottom
                },
                vidFrame: '<iframe width="{w}" height="{h}" src={p} frameborder="0" allowfullscreen></iframe>',
                vidParam : {
                    youtube:     '"//www.youtube.com/embed/{v}"',
                    vimeo:       '"//player.vimeo.com/video/{v}"',
                    vevo:        '"http://cache.vevo.com/assets/html/embed.html?video={v}&autoplay=0"',
                    bliptv:      '"http://blip.tv/play/{v}?p=1"',
                    dailymotion: '"//www.dailymotion.com/embed/video/{v}"',
                    putpat:      '"http://www.putpat.tv/iframe/videos/{v}"',
                    vube:        '"http://vube.com/embed/video/{v}?autoplay=false&fit=true"',
                    liveleak:    '"http://www.liveleak.com/ll_embed?f={v}"',
                    vine:        '"https://vine.co/v/{v}/embed/postcard"',
                    metacafe:    '"http://www.metacafe.com/embed/{v}/"'
                },
                errmsg: function(content){
                    return '<p class="message">'+content+'</p>';
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
                        width = self.parents().width();
                        ratio = 16/9;
                        vidType = "";
                        hasPoster = false;
                        imageExt = "jpg";
//--------------------- Analyze class names: split class spec to array and process each single class
                        var classList = self.attr('class').toLowerCase().split(/\s+/);
                        $.each( classList, function(){
                            switch(this.substr(0,6)){
//------------------------- User specified explicit width parameter
                            case "width-":
                              width = parseInt(this.substr(6,this.length-6), 10);
                              break;
//------------------------- User specified explicit aspect ratio (e.g. 4:3 as 1.3333, 16:9 as 1.7777, Widescreen 2.4:1 as 2.4)
                            case "ratio-":
                              ratio = parseFloat(this.substr(6,this.length-6));
                              break;
//------------------------- User wants a poster image to be displayed on the video before it starts playing
                            case "poster":
                              hasPoster = true;
                              break;
//------------------------- User specified poster image file type other than standard jpg
                            case "image-":
                              imageExt = this.substr(6,this.length-6);
                              break;
                            default:
                              if (vidTypes.indexOf(this)>=0) vidType = this;
                            }
                        });
//--------------------- Calculate height based on specified ratio (Default is 16/9)
                        height = Math.round(width/ratio);
//--------------------- Get the video-ID or the file url
                        vid = self.attr("id") || "";
//--------------------- Did user correctly specify the video id?
                        if (vid.length===0){
//------------------------- No, then prepare error text
                            html = video2dayObj.errmsg('Bitte die Video-ID bzw. -URL im Parameter "id" ergänzen!');
//--------------------- Did user correctly specify a valid video type?
                        } else  if (vidType.length===0){
//------------------------- No, then prepare error text
                            html = video2dayObj.errmsg('Bitte '+vidTypes.join(", ")+' im class-Parameter "' + self.attr('class') + '" ergänzen!');
                        } else if (vidType==="other"){
//------------------------- Generate the HTML5 player action with a hosted cloud mp4 file
                              var poster = (hasPoster) ? ' poster="' + vid.substr(0,vid.lastIndexOf(".")+1) + imageExt + '"' : "";
                              html = '<video class="video-js vjs-default-skin" controls preload="auto" width="' + width + '" height="' + height + '" data-setup="{}"' + poster + '><source src="' + vid + '" type="video/mp4"></video>';
                        } else {
//----------------------- Generate the YouTube/Vimeo/Vevo/BlipTV video embed code
                            html = video2dayObj.vidFrame
                                .replace(/{w}/gi, width)
                                .replace(/{h}/gi, height)
                                .replace(/{p}/gi, video2dayObj.vidParam[vidType].replace(/{v}/gi,vid));
                        }
//--------------------- Add "flex-video" responsive class in case Foundation5 is used
                        if (options.addFlexVideoClass) self.addClass("flex-video");
//--------------------- Push the iframe/object into the HTML (div)
                        if (options.position.toLowerCase()==="top") self.prepend(html); else self.append(html);
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