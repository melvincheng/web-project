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
//				console.log(data);
				sources = $(data).attr('sources');
			}
		});
	}
	
	function addArticleSource(data, sourceDiv) {
		var pulledArticle = $(data).attr('articles');
//		console.log(data);
		for(var i = 0; i < pulledArticle.length; i++) {
			var currentArticle = pulledArticle[i];
			var article = $('<div>');
			var title = $('<div>');
			var author = $('<div>');
			var description = $('<div>');
			var url = $('<a>');
			var img = $('<img>').attr('src',$(currentArticle).attr('urlToImage'));
			var content = $('<div>');
			$(img).attr('width','100%');

			title.append(url);
			title.addClass('title');
				
			$(title).click(function() {
				$(this).siblings().each(function() {
					if($(this).hasClass('collapse')){
						$('.collapse-in').addClass('collapse');
						$('.collapse-in').removeClass('collapse-in');
						$(this).removeClass('collapse');
						$(this).addClass('collapse-in');
						
					}else{
						$(this).addClass('collapse');
						$(this).removeClass('collapse-in');
					}
				});
			});
			
			
			author.append('By: ' + $(currentArticle).attr('author'));
			author.addClass('author');

			description.append($(currentArticle).attr('description'));
			description.addClass('description');

			url.attr('href', $(currentArticle).attr('url'));
			url.append($(currentArticle).attr('title'));
			url.addClass('link');
			
			content.append(img);
			content.append(author);
			content.append(description);
			content.attr('id','content');
			content.addClass('collapse');

			article.append(title);
			article.append(content);
			article.addClass('article');

			sourceDiv.append(article);
			
		}
	}
	
	function displaySource() {
		var sourceLink;
		var sourceArticleDivList = [];
		var sourceId = [];
		return $.each(sources, function(index, data){
//			console.log(data);
			
			var sourceHeader = $('<div>');
			var sourceLogo = $('<img>').addClass('logo').attr('src', $($(data).attr('urlsToLogos')).attr('large'));
			var sourceDiv = $('<div>').attr('id',$(data).attr('name'));
			var sourceArticle = $('<div>').addClass('collapse').attr('id',$(data).attr('id'));
			
			sourceDiv.append(sourceHeader);
			sourceDiv.append(sourceArticle);
			sourceDiv.addClass('category');
			
			sourceArticleDivList.push(sourceArticle);
			
			sourceHeader.append(sourceLogo);
			sourceHeader.append($(data).attr('name'));
			sourceHeader.addClass('sortHeader');
			sourceHeader.attr('data-toggle','collapse').attr('data-target','#' + $(data).attr('id'));
			
			$(body).append(sourceDiv);
			
			var sourceOrigin = $(data).attr('id');
			sourceId.push(sourceOrigin);
			sourceLink = 'https://newsapi.org/v1/articles?source=' + sourceOrigin + '&apiKey=98432bdc8b0d474797f981385df66c5f';
			$.ajax({
				url: sourceLink,
				success: function(data) {
					articleList.push(data);
					addArticleSource(data, sourceArticleDivList[sourceId.indexOf($(data).attr('source'))]);
				}
			});
		});	
	}
	
	function displayCategory() {
		var category = ['business', 'entertainment', 'gaming', 'general', 'music', 'science-and-nature', 'sport', 'technology'];
		var categoryName = ['Business', 'Entertainment', 'Gaming', 'General', 'Music', 'Science and nature', 'Sports', 'Technology'];
		var categoryDiv = [$('<div>'), $('<div>'), $('<div>'), $('<div>'), $('<div>'), $('<div>'), $('<div>'), $('<div>')];
		var categoryArticles = [];
		
		for(var i = 0; i < category.length; i++) {
			var tempDiv = categoryDiv[i];
			var tempArticle = $('<div>');
			
			categoryArticles.push(tempArticle);
			
			tempArticle.attr('id', category[i]+'Articles').addClass('collapse');
			tempDiv.attr('id', category[i]).addClass('category').append($('<header>').append(categoryName[i]).addClass('sortHeader').attr('data-toggle','collapse').attr('data-target','#' + category[i] + 'Articles')).append(tempArticle);
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
		var pulledArticle = $(data).attr('articles');
		for(var j=0; j < pulledArticle.length; j++){
			var currentArticle = pulledArticle[j];
			var article = $('<div>');
			var title = $('<div>');
			var author = $('<div>');
			var source = $('<div>');
			var description = $('<div>');
			var url = $('<a>');
			var img = $('<img>').attr('src',$(currentArticle).attr('urlToImage'));
			var content = $('<div>');
			$(img).attr('width','100%');

			title.append(url);
			title.addClass('title');
				
			$(title).click(function() {
				$(this).siblings().each(function() {
					if($(this).hasClass('collapse')){
						$('.collapse-in').addClass('collapse');
						$('.collapse-in').removeClass('collapse-in');
						$(this).removeClass('collapse');
						$(this).addClass('collapse-in');
						
					}else{
						$(this).addClass('collapse');
						$(this).removeClass('collapse-in');
					}
				});
			});
			
			source.append('Source: ' + $(data).attr('source'));
			
			author.append('By: ' + $(currentArticle).attr('author'));
			author.addClass('author');

			description.append($(currentArticle).attr('description'));
			description.addClass('description');

			url.attr('href', $(currentArticle).attr('url'));
			url.append($(currentArticle).attr('title'));
			url.addClass('link');
			
			content.append(img);
			content.append(source);
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

	getSource().then(displaySource);
//	getSource().then(displayCategory);
});