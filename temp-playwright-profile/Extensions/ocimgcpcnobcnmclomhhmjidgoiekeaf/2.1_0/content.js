var gnode;
var progressBarElement,readProgressElement;
var scrollelement=""
function findAHrefInChild(node){
    if(node.node!=undefined)
        node=node.node;
    if(node.innerHTML==undefined)
        return null;
    var tg=node.target;
    if(tg==undefined||tg.tagName==undefined)
        tg=node;
    var tag=tg.tagName
    if(tag.toLowerCase()=='html')
        return null;
    if (node == null || node == undefined)
        return node;
    if(tag.toLowerCase()=='a')
        return node;
    var child=node.childNodes;
    var fnd=null;
    if(child==undefined)
        child=node.target.childNodes;
    var fnd=[];
    child.forEach(function(key,indx){
        console.log(key,indx)
        fnd[indx]=findAHrefInChild(key);

    });
    var nd=null;
    child.forEach(function(key,indx){
        if(fnd[indx]!=null)
            nd=fnd[indx];
    });

    return nd;

    }

function findImgInParent(node){
    var tg=node.target;
    if(tg==undefined||tg.tagName==undefined)
        tg=node;
    var tag=tg.tagName
    if(tag.toLowerCase()=='html')
        return null;
    if (node == null || node == undefined)
        return node;
    var child=node.childNodes;
    var fnd=null;
    if(child==undefined)
        child=node.target.childNodes;
    child.forEach(function(key){
        if(key.tagName=='img')
            fnd=key;
    });

    if(fnd!=null)
        return fnd;
    
    var p=node.parentNode;
    if(p==undefined)
        p=node.target.parentNode;
    return findImgInParent(p);

    }

function findAHrefInParent(node){
    // var tg=node.target;
    // if(tg==undefined||tg.tagName==undefined)
    //     tg=node;
    // var tag=tg.tagName
    // if(tag.toLowerCase()=='html')
    //     return null;
    // if (node == null || node == undefined)
    //     return node;
    // var child=node.childNodes;
    // var fnd=null;
    // if(child==undefined)
    //     child=node.target.childNodes;
    // child.forEach(function(key){
    //     if(key.tagName=='A')
    //         fnd=key;
    // });

    // if(fnd!=null)
    //     return fnd;
    
    // var p=node.parentNode;
    // if(p==undefined)
    //     p=node.target.parentNode;
    // return findAHrefInParent(p);

    var tg=node.target;
    if(tg==undefined||tg.tagName==undefined)
        tg=node;
    var tag=tg.tagName
  if(tag.toLowerCase()=="a"){
    return tg
  }
    if(tag.toLowerCase()=='html')
        return null;
    if (node == null || node == undefined)
        return node;
    var child=node.childNodes;
    var fnd=null;
    if(child==undefined)
        child=node.target.childNodes;
    child.forEach(function(key){
        if(key.tagName=='A')
            fnd=key;
    });

    if(fnd!=null)
        return fnd;
    
    var p=node.parentNode;
    if(p==undefined)
        p=node.target.parentNode;
    return findAHrefInParent(p);
    }

function getElementIdx(elt) {
    var count = 1;
    for (var sib = elt.previousSibling; sib; sib = sib.previousSibling) {
        if (sib.nodeType == 1 && sib.tagName == elt.tagName) count++
    }
    return count;
}
// pass event get xpth of click element 
function getElementXPath(elt) {
	console.log("elt",elt);
    var path = "";
    for (; elt && elt.nodeType == 1; elt = elt.parentNode) {
		console.log("elt type",elt.nodeType);
		console.log("elt1",elt);
        idx = getElementIdx(elt);
        xname = elt.tagName.toLowerCase();
        if (idx > 1) xname += "[" + idx + "]";
        path = "/" + xname + path;
    }
    return path;
}

// find element by xpath pass xpath find that element
function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

// cellChecktrue if sheet found then get element and its parent attributes
function cellChecktrue(event,callback) {
	var dict={},ParentDict={};
    console.log('cellChecktrue');
    var childtargetElement = event.target || event.srcElement;
    var parent = event.target.parentNode.parentNode.parentNode;
    var PtargetElement = event.target.parentNode.parentNode.parentNode || event.srcElement.parentNode.parentNode.parentNode;
    ParentDict["tag"] = parent.tagName.toLowerCase();
    ParentDict["tagtext"] = childtargetElement.textContent;
    var Parentxpath = getElementXPath(event.srcElement.parentNode.parentNode.parentNode);
    ParentDict["xpath"] = Parentxpath;
    var pcxlength = Parentxpath.split("/");
    ParentDict['xlength'] = pcxlength.length - 1;
    try {
        var taghtml = parent.outerHTML;
        ParentDict["taghtml"] = String(taghtml);
    } catch (err) {

        ParentDict["taghtml"] = "";
    }
    console.log(ParentDict);
    if (PtargetElement.hasAttributes()) { // find element attributes save in dictionary
        var atts = PtargetElement.attributes;
        for (var p = atts.length - 1; p >= 0; p--) {
            ParentDict[atts[p].name] = atts[p].value;
        }
    }
    console.log(ParentDict);
    
    var targetElement = event.target.parentNode.parentNode || event.srcElement.parentNode.parentNode;
    var x = event.target.parentNode.parentNode.tagName.toLowerCase(); // tag name
    dict["tag"] = x;
    var Childxpath = getElementXPath(event.srcElement.parentNode.parentNode);
    dict["xpath"] = Childxpath;
    var ccxlength = Childxpath.split("/");
    dict['xlength'] = ccxlength.length - 1;
    try {
        var childtaghtml = targetElement.outerHTML;
        dict["taghtml"] = String(childtaghtml);
    } catch (err) {
        dict["taghtml"] = "";
    }
    dict["tagtext"] = childtargetElement.textContent;
    console.log(dict);
    if (targetElement.hasAttributes()) {
        var attrs = targetElement.attributes;
        ////console.log("tag name",x,"===== text",targetElement.textContent)
        for (var k = attrs.length - 1; k >= 0; k--) {
            dict[attrs[k].name] = attrs[k].value
        }
    } else {
        //console.log("blank");
    }
    var PageSourceClick = document.documentElement.outerHTML; // page source
    
    var copyLinktag = event.target.querySelector('a')
    if (copyLinktag != undefined) {
        var linkDict = {};
        linkDict["href"] = childtargetElement.textContent;
        linkDict["Event"] = dict;
        linkDict["Parent"] = ParentDict;
        linkDict["Page"] = PageSourceClick;
        linkDict["text"] = childtargetElement.textContent;
    } else {
        console.log("data")
    }
    var sheetselectedtext = childtargetElement.textContent; /// text of click cell
    callback([dict, ParentDict,sheetselectedtext]);
}

