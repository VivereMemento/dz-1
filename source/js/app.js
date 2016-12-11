(function() {
  'use strict';

  // setTimeout(function() {
  //   document.querySelector('.greating_picture').classList.add('m--show');
  // }, 1000);

// parallax

var parallax = (function() {
  var bg = document.querySelector('.bg-wrap');
  var portfolioBg = document.querySelector('.portfolio-bg__img');
  var avatar = document.querySelector('.avatar');

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
      this.move(portfolioBg, wScroll, 10);
      this.move(avatar, wScroll, 5);
    }
  }
}());

window.onscroll = function() {
  var wScroll = window.pageYOffset;

  parallax.init(wScroll);
}

// autorize
$('.login__auth-btn').on('click', function(){
  if($('.flipper').hasClass('flip')) {
    $('.flipper').removeClass('flip');
  } else {
    $('.flipper').addClass('flip');
  }
});

// menu

$('.trigger-menu-wrap').on('click', function(){
    if($('.trigger-menu').hasClass('js-change')){
      $('.trigger-menu').removeClass('js-change');
      $('.menu__list').fadeOut();
      $('.menu').delay(300).fadeOut();
      $('.menu-wrap').removeClass('js-change');
    }
    else{
      $('.trigger-menu').addClass('js-change');
      $('.menu').fadeIn();
      $('.menu-wrap').addClass('js-change');
      $('.menu__list').delay(200).fadeIn();
    }
  });

/********************************************/
/*==========================================*/
/********************************************/

var width = $('.slider__container').width(); //узнали ширину контейнера
  var height = $('.slider__container').height(); //узнали высоту контейнера
  
  //dimensions
  $('.slides>li').width(width); //сделали ширину элементов списка равной ширине контейнера
  $('.slides2>li').width(width); //сделали ширину элементов списка равной ширине контейнера
  // $('.slides').width(width*$('.slides>li').length); //умножаем ширину списка на количество его элемнтов, чтобы вместить их в одну строку
  
  // positioning
  $('.slides').css('top',-height);
  $('.slides2').css('top',-height);

  //move slides forward
  function nextSlide() {
    $('.slides2').animate({
      'margin-top':-height
    },500, function() {
      $('.slides2>li:first-child').prependTo('.slides');
      $('.slides2').css('margin-top', 0);
    });
    $('.slides').animate({
      'margin-top':height
    },500, function() {
      $('.slides>li:last-child').appendTo('.slides2');
      $('.slides').css('margin-top', 0);
      // $('.clone1').appendTo('.slides2');
      
    });
  }
  //move slides backwards
  function prevSlide() {
    $('.slides2').animate({
      'margin-top':height
    },500, function() {
      $('.slides2>li:last-child').appendTo('.slides');
      $('.slides2').css('margin-top', 0);
    });
    $('.slides').animate({
      'margin-top':-height
    },500, function() {
      $('.slides>li:first-child').prependTo('.slides2');
      $('.slides').css('margin-top', 0);
    });
  }
    
  //controls
  $('.next').on('click', function (e) {
    e.preventDefault();
    
    // var $this = $(this),
    //     container = $this.closest('.slider__container'),
    //     list = container.find('.slides'),
    //     items = container.find('.slider__item'),
    //     activeItem = $('.active'),
    //     display = $('.slider__display'),
    //     path = activeItem.find('img').attr('src'),
    //     duration = 300;

    nextSlide();
    // prevSlide();

    $('.slides2>li:nth-child(3)').addClass('active');
    $('.slides2>li:nth-child(2)').removeClass('active');
    display.find('img').fadeOut(duration, function() {
        $(this).attr('src', path).fadeIn(duration);
      })
  });
  $('.prev').on('click', function (e) {
    e.preventDefault();
    var activeItem = $('.active'),
        display = $('.slider__display'),
        path = activeItem.find('img').attr('src'),
        duration = 300;

    prevSlide()
    // nextSlide()

    $('.slides2>li:nth-child(3)').addClass('active');
    $('.slides2>li:nth-child(2)').removeClass('active');
    display.find('img').fadeOut(duration, function() {
        $(this).attr('src', path).fadeIn(duration);
      })
  });


})();