function mySuperCallbackUpdateUrl(newId, newUrl, index, type) {
	var EventCount = globalCount;
	if(recording){
		SetEventCountinFirebase(EventCount, EventCount, "", 1);
	}
    if (recording) {
        var UpdateData = {};
        UpdateData['category'] = "url";
        UpdateData['tabid'] = newId;
        UpdateData['url'] = newUrl;
        UpdateData['index'] = index;
        UpdateData['type'] = type;
		var userref =user+"/"+bot
		var text2 = userref.split("/");
		var PageCount = globalCount;
		if (text2.length >= 2) {
				var addcheck = false;
				SendDataFirebaseWithoutRef(false, "", userref, EventCount, PageCount, UpdateData);
				var notname = "urlevent" + String(EventCount);
				var title = "Url action recorded " + String(text2[1]);
				var message = newUrl.toString()+" will be opened when Api will run";
				createNotification(notname, title, message);
			;}}}
				
function ChecktransitionQualifiers(tabid, url, index, transitionType, transitionQualifiers) {
        if (transitionQualifiers[0] != undefined) {
            if (transitionQualifiers.indexOf("forward_back") >= 0) {
            } else {
                AddUrl(url);

            }
        } else {
            AddUrl(url);


        }
    }
    chrome.webNavigation.onCommitted.addListener(function(e) {
        if (e.transitionType == "typed" || e.transitionType == "generated" || e.transitionType == "reload" || e.transitionQualifiers[0] == "from_address_bar") {
            if (e.url != undefined) {
				
                chrome.tabs.query({
                    active: true,
                    currentWindow: true
                }, function(tabs) {

                    if (tabs[0].url != undefined) {
                        if (e.tabId == tabs[0].id) {
                            var tabid = tabs[0].id;
                            var activedata = {};
                            activedata["tabid"] = tabs[0].id;
                            activedata["index"] = tabs[0].index;
                            activedata["url"] = tabs[0].url;
                            chrome.storage.local.set({
                                activetabs: activedata
                            }, function() {
                            });
                            var bktype = "";
                            if (e.transitionQualifiers[0] != undefined) {
                                if (e.transitionQualifiers.indexOf("forward_back") >= 0) {
                                    BackwordForwardUrl(tabid, e.url, tabs[0].index, e.transitionType);
                                } else {
                                    if (e.url != "chrome-search://local-ntp/local-ntp.html"&&e.url!="chrome://new-tab-page/") {
                                        AddUrl(tabid, e.url, e.transitionType);

                                        mySuperCallbackUpdateUrl(tabid, e.url, tabs[0].index, e.transitionType);
                                    }
                                }
                            } else {
                                if (e.url != "chrome-search://local-ntp/local-ntp.html"&&e.url!="chrome://new-tab-page/") {
                                    AddUrl(tabid, e.url, e.transitionType);

                                    mySuperCallbackUpdateUrl(tabid, e.url, tabs[0].index, e.transitionType);
                                }
                            }


                        } // tab id match
                    } else {
                        chrome.storage.local.get('activetabs', function(activedata) {
                            if (activedata["activetabs"] != undefined) {
                                var tabid = activedata["activetabs"]["tabid"];
                                var index = activedata["activetabs"]["index"];
                                var taburl = activedata["activetabs"]["url"];
                                if (e.tabId == tabid) {
                                    if (e.transitionQualifiers[0] != undefined) {
                                        if (e.transitionQualifiers.indexOf("forward_back") >= 0) {
                                            BackwordForwardUrl(tabid, e.url, index, e.transitionType);
                                        } else {
                                            if (e.url != "chrome-search://local-ntp/local-ntp.html"&&e.url!="chrome://new-tab-page/") {
                                                AddUrl(tabid, e.url, e.transitionType);

                                                mySuperCallbackUpdateUrl(tabid, e.url, index, e.transitionType);
                                            }
                                        }
                                    } else {
                                        
                                        if (e.url != "chrome-search://local-ntp/local-ntp.html"&&e.url!="chrome://new-tab-page/") {
                                            AddUrl(tabid, e.url, e.transitionType);
                                            mySuperCallbackUpdateUrl(tabid, e.url, index, e.transitionType);
                                        }
                                    }
                                }

                            }
                        });
                    }




                });   

            }

        } else if (e.transitionType == "link") {
            chrome.tabs.query({
                active: true,

            }, function(tabs) {

                if (tabs[0].url != undefined) {
                    if (e.tabId == tabs[0].id) {
                        ChecktransitionQualifiers(e.tabId, e.url, tabs[0].index, e.transitionType, e.transitionQualifiers);

                    }
                } else {
                    chrome.storage.local.get('activetabs', function(activedata) {
                        if (activedata["activetabs"] != undefined) {
                            var tabid = activedata["activetabs"]["tabid"];
                            var index = activedata["activetabs"]["index"];
                            var taburl = activedata["activetabs"]["url"];
                            if (e.tabId == tabid) {
                                ChecktransitionQualifiers(tabid, e.url, index, e.transitionType, e.transitionQualifiers);
                            }

                        }
                    });

                }
            });

        } // else if part
        else if (e.transitionType == "form_submit" || e.transitionType == "start_page" || e.transitionType == "auto_bookmark") {
            if (e.url != undefined) {
                if (e.url != "chrome-search://local-ntp/local-ntp.html"&&e.url!="chrome://new-tab-page/") {

                    chrome.tabs.query({
                        active: true,
                        currentWindow: true
                    }, function(tabs) {
						try{
                        if (tabs[0].url != undefined) {
                            if (e.tabId == tabs[0].id) {

                                var activedata = {};
                                activedata["tabid"] = tabs[0].id;
                                activedata["index"] = tabs[0].index;
                                activedata["url"] = tabs[0].url;
                                chrome.storage.local.set({
                                    activetabs: activedata
                                }, function() {

                                });
                                if (e.transitionQualifiers[0] != undefined) {
                                    if (e.transitionQualifiers.indexOf("forward_back") >= 0) {
                                        BackwordForwardUrl(tabs[0].id, e.url, tabs[0].index, e.transitionType);
                                    } else {
                                        AddUrl(tabs[0].id, e.url, e.transitionType);
                                        if (e.transitionType == "auto_bookmark") {
                                            mySuperCallbackUpdateUrl(tabs[0].id, e.url, tabs[0].index, e.transitionType);

                                        }
                                    }
                                } else {
                                    AddUrl(tabs[0].id, e.url, e.transitionType);
                                    if (e.transitionType == "auto_bookmark") {
                                        mySuperCallbackUpdateUrl(tabs[0].id, e.url, tabs[0].index, e.transitionType);

                                    }
                                }
                            } // tab id match
					}}
					catch(err){}

                    });
                }
            }
        } else if (e.transitionQualifiers[0] != undefined) {
            chrome.storage.local.get('activetabs', function(activedata) {
                if (activedata["activetabs"] != undefined) {
                    var tabid = activedata["activetabs"]["tabid"];
                    var index = activedata["activetabs"]["index"];
                    var taburl = activedata["activetabs"]["url"];
                    if (e.transitionQualifiers.indexOf("forward_back") >= 0) {

                        BackwordForwardUrl(tabid, e.url, index, e.transitionType);

                    }
                }


            });
        }


    });