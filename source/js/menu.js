var myMenu = (function() {

	var init = function() {
			_clickTrigger();
		};

	var _clickTrigger = function() {
		$('.trigger-menu-wrap').on('click', _showMenu);
	};

	var _showMenu = function() {
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
			$('.menu__list').delay(800).fadeIn();
		}
	};

	return {
		init: init
	}

})();

myMenu.init();