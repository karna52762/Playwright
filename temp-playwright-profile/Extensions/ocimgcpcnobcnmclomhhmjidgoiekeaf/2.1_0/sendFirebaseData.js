function sendFirebaseDataWithoutRefUndo(userref, EventCount) {

    var jsn = {};

    jsn[userref + '/TabEvent/' + EventCount] = "";
    jsn[userref + '/TabPEvent/' + EventCount] = "";
    jsn[userref + '/TabMeta/' + EventCount] = "";
    jsn[userref + '/TabPage/' + EventCount] = "";
    jsn[userref + '/PageAfterEvent/' + EventCount] = "";

    console.log('sendjson');
    console.log(jsn);
    undoEventJson(jsn);
}

function sendFirebaseDataWithRefUndo(userref, refChild, EventCount) {
    
    var jsn = {};

    jsn[userref + '/TabEvent/' + refChild + '/' + EventCount] = "";
    jsn[userref + '/TabPEvent/' + refChild + '/' + EventCount] = "";
    jsn[userref + '/TabMeta/' + refChild + '/' + EventCount] = "";
    jsn[userref + '/TabPage/' + refChild + '/' + EventCount] = "";
    jsn[userref + '/PageAfterEvent/' + refChild + '/' + EventCount] = "";

    console.log('sendjson');
    console.log(jsn);
    undoEventJson(jsn);
}



function SendDataFirebaseCondWithoutRefMenu(userref, TextKey, EventCount, PageCount, UpdateData, menu) {

    console.log('updtt ',UpdateData)
    console.log("menu",menu)
    NEventCount = (Number(EventCount) + 1).toString();

    var EncDataEvent = EncryptionForm(userref, menu["Event"]);

    var EncDataPEvent = EncryptionForm(userref, menu["Parent"]);

    var EncDataMeta = EncryptionForm(userref, UpdateData);

    var EncDataPage = EncryptionForm(userref, {
        "pagesource": menu["Page"]
    });

    var jsn = {};
    jsn[userref + '/TabEvent/' + EventCount + '/' + TextKey + '/' + NEventCount] = EncDataEvent;
    jsn[userref + '/TabPEvent/' + EventCount + '/' + TextKey + '/' + NEventCount] = EncDataPEvent;
    jsn[userref + '/TabMeta/' + EventCount + '/' + TextKey + '/' + NEventCount] = EncDataMeta;
    jsn[userref + '/TabPage/' + EventCount + '/' + TextKey + '/' + NEventCount] = EncDataPage;


    console.log('sendjson');
    console.log(jsn);
    addEventJson(jsn,true,EventCount);

}

function SendDataFirebaseCondWithRefMenu(userref, refChild, TextKey, EventCount, PageCount, UpdateData, menu) {

    console.log('menu1 ',menu)
	console.log('updtt ',UpdateData);

    NEventCount = (Number(EventCount) + 1).toString();

    var EncDataEvent = EncryptionForm(userref, menu["Event"]);

    var EncDataPEvent = EncryptionForm(userref, menu["Parent"]);

    var EncDataMeta = EncryptionForm(userref, UpdateData);

    var EncDataPage = EncryptionForm(userref, {
        "pagesource": menu["Page"]
    });

    var jsn = {};

    jsn[userref + '/TabEvent/' + refChild + '/' + EventCount + '/' + TextKey + '/' + NEventCount] = EncDataEvent;
    jsn[userref + '/TabPEvent/' + refChild + '/' + EventCount + '/' + TextKey + '/' + NEventCount] = EncDataPEvent;
    jsn[userref + '/TabMeta/' + refChild + '/' + EventCount + '/' + TextKey + '/' + NEventCount] = EncDataMeta;
    jsn[userref + '/TabPage/' + refChild + '/' + EventCount + '/' + TextKey + '/' + NEventCount] = EncDataPage;

    console.log('sendjson');
    console.log(jsn);
    addEventJson(jsn,true,EventCount);

}

// data send into firebase if not found condition or reference 
function SendDataFirebaseWithRef(addcheck, refChild, userref, EventCount, PageCount, UpdateData) {
	var page=UpdateData["page"]
	try{
		delete UpdateData["page"]
	}
	catch(err){}
    var EncData = EncryptionForm(userref, UpdateData);
    var jsn = {};

    jsn[userref + '/TabEvent/' + refChild + '/' + EventCount] = "";
    jsn[userref + '/TabPEvent/' + refChild + '/' + EventCount] = "";
    jsn[userref + '/TabMeta/' + refChild + '/' + EventCount] = EncData;
    jsn[userref + '/TabPage/' + refChild + '/' + EventCount] = "";
	if(page!=undefined){
		jsn[userref + '/TabPage/' + refChild + '/' + EventCount] = page;
	}
	jsn["random_key"] = UpdateData["random_key"];
    addEventJson(jsn,true,EventCount);
}

//data send into firebase using reference
function SendDataFirebaseWithoutRef(addcheck, refChild, userref, EventCount, PageCount, UpdateData) {
    console.log('updtt ',UpdateData,"EventCount",EventCount)
	var page=UpdateData["page"]
	try{
		delete UpdateData["page"]
	}
	catch(err){
		console.log("Errr in delting",err)
	}
    var EncData = EncryptionForm(userref, UpdateData);
	
    var jsn = {};

    jsn[userref + '/TabEvent/' + EventCount] = "";
    jsn[userref + '/TabPEvent/' + EventCount] = "";
    jsn[userref + '/TabMeta/' + EventCount] = EncData;
    jsn[userref + '/TabPage/' + EventCount] = "";
	
	if(page!=undefined){
		jsn[userref + '/TabPage/' + EventCount] = page;
		
	}
	jsn["random_key"] = UpdateData["random_key"];
    addEventJson(jsn,true,EventCount);


}

