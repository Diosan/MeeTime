//THIS CODE SHOULD BE PART OF A FILE WHICH IS LOADED BEFORE jQueryMobile

/**
* Create couple of jQuery Deferred Objects to catch the 
* firing of the two events associated with the loading of
* the two frameworks.
*/
var gapReady = $.Deferred();
var jqmReady = $.Deferred();
var tourstep = 0;
var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();
var reading = [];
var readingsArray = [];
var pictureSource;   // picture source
var destinationType; // sets the format of returned value

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
    		
    		//pictureSource=navigator.camera.PictureSourceType;
    		//destinationType=navigator.camera.DestinationType;  	
    		
    		//Initialize and open tour
    		$.get( 'tour.csv', function( data ) {
				var lines = data.split('\n');
    			$('#tour_text').html( lines[tourstep] );
    		});
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
  	$('#next_tourstep').click(function() {
		nextTourStep(); 		
  	});
  	
  	//Change content of tour popup to content for previous step
  	$('#previous_tourstep').click(function() {
		previousTourStep();	  		
  	});
  	
  	//Change content of tour popup to content for next step	
  	$('#next_setupstep').click(function() {
		nextSetupStep(); 		
  	});
  	
  	//open setup modal when 'Skip Tour' or "Get Started' is clicked
  	$('#skip_tour').click(function() {
  		openSetup();  		
  	});
  	$('#get_started').click(function() {  		
  		openSetup();
  	});
  	
  	$( '#profile_height' ).slider({
    	create: function (event, ui) {
        	$(this).bind( 'change', function () {
        		//alert($( '#profile_height' ).val());
				$('#profile_height_inches').html( cm2inches( $( '#profile_height' ).val() ) );
        	});
    	}
	});
	
	$( '#profile_weight' ).slider({
    	create: function (event, ui) {
        	$(this).bind( 'change', function () {
        		//alert($( '#profile_height' ).val());
				$('#profile_weight_pounds').html( kgs2lbs( $( '#profile_weight' ).val() ) );
        	});
    	}
	});
  	
  	reading = { 'summary' : '<center><b>Today<b></center>', 'begin' : new Date(y, m, d), 'end' : new Date(y, m, d) };
	readingsArray.push(reading);
	reading = { 'summary' : '<center><b>Yesterday<b></center>', 'begin' : new Date(y, m, d - 1), 'end' : new Date(y, m, d - 1) };
	readingsArray.push(reading);
	reading = { 'summary' : '<center><b>Tomorrow<b></center>', 'begin' : new Date(y, m, d + 1), 'end' : new Date(y, m, d + 1) };
	readingsArray.push(reading);
				
}


//open setup modal
function openSetup() {
	$( "#tour" ).popup( "close" );
	$( "#setup" ).popup();
	$( "#setup" ).popup( "open" );
}

//Change content of tour popup to content for next step and adjust buttons as necessary
function nextTourStep() {
	$.get( 'tour.csv', function( data ) {
			var lines = data.split('\n');
			$('#previous_tourstep').show();
  			$('#tour_text').html( lines[tourstep + 1] );
  			if (tourstep == (lines.length -2)) {
  				$('#skip_tour').hide();
  				$('#next_tourstep').hide();
  				$('#get_started').show();  					
  			} else {
  				$('#skip_tour').show();
  				$('#next_tourstep').show();
  				$('#get_started').hide();
  				tourstep++;
  			}
  					
		}, "text"); 
}

//Change content of tour popup to content for previous step and adjust buttons as necessary
function previousTourStep() {

	$.get( 'tour.csv', function( data ) {
			var lines = data.split('\n');
			$('#next_tourstep').show();
			if (tourstep == 1) {
  				$('#previous_tourstep').hide();
  			}
  			if (tourstep != 0) {
  				$('#tour_text').html( lines[tourstep - 1] );
  				tourstep--;
  			}  					
		}, "text");
		
}

function nextSetupStep() {
	var weight = parseFloat($('#profile_weight').val());
	var height = parseFloat($('#profile_height').val()) / 100;
	var bmi = ( weight / ( height * height ) );
	$('#bmi').html(Math.round(parseFloat(bmi)));
	//alert($('#profile_height').val());
	$('#setup').popup('close');
	$.mobile.changePage('#mee', 'none');	
}

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64-encoded image data
      // console.log(imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');
      var profileImage = document.getElementById('profileImage');
      
      // Unhide image elements
      //
      smallImage.style.display = 'block';
      profileImage.style.display = 'block';
      
      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
      profileImage.src = "data:image/jpeg;base64," + imageData;

}


// Called if something bad happens.
//
function onFail(message) {
   alert('Failed because: ' + message);
}


// device APIs are available
//
// A button will call this function
function capturePhoto() {
	
   alert('Capturing Photos');
   // Take picture using device camera and retrieve image as base64-encoded string
   navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType: destinationType.DATA_URL });
}

function cm2inches(cm) {
	
	var inches = 0;
	var feetHeight = 0;
	var inchesHeight = 0;
	var height = '';
	
	//alert(cm);
	
	inches = parseFloat('0.393700787') * parseFloat(cm);
	feetHeight = Math.floor(Math.round( inches )/12);
	inchesHeight = Math.round( inches ) % 12;
	height = feetHeight.toString() + ' feet ';
	
	if(inchesHeight != 0) {
		height += inchesHeight + ' inches';
	}	
	
	return height;
	
}

function kgs2lbs(kg) {
	
	var pounds = Math.round(parseFloat('2.20462') * parseFloat(kg));
	pounds += ' pounds';
	return pounds;
	
}

