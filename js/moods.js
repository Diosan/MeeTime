//
//alert('Mood javascript detected');
initialOptions('moodRotator');



$('#moodRotator a').click(function() {
	var image = $(this).data('image');
	image = image.substr(0, image.lastIndexOf('-') - 0);
	image = image + '-128x128.png';
	$('#swipe_center').css('background-image', 'url(' + image + ')');
});
