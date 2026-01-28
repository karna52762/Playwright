function mySuperCallbackUpdateNew(newId, newUrl, updatefrom, index) {
    if (recording) {
        var UpdateData = {};
        UpdateData['tabid'] = newId;
        UpdateData['url'] = newUrl;
        UpdateData['index'] = index;
		var EventCount = globalCount;
		var PageCount = globalCount;
		SetEventCountinFirebase(EventCount, PageCount, user+"/"+bot, 1)
        if (updatefrom == undefined) {
            UpdateData['switchid'] = '';
        } else {
            UpdateData['switchid'] = updatefrom;
        }
        if (newUrl == "chrome://newtab/") {
            UpdateData['category'] = "newtab";
			SendDataFirebaseWithoutRef(false, "", user+"/"+bot, EventCount, PageCount, UpdateData);
			var notname = "newtabevent" + String(EventCount);
			var title = "New Tab action recorded " +  String(EventCount);
			var message = "..."
			createNotification(notname, title, message)

        }
    }

}
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, updatedTab) {
        var text = "update";
        if (changeInfo.status == 'loading') {
            if (changeInfo.url != undefined) {
                var updateidfrom = updatedTab.openerTabId;
                if (changeInfo.url == "chrome://newtab/") {
                    if (updateidfrom != undefined) {
                        mySuperCallbackUpdateNew(tabId, changeInfo.url, updateidfrom, updatedTab.index);
                    }
                }

            }
        } else if (changeInfo.status == 'complete') {
            chrome.tabs.query({
                active: true
            }, function(tabs) {
                AddUrl(tabs[0].id, tabs[0].url, '');
            });
            

        }

    });