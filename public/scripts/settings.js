$(document).ready(function () {
	var body = document.getElementsByName('settings');
	var save = document.getElementById('save');
	var sources;
	var mode = 'source';
	
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

	function displayCategory() {
		var category = ['business', 'entertainment', 'gaming', 'general', 'music', 'science-and-nature', 'sport', 'technology'];
		var categoryName = ['Business', 'Entertainment', 'Gaming', 'General', 'Music', 'Science and nature', 'Sports', 'Technology'];
		var categoryDiv = [$('<div>'), $('<div>'), $('<div>'), $('<div>'), $('<div>'), $('<div>'), $('<div>'), $('<div>')];
		
		for(var i = 0; i < category.length; i++) {
			var tempDiv = categoryDiv[i];
			
			tempDiv.attr('id', category[i]).addClass('category').append($('<header>').append(categoryName[i]).addClass('sortHeader'));
			if($.inArray(categoryName[i], userCategory) != -1) {
				tempDiv.addClass('selected');
			}
			$(tempDiv).click(function () {
				$(this).toggleClass('selected');
			});

			$(body).append(categoryDiv[i]);
		}
	}

	getSource().then(function() {
		displaySource();

		function save() {
			var selected = $('.selected');
			var userSelected = [];
			$.each(selected, function(index, data){
				userSelected.push($(data).text());
			});
			var data = {userSelected, mode};
			$.get('/save', data).then(function () {
					window.location.href = '/';
			});
		};

		$('#save').click(function(){
			save();
		});

		var settingsDiv = document.getElementsByName('settings');
		$('#source').click(function () {
			mode = 'source';
			$(settingsDiv).empty();
			displaySource();
		});

		$('#category').click(function () {
			mode = 'category';
			$(settingsDiv).empty();
			displayCategory();
		});
	});
});