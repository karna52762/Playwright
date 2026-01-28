var endpoint = 'https://tcs.selectorshub.com/';

 function checkSessionId() {
     browserType.storage.local.get(['ttlt'], (e) => {
       
         if (typeof e.ttlt == 'undefined' || e.ttlt == 'undefined' || e.ttlt ==  null || e.ttlt ==  '') {
       
           $('.popup__actions__container').removeClass('update-upgrade-panel')
           $('.patronRequest .after-login').hide();
           $('.upgradeBtn.top.home-login-btn').show()
           $('.upgradeBtn.top.after-login-top-upgrade').hide()
           $('.profile, .profile-hide').remove()
      
         }else{
            checkUser(e.ttlt)
            $('.right__section').remove();
            $('.popup__actions__container').addClass('update-upgrade-panel')
            $('.patronRequest').children(':not(.after-login)').hide();
            $('.patronRequest .after-login').show();
            $('.upgradeBtn.top.home-login-btn').hide()
            $('.upgradeBtn.top.after-login-top-upgrade').show()
            $('.profile, .profile-hide').show()
            loginIssue()
         }
     }); 
 }
 
 
 
 $(document).ready(function () {
   checkSessionId();
    $('.profile').click(function(){
        chrome.windows.create({
              url: chrome.runtime.getURL("testCaseStudio/profile.html"),
              type: "popup",
              height: 500,
              width: 600,
          }).then(function () {
          }).catch(function (e) {
          });

  });
     
     $(document).on('click','.logout-btn',function(){
        logout()
     })
       
  
    $(document).on('click','.home-login-btn',function(){
        window.location.href = window.location.href.replace('studioWindow.html', 'login.html')
     });

   

 })

 
 function loginIssue() {
    browserType.storage.local.remove('fetched_ads')
    displayAllAds([])
    $('.home-login-btn, .login-hide').remove()
    $('.right__section').remove();
    
    $('.ads__text, .ads__container, .ads__viewer, .image__ad, .top_ads__viewer, #image-ads').hide()
    $('.after-login-footer').show()

    $('.patronRequest').children(':not(.after-login)').hide();
    $('.patronRequest .after-login').show();
    $('.patronRequest').removeClass('hideElement')
    $('.upgradeBtn.top.home-login-btn').hide()
    $('.upgradeBtn.top.after-login-top-upgrade').show()    
    $('.popup__actions__container').addClass('update-upgrade-panel')
    browserType.runtime.sendMessage({ action: "updateContextMenuAfterLogin" });
   
}
 function logout() {

    $('.patronRequest').children(':not(.after-login)').show();
    $('.patronRequest .after-login').hide();
    browserType.storage.local.get(['ttlt'], (e) => {
        if (typeof e.ttlt == 'undefined' || e.ttlt == 'undefined' || e.ttlt ==  null || e.ttlt ==  '') {
        }else{
           logoutUser(e.ttlt)
            browserType.storage.local.remove('ttlt', function() {
                        $('.upgradeBtn.top.home-login-btn').show()
                        $('.upgradeBtn.top.after-login-top-upgrade').hide()  
                        checkSessionId()
                        if (browserType.runtime.lastError) {
                            console.error(`Error removing key 'ttlt': ${browserType.runtime.lastError}`);
                        } else {
                            console.log("Key 'ttlt' removed successfully.");
                        }
            });

           

            }
        }
    )

   

    $('.after-login-footer').hide()
    $('.ads__text, .ads__container, .ads__viewer, .image__ad, .top_ads__viewer, #image-ads').show()
    $('.popup__actions__container').removeClass('update-upgrade-panel')
    fetchingAds()
    $('.patronRequest').show();
 }


 function logoutUser(tlp){
    $('.patronRequest').children(':not(.after-login)').show();
    $('.patronRequest .after-login').hide();
    $.ajax({
        method: "get",
        url: endpoint + 'user/logout',
         beforeSend: function(request) {
            request.setRequestHeader("Content-type", 'application/json');
            request.setRequestHeader("Authorization", 'Bearer '+tlp);
          },
        success: function(serverResponse, txtStatus, request) {
        },
          error: function(event, jqxhr, exception) {
           
        },
        statusCode: {
        500: function(serverResponse) {
           
        },
         401: function(serverResponse) {
            
        }
      }
     });
 }

 function checkUser(tlp){
    $.ajax({
        method: "get",
        url: endpoint + 'user/get-user',
         beforeSend: function(request) {
            request.setRequestHeader("Content-type", 'application/json');
            request.setRequestHeader("Authorization", 'Bearer '+tlp);
          },
        success: function(serverResponse, txtStatus, request) {
            if(request.status == 200 && serverResponse.status){
            }else{
                logout()
            }
        },
          error: function(event, jqxhr, exception) {
            logout()
        },
        statusCode: {
        500: function(serverResponse) {
            logout()
        },
         401: function(serverResponse) {
            logout()
        }
      }
     });
 }

 chrome.runtime.onMessage.addListener(function (
    message,
    sender,
    sendResponse
  ) {

  if(message.logout){
    window.location.reload()
  }

  })