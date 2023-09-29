jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  //ナビバートグル
  $(".js-hamburger").on("click", function () {
    if ($(".js-hamburger").hasClass("is-open")) {
      $(this).removeClass("is-open");
      $(".js-sp-nav").fadeOut();
      $("body").removeClass("sp-nav__active");
    } else {
      $(this).addClass("is-open");
      $(".js-sp-nav").fadeIn();
      $("body").addClass("sp-nav__active");
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
  const swiper = new Swiper(".js-campaign-swiper", {
    slidesPerView: "auto",
    spaceBetween: space,
    loop: true, // ループ有効
    speed: 3000, // ループの時間
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 1000, // 1秒後に次のスライド（初期値：3000）
      disableOnInteraction: false, // 矢印をクリックしても自動再生を止めない
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
  let footer = $(".footer");
  // ファーストビューの高さ
  let mvHeight = $(".mv").height();
  // ヘッダーの高さ
  let headerHeight = $(".header").height();
  // フッターの高さ
  let footHeight = $(".footer").innerHeight();
  let buttoBottom;
  let scrollHeight;
  let scrollPosition;
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
  topBtn.click(function () {
    $("body,html").animate(
      {
        scrollTop: 0, // 上から0pxの位置に戻る
      },
      400 // 500ミリ秒かけて戻る
    );
    return false;
  });
  // フッター手前でストップ
  if (windowSize < 376) {
    buttoBottom = 16;
  } else {
    buttoBottom = 20;
  }
  $(window).on("scroll", function () {
    scrollHeight = $(document).height(); //ドキュメントの高さ
    scrollPosition = $(window).height() + $(window).scrollTop(); //現在の位置
    if (scrollHeight - scrollPosition <= footHeight) {
      // ページトップボタンがフッター手前に来たらpositionとfixedからabsoluteに変更
      topBtn.css({
        position: "absolute",
        bottom: footHeight,
      });
    } else {
      topBtn.css({
        position: "fixed",
        bottom: buttoBottom,
      });
    }
  });

  // ローディング
  window.addEventListener("load", (e) => {
    const tl = gsap.timeline();
    const title = document.querySelector(".loading__title");
    const loading = document.querySelector(".loading");

    tl
      // 左の画像を上げる
      .to(".loading__image-left", {
        y: "0%",
        duration: 2,
        ease: "power4.out",
        delay: 1,
      })
      // 右の画像を上げる
      .to(
        ".loading__image-right",
        {
          y: "0%",
          duration: 2,
          ease: "power4.out",
        },
        "<0.5"
      )
      // 文字色を白に変更
      .add(() => {
        title.classList.add("loading__title--white");
      }, "<0.3")
      // ローディング画面をゆっくり透明にする
      .to(".loading", {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          loading.style.display = "none";
        },
      },">2");
  });
});
