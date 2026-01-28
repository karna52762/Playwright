function notify(category){
	var title;
	if(category=='solvecaptcha'){
		title='Solve Captcha Action done';
	var msg=''}
	else{ 
		title="Save Action done";
		var msg='Data will be scraped and returned in response'
	}
	var notname = "saveevent";
    
    createNotification(notname, title, msg)
}
function save_function(category, selectionText, pageUrl, id, index, menuItemId, menu, vrb) {
    var UpdateData = {};
    UpdateData['category'] = category;
    UpdateData['text'] = selectionText;
    UpdateData['url'] = pageUrl;
    UpdateData["tabid"] = id;
    UpdateData["index"] = index;
	if(category=='solvecaptcha')
		UpdateData['variable']=vrb;
	else
		UpdateData["column"] = vrb;
	var EventCount = globalCount;
	var PageCount = globalCount;
	if(recording){
	SetEventCountinFirebase(EventCount, PageCount, user+"/"+bot, 1);
	SendDataFirebaseWithoutRefMenu(false, "", user+"/"+bot,EventCount, PageCount, UpdateData, menu);
	notify(category);
	}
}
function ContextMenuFunctionSave(category, selectionText, pageUrl, id, index, menuItemId, menu, vrb){
	if(pageUrl==undefined){
		chrome.tabs.sendMessage(id,{"get_current_url":true},function(pageUrl){
			console.log("pageUrl",pageUrl)
			save_function(category, selectionText, pageUrl, id, index, menuItemId, menu, vrb)
		})
	}
	else{
		save_function(category, selectionText, pageUrl, id, index, menuItemId, menu, vrb)
	}
}



function saveClick(info, tab, vrb, nvrb) {
        var menu = selectedeventdic;
		console.log("menu",menu)
        if (Object.keys(menu).length > 0) {
            var category = "save";
            if (info.selectionText != undefined) {
                ContextMenuFunctionSave(category, info.selectionText, info.pageUrl, tab.id, tab.index, info.menuItemId, menu, vrb);              

            } 
			else {
                if (menu['text'] != undefined && menu['text'] != '') {                                           
                    ContextMenuFunctionSave(category, menu["text"], info.pageUrl, tab.id, tab.index, info.menuItemId, menu, vrb);
                    
                } 
				else {
					var menu = copyeventdic;
					ContextMenuFunctionSave(category, menu["text"], info.pageUrl, tab.id, tab.index, info.menuItemId, menu, vrb);}
            }
			createNotification("save"+vrb, "Scrape Text action done", "Data will be scraped")

        }
}

function saveLink(info, tab, vrb, nvrb) {
        var menu = ahrefdic;
        if (Object.keys(menu).length > 0) {
            var category = "savelink";
            if (info.selectionText != undefined) {
                ContextMenuFunctionSave(category, info.selectionText, info.pageUrl, tab.id, tab.index, info.menuItemId, menu, vrb);              

            } else {
                if (menu['text'] != undefined && menu['text'] != '') {                                           
                    ContextMenuFunctionSave(category, menu["text"], info.pageUrl, tab.id, tab.index, info.menuItemId, menu, vrb);
                    
                } else {
                    ContextMenuFunctionSave(category, menu["text"], info.pageUrl, tab.id, tab.index, info.menuItemId, menu, vrb);
                }
            }
			createNotification("savelink"+vrb, "Scrape Link action done", "Link will be scraped"+vrb+"'")
        }
}

function saveImg(info, tab, vrb, nvrb) {
    console.log('step1');
        var menu = copyeventdic;
        console.log('step2');
        console.log('menuImg ', menu);
        console.log('step3');
        
        if (Object.keys(menu).length > 0) {
            var category = "saveimage";
            console.log('step4');                          
                        ContextMenuFunctionSave(category, menu["text"], info.pageUrl, tab.id, tab.index, info.menuItemId, menu, vrb);
                createNotification("saveimg"+vrb, "Save image action done", "Image will be saved to '"+vrb+"'")
            }
}
function saveSrc(info, tab, vrb, nvrb,category) {
    console.log('step1');
        var menu = copyeventdic;
        console.log('step2');
        console.log('menuImg ', menu);
        console.log('step3');
        
        if (Object.keys(menu).length > 0) {
            console.log('step4');            
			ContextMenuFunctionSave(category, menu["text"], info.pageUrl, tab.id, tab.index, info.menuItemId, menu, vrb);					
			createNotification(category+vrb, category+" action done", "Data will be scraped to column '"+vrb+"'")
                
            }
}
function saveCaptcha(info, tab) {
    console.log('step1');
	var vrb="captcha";
        var menu =copyeventdic;
        console.log('step2');
        console.log('menuImg ', menu);
        console.log('step3');
        
        if (Object.keys(menu).length > 0) {
            var category = "solvecaptcha";
            console.log('step4');                      
                        ContextMenuFunctionSave(category, menu["text"], info.pageUrl, tab.id, tab.index, info.menuItemId, menu, vrb);
						addCaptchaToPaste();
					createNotification("solvecaptcha"+vrb, "Solve captcha action done", "Captcha text will be saved to variable '"+vrb+"'")
                
            }
}

function saveAllLinks(info, tab, vrb, nvrb) {
    console.log('step1');
        var menu = selectedeventdic;
        
        if (Object.keys(menu).length > 0) {
            var category = "savelinks";
            console.log('step4');
            if (info.selectionText != undefined) {
              
                console.log('step5');
                ContextMenuFunctionSave(category, info.selectionText, info.pageUrl, tab.id, tab.index, info.menuItemId, menu, vrb);              

            } else {
                console.log('step6');
                if (menu['text'] != undefined && menu['text'] != '') {
                    console.log('step7');
                                           
                    ContextMenuFunctionSave(category, menu["text"], info.pageUrl, tab.id, tab.index, info.menuItemId, menu, vrb);
                    
                } else {
                    console.log('step8');
                        var menu = copyeventdic;
                                         
                        ContextMenuFunctionSave(category, menu["text"], info.pageUrl, tab.id, tab.index, info.menuItemId, menu, vrb);
                }
            }
			createNotification("savealllinks"+vrb, "Scrape All Links action done", "All links will be scraped to column '"+vrb+"'")

        }
}


