$(document).ready(function () {
  var body = document.getElementsByTagName('body');
  var sort = 'top';
  var sources;
  var sourceOrigin;
  var apiLink;
  
  var category;
  var language;
  var country;
  
  $.get('https://newsapi.org/v1/sources?language=en', function(data) {
    console.log(data);
  });
  
  function getSource() {
   return $.ajax({
      url:'https://newsapi.org/v1/sources',
      success: function(data) {
        console.log(data);
        sources = $(data).attr('sources');
      }
    });
  }
  
//  $.when(getSource()).done(function() {
//    console.log(sources.length);
//    for(var i = 0; i < sources.length; i++){
//      sourceOrigin = $(sources[i]).attr('id');
//      apiLink = 'https://newsapi.org/v1/articles?source=' + sourceOrigin + '&sortBy=' + sort + '&apiKey=98432bdc8b0d474797f981385df66c5f';
////      console.log(apiLink);
//      $.get(apiLink, function(data){
////        console.log(data);
//        var articles = $(data).attr('articles');
//
//
//        for (var j = 0; j < articles.length; j++) {
//          var article = $('<div>');
//          var title = $('<div>');
//          var source = $('<div>');
//          var author = $('<div>');
//          var description = $('<div>');
//          var url = $('<a>');
//
//
//          title.append(url);
//
//          source.append($(data).attr('source'));
//
//          author.append('By: ' + $(articles[j]).attr('author'));
//
//          description.append($(articles[j]).attr('description'));
//
//          url.attr('href', $(articles[j]).attr('url'));
//          url.append($(articles[j]).attr('title'));
//
//
//          article.append(title);
//          article.append(source);
//          article.append(author);
//          article.append(description);
//
//          $(body).append(article);
//        }
//      });
//    }
//  });
});