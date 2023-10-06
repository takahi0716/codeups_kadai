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
  var box = $(".js-colorbox"),
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
    var webStorage = function () {
      if (sessionStorage.getItem("access")) {
        /*2回目以降アクセス時の処理*/
        $(".loading").addClass('is-active');
        $(".loading").css("display","none");
      } else {
        /*初回アクセス時の処理*/
        sessionStorage.setItem("access", "true"); // sessionStorageにデータを保存
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
          .to(
            ".loading",
            {
              opacity: 0,
              duration: 1,
              onComplete: () => {
                loading.style.display = "none";
              },
            },
            ">2"
          );
      }
    };
    webStorage();
  });

  // 入力チェック
  $(function () {
    $(".js-accordion").on("click", function () {
      $(this).next().toggleClass("is-close");
      $(this).toggleClass("is-active");
    });
  });

  $("#submit_btn").on("click", function () {
    // エラー表示をリセット
    $("#your-name").removeClass("is-error");
    $("#email").removeClass("is-error");
    $("#tel").removeClass("is-error");
    $("#contents").removeClass("is-error");
    $(".form__checkbox").removeClass("is-error");
    $("#form-campaign").removeClass("is-error");
    $(".form__checkbox-agree").removeClass("is-error");
    $(".form__error").removeClass("is-error");

    if ($("#your-name").val() === "") {
      $("#your-name").addClass("is-error");
      $(".form__error").addClass("is-error");
    }
    if ($("#email").val() === "") {
      $("#email").addClass("is-error");
      $(".form__error").addClass("is-error");
    }
    if ($("#tel").val() === "") {
      $("#tel").addClass("is-error");
      $(".form__error").addClass("is-error");
    }
    if ($("#contents").val() === "") {
      $("#contents").addClass("is-error");
      $(".form__error").addClass("is-error");
    }

    var checkBoxes = $("input[name='contact-item']");
    var isChecked = false;

    checkBoxes.each(function () {
      if ($(this).prop("checked")) {
        isChecked = true;
        return false; // ループを終了します
      }
    });

    if (!isChecked) {
      $(".form__checkbox").addClass("is-error");
      $(".form__error").addClass("is-error");
    }

    if ($("#form-campaign").val() === "") {
      $("#form-campaign").addClass("is-error");
      $(".form__error").addClass("is-error");
    }

    if (!$("#agree").prop("checked")) {
      $(".form__checkbox-agree").addClass("is-error");
      $(".form__error").addClass("is-error");
    }

    if ($("#your-name").val() !== "" && $("#email").val() !== "" && $("#tel").val() !== "" && $("#contents").val() !== "" && isChecked && $("#form-campaign").val() !== "" && $("#agree").prop("checked")){
      window.location.href = '../page-thanks.html';
    }
    // alert('送信完了！');
  });

  // モーダル
  $("#openModal").on("click", function () {
    $("#modalArea").toggleClass("is-show");
  });
  $("#closeModal").on("click", function () {
    $("#modalArea").toggleClass("is-show");
  });
  $("#modalBg").on("click", function () {
    $("#modalArea").toggleClass("is-show");
  });

  // モーダル表示;
  var scrollPosition2;

  $(".js-tile-item").click(function () {
    if (windowSize < 376) {
      return false;
    }else{

    scrollPosition2 = $(window).scrollTop();
    $(".js-modal-window").html($(this).prop("outerHTML"));
    $(".js-modal-window").fadeIn();
    $("body").addClass("gallery__modal-active");
    return false;
  }
  });
  // モーダル非表示
  $(".js-modal-window").click(function () {
    if (windowSize < 376) {
      return false;
    }else{
    $(".js-modal-window").fadeOut();
    $(window).scrollTop(scrollPosition2);
    $("body").removeClass("gallery__modal-active");

    return false;
    }
  });

  // タブ
  $('.js-tab-trigger').on('click', function () {
    $('.js-tab-trigger').removeClass('is-active');
    $('.js-tab-target').removeClass('is-active');
    $(this).addClass('is-active');
    let id = $(this).data("id");
    $('#' + id).addClass('is-active')
});


});
