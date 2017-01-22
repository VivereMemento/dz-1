var blogMenu = (function() {

	var init = function() {
			_setUpListners();
		};

	var _setUpListners = function () {
		$('.blog__aside-menu').on('click', _showBlogMenu);
        $('body').on('click', '.blog__aside-title', _clickToArticle);
		$(window).scroll(function(){
			_stickMenu ();
			_lightLink();
		});
	};

//stick blog-menu
	
	var _stickMenu = function() {
		var asidePos = $('.blog__aside').offset().top - 50;
		var winPos = $(window).scrollTop();
		
		if (winPos >= asidePos) {
			$('.blog__aside-menu').addClass('menu-fixed');  
		} else {
			$('.blog__aside-menu').removeClass('menu-fixed');
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

//click trigger-menu

	var _showBlogMenu = function() {
		if($('.blog__aside-menu').hasClass('menu-fixed-tablets')){
			$('.blog__aside-menu').removeClass('menu-fixed-tablets');
			} else {
			$('.blog__aside-menu').addClass('menu-fixed-tablets');
		}
	};

	var _clickToArticle = function(e) {
            e.preventDefault();
            var
                $this = $(this),
                item = $this.closest('.blog__aside-item'),
                index = item.index(),
                sections = $('.articles__item'),
                reqSection = sections.eq(index),
                windowMargin = $(window).height() / 3,
                sectionOffset = reqSection.offset().top;
            $('body, html').animate({
                'scrollTop' : sectionOffset - 100
	        });
	    };

	return {
		init: init
	}

})();

blogMenu.init();