function clickDo(request){
	console.log("BEFORE SIZE",request.PageSource)
	if(recording){
		var EventCount=globalCount
		SetEventCountinFirebase(EventCount, EventCount, "", 1)
		var UpdateData = {};
		if (request.selectionClick == true) {
			UpdateData["category"] = 'selectionclick';
			chrome.storage.local.get('copiedText', function(cp) {
				UpdateData['selectedtext'] = cp['copiedText'];
				chrome.storage.local.set({
					'selectioncopy': false
				});
			});

		} else{
		UpdateData["category"] = "click";
		}
		chrome.tabs.query({
			active: true
		}, function(tabs) {                   
			if(tabs[0].openerTabId != undefined && tabs[0].openerTabId != null && tabs[0].openerTabId != ''){
				UpdateData["tabid"] = tabs[0].openerTabId;
			}
			else{
				UpdateData["tabid"] = tabs[0].id;
			}
			
			UpdateData["index"] = tabs[0].index;
			UpdateData["url"] = tabs[0].url;
			var userref = user+"/"+bot
		var PageCount = EventCount;
		var menu = {};
		menu['Event'] = request.Data;
		menu['Parent'] = request.PData;
		menu['Page'] = request.PageSource;
		SendDataFirebaseWithoutRefMenu(false, '', userref, EventCount, PageCount, UpdateData, menu)
		var notname, title, message;
		if (request.selectionClick == true) {
			notname = "selectionclickevent" + String(EventCount);
			title = "Selection Click recorded " + String(bot);
			message = "This selection will be chosen from input data"
		} else {
			notname = "clickevent" + String(EventCount);
			title = "Click Action recorded " + String(bot);
			message = "..."
		}
		createNotification(notname, title, message);
			
		});
		
}}