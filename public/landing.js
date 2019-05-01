$(document).ready(function () {

  $('.users').hover(function () {
    $('ul').toggleClass('show');
  });

  if ($(window).width() < 768) {
    $('.users').click(function () {
      $('ul').toggleClass('show');
    });
  }
  
});