var endpoint = 'https://tcs.selectorshub.com/';
$(document).ready(function () {
    let logoutModal = document.querySelector(".logout_modal_container");
    $(document).on('click','.open-logout', function () {
        logoutModal.style.display = "flex";
    });

    $(".logout_modal .modal_btn.confirm").on("click", () => {
        logout();
    })

    $(".logout_modal .modal_btn.cancel").on("click", () => {
        logoutModal.style.display = "none";
    })

});

function logout() {
      chrome.runtime.sendMessage({logout: "logout"});
      chrome.storage.local.get(['ttlt'], (e) => {
        if (typeof e.ttlt == 'undefined' || e.ttlt == 'undefined' || e.ttlt ==  null || e.ttlt ==  '') {
        }else{
           logoutUser(e.ttlt)
            chrome.storage.local.remove('ttlt', function() {});
            }
        }
    )
     
}


function logoutUser(tlp){
    $.ajax({
        method: "get",
        url: endpoint + 'user/logout',
         beforeSend: function(request) {
            request.setRequestHeader("Content-type", 'application/json');
            request.setRequestHeader("Authorization", 'Bearer '+tlp);
          },
        success: function(serverResponse, txtStatus, request) {
            window.close()
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