////// data send into firebase with reference
function SendDataFirebaseWithRefMenu(addcheck, refChild, userref, EventCount, PageCount, UpdateData, menu) {
    console.log("menu",menu)
	console.log('updtt ',UpdateData,"EventCount",EventCount)
    var EncDataEvent = EncryptionForm(userref, menu["Event"]);

    var EncDataPEvent = EncryptionForm(userref, menu["Parent"]);

    var EncDataMeta = EncryptionForm(userref, UpdateData);

    var EncDataPage = EncryptionForm(userref, {
        "pagesource": menu["Page"]
    });


    var jsn = {};

    jsn[userref + '/TabEvent/' + refChild + '/' + EventCount] = EncDataEvent;
    jsn[userref + '/TabPEvent/' + refChild + '/' + EventCount] = EncDataPEvent;
    jsn[userref + '/TabMeta/' + refChild + '/' + EventCount] = EncDataMeta;
    jsn[userref + '/TabPage/' + refChild + '/' + EventCount] = EncDataPage;

    console.log('sendjson');
    console.log(jsn);
	var shift=true
	if(UpdateData.auto_detected==true && UpdateData.category=="upload"){
		shift=false
	}
	console.log("shift",shift);
    addEventJson(jsn,shift,EventCount);

}

//data send into firebase if not found condition or reference
function SendDataFirebaseWithoutRefMenu(addcheck, refChild, userref, EventCount, PageCount, UpdateData, menu) {
	console.log("menu",menu)    
	console.log("UpdateData",UpdateData)    
    try{
    if(menu['Event']['placeholder']!=undefined && menu['Event']['placeholder']!=''){
        UpdateData['placeholder'] = menu['Event']['placeholder']
    }
    else if(menu['Parent']['placeholder']!=undefined && menu['Parent']['placeholder']!=''){
        UpdateData['placeholder'] = menu['Parent']['placeholder']    
    }
    else
    {
        UpdateData['placeholder'] = ''    
    }
    if(menu['Event']['tagtext']!=undefined && menu['Event']['tagtext']!=''){
        UpdateData['tagtext'] = menu['Event']['tagtext']
    }
    else if(menu['Parent']['tagtext']!=undefined && menu['Parent']['tagtext']!=''){
        UpdateData['tagtext'] = menu['Parent']['tagtext']
    }
    else{
        UpdateData['tagtext'] = ''
    }
}
catch{
    console.log("error")
}
	console.log('updtt ',UpdateData)

    var EncDataEvent = EncryptionForm(userref, menu["Event"]);

    var EncDataPEvent = EncryptionForm(userref, menu["Parent"]);

    var EncDataMeta = EncryptionForm(userref, UpdateData);

    var EncDataPage = EncryptionForm(userref, {
        "pagesource": menu["Page"]
    });
	console.log("AFTER SIZE",EncDataPage)

    var jsn = {};

    jsn[userref + '/TabEvent' + '/' + EventCount] = EncDataEvent;
    jsn[userref + '/TabPEvent' + '/' + EventCount] = EncDataPEvent;
    jsn[userref + '/TabMeta' + '/' + EventCount] = EncDataMeta;
    jsn[userref + '/TabPage' + '/' + EventCount] = EncDataPage;

    //console.log('sendjson');
    //console.log(jsn);
	var shift=true
	if(UpdateData.auto_detected==true && UpdateData.category=="upload"){
		shift=false
	}
	console.log("shift",shift);
    addEventJson(jsn,shift,EventCount);
}

function SendDataFirebaseWithRefMenu_Keypress(addcheck, refChild, userref, EventCount, PageCount, UpdateData, menu) {
    console.log("menu",menu)
	console.log('updtt ',UpdateData,"EventCount",EventCount)
    var EncDataEvent = EncryptionForm(userref, menu["Event"]);

    var EncDataPEvent = EncryptionForm(userref, menu["Parent"]);

    var EncDataMeta = EncryptionForm(userref, UpdateData);

    var EncDataPage = EncryptionForm(userref, {
        "pagesource": menu["Page"]
    });


    var jsn = {};

    jsn[userref + '/TabEvent/' + refChild + '/' + EventCount] = EncDataEvent;
    jsn[userref + '/TabPEvent/' + refChild + '/' + EventCount] = EncDataPEvent;
    jsn[userref + '/TabMeta/' + refChild + '/' + EventCount] = EncDataMeta;
    jsn[userref + '/TabPage/' + refChild + '/' + EventCount] = EncDataPage;

    console.log('sendjson');
    console.log(jsn);
    addEventJson(jsn,false,EventCount);
}
function SendDataFirebaseWithRefKeypress(addcheck, refChild, userref, EventCount, PageCount, UpdateData) {
    console.log('updtt ',UpdateData)
    var EncData = EncryptionForm(userref, UpdateData);


    var jsn = {};

    jsn[userref + '/TabEvent/' + refChild + '/' + EventCount] = "";
    jsn[userref + '/TabPEvent/' + refChild + '/' + EventCount] = "";
    jsn[userref + '/TabMeta/' + refChild + '/' + EventCount] = EncData;
    jsn[userref + '/TabPage/' + refChild + '/' + EventCount] = "";


    addEventJson(jsn,false,EventCount);


}