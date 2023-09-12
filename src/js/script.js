
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

  //ナビバートグル
  $('.js-hamburger').on('click', function () {
    if ($('.js-hamburger').hasClass('is-open')) {
      // $('.js-drawer-menu').fadeOut();
      $('.js-drawer-menu').removeClass('is-open');
      $(this).removeClass('is-open');
    } else {
      // $('.js-drawer-menu').fadeIn();
      $(this).addClass('is-open');
      $('.js-drawer-menu').addClass('is-open');
    }
  });


});
