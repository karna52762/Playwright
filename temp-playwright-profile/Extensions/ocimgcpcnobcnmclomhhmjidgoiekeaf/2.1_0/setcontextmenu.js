var ContextmenuList = [{
    id: "contextsave",
    "title": "Scrape"
}
];
var ContextmenuListLength = ContextmenuList.length;
for (var i = 0; i < ContextmenuListLength; i++) {
	console.log("Creating",ContextmenuList[i]["title"])
	try{
    chrome.contextMenus.create({
        id: ContextmenuList[i]["id"],
        title: ContextmenuList[i]["title"],
        contexts: ["all"],
    });
	}
	catch(e){}
}
chrome.contextMenus.create({
    title: "Text",
    parentId: "contextsave",
    id: "contextsavetext",
    contexts: ["all"],

});
chrome.contextMenus.create({
    title: "Link",
    parentId: "contextsave",
    id: "contextsavelink",
    contexts: ["all"],
});