$(function(){
  $(".main-content").each(function(){
    // autolink
    $(this).html($(this).html().replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g,
      '<a href="$1">$1</a> '));
  });
});
