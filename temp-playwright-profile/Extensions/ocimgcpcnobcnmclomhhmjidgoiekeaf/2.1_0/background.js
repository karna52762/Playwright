console.log("Here Welcome")
var user_id=""
chrome.storage.local.set({"page":"start_page"})
function createNotification(notname, nottitle, notmessage) {
	var notdic={
		type: 'basic',
		iconUrl: 'images/note3.png',
		title: nottitle,
		message: notmessage
	}
    chrome.notifications.create(notname, notdic,
        function(notification) {
			setTimeout(function(){
					chrome.notifications.clear(notification, function(){console.log("CLEARED",notification)} )
				},5000)
        });
	}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log("Request:-",request)
	check_key=false
	if(request.keypresscount==undefined){check_key=true}
	else if(request.keypresscount.length>1){check_key=true}
	check_if_add_keypress_event(check_key)
	
	
	if(request.notification==true){
		createNotification(request.name, request.title, request.desc)
	}
	else if (request.EventCounter != undefined) {
        clickDo(request)}
	else if (request.keypresscount != undefined) {
		keyPressDo(request)
	}
	else if(request.save_dic!=undefined){
		if(request.save_dic=="copyevent"){copyeventdic=request.repeatDict}
		if(request.save_dic=="ahref"){ahrefdic=request.repeatDict}
		if(request.save_dic=="imgNode"){imgNodedic=request.repeatDict}
	}
	else if(request.selectedeventdic!=undefined){
		selectedeventdic=request.selectedeventdic;
		LastEventDic=request.selectedeventdic.Event;LastParentDic=request.selectedeventdic.Parent
	}
	else if(request.notification==true){
		createNotification(request.name, request.title, request.desc)
	}
	else if(request.start_stop_button=="Start Recording"){
		recording=true;bot_list=[];selenium_pro_code="";selenium_code="";selenium_pro_code_dic={};selenium_code_dic={};globalCount=0;events_order_dic={}
		createNotification("started", "Recorder Started..", "...")
	}
	else if(request.start_stop_button=="Stop Recording"){
		recording=false
		createNotification("started", "Recorder Stopped..", "...")
	}
	else if(request.get_code==true){
		var code=selenium_code
		if(current_code_page=="selenium_pro"){
			code=selenium_pro_code
		}
		sendResponse({"current_code_page":current_code_page,"code":code})
	}
	else if(request.clear_code==true){
		clear_code()
	}
	else if(request.copy_python_code==true){
		var copytext=selenium_code
		if(copytext==""){
			copytext="from selenium import webdriver\nfrom selenium.webdriver.common.by import By\nfrom webdriver_manager.chrome import ChromeDriverManager\nfrom elements_manager import *\ndriver = webdriver.Chrome(ChromeDriverManager().install())"
		}
		if(current_code_page=="selenium_pro"){
			copytext=selenium_pro_code
			if(copytext==""){
			copytext="from selenium_pro import webdriver\ndriver = webdriver.Start()"
		}
		}
		console.log("Copying Code",copytext)
		//chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {console.log("tabs",tabs);chrome.tabs.sendMessage(tabs[0].id,  {"copyText": copytext}, function(response) {});});
		sendResponse(copytext);
		createNotification("copiedclipboard", "Copied to Clipboard", "")
	}
	else if(request.is_recording==true){
		sendResponse(recording)
	}
	else if(request.page_saved!=undefined){
		page_saved_dic[request.key]=request.page_saved
	}
	else if(request.get_current_code_page!=undefined){
		sendResponse(current_code_page)
	}
	else if(request.set_current_code_page!=undefined){
		current_code_page=request.set_current_code_page
	}
})
