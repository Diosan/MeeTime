//THIS CODE SHOULD BE PART OF A FILE WHICH IS LOADED BEFORE jQueryMobile

/**
* Create couple of jQuery Deferred Objects to catch the 
* firing of the two events associated with the loading of
* the two frameworks.
*/
var gapReady = $.Deferred();
var jqmReady = $.Deferred();
var tourstep = 1;

//Catch "deviceready" event which is fired when PhoneGap is ready
document.addEventListener("deviceReady", deviceReady, false);

//Resolve gapReady in reponse to deviceReady event
function deviceReady()
{
	gapReady.resolve();
}

/**
* Catch "mobileinit" event which is fired when a jQueryMobile is loaded.
* Ensure that we respond to this event only once.
*/
$(document).one("mobileinit", function(){
	jqmReady.resolve();
});

/**
* Run your App Logic only when both frameworks have loaded
*/
$.when(gapReady, jqmReady).then(meeTime);
//$.when(jqmReady).then(meeTime);

// App Logic
function meeTime()
{
	setTimeout(
  		function() 
  		{
    		$( "#tour" ).popup();
			$( "#tour" ).popup( "open" );
  		}, 1000);
  		
  	$('#next_tourstep').click(function(){
		$.get( 'tour.csv', function( data ) {
			var lines = data.split('\n');
			$('#previous_tourstep').show();
  			$('#tour_text').html( lines[tourstep + 1] );
  			tourstep++;		
		}, "text");  		
  	});
  	
  	$('#previous_tourstep').click(function(){
		$.get( 'tour.csv', function( data ) {
			var lines = data.split('\n');
			$('#previous_tourstep').show();
  			$('#tour_text').html( lines[tourstep - 1] );
  			tourstep--;		
		}, "text");  		
  	});
	
	
}