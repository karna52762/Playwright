var _AnalyticsCode = 'G-WJP2GLP7MG';
var _gaq = _gaq || [];
_gaq.push(['_setAccount', _AnalyticsCode]);
_gaq.push(['_trackPageview']);
(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = './ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();
function trackButtonClick(e) {
  //_gaq.push(['_trackEvent', e.target.id, 'element_click']);
}


document.addEventListener('DOMContentLoaded', function () {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
	
	var buttons = document.querySelectorAll('button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', trackButtonClick);
  }
});

function update_code(){
	chrome.storage.local.get('page', function(dic) {
	if(dic["page"]!=undefined){
		check_page(dic["page"])
	}
	else{
		check_page("start_page")
	}
}
)
}
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
		console.log("request 1017",request)
		if(request.update_code==true){
			update_code()
			sendResponse();
		}
	})
	
	
function hide_all(){
	
	console.log('hiding');
	document.getElementById("description").style.display="none";
	//document.getElementById("code_page_div").style.display="none";
}
function show_code(page){
	chrome.runtime.sendMessage({"get_code": true},function(resp){
		var code=resp["code"]
		var current_code_page=resp["current_code_page"]
		console.log("current_code_page",current_code_page)
		
		document.getElementById("code_page_div").style.display="block";
		console.log("CODE:-",code)
		console.log('page', page);
		/*document.getElementById("selenium_code").checked=false;
		/document.getElementById("selenium_pro_code").checked=false;
		if(current_code_page=="selenium"){
			document.getElementById("selenium_code").checked=true;
		}
		else{
			document.getElementById("selenium_pro_code").checked=true;
		}
		*/
		if(code==""){
			document.getElementById("code_page_div").style.display="none";
			if(page=="start_page"){
			document.getElementById("description").style.display="block";
		   }
		   else if(page=="stop_page"){
			document.getElementById("code_page_div").style.display="block";
			var static_code="\nfrom selenium import webdriver\nfrom selenium.webdriver.common.by import By\nfrom webdriver_manager.chrome import ChromeDriverManager\nfrom elements_manager import *\ndriver = webdriver.Chrome(ChromeDriverManager().install())\n\nWaiting for you to perform actions....\nYour Code will show up here..."
			if(current_code_page=="selenium_pro"){
			static_code="\nfrom selenium_pro import webdriver\ndriver = webdriver.Start()\n\nWaiting for you to perform actions....\nYour Code will show up here..."}
			document.getElementById("code_area").textContent=static_code
		   }
		}
		else{
		document.getElementById("code_area").textContent='\n'+code
		document.getElementById("code_page_div").style.display="block";
		}

		
	});
}
function check_page(page){
	console.log("PAGE:-",page)
	chrome.storage.local.set({"page":page})
	hide_all()
	if(page=="start_page"){
		document.getElementById("start_stop_page").style.display="block";
		document.getElementById("start_stop_button").textContent="Start Recording";
		document.getElementById("start_stop_button").className="btn btn-primary";
		show_code(page)
	}
	else if(page=="stop_page"){
		document.getElementById("start_stop_page").style.display="block";
		document.getElementById("start_stop_button").textContent="Stop Recording"
		document.getElementById("start_stop_button").className="btn btn-danger";
		show_code(page)
	}
}

chrome.storage.local.get('page', function(dic) {
	if(dic["page"]!=undefined){
		check_page(dic["page"])
	}
	else{
		check_page("start_page")
	}
}
)
function refresh_page(){
	chrome.storage.local.get('page', function(dic) {
	if(dic["page"]!=undefined){
		check_page(dic["page"])
	}
	else{
		check_page("start_page")
	}
}
)
}

function copyTextToClipboard(copytext) {
    //Create a textbox field where we can insert text to. 
    var copyFrom = document.createElement("textarea");
    //Set the text content to be the text you wished to copy.
    copyFrom.textContent = copytext;
    //Append the textbox field into the body as a child. 
    //"execCommand()" only works when there exists selected text, and the text is inside 
    //document.body (meaning the text is part of a valid rendered HTML element).
    document.body.appendChild(copyFrom);
    //Select all the text!
    copyFrom.select();
    //Execute command
    document.execCommand('copy');
    //(Optional) De-select the text using blur(). 
    copyFrom.blur();
    //Remove the textbox field from the document.body, so no other JavaScript nor 
    //other elements can get access to this.
    document.body.removeChild(copyFrom);

}
document.getElementById("start_stop_button").addEventListener('click', () => {
	var textt=document.getElementById("start_stop_button").textContent
	console.log("start_stop_button Clicked",textt)
	var another_text="start_page"
	if(textt=="Start Recording"){another_text="stop_page"}
	chrome.runtime.sendMessage({"start_stop_button": textt},function(){check_page(another_text)});
	_gaq.push(['_trackEvent', textt, 'clicked']);
	console.log("PUSHED")
})
document.getElementById("CopyPythonCode").addEventListener('click', () => {
	console.log("CopyPythonCode")
	chrome.runtime.sendMessage({"copy_python_code": true},function(copytext){
		console.log("TExt go copy",copytext);copyTextToClipboard(copytext)});
	_gaq.push(['_trackEvent', "CopyPythonCode", 'clicked']);
})

document.getElementById("selenium_code").addEventListener('click', () => {
	console.log("selenium_code")
	chrome.runtime.sendMessage({"set_current_code_page": "selenium"},function(){refresh_page()});
	_gaq.push(['_trackEvent', "selenium_code", 'clicked']);
})
/*
document.getElementById("selenium_pro_code").addEventListener('click', () => {
	console.log("selenium_code")
	chrome.runtime.sendMessage({"set_current_code_page": "selenium_pro"},function(){refresh_page()});
	_gaq.push(['_trackEvent', "selenium_pro_code", 'clicked']);
})
*/