function cellChecktruechild(event,callback) {
	var dict={},ParentDict={};
    console.log('cellChecktruechild');
    var childtargetElement = event.target || event.srcElement;
    var parent = event.target.parentNode;
    var PtargetElement = event.target.parentNode || event.srcElement.parentNode;
    ParentDict["tag"] = parent.tagName.toLowerCase();
    ParentDict["tagtext"] = childtargetElement.textContent;
    var Parentxpath = getElementXPath(event.srcElement.parentNode);
    ParentDict["xpath"] = Parentxpath;
    var pcxlength = Parentxpath.split("/");
    ParentDict['xlength'] = pcxlength.length - 1;
    try {
        var taghtml = parent.outerHTML;
        ParentDict["taghtml"] = String(taghtml);
    } catch (err) {
        ////console.log("error in false 23--", err);
        ParentDict["taghtml"] = "";
    }
    if (PtargetElement.hasAttributes()) { // find element attributes save in dictionary
        var atts = PtargetElement.attributes;
        for (var p = atts.length - 1; p >= 0; p--) {
            ParentDict[atts[p].name] = atts[p].value;
        }
    }
    
    var targetElement = event.target || event.srcElement;
    var x = event.target.tagName.toLowerCase(); // tag name
    dict["tag"] = x;
    var Childxpath = getElementXPath(event.srcElement);
    dict["xpath"] = Childxpath;
    var ccxlength = Childxpath.split("/");
    dict['xlength'] = ccxlength.length - 1;
    try {
        var childtaghtml = targetElement.outerHTML;
        dict["taghtml"] = String(childtaghtml);
    } catch (err) {
        //console.log("error in false 23--", err);
        dict["taghtml"] = "";
    }
    dict["tagtext"] = childtargetElement.textContent;
    if (targetElement.hasAttributes()) {
        var attrs = targetElement.attributes;
        ////console.log("tag name",x,"===== text",targetElement.textContent)
        for (var k = attrs.length - 1; k >= 0; k--) {
            dict[attrs[k].name] = attrs[k].value
        }
    } else {
        //console.log("blank");
    }
    var PageSourceClick = document.documentElement.outerHTML; // page source
    
    var copyLinktag = event.target.querySelector('a')
    if (copyLinktag != undefined) {
        var linkDict = {};
        linkDict["href"] = childtargetElement.textContent;
        linkDict["Event"] = dict;
        linkDict["Parent"] = ParentDict;
        linkDict["Page"] = PageSourceClick;
        linkDict["text"] = childtargetElement.textContent;
    } else {
        console.log("data")
    }
    var sheetselectedtext = childtargetElement.textContent; /// text of click cell
    callback([dict, ParentDict, sheetselectedtext]);
}


//// cellCheckfalse
/// if click  copy link menu check its super parent to check anchor tag get its href set into firebase
function CallCopyLinkHtml(superparent, event, superParentDict, supercount) {
    if (supercount == 2) {
        var sPtargetElement = event.target.parentNode.parentNode || event.srcElement.parentNode.parentNode;
        var sParentxpath = getElementXPath(event.srcElement.parentNode.parentNode);
    } else if (supercount == 3) {
        var sPtargetElement = event.target.parentNode.parentNode.parentNode || event.srcElement.parentNode.parentNode.parentNode;
        var sParentxpath = getElementXPath(event.srcElement.parentNode.parentNode.parentNode);
    } else if (supercount == 4) {
        var sPtargetElement = event.target.parentNode.parentNode.parentNode.parentNode || event.srcElement.parentNode.parentNode.parentNode.parentNode;
        var sParentxpath = getElementXPath(event.srcElement.parentNode.parentNode.parentNode.parentNode);
    }
    superParentDict["tag"] = superparent.tagName.toLowerCase();
    superParentDict["tagtext"] = sPtargetElement.textContent;
    superParentDict["xpath"] = sParentxpath;
    var cpxlength = sParentxpath.split("/");
    superParentDict['xlength'] = cpxlength.length - 1;
    var taghtml = sPtargetElement.outerHTML;
    superParentDict["taghtml"] = String(taghtml);
    if (sPtargetElement.hasAttributes()) { // element attributes
        var atts = sPtargetElement.attributes;
        for (var p = atts.length - 1; p >= 0; p--) {
            superParentDict[atts[p].name] = atts[p].value;
        }
    }
    return superParentDict;
}


// current page url not ethercal.org get element attributes and its parent values... 
function contextcellCheckfalse(event, ParentDict, dict) {
    console.log('contextcellCheckfalse');
    var superParentDict = {};
    var childtargetElement = event.target || event.srcElement;
    console.log("if", event.target.parentNode.parentNode);
    console.log(" else if 1", event.target.parentNode.parentNode.parentNode);
    console.log("el if2 ", event.target.parentNode.parentNode.parentNode.parentNode);
    if (event.target.parentNode.parentNode.tagName.toLowerCase() == "a") {
        var superparent = event.target.parentNode.parentNode;
        superParentDict = CallCopyLinkHtml(superparent, event, superParentDict, 2);
    } else if (event.target.parentNode.parentNode.parentNode.tagName.toLowerCase() == "a") {
        var superparent = event.target.parentNode.parentNode.parentNode;
        superParentDict = CallCopyLinkHtml(superparent, event, superParentDict, 3);
    } else if (event.target.parentNode.parentNode.parentNode.parentNode.tagName.toLowerCase() == "a") {
        var superparent = event.target.parentNode.parentNode.parentNode.parentNode;
        superParentDict = CallCopyLinkHtml(superparent, event, superParentDict, 4);
    }
    console.log("supyer parent dict", superParentDict)
    var PageSourceClick = document.documentElement.outerHTML;
    parent = event.target.parentNode;
    var PtargetElement = event.target.parentNode || event.srcElement.parentNode;
    ParentDict["tag"] = parent.tagName.toLowerCase();
    ParentDict["tagtext"] = PtargetElement.textContent;
    var Parentxpath = getElementXPath(event.srcElement.parentNode);
    ParentDict["xpath"] = Parentxpath;
    var cpxlength = Parentxpath.split("/");
    ParentDict['xlength'] = cpxlength.length - 1;
    var taghtml = parent.outerHTML;
    ParentDict["taghtml"] = String(PageSourceClick);
    if (PtargetElement.hasAttributes()) {
        var atts = PtargetElement.attributes;
        for (var p = atts.length - 1; p >= 0; p--) {
            ParentDict[atts[p].name] = atts[p].value
        }
    }
    var srname = event.screenX.toString() + event.screenY.toString();
    var stname = srname.toString();
    var targetElement = event.target || event.srcElement;
    var x = event.target.tagName.toLowerCase();
    dict["tag"] = x;
    var Childxpath = getElementXPath(event.srcElement);
    dict["xpath"] = Childxpath;
    var cpcxlength = Childxpath.split("/");
    dict['xlength'] = cpcxlength.length - 1;
    var childtaghtml = targetElement.outerHTML;
    dict["taghtml"] = String(PageSourceClick);
    dict["tagtext"] = targetElement.textContent;
    if (targetElement.hasAttributes()) {
        var attrs = targetElement.attributes;
        for (var k = attrs.length - 1; k >= 0; k--) {
            dict[attrs[k].name] = attrs[k].value;
        }
    } else {
        //console.log("blank");
    }
    var repeatDict = {};
    if (superParentDict["tag"] != undefined) {
        repeatDict["Event"] = ParentDict;
        repeatDict["Parent"] = superParentDict;
        dict = {};
        Object.assign(dict, ParentDict);
        ParentDict = {};
        Object.assign(ParentDict, superParentDict);

    } else {
        repeatDict["Event"] = dict;
        repeatDict["Parent"] = ParentDict;
    }


    repeatDict["Page"] = PageSourceClick;
    repeatDict["text"] = childtargetElement.textContent;

    
    var sheetselectedtext = childtargetElement.textContent;
    
    return [dict, ParentDict, srname, sheetselectedtext];
}


