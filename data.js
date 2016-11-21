$(document).ready(function () {
  var body = document.getElementsByTagName('body');
  var sort = 'category';
  var sources;
  var articleList = [];
  
  var category = ['business', 'entertainment', 'gaming', 'general', 'music', 'science-and-nature', 'sport', 'technology'];
  var language;
  var country;
  
//  $.get('https://newsapi.org/v1/sources?language=en', function(data) {
//    console.log(data);
//  });
  
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
    var business = $('<div>');
    $(business).append($('<header>').append('Business'));
    var entertainment = $('<div>');
    $(entertainment).append($('<header>').append('Entertainment'));
    var gaming = $('<div>');
    $(gaming).append($('<header>').append('Gaming'));
    var general = $('<div>');
    $(General).append($('<header>').append('General'));
    var music = $('<div>');
    $(music).append($('<header>').append('Music'));
    var science = $('<div>');
    $(Science).append($('<header>').append('Science and nature'));
    var sport = $('<div>');
    $(Sport).append($('<header>').append('Sport'));
    var tech = $('<div>');
    $(tech).append($('<header>').append('Technology'));
    
    $(body).append(business);
    $(body).append(entertainment);
    $(body).append(gaming);
    $(body).append(general);
    $(body).append(music);
    $(body).append(science);
    $(body).append(sport);
    $(body).append(tech);
    for (var j = 0; j < sources.length; j++) {
      
      var sourceOrigin = $(sources[j]).attr('id');
      var sourceLink = 'https://newsapi.org/v1/articles?source=' + sourceOrigin + '&apiKey=98432bdc8b0d474797f981385df66c5f';
      switch($(sources[j]).attr('category')){
        case 'business':
          $.get(sourceLink, function(data) {
            
            addArticleCategory(data, business)
          });
          break;
        case 'entertainment':
          $.get(sourceLink, function(data) {
            
            addArticleCategory(data, entertainment)
          });
          break;
        case 'gaming':
          $.get(sourceLink, function(data) {
            
            addArticleCategory(data, gaming)
          });
          break;
        case 'general':
          $.get(sourceLink, function(data) {
            
            addArticleCategory(data, general)
          });
          break;
        case 'music':
          $.get(sourceLink, function(data) {
            
            addArticleCategory(data, music)
          });
          break;
        case 'science-and-nature':
          $.get(sourceLink, function(data) {
            
            addArticleCategory(data, science)
          });
          break;
        case 'sport':
          $.get(sourceLink, function(data) {
            
            addArticleCategory(data, sport)
          });
          break;
        case 'technology':
          $.get(sourceLink, function(data) {
            
            addArticleCategory(data, tech)
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


    title.append(url);

    author.append('By: ' + $(pulledArticle[j]).attr('author'));

    description.append($(pulledArticle[j]).attr('description'));

    url.attr('href', $(pulledArticle[j]).attr('url'));
    url.append($(pulledArticle[j]).attr('title'));


    article.append(title);
    article.append(author);
    article.append(description);
    
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