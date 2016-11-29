(function() {
  'use strict';

  // setTimeout(function() {
  //   document.querySelector('.greating_picture').classList.add('m--show');
  // }, 1000);


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


})();