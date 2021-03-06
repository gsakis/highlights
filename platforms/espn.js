function espnAdvStats(bList, pList, batterstatids, pitcherstatids){
	var batterids = new Array(); var batblanks = 0;
	var month = 0; var year = new Date().getFullYear(); var season = year;
//	var month = 0; var year = 2015; var season = year;
	/* from yahoo.js
	if 	( document.location.href.indexOf("stat2=D")>-1 ) month = 0; // Today
	else if ( document.location.href.indexOf("stat2=L7")>-1 ) month = 1; // Last 7 days
	else if ( document.location.href.indexOf("stat2=L14")>-1 ) month = 2; // Last 14 days
	else if ( document.location.href.indexOf("stat2=L30")>-1 ) month = 3; // Last 30 days
	else if ( document.location.href.indexOf("stat2=S_"+year)>-1 ) season = year; // This year
	else if ( document.location.href.indexOf("stat2=S_"+year-1)>-1 ) season = year-1; // Last year
	else if ( document.location.href.indexOf("stat2=S_"+year-2)>-1 ) season = year-2; // Two years ago
	*/
	var batterurl = "http://www.fangraphs.com/leaders.aspx?pos=all&stats=bat&lg=all&qual=0&type=c,"+batterstatids.toString()+"&season="+season+"&month="+month+"&season1="+season+"&ind=0&team=0&rost=0&age=0&filter=&players=";
	for ( var i=0 ; i<bList.length ; i++ ){
		$.get( "http://www.fangraphs.com/quickplayersearch.aspx?name="+bList[i], function(data){
			var batterQPS = document.createElement("div");
			batterQPS.innerHTML = data;
			var batterid = batterQPS.getElementsByTagName("a")[0].getAttribute("href").split("=")[1].split("&")[0];
			if ( batterid.substring(0,2) != "sa" ){
				batterids.push(batterid);
				batterurl += batterid+",";
			}
			else{
				batblanks++;
			};
			if ( batterids.length == (bList.length - batblanks) ){
				batterurl = batterurl.slice(0, batterurl.length-1) + "&page=1_50"; // remove trailing comma
				$.get( batterurl, function(data){
					var batterLeaders = document.createElement("div");
						batterLeaders.innerHTML = data;
					batterLeadersTable = batterLeaders.getElementsByClassName("rgMasterTable")[0];
					batterLeadersTable.setAttribute("style", "display: none");
					document.getElementsByTagName("html")[0].appendChild(batterLeadersTable);
					for ( var i=0 ; i<bList.length ; i++ ){
						var batterRow = document.getElementById("LeaderBoard1_dg1_ctl00__"+i);
						var batter = escape( batterRow.getElementsByTagName("a")[0].innerText.split(".").join("") );
						for ( var j=0 ; j<batterstatids.length ; j++ ){
							if ( document.getElementById( batter+" span"+(j+1) ) ){
								document.getElementById( batter+" span"+(j+1) ).innerHTML = batterRow.getElementsByTagName("td")[j+3].innerText.replace(" ", "");
//								document.getElementById( batter+" span"+(j+1) ).removeAttribute("class");
							};
						};
					};
				});
			};
		});
	};
	var pitcherids = new Array(); var pitblanks = 0;
	var pitcherurl = "http://www.fangraphs.com/leaders.aspx?pos=all&stats=pit&lg=all&qual=0&type=c,"+pitcherstatids.toString()+"&season="+season+"&month="+month+"&season1="+season+"&ind=0&team=0&rost=0&age=0&filter=&players=";
	for ( var i=0 ; i<pList.length ; i++ ){
		$.get( "http://www.fangraphs.com/quickplayersearch.aspx?name="+pList[i], function(data){
			var pitcherQPS = document.createElement("div");
			pitcherQPS.innerHTML = data;
			var pitcherid = pitcherQPS.getElementsByTagName("a")[0].getAttribute("href").split("=")[1].split("&")[0];
			if ( pitcherid.substring(0,2) != "sa" ){
				pitcherids.push(pitcherid);
				pitcherurl += pitcherid+",";
			}
			else{
				pitblanks++;
			};
			if ( pitcherids.length == (pList.length - pitblanks) ){
				pitcherurl = pitcherurl.slice(0, pitcherurl.length-1) + "&page=1_50"; // remove trailing comma
				$.get( pitcherurl, function(data){
					var pitcherLeaders = document.createElement("div");
					pitcherLeaders.innerHTML = data;
					pitcherLeadersTable = pitcherLeaders.getElementsByClassName("rgMasterTable")[0];
					pitcherLeadersTable.setAttribute("style", "display: none");
					document.getElementsByTagName("html")[0].insertBefore(pitcherLeadersTable, batterLeadersTable); // Pitcher table before batter table! Important!
					for ( var i=0 ; i<pList.length ; i++ ){
						var pitcherRow = document.getElementById("LeaderBoard1_dg1_ctl00__"+i);
						var pitcher = escape( pitcherRow.getElementsByTagName("a")[0].innerText.split(".").join("") );
						for ( var j=0 ; j<pitcherstatids.length ; j++ ){
							if ( document.getElementById( pitcher+" span"+(j+1) ) ){
								document.getElementById( pitcher+" span"+(j+1) ).innerHTML = pitcherRow.getElementsByTagName("td")[j+3].innerText.replace(" ", "");
//								document.getElementById( pitcher+" span"+(j+1) ).removeAttribute("class");
							};
						};
					};
				});
			};
		});
	};
}


