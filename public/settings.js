$(document).ready(function () {
	var body = document.getElementsByName('settings');
	var save = document.getElementById('save');
	var sources;
	function getSource() {
		return $.ajax({
			url:'https://newsapi.org/v1/sources',
			success: function(data) {
				// console.log(data);
				sources = $(data).attr('sources');
			}
		});
	}

	function displaySource() {
		var sourceLink;
		var sourceArticleDivList = [];
		var sourceId = [];
		return $.each(sources, function(index, data){
			// console.log(data);
			var sourceOrigin = $(data).attr('id');
			var sourceHeader = $('<div>');
			var sourceLogo = $('<img>').addClass('logo').attr('src', $($(data).attr('urlsToLogos')).attr('large'));
			var sourceDiv = $('<div>').attr('id',$(data).attr('name'));
			
			sourceDiv.append(sourceHeader);
			sourceDiv.addClass('category');
			
			sourceHeader.append(sourceLogo);
			sourceHeader.append($(data).attr('id'));
			sourceHeader.addClass('sortHeader');
			
			if ($.inArray(sourceOrigin, userSource) != -1){
				sourceHeader.addClass('selected');
			} 
			
			$(body).append(sourceDiv);

			$(sourceHeader).click(function () {
				$(this).toggleClass('selected');
			});
		});	
	}

	$(save).click(function(){
		var selected = $('.selected');
		var userSelected = [];
		$.each(selected, function(index, data){
			userSelected.push($(data).text());
		});
		var data = {userSelected};
		$.get('/save', data).then(function () {
			window.location.href = '/';
		});
	});

	getSource().then(displaySource);
});