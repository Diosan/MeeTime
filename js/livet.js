
$(document).bind("mobileinit", function() {
		        $.support.cors = true;
		        $.mobile.allowCrossDomainPages = true;
});

$(function() {

	document.addEventListener("deviceready", onDeviceReady, false);

});

function onDeviceReady() {
	alert('Device ready...');
	$( "#tour" ).popup();
	$( "#tour" ).popup( "open" );	
}

