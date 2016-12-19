var mySlideShow = (function () {

	var init = function () {
			_clickControlBtnTop ();
			_clickControlBtnBottom ();
		};
	
	var counter = 1,
		duration = 300,
		flag = true;

	var _moveSlide = function(container, direction) {
		var items = container.find('.slider__item'),
			activeItem = items.filter('.active'),
			direction = direction == 'down' ? 100 : -100;

		if (counter >= items.length) {
			counter = 0;
		}

		var reqItem = items.eq(counter);


		activeItem.animate({
			'top' : direction + '%'
		}, duration);

		reqItem.animate({
			'top' : '0%'
		}, duration, function() {
			activeItem.removeClass('active').css('top', -direction + '%');
			$(this).addClass('active');
			flag = true;
		});
	};

	var _clickControlBtnTop = function() {
		$('.slider__controls-top').on('click', _actionForClick);
	}

	var _clickControlBtnBottom = function() {
		$('.slider__controls-bottom').on('click', _actionForClick);
	}

	var _actionForClick = function(e) {
			e.preventDefault();

			var firstSlider = $(this).closest('.slider__container');
			var secondSlider = $('.slider__container_opposite');

			if (flag) {
				flag = false;
				_moveSlide(firstSlider, 'down');
				_moveSlide(secondSlider, 'up');
			}
			
			counter++;
		};
		
	return {
		init: init
	}

})();

mySlideShow.init();