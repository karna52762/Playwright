
function mySuperCallbackActivate(newId, newUrl, name, index, type) {
    if (recording) {
        var UpdateData = {};
        UpdateData['tabid'] = newId;
        UpdateData['url'] = newUrl;
        UpdateData['index'] = index;
        UpdateData['category'] = "switch";
        UpdateData['type'] = type;
		var EventCount = globalCount;
		var PageCount = globalCount;
		SetEventCountinFirebase(EventCount, PageCount, user+"/"+bot, 1)
		SendDataFirebaseWithoutRef(false, "", user+"/"+bot, EventCount, PageCount, UpdateData)
		var notname = "switchevent" + String(EventCount);
		var title = "Switch to tab recorded " + String(EventCount);
		var message = "..."
		createNotification(notname, title, message);
    }

}
function getActivatedTab(activeInfo){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        try{
            if(tabs[0]!=undefined){
				var text = "active";
				chrome.tabs.get(activeInfo.tabId, function(tab) {
					if (tab.url != undefined) {
						if (tab.url != "chrome://newtab/") {
							if (tab.url != "") {
								mySuperCallbackActivate(activeInfo.tabId, tab.url, text, tab.index, 'manual');
								
							} 
							else {
								if (tab.pendingUrl != undefined) {
									if (tab.pendingUrl != "chrome://newtab/") {
										setTimeout(function() {
											mySuperCallbackActivate(activeInfo.tabId, tab.pendingUrl, text, tab.index, 'automatic');
										}, 3000);
									}
								} else {
									
									mySuperCallbackActivate(activeInfo.tabId, "", text, tab.index, 'manual');
									
								}
							}
						} 
					}

					}); 
            }
        }
        catch(err){
            setTimeout(function() {
            getActivatedTab(activeInfo);
            },100);
        }
    })
}
chrome.tabs.onActivated.addListener(function(activeInfo) {getActivatedTab(activeInfo);});