var endpoint = 'https://tcs.selectorshub.com/';
function showLoginScreen(expose) {
    if (expose) {
            document.getElementById("register_form").style.display="none";
            $('.container').show()
     }
 }
 
 function checkSessionId() {
     chrome.storage.local.get(['ttlt'], (e) => {
       
         if (typeof e.ttlt == 'undefined' || e.ttlt == 'undefined' || e.ttlt ==  null || e.ttlt ==  '') {
           showLoginScreen(false) 
           $('.popup__actions__container').removeClass('update-upgrade-panel')
           $('.patronRequest .after-login').hide();
           $('.upgradeBtn.top.home-login-btn').show()
           $('.upgradeBtn.top.after-login-top-upgrade').hide()
         }else{
            showLoginScreen(true)
            checkUser(e.ttlt)
            $('.popup__actions__container').addClass('update-upgrade-panel')
            $('.patronRequest').children(':not(.after-login)').hide();
            $('.patronRequest .after-login').show();
            $('.upgradeBtn.top.home-login-btn').hide()
            $('.upgradeBtn.top.after-login-top-upgrade').show()
         }
     }); 
 }
 
 
 
 $(document).ready(function () {

    $('.after-login.profile').click(function(){
        chrome.windows.create({
              url: chrome.runtime.getURL("devtools-panel/profile.html"),
              type: "popup",
              height: 500,
              width: 600,
          }).then(function () {
          }).catch(function (e) {
          });

  });
    
     
 $("#email-f").on('keyup', function (e) {
     if (e.key === 'Enter' || e.keyCode === 13) {
         $('.forgetbtn').click();
     }
 });
 
 $("#password").on('keyup', function (e) {
     if (e.key === 'Enter' || e.keyCode === 13) {
         $('#submit_btn').click();
     }
 });
 
 
 
     $('.open-forgot-password').click(function(){
         $('.forgetbtn').show()
         $('#submit_btn').hide()
         $('.password-container').hide()
         $('.open-forgot-password').hide();
         $('.open-login').show();
     })
 
     $('.open-login').click(function(){
         $('.forgetbtn').hide()
         $('#submit_btn').show()
         $('.open-forgot-password').show();
         $('.open-login').hide()
          $('.password-container').show()
     })
 
     
 
      $('.forgetbtn').click(function(){
         let user_email = document.getElementById("email").value.trim();
        loading(true);
 
          $('.forgetbtn').prop('disabled', true); 
        $('.forgetbtn').val('Please wait') 
            $.ajax({
             method: "POST",
             url: endpoint + 'user/sendforgot',
              beforeSend: function(request) {
                 request.setRequestHeader("Content-type", 'application/json');
               },
             data:  JSON.stringify({email:user_email}),
             success: function(serverResponse, txtStatus, request) {
                loading(false); 
                      $('.forgetbtn').prop('disabled', false); 
                         $('.forgetbtn').val('Submit') 
                 if(request.status == 200 && serverResponse.status){
                        $('.user-status').text(serverResponse.message).css('color','green').slideDown();
                     setTimeout(()=>{$('.user-status').slideUp();},5000)
                    
                   }else{
                    chrome.storage.local.remove('ttlt');
                     $('.user-status').text(serverResponse.message).css('color','red').slideDown();
                     setTimeout(()=>{$('.user-status').slideUp();},5000)
                 }
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
       
 
         })
 
 
     $('#submit_btn').click(function(){
         let user_email = document.getElementById("licence").value.trim();

         if(user_email==''){return false}

        loading(true);
 
        $('#submit_btn').prop('disabled', true); 
        $('#submit_btn').val('Please wait') 
 
            $.ajax({
             method: "POST",
             url: endpoint + 'user/login',
              beforeSend: function(request) {
                 request.setRequestHeader("Content-type", 'application/json');
               },
             data:  JSON.stringify({lk:user_email}),
             success: function(serverResponse, txtStatus, request) {
                loading(false); 
              $('#submit_btn').prop('disabled', false); 
                 $('#submit_btn').val('Login') 
                 if(request.status == 200 && serverResponse.status){
                       chrome.storage.local.set({ttlt:serverResponse.token});
                       ttlt = serverResponse.token; 
                       chrome.storage.local.set({data:serverResponse.data,messages:serverResponse.messages}, function(){
                             showLoginScreen(true)
                             chrome.runtime.sendMessage({message: "loggedin"}, function(response) {})
                       });
                       loginIssue() 
                   }else{
                        $('#submit_btn').prop('disabled', false); 
                        $('#submit_btn').val('Login') 
                        chrome.storage.local.remove('ttlt');
                        $('.subscription-status').text(serverResponse.message).slideDown();
                        setTimeout(()=>{$('.subscription-status').slideUp();},5000)

                        if(serverResponse.message.indexOf('Already') > -1){
                            $('#three-modal').show();
                        }
                 }
             },
               error: function(event, jqxhr, exception) {
                     loading(false)
                     $('#submit_btn').prop('disabled', false); 
                     $('#submit_btn').val('Login') 
                     $('.invalid-error.invalid-credentails').text('Invalid credentials').slideDown()
                    setTimeout(function(){ document.getElementsByClassName('invalid-credentails')[0].style.display = 'none'; },3000);
             },
             statusCode: {
             500: function(serverResponse) {
          
             },
              401: function(serverResponse) {
                 loading(false)
                     $('#submit_btn').prop('disabled', false); 
                     $('#submit_btn').val('Login') 
                 $('.invalid-error.invalid-credentails').text('Invalid credentials').slideDown()
                 setTimeout(function(){ 
                     document.getElementsByClassName('invalid-credentails').style.display = 'none';
                 },3000);
             }
           }
          });
       
 
         })
 

     
     $(document).on('click','.logout-btn',function(){
       
        //$('.logout-btn').text('Login')
       // $('.logout-btn').addClass('home-login-btn').removeClass('login-btn')
        logout()
     })
       
  
    $(document).on('click','.home-login-btn',function(){
        document.querySelector(".container").style.display="none";
        document.querySelector("#register_form").style.display="block";
        document.querySelector(".top_ads__viewer").style.display="none";
        setTimeout(()=>{document.querySelector(".top_ads__viewer").style.display="none";},200)
     });

     checkSessionId();

     $(document).on('click','.close-modal',function(){
          window.location.href = window.location.href.replace('login.html', 'studioWindow.html')
     });

     $(document).on('click','.device-close',function(){
        let num = parseInt($(this).attr('data-num'))

        let user_email = document.getElementById("licence").value.trim();

        if(user_email==''){return false}
        $('#three-modal').hide()
        loading(true);

        $('#submit_btn').prop('disabled', true); 
        $('#submit_btn').val('Please wait') 

           $.ajax({
            method: "POST",
            url: endpoint + 'user/remove',
             beforeSend: function(request) {
                request.setRequestHeader("Content-type", 'application/json');
              },
            data:  JSON.stringify({lk:user_email, num:num}),
            success: function(serverResponse, txtStatus, request) {
               loading(false); 
             $('#submit_btn').prop('disabled', false); 
                $('#submit_btn').val('Login') 
                if(request.status == 200 && serverResponse.status){
                      chrome.storage.local.set({ttlt:serverResponse.token});
                      ttlt = serverResponse.token; 
                      chrome.storage.local.set({data:serverResponse.data,messages:serverResponse.messages}, function(){
                            showLoginScreen(true)
                            chrome.runtime.sendMessage({message: "loggedin"}, function(response) {})
                      });
                      loginIssue() 
                   
                  }else{
                       $('#submit_btn').prop('disabled', false); 
                       $('#submit_btn').val('Login') 
                       chrome.storage.local.remove('ttlt');
                       $('.subscription-status').text(serverResponse.message).slideDown();
                       setTimeout(()=>{$('.subscription-status').slideUp();},5000)

                       if(serverResponse.message.indexOf('Already') > -1){
                           $('#three-modal').show();
                       }
                }
            },
              error: function(event, jqxhr, exception) {
                    loading(false)
                    $('#submit_btn').prop('disabled', false); 
                    $('#submit_btn').val('Login') 
                    $('.invalid-error.invalid-credentails').text('Invalid credentials').slideDown()
                   setTimeout(function(){ document.getElementsByClassName('invalid-credentails')[0].style.display = 'none'; },3000);
            },
            statusCode: {
            500: function(serverResponse) {
         
            },
             401: function(serverResponse) {
                loading(false)
                    $('#submit_btn').prop('disabled', false); 
                    $('#submit_btn').val('Login') 
                $('.invalid-error.invalid-credentails').text('Invalid credentials').slideDown()
                setTimeout(function(){ 
                    document.getElementsByClassName('invalid-credentails').style.display = 'none';
                },3000);
            }
          }
         });


     })


     $(document).on('click','#close_btn',function(){
      window.location.href = window.location.href.replace('login.html', 'studioWindow.html')
     })

     $(document).on('click','#forgot_pass',function(){
        $('.email-container, .forgetbtn, #open_login').show()
        $('.licence-container, #submit_btn, #forgot_pass').hide()
     });

     $(document).on('click','#open_login',function(){
        $('.email-container, .forgetbtn, #open_login').hide()
        $('.licence-container, #submit_btn, #forgot_pass').show()
     });

 })
 
 function loading(show) {
     if (show) {
         $('.loading-view').show()
     }else{
         $('.loading-view').hide()
     }
 }
 
 function loginIssue() {
    // displayAllAds([]) 
    chrome.storage.local.remove('fetched_ads')
    chrome.runtime.sendMessage({ action: "updateContextMenuAfterLogin" });
    window.location.href = window.location.href.replace('login.html', 'studioWindow.html')

}
 function logout() {

    $('.patronRequest').children(':not(.after-login)').show();
    $('.patronRequest .after-login').hide();
    chrome.storage.local.get(['ttlt'], (e) => {
        if (typeof e.ttlt == 'undefined' || e.ttlt == 'undefined' || e.ttlt ==  null || e.ttlt ==  '') {
        }else{
           logoutUser(e.ttlt)
            chrome.storage.local.remove('ttlt', function() {
                        $('.upgradeBtn.top.home-login-btn').show()
                        $('.upgradeBtn.top.after-login-top-upgrade').hide()  
                        checkSessionId()
                        if (chrome.runtime.lastError) {
                            console.error(`Error removing key 'ttlt': ${chrome.runtime.lastError}`);
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
    // fetchingAds()
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
console.log('message')
  if(message.logout){
    logout()
  }

  })