function makeEventParentDict(event,key){
	console.log("makeEventParentDict")
    var ParentDict={},dict={}
    var parent_ele = event.parentNode;
	var par_tag_name=parent_ele.tagName
	if(par_tag_name==undefined || par_tag_name==null){parent_ele=event}
	console.log("parent_ele",parent_ele)
	console.log("parent_ele.tagName",parent_ele.tagName)
    if(parent_ele!=null && parent_ele!=undefined){
    var PtargetElement = event.parentNode || event.parentNode;
	if(PtargetElement.tagName==undefined){PtargetElement=event}
    ParentDict["tag"] = parent_ele.tagName.toLowerCase();
    ParentDict["tagtext"] = PtargetElement.textContent;
    
    var Parentxpath = getElementXPath(event.parentNode);
    ParentDict["xpath"] = Parentxpath;
    
    var cpxlength = Parentxpath.split("/");
    
    ParentDict['xlength'] = cpxlength.length - 1;
    var taghtml = parent_ele.outerHTML;
    ParentDict["taghtml"] = String(taghtml);
    if (PtargetElement.hasAttributes()) {
        var atts = PtargetElement.attributes;
        for (var p = atts.length - 1; p >= 0; p--) {
            ParentDict[atts[p].name] = atts[p].value
        }

    }
    }
	console.log("after loop",ParentDict)
    var targetElement = event;
    var x = event.tagName.toLowerCase();
    dict["tag"] = x;
    var Childxpath = getElementXPath(event);
    dict["xpath"] = Childxpath;
    console.log("xpath found in child", Childxpath);
    var cpcxlength = Childxpath.split("/");
    dict['xlength'] = cpcxlength.length - 1;
    console.log(" dict xpath", Childxpath)
    var childtaghtml = event.outerHTML;
    dict["taghtml"] = String(childtaghtml);

    dict["tagtext"] = targetElement.textContent;
    if (targetElement.hasAttributes()) {
        var attrs = targetElement.attributes;
        
        for (var k = attrs.length - 1; k >= 0; k--) {
            dict[attrs[k].name] = attrs[k].value;

        }
    } 
    var PageSourceClick = document.documentElement.outerHTML;
    var repeatDict = {};
    repeatDict["Event"] = dict;
    repeatDict["Parent"] = ParentDict;
    repeatDict["Page"] = PageSourceClick;
    repeatDict["text"] = event.textContent;
	console.log("repeatDict",repeatDict)
	
    console.log("chrome storage")
    return [dict,ParentDict]

}


function cellCheckfalse(event, selectionClick,textSelect) {
	console.log("event incoming",event)
	console.log("textSelect",textSelect)
	var event_pass=event
	console.log("selectionClick",selectionClick)
	var dict={};
	var dictA={};
	var ParentDictA={};
	var ParentDict={};
    if (!selectionClick){
	event = event.target || event.srcElement;}
    var childtargetElement = event;
	console.log("after incoming",event);
    try{
		var aNode=findAHrefInParent(event_pass);
		var ahrefdic={}
		var ahrefpdic={}
		console.log("aNode",aNode);
		[ahrefdic, ahrefpdic]=makeEventParentDict(aNode, 'ahref');
		console.log("ahrefdic",ahrefdic);
		console.log("ahrefpdic",ahrefpdic);
		var repeatDict1={}
		var PageSourceFound=document.documentElement.outerHTML;
		repeatDict1["Event"] = ahrefdic;
		repeatDict1["Parent"] = ahrefpdic;
		repeatDict1["Page"] = PageSourceFound;
		repeatDict1["text"] = "";
		chrome.runtime.sendMessage({'save_dic':'ahref','repeatDict':repeatDict1});
	}
	catch(err){
		aNode=null
	}
	if(textSelect==""){aNode=null}
    try{
		var imgNode=findImgInParent(event_pass);
	}
	catch(err){imgNode=null}
	if(textSelect==""){imgNode=null}
	
    [dict, ParentDict]=makeEventParentDict(event,'copyevent');
	console.log("DICTT in cellCheckfalse",dict)
	console.log("aNode",aNode)
	console.log("imgNode",imgNode)
    if(aNode!=null)
    {
		console.log("if");
        [dictA, ParentDictA]=makeEventParentDict(aNode, 'ahref');
        console.log('dictA ',dictA);
    }

    if(imgNode!=null)
    {
		console.log("img");
        [dictA, ParentDictA]=makeEventParentDict(imgNode,'imgNode');
        console.log('dictAA ',dictA);
    }

    var sheetselectedtext = childtargetElement.textContent;
    
    
    if (sheetselectedtext == ''){
        sheetselectedtext = 'oleoleoleole';
    }
    return [dict, ParentDict, sheetselectedtext];
}

function selectionprocess(dict, ParentDict) {
    console.log('selectionprocess');
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        console.log("open----", window.getSelection());
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
        var cxpath = getElementXPath(window.getSelection().anchorNode.parentNode);
        var cxlength = cxpath.split("/");

        dict["tag"] = window.getSelection().anchorNode.parentNode.tagName.toLowerCase();
        dict["tagtext"] = window.getSelection().toString();
        
        dict["taghtml"] = window.getSelection().anchorNode.parentNode.outerHTML;
        dict["xpath"] = cxpath;
        dict["xlength"] = cxlength.length - 1;
        var targetElement = window.getSelection().anchorNode.parentNode;
        if (targetElement.hasAttributes()) {
            var attrs = targetElement.attributes;
            
            for (var k = attrs.length - 1; k >= 0; k--) {
                dict[attrs[k].name] = attrs[k].value;
                
            }
        }
        var pxpath = getElementXPath(window.getSelection().anchorNode.parentNode.parentNode);
        var pxlength = pxpath.split("/");
        ParentDict["tag"] = window.getSelection().anchorNode.parentNode.parentNode.tagName.toLowerCase();
        ParentDict["outerhtml"] = html;
        ParentDict["tagtext"] = window.getSelection().toString();
        
        ParentDict["taghtml"] = window.getSelection().anchorNode.parentNode.parentNode.outerHTML;
        ParentDict["xpath"] = pxpath;
        ParentDict["xlength"] = pxlength.length - 1;
        var ptargetElement = window.getSelection().anchorNode.parentNode.parentNode;
        if (ptargetElement.hasAttributes()) {
            var attrs = ptargetElement.attributes;
            ////console.log("tag name",x,"===== text",targetElement.textContent)
            for (var k = attrs.length - 1; k >= 0; k--) {
                ParentDict[attrs[k].name] = attrs[k].value;
                
            }


        }

    }
    console.log("dict", dict, "parent", ParentDict)
    return [dict, ParentDict];
}

//// make final list 
function MakeContextMenuFinalDict(FinalDict, dict, ParentDict, PageSourceClick, seltext) {
    console.log('MakeContextMenuFinalDict');
    FinalDict["Event"] = dict;
    FinalDict["Parent"] = ParentDict;
    FinalDict["Page"] = PageSourceClick;
    if (seltext != undefined) {
        FinalDict["text"] = seltext;
    } else {
        FinalDict["text"] = "";
    }

    return FinalDict;
}

