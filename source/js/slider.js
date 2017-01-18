var mySlider = (function() {

	var init = function() {
			_setUpListners();
		};

	var _setUpListners = function () {
		var slider = new Slider($('.works'));
			slider.setDefaults();

		$('.works-slider__control-btn_left').on('click', function(e){
			e.preventDefault();
			slider.moveSlide('prev');
		});

		$('.works-slider__control-btn_right').on('click', function(e){
			e.preventDefault();
			slider.moveSlide('next');
		});
	};

	//slider

	var Slider = function() {

		var
			container   = $('.works');
			nextBtn     = container.find('.works-slider__control-btn_left'),
			prevBtn     = container.find('.works-slider__control-btn_right'),
			items       = nextBtn.find('.works-slider__control-item'),
			display     = container.find('.works-slider__display'),
			title       = container.find('.subtitle'),
			skills      = container.find('.works__content-desc'),
			link        = container.find('.works__content-view'),
			itemsLength = items.length,
			duration    = 500,
			flag        = true;

		var timeout;

		this.counter = 0;

		// private

		var generateMarkups = function() {
			var list = nextBtn.find('.works-slider__control-list'),
				markups = list.clone();

			prevBtn
				.append(markups)
				.find('.works-slider__control-item')
				.removeClass('active')
				.eq(this.counter + 1)
				.addClass('active');
		}

		var getDataArrays = function() {
			var dataObject = {
				pics : [],
				title : [],
				skills : [],
				link : []
			};

			$.each(items, function() {
				var $this = $(this);

				dataObject.pics.push($this.data('full'));
				dataObject.title.push($this.data('title'));
				dataObject.skills.push($this.data('skills'));
				dataObject.link.push($this.data('link'));
			});

			return dataObject;
		}

		var slideInLeftBtn = function(slide) {
			var
				reqItem = items.eq(slide - 1),
				activeItem = items.filter('.active');

			activeItem
				.stop(true, true)
				.animate({'top' : '100%'}, duration);

				reqItem
					.stop(true, true)
					.animate({'top' : '0%'}, duration, function () {
						$(this).addClass('active')
							.siblings().removeClass('active')
							.css('top', '-100%')
					});


		}

		var slideInRightBtn = function (slide) {
			var
				items = prevBtn.find('.works-slider__control-item'),
				activeItem = items.filter('.active'),
				reqSlide = slide + 1;

			if (reqSlide > itemsLength - 1) {
				reqSlide = 0;
			}

			var reqItem = items.eq(reqSlide);

			activeItem
				.stop(true, true)
				.animate({'top' : '-100%'}, duration);

			reqItem
				.stop(true, true)
				.animate({'top' : '0%'}, duration, function () {
					$(this).addClass('active')
						.siblings().removeClass('active')
						.css('top', '100%')
				});
		};

		var changeMainPicture = function(slide) {
			var image = display.find('.works-slider__display-pic');
			var data = getDataArrays();

			image
				.stop(true, true)
				.fadeOut(duration / 2, function() {
					image.attr('src', data.pics[slide]);
					$(this).fadeIn(duration / 2);
				});
		}

		var changeTextData = function(slide) {
			var data = getDataArrays();

			// name of work
			aviatitle.generate(data.title[slide], title, 'ru');

			// description of technology
			aviatitle.generate(data.skills[slide], skills, 'en');

			// link to work
			link.attr('href', data.link[slide]);
		}
		
		// public
		this.setDefaults = function() {
			var
				_that = this,
				data = getDataArrays();

			// making murkup
			generateMarkups();

			// left button
			nextBtn
				.find('.works-slider__control-item')
				.eq(_that.counter - 1)
				.addClass('active');

			// right button
			prevBtn
				.find('.works-slider__control-item')
				.eq(_that.counter + 1)
				.addClass('active');

			// main image
			display
				.find('.works-slider__display-pic')
				.attr('src', data.pics[_that.counter]);

			// text description
			changeTextData(_that.counter);

		};

		this.moveSlide = function(direction) {
			var _that = this;

			var directions = {
				next : function() {
					// loopback of slider-item
					if (_that.counter < itemsLength - 1) {
						_that.counter++;
					} else {
						_that.counter = 0;
					}
				},

				prev : function () {
					if (_that.counter > 0) {
						_that.counter--;
					} else {
						_that.counter = itemsLength - 1;
					}
				}
			};

			directions[direction]();

			if (flag) {
				flag = false;

				if (typeof timeout != 'undefined') {
					clearTimeout(timeout);
				}

				timeout = setTimeout(function () {
					flag = true;
				}, duration + 50);

				slideInLeftBtn(_that.counter);
				slideInRightBtn(_that.counter);
				changeMainPicture(_that.counter);
				changeTextData(_that.counter);
			}
		};
	};
	return {
		init: init
	}
})();

mySlider.init();