chrome.runtime.onInstalled.addListener( function(details){
	if ( details.reason == "install" ){
		chrome.tabs.create({url: "options.html"});
	};
});

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse){
	if (request.greeting == "showPageIcon"){
		chrome.pageAction.show(sender.tab.id);
	};
});

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse){
	if (request.greeting == "videoPopup"){
		var videoId;
		$.get( "http://m.mlb.com/ws/search/MediaSearchService?query="+request.playerName+"+highlight&start=0&hitsPerPage=1&type=json&sort=desc&sort_type=date&bypass=y", function(data) {
			videoId = data.mediaContent[0].contentId;
			var myWindow = window.open("http://m.mlb.com/video/v"+videoId+"/?query="+request.playerName+" highlight", "vidWindow",
			"width=1035,height=898,left="+((screen.width/2)-518)+",top="+((screen.height/2)-449) );
		});
	};
});
