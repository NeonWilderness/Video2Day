$(function(){
    var demoVideoIDs = {
        youtube: { id: "DyfM7oLIlp0", cls: "", text: "The Magic Box (Short Film)" },
        vimeo: { id: "14848816", cls: "", text: "The Absence (Short Film)" },
        vevo: { id: "GBUV71300569", cls: "", text: "Jake Bugg - Broken" },
        dailymotion: { id: "x1zb68h", cls: "", text: "Fink - Looking Too Closely (unplugged)" },
        putpat: { id: "3qs5vhn", cls: "ratio-2.4", text: "Two Door Cinema Club - Undercover Martyn" },
        bliptv: { id: "AYOVjyIC.x", cls: "ratio-1.6628", text: "Tutorial: Wie man sein Motorrad korrekt reinigt" },
        vube: { id: "76rWN9CWSc", cls: "ratio-1.4713", text: "Drawing 2014" },
        liveleak: { id: "cf677a022bd3", cls: "", text: "Kakadu mit langjähriger Streiterfahrung (von geschiedenem Ehepaar)" },
        vine: { id: "OTtQVYI2JY2", cls: "ratio-1", text: "On A Journey By Train" },
        metacafe: { id: "11142486", cls: "ratio-1.7742", text: "Greedy seagull receives instant karma" },
        myvideo: { id: "9682605", cls: "ratio-1.5953", text: "Fink - Looking Too Closely" },
        other: { id: "https://googledrive.com/host/0B87rILW4RVIJUFpWT2dLeG9RUzg/oceans-clip.mp4", cls: "ratio-2.42 poster", text: "Oceans Clip (MP4 video)" }
    }, $prv = $("#fldProvider"), $cde = $("#fldVideoCode"), $vid = $("#fldVideoDisplay"), opt,
    videoTemplate = '&lt;div class="html5video #opt#cls" id="#id"&gt;&lt;/div&gt;';
    $prv.on("change", function(){
        $cde.html("");
        $vid.html("");
        opt = $prv.val();
        if (typeof demoVideoIDs[opt] === "undefined") return false;
        var html = videoTemplate
            .replace("#opt", opt)
            .replace("#cls", (demoVideoIDs[opt].cls.length>0 ? " "+demoVideoIDs[opt].cls : ""))
            .replace("#id",  demoVideoIDs[opt].id);
        $cde.html('<pre class="html top20">'+html+'</pre>').find(".html").snippet("html", {style:"golden",showNum:false});
        $vid.html('<label class="top20">'+demoVideoIDs[opt].text+'</label>'+html.replace(/&lt;/gi,"<").replace(/&gt;/gi,">"));
        $(".html5video").video2day().init( {addFlexVideoClass: false} );
    });
    $prv.val("none");
});