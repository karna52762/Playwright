function SetEventCountinFirebase(EventCount, PageCount, userref, count) {

    var EventCountDict = {};
    if (count == 1) {
        EventCountDict["EventCount"] = EventCount + 1;
        EventCountDict["PageCount"] = PageCount + 1;
        globalCount = globalCount + 1;
    } else if (count == 2) { // condition found
        EventCountDict["EventCount"] = EventCount + 2;
        EventCountDict["PageCount"] = PageCount + 2;
        globalCount = globalCount + 2;
    } else if (count == 0) {
        EventCountDict["EventCount"] = 0;
        EventCountDict["PageCount"] = 0;
        globalCount = globalCount;
    }
}
function save_event_recursive(jsn,count,luser,lbot,path,addtodynamodb_api_temp,event_count,rndom_key){
	count_hit += 1
	var tabmeta={}
	for (var i = 0; i<Object.keys(jsn).length; i++){
		var ksy=Object.keys(jsn)[i]
		if(ksy.indexOf("TabMeta")>=0){
			tabmeta=jsn[ksy]
			tabmeta = jsonsign(tabmeta,user+bot,2)
		}
	}
	try{
	fetchDkCbk(jsn, addtodynamodb_api_temp,function(dt,cnt){
				count_res +=cnt
				try{	
					var s=Object.keys(dt).length
				}
				catch(err){
					dt={}
				}
				if(cnt==1 && Object.keys(dt).length>=0){
				console.log("Event saved successfully",dt)
				create_python_code(dt,event_count,rndom_key)
				}
				else{
					if(count<3){
					setTimeout(function(){save_event_recursive(jsn,count+1,luser,lbot,path,addtodynamodb_api_temp,event_count,rndom_key)},1000)
					}
					
				}
            });
	}
	catch(err){
		setTimeout(function(){save_event_recursive(jsn,count+1,luser,lbot,path,addtodynamodb_api_temp,event_count,rndom_key)},1000)
	}
}
function randomString() {
	var length=15;
	var chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_'
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
function wait_till_page_saved(new_jsnn,user,bot,pathh,addtodynamodb_api,EventCountt,random_keyy){
	console.log("wait_till_page_saved",user+bot+random_keyy)
	console.log("loooking",i)
	if(page_saved_dic[user+bot+random_keyy]==undefined){
		setTimeout(function(){wait_till_page_saved(new_jsnn,user,bot,pathh,addtodynamodb_api,EventCountt,random_keyy)},2000)
	}
	else{
		console.log("saved man")
		setTimeout(function(){save_event_recursive(new_jsnn,0,user,bot,pathh,addtodynamodb_api,EventCountt,random_keyy)},2000)
	}
}
function addEventJson(jsn,shift,EventCount) {
	jsn["user"]=user
	jsn["bot"]=bot	
		var random_key=jsn["random_key"]
		var secret_key1 = user+bot
		if(random_key==undefined){
		random_key=randomString()
		}
		jsn["random_key"]=random_key
		set_events_order_dic(EventCount,random_key)
		create_python_code({"code":"Loading....."},EventCount,random_key)
		var path = Object.keys(jsn)[0]
		var tabpage=""
		var new_jsn={}
		for (var i = 0; i<Object.keys(jsn).length; i++){
			ky=Object.keys(jsn)[i]
			if(ky.indexOf("/TabPage/")>-1){
				tabpage=jsn[ky]
			}
			else{
				new_jsn[ky]=jsn[ky]
			}
		};
		if(tabpage==""){
			console.log("No Page Source")
			save_event_recursive(jsn,0,user,bot,path,addtodynamodb_api,EventCount,random_key)
		}
		else{
			console.log("Page Found")
			console.log("new_jsn",new_jsn);
			save_page_in_parts(new_jsn,user,bot,path,addtodynamodb_api,EventCount,random_key,tabpage)
		}
}