/// listen context menu click events 
function highlight_element(element,time_to_highlight){
	chrome.runtime.sendMessage({"is_recording":true},function(is_recording){
		console.log("IS Recording",is_recording);
		if(is_recording==true){
	var style_new="background-color: #bcd5eb !important;outline: 1px solid #5166bb !important;"
	var old_style=element.style;
	console.log("style_new",style_new);
	element.style=style_new;
	console.log("Changed style")
	setTimeout(function(){
		element.style=old_style
		console.log("Old style done");
		},time_to_highlight)
	}})
}
function find_scrollelement(ele){
	style = window.getComputedStyle(ele);
	if(style.overflowY=="scroll" || style.overflowY=="overlay" || style.overflowY=="auto" || style.overflow=="hidden auto"){
		return ele
	}
	var parentt=ele.parentElement
	if(parentt==null){
		return ele
	}
	else{
	ele=find_scrollelement(parentt)
	}
	return ele
}
function save_scroll_element(event){
	var ele=event.srcElement
	scrollelement=find_scrollelement(ele)
	console.log("scrollelement",scrollelement)
	var scrollelement_atts=get_attributes(scrollelement)
	var parentt=scrollelement.parentElement
	if(scrollelement.parentElement==null){
		parentt=scrollelement
	}
	var save_scroll_par_element_atts=get_attributes(parentt)
	var pagesource = document.documentElement.outerHTML;
	console.log("scrollelement_atts",scrollelement_atts)
	console.log("save_scroll_par_element_atts",save_scroll_par_element_atts)
	chrome.runtime.sendMessage({"save_scroll_element_atts":scrollelement_atts,"save_scroll_par_element_atts":save_scroll_par_element_atts,"pagesource":pagesource});
	
}
function save_context_menu_event(event,typee){
	console.log("save_context_menu_event",typee)
	var dict = {};
        var ParentDict = {};
        var Final = {};
        var html = "";
        var seltext = window.getSelection().toString();
        console.log("selected text", typeof seltext, "====", seltext)
        var PageSourceClick = document.documentElement.outerHTML
        if (seltext != undefined) {
            if (seltext != "") {
                console.log("select text is not blank")
                
            } else {
                console.log("seltext is not undefined , its blank ,", seltext);
                Final = {};
                var dict1 = {};
                var ParentDict1 = {};
                var srname = "";
                var sheetselectedtext = "";
                var testcheckchild = false;
                var testcheckParent = false;

                //console.log("testcheck value for sheet " ,testcheckParent);
                if (window.location.href.indexOf('ethercalc') < 0) {
                    //[dict1 , ParentDict1  ,srname , sheetselectedtext] =contextcellCheckfalse(event ,ParentDict1 , dict1);
                    dict1['taghtml'] = PageSourceClick;
                    dict1['xpath'] = 'html/';
                    dict1['xlength'] = 1;
                    dict1['tag'] = 'html';
                    ParentDict1['taghtml'] = PageSourceClick;
                    ParentDict1['xpath'] = 'html/';
                    ParentDict1['xlength'] = 1;
                    ParentDict1['tag'] = 'html';
                    Final = MakeContextMenuFinalDict(Final, dict1, ParentDict1, PageSourceClick, seltext)
					console.log("Final",617,Final)
					chrome.runtime.sendMessage({selectedeventdic:Final});
                } else {
                    var chk = event.target.tagName.toLowerCase().indexOf('td') >= 0;
                    console.log(chk)
                    if (chk) {
                        cellChecktruechild(event,function([dict1, ParentDict1, sheetselectedtext]){
							Final = MakeContextMenuFinalDict(Final, dict1, ParentDict1, PageSourceClick, sheetselectedtext);
							console.log("Final 625", Final);
							chrome.runtime.sendMessage({selectedeventdic:Final});
						});
                        
                    } else {
                        cellChecktrue(event,function([dict1, ParentDict1, sheetselectedtext]){
							Final = MakeContextMenuFinalDict(Final, dict1, ParentDict1, PageSourceClick, sheetselectedtext);
							console.log("Final 632", Final);
							chrome.runtime.sendMessage({selectedeventdic:Final});
						});
                        
                    }
                    
                }

            }
        }
	var textSelect = window.getSelection().toString();
	console.log("646")
	var dict1 = {};
	var ParentDict1 = {};
	var sheetselectedtext = "";
	[dict1,ParentDict1,sheetselectedtext]=cellCheckfalse(event,false,textSelect);
	add_iframe_events(dict1,function(dict1){
	var repeatDict1={}
	var PageSourceFound=document.documentElement.outerHTML;
    repeatDict1["Event"] = dict1;
    repeatDict1["Parent"] = ParentDict1;
    repeatDict1["Page"] = PageSourceFound;
    repeatDict1["text"] = sheetselectedtext;
	console.log("repeatDict1 context",repeatDict1);
	chrome.runtime.sendMessage({
                'save_dic':"copyevent",'repeatDict':repeatDict1
            }, function(resp) {
            });
	})
}
document.addEventListener('contextmenu', function(event) {
    chrome.storage.local.set({copylinkData: {}}, function() {console.log('')
    });
	console.log("srcelement",event.srcElement);
	save_scroll_element(event);
	highlight_element(event.srcElement,2000)
	console.log('highlighted');
	console.log('saved scroll element');
    save_context_menu_event(event,"right click");

}, false);

chrome.storage.local.set({
    copyeventData: {}
}, function() {
    console.log("")
});

function copyTextToClipboard(textToCopy){
    const el = document.createElement('textarea');
    el.value = textToCopy;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}
/// listen unselect message from background
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    //console.log("request---",request);
	console.log("REQUEST 681:-----",request)
    if (request.message != undefined) {
        //console.log("message check", request.message);
        window.getSelection().removeAllRanges();
        sendResponse({
            message: 'Content script has received that message'
        })
    } else if (request.getHistory != undefined) {
        console.log(request);
        sendResponse({
            state: history.state
        });
    }
    else if(request.paste!=undefined){
        console.log('paste n content');
        console.log(document.activeElement);
        document.activeElement.select();
        var didSucceed = document.execCommand('paste');
        console.log(didSucceed);
    }
    else if(request.findAHref!=undefined){
        console.log('got find href event');
               
    }

    else if(request.gotProgress!=undefined){
        console.log('gotPr')
            updateBotProgress(request.gotProgress);
        }
	else if(request.get_pagesource!=undefined){
		setTimeout(function(){
        console.log('get_pagesource')
            var page=document.documentElement.outerHTML.toString();
			sendResponse(page);
        },6000);
	}
	else if(request.scroll_down!=undefined){
		scrollelement.scrollBy(0, 100000);
	}
	else if(request.scroll_up!=undefined){
		scrollelement.scrollTo(0, 0);
	}
	else if(request.get_current_url!=undefined){
		console.log("window.location.href",window.location.href)
		sendResponse(window.location.href);
	}
	else if(request.copyText!=undefined){
		copyTextToClipboard(request.copyText)
	}
	else if(request.upload_s3==true){
		s3upload(request.key,request.body,sendResponse)
	}

})


