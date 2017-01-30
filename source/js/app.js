(function() {
  'use strict';

//Tabs
    
$('.tabs__controls-link').on('click', function(e){
  e.preventDefault();

  var $this = $(this),
      container = $this.closest('.tabs'),
      item = container.find('.tabs__controls-item'),
      closestItem = $this.closest(item),
      contentItem = container.find('.tabs__list-item'),
      itemPosition = closestItem.index();

      contentItem.eq(itemPosition)
          .addClass('active')
          .siblings()
          .removeClass('active');

      closestItem.addClass('active')
          .siblings()
          .removeClass('active');

});

var clickArrow = function() {
  var winHeight = $('header').innerHeight();
  $('html, body').animate({scrollTop: winHeight}, 1500);
};

$('.clickArrow').on('click', clickArrow);

// autorize

var clickLogin = function(event) {
  var 
      formGroup = $('.form__text, .form__input-item'),
      labelGroup = $('.form__input-icon'),
      iconGroup = $('.icons'),
      checkGroup = $('.form__checks'),
      target = $( event.target );
  if(target.is('.login__auth-btn')) {
    $('.flipper').addClass('flip');
  }

  else {
    if(target.is('.login-wrap') || target.is('.form__btn-link_mods')) {
      $('.flipper').removeClass('flip');
      formGroup.find('.tooltip').remove();
      formGroup.removeClass('error');
      labelGroup.removeClass('label-error');
      iconGroup.removeClass('icon-error');
      checkGroup.find('.tooltip').remove();
    }
  }
};

$(document).on('click', clickLogin);

var parallaxHeader = (function() {
  var bg = document.querySelector('.bg-wrap');
  var portfolioBg = document.querySelector('.portfolio-bg__img');
  var avatar = document.querySelector('.avatar');

  var leave_1 = document.querySelector('.testimonials__leaves-1');
  var leave_2 = document.querySelector('.testimonials__leaves-2');
  var leave_3 = document.querySelector('.testimonials__leaves-3');

  return {
    move: function(block, windowScroll, strafeAmount) {
      var strafe = windowScroll / -strafeAmount + '%';
      var transformString = 'translate3d(0, ' + strafe + ', 0)';

      var style = block.style;

      style.transform = transformString;
      style.webkiTtransform = transformString;
    },

    init: function (wScroll) {
      this.move(bg, wScroll, 40);

      if ($('.works, .about').length) {
        this.move(portfolioBg, wScroll, 10);
        this.move(avatar, wScroll, 5);
      }
      

      if ($('.works').length) {
        this.move(leave_1, wScroll, 15);
        this.move(leave_2, wScroll, 5);
        this.move(leave_3, wScroll, 3); 
      }
    }
  }
}());

window.onscroll = function() {
  var wScroll = window.pageYOffset;

  parallaxHeader.init(wScroll);
}

})();

