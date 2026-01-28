console.log("ImportD")
var bucketName = "tabpage";
var bucketRegion = "us-east-1";
//AWS.config.update({region: bucketRegion,credentials: new AWS.CognitoIdentityCredentials({IdentityPoolId: IdentityPoolId})});
AWS.config.update({maxRetries: 3,httpOptions: {timeout: 30000, connectTimeout: 5000},region: bucketRegion,accessKeyId: 'accc',secretAccessKey: 'acess/+',
});
AWS.config.httpOptions.timeout = 0;
var s3 = new AWS.S3({
		apiVersion: '2010-12-01',
		params: {Bucket: bucketName}
});
console.log("Connected!!")
function s3upload(key,body,sendResponse){
	console.log("UPLOADIF TO S3",sendResponse)
     s3.upload({
        Key:key,
        Body:body,
        ACL: 'public-read'
        }, function(err, data) {
        if(err) {
        console.log('error in s3',err);
		chrome.runtime.sendMessage({"page_saved":false,"key":key});
        }
        }).on('httpUploadProgress', function (progress) {
        var uploaded = parseInt((progress.loaded * 100) / progress.total);
        $("progress").attr('value', uploaded);
		console.log('uploaded s3',uploaded,key);
		if(uploaded.toString()=="100"){
			console.log('Successfully Uploaded Page s3 !',key);
			chrome.runtime.sendMessage({"page_saved":true,"key":key});
		}
      });
   }
