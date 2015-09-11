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
var setupStep = 1;
var snd = new Audio("sounds/click.wav"); // buffers automatically when created
var clickCount = 0;
var toggle = 1;
var currentRotation = 0;
var swipecount = 0;
var profile = {};
var goals = {};
var user = {};
//var options = {
//    date: new Date(),
//    mode: 'date'
//};

localStorage.removeItem('profile');




String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};



//Catch "deviceready" event which is fired when PhoneGap is ready
document.addEventListener("deviceReady", deviceReady, false);


function onDateSuccess(date) {
    alert('Selected date: ' + date);
}

function onDateError(error) { // Android only
    alert('Error: ' + error);
}


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
	
	$(document).on('pagecreate', '#setup', function(){
		
		$(document).on('slidestop', '.yDOB', function(){ 
        	alert('Year Changed....');
    	});
    	
    	$(document).on('change', '.mDOB', function(){ 
        	alert('Month Changed....');	
    	});
    	
    	$(document).on('change', '.dDOB', function(){ 
        	setDOBByDay($(this));	
    	});
    	
    	$(document).on('slidestop', '#profile_height', function(){ 
        	//alert($( '#profile_height' ).val());
			$('#profile_height_inches').html( cm2inches( $(this).val() ) );	
    	});
    	
    	$(document).on('slidestop', '#profile_weight', function(){ 
        	//alert($( '#profile_weight' ).val());
			$('#profile_weight_pounds').html( kgs2lbs( $(this).val() ) );	
    	});
    	
    	
    	
    	//$( '#profile_height' ).slider({
    	//	create: function (event, ui) {
        //		$(this).bind( 'change', function () {
        //			alert($( '#profile_height' ).val());
		//			$('#profile_height_inches').html( cm2inches( $( '#profile_height' ).val() ) );
        //		});
    	//	}
		//});
	
		//$( '#profile_weight' ).slider({
    	//	create: function (event, ui) {
        //		$(this).bind( 'change', function () {
        //			alert($( '#profile_weight' ).val());
		//			$('#profile_weight_pounds').html( kgs2lbs( $( '#profile_weight' ).val() ) );
        //		});
    	//	}
		//});	
    	
    	//setDOBByDay($(this));
    	//setDaysByYear($(this));
		//alert('page create event');
			
	});
	
	setTimeout(
  		function() 
  		{
    		
    		$('#edit_profile_main').load("edit_profile.html", function() { $(this).enhanceWithin(); } );
    		
    		$('#edit_goals_main').load("edit_goals.html", function() { $(this).enhanceWithin(); } );
    		
    		
    		
    		//alert('MeeTime init');
    		
    		//pictureSource=navigator.camera.PictureSourceType;
    		//destinationType=navigator.camera.DestinationType;  	
    		
    		if (localStorage.getItem('profile') === null) {
				//alert('Profile does not exist...');
				//Initialize and open tour
				 //alert('Aha');
				
				$(':mobile-pagecontainer').pagecontainer('change', '#tour');
				
    			//$.get( 'tour.csv', function( data ) {
				//	var lines = data.split('\n');
    			//	$('#tour_text').html( lines[tourstep] );
    			//});
    			//$( "#tour" ).popup();
				//$( "#tour" ).popup("open");
				
			} else {
				
				//alert('Profile exists...');				
				//profile = JSON.parse(localStorage.getItem('profile'));
				//$(':mobile-pagecontainer').pagecontainer('change', '#home');
				
			}
			
			//$("#tour").on("popupafterclose",function(){
				//alert("Tour closed");
			//});
    		
    		//$("#setup").on("popupafterclose",function(){
				//alert("Setup closed");
			//});
    		
    		initialOptions('moodRotator');
    		//alert($('#moodRotator').length);
    		//initialOptions('activityRotator');
    		//initialOptions('BushkaBingeh');
    		
    		
    		//$("#adding").popup();
    		//$( "#adding" ).popup("open");
    		
			
			//initiate calendar widget
		  	//$("#calendar").jqmCalendar({
		    //    events: readingsArray,
		    //    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		    //    days: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
		    //    startOfWeek: 0        
		    //});
    
		    //$('#calendar').trigger('refresh');			
			
  		}, 500);
  	
  	setProfile();	
  		
  	//Change content of tour popup to content for next step	
  	$('#next_tourstep').click(function() {
		nextTourStep(); 		
  	});
  	
  	//Change content of tour popup to content for previous step
  	$('#previous_tourstep').click(function() {
		previousTourStep();	  		
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
	
	$("label[for='profile_activity']").qtip({
    	content: {
        	text: 'How much excercise do you get ?'
    	},
    	position: {
        	my: 'bottom center',  // Position my top left...
        	at: 'top center', // at the bottom right of...
        	target: $("label[for='profile_activity']") // my target
    	},
    	style: {
        	classes: 'qtip-green qtip-shadow qtip-meetime'
    	}
	});
	
	//Change content of tour popup to content for next step	
  	$('#next_setupstep').click(function() {
		nextSetupStep(); 		
  	});
	
	setProfilePic();
  	
  	reading = { 'summary' : '<center><b>Today<b></center>', 'begin' : new Date(y, m, d), 'end' : new Date(y, m, d) };
	readingsArray.push(reading);
	reading = { 'summary' : '<center><b>Yesterday<b></center>', 'begin' : new Date(y, m, d - 1), 'end' : new Date(y, m, d - 1) };
	readingsArray.push(reading);
	reading = { 'summary' : '<center><b>Tomorrow<b></center>', 'begin' : new Date(y, m, d + 1), 'end' : new Date(y, m, d + 1) };
	readingsArray.push(reading);
	
	$(".swipe").on("swiperight", function(){
		//alert('so true');
		swipecount++;
  		rotate($(this));
	});
	
	$(".swipe").on("swipeleft", function(){
		//alert('so true');
		swipecount--;
  		rotate($(this));
	});
	
	$("#adding").on("popupafterclose",function(){
		//alert("Dialog closed");
	});
	
	//$(".swipecenter").on("click", function(){
	//	alert('so true');
  	//	rotate();
	//});
	
	
	
				
}

function rotate(swipe) {
	
	circle = swipe.children('.circle-container').first();
	
	//if(swipecount > 1) {
		
	//	var optionAngle = 0;
   	//	var optionStart = (swipecount * 4) + 1;
   	//	var lines = data.split('\n');
   		
     	
   	//	$.get( circle.data('options'), function( data ) {
				
	//			for (i = optionsStart; i < (optionsStart + 3); i++) {
	//				line = lines[i].split(',');
    //				optionAngle = 23 + (i * 45);
    //				rotator.children('.deg' + optionAngle).first().children('img').first().attr('src', line[1]);
	//			}
				
   	//	});
	//}
	
	
	var matrix = circle.css("-webkit-transform") ||
    circle.css("-moz-transform")    ||
    circle.css("-ms-transform")     ||
    circle.css("-o-transform")      ||
    circle.css("transform");
    
    if(matrix !== 'none') {
    	//alert('Current angle sucessfully detected' + matrix);
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { 
    	var angle = 0;
    }
    
    //alert('The angle is ' + angle);
    
    //alert('Angle was ' + angle );
    
    angle = 180 * swipecount;
    
    //alert('Angle is ' + angle); 
	
	circle.css('-webkit-transform', 'rotate(' + angle.toString() + 'deg)');

	//clicky();
						    									  
}



function clicky()
{
	if (clickCount < 3) {
		snd.play(); 
		setTimeout(clicky, 1000);
		clickCount++;
	}
}

function setProfilePic() {
	  // Get image handle
      //
      //var smallImage = document.getElementById('smallImage');
      //var profileImage = document.getElementById('profileImage');
      //var imageURI = '';
      
      if (localStorage.getItem('profilePhoto') == null) {
      		imageURI = '';
      } else {
      		imageURI = localStorage.getItem('profilePhoto');
      }
      
      // Unhide image elements
      //
      //smallImage.style.display = 'block';
      //profileImage.style.display = 'block';

      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      //smallImage.src = imageURI;
      //profileImage.src = imageURI;
      
      $('.smallProfileImage').show();
      $('.smallProfileImage').css('background-image', 'url(' + imageURI + ')');
      $('.profileImage').css('background-image', 'url(' + imageURI + ')');            
	
}


//open setup modal
function openSetup() {
	
	
	$( "#tour" ).popup( "close" );
	$( "#setup" ).popup();
	$('#setup_main').load("edit_profile.html", function() { $(this).enhanceWithin(); } );
	$( "#setup" ).popup( "open" );
	
	
	
	//$("#edit_profileform").on("slidestop", "#profile_yDOB", function(e){
    //	alert("It duz wuk!");    
	//});
	
	
	//$('.yDOB').on( 'slidestop', function() { alert('sigh'); } );
	//$('.mDOB').change( alert('sigh')  );
	
	//$('.dDOB').change( function(event) {  setDOBByDay($(this));    }  );
	//$('.yDOB').change( function(event) {  setDaysByYear($(this));  }  );
	//$('.mDOB').change( function(event) {  setDaysByMonth($(this)); }  );
	//$('#profile_yDOB').bind('change', function(event) { alert('it duz wuk!'); }  );
	//$('#profile_mDOB').change( function(event) { alert('alert!'); }  );
	//alert('events set');	
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

	switch (setupStep) {
		case 1:
      		//alert('case 1');
			if ($("#profile_form").valid()) {
			  //$("#profile_form").validate();
		      //if($("#profile_form").validate()) {	
		      gotoGoals();
		      setupStep++;	
		    }			
		break;
		case 2:
        	//alert('case 2');
        	saveGoals();
			gotoProfile();
			setupStep++;
		break;
	}

  //setupStep++;
		
}


function previousSetupStep() {

	switch (setupStep) {
		case 2:
			//alert('Case 2');        	
			gotoSetupProfile();
			setupStep--;
		break;
	}

  //setupStep++;
		
}




function gotoGoals() {
	
	//$('#setup_header').html('<h1>Health Goals</h1>');
	
	//$('#setup_main').load("goals.html", function(){
		
	  //$('#previous_setupstep').show();
		
	  initialOptions('activityRotator');
	  $(".swipe").on("swiperight", function(){
		//alert('so true');
		swipecount++;
  		rotate($(this));
	  });
	  $(".swipe").on("swipeleft", function(){
		//alert('so true');
		swipecount--;
  		rotate($(this));
	  });
	  
	  $.mobile.changePage($("#edit_goals"), "none");
	  	
      //$('#goals_overweight').html($('#overweight').html());
      //$('#goals_water').html($('#water').html());
      //$(this).enhanceWithin();
      //window.scrollTo(0, 0);      
	//});
	
	//saveProfile();
	
	
	
	//setProfile();
	//BMI($('#profile_weight').val(), $('#profile_height').val());
	//water($('#profile_weight').val(), $('#profile_activity').val());
	
	
	//if ($("#goals_overweight").length != 0) {
  	//	alert('this record already exists');
	//}

	//alert($('#profile_activity').val());
	//$('#setup').popup('close');
	//$.mobile.changePage('#mee', 'none');	
}

function gotoProfile() {
	$( "#profile").popup();
	
	$( "#setup" ).popup( "close" );
	$( "#profile").popup("open");
	 	 
}

function gotoSetupProfile() {
	//alert('Setting up profile');
	$('#setup_main').load("edit_profile.html", function() {
		$('#setup_header').html('Setup Profile');
		$('#setup').enhanceWithin();
	});
}

function closeProfile() {
	$( "#profile").popup( "close" );
	//saveProfile();
	window.scrollTo(0, 0);
}





// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64-encoded image data
      // console.log(imageData);

      // Get image handle
      //
      //var smallImage = document.getElementById('smallImage');
      //var profileImage = document.getElementById('profileImage');
      
      // Unhide image elements
      //
      //smallImage.style.display = 'block';
      //profileImage.style.display = 'block';
      
      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      //smallImage.src = "data:image/jpeg;base64," + imageData;
      //profileImage.src = "data:image/jpeg;base64," + imageData;
      
      $('.smallProfileImage').show();
      
      $('.smallProfileImage').css('background-image', 'url(data:image/jpeg;base64,' + imageData + ')');
      $('.profileImage').css('background-image', 'url(data:image/jpeg;base64,' + imageData + ')');
	  localStorage.setItem('profilePhoto', "data:image/jpeg;base64," + imageData);
	  
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
      // Uncomment to view the base64-encoded image data
      // console.log(imageData);

      // Get image handle
      //
      //var smallImage = document.getElementById('smallImage');
      //var profileImage = document.getElementById('profileImage');
      
      // Unhide image elements
      //
      //smallImage.style.display = 'block';
      //profileImage.style.display = 'block';

      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      //smallImage.src = imageURI;
      //profileImage.src = imageURI;
      $('.smallProfileImage').show();
      $('.smallProfileImage').css('background-image', 'url(' + imageURI + ')');
      $('.profileImage').css('background-image', 'url(' + imageURI + ')');
      localStorage.setItem('profilePhoto', imageURI);
	  
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
	
   //alert('Capturing Photos');
   // Take picture using device camera and retrieve image as base64-encoded string
   navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType: destinationType.DATA_URL });
}
function getPhoto() {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
    destinationType: destinationType.FILE_URI,
    sourceType: pictureSource.PHOTOLIBRARY});
}

