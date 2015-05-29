//THIS CODE SHOULD BE PART OF A FILE WHICH IS LOADED BEFORE jQueryMobile

/**
* Create couple of jQuery Deferred Objects to catch the 
* firing of the two events associated with the loading of
* the two frameworks.
*/
var gapReady = $.Deferred();
var jqmReady = $.Deferred();
var tourstep = 1;
var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();
var reading = [];
var readingsArray = [];

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
//$.when(gapReady, jqmReady).then(meeTime);
$.when(jqmReady).then(meeTime);

// App Logic
function meeTime()
{
	
	
	
	setTimeout(
  		function() 
  		{
    		//Initialize and open tour
    		$( "#tour" ).popup();
			$( "#tour" ).popup( "open" );
			
			//initiate calendar widget
		  	//$("#calendar").jqmCalendar({
		    //    events: readingsArray,
		    //    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		    //    days: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
		    //    startOfWeek: 0        
		    //});
    
		    //$('#calendar').trigger('refresh');			
			
  		}, 1000);
  		
  	//Change content of tour popup to content for next step	
  	$('#next_tourstep').click(function(){
		$.get( 'tour.csv', function( data ) {
			var lines = data.split('\n');
			$('#previous_tourstep').show();
  			$('#tour_text').html( lines[tourstep + 1] );
  			tourstep++;		
		}, "text");  		
  	});
  	
  	//Change content of tour popup to content for previous step
  	$('#previous_tourstep').click(function(){
		$.get( 'tour.csv', function( data ) {
			var lines = data.split('\n');
			$('#previous_tourstep').show();
  			$('#tour_text').html( lines[tourstep - 1] );
  			tourstep--;		
		}, "text");  		
  	});
  	
  	reading = { 'summary' : '<center><b>Today<b></center>', 'begin' : new Date(y, m, d), 'end' : new Date(y, m, d) };
	readingsArray.push(reading);
	reading = { 'summary' : '<center><b>Yesterday<b></center>', 'begin' : new Date(y, m, d - 1), 'end' : new Date(y, m, d - 1) };
	readingsArray.push(reading);
	reading = { 'summary' : '<center><b>Tomorrow<b></center>', 'begin' : new Date(y, m, d + 1), 'end' : new Date(y, m, d + 1) };
	readingsArray.push(reading);
			
			
  	
	
	
}