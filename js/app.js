$(function () {
  const currentWidth = $(window).width();
  function checkWidthAndApplyLogic() {
    const currentWidth = $(window).width();
    if (currentWidth > 1180) {
      $("nav").addClass("fadeIn");
    } else {
      $("nav").removeClass("fadeIn");
    }
  }
  checkWidthAndApplyLogic();

  ///// enter animation /////
  $(".enter-animation").addClass("animation-fadeOut");

  $(" .banner-title div, .banner-title h2").each(function () {
    $(this).addClass("fadeIn");
  });

  $("#menu").click(() => {
    $("body").toggleClass("no-scroll");
  });

  /////window Width /////

  $(window).resize(() => {
    checkWidthAndApplyLogic();
  });

  ///// slide /////
  const $slider = $(".product-items");
  let liWidth = $slider.find("li").outerWidth(); // 假設所有 li 元素寬度相同
  let isDragging = false;
  let startX;
  let scrollLeft;
  let dragged;
  let currentSlideIndex = 0;

  function calculateVisibleLiCount() {
    if (currentWidth <= 380) {
      return 1;
    } else if (currentWidth <= 576) {
      return 2;
    } else if (currentWidth <= 899) {
      return 3;
    } else if (currentWidth <= 1180) {
      return 4;
    } else {
      return 5;
    }
  }

  const visibleLiCount = calculateVisibleLiCount();

  const sliderRun = setInterval(() => {
    const totalLiCount = $slider.find("li").length;
    const visibleLiCount = calculateVisibleLiCount();
    const totalSlideCount = Math.ceil(totalLiCount / visibleLiCount);

    currentSlideIndex = (currentSlideIndex + 1) % totalSlideCount;
    let newScrollLeft = liWidth * visibleLiCount * currentSlideIndex;

    // 確保 newScrollLeft 不超過輪播的最大範圍
    const maxScrollLeft = liWidth * (totalLiCount - visibleLiCount);
    if (newScrollLeft > maxScrollLeft) {
      newScrollLeft = maxScrollLeft;
    }

    $slider.animate({ scrollLeft: newScrollLeft }, 1000);
  }, 5000);

  $slider.mousedown(function (e) {
    clearInterval(sliderRun);
    isDragging = true;
    dragged = false;
    startX = e.pageX - $(this).offset().left;
    scrollLeft = $(this).scrollLeft();
  });

  $(document).mouseup(function () {
    if (!isDragging) return;
    isDragging = false;

    setTimeout(function () {
      dragged = false;
    }, 50);

    let newScrollLeft = $slider.scrollLeft();
    const scrollDistance = newScrollLeft - scrollLeft;
    const liCount = Math.round(scrollDistance / liWidth);

    newScrollLeft = scrollLeft + liCount * liWidth;
    const maxScrollLeft =
      liWidth * ($slider.find("li").length - visibleLiCount);

    if (newScrollLeft > maxScrollLeft) {
      newScrollLeft = maxScrollLeft;
    } else if (newScrollLeft < 0) {
      newScrollLeft = 0;
    }

    $slider.animate({ scrollLeft: newScrollLeft }, 250);
  });

  $(document).mousemove(function (e) {
    if (!isDragging) return;

    e.preventDefault();
    let x = e.pageX - $slider.offset().left;
    let speed = (x - startX) * 2;
    $slider.scrollLeft(scrollLeft - speed);

    if (Math.abs(x - startX) > 5) {
      dragged = true;
    }
  });

  $slider.find("a").on("click", function (e) {
    if (dragged) {
      e.preventDefault();
    }
  });

  //--- mobile slider ---//
  $slider.on("touchstart", function (e) {
    clearInterval(sliderRun);
    isDragging = true;
    dragged = false;
    startX = e.touches[0].pageX - $(this).offset().left;
    scrollLeft = $(this).scrollLeft();
  });

  $slider.on("touchmove", function (e) {
    if (!isDragging) return;
    e.preventDefault();
    let x = e.touches[0].pageX - $slider.offset().left;
    let speed = (x - startX) * 2;
    $slider.scrollLeft(scrollLeft - speed);
    if (Math.abs(x - startX) > 5) {
      dragged = true;
    }
  });

  $(document).on("touchend", function () {
    if (!isDragging) return;
    isDragging = false;

    setTimeout(function () {
      dragged = false;
    }, 50);

    let newScrollLeft = $slider.scrollLeft();
    const scrollDistance = newScrollLeft - scrollLeft;
    const liCount = Math.round(scrollDistance / liWidth);

    newScrollLeft = scrollLeft + liCount * liWidth;
    const maxScrollLeft =
      liWidth * ($slider.find("li").length - visibleLiCount);

    if (newScrollLeft > maxScrollLeft) {
      newScrollLeft = maxScrollLeft;
    } else if (newScrollLeft < 0) {
      newScrollLeft = 0;
    }

    $slider.animate({ scrollLeft: newScrollLeft }, 250);
  });

  ////////////// Scroll ////////////////

  $(window).scroll(() => {
    const scrollPos = $(window).scrollTop();
    const windowHeight = $(window).height();
    const aboutBlock = $(".about").offset().top;

    $(
      ".products h3, .product-content, .product-items, .button-more, .news h3,footer .menu, footer .contact"
    ).each(function () {
      const elementTop = $(this).offset().top;

      if (scrollPos + windowHeight / 1.5 >= elementTop) {
        $(this).addClass("fadeIn");
      }
    });

    if (scrollPos + windowHeight / 1.5 >= aboutBlock)
      $(".about").addClass("fadeIn");
  });
});

///// scrollDown /////

$(".banner-scrollDown").click((e) => {
  e.preventDefault();
  const target = $(".index").offset().top;
  $("html, body").animate({ scrollTop: target }, 1000);
});
