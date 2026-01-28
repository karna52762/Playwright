function timeout(ms, promise) {
          return new Promise(function(resolve, reject) {
            setTimeout(function() {
              reject(new Error("timeout"))
            }, ms)
            promise.then(resolve, reject)
          })
    }

function fetchDkCbk(jsn, url, callback) {
    timeout(100000000000, fetch(url, {
            method: 'POST',
            body: JSON.stringify(jsn),
        }))
        .then((response) => response.json())
        .then((data) => {
            callback(data, 1);
        })
        .catch((error) => {
            callback(error, 0);
        });

}