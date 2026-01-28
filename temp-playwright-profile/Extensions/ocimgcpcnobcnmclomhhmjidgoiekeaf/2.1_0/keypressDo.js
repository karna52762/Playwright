
function keyPressDo(request){
	if(request.keypresscount.length>1){
				if(recording){
					var EventCount=globalCount
					var PageCount = EventCount;
					SetEventCountinFirebase(EventCount, EventCount, "", 1)}
                var AllDict = {}
                AllDict["category"] = "keypress";
                AllDict["key"] = request.keypresscount;
				if(request.control_key==true || request.control_key==false){
					AllDict["control_key"] = request.control_key;
				}
                chrome.tabs.query({
                    active: true
                }, function(tabs) {
                    AllDict["tabid"] = tabs[0].id;

                    AllDict["index"] = tabs[0].index;
                    AllDict["url"] = tabs[0].url;
					if (recording) {
                                        if (request.keypresscount.length > 1) {
                                            var notname = "Keypress " + String(EventCount);
                                            var title = "Key pressed " + String(request.keypresscount);
                                            var message = '"'+request.keypresscount.toString()+'" will be pressed';
                                            createNotification(notname, title, message)

                                        }
											var menu=copyeventdic;
                                        SendDataFirebaseWithoutRef(false, "", user+"/"+bot, EventCount, PageCount, AllDict);
                                    }
                });
}
else{
	if (recording) {
	big_key=big_key+request.keypresscount.toString();
	if(big_key.length==1){
		GlobalEvent=request.Data
		GlobalPage=request.pagesource
		GlobalParent=request.PData
		EventCount=globalCount
		SetEventCountinFirebase(EventCount, EventCount, "", 1)
		keypress_start_count=EventCount
	}
	}
}
}