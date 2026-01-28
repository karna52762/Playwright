chrome.contextMenus.onClicked.addListener(function(info, tab) {
	current_tab_url=tab.url
	 current_tab_id=tab.id
	 current_tab_index=tab.index
	if (tab && recording) {
		if (info.menuItemId === 'contextsavetext') {
			console.log("Save Event")
                saveClick(info, tab, "text", info.menuItemId);
            }
		else if (info.menuItemId === 'contextsavelink') {
				console.log("Save Link Event")
                saveLink(info, tab, "link", info.menuItemId);
            }
}})