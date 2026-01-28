
    function mySuperCallbackForward(newId, newUrl, index, type) {
        if (recording) {
			var EventCount=globalCount
			var PageCount = EventCount;
			SetEventCountinFirebase(EventCount, EventCount, "", 1)
            var UpdateData = {};
            UpdateData['category'] = "forward";
            UpdateData['tabid'] = newId;
            UpdateData['url'] = newUrl;
            UpdateData['index'] = index;
            UpdateData['type'] = type;
			SendDataFirebaseWithoutRef(false, "", user+"/"+bot, EventCount, PageCount, UpdateData)
			var notname = "forvevent" + String(EventCount);
			var title = "Forward Page action done in Api " + String(EventCount);
			var message = "...";
			createNotification(notname, title, message)
        }
    }
function mySuperCallbackBackward(newId, newUrl, index, type) {
        if (recording) {
			var EventCount=globalCount
			var PageCount = EventCount;
			SetEventCountinFirebase(EventCount, EventCount, "", 1)
            var UpdateData = {};
            UpdateData['category'] = "backward";
            UpdateData['tabid'] = newId;
            UpdateData['url'] = newUrl;
            UpdateData['index'] = index;
            UpdateData['type'] = type;
			SendDataFirebaseWithoutRef(false, "", user+"/"+bot, EventCount, PageCount, UpdateData)
			var notname = "backvevent" + String(EventCount);
			var title = "Backward Page action done in Api " + String(EventCount);
			var message = "...";
			createNotification(notname, title, message)
        }
    }