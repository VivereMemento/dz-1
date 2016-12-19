var blogMenu = (function() {

	var init = function() {
			_clickBlogTrigger();
			_scrollFun();
		};

//stick blog-menu

	var asidePos = $('.blog__aside').offset().top - 50;
	var _stickMenu = function() {
		var winPos = $(window).scrollTop();
		
		if (winPos >= asidePos) {
			$('.blog__aside').addClass('fixed');  
		}
		else {
			$('.blog__aside').removeClass('fixed');
		}
	};


//lightning menu-item

	var _lightLink = function() {
		$('.articles__item').each(function() {
			var
				$this = $(this),
				topEdge = $this.offset().top - 200,
				bottomEdge = topEdge + $this.height(),
				wScroll = $(window).scrollTop();

			if (topEdge < wScroll && bottomEdge > wScroll) {
				var
					currentId = $this.data('section'),
					reqLink = $('.blog__aside-title').filter('[href="#' + currentId + '"]');

				reqLink.closest('.blog__aside-item').addClass('active')
					.siblings().removeClass('active');
			}
		});
	};

	var _scrollFun = function() {
		$(window).scroll(function(){
			_stickMenu ();
			_lightLink();
		});
	};

//click trigger-menu

	var _showBlogMenu = function() {
			if($('.blog__aside').hasClass('fixed-tablets')){
				$('.blog__aside').removeClass('fixed-tablets');
				}

			else {
				$('.blog__aside').addClass('fixed-tablets');
			}
		};

	var _clickBlogTrigger = function() {
		$('.blog__aside-menu__trigger').on('click', _showBlogMenu);
	};

	return {
		init: init
	}

})();

blogMenu.init();