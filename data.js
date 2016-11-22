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
//      console.log(data);
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
  
  getSource().then(getArticles).then(mainCategory);
  
  function mainCategory() {
    var category = ['business', 'entertainment', 'gaming', 'general', 'music', 'science-and-nature', 'sport', 'technology'];
    var categoryName = ['Business', 'Entertainment', 'Gaming', 'General', 'Music', 'Science and nature', 'Sports', 'Technology'];
    var categoryDiv = [$('<div>'), $('<div>'), $('<div>'), $('<div>'), $('<div>'), $('<div>'), $('<div>'), $('<div>')];
    var categoryArticles = [];
    
    for(var i = 0; i < category.length; i++) {
      var tempDiv = categoryDiv[i];
      var tempArticle = $('<div>').attr('id', category[i]+'Articles').addClass('collapse');
      categoryArticles.push(tempArticle);
      
      tempDiv.append($('<header>').append(categoryName[i]).addClass('categoryHeader').attr('data-toggle','collapse').attr('data-target','#' + category[i] + 'Articles'));
      tempDiv.attr('id', category[i]);
      tempDiv.append(tempArticle);
      $(body).append(categoryDiv[i]);
    }
//    console.log(categoryArticles);
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
//  console.log(data);
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

    article.append(title);
    article.append(content);
    article.addClass('article');
    
    category.append(article);
  }
} 

//  $.when(getSource()).done(function() {
//    console.log(sources.length);
//    for(var i = 0; i < sources.length; i++){
//      sourceOrigin = $(sources[i]).attr('id');
//      apiLink = 'https://newsapi.org/v1/articles?source=' + sourceOrigin + '&apiKey=98432bdc8b0d474797f981385df66c5f';
////      console.log(apiLink);
//      $.get(apiLink, function(data){
////        console.log(data);
//        var articles = $(data).attr('articles');
//        if(sort == 'category'){
//          var business = ('<div>');
//          var entertainment = ('<div>');
//          var gaming = ('<div>');
//          var general = ('<div>');
//          var music = ('<div>');
//          var science = ('<div>');
//          var sport = ('<div>');
//          var tech = ('<div>');
//          for (var j = 0; j < articles.length; j++) {
//            var article = $('<div>');
//            var title = $('<div>');
//            var source = $('<div>');
//            var author = $('<div>');
//            var description = $('<div>');
//            var url = $('<a>');
//
//
//            title.append(url);
//
//            source.append($(data).attr('source'));
//
//            author.append('By: ' + $(articles[j]).attr('author'));
//
//            description.append($(articles[j]).attr('description'));
//
//            url.attr('href', $(articles[j]).attr('url'));
//            url.append($(articles[j]).attr('title'));
//
//
//            article.append(title);
//            article.append(source);
//            article.append(author);
//            article.append(description);
//
//            $(body).append(article);
//          }
//        }
//          -
//      });
//    }
//  });
});