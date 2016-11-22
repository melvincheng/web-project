$(document).ready(function () {
	var body = document.getElementsByTagName('body');
	var sort = 'category';
	var sources;
	var articleList = [];
	var language;
	var country;
	
	function getSource() {
		return $.ajax({
			url:'https://newsapi.org/v1/sources',
			success: function(data) {
				console.log(data);
				sources = $(data).attr('sources');
			}
		});
	}
	
	function getArticles() {
		var sourceLink;
		return $.each(sources, function(index, data){
			console.log(data);
			var sourceName = $('<div>');
			var sourceLogo = $('<img>').attr('src', $($(data).attr('urlsToLogos')).attr('large')).attr('height','48');
			sourceName.append(sourceLogo);
			sourceName.append($(data).attr('name'));
			sourceName.addClass('sortHeader');
			$(body).append(sourceName);
			var sourceOrigin = $(data).attr('id');
			sourceLink = 'https://newsapi.org/v1/articles?source=' + sourceOrigin + '&apiKey=98432bdc8b0d474797f981385df66c5f';
			$.ajax({
				url: sourceLink,
				success: function(data) {
					articleList.push(data);
				}
			});
		});
	}
	
	function mainCategory() {
		var category = ['business', 'entertainment', 'gaming', 'general', 'music', 'science-and-nature', 'sport', 'technology'];
		var categoryName = ['Business', 'Entertainment', 'Gaming', 'General', 'Music', 'Science and nature', 'Sports', 'Technology'];
		var categoryDiv = [$('<div>'), $('<div>'), $('<div>'), $('<div>'), $('<div>'), $('<div>'), $('<div>'), $('<div>')];
		var categoryArticles = [];
		
		for(var i = 0; i < category.length; i++) {
			var tempDiv = categoryDiv[i];
			var tempArticle = $('<div>');
			
			categoryArticles.push(tempArticle);
			
			tempArticle.attr('id', category[i]+'Articles').addClass('collapse');
			tempDiv.attr('id', category[i]).append($('<header>').append(categoryName[i]).addClass('sortHeader').attr('data-toggle','collapse').attr('data-target','#' + category[i] + 'Articles')).append(tempArticle);
			$(body).append(categoryDiv[i]);
		}
//		console.log(categoryArticles);
		for (var j = 0; j < sources.length; j++) {
			
			var sourceOrigin = $(sources[j]).attr('id');
			var sourceLink = 'https://newsapi.org/v1/articles?source=' + sourceOrigin + '&apiKey=98432bdc8b0d474797f981385df66c5f';
			var index = category.indexOf($(sources[j]).attr('category'));
		
			var tempCategoryArticle = categoryArticles[index];
				
			switch($(sources[j]).attr('category')){
				case 'business':
					$.get(sourceLink, function(data){
						addArticleCategory(data, categoryArticles[0]);
					});
					break;
				case 'entertainment':
					$.get(sourceLink, function(data) {
						
						addArticleCategory(data, categoryArticles[1]);
					});
					break;
				case 'gaming':
					$.get(sourceLink, function(data) {
						
						addArticleCategory(data, categoryArticles[2]);
					});
					break;
				case 'general':
					$.get(sourceLink, function(data) {
						
						addArticleCategory(data, categoryArticles[3]);
					});
					break;
				case 'music':
					$.get(sourceLink, function(data) {
						
						addArticleCategory(data, categoryArticles[4]);
					});
					break;
				case 'science-and-nature':
					$.get(sourceLink, function(data) {
						
						addArticleCategory(data, categoryArticles[5]);
					});
					break;
				case 'sport':
					$.get(sourceLink, function(data) {
						
						addArticleCategory(data, categoryArticles[6]);
					});
					break;
				case 'technology':
					$.get(sourceLink, function(data) {
						
						addArticleCategory(data, categoryArticles[7]);
					});
					break;
			}
		}
	}

	function addArticleCategory(data, category) {
//		console.log(data);
		for(var j=0; j < $(data).attr('articles').length; j++){
			var pulledArticle = $(data).attr('articles');
			var article = $('<div>');
			var title = $('<div>');
			var author = $('<div>');
			var description = $('<div>');
			var url = $('<a>');

			var content = $('<div>');


			title.append(url);
			title.addClass('title');

			author.append('By: ' + $(pulledArticle[j]).attr('author'));
			author.addClass('author');

			description.append($(pulledArticle[j]).attr('description'));
			description.addClass('description');

			url.attr('href', $(pulledArticle[j]).attr('url'));
			url.append($(pulledArticle[j]).attr('title'));
			url.addClass('link');

			content.append(author);
			content.append(description);
			content.attr('id','content');
			content.addClass('collapse');

			article.append(title);
			article.append(content);
			article.addClass('article');

			category.append(article);
		}
	}
	
	function mainSource() {
		for(var i = 0; i < articleList.length; i++) {
			
		}
	}
	
	function addArticleSource(data, source) {
		
	}
	getSource().then(getArticles)//.then(mainCategory);
});