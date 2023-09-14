
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

  //ナビバートグル
  $('.js-hamburger').on('click', function () {
    if ($('.js-hamburger').hasClass('is-open')) {
      // $('.js-drawer-menu').fadeOut();
      $(this).removeClass('is-open');
      $(".js-sp-nav").fadeOut();
    } else {
      // $('.js-drawer-menu').fadeIn();
      $(this).addClass('is-open');
      $(".js-sp-nav").fadeIn();
    }
  });


});