function get_element_keypressed(event){
	var ParentDict={}
	var dict={}
    parent = event.target.parentNode;
    var PtargetElement = event.target.parentNode || event.srcElement.parentNode;
    ParentDict["tag"] = parent.tagName.toLowerCase();
    ParentDict["tagtext"] = PtargetElement.textContent;
	var Parentxpath = getElementXPath(parent);
    ParentDict["xpath"] = Parentxpath;
    var cpxlength = Parentxpath.split("/");
    ParentDict['xlength'] = cpxlength.length - 1;
	var taghtml = parent.outerHTML;
    ParentDict["taghtml"] = String(taghtml);
    if (PtargetElement.hasAttributes()) {
        var atts = PtargetElement.attributes;
        for (var p = atts.length - 1; p >= 0; p--) {
            ParentDict[atts[p].name] = atts[p].value;
        }}
	var targetElement = event.target || event.srcElement;
    var x = event.target.tagName.toLowerCase();
    dict["tag"] = x;
    var Childxpath = getElementXPath(event.target);
    dict["xpath"] = Childxpath;
    var cpcxlength = Childxpath.split("/");
    dict['xlength'] = cpcxlength.length - 1;
    var childtaghtml = targetElement.outerHTML;
    dict["taghtml"] = String(childtaghtml);
    dict["tagtext"] = targetElement.textContent;
    if (targetElement.hasAttributes()) {
        var attrs = targetElement.attributes;
        for (var k = attrs.length - 1; k >= 0; k--) {
            dict[attrs[k].name] = attrs[k].value;
        }
    }
	console.log("dict send by keypress--", dict)
	console.log("ParentDict--", ParentDict)
	return [dict, ParentDict]
}
function call_the_stop_shortcut(){
	chrome.runtime.sendMessage({"get_bot_runing":true},function(bot_runing) 
		{
			console.log("get_bot_runing content response",bot_runing)
			if(bot_runing==true){
	console.log("call_the_stop_shortcut")
	chrome.storage.local.set({'predictstart':true});
	chrome.storage.local.set({'predictstartcloud':true});
	chrome.runtime.sendMessage({stop_bot_bg:true});
	chrome.runtime.sendMessage({set_bot_runing: false})
	chrome.storage.local.get('botnamedata', function(name) {
		if(name["botnamedata"]){
			var botname = name["botnamedata"];
			console.log(" inside stoppredict buttin show name" , botname)
			chrome.runtime.sendMessage({stoppredictbot:botname}, function(response) 
			{
				console.log("status Success screen")
			});
		
	}

	});
			}
})}
function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}
function get_key_name(keyName,firstkey){
	var new_key=keyName
	var is_letter=isLetter(keyName)
	console.log("is_letter",is_letter)
	if(is_letter==true){
		new_key=new_key.toUpperCase();
	}
	else if(isNaN(new_key)){
		console.log("is integer")
		new_key=firstkey+new_key
	}
	console.log("new_key",new_key)
	return [new_key]
}

function timeout(ms, promise) {
          return new Promise(function(resolve, reject) {
            setTimeout(function() {
              reject(new Error("timeout"))
            }, ms)
            promise.then(resolve, reject)
          })
    }

function fetchDkCbk(jsn, url, callback) {
    timeout(100000000000, fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsn),
        }))
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            console.log("844 content js ")
            callback(data, 1);
        })
        .catch((error) => {
            console.log("848 content.js")
            callback(error, 0);
        });

}

function add_iframe_events(event_dic,callback){
	if (window == top) {
		console.log("add_iframe_events false")
		callback(event_dic);
		return event_dic;
	}
	console.log("add_iframe_events")
	if(window.frameElement!=null){
	console.log("under if")
	var el=window.frameElement;
	var iframe_event=get_attributes(el);
	var iframe_parent=get_attributes(el.parentNode);
	event_dic["is_iframe"]=true;
	event_dic["iframe_event"]=iframe_event;
	event_dic["iframe_parent"]=iframe_parent;
	event_dic["iframe_xpath"]=event_dic["iframe_event"]["xpath"];
	callback(event_dic);
	}
	else{
		var iframe_src=window.location.href;
	console.log("iframe_src",iframe_src);
	
	fetchDkCbk({"src":iframe_src},"http://127.0.0.1:5000/get_iframe_attributes",function(response_dic,cnt){
	console.log("response_dic",response_dic);
	if(cnt==1){
		try{
	event_dic["is_iframe"]=true;
	event_dic["iframe_event"]=response_dic["iframe_event"];
	event_dic["iframe_parent"]=response_dic["iframe_parent"];
	event_dic["iframe_xpath"]=response_dic["iframe_xpath"]
		}
		catch(err){
			console.log("Error in adding iframe",err);
		}
	}
	callback(event_dic);
	})
	}
}


        document.addEventListener('keydown', (event) => {
			console.log("EVENT IN KEYDOWN:-------------------",event)
            const keyName = event.key;
			console.log("Key pressed :-------------------",keyName)
			if(keyName=='Escape'){
				//call_the_stop_shortcut()
				console.log("Esc")
				//s3upload("escape.txt",document.documentElement.outerHTML)
				
			}
            if (keyName === 'Control' || keyName === 'Shift' || keyName === 'Alt') {
                console.log("do not alert control key is pressed");
            } else if (event.shiftKeysd == true) {
				var PageSourceClick = document.documentElement.outerHTML;
				[dict, ParentDict]=get_element_keypressed(event)
				var keyName_nw=get_key_name(keyName,"Shift")
				console.log("After keyName",keyName_nw)
				dict=add_iframe_events(dict,function(dict){
				console.log("dict",dict)
				console.log("ParentDict",ParentDict)
				var send_dict={
                    keypresscount: keyName_nw,
					Data: dict,
					PData: ParentDict,
                    pagesource: PageSourceClick,
                }
				console.log("repeatDict1 keypress iframe",send_dict);
                chrome.runtime.sendMessage(send_dict, function(response) {
                    //console.log("key press send pastecount ")
                })
				})
			}
			else if (event.ctrlKey == true) {

                if (event.code == "KeyA") {
                    //console.log("select all keyA" , event )
                    var sel = window.getSelection().toString();
                    //console.log("CTRL + A select text====", sel )
                    var PageSourceClick = document.documentElement.outerHTML;

                    var textSelect = event.srcElement.value;
                    var PageSourceClick = document.documentElement.outerHTML;
                    chrome.runtime.sendMessage({
                        allselect: "data",
                        data: textSelect,
                        allcount: "pcount",
                        pagesource: PageSourceClick
                    }, function(response) {
                        //console.log("ContextMenu rightclick")
                    })

                } else if (event.code == "KeyC") {
                    //console.log(" keydown event" , event);
                    var seltext = window.getSelection().toString();
                    var Final = {};
                    var dict = {};
                    var ParentDict = {};
                    var PageSourceClick = document.documentElement.outerHTML;
                    if (seltext != undefined) {
                        if (seltext != "") {

                            console.log("select text not blank");

                            [dict, ParentDict] = selectionprocess(dict, ParentDict);
                            Final = MakeContextMenuFinalDict(Final, dict, ParentDict, PageSourceClick, seltext)

                            copyTextToClipboard(seltext);
                            chrome.runtime.sendMessage({
                                copycount: Final,
                                text: seltext
                            }, function(response) {
                                //console.log("ctrl+c copy request data " , textfound); 
                            })

                        } else {
                            console.log("if sheet data ");
							chrome.runtime.sendMessage({get_selectedeventdic:true},function(selectedeventdic){
                                if (selectedeventdic != {}) {
                                    if (Object.keys(selectedeventdic).length > 0) {
                                        var copdata = selectedeventdic;
                                        copyTextToClipboard(copdata["text"]);
                                        chrome.runtime.sendMessage({
                                            copycount: copdata,
                                            text: copdata["text"]
                                        }, function(response) {
                                             
                                        })
                                    }
                        }
						});
				}
				}} else if (event.code == "KeyV") {
                    var PageSourceClick = document.documentElement.outerHTML;
                    chrome.runtime.sendMessage({
                        pastecount: "EventCount",
                        pagesource: PageSourceClick
                    }, function(response) {
                        //console.log("paste data ")
                    })

                }
				else {
                var PageSourceClick = document.documentElement.outerHTML;
				[dict, ParentDict]=get_element_keypressed(event)
				dict=add_iframe_events(dict,function(dict){
				console.log("dict",dict)
				console.log("ParentDict",ParentDict)
				var send_dict={
                    keypresscount: "Control+"+keyName,
					Data: dict,
					PData: ParentDict,
                    pagesource: PageSourceClick,
					control_key:true
                };
				console.log("repeatDict2 keypress iframe",send_dict);
                chrome.runtime.sendMessage(send_dict, function(response) {
                    //console.log("key press send pastecount ")
                })
				})
            }
            }
			else if(event.altKey == true){
                if (event.code == "KeyZ") {
                   console.log("pressed ALT Z")
                   chrome.runtime.sendMessage({"undo_action":true}, function(response) {
                })
                }
                else if (event.code == "KeyP") {
                   console.log("shortcut_repeat");
                   var page_url = window.location.href;
                   var PageSourceFound = document.documentElement.outerHTML;
                   console.log("page_url",page_url)
                   var senddict = PageSourceFound
                   chrome.runtime.sendMessage({senddict,page_url,'shortcut_repeat':true},function(response){

                   })
                }
                else if (event.code == "KeyR") {
                    console.log("Pressed Key R")
                    chrome.runtime.sendMessage({"shortcut_alt_run_bot":true},function(response){

                    })
                }
                else if (event.code == "KeyW") {
                    console.log("Pressed Key W")
                    call_the_stop_shortcut()
                }
            }
			else {
                var PageSourceClick = document.documentElement.outerHTML;
				[dict, ParentDict]=get_element_keypressed(event)
				dict=add_iframe_events(dict,function(dict){
				console.log("dict",dict)
				console.log("ParentDict",ParentDict)
				var send_dict={
                    keypresscount: keyName,
					Data: dict,
					PData: ParentDict,
                    pagesource: PageSourceClick,
                }
				console.log("repeatDict3 keypress iframe",send_dict);
                chrome.runtime.sendMessage(send_dict, function(response) {
                    //console.log("key press send pastecount ")
                })
				});
            }

        }, true);
    

