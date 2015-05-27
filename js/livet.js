
document.addEventListener("deviceReady", deviceReady, false);

function deviceReady() {
	
	alert('alert fires');
	$( "#popupBasic" ).popup();
	$( "#popupBasic" ).popup( "open" );

}