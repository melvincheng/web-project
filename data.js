$(document).ready(function () {
  var body = document.getElementsByTagName('body');
  $.get('https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=98432bdc8b0d474797f981385df66c5f',function(data){
    console.log(data);
  });
  
  $.get('https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=98432bdc8b0d474797f981385df66c5f', function(data){
    console.log(data);
    var articles = $(data).attr('articles');
    var source = $('<div>');
    $(body).append(source);
    $(source).append($('<header>').append($(data).attr('source')));
    for (var i = 0; i < articles.length; i++) {
      var article = $('<div>');
      var title = $('<div>');
      var author = $('<div>').append('By: ' + $(articles[i]).attr('author'));
      var description = $('<div>').append($(articles[i]).attr('description'));
      var link = $('<a>').attr('href', $(articles[i]).attr('url'));
      link.append($(articles[i]).attr('title'));
      title.append(link);
      $(article).append(title);
      $(article).append(author);
      $(article).append(description);
      $(body).append(article);
    }
  });
});