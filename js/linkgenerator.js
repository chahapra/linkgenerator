function makePlacementNames(parsedata) {
	results = new Array(["AMS","Placement Name","Click Link","Impression Link", "Non AF Link", "Campaign Name", "Deliverables", "Buying Metric", "Unit Cost","Site","Conversion","Start Date","End Date"]);

	console.table(parsedata);
	for (i = 1; i < parsedata.length-1; i++) {
		//split row into variables
		var placement = parsedata[i][0];
		var iosLP = parsedata[i][1].trim();
		var andLP = parsedata[i][2].trim();
		var deskLP = parsedata[i][3].trim();
		var networkName = parsedata[i][4].toUpperCase().trim();
		var channel = parsedata[i][5].trim();
		var adserver = parsedata[i][6].trim();
		var campaignName = parsedata[i][7].trim();
		var tagType = parsedata[i][8].trim();
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
		var format = splitPlacementName[14];
		var targeting = splitPlacementName[15];
		var subtargeting = splitPlacementName[16];

		var networkParams = null;
		var networkParamsImps;
		var landingPage;
		var placement = null;
		var finalLink = null;
		var finalImpLink = null;
		var nonafLink = null;
		var utmParamsIOS = null;
		var utmParamsAND = null;
		var utmParamsDESK = null;

		var site = agency + "-" + dsp + "-" + publisher;
		var amsSub4 = "&af_sub4=" + ams;
		var appLinkKey = brand + "-" + geo + "-" + platform;
		//retrieve values from indexedDB
		var appLink = getApp.click[appLinkKey];
		var impLink = getApp.imp[appLinkKey];




		switch (channel.toLowerCase()) {
			case "paidsocial":
				var utmParamsIOS = "&source=" + ams + "&utm_medium=paidsocial&utm_source=" + publisher.toLowerCase() + "&utm_campaign=" + campaign.toLowerCase();
				var utmParamsAND = "&source=" + ams + "&utm_medium=paidsocial&utm_source=" + publisher.toLowerCase() + "&utm_campaign=" + campaign.toLowerCase();
				var utmParamsDESK = "?source=" + ams + "&utm_medium=paidsocial&utm_source=" + publisher.toLowerCase() + "&utm_campaign=" + campaign.toLowerCase();
				break;
			case "affiliates":
				var utmParamsIOS = "?source=" + ams;
				var utmParamsAND = "?source=" + ams;
				var utmParamsDESK = "?source=" + ams;
			break;
			case "display":
				var utmParamsIOS = "&source=" + ams + "&utm_medium=display&utm_source=" + publisher.toLowerCase() + "&utm_campaign=" + campaign.toLowerCase();
				var utmParamsAND = "&source=" + ams + "&utm_medium=display&utm_source=" + publisher.toLowerCase() + "&utm_campaign=" + campaign.toLowerCase();
				var utmParamsDESK = "?source=" + ams + "&utm_medium=display&utm_source=" + publisher.toLowerCase() + "&utm_campaign=" + campaign.toLowerCase();
			break;
			case "crm":
				var utmParamsIOS = "&source=" + ams + "&utm_medium=crm&utm_source=" + publisher.toLowerCase() + "&utm_campaign=" + campaign.toLowerCase();
				var utmParamsAND = "&source=" + ams + "&utm_medium=crm&utm_source=" + publisher.toLowerCase() + "&utm_campaign=" + campaign.toLowerCase();
				var utmParamsDESK = "?source=" + ams + "&utm_medium=crm&utm_source=" + publisher.toLowerCase() + "&utm_campaign=" + campaign.toLowerCase();
		}

		switch (platform.toLowerCase()) {
		  case "ios":
			landingPage = iosLP;
			networkParams = getNetworks.ios.click[networkName];
			networkParamsImps= getNetworks.ios.imp[networkName];
			finalLink = buildFinalLink(appLink, c, amsSub4, networkParams, landingPage, networkParamsImps, utmParamsIOS);
			break;
		  case "and":
			landingPage = andLP;
			networkParams = getNetworks.and.click[networkName];
			networkParamsImps= getNetworks.and.imp[networkName];
			finalLink = buildFinalLink(appLink, c, amsSub4, networkParams, landingPage, networkParamsImps, utmParamsAND);
			break;
		  case "dis":
			 networkParamsImps=null;
			 networkParams = getNetworks.and.click[networkName];
			 finalLink = buildFinalOneLink(appLink, c, amsSub4, networkParams, iosLP, andLP, deskLP, networkParamsImps, utmParamsDESK, utmParamsAND, utmParamsIOS, channel);
			break;
		  case "mob":
			networkParamsImps=null;
			networkParams = getNetworks.and.click[networkName];
			finalLink = buildFinalOneLink(appLink, c, amsSub4, networkParams, iosLP, andLP, deskLP, networkParamsImps, utmParamsDESK, utmParamsAND, utmParamsIOS, channel);
			break;
		  case "ctv":
			landingPage = deskLP;
			appLink = landingPage;
			impLink = null;
			networkParams = utmParamsDESK;
			finalLink = appLink + networkParams;
			break;
		  case "desk":
			landingPage = deskLP;
			appLink = landingPage;
			impLink = null;
			networkParams = utmParamsDESK;
			finalLink = appLink + networkParams;
		}

		if (impLink != "" && impLink != null && impLink != undefined){

			if ((networkParamsImps != undefined)&&(networkParamsImps != null)){
				finalImpLink = impLink + "c=" + c + amsSub4 + "&" + networkParamsImps;

			}else{
				finalImpLink = "";
			}

		}
		else{
			finalImpLink = "";
		}

		if (dsp.toLowerCase() == "mediamath" && adserver.toLowerCase() == "ft"){
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

		}else if (dsp.toLowerCase() == "dv360" && landingPage.startsWith("http")){
			finalLink = landingPage + utmParamsDESK;
		}
		else{
			//console.log("No replace");
		}

		if (deskLP.startsWith("http")){
			nonafLink = deskLP + utmParamsDESK;
		}else if (iosLP.startsWith("http")){
			nonafLink = iosLP + utmParamsDESK;
		}else if (andLP.startsWith("http")){
			nonafLink = andLP + utmParamsDESK;
		}
		else{
			nonafLink = "";
		}
		results.push([ams.trim(),placement.trim(),finalLink,finalImpLink,nonafLink,campaignName,tagType,rateType,unitCost,site,conversion,startDate,endDate]);

	}
	//console.table(results);
	makeTable(results);
}

