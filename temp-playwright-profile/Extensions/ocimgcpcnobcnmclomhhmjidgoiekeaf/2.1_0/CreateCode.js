function create_python_code(dt,event_count,rndom_key){
	var sel_pro_code=dt["code"]
	var sel_code=dt["selenium_code"]
	var front_sel_pro_code='from selenium_pro import webdriver\n'
	var front_sel_code='from selenium import webdriver\nfrom selenium.webdriver.common.by import By\nfrom webdriver_manager.chrome import ChromeDriverManager\nfrom elements_manager import *\n'
	selenium_pro_code_dic[event_count]=sel_pro_code
	selenium_code_dic[event_count]=sel_code
	var new_sel_pro_code=""
	var new_sel_code=""
	console.log("events_order_dic[user+bot]",events_order_dic[user+bot])
	var total=Object.keys(events_order_dic[user+bot]).length
	console.log("total",total)
	for (var i = 0; i<total; i++){
		var cde=selenium_pro_code_dic[i]
		if(cde==undefined){cde="Loading..."}
		new_sel_pro_code=new_sel_pro_code+cde+"\n\n"
		
		cde=selenium_code_dic[i]
		if(cde==undefined){cde="Loading..."}
		new_sel_code=new_sel_code+cde+"\n\n"
	}
	console.log("new_sel_pro_code",new_sel_pro_code)
	console.log("new_sel_code",new_sel_code)
	if(new_sel_pro_code.indexOf(".send_keys(")>-1 && new_sel_pro_code.indexOf("Keys.")>-1){
		front_sel_pro_code=front_sel_pro_code+"from selenium_pro.webdriver.common.keys import Keys\n"
	}
	if(new_sel_code.indexOf(".send_keys(")>-1 && new_sel_code.indexOf("Keys.")>-1){
		front_sel_code=front_sel_code+"from selenium.webdriver.common.keys import Keys\n"
	}
	if(new_sel_pro_code.indexOf("Select(")>-1){
		front_sel_pro_code=front_sel_pro_code+"from selenium_pro.webdriver.support.ui import Select\n"
	}
	if(new_sel_code.indexOf("Select(")>-1){
		front_sel_code=front_sel_code+"from selenium.webdriver.support.ui import Select\n"
	}
	front_sel_pro_code=front_sel_pro_code+"driver = webdriver.Start()\n"
	front_sel_code=front_sel_code+"driver = webdriver.Chrome(ChromeDriverManager().install())\n"
	console.log("front_sel_pro_code",front_sel_pro_code)
	console.log("front_sel_code",front_sel_code)
	if(new_sel_pro_code!=""){
	selenium_pro_code=front_sel_pro_code+new_sel_pro_code
	}
	else{
		selenium_pro_code=front_sel_pro_code+"Waiting for you to perform actions....\nYour Code will show up here..."
	}
	if(new_sel_code!=""){
	selenium_code=front_sel_code+new_sel_code
	}
	else{
		selenium_code=front_sel_code+"Waiting for you to perform actions....\nYour Code will show up here..."
	}
	console.log("FINALLL selenium_code",selenium_code)
	console.log("\nFINALLL selenium_pro_code",selenium_pro_code)
	chrome.runtime.sendMessage({"update_code": true});
}

function clear_code(){
	selenium_pro_code=""
	selenium_code=""
}