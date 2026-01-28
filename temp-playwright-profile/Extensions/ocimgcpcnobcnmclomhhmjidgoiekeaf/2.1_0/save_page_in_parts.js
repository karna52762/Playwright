function get_data_parts_dic(tabpage){
	var data_parts_dic={}
	var part_size=3000000
	var temp_part=""
	var iterator=0
	for (var i = 0; i<tabpage.length; i++){
		if(temp_part.length==part_size){
			data_parts_dic[iterator]=temp_part
			iterator=iterator+1
			temp_part=""
		}
		temp_part=temp_part+tabpage[i]
	}
	if(temp_part!=""){
		data_parts_dic[iterator]=temp_part
	}
	return data_parts_dic
}
function save_page_recursive(data_parts_dic,iterator,new_jsnn,user,bot,pathh,addtodynamodb_api,EventCountt,random_keyy){
	console.log("Incoming iterator",iterator)
	if(iterator==Object.keys(data_parts_dic).length){
		console.log("PAGE SAVED FINAlY")
		save_event_recursive(new_jsnn,0,user,bot,pathh,addtodynamodb_api,EventCountt,random_keyy)
	}
	else{
		var jsn={"part_no":iterator,"body":data_parts_dic[iterator],"file_name":user+bot+random_keyy}
		fetchDkCbk(jsn, save_page_parts_api,function(dt,cnt){
			console.log("SAVE PAGE retuned",dt)
			save_page_recursive(data_parts_dic,iterator+1,new_jsnn,user,bot,pathh,addtodynamodb_api,EventCountt,random_keyy)
	})
	}
}

function save_page_in_parts(new_jsnn,user,bot,pathh,addtodynamodb_api,EventCountt,random_keyy,tabpage){
	console.log("TAB PAGE LEN",tabpage.length)
	var data_parts_dic=get_data_parts_dic(tabpage)
	console.log("data_parts_dic",data_parts_dic)
	save_page_recursive(data_parts_dic,0,new_jsnn,user,bot,pathh,addtodynamodb_api,EventCountt,random_keyy)
}