#Video2Day - bringing Video to Twoday

Full German documentation and demo [here](http://neonwilderness.twoday.net/stories/twoday-tipp-8-videos-anzeigen/).

##Features
This Script enables easy video integration for blogs on the [Twoday Blogger Platform](http://twoday.net). The Twoday Platform does currently not support modern HTML5 (e.g. no ```data-xxx``` attributes) and prohibits utilization of ```iframe```-tags which are filtered from a story's text/code content. Therefore the syntax uses simple, compatible DIV-classes which tell the script to inject the appropriate iframe-tag for the desired target video.

**VideoLoad** generates appropriate ```iframe``` declarations for the largest video service providers such as **YouTube**, **Vimeo**, **Vevo**, **DailyMotion** and various others (see list of currently supported providers in the doc/demo link) and supports video integration of **any cloud-hosted MP4 file** (e.g. Dropbox, GoogleDrive or other direct URL sources) by inserting valid HTML-code for the widely used [HTML5 Video Player](http://www.videojs.com/) script.

The DIV triggering the video code must carry the special class **"html5video"** and makes use of further class additions to define the target video platform, the video dimensions and poster information (if any).

The script is not limited to the Twoday application and can basically be used on any (blogger) platform that allows to embed individual scripts but prohibits the direct use of iframes.

##Getting started
###A. Scripts
####jQuery Script
jQuery is required to be loaded. If it isn't loaded yet, the videoload script takes over to inject it automatically before moving on.

####VideoLoad Script
Embed the following script-tag at the end of your HTML's body-tag

    <script src="http://static.twoday.net/cdn/files/videoload-min-js.js"></script>

###B. The HTML

see documention/demos for instructions on how to write the html to embed a video: [here](http://neonwilderness.twoday.net/stories/twoday-tipp-8-videos-anzeigen/).