function cm2inches(cm) {
	
	//alert('');
	
	var inches = 0;
	var feetHeight = 0;
	var inchesHeight = 0;
	var height = '';
	
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

function addMood() {
	
	$( "#adding").popup();
	$( "#adding").popup("open");
	
}

function initialOptions(id) {
	

	
  //alert('Count  for ' + id + ' is ' + $('#' + id).length);
   	
   var rotator = $('#' + id);
   var optionAngle = 0;
   
   //rotator.load( rotator.data('options'), function(data, status, xhr){
   
   //alert( rotator.data('options') );	
   	
   $.get( rotator.data('options'), function( data ) {
   	
   				//alert('populating rotator ' + id);
   		
   				var lines = data.split('\n');
				for (i = 0; i < 8; i++) {
					line = lines[i].split(',');
    				optionAngle = 23 + (i * 45);
    				//alert(rotator.children('.deg' + optionAngle).length);
    				rotator.children('.deg' + optionAngle).first().children('img').first().attr('src', line[1]);
				}
   });
}

function setDOBByDay(day) {
	//alert('There are ' + day.parent().parent().find('.DOB').length + ' DOBs');
	DOB = day.parent().parent().find('.DOB').first(); 
	DOM = day.parent().parent().find('.dDOB').first();
	Month = day.parent().parent().find('.mDOB').last();
	Year = day.parent().parent().find('.yDOB').first();
	DOB.val(Year.val() + '-' + Month.val() + '-' + DOM.val());
	//alert(DOB.val());	
}

function setDaysByMonth(month) {
	alert('adjusting days in month');	
	year.closest('.DOB').val(month.closest('.yDOB').val() + '/' + month.val() + '/' + month.closest('.dDOB').val());
	year.closest('.dDOB').attr({ "max" : daysInMonth(month.val(), month.closest('.').first().val()) });
	//alert(year.closest('.dDOB').attr('min'));
}

function setDaysByYear(year) {
	alert('adjusting days in month for year');
	year.closest('.DOB').val(year.val() + '/' + year.closest('.mDOB').val() + '/' + year.closest('.dDOB').val());
	year.closest('.dDOB').attr({ "max" : daysInMonth(year.closest('.mDOB').first().val(), year.val()) });
}



function daysInMonth(month,year) {
	var dd = new Date(year, month, 0);
	return dd.getDate();
}

