(function() {
  'use strict';

  // setTimeout(function() {
  //   document.querySelector('.greating_picture').classList.add('m--show');
  // }, 1000);

// parallaxHeader 

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
      this.move(portfolioBg, wScroll, 10);
      this.move(avatar, wScroll, 5);

      this.move(leave_1, wScroll, 15);
      this.move(leave_2, wScroll, 5);
      this.move(leave_3, wScroll, 3);
    }
  }
}());

window.onscroll = function() {
  var wScroll = window.pageYOffset;

  parallaxHeader.init(wScroll);
}


// autorize

var clickLogin = function(event) {
  var target = $( event.target );
  if(target.is('.login__auth-btn')) {
    $('.flipper').addClass('flip');
  }

  else {
    if(target.is('.login-wrap') || target.is('.form__btn-link_mods')) {
      $('.flipper').removeClass('flip');
    };
  }
  
}

$(document).click(clickLogin);

})();