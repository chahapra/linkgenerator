function makePlacementNames(parsedata) {
	//output structure
	results = new Array(["Site_ID","Placement_ID","Site","Placement", "Dimensions", "Start_Date", "End_Date", "Placement_Type", "Status","Hidden","Stopped","Third_Party_ID","Clicktag_1","Third_Party_Impression_1","Third_Party_Impression_2","Non AF Link"]);
	//results2 = new Array([]);


	//console.table(parsedata);
	for (i = 1; i < parsedata.length-1; i++) {

		//split row into variables
		var placement = parsedata[i][0].trim();
		var iosLP = parsedata[i][1].trim();
		var andLP = parsedata[i][2].trim();
		var deskLP = parsedata[i][3].trim();
		var networkName = parsedata[i][4].toUpperCase().trim();
		var channel = parsedata[i][5].trim();
		var adserver = parsedata[i][6].trim();
		var tagType = parsedata[i][7].trim();
		var campaignName = parsedata[i][8].trim();
		var rateType = parsedata[i][9].trim();
		var unitCost = parsedata[i][10].trim();
		var conversion = parsedata[i][11].trim();
		var startDate = parsedata[i][12].trim();
		var endDate = parsedata[i][13].trim();

		//split placement name into variables
		var splitPlacementName = new Array();
		splitPlacementName = placement.split("-");
		var brand = splitPlacementName[0];
		var geo = splitPlacementName[1];
		var platform = splitPlacementName[2];
		var campaign = splitPlacementName[3];
		var budget = splitPlacementName[4];
		var agency = splitPlacementName[5];
		var dsp = splitPlacementName[6];
		var publisher = splitPlacementName[7];
		var subsite = splitPlacementName[8];
		var audience = splitPlacementName[9];
		var vertical = splitPlacementName[10];
		var message = splitPlacementName[11];
		var offer = splitPlacementName[12];
		var ams = splitPlacementName[13].trim();
		var format = splitPlacementName[14].toLowerCase();
		var targeting = splitPlacementName[15];
		var subtargeting = splitPlacementName[16];

		//JSON lookup keys
		var siteKey = agency + "-" + dsp + "-" + publisher;
		var appLinkKey = brand + "-" + geo + "-" + platform;

		var networkParams = null;
		var networkParamsImps;
		var landingPage;
		var empty = "";
		var finalLink = null;
		var finalImpLink = null;
		var nonafLink = null;
		var utmParamsIOS = null;
		var utmParamsAND = null;
		var utmParamsDESK = null;
		var error;

		var amsSub4 = "&af_sub4=" + ams;
		var versionID = "&af_ad=[%FT_CONFID%]";

		//check for / at the end of URL and append if not existing
		iosLP = ((iosLP.slice(iosLP.length - 1) == "/" ? iosLP : iosLP+"/") );
		andLP = ((andLP.slice(andLP.length - 1) == "/" ? andLP : andLP+"/") );
		deskLP = ((deskLP.slice(deskLP.length - 1) == "/" ? deskLP : deskLP+"/") );

		//set landing page
		if (platform.toLowerCase() == "and") {
			landingPage = andLP;
		}else if (platform.toLowerCase() == "ios" ){
			landingPage = iosLP;
		}else{
			landingPage = deskLP;
		}

		landingPage = (landingPage.startsWith("http") ? landingPage : landingPage = "");


		//search through JSON
		var appresult = app.find( ({ id }) => id === appLinkKey );
		var networkresult = network.find( ({ id }) => id === networkName );
		var siteresult = site.find( ({ id }) => id === siteKey.toLowerCase() );

		if(appLinkKey.toLowerCase().search("desk") > 0)
		{
			appresult = "desk"
		}

		try{
			if(!appresult) throw "Add app: '" +appLinkKey + "' to appindex.json";
			if(!networkresult) throw "Add network '"+networkName+ "' to networkindex.json";
			if(!siteresult) throw "Add site '"+siteKey+ "' to siteindex.json";
		}catch(err){
			alert("ERROR: " + err);
		}


		//machine link
		var machinelink = "https://api.mchnad.com/clk/95dc8a68-69f0-4471-b6de-6043a9247f48/network/" + siteresult.ftid + "/" + appresult.appid + "/unknown/[ftqs:[machineclick]]/redirect/";


		console.log(networkName);
		console.log(machinelink);
		console.log(appresult.click);
		console.log(appresult.imp);
		console.log(appresult.nativeurl);
		console.log(networkresult.iosclick);
		console.log(networkresult.iosimp);
		console.log(networkresult.andclick);
		console.log(networkresult.andimp);
		console.log(siteresult.siteid);
		console.log(siteresult.adserver);
		console.log(appresult.appid);


		//make format 1x1 for vod activity
		if (format.toLowerCase().includes("vod")) {
			format = "1x1";
		}

		//Build UTM params
		switch (channel.toLowerCase()) {
			case "paidsocial":
				var utmParamsIOS = "?source=" + ams + "&utm_medium=paidsocial&utm_source=" + publisher.toLowerCase() + "&utm_campaign=" + campaign.toLowerCase();
				var utmParamsAND = "?source=" + ams + "&utm_medium=paidsocial&utm_source=" + publisher.toLowerCase() + "&utm_campaign=" + campaign.toLowerCase();
				var utmParamsDESK = "?source=" + ams + "&utm_medium=paidsocial&utm_source=" + publisher.toLowerCase() + "&utm_campaign=" + campaign.toLowerCase();
				break;
			case "affiliates":
				var utmParamsIOS = "?source=" + ams + "&utm_medium=affiliates&utm_source=" + publisher.toLowerCase() + "&utm_campaign=" + campaign.toLowerCase();
				var utmParamsAND = "?source=" + ams + "&utm_medium=affiliates&utm_source=" + publisher.toLowerCase() + "&utm_campaign=" + campaign.toLowerCase();
				var utmParamsDESK = "?source=" + ams + "&utm_medium=affiliates&utm_source=" + publisher.toLowerCase() + "&utm_campaign=" + campaign.toLowerCase();
			break;
			case "display":
				var utmParamsIOS = "?source=" + ams + "&utm_medium=display&utm_source=" + publisher.toLowerCase() + "&utm_campaign=" + campaign.toLowerCase();
				var utmParamsAND = "?source=" + ams + "&utm_medium=display&utm_source=" + publisher.toLowerCase() + "&utm_campaign=" + campaign.toLowerCase();
				var utmParamsDESK = "?source=" + ams + "&utm_medium=display&utm_source=" + publisher.toLowerCase() + "&utm_campaign=" + campaign.toLowerCase();
			break;
			case "crm":
				var utmParamsIOS = "?source=" + ams + "&utm_medium=crm&utm_source=" + publisher.toLowerCase() + "&utm_campaign=" + campaign.toLowerCase();
				var utmParamsAND = "?source=" + ams + "&utm_medium=crm&utm_source=" + publisher.toLowerCase() + "&utm_campaign=" + campaign.toLowerCase();
				var utmParamsDESK = "?source=" + ams + "&utm_medium=crm&utm_source=" + publisher.toLowerCase() + "&utm_campaign=" + campaign.toLowerCase();
		}

		//Build url
		switch (platform.toLowerCase()) {
			case "ios":
			landingPage = iosLP;
			finalLink = buildFinalLink(machinelink, tagType, appresult.click, appresult.imp, placement, amsSub4, versionID, networkresult.iosclick, landingPage, networkresult.iosimp, utmParamsIOS);
			nonafLink = (landingPage.startsWith("http") ? landingPage + utmParamsIOS : appresult.nativeurl);
			finalImpLink = appresult.imp + "c=" + placement + amsSub4 + "&" + networkresult.iosimp;
			break;
			case "and":
			landingPage = andLP;
			finalLink = buildFinalLink(machinelink, tagType, appresult.click, appresult.imp, placement, amsSub4, versionID, networkresult.andclick, landingPage, networkresult.andimp, utmParamsAND);
			nonafLink = (landingPage.startsWith("http") ? landingPage + utmParamsAND : appresult.nativeurl);
			finalImpLink = appresult.imp + "c=" + placement + amsSub4 + "&" + networkresult.andimp;
			break;
			case "dis":
			 networkParamsImps=null;
			 networkParams = networkresult.andclick;
			 finalLink = buildFinalOneLink(appresult.click, placement, amsSub4, versionID, networkParams, iosLP, andLP, deskLP, networkParamsImps, utmParamsDESK, utmParamsAND, utmParamsIOS, channel);
			 nonafLink = landingPage + utmParamsDESK;
			break;
			case "mob":
			networkParamsImps=null;
			networkParams = networkresult.andclick;
			finalLink = buildFinalOneLink(appresult.click, placement, amsSub4, versionID, networkParams, iosLP, andLP, deskLP, networkParamsImps, utmParamsDESK, utmParamsAND, utmParamsIOS, channel);
			nonafLink = landingPage + utmParamsDESK;
			break;
			case "ctv":
			landingPage = deskLP;
			appLink = landingPage;
			impLink = null;
			networkParams = utmParamsDESK;
			finalLink = appLink + networkParams;
			nonafLink = landingPage + utmParamsDESK;
			break;
			case "desk":
			landingPage = deskLP;
			appLink = landingPage;
			impLink = null;
			networkParams = utmParamsDESK;
			finalLink = appLink + networkParams;
			nonafLink = landingPage + utmParamsDESK;
		}

		// generate links for special cases
		if (channel.toLowerCase() == "paidsocial"){
		//	finalLink = nonafLink;
		}else if (dsp.toLowerCase() == "dv360"){
			finalLink = nonafLink + "&review=true";
		}else if (dsp.toLowerCase() == "mediamath" && adserver.toLowerCase() == "ft"){
			finalLink = finalLink.replace("AD_ATTR.campaign","%campaignID%");
			finalLink = finalLink.replace("AD_ATTR.creative","%FT_CONFID%");
			finalLink = finalLink.replace("AD_ATTR.width","%placementWidth%");
			finalLink = finalLink.replace("AD_ATTR.height","%placementHeight%");
			finalLink = finalLink.replace("BID_ATTR.pub_id","%placementID%");
			finalLink = finalLink.replace(/MM_UUID/gi,"%IDFA%");
			finalLink = finalLink.replace("&af_sub1=[BID_ATTR.bid_id]","");
			finalLink = finalLink.replace("AD_ATTR.strategy","FTRACKID");
			finalLink = finalLink.replace("&af_siteid=[BID_ATTR.site_id]","");
			finalImpLink = finalImpLink.replace("AD_ATTR.campaign","%campaignID%");
			finalImpLink = finalImpLink.replace("AD_ATTR.creative","%FT_CONFID%");
			finalImpLink = finalImpLink.replace("AD_ATTR.width","%placementWidth%");
			finalImpLink = finalImpLink.replace("AD_ATTR.height","%placementHeight%");
			finalImpLink = finalImpLink.replace("BID_ATTR.pub_id","%placementID%");
			finalImpLink = finalImpLink.replace(/MM_UUID/gi,"%IDFA%");
			finalImpLink = finalImpLink.replace("&af_sub1=[BID_ATTR.bid_id]","");
			finalImpLink = finalImpLink.replace("AD_ATTR.strategy","FTRACKID");
			finalImpLink = finalImpLink.replace("&af_siteid=[BID_ATTR.site_id]","");

		}

		//finalImpLink = (finalLink.includes("appsflyer") ? finalLink.replace("app", "impression") : "");

		results.push([siteresult.ftid,empty,empty,placement,format,startDate,endDate,empty,empty,empty,empty,ams,finalLink,finalImpLink,empty,nonafLink]);
		//results2.push([siteresult.ftid,empty,empty,placement,format,startDate,endDate,empty,empty,empty,empty,ams,finalLink,empty,empty,nonafLink]);
	}
	console.table(results);
	//console.table(results2);
	makeTable(results);
}