/// find select tag data send into firebase
function cellCheckfalseForSelect(event, ParentDict, dict) {
    console.log('cellCheckfalseForSelect')
    var childtargetElement = event.target || event.srcElement;
    console.log("original Event", event.originalEvent)
    ////console.log("data cellCheckfalse start")
    console.log("event.src event", event.target);
    console.log("event.src event parent ", event.target.parentNode);
    parent = event.target.parentNode;
    var PtargetElement = event.target.parentNode || event.srcElement.parentNode;
    ParentDict["tag"] = parent.tagName.toLowerCase();
    ParentDict["tagtext"] = PtargetElement.textContent;

    var Parentxpath = getElementXPath(parent);
    ParentDict["xpath"] = Parentxpath;
    console.log("parent xpath", Parentxpath);
    var cpxlength = Parentxpath.split("/");
    console.log("data xlength of above xpath--", cpxlength);
    ParentDict['xlength'] = cpxlength.length - 1;

    var taghtml = parent.outerHTML;
    ParentDict["taghtml"] = String(taghtml);

    if (PtargetElement.hasAttributes()) {
        var atts = PtargetElement.attributes;
        for (var p = atts.length - 1; p >= 0; p--) {
            ParentDict[atts[p].name] = atts[p].value;
        }

    }
    console.log("ParentDict--", ParentDict)

    var targetElement = event.target || event.srcElement;
    ////console.log("target",targetElement);
    var x = event.target.tagName.toLowerCase();
    dict["tag"] = x;
    var Childxpath = getElementXPath(event.target);
    dict["xpath"] = Childxpath;
    console.log("xpath found in child", Childxpath);
    var cpcxlength = Childxpath.split("/");
    dict['xlength'] = cpcxlength.length - 1;
    console.log(" dict xpath", Childxpath)
    var childtaghtml = targetElement.outerHTML;
    dict["taghtml"] = String(childtaghtml);

    dict["tagtext"] = targetElement.textContent;
    if (targetElement.hasAttributes()) {
        var attrs = targetElement.attributes;
        ////console.log("tag name",x,"===== text",targetElement.textContent)
        for (var k = attrs.length - 1; k >= 0; k--) {
            dict[attrs[k].name] = attrs[k].value;

        }


    } else {
        //console.log("blank");
    }

    var sheetselectedtext = childtargetElement.textContent;
    var srname = "";

    console.log("dat found in sheetselectedtext ", dict, ParentDict)
    return [dict, ParentDict, srname, sheetselectedtext];
}

// select tag found listen opton click event
        $(document).delegate("select", "change", function(event) {
            //capture the option
            console.log("event in select ", event)
            var PageSourceClick = document.documentElement.outerHTML;
            var dict = {};
            var ParentDict = {};
            console.log("original Event 12", event.originalEvent)
            var srname = "";
            var sheetselectedtext = "";
            var testcheckchild = false;
            var testcheckParent = false;

            if (window.location.href.indexOf('ethercalc') < 0) {
                [dict, ParentDict, srname, sheetselectedtext] = cellCheckfalseForSelect(event, ParentDict, dict);
            }
            dict["optionvalue"] = $(this).val();
			console.log("dict 1007",dict)
            console.log("value select inside select cahnge", dict)
            chrome.runtime.sendMessage({
                EventCounter: "ev",
                Data: dict,
                PData: ParentDict,
                PageSource: PageSourceClick,
                eventpage: ""
            }, function(response) {
                //console.log("Event !=00 message Success screen EventCount==", dict,ParentDict )
            });
        });
function add_upload_event(upload_element){
	var parent_element=upload_element.parentElement
	console.log("upload_parent_element",parent_element)
	var ParentDict={}
	var EventDict={}
	var Eventxpath = getElementXPath(upload_element);
	var Parentxpath = getElementXPath(parent_element);
	var cpxlength = Eventxpath.split("/");
    
	EventDict["tag"] = upload_element.tagName.toLowerCase();
    EventDict["tagtext"] = upload_element.textContent;
    EventDict["xpath"] = Eventxpath;
    EventDict["xlength"] = cpxlength.length;
    EventDict["taghtml"] = upload_element.outerHTML;
	
	ParentDict["tag"] = parent_element.tagName.toLowerCase();
    ParentDict["tagtext"] = parent_element.textContent;
	ParentDict["xpath"] = Parentxpath;
	ParentDict['xlength'] = cpxlength.length - 1;
	ParentDict["taghtml"] = parent_element.outerHTML;
	
    if (upload_element.hasAttributes()) {
        var atts = upload_element.attributes;
        for (var p = atts.length - 1; p >= 0; p--) {
            EventDict[atts[p].name] = atts[p].value;
        }}
	if (parent_element.hasAttributes()) {
        var atts = parent_element.attributes;
        for (var p = atts.length - 1; p >= 0; p--) {
            ParentDict[atts[p].name] = atts[p].value;
        }}
	console.log("EventDict",EventDict)
	console.log("ParentDict",ParentDict)
	var page=document.documentElement.outerHTML;
	chrome.runtime.sendMessage({"add_upload_event":true,"Event":EventDict,"Parent":ParentDict,"Page":page})
}
$(document).delegate("input", "input", function(event) {
            //capture the option
			var elemet=event.currentTarget
			if(elemet.type=="file" && elemet.tagName.toLowerCase()=="input"){
				console.log("File Uploaded")
				add_upload_event(elemet)
			}
        });

