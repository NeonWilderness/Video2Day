#Video2Day - bringing Video to Twoday

Full German documentation [here](http://cdn.twoday.net/stories/videoplayer).

##Features
This jQuery Script enables easy video integration for blogs on the [Twoday Blogger Platform](http://twoday.net). The Twoday Platform does currently not support modern HTML5 (e.g. no ```data-xxx``` attributes) and prohibits the utilization of ```iframe```-tags which are filtered from a story's text/code content.

The ```video2day```-script generates appropriate ```iframe``` or ```object``` declarations for video service providers such as **YouTube**, **Vimeo**, **Vevo**, **BlipTV** and supports video integration of **any cloud-hosted MP4 file** (e.g. Wuala, Dropbox, GoogleDrive or other direct URL sources) by inserting valid HTML-code for the widely known [HTML5 Video Player](http://www.videojs.com/) script.

The DIV triggering the integration of the video embed code utilizes the special class **"html5video"** and makes use of further class additions to define the target video platform, the video dimension and poster information.

##Getting started
1. Embed the following script and css references in your HTML's head tag
        ```<link href="http://static.twoday.net/cdn/files/video41-min-css.css" rel="stylesheet">\n
        <script src="http://static.twoday.net/cdn/files/video41-min-js.js"></script>\n
        <script src="http://static.twoday.net/cdn/files/video2day-min-js.js"></script>```

2. Use the DIV tags below within your blog text content to display the desired type of video
   * for YouTube:
        ```<div class="html5video youtube width-xxx ratio-x.yyyy" id="youtubevideoid"></div>```
   * for Vimeo:
        ```<div class="html5video vimeo width-xxx ratio-x.yyyy" id="vimeovideoid"></div>```
   * for BlipTV:
        ```<div class="html5video bliptv width-xxx ratio-x.yyyy" id="bliptvvideoid"></div>```
   * for Other:
        ```<div class="html5video other width-xxx ratio-x.yyyy poster image-xxx" id="URLtofile"></div>```

    Parameter | Description
    --------- | -----------
    html5video | is the core trigger for the javascript to generate a video link
    youtube | instructs the script to generate a YouTube-Link
    vimeo | instructs the script to generate a Vimeo-Link
    bliptv | instructs the script to generate a BlipTV-Link
    other | instructs the script to generate a Video-Link to a file hosted in a public cloud directory (e.g. Wuala, Dropbox or other)
    width-xxx | reserves a width of xxx pixels for the video (default is the width of the parent DIV)
    ratio-x.yyyy | defines an aspect ratio which is used to calculate the height of the video container (default is 16:9 = 1.7777)
    poster | "Other" only: instructs the script to use a poster image for a cloud-hosted video (until the video is started)
    image-xxx | "Other" only: instructs the script to use the image extension xxx when looking for the poster image (same name as video file)

##Examples:
   * for a YouTube video:
        ```<div class="html5video youtube" id="DyfM7oLIlp0"></div>```
   * same with fixed size:
        ```<div class="html5video youtube width-250" id="DyfM7oLIlp0"></div>```
   * for a Vimeo video:
        ```<div class="html5video vimeo" id="64403137"></div>```
   * same with 4:3 aspect:
        ```<div class="html5video vimeo ratio-1.3333" id="64403137"></div>```
   * for a BlipTV video:
        ```<div class="html5video bliptv ratio-1.6628" id="AYOVjyIC.x"></div>```
   * for a Wuala video:
        ```<div class="html5video other" id="http://www.wuala.com/NeonWilderness/Public/movies/oceans-clip.mp4"></div>```
   * with widescreen & poster:
        ```<div class="html5video other poster image-jpg ratio-2.4" id="http://www.wuala.com/NeonWilderness/Public/movies/oceans-clip.mp4"></div>```