function buildFinalLink(machinelink, tagType, appLink, appimp, placement, amsSub4, versionID, networkParams, landingPage, networkParamsImps, utmParams) {
	if (tagType.includes("Machine")){
		appLink = machinelink + appLink;
	}

	if (landingPage.startsWith("http")){
		encodedUTM = encodeURIComponent(utmParams);
		finalLink = appLink + "c=" + placement + amsSub4 + versionID + "&" + networkParams + "&af_r=" + landingPage + encodedUTM;
	}else{
		finalLink = appLink + "c=" + placement + amsSub4 + versionID + "&" + networkParams;
	}
	return finalLink;
}

function buildFinalOneLink(appLink, placement, amsSub4, versionID, networkParams, iosLP, andLP, deskLP, networkParamsImps, utmParamsDESK, utmParamsAND, utmParamsIOS, channel) {
	networkParams = networkParams + "&af_param_forwarding=false";
	utmParamsAND = encodeURIComponent(utmParamsAND);
	utmParamsIOS = encodeURIComponent(utmParamsIOS);
	utmParamsDESK = encodeURIComponent(utmParamsDESK);

	if ((deskLP.startsWith("http")) && (iosLP.startsWith("http")) && (andLP.startsWith("http"))){
		finalLink = appLink + "c=" + placement + amsSub4 + "&" + networkParams + "&af_android_url=" + andLP + utmParamsAND + "&af_ios_url=" + iosLP + utmParamsIOS + "&af_web_dp=" + deskLP + utmParamsDESK;
	}else if ((deskLP.startsWith("http")) && (iosLP.startsWith("http")) && (andLP == "")){
		finalLink = appLink + "c=" + placement + amsSub4 + "&" + networkParams + "&af_ios_url=" + iosLP + utmParamsIOS + "&af_web_dp=" + deskLP + utmParamsDESK;
	}else if ((deskLP.startsWith("http")) && (iosLP == "") && (andLP.startsWith("http"))){
		finalLink = appLink + "c=" + placement + amsSub4 + "&" + networkParams + "&af_android_url=" + andLP + utmParamsAND + "&af_web_dp=" + deskLP + utmParamsDESK;
	}else if ((deskLP.startsWith("http")) && (iosLP == "") && (andLP == "")){
		finalLink = appLink + "c=" + placement + amsSub4 + "&" + networkParams + "&af_web_dp=" + deskLP + utmParamsDESK;
	}else {
		finalLink = appLink + "c=" + placement + amsSub4 + "&" + networkParams;
	}
	return finalLink;
}

//export to csv functions
function makeTable(results) {
	var table = document.createElement('table');
	  var tableBody = document.createElement('tbody');

	  results.forEach(function(rowData) {
		var row = document.createElement('tr');

		rowData.forEach(function(cellData) {
		  var cell = document.createElement('td');
		  cell.appendChild(document.createTextNode(cellData));
		  row.appendChild(cell);
		});

		tableBody.appendChild(row);
	  });

	  table.appendChild(tableBody);
	  document.body.appendChild(table);
	  document.getElementsByTagName("table")[0].setAttribute("contentEditable", true);

}

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}

function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);

        csv.push(row.join(","));
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}
