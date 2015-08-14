function save_options(){
	var advMetricsEnabled = document.getElementById("advMetrics").checked;
	var batterStats = document.getElementsByClassName("batterStat");
	var pitcherStats = document.getElementsByClassName("pitcherStat");
	var batterheaders = new Array();
	var batterstatids = new Array();
	for ( var i=0 ; i<batterStats.length ; i++ ){
		if ( batterStats[i].checked ){
			batterheaders.push( batterStats[i].getAttribute("name") );
			batterstatids.push( batterStats[i].getAttribute("id") );
		};
	};
	var pitcherheaders = new Array();
	var pitcherstatids = new Array();
	for ( var i=0 ; i<pitcherStats.length ; i++ ){
		if ( pitcherStats[i].checked ){
			pitcherheaders.push( pitcherStats[i].getAttribute("name") );
			pitcherstatids.push( pitcherStats[i].getAttribute("id") );
		};
	};
	chrome.storage.sync.set( { advMetricsEnabled: advMetricsEnabled, batterheaders: batterheaders, pitcherheaders: pitcherheaders, batterstatids: batterstatids, pitcherstatids: pitcherstatids }, function(){
		var status = document.getElementById("status");
		status.textContent = "Options saved.";
		console.log("Batter headers:", batterheaders, "\nBatter stat IDs:", batterstatids);
		console.log("Pitcher headers:", pitcherheaders, "\nPitcher stat IDs:", pitcherstatids);
	});
}

function restore_options(){
	chrome.storage.sync.get( { advMetricsEnabled: true, batterheaders: ["BABIP", "ISO", "BB%"], pitcherheaders: ["FIP", "xFIP", "tERA"], batterstatids: ["bat_41", "bat_40", "bat_34"], pitcherstatids: ["pit_45", "pit_62", "pit_61"] }, function(items){
		document.getElementById("advMetrics").checked = items.advMetricsEnabled;
		var batterstatids = items.batterstatids;
		var pitcherstatids = items.pitcherstatids;
		console.log("Batter stat IDs:", batterstatids);
		console.log("Pitcher stat IDs:", pitcherstatids);
		for ( var i=0 ; i<batterstatids.length ; i++ ){
			document.getElementById( batterstatids[i] ).checked = true;
		};
		for ( var i=0 ; i<pitcherstatids.length ; i++ ){
			document.getElementById( pitcherstatids[i] ).checked = true;
		};
	});
}

document.addEventListener( "DOMContentLoaded", restore_options );
document.getElementById("saveBtn").addEventListener( "click", save_options );
