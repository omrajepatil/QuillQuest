(function ($) {
  'use strict';

  
  $(window).on('scroll', function () {
		//.Scroll to top show/hide
    var scrollToTop = $('.scroll-top-to'),
      scroll = $(window).scrollTop();
    if (scroll >= 200) {
      scrollToTop.fadeIn(200);
    } else {
      scrollToTop.fadeOut(100);
    }
  });
	// scroll-to-top
  $('.scroll-top-to').on('click', function () {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });

  $(document).ready(function() {

    // navbarDropdown
    if ($(window).width() < 992) {
      $('.main-nav .dropdown-toggle').on('click', function () {
        $(this).siblings('.dropdown-menu').animate({
          height: 'toggle'
        }, 300);
      });
    }

  });

})(jQuery);

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll('.fade-right, .fade-bottom, .fade-left, .zoom-in');

  function checkVisibility() {
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top <= windowHeight / 1.5) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  }

  // Initial check on page load
  checkVisibility();

  // Check on scroll
  document.addEventListener('scroll', checkVisibility);
});