function buildFinalLink(appLink, c, amsSub4, networkParams, landingPage, networkParamsImps, utmParams) {
    if (landingPage.startsWith("http")){

		finalLink = appLink + "c=" + c + amsSub4 + "&" + networkParams + "&af_r=" + landingPage + utmParams;
	}else{
		finalLink = appLink + "c=" + c + amsSub4 + "&" + networkParams;
	}
	return finalLink;
}

function buildFinalOneLink(appLink, c, amsSub4, networkParams, iosLP, andLP, deskLP, networkParamsImps, utmParamsDESK, utmParamsAND, utmParamsIOS, channel) {

	if ((deskLP.startsWith("http")) && (iosLP.startsWith("http")) && (andLP.startsWith("http"))){
		finalLink = appLink + "c=" + c + amsSub4 + "&" + networkParams + "&af_android_url=" + andLP + utmParamsAND + "&af_ios_url=" + iosLP + utmParamsIOS + "&af_web_dp=" + deskLP + utmParamsDESK;
	}else if ((deskLP.startsWith("http")) && (iosLP.startsWith("http")) && (andLP == "")){
		finalLink = appLink + "c=" + c + amsSub4 + "&" + networkParams + "&af_ios_url=" + iosLP + utmParamsIOS + "&af_web_dp=" + deskLP + utmParamsDESK;
	}else if ((deskLP.startsWith("http")) && (iosLP == "") && (andLP.startsWith("http"))){
		finalLink = appLink + "c=" + c + amsSub4 + "&" + networkParams + "&af_android_url=" + andLP + utmParamsAND + "&af_web_dp=" + deskLP + utmParamsDESK;
	}else if ((deskLP.startsWith("http")) && (iosLP == "") && (andLP == "")){
		finalLink = appLink + "c=" + c + amsSub4 + "&" + networkParams + "&af_web_dp=" + deskLP + utmParamsDESK;
	}else {
		finalLink = appLink + "c=" + c + amsSub4 + "&" + networkParams;
	}
	return finalLink;
}

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
