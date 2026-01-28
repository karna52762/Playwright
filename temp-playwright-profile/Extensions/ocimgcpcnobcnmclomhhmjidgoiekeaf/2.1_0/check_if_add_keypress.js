function check_if_add_keypress_event(check_key){
	var EventCount = keypress_start_count;
	var eventdata=GlobalEvent
	var pagedata=GlobalPage
	var parentdata=GlobalParent
	big_key_duplicate=big_key
	if(big_key_duplicate.length>0 && check_key==true){
		var AllDict = {}
		AllDict["category"] = "keypress";
		AllDict["key"] = big_key_duplicate;
		chrome.tabs.query({
			active: true
		}, function(tabs) {
			AllDict["tabid"] = tabs[0].id;
			AllDict["index"] = tabs[0].index;
			AllDict["url"] = tabs[0].url;
			var PageCount=EventCount
			var notname = "keypress" + String(EventCount);
			var title = "Key pressed " + String(big_key_duplicate);
			var message = "You typed "+String(big_key_duplicate);
			createNotification(notname, title, message)
			var menu={"Event":eventdata,"Page":pagedata,"Parent":parentdata}
			SendDataFirebaseWithRefMenu_Keypress(false, "", user+"/"+bot, EventCount, PageCount, AllDict,menu);
		});                
	big_key=""
	}
}