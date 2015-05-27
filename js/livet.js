
$(document).bind("mobileinit", function() {
		        $.support.cors = true;
		        $.mobile.allowCrossDomainPages = true;
});

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	alert('Device ready...');
	$( "#tour" ).popup();
	$( "#tour" ).popup( "open" );	
}

