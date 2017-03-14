// Dev
// var insurerCoreApiUrl = "http://52.210.162.190:9096/insurercore/v1/";

//UAT
//var insurerCoreApiUrl = "http://52.213.31.9:9096/insurercore/v1/";

//Local
//var insurerCoreApiUrl = "http://192.168.0.62:9096/insurercore/v1/";

// Live
var insurerCoreApiUrl = "https://api.insurercore.co.uk/insurercore/v1/";

// Set manual device toke and type
function trackProfileUser(resData, trkTitle) {
	KeenAsync.ready(function(){
		//Configure a client instance
		var client = new KeenAsync({
			projectId: '5824584e8db53dfda8a77d6e',
			writeKey: '393EB31AFDC7CC30BC1890DC79655ACCBC529FAB2D5F6F140BC1E722A9BAE4AEE8AC2A3454331D92E35E3CC2C7FFAB646071B5F55B1B940DB15B30E19A4A66A1BE1F8AD2F8B1E367A5E531E358EF4CF687418D226004107BD69C69D64288D85B'
		});

	   	//Record an event
		client.addEvent('Profile', {
		    Title: trkTitle,
		    memberId : resData.memberId,
		    orgId : resData.organisationId
		});
	});
}
function trackProfileCompany(resData, trkTitle) {
	KeenAsync.ready(function(){
		//Configure a client instance
		var client = new KeenAsync({
			projectId: '5824584e8db53dfda8a77d6e',
			writeKey: '393EB31AFDC7CC30BC1890DC79655ACCBC529FAB2D5F6F140BC1E722A9BAE4AEE8AC2A3454331D92E35E3CC2C7FFAB646071B5F55B1B940DB15B30E19A4A66A1BE1F8AD2F8B1E367A5E531E358EF4CF687418D226004107BD69C69D64288D85B'
		});

	   	//Record an event
		client.addEvent('Profile', {
		    Title: trkTitle,
		    memberId : resData.memberId,
		    orgId : resData.organisationId
		});
	});
}

// Generate bearer token if it is gets expired
var retryTimeDurationNumber = 7000;
var bgLogin = function(jqXhr) {
	if (jqXhr.status== 401 ) {
		$('#global-loader').show();
		$('#amend-loader').hide();
        $('#detail-loader').hide();
		var deviceToken = localStorage.getItem('deviceToken'),
			deviceType = localStorage.getItem('deviceType');
		$.ajax({
			type:"POST",
			url:insurerCoreApiUrl+"member/login",
			dataType: "json",
			async:false,
			headers:{
				"content-type": "application/json", 
				'Authorization':localStorage.getItem('basicAuth')
			},
			data:JSON.stringify({"deviceType":deviceType,"deviceToken":deviceToken}),
			success: function (data, status, xhr){
				localStorage.setItem('token', "Bearer "+data.bearerToken);
				setTimeout(function(){
					$('#global-loader').hide();
				}, 6000);
			}.bind(this)
		});
	}
}


function clearStorageItems() {
	localStorage.removeItem("basicAuth");
	localStorage.removeItem("token");
	localStorage.removeItem("userRole");
	localStorage.removeItem("user_id");
	localStorage.removeItem("organisationId");
	localStorage.removeItem("orgType");
	localStorage.removeItem("KYWRD_SRC_INP");
	localStorage.removeItem("userName");
	localStorage.removeItem("user_mailid");
	localStorage.removeItem("companyPostObj");
	localStorage.removeItem("savedSearch");	
}
