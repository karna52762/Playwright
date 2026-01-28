

/// set encryption 
function EncryptionForm(userref, Data) {
    var keylist = userref.split("/");
    var key = keylist.join("");
    console.log('EncryptionForm ', key,"Data",Data);
    var ENCData = jsonsign(Data, key, 1);
    return ENCData;
}

function addToken(jsn, callback) {

    jsn['gtoken'] = gbtoken;
    jsn['umail'] = gemail;
    console.log(jsn);
    callback(jsn);
    
}

function timeout(ms, promise) {
          return new Promise(function(resolve, reject) {
            setTimeout(function() {
              reject(new Error("timeout"))
            }, ms)
            promise.then(resolve, reject)
          })
    }

function fetchDk(jsn, url) {
    timeout(100000000000,fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsn),
        }))
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function fetchDkCbk(jsn, url, callback) {
    timeout(100000000000, fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsn),
        }))
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            callback(data, 1);
        })
        .catch((error) => {
            callback(error, 0);
        });

}

function fetchDkCbkImage(jsn, url, callback) {

    timeout(10000000, fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsn),
        }))
        .then((response) => response.text())
        .then((data) => {
            console.log("data",data);
            callback(data, 1);
        })
        .catch((error) => {
            callback(error, 0);
        });

}
function fetchDkCbk_gettoken(jsn, url, callback) {

    timeout(10000000, fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsn),
        }))
        .then((response) => response.json())
        .then((data) => {
            console.log("data from new",data);
            callback(data, 1);
        })
        .catch((error) => {
			console.log("error from new",error);
            callback(error, 0);
        });

}