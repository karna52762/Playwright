chrome.tabs.onRemoved.addListener(function(tabid, removed) {
    var deletetab = 0;
    for (key in UrlHistoryDict) {
        if (key == tabid) {
            deletetab = tabid;
        }
    }
    if (deletetab > 0) {
        delete UrlHistoryDict[deletetab];
    }
    if (recording) {
        var UpdateData = {};
        UpdateData['category'] = "closetab";
        UpdateData["tabid"] = tabid;
		var EventCount = globalCount;
		var PageCount = globalCount;
		SetEventCountinFirebase(EventCount, PageCount, user+"/"+bot, 1)
		SendDataFirebaseWithoutRef(false, "", user+"/"+bot, EventCount, PageCount, UpdateData);
		var notname = "closetabevent" + String(EventCount);
		var title = "Tab Close recorded " + String(EventCount);
		var message = "..."
		createNotification(notname, title, message)
    }
})


