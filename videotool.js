$(document).ready( function(){

    // display all existing twoday tipps in the top sidebar item
    var $item = $(".sidebarItem:first");
    $.get("/topics/Sch%C3%B6ner+Bloggen/", function(data){
        var html = "", wrapTipp = '<div class="sideHistoryItem clearfix"><div class="sideHistoryTitle">{tip}</div></div>';
        $(data).find(".storyTitle").each( function(){
            html += wrapTipp.replace("{tip}", $(this).html().replace("Twoday-",""));
        });
        if (html.length>0){
            $item.find("h4").text("Twoday-Tipps");
            $item.find(".sidebarItemBody").html(html);
            $(".sidebarItem:gt(0)").hide(0);
        }
    });

    // prepend the backlink to the videos tip to the top right of the story
    var $prep = $("#prependStory");
    $prep.closest(".story").prepend($prep.html());

    // setup the knockout MVVM viewmodel
    var c43 = "1.33333", c169 = "1.77778";
    var viewModelVideoOptions = {
        txtIframe: ko.observable(""),
        errIframe: ko.observable(""),
        fldProvider: ko.observable("youtube"),
        selWidth: ko.observable("full"),
        txtPixel: ko.observable("").extend({ rateLimit: { method: "notifyWhenChangesStop", timeout: 400 }}),
        focusPixel: function(){
            $("#txtPixel").focus();
            return true;
        },
        selRatio: ko.observable(c169),
        txtRatio: ko.observable(c169).extend({ rateLimit: { method: "notifyWhenChangesStop", timeout: 400 }}),
        setRatio: function(){
            var ratio = this.selRatio();
            if (ratio==="custom"){ this.txtRatio(""); $("#txtRatio").focus(); } else this.txtRatio(ratio);
            return true;
        },
        txtVideo: ko.observable("").extend({ rateLimit: { method: "notifyWhenChangesStop", timeout: 400 }}),
        chkPoster: ko.observable(false),
        fldImage: ko.observable("jpg"),
        resetPoster: function(){
            this.chkPoster(false);
            this.fldImage("jpg");
        },
        resetOptions: function(){
            this.txtIframe("");
            this.fldProvider("youtube");
            this.selWidth("full");
            this.txtPixel("");
            this.selRatio(c169);
            this.txtRatio("");
            this.txtVideo("");
            this.resetPoster();
        },
        genError: function(msg){
            return '<span class="error" style="margin-bottom:0">'+msg+'</span>';
        },
        provider: [
            { "option": "youtube", "id": "youtube.com", "vmatch": "\\/embed\\/(.*)" },
            { "option": "vimeo", "id": "vimeo.com", "vmatch": "\\/video\\/(.*)" },
            { "option": "vevo", "id": "vevo.com", "vmatch": "\\?video=(.*)\\&" },
            { "option": "dailymotion", "id": "dailymotion.com", "vmatch": "\\/video\\/(.*)" },
            { "option": "jsfiddle", "id": "jsfiddle.net", "vmatch": ".net\/(.*)" },
            { "option": "giphy", "id": "giphy.com", "vmatch": "\\/embed\\/(.*)" },
            { "option": "funnyordie", "id": "funnyordie.com", "vmatch": "\\/embed\\/(.*)" },
            { "option": "liveleak", "id": "liveleak.com", "vmatch": "f=(.*)" },
            { "option": "vine", "id": "vine.co", "vmatch": "\\/v\\/(.*)\\/embed" },
            { "option": "metacafe", "id": "metacafe.com", "vmatch": "\\/embed\\/(.*)\\/" },
            { "option": "myvideo", "id": "myvideo.de", "vmatch": "\\/public\\/(.*)" }
        ]
    };

    viewModelVideoOptions.txtIframe.subscribe(function(code){
        var self = this;
        try {
            var $iframe = $("<div>").html(code).find("iframe").eq(0),
                ratio = (Math.round(parseInt($iframe.attr("width")) / parseInt($iframe.attr("height")) * 100000) / 100000).toString(),
                src = $iframe.attr("src"), vid = false;
            $.each( this.provider, function(){
                if (src.indexOf(this.id)>=0){
                    self.fldProvider(this.option);
                    if (ratio===c43 || ratio===c169)
                        self.selRatio(ratio);
                    else {
                        self.selRatio("custom");
                        self.txtRatio(ratio);
                    }
                    vid = src.match(new RegExp(this.vmatch,"")) || [];
                    if (vid.length>1) self.txtVideo(vid[1]);
                    return false;
                }
            });
            self.errIframe(!vid ? self.genError("Der iframe-Einbettungscode konnte nicht interpretiert werden (unbekannter Anbieter)!") : "");
        } catch(e) {
            self.errIframe(code.length===0 ? "" : self.genError("Während der Analyse des iframe-Codes wurde ein Fehler festgestellt! Bitte kopieren Sie den vollständigen Einbettungscode des Videos inkl. &lt;iframe&gt;...&lt;/iframe&gt;"));
        }
    }, viewModelVideoOptions);

    viewModelVideoOptions.fldProvider.subscribe(function(newProvider){
        if (newProvider!=="other") this.resetPoster();
    }, viewModelVideoOptions);

    viewModelVideoOptions.txtPixelEnabled = ko.computed( function(){ return (this.selWidth()==="pixel"); }, viewModelVideoOptions);

    viewModelVideoOptions.txtRatio.subscribe(function(newRatio){
        if (newRatio.indexOf(",")>=0) this.txtRatio(parseFloat(newRatio.replace(/\,/g,".")).toString());
    }, viewModelVideoOptions);

    viewModelVideoOptions.txtRatioEnabled = ko.computed( function(){ return (this.selRatio()==="custom"); }, viewModelVideoOptions);

    viewModelVideoOptions.labelVideo = ko.computed( function(){ return "Video-" + (this.fldProvider()==="other" ? "URL:" : "ID:"); }, viewModelVideoOptions);

    viewModelVideoOptions.chkPosterEnabled = ko.computed( function(){ return (this.fldProvider()==="other"); }, viewModelVideoOptions);

    ko.computed( function(){
        var html = '&lt;div class="html5video #cls" id="#id"&gt;&lt;/div&gt;',
            $cde = $("#fldVideoCode"),
            $vid = $("#fldVideoDisplay"),
            cls = [this.fldProvider()],
            id = this.txtVideo();
        $cde.html("");
        $vid.html("");
        if (this.selWidth()==="pixel"){
            if ($.isNumeric(this.txtPixel())){
                cls.push("width-"+this.txtPixel());
            } else {
                $vid.html(this.genError('Bitte geben Sie eine gültige Breite in Pixel ein!')); return;
            }
        }
        if (this.selRatio()==="custom" && !$.isNumeric(this.txtRatio())){
            $vid.html(this.genError('Bitte machen Sie eine gültige Angabe für das gewünschte Aspektverhältnis!')); return;
        }
        if (this.selRatio()!==c169) cls.push("ratio-"+this.txtRatio());
        if (this.chkPosterEnabled() && this.chkPoster()){
            cls.push("poster");
            if (this.fldImage()!=="jpg") cls.push("image-"+this.fldImage());
        }
        if (id.length===0){
            $vid.html(this.genError('Bitte geben Sie eine gültige Video-'+(this.fldProvider()==="other" ? "URL" : "ID")+' ein!')); return;
        } else {
            html = html.replace("#cls", cls.join(" ")).replace("#id", id);
            $cde.html('<pre class="html">'+html+'</pre>').find(".html").snippet("html", {style:"golden",showNum:false});
            $vid.html(html.replace(/&lt;/gi,"<").replace(/&gt;/gi,">"));
            $(".html5video").video2day().init( {addFlexVideoClass: false} );
        }
    }, viewModelVideoOptions);

    ko.applyBindings(viewModelVideoOptions);

    // analyze url parameters to establish desired default values
    var params = (location.search.length>0 ? decodeURIComponent(location.search).substr(1).split("&") : []); // ?provider=youtube&videoid=12345678
    $.each( params, function(){
        var part = this.split("=");
        if (part.length<2){ return true; }
        switch (part[0]) {
            case "provider": viewModelVideoOptions.fldProvider(part[1]); break; // set the plattform code
            case "videoid":  viewModelVideoOptions.txtVideo(part[1]); break; // set the video id
        }
    });

});