//
//alert('Mood javascript detected');
initialOptions('moodRotator');



$('#moodRotator a').click(function() {
	var image = $(this).data('image');
	image = image.substr(0, image.lastIndexOf('-') - 0);
	image = image + '-128x128.png';
	$('#swipe_center').css('background-image', 'url(' + image + ')');
});

$("#calendar_moods").jqmCalendar({
   events : [ { "summary" : "Test event", "begin" : new Date(), "end" : new Date() } ],
   months : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
   days : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
   startOfWeek : 0
});

	  // Load the Visualization API and the piechart package.
      google.load('visualization', '1.0', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Happy', 3],
          ['Sad', 1],
          ['Angry', 1],
          ['Tired', 1],
          ['Sick', 2]
        ]);

        // Set chart options
        var options = {'title':'Moods',
                       'width':600,
                       'height':450};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
