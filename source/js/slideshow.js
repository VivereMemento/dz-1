var mySlideShow = (function () {

	var init = function () {
			_setUpListners ();
		};

	var _setUpListners = function () {
			$('.slider__controls-top').on('click', _actionForClick);
			$('.slider__controls-bottom').on('click', _actionForClick);
		};



	var _slideShow = function(clickButton, closestContainer) {
		var 
			container = $('.slider__show'),
			display = container.find('.slider__show-pic'),
			itemContainer = $(closestContainer),
			items = itemContainer.find('.slider__item'),
			activeItem = items.filter('.active'),
			path = activeItem.find('img').attr('src');

			display.fadeOut(function () {
				display.attr('src', path).on('load', function() {
					$(this).fadeIn();
				});
			});
		}
	
	var counter = 1,
		duration = 300,
		flag = true;

	var _moveSlide = function(container, direction, clickButton) {
		var items = container.find('.slider__item'),
			activeItem = items.filter('.active'),
			direction = direction == 'down' ? 100 : -100;

		if (counter >= items.length) {
			counter = 0;
		}
		else if (counter === -items.length + 1) {
			counter = +1;
		}

		

		var reqItem = items.eq(counter);
		var revItem = items.eq(counter - 2);

		activeItem.animate({
			'top' : direction + '%'
		}, duration);

		if(clickButton.hasClass('slider__controls-bottom')) {
				reqItem.animate({
				'top' : '0%'
			}, duration, function() {
				activeItem.removeClass('active').css('top', -direction + '%');
				$(this).addClass('active');
				flag = true;
			});
		}
		else {

			revItem.animate({
				'top' : '0%'
			}, duration, function() {
				activeItem.removeClass('active').css('top', -direction + '%');
				$(this).addClass('active');
				flag = true;
			});
		};
	};

	var _actionForClick = function(e) {
			e.preventDefault();
			var $this = $(this),
				firstSlider = $this.closest('.slider__container'),
				secondSlider = $('.slider__container_opposite'),
				closestContainer = $this.hasClass('slider__controls-top') ? firstSlider : secondSlider;

			if (flag) {
				flag = false;
				_moveSlide(firstSlider, 'down', $this);
				_moveSlide(secondSlider, 'up', $this);
				_slideShow ($this, closestContainer);
			}

			if($this.hasClass('slider__controls-bottom')) {
				counter++;
			}
			else {
				counter--;
			}
			
			
		};
		
	return {
		init: init
	}

})();

mySlideShow.init();