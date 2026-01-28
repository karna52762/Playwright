var UrlHistoryDict={}
    ///BackwordForwardUrl() urlCount()
    function urlCount(url) {
        urlcount = 0;
        for (var i in url) {
            urlcount = urlcount + 1;
        }
        return urlcount;
    }

    //
    function CompareUrlSting(url, addurl) {
        //console.log("url match operation",url ,"========", addurl )
        console.log('compareurlstring')
        console.log(url);
        console.log(addurl);
        newurl = urlCount(url)
        console.log(newurl);
        savedurl = urlCount(addurl)
        console.log(savedurl);
        loopcount = 0;
        if (newurl > savedurl) {
            loopcount = newurl;
        } else if (newurl == savedurl) {
            if (newurl > 0) {
                loopcount = savedurl;
            }
        } else {
            loopcount = savedurl;
        }
        console.log(loopcount);
        //console.log("urlciount=", loopcount ,"--newurl=", newurl ,"---savedurl=", savedurl)
        count = 0;
        for (var i = 0; i < loopcount; i++) {
            ////console.log("data", url[i])
            if (url[i] == addurl[i]) {
                count = count + 1;
                ////console.log("match", url[i],"==", addurl[i])
            }
        }
        console.log("count match", count)
        return count;
    }

    function BackwardOperation(tabid, url, pageindex, eType, back, addurl, UrlHistoryDict) {
        selectoperation = "backward";
        mySuperCallbackBackward(tabid, url, pageindex, eType);
        console.log("backword operation", tabid, url, pageindex, eType, back, addurl, UrlHistoryDict)
        ////console.log("url bk current back operation",selectoperation)
        var Dict = {};
        Dict["index"] = back;
        Dict[tabid] = addurl;
        UrlHistoryDict[tabid] = Dict;
        console.log(" Dict found set index at back ---------", Dict, "index set", back);
    }

    function ForwardOperation(tabid, url, pageindex, eType, forward, addurl, UrlHistoryDict) {
        selectoperation = "forward";
        mySuperCallbackForward(tabid, url, pageindex, eType);
        console.log("forwardword operation", tabid, url, pageindex, eType, forward, addurl, UrlHistoryDict)

        ////console.log("url bk currentforward operation", selectoperation)
        var Dict = {};
        Dict["index"] = forward;
        Dict[tabid] = addurl;
        UrlHistoryDict[tabid] = Dict;
    }

    // update url 
    function BackwordForwardUrl(tabid, url, pageindex, eType) {
        var selectoperation = "";
        if (UrlHistoryDict[tabid] != undefined) {
            var urlDict = UrlHistoryDict[tabid];
            var index = parseInt(urlDict["index"]);
            console.log("url backforward() start index-------", urlDict, index, url)
            var addurl = urlDict[tabid];

            var selectoperation = "";
            var back = index - 1;
            var forward = index + 1;
            console.log("url --", url, "prvindex ", index, "bk index", back, "==url", addurl[back], "forward", forward, "==", addurl[forward])
            var urlStrMatchCount = 0;
            var StrMatchDict = {};
            if (index > 0) {
                //BackwardOperation(tabid, url,pageindex , eType , back ,addurl ,  UrlHistoryDict );      
                if (url == "chrome-search://local-ntp/local-ntp.html") {
                    StrMatchDict["backward"] = 55555555;
                } else {
                    urlStrMatchCount = CompareUrlSting(url, addurl[back]);
                    ////console.log("url count back compare string", urlStrMatchCount);
                    StrMatchDict["backward"] = urlStrMatchCount;
                }


            } else {
                StrMatchDict["backward"] = 0;

            }
            if (addurl[forward] != undefined) {

                //ForwardOperation(tabid, url,pageindex , eType , forward ,addurl , UrlHistoryDict );

                urlStrMatchCount = CompareUrlSting(url, addurl[forward]);
                ////console.log("url count for compare string", urlStrMatchCount);
                StrMatchDict["forward"] = urlStrMatchCount;
            } else {
                StrMatchDict["forward"] = 0;
            }

            // url not match for both back and forward 
            if (StrMatchDict["backward"] > 0 && StrMatchDict["forward"] > 0) {
                console.log("url back and forward greter than zero", StrMatchDict["backward"], StrMatchDict["forward"])
                if (StrMatchDict["backward"] >= StrMatchDict["forward"]) {
                    console.log("url backword operation StrMatchDict[backward] 11 perform")
                    BackwardOperation(tabid, url, pageindex, eType, back, addurl, UrlHistoryDict);
                    selectoperation = "backward";
                } else {
                    console.log("url forward StrMatchDict[forward] operation perform")
                    ForwardOperation(tabid, url, pageindex, eType, forward, addurl, UrlHistoryDict);
                    selectoperation = "forward";
                }
            } else if (StrMatchDict["backward"] > 0) {
                console.log("url backword els if operation 2222 perform")
                BackwardOperation(tabid, url, pageindex, eType, back, addurl, UrlHistoryDict);
                selectoperation = "backward";
            } else if (StrMatchDict["forward"] > 0) {
                console.log("url forward  else if operation perform")
                ForwardOperation(tabid, url, pageindex, eType, forward, addurl, UrlHistoryDict);
                selectoperation = "forward";
            }


        }
        console.log("url after backfor perform ", UrlHistoryDict, "selectoperation", selectoperation)

    }

    // add url
    function AddUrl(tabid, url, transitionType) {
        console.log('in AddUrl');
        var newurl = {};
        if (UrlHistoryDict[tabid] != undefined) {
            console.log('LOOOOOK here',UrlHistoryDict[tabid]);
            console.log(tabid);
            console.log(UrlHistoryDict[tabid]);
            console.log(UrlHistoryDict[tabid][tabid]);

            var iurl = UrlHistoryDict[tabid][tabid][Number(UrlHistoryDict[tabid]['index'])]
            console.log(iurl);
            console.log(url);
            console.log('do they match ?')
            //console.log(UrlHistoryDict[tabid][Number(UrlHistoryDict['index'])]);


            if (iurl == url) {
				console.log(" NOT INSERT EVENT")
                console.log("new url is also added into url history ", UrlHistoryDict[tabid]["index"], url)
            } else {
				console.log("INSERT EVENT")
                console.log("new url is  not match with also added into url history ", UrlHistoryDict[tabid]["index"], url)

                var urlDict = UrlHistoryDict[tabid];
                ////console.log("url Dict--" ,urlDict )
                var currentindex = parseInt(urlDict["index"]) + 1;

                ////console.log("url current index current ----", currentindex );
                var addurl = urlDict[tabid];
                var checkurl = false;

                for (var i = 0; i < currentindex; i++) {
                    newurl[i] = addurl[i];
                    ////console.log("url data---" , i," url",addurl[i]  );
                }
                ////console.log("url add newurl url---" ,newurl ,Object.keys(addurl).length , "new url", Object.keys(newurl).length )
                var length = Object.keys(newurl).length;
                newurl[length] = url;

                ////console.log("url add afetr check length", addurl ,"newurl" , newurl)
                var Dict = {};
                Dict["index"] = currentindex;
                Dict[tabid] = newurl;
                UrlHistoryDict[tabid] = Dict;

            }

            console.log(UrlHistoryDict);

        } else {

            ////console.log(" url -undefined  window")
            var Dict = {};
            if (transitionType == "start_page") {
                Dict["index"] = 0;
                Dict[tabid] = {
                    0: url
                };
            }
            if (transitionType == "link") {
                Dict["index"] = 0;
                Dict[tabid] = {
                    0: url
                };
            } else {
                Dict["index"] = 1;
                Dict[tabid] = {
                    0: "",
                    1: url
                };
            }

            UrlHistoryDict[tabid] = Dict;
        }
        console.log("web navigation url add afternew add data ---", UrlHistoryDict)

    }
