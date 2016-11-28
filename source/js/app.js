(function() {
  'use strict';

  // setTimeout(function() {
  //   document.querySelector('.greating_picture').classList.add('m--show');
  // }, 1000);


  $('.trigger-menu-wrap').on('click', function(){
  	if($('.trigger-menu').hasClass('change')){
  		$('.trigger-menu').removeClass('change');
      $('.menu').removeClass('change');
      $('.menu__list').fadeOut();
  	}
  	else{
      $('.trigger-menu').addClass('change');
  		$('.menu').addClass('change');
      $('.menu__list').css({'display':'none'}).delay(200).fadeIn();
  	}
  });


})();