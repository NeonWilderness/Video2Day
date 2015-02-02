#Video2Day - bringing Video to Twoday

Full German documentation and demo [here](http://cdn.twoday.net/stories/videoplayer).

##Features
This jQuery Script enables easy video integration for blogs on the [Twoday Blogger Platform](http://twoday.net). The Twoday Platform does currently not support modern HTML5 (e.g. no ```data-xxx``` attributes) and prohibits utilization of ```iframe```-tags which are filtered from a story's text/code content. Therefore the syntax uses simple, HTML4-compatible DIV-classes which tell the script to inject the correct iframe/object-tag for the desired target video.

**Video2day** generates appropriate ```iframe``` or ```object``` declarations for video service providers such as **YouTube**, **Vimeo**, **Vevo**, **BlipTV**, **DailyMotion**, **Putpat** and supports video integration of **any cloud-hosted MP4 file** (e.g. Wuala, Dropbox, GoogleDrive or other direct URL sources) by inserting valid HTML-code for the widely known [HTML5 Video Player](http://www.videojs.com/) script.

The DIV triggering the video code must carry the special class **"html5video"** and makes use of further class additions to define the target video platform, the video dimensions and poster information (if any).

The script is not limited to the Twoday application and can basically be used on any (blogger) platform that allows to embed individual scripts but prohibits the direct use of iframes.

##Getting started
###A. Scripts & CSS
####jQuery
Twoday Bloggers need to activate the standard jQuery module at _Admin_ &rarr; _Module_ &rarr; _Extension Module_ &rarr; _jQuery Integration_.

Other script users need to make sure that the latest jQuery script is being loaded prior to embedding the video2day script:

    <script src="http://code.jquery.com/jquery-latest.min.js"></script>

####Video2Day.js
Then, after the jQuery, embed the following script-tag at the end of your HTML's body-tag

    <script src="http://static.twoday.net/cdn/files/video2day-min-js.js"></script>
    <script type="text/javascript">
         $(document).ready(function(){
             $(".html5video").video2day().init();
         });
    </script>

The following script-parameters are available:

 Parameter | Description | Default
 --------- | ----------- | -------
 addFlexVideoClass | true=adds class "flex-video" to surrounding DIV (Foundation 5: responsive video layout) | true
 position | video insert position  | "bottom" (appended in DIV); can be "top" (prepended in DIV)
 
Example: If you want the "flex-video" class to be added only in the event that Foundation 5 is active, you can specify the following:

    <script type="text/javascript">
         $(document).ready(function(){
             $(".html5video").video2day().init({ addFlexVideoClass: (typeof($.fn.foundation)!=="undefined") });
         });
    </script>

####Video.js
Only in the event that you want to show off MP4-videos that are **not** hosted on YouTube, Vimeo, Vevo, BlipTV or DailyMotion, you need to add the CSS and script additions for the video.js component. Those are also available from the Twoday CDN:

    <link href="http://static.twoday.net/cdn/files/video43-min-css.css" rel="stylesheet">
    <script src="http://static.twoday.net/cdn/files/video43-min-js.js"></script>

For using video.js outside the Twoday platform, you may also like to utilize its standard CDN:

    <link href="//vjs.zencdn.net/4.3/video-js.css" rel="stylesheet">
    <script src="//vjs.zencdn.net/4.3/video.js"></script>

According to the [video.js setup instructions](https://github.com/videojs/video.js/blob/stable/docs/guides/setup.md), you should put both links into your HTML's head area.

###B. The HTML

Use any of the DIV tags below within your blog text content to display the desired type of video

* e.g. for YouTube:<br>
`<div class="html5video youtube width-xxx ratio-x.yyyy" id="youtubevideoid"></div>`
* for Other (video.js needed):<br>
`<div class="html5video other width-xxx ratio-x.yyyy poster image-xxx" id="URLtotargetMP4file"></div>`

If you don't specify a **width**, the video uses the full width of its parent DIV container. You don't need to specify an aspect **ratio** unless you want a different formfactor than 16:9. The available parameters are:

 Parameter | Description
 --------- | -----------
 html5video | trigger class for the script to embed a video into this DIV
 youtube | generates a YouTube-iframe
 vimeo | generates a Vimeo-iframe
 vevo | generates a Vevo-iframe
 bliptv | generates a BlipTV-iframe
 dailymotion | generates a DailyMotion-iframe
 putpat | generates a Putpat-iframe
 vube | generates a Vube-iframe
 liveleak | generates a Liveleak-iframe
 vine | generates a Vine-iframe
 metacafe | generates a Metacafe-iframe
 other | generates a video link to a MP4-file hosted in a public cloud directory (e.g. GoogleDrive, Dropbox or other)
 width-xxx | reserves a width of xxx pixels for the video (default is the width of the parent DIV)
 ratio-x.yyyy | defines an aspect ratio which is used to calculate the height of the video container (default is 16:9 = 1.7778)
 poster | "Other" only: instructs the script to use a poster image for a cloud-hosted video (until the video is started)
 image-xxx | "Other" only: instructs the script to use the image extension xxx when looking for the poster image (same name as video file)

##Real life examples:
* for a YouTube video:<br>
`<div class="html5video youtube" id="DyfM7oLIlp0"></div>`
* same with fixed initial size:<br>
`<div class="html5video youtube width-250" id="DyfM7oLIlp0"></div>`
* for a Vimeo video:<br>
`<div class="html5video vimeo" id="64403137"></div>`
* same with 4:3 aspect ratio:<br>
`<div class="html5video vimeo ratio-1.3333" id="64403137"></div>`
* for a Vevo video:<br>
`<div class="html5video vevo ratio-1.7747" id="GBUV71300569"></div>`
* for a BlipTV video:<br>
`<div class="html5video bliptv ratio-1.6628" id="AYOVjyIC.x"></div>`
* for a DailyMotion video:<br>
`<div class="html5video dailymotion" id="xbnwt9"></div>`
* for a Putpat video:<br>
`<div class="html5video putpat ratio-2.4" id="3qs5vhn"></div>`
* with widescreen & poster:<br>
`<div class="html5video other poster image-jpg ratio-2.421" id="https://googledrive.com/host/0B87rILW4RVIJUFpWT2dLeG9RUzg/oceans-clip.mp4"></div>`