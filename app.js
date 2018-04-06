$(document).ready(function(){

	// Hide the loading message
	$("#loading").hide();


    jwt = null;

    $("#app").show();

	// query the api button action
	$("#doit > button").click(function(){
		var url = '/api/honeypotlatest.php';
		var method = 'GET';
		var data = {};
		var success = function(response){
			JSON.stringify(response, null, 4);
		}
		var failure = function(error) {

		}
		// run the api call specified and wait for its response
		apicall(url, method, data, success, failure)
	});




	// dumb wrapper for api calls because im lazy and bad at javascript
	function apicall(url, method, data, goodcall, badcall) {
		// if we have a JWT set, send it with the request
		if(jwt != null) {
			url = url + '?token=' + jwt;
		}
		
		// call the ajax and wait for it to complete
		var ajaxCall = $.ajax({
			url: url,
			method: method,
			data: data,
			success: function(data) {
				
				// this is some optional code to capture updated auth tokens as we make calls
				var responseHeaders = ajaxCall.getAllResponseHeaders();
				var regex = /authorization: Bearer ([a-zA-Z0-9_\-]*\.[a-zA-Z0-9_\-]*\.[a-zA-Z0-9_\-]*)/;
				if(responseHeaders.match(regex)) {
					jwt = responseHeaders.match(regex)[1];
					
				}else{
					
				}
				// invoke the success callback function
				goodcall(data);
			},
			error: function(error, errorThrown) {
				
				// invoke the failure callback function
				badcall(error);
			}
		});
	}

});