function nodeToDict(node) {

    var ParentDict = {};
    var parentN = node.parentNode;
    ParentDict["tag"] = parentN.tagName.toLowerCase();
    ParentDict["tagtext"] = parentN.textContent;

    var Parentxpath = getElementXPath(parentN);
    ParentDict["xpath"] = Parentxpath;

    var cpxlength = Parentxpath.split("/");
    ParentDict['xlength'] = cpxlength.length - 1;

    var taghtml = parentN.outerHTML;
    ParentDict["taghtml"] = String(taghtml);

    if (parentN.hasAttributes()) {
        var atts = parentN.attributes;
        for (var p = atts.length - 1; p >= 0; p--) {
            ParentDict[atts[p].name] = atts[p].value
        }

    }
    var dict = {};
    var x = node.tagName.toLowerCase();
    dict["tag"] = x;
    var Childxpath = getElementXPath(node);
    console.log('xpathhere ', Childxpath);
    dict["xpath"] = Childxpath;
    var cpcxlength = Childxpath.split("/");
    dict['xlength'] = cpcxlength.length - 1;

    var childtaghtml = node.outerHTML;
    dict["taghtml"] = String(childtaghtml);

    dict["tagtext"] = node.textContent;
    if (node.hasAttributes()) {
        var attrs = node.attributes;

        for (var k = attrs.length - 1; k >= 0; k--) {
            dict[attrs[k].name] = attrs[k].value;

        }


    } else {
        console.log("blank");
    }
    var PageSourceClick = document.documentElement.outerHTML;

    return [dict, ParentDict];
}

function findOnce(node, txtLst) {
    if (node == null)
        return false;
    var fnd = true;
    txtLst.forEach(function(txt) {
        if (node.textContent.toString().indexOf(txt) < 0)
            fnd = false;
    })

    if (node.outerHTML == undefined)
        fnd = false;
    return fnd;
}

function getXmlString(xml) {
    if (window.ActiveXObject) {
        return xml.xml;
    }
    return new XMLSerializer().serializeToString(xml);
}

function findSelectClick(node, txt) {

    try {

        var values = [];

        for (var att, i = 0, atts = node.attributes, n = atts.length; i < n; i++) {
            att = atts[i];
            values.push(att.nodeValue);
        }

        if (values.indexOf(txt) >= 0)
            return node;
        else
            return findSelectClick(node.parentNode, txt);

    } catch (err) {
        console.log(err);
        return null;
    }
}

function findRecursive(node, txtLst) {
	if(node.tagName.toLowerCase()=='html')
		return node;
    if (node == null || node == undefined)
        return node;
    var fnd = true;
	
    txtLst.forEach(function(txt) {
        if (node.textContent.toString().indexOf(txt) < 0)
            fnd = false;
    })
    if (fnd)
        return node;
    else{
		if(node.parentNode.tagName.toLowerCase()=='html')
			return node;
		else 
			return findRecursive(node.parentNode, txtLst);
	}       
	
}

function checkIfCell(elm) {
    var p = elm.parentNode;
    var pp = p.parentNode;
    var chk = true;

    if (p != undefined && p.tagName.toLowerCase() == "div" && p.getAttribute('class') == 'wiki') {
        if (pp != undefined && pp.tagName.toLowerCase() == "td" && pp.getAttribute('id').indexOf('cell') >= 0)
            chk = false;
    }
    return chk;
}

function getEvent(event, callback) {
    chrome.storage.local.get('selectioncopy', function(sl) {
        console.log('step1');
        console.log(sl);
        if (sl['selectioncopy'] != undefined && sl['selectioncopy'] == true) {
            console.log('step2');
            chrome.storage.local.get('copiedText', function(cp) {
                console.log('step3');
                console.log(cp);
                if (cp['copiedText'] != undefined && cp['copiedText'] != '') {
                    console.log('step4');
                    var node = findSelectClick(event.target, cp['copiedText']);
                    console.log(node);
                    console.log('yoyo2');
                    if (node != null) {
                        console.log('step5');
                        callback({
                            'node': node,
                            'selectionClick': true
							
                        });

                    } else {
                        callback({
                            'node': event,
                            'selectionClick': false
                        });
                    }

                } else {
                    callback({
                        'node': event,
                        'selectionClick': false
                    });
                }
            });


        } else {
            console.log('step1else');
            callback({
                'node': event,
                'selectionClick': false
            });
        }
    });
}
function get_attributes(elementt){
	var attrs=elementt.attributes;
	var dict={};
		for (var k = attrs.length - 1; k >= 0; k--) {
            dict[attrs[k].name] = attrs[k].value
        }
    dict["tag"] = elementt.tagName.toLowerCase();
    var Childxpath = getElementXPath(elementt);
    dict["xpath"] = Childxpath;
    var ccxlength = Childxpath.split("/");
    dict['xlength'] = ccxlength.length - 1;
	return dict
}



function chooseDictFromSDict(dict, sDict, sPDict, textSelect) {
	var ParentDict=sPDict
	var sheetselectedtext=textSelect
    if (dict.xpath == undefined) {
		console.log("Inside if")
        ParentDict = sPDict;
		dict = sDict;
        sheetselectedtext = textSelect;
    } else if (sDict.xpath != undefined && dict.xpath != undefined) {
		console.log("Inside else if")
        console.log(dict);
        if (dict.xlength < sDict.xlength) {
			console.log("Inside else if if")
            dict = sDict;
            ParentDict = sPDict;
            sheetselectedtext = textSelect;
        }
    }
    return [dict, ParentDict, sheetselectedtext];
}

function chooseDictFromSDict_Copy(dict, sDict, sPDict, textSelect) {
	var ParentDict=sPDict
	var sheetselectedtext=textSelect
    if (dict.xpath == undefined) {
		console.log("Inside if")
        ParentDict = sPDict;
		dict = sDict;
        sheetselectedtext = textSelect;
    } else if (sDict.xpath != undefined && dict.xpath != undefined) {
		console.log("Inside else if")
        console.log(dict);
        if (dict.xlength < sDict.xlength) {
			console.log("Inside else if if")
			dict = sDict;
            ParentDict = sPDict;
            sheetselectedtext = textSelect;
        }
		else{
			dict = sDict;
		}
    }
    return [dict, ParentDict, sheetselectedtext];
}
function find_selected_element_till_text_same(node,text_element){
	console.log("find_selected_element_till_text_same")
	var found_text=node.parentNode.textContent.trim();
	console.log("found_text",found_text);
	console.log("ISSSSSSSS",found_text==text_element)
	if(found_text!=text_element){
		console.log("RETURNING THERE",node)
		return node
	}
	else{
		var new_node=node
		var neww=""
		neww=find_selected_element_till_text_same(node.parentNode,text_element)
		if(neww!=undefined && neww!=null){
			new_node=neww
		}
		console.log("RETURNING HERE",new_node)
		return new_node
	}
	
}
function eventType1() {
    var node = window.getSelection().anchorNode;
	console.log("Before eventType1",node)
    var txtLst = window.getSelection().toString().split(/\s+/);
    var fnd = findOnce(node, txtLst);
	console.log("fnd eventType1",fnd)
    if (!fnd){
	node = findRecursive(node.parentNode, txtLst);}
	console.log(" eventType1 node",node);
	console.log("FOUND tEXT",node.textContent.trim());
	node=find_selected_element_till_text_same(node,node.textContent.trim())
	console.log(" AFter eventType1 node",node);
    [sDict, sPDict] = nodeToDict(node);
    return [sDict, sPDict];
}

function eventType2(event,callback) {
    var chk = checkIfCell(event.target);
    console.log(chk);
    if (chk) {
        console.log('815');
        cellChecktruechild(event,function([dict, ParentDict, sheetselectedtext]){
			callback([dict, ParentDict, sheetselectedtext,false]);
		});
    } else {
        console.log('819');
        cellChecktrue(event,function([dict, ParentDict, sheetselectedtext]){
			callback([dict, ParentDict, sheetselectedtext,false]);
		});
    }
	 
    
}