function espnAdvPlayer(pList, isBat, playerstatids){
	var playerids = new Array(); var blanks = 0;
	if ( isBat )	var playerurl = "http://www.fangraphs.com/leaders.aspx?pos=all&stats=bat&lg=all&qual=0&type=c,"+playerstatids.toString()+"&season=2016&month=0&season1=2016&ind=0&team=0&rost=0&age=0&filter=&players=";
	else		var playerurl = "http://www.fangraphs.com/leaders.aspx?pos=all&stats=pit&lg=all&qual=0&type=c,"+playerstatids.toString()+"&season=2016&month=0&season1=2016&ind=0&team=0&rost=0&age=0&filter=&players=";
	for ( var i=0 ; i<pList.length ; i++ ){
		$.get( "http://www.fangraphs.com/quickplayersearch.aspx?name="+pList[i], function(data){
			var playerQPS = document.createElement("div");
			playerQPS.innerHTML = data;
			var playerid = playerQPS.getElementsByTagName("a")[0].getAttribute("href").split("=")[1].split("&")[0];
			if ( playerid.substring(0,2) != "sa" ){
				playerids.push(playerid);
				playerurl += playerid+",";
			}
			else{
				blanks++;
			};
			if ( playerids.length == (pList.length - blanks) ){
				playerurl = playerurl.slice(0, playerurl.length-1) + "&page=1_50"; // remove trailing comma
				$.get( playerurl, function(data){
					var playerLeaders = document.createElement("div");
					playerLeaders.innerHTML = data;
					playerLeadersTable = playerLeaders.getElementsByClassName("rgMasterTable")[0];
					playerLeadersTable.setAttribute("style", "display: none");
					document.getElementsByTagName("html")[0].appendChild(playerLeadersTable);
					for ( var i=0 ; i<pList.length ; i++ ){
						var playerRow = document.getElementById("LeaderBoard1_dg1_ctl00__"+i);
						var player = escape( playerRow.getElementsByTagName("a")[0].innerText.split(".").join("") );
						for ( var j=0 ; j<playerstatids.length ; j++ ){
							if ( document.getElementById( player+" span"+(j+1) ) ){
								document.getElementById( player+" span"+(j+1) ).innerHTML = playerRow.getElementsByTagName("td")[j+3].innerText.replace(" ", "");
//								document.getElementById( player+" span"+(j+1) ).removeAttribute("class");
							};
						};
					};
				});
			};
		});
	};
}


