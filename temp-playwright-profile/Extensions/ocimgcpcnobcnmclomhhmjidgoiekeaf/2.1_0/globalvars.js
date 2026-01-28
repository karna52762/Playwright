var recording=false
var user="public_user"
var bot="public_bot"
var big_key=""
var GlobalEvent={}
var GlobalParent={}
var GlobalPage=""
var keypress_start_count=0
var globalCount=0
var gserverIp="https://api.datakund.com:5350"
var gPending={};
var missingevents_dict = {};
var gBeginAnalysis=false;
var gJson={};
var gType={};
var gResponse={};
var selectedeventdic={};
var copyeventdic={};
var ahrefdic={};
var imgNodedic={};
//var add_document_api="https://2tg1489bre.execute-api.us-east-2.amazonaws.com/default/add_document"
//var read_document_api="https://oupjhtjxv1.execute-api.us-east-2.amazonaws.com/default/read_document"
//var delete_document_api="https://prhyyusts9.execute-api.us-east-2.amazonaws.com/default/delete_document"
var addtodynamodb_api="https://52alz27hbionnti7jhvoadjr7u0qshsj.lambda-url.us-east-2.on.aws/"
//var undodynamodb_api="https://da65i2h305.execute-api.us-east-2.amazonaws.com/default/undodynamodb"
//var gettabmetacharts_api="https://2zvy5i6161.execute-api.us-east-2.amazonaws.com/default/get_tab_meta_charts"
var events_order_dic={}
var database="dynamodb"
var globalcharts=""
var start_repeat=true;
var run_page_type="simple"
var google_sheet_linked_dic = {}
var train_bot_global = {}
var show_train_button_dic={}
var code_dict={}
var last_page=""
var train_response_returned=true
var events_done_dict={}
var bots_folder_dic={}
var current_folder=""
var current_tab_url=""
var current_tab_id=""
var current_tab_index=""
var LastEventDic={}
var LastParentDic={}
var repeat_group_dic={}
var current_group_dic={}
var count_hit = 0
var count_res = 0
var publishRDinfo_dic={}
var xl_link_dic={}
var bot_list=[]
var selenium_pro_code=""
var selenium_pro_code_dic={}
var selenium_code=""
var selenium_code_dic={}
var page_saved_dic={}
var save_page_parts_api="https://54ldikig2avobeplkajw3qjwem0xjknx.lambda-url.us-east-2.on.aws/"
var current_code_page="selenium"
function set_events_order_dic(event_number,random_id){
	var shift=false
	try{
		var already=events_order_dic[user+bot][event_number]
		if(already!=undefined){
			shift=true
	}}
	catch(err){
	}
	if(shift==false){
		try{
			events_order_dic[user+bot][event_number]=random_id
		}
		catch(e){
			events_order_dic[user+bot]={}
			events_order_dic[user+bot][event_number]=random_id
		}
	}
	else{
		var events_dic=events_order_dic[user+bot]
		var new_events_dic={}
		var new_event_no=0
		for (const [event_number_copy, random_key] of Object.entries(events_dic)) {
			if(event_number==event_number_copy){
				new_events_dic[new_event_no]=random_id
				new_event_no=new_event_no+1
			}
			new_events_dic[new_event_no]=events_dic[event_number_copy]
			new_event_no=new_event_no+1
		}
		events_order_dic[user+bot]=new_events_dic
	}
	console.log("events_order_dic set",events_order_dic)
}