function eventType11(event,callback) {
    console.log('810',event.srcElement);
    console.log(window.getSelection());
    textSelect = window.getSelection().toString();
    console.log("textSelect len",textSelect.trim().length);
	var sDict={},sPDict={},dict={};
	var ParentDict={}
	var sheetselectedtext=""
    var node = window.getSelection().anchorNode;
    if (textSelect != ''){
        [sDict, sPDict]=eventType1()
		console.log("Find through selection text",sDict,"sPDict",sPDict)
	}
    try {
        getEvent(event, function(obj) {
            console.log('getevent');
            console.log('gnodepp ',obj);
            //var aNode=findAHrefInChild(obj.node.target);
            //console.log('aNode ',aNode)
            gnode=obj;
            var selectionClick = obj.selectionClick;
			console.log("selectionClick",selectionClick);
			console.log("1371");
            [dict, ParentDict, sheetselectedtext] = cellCheckfalse(obj.node,selectionClick,textSelect);
			console.log("cellCheckfalse",dict,"ParentDict",ParentDict);
			[dict, ParentDict1, sheetselectedtext] = chooseDictFromSDict_Copy(dict, sDict, sPDict, textSelect);
			console.log("chooseDictFromSDict",dict,"ParentDict",ParentDict1);
			if(Object.keys(ParentDict1).length!=0){
				console.log("Hey i am editing")
				ParentDict=ParentDict1
			}
			console.log("textSelect",textSelect);
			console.log("Final DICt",dict,"ParentDict",ParentDict);
			callback([dict, ParentDict, textSelect,selectionClick]);
        });
    } catch (err) {
        console.log("err eventtye",err);
		
		[dict, ParentDict, sheetselectedtext] = chooseDictFromSDict(dict, sDict, sPDict, textSelect);
		
		callback([dict, ParentDict, sheetselectedtext,false]);
		
    }
    
}

function sendEvent(dict, ParentDict, PageSourceFound, PageSourceEventInside, selectionClick,event) {
	console.log('sending event');
	console.log("selectionClick",selectionClick);	
	add_iframe_events(dict,function(dict){
	var repeatDict1={}
    repeatDict1["Event"] = dict;
    repeatDict1["Parent"] = ParentDict;
    repeatDict1["Page"] = PageSourceFound;
    repeatDict1["text"] = event.textContent;
	console.log("frameElement",window.frameElement);
	console.log('check1');
    console.log("repeatDict1 iframe",repeatDict1);
	chrome.runtime.sendMessage({selectedeventdic:repeatDict1});
	
	chrome.runtime.sendMessage({
        EventCounter: "ev",
        Data: dict,
        PData: ParentDict,
        PageSource: PageSourceFound,
        eventpage: PageSourceEventInside,
        state: null,
        selectionClick: selectionClick
    });
	chrome.runtime.sendMessage({
                'save_dic':"copyevent",'repeatDict':repeatDict1
            }, function(resp) {

            });
	

	})
	
    
}

function eventType12(event,callback) {
    if (window.location.href.indexOf('ethercalc') < 0){
		console.log("Its without ethercalc",event)
        eventType11(event,function([dict, ParentDict,sheetselectedtext,selectionClick]){
			console.log('type12');
			console.log("DICTTTTT",dict)
			console.log(sheetselectedtext);
			console.log(sheetselectedtext.trim().length==0)
			callback([dict, ParentDict, sheetselectedtext,selectionClick,1]); 
		 });
	}
    else{
        eventType2(event,function([dict, ParentDict,sheetselectedtext,selectionClick]){
			console.log("DICTTTTT",dict)
			callback([dict, ParentDict, sheetselectedtext,selectionClick,2]); 
		 });
	}
}

function shouldSendCheck(textSelect, srname, dict, ParentDict, PageSourceFound, PageSourceEventInside, selectionClick,type,event) {
    if (true) {
        console.log('textSelect ', textSelect);
		console.log(textSelect.trim().length==0);
	//if (textSelect.trim().length==0&&type==1) {
	if ((textSelect.trim().length==0&&type==1)||(type==2)) {
	
		console.log("INSIDE THE CONDITION",type,"srname",srname,"dict",dict)
			
            if (srname != "00") {
				console.log("srname not 00",srname)
                if (dict["tag"].toLowerCase() != "select") {
                    console.log(selectionClick);
                    sendEvent(dict, ParentDict, PageSourceFound, PageSourceEventInside,selectionClick,event)
                }
				else{
					chrome.runtime.sendMessage({"is_train_on":true},function(trainon){
					console.log("trainon",trainon);
					if(trainon==true){
					chrome.runtime.sendMessage({"create_notification":true,"title":"Selection Click","desc":"Your next click will be selection click"})}
					})
				}

            } else {
                console.log("if 00 tag is select tag then add click event", dict["tag"])
				
            }

        } // else text
		else{
			console.log("OUTSIDE THE CONDITION",type)
			console.log("shouldSendCheck",dict,"ParentDict",ParentDict)
			var Final={"Event":dict,"Parent":ParentDict,"Page":PageSourceFound};
			chrome.runtime.sendMessage({selectedeventdic:Final});
		}
    }
}

function saveCopyEvent(testcheckParent, testcheckchild, repeatDict1) {
    if (testcheckParent == true || testcheckchild == true) {
        chrome.storage.local.set({
            copyeventData: repeatDict1
        }, function() {
            //console.log('text copyevent----');
        });
    }
}
function getElement(path,currenttarget) {
  var eles=currenttarget.getElementsByTagName("a");
  console.log("Targetlen",eles.length);
  return eles
}
function getPageSource(event){
	var xpth=getElementXPath(event.target);
	console.log("TARGETeventxpath",xpth);
	console.log("TARGETevent",event.target)
	var currenttarget=event.currentTarget;
	//console.log("TARGETcurrenttarget",event.currentTarget)
	var elementfound=getElement(xpth,currenttarget);
	console.log("TARGETelementfound",elementfound.indexOf(event.target));
	var PageSourceFound = document.documentElement.outerHTML;
	return PageSourceFound;
}

function which3Event(event, screen) {
    var PageSourceFound = document.documentElement.outerHTML;
	//var PageSourceFound=getPageSource(event)
    var srname = event.screenX.toString() + event.screenY.toString();
    if (screen[srname] == undefined) {
        console.log(" event occur", event)

        screen[srname] = 'ocp';
        console.log('8399');

        var PageSourceClick = document.documentElement.outerHTML;       

        eventType12(event,function([dict, ParentDict, sheetselectedtext,selectionClick,type]){
			//saveCopyEvent(testcheckParent, testcheckchild, repeatDict1)

			//var PageSourceEventInside = document.documentElement.outerHTML;
			var PageSourceEventInside=PageSourceFound;
			console.log("typeeventType12",type);
			console.log("ParentDict",ParentDict)
			shouldSendCheck(sheetselectedtext, srname, dict, ParentDict, PageSourceFound, PageSourceEventInside, selectionClick,type,event);
		});

        
    }
}

function fetch_iframe(event){
	var path=event["path"]
	var len=path.length;
	console.log("len",len);
	var last_element=path[len-1]
	console.log("last_element",last_element);
	console.log("frameElementid",window.frameElement);
}


    if (true) {
        var all = document.getElementsByTagName("*");
        var max = all.length;
        for (var i = 0; i < max; i++) {
            var screen = {};
            all[i].addEventListener('click', function(event) {
					console.log(event.which);
					console.log("CLICK HAPPENED---------==",event);
					//event.preventDefault();
					if (window != top) {
						console.log("Its an iframe event1",window.parent);
					}
					if (event.which != 3) {
						highlight_element(event.srcElement,500)
                    which3Event(event, screen);
                }
            })
        }
    }



        window.addEventListener('popstate', (event) => {
            chrome.runtime.sendMessage({
                'popstateevent': event.state
            }, function(resp) {

            });
        });