function espn(options){

// Options
document.getElementsByClassName("nav-main-breadcrumbs")[0].innerHTML = "<a title='Highlights+ Options' id='options_link'>Highlights+ v"+chrome.runtime.getManifest().version+"</a> | "+document.getElementsByClassName("nav-main-breadcrumbs")[0].innerHTML;
document.getElementById("options_link").addEventListener("click", function(){
	var optionsWindow = window.open(chrome.extension.getURL("options.html"));
});
// Highlights
if ( document.location.pathname == "/flb/clubhouse" ){
	// Grab list of batters
	var batterTDList = document.getElementById("playertable_0").getElementsByClassName("playertablePlayerName");
	var batterList = new Array();
	for ( i=0 ; i<batterTDList.length ; i++ ){
		batterList[i] = escape( batterTDList[i].getElementsByTagName("a")[0].innerText.split(".").join("") );
	};
	// Grab list of pitchers
	var pitcherTDList = document.getElementById("playertable_1").getElementsByClassName("playertablePlayerName");
	var pitcherList = new Array();
	for ( i=0 ; i<pitcherTDList.length ; i++ ){
		pitcherList[i] = escape( pitcherTDList[i].getElementsByTagName("a")[0].innerText.split(".").join("") );
	};
	// Add video buttons (batters)
	for ( i=0 ; i<batterList.length ; i++ ){
		batterTDList[i].innerHTML += " <img class='videoIcon' id='"+batterList[i]+"' src='"+chrome.extension.getURL("videoIcon.png")+"'>";
		document.getElementById(batterList[i]).addEventListener("click", function(){
			chrome.runtime.sendMessage({greeting: "videoPopup", playerName: this.id}, function(response) { // to background
				console.log(response.farewell);
			});
		});
	};
	// Add video buttons (pitchers)
	for ( i=0 ; i<pitcherList.length ; i++ ){
		pitcherTDList[i].innerHTML += " <img class='videoIcon' id='"+pitcherList[i]+"' src='"+chrome.extension.getURL("videoIcon.png")+"'>";
		document.getElementById(pitcherList[i]).addEventListener("click", function(){
			chrome.runtime.sendMessage({greeting: "videoPopup", playerName: this.id}, function(response) { // to background
				console.log(response.farewell);
			});
		});
	};
};
if ( document.location.pathname == "/flb/freeagency" ){
	// Grab list of players
	var playerTDList = document.getElementsByClassName("playertablePlayerName");
	var playerList = new Array();
	for ( i=0 ; i<playerTDList.length ; i++ ){
		playerList[i] = escape( playerTDList[i].getElementsByTagName("a")[0].innerText.split(".").join("") );
	};
	// Add video buttons
	for ( i=0 ; i<playerList.length ; i++ ){
		playerTDList[i].innerHTML += " <img class='videoIcon' id='"+playerList[i]+"' src='"+chrome.extension.getURL("videoIcon.png")+"'>";
		document.getElementById(playerList[i]).addEventListener("click", function(){
			chrome.runtime.sendMessage({greeting: "videoPopup", playerName: this.id}, function(response) { // to background
				console.log(response.farewell);
			});
		});
	};
};
if ( document.location.pathname == "/flb/boxscorefull" ){
	// Grab list of players
	var playerTDList = document.getElementsByClassName("playertablePlayerName");
	var playerList = new Array();
	for ( i=0 ; i<playerTDList.length ; i++ ){
		playerList[i] = escape( playerTDList[i].getElementsByTagName("a")[0].innerText.split(".").join("") );
	};
	// Add video buttons
	for ( i=0 ; i<playerList.length ; i++ ){
		playerTDList[i].innerHTML += " <img class='videoIcon' id='"+playerList[i]+"' src='"+chrome.extension.getURL("videoIcon.png")+"'>";
		document.getElementById(playerList[i]).addEventListener("click", function(){
			chrome.runtime.sendMessage({greeting: "videoPopup", playerName: this.id}, function(response) { // to background
				console.log(response.farewell);
			});
		});
	};
};


// My Team on Twitter
/*
if ( true ){
	// Add button
	document.getElementById("ptfiltersmenuleft").innerHTML += "<div class='playertablefiltersmenucontainer'><a id='twitterBtn'>My Team on Twitter</a></div>";
	playerstring = "";
	twitterurl = "";
	document.getElementById("twitterBtn").addEventListener( "click", function(){
		console.log("twitter btn clicked!");
		alert("twitter btn clicked!");
	});
};
*/


// Advanced stats
if ( options.advMetricsEnabled && document.location.pathname == "/flb/clubhouse" ){
	if ( options.batterheaders == undefined ) var batterheaders = ["BABIP", "ISO", "BB%"];
	else var batterheaders = options.batterheaders;
	if ( options.pitcherheaders == undefined ) var pitcherheaders = ["FIP", "xFIP", "tERA"];
	else var pitcherheaders = options.pitcherheaders;
	// Add "Advanced" header (batters)
	var topthlist = document.getElementsByClassName("tableHead")[0].getElementsByTagName("th");
	var topth = topthlist[topthlist.length-2];
	topth.innerHTML += " + ADVANCED (<a title='What is this?' id='options_highlights_batters'>?</a>)";
	topth.setAttribute("colspan", parseInt(topth.getAttribute("colspan"))+batterheaders.length);
	document.getElementById("options_highlights_batters").addEventListener("click", function(){
		var optionsWindow = window.open(chrome.extension.getURL("options.html"));
	});
	// Add "Advanced" header (pitchers)	
	var topthlist = document.getElementsByClassName("tableHead")[1].getElementsByTagName("th");
	var topth = topthlist[topthlist.length-2];
	topth.innerHTML += " + ADVANCED (<a title='What is this?' id='options_highlights_pitchers'>?</a>)";
	topth.setAttribute("colspan", parseInt(topth.getAttribute("colspan"))+pitcherheaders.length);
	document.getElementById("options_highlights_pitchers").addEventListener("click", function(){
		var optionsWindow = window.open(chrome.extension.getURL("options.html"));
	});
	// Add table headers (batters)
	var spacerlist = document.getElementsByClassName("tableSubHead")[0].getElementsByClassName("sectionLeadingSpacer");
	var spacerlast = spacerlist[spacerlist.length-1];
	for ( var i=0 ; i<batterheaders.length ; i++ ){
		spacerlast.insertAdjacentHTML("beforeBegin", "<td class='playertableStat'><span>"+batterheaders[i]+"</span></td>");
	};
	// Add table headers (pitchers)
	var spacerlist = document.getElementsByClassName("tableSubHead")[1].getElementsByClassName("sectionLeadingSpacer");
	var spacerlast = spacerlist[spacerlist.length-1];
	for ( var i=0 ; i<pitcherheaders.length ; i++ ){
		spacerlast.insertAdjacentHTML("beforeBegin", "<td class='playertableStat'><span>"+pitcherheaders[i]+"</span></td>");
	};
	// Add table cells (batters)
	var trlist = document.getElementById("playertable_0").getElementsByClassName("pncPlayerRow");
	var p=0;
	for ( var i=0 ; i<trlist.length ; i++ ){
		var spacerlist = trlist[i].getElementsByClassName("sectionLeadingSpacer");
		var spacerlast = spacerlist[spacerlist.length-1];
		var newcells = "";
		if ( trlist[i].getElementsByClassName("playertablePlayerName")[0] ){
			for ( var j=0 ; j<batterheaders.length ; j++ ){
				newcells += "<td class='playertableStat'><span id='"+batterList[p]+" span"+(j+1)+"'>--</span></td>";
			};
			spacerlast.insertAdjacentHTML("beforeBegin", newcells);
			p++;
		}
		else{
			for ( var j=0 ; j<batterheaders.length ; j++ ){
				newcells += "<td class='playertableStat'><span>--</span></td>";
			};
			spacerlast.insertAdjacentHTML("beforeBegin", newcells);
		};
	};
	// Fill out total row (batters)
	if (  document.getElementsByClassName("playerTableBgRowTotals")[0] ){
		var totalrow = document.getElementsByClassName("playerTableBgRowTotals")[0];
		var spacerlist = totalrow.getElementsByClassName("sectionLeadingSpacer");
		var spacerlast = spacerlist[spacerlist.length-1];
		spacerlast.insertAdjacentHTML("beforeBegin", "<td colspan='"+(batterheaders.length)+"'></td>");
	};
	// Add table cells (pitchers)
	var trlist = document.getElementById("playertable_1").getElementsByClassName("pncPlayerRow");
	var p=0;
	for ( var i=0 ; i<trlist.length ; i++ ){
		var spacerlist = trlist[i].getElementsByClassName("sectionLeadingSpacer");
		var spacerlast = spacerlist[spacerlist.length-1];
		var newcells = "";
		if ( trlist[i].getElementsByClassName("playertablePlayerName")[0] ){
			for ( var j=0 ; j<pitcherheaders.length ; j++ ){
				newcells += "<td class='playertableStat'><span id='"+pitcherList[p]+" span"+(j+1)+"'>--</span></td>";
			};
			spacerlast.insertAdjacentHTML("beforeBegin", newcells);
			p++;
		}
		else{
			for ( var j=0 ; j<pitcherheaders.length ; j++ ){
				newcells += "<td class='playertableStat'><span>--</span></td>";
			};
			spacerlast.insertAdjacentHTML("beforeBegin", newcells);
		};
	};
	// Fill out total row (pitchers)
	if ( document.getElementsByClassName("playerTableBgRowTotals")[1] ){
		var totalrow = document.getElementsByClassName("playerTableBgRowTotals")[1];
		var spacerlist = totalrow.getElementsByClassName("sectionLeadingSpacer");
		var spacerlast = spacerlist[spacerlist.length-1];
		spacerlast.insertAdjacentHTML("beforeBegin", "<td colspan='"+(pitcherheaders.length)+"'></td>");
	};
	// Add retrieve button
	if ( options.batterstatids == undefined ) var batterstatids = ["bat_41", "bat_40", "bat_34"];
	else var batterstatids = options.batterstatids;
	if ( options.pitcherstatids == undefined ) var pitcherstatids = ["pit_45", "pit_62", "pit_61"];
	else var pitcherstatids = options.pitcherstatids;
	for ( var i=0 ; i<batterstatids.length ; i++ ){
		batterstatids[i] = batterstatids[i].substring(4);
	};
	for ( var i=0 ; i<pitcherstatids.length ; i++ ){
		pitcherstatids[i] = pitcherstatids[i].substring(4);
	};
	document.getElementById("ptfiltersmenuleft").innerHTML += "<div class='playertablefiltersmenucontainer'><a id='retrieveBtn'>Retrieve Advanced Stats</a></div>";
	document.getElementById("retrieveBtn").addEventListener("click", function(){
		console.log("retrieve btn clicked!");
		espnAdvStats(batterList, pitcherList, batterstatids, pitcherstatids);
	});
};
if ( options.advMetricsEnabled && document.location.pathname == "/flb/freeagency" ){
	if ( options.batterheaders == undefined ) var batterheaders = ["BABIP", "ISO", "BB%"];
	else var batterheaders = options.batterheaders;
	if ( options.pitcherheaders == undefined ) var pitcherheaders = ["FIP", "xFIP", "tERA"];
	else var pitcherheaders = options.pitcherheaders;
	// Batters or pitchers?
	var h = document.location.href;
	if ( h.indexOf("slotCategoryGroup=2")>-1 || h.indexOf("slotCategoryId=14")>-1 || h.indexOf("slotCategoryId=15")>-1 ){
		var playerheaders = pitcherheaders;
		var isBatters = false;
	}
	else{
		var playerheaders = batterheaders;
		var isBatters = true;
	};
	// Add "Advanced" header
	var topthlist = document.getElementsByClassName("tableHead")[0].getElementsByTagName("th");
	var topth = topthlist[topthlist.length-2];
	topth.innerHTML += " + ADVANCED (<a title='What is this?' id='options_highlights'>?</a>)";
	topth.setAttribute("colspan", parseInt(topth.getAttribute("colspan"))+playerheaders.length);
	document.getElementById("options_highlights").addEventListener("click", function(){
		var optionsWindow = window.open(chrome.extension.getURL("options.html"));
	});
	// Add table headers
	var spacerlist = document.getElementsByClassName("tableSubHead")[0].getElementsByClassName("sectionLeadingSpacer");
	var spacerlast = spacerlist[spacerlist.length-1];
	for ( var i=0 ; i<playerheaders.length ; i++ ){
		spacerlast.insertAdjacentHTML("beforeBegin", "<td class='playertableStat'><span>"+playerheaders[i]+"</span></td>");
	};
	// Add table cells
	var trlist = document.getElementById("playertable_0").getElementsByClassName("pncPlayerRow");
	for ( var i=0 ; i<trlist.length ; i++ ){
		var spacerlist = trlist[i].getElementsByClassName("sectionLeadingSpacer");
		var spacerlast = spacerlist[spacerlist.length-1];
		var newcells = "";
		for ( var j=0 ; j<playerheaders.length ; j++ ){
			newcells += "<td class='playertableStat'><span id='"+playerList[i]+" span"+(j+1)+"'>--</span></td>";
		};
		spacerlast.insertAdjacentHTML("beforeBegin", newcells);
	};
	// Add retrieve button
	if ( options.batterstatids == undefined ) var batterstatids = ["bat_41", "bat_40", "bat_34"];
	else var batterstatids = options.batterstatids;
	if ( options.pitcherstatids == undefined ) var pitcherstatids = ["pit_45", "pit_62", "pit_61"];
	else var pitcherstatids = options.pitcherstatids;
	for ( var i=0 ; i<batterstatids.length ; i++ ){
		batterstatids[i] = batterstatids[i].substring(4);
	};
	for ( var i=0 ; i<pitcherstatids.length ; i++ ){
		pitcherstatids[i] = pitcherstatids[i].substring(4);
	};
	if ( isBatters ) var playerstatids = batterstatids;
	else var playerstatids = pitcherstatids;
	document.getElementById("ptfiltersmenuleft").innerHTML += "<div class='playertablefiltersmenucontainer'><a id='retrieveBtn'>Retrieve Advanced Stats</a></div>";
	document.getElementById("retrieveBtn").addEventListener("click", function(){
		espnAdvPlayer(playerList, isBatters, playerstatids);
	});
};

}
