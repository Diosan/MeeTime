function saveGoals() {
	


}

function signUp() {
	
	var errors = '';
	var result = {};
        
	$.post( "http://www.livetgourmet.com:3000/users.json", $('#signup_form').serialize())
			.done(function(data) {
    			//alert( "Success" );
    			user = data;
    			
    			$.mobile.changePage($("#edit_profile"), "slide");
    			
    			//alert(JSON.stringify(data));
    			//$.ajax({
    			//	url: 'http://www.livetgourmet.com:3000/users/sign_out.json',
    			//	type: 'DELETE',
    			//	complete: function(result) {
        				// Do something with the result
        		//		alert(JSON.stringify(result));
    			//	}
				//});
  			})
  			.fail(function(xhr, textStatus, errorThrown) {
  				//alert('Error');
  				//$.mobile.changePage($("#signup"), "slide");
  				//$( "#myPopupDialog" ).popup( "open" );
  				
  				result = JSON.parse(xhr.responseText);			
  				
  				$.each(result.errors, function(k, v) {
  					
	        			//display the key and value pair
            			errors = errors + '<strong>' + k + ':</strong> ' + v + ' <br><br> ';
            
        			});
  				  
  				$('#signup_error').html(errors);
  				$('#myPopupDialog').popup();
                $('#myPopupDialog').popup("open");
                //$.mobile.changePage($("#signup"), "slide");
    			//alert( xhr.responseText );    			
  			});
}

function saveProfile() {
	
	var result = '';
	var errors = '';
	
	if ($("#profile_form").valid()) {
		
		//profile.name = $('#profile_name').val();
		//localStorage.setItem("name", $('#profile_name').val());
		//localStorage.setItem("age", $('.profileAge').val() + " years");
		//localStorage.setItem("gender", $('.profileGender').val());
		//localStorage.setItem("breakfast", $('.profileBreakfast').val());
		//localStorage.setItem("lunch", $('.profileLunch').val());
		//localStorage.setItem("dinner", $('.profileDinner').val());
		//localStorage.setItem("meetime", $('.profileMeetime').val());
		//localStorage.setItem("meeactivity", $('.profileMeeactivity').val());
		//alert('User set MeeActivity to ' + $('#profile_meeactivity').val());
		//alert( 'BMI is ' + BMI($('#profile_weight').val(), $('#profile_height').val()).toString() );
		//profile.gender = $('#profile_gender').val();
		//alert('Profile_DOB value is ' + $('#profile_DOB').val())
		//profile.DOB = $('#profile_DOB').val();
		//profile.weight = $('#profile_weight').val();
		//profile.height = $('#profile_height').val(); 
		//profile.BMI = BMI($('#profile_weight').val(), $('#profile_height').val()).toString();
		//profile.water = water($('#profile_weight').val(), $('#profile_activity').val());
		//profile.overweight = overweight(profile.BMI, profile.height);
		//water($('#profile_weight').val(), $('#profile_activity').val());
		//localStorage.setItem("profile", JSON.stringify(profile));
	
		//if (localStorage.getItem('profile') === null) {
		//	alert('Profile not saved....');	
		//} else {
		//	alert('Profile Saved');
		//}
		
		$.ajax({
    		type: 'PATCH',
    		url: 'http://www.livetgourmet.com:3000/users',
    		data: $('#profile_form').serialize(),
    		success: function(data, textStatus, jqXHR) {
    			setProfile();
    			$.mobile.changePage($("#profile"), "none");
    		},
    		error: function(jqXHR, textStatus, errorThrown) {
    			result = JSON.parse(xhr.responseText);
    			
    			$.each(result.errors, function(k, v) {
  					
	        			//display the key and value pair
            			errors = errors + '<strong>' + k + ':</strong> ' + v + ' <br><br> ';
            
        			});
        			
        		$('#profile_error_text').html(errors);
  				$('#profile_errors').popup();
                $('#profile_errors').popup("open");
    		}
		});
	
		
		//calendar_events();
		
		
	
	} else {
		
		//alert('it is not valid');
	
	}
	
}

function BMI(profile_weight, profile_height) {
	
	//alert('Setting BMI');
		
	var weight = parseFloat(profile_weight);
	var height = parseFloat(profile_height) / 100;
	var bmi = ( weight / ( height * height ) );
	//var bmiDifference = bmi - 25;
	//var overweight = Math.round(bmiDifference * (height * height));
	//alert(bmi * height * height);
	
	//alert('BMI is ' + bmi.toString());
	return Math.round(parseFloat(bmi));
	//$('.bmi').html('BMI: ' + Math.round(parseFloat(bmi)));
	//$('.overweight').html('Overweight By: ' + overweight + ' Kg / ' + Math.round(overweight * 2.20462) + ' Pounds');
	
}

function water(profile_weight, profile_activity) {
  //alert('Setting Water');
  var water = Math.round(((parseFloat(profile_weight) * 2.20462) * (2/3)) + parseFloat(profile_activity))/100;
  //alert(profile_activity);
  //water = Math.round(((profile_weight * 2.20462) * (2/3)) + profile_activity);
  return water;	
}

function overweight(BMI, height) {
	var bmiDifference = BMI - 25;
	return overweight = Math.round((bmiDifference * (height * height)) / 10000);
}

function setProfile() {

	//alert('Setting profile');
	
	setProfilefield('name');
	setProfilefield('DOB');
	setProfilefield('gender');
	//setProfilefield('breakfast');
	//setProfilefield('lunch');
	//setProfilefield('dinner');
	//setProfilefield('meetime');
	//setProfilefield('meeactivity');
	//alert(localStorage.getItem('meeactivity'));
	setProfilefield('weight');
	setProfilefield('height');
	//setProfilefield('sugar');
	//setProfilefield('sugar_fasting');
	setProfilefield('BMI');
	setProfilefield('overweight');
	setProfilefield('water');
	//BMI($('#profile_weight').val(), $('#profile_height').val());
	//water($('#profile_weight').val(), $('#profile_activity').val());
	
	
}

function setProfilefield(fieldName) {
	
	//localStorage.setItem();
	
	if (profile === null) {
		//if (localStorage.getItem(fieldName) === null) {
		//alert('field IS empty');
		
		$('.profile' + fieldName.capitalizeFirstLetter()).html('');
		//$('#profile_' + fieldName).val('');
	} else {
		//alert(fieldName + ' field is NOT empty');
		//alert('.profile' + fieldName.capitalizeFirstLetter() + ' is ' + profile[fieldName]);
		$('.profile' + fieldName.capitalizeFirstLetter()).html(profile[fieldName]);
		//$('#profile_' + fieldName).val(localStorage.getItem(fieldName));
		//if ($('#profile_' + fieldName).attr('type') == 'range') {
			//$('#profile_' + fieldName).val(localStorage.getItem(fieldName)).slider('disabled', true).slider('refresh');
			//$('#profile_' + fieldName).val(localStorage.getItem(fieldName)).slider("refresh");
		//}
	}
	
}

