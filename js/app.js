$(function () {
  const screenWidth = $(window).width();

  ///// enter animation /////
  $(".enter-animation").addClass("animation-fadeOut");

  $(" .banner-title div, .banner-title h2").each(function () {
    $(this).addClass("fadeIn");
  });

  if (screenWidth > 1180) {
    $("nav").addClass("fadeIn");
  }

  $("#menu").click(() => {
    $("body").toggleClass("no-scroll");
  });

  /////window Width /////

  $(window).resize(() => {
    if (screenWidth > 1180) {
      $("nav").addClass("fadeIn");
    }
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
    if (screenWidth <= 380) {
      return 1;
    } else if (screenWidth <= 576) {
      return 2;
    } else if (screenWidth <= 899) {
      return 3;
    } else if (screenWidth <= 1180) {
      return 4;
    } else {
      return 5;
    }
  }

  function calculateSlideDistance() {
    const visibleLiCount = calculateVisibleLiCount();
    return liWidth * visibleLiCount;
  }

  setInterval(() => {
    const slideDistance = calculateSlideDistance();
    const totalLiCount = $slider.find("li").length;
    const totalSlideCount = Math.ceil(totalLiCount / calculateVisibleLiCount());

    currentSlideIndex = (currentSlideIndex + 1) % totalSlideCount;
    const newScrollLeft = slideDistance * currentSlideIndex;

    $slider.animate({ scrollLeft: newScrollLeft }, 1000);
  }, 5000);

  $slider.mousedown(function (e) {
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
    const totalLiWidth = liWidth * $slider.find("li").length;
    if (newScrollLeft >= totalLiWidth) {
      newScrollLeft = 0;
    } else if (newScrollLeft <= 0) {
      newScrollLeft = totalLiWidth - liWidth;
    }

    $slider.animate({ scrollLeft: newScrollLeft }, 250);
  });

  $slider.mousemove(function (e) {
    if (!isDragging) return;

    e.preventDefault();
    let x = e.pageX - $slider.offset().left;
    let speed = (x - startX) * 2;
    $slider.scrollLeft(scrollLeft - speed);

    if (Math.abs(x - startX) > 5) {
      dragged = true;
    }
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
