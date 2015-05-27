
$(document).bind("mobileinit", function() {
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        alert('alert fires');
        $( "#popupBasic" ).popup();
		$( "#popupBasic" ).popup( "open" );
});