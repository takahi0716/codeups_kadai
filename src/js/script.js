jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  //ナビバートグル
  $(".js-hamburger").on("click", function () {
    if ($(".js-hamburger").hasClass("is-open")) {
      // $('.js-drawer-menu').fadeOut();
      $(this).removeClass("is-open");
      $(".js-sp-nav").fadeOut();
    } else {
      // $('.js-drawer-menu').fadeIn();
      $(this).addClass("is-open");
      $(".js-sp-nav").fadeIn();
    }
  });

  // swiper
  var windowSize = $(window).width();
  var space = 24;
  if (windowSize < 376) {
    space = 24;
  } else {
    space = 40;
  }
  var swiper = new Swiper(".js-campaign-swiper", {
    slidesPerView: "auto",
    spaceBetween: space,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // 画像への登場アニメーション
  //要素の取得とスピードの設定
  var box = $(".colorbox"),
    speed = 700;

  //.colorboxの付いた全ての要素に対して下記の処理を行う
  box.each(function () {
    $(this).append('<div class="color"></div>');
    var color = $(this).find($(".color")),
      image = $(this).find("img");
    var counter = 0;

    image.css("opacity", "0");
    color.css("width", "0%");
    //inviewを使って背景色が画面に現れたら処理をする
    color.on("inview", function () {
      if (counter == 0) {
        $(this)
          .delay(200)
          .animate({ width: "100%" }, speed, function () {
            image.css("opacity", "1");
            $(this).css({ left: "0", right: "auto" });
            $(this).animate({ width: "0%" }, speed);
          });
        counter = 1;
      }
    });
  });

  // to-topボタンを表示
  let topBtn = $(".to-top");
  let header = $(".header");
  // ファーストビューの高さ
  let mvHeight = $(".mv").height();
  // ヘッダーの高さ
  let headerHeight = $(".header").height();
  topBtn.hide();

  // ボタンの表示設定
  $(window).scroll(function () {
    if ($(this).scrollTop() > headerHeight) {
      // 指定の要素が登場したらスクロールでボタンを表示
      topBtn.fadeIn();
    } else {
      // 指定の要素より上ならボタンを非表示
      topBtn.fadeOut();
    }
  });

  // ローディング
  window.addEventListener("load", (e) => {
    const tl = gsap.timeline();
    const title = document.querySelector(".loading__title");
    const loading = document.querySelector(".loading__wrap");

    tl
      // 左の画像を上げる
      .to(".loading__image-left", {
        y: "0%",
        duration: 1,
        ease: "power4.out",
        delay: 1,
      })
      // 右の画像を上げる
      .to(
        ".loading__image-right",
        {
          y: "0%",
          duration: 1,
          ease: "power4.out",
        },
        "<0.25"
      )
      // 文字色を白に変更
      .add(() => {
        title.classList.add("loading__title--white");
      }, "<0.25")
      // ローディング画面をゆっくり透明にする
      .to(".loading__wrap", {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          loading.style.display = "none";
        },
      });
  });
});
