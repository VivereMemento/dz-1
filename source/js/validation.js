var myValidation = (function () {

	var init = function () {
		_setUpListners();
	};

	var inputForm = $('.form__input'),
		iconWrap = $('.form__input__icon'),
		iconForm = $('.form__icons_color');

	var _setUpListners = function () {
			$('form').on('reset', _clearForm);
			$('form').on('keydown', _clearForm);
			$(document).on('click', _clearDocument);
		};


	var _clearForm = function(event) {
			var form = $(this);

			form.find('input, textarea').trigger('hideTooltip');
			iconWrap.removeClass('form__input-icon_bordre_red-js');
			$('.form__icons_color').removeClass('form__icons_color_red');
			inputForm.removeClass('form__input_border-js');
		};

	var _clearDocument = function() {

			var target = $( event.target ),
				notTarget = $('.login-wrap').not('form');

			if(target.is(notTarget) || target.is('.form__btn-link_mods')) {
				$('form').find('input, textarea').trigger('hideTooltip');
				iconWrap.removeClass('form__input-icon_bordre_red-js');
				iconForm.removeClass('form__icons_color_red');
				inputForm.removeClass('form__input_border-js');
			}
	}

	var _createQtip = function(element, position) {

		element.qtip ({
			content: {
				text: function() {
					return $(this).attr('qtip-content');
				}
			},
			show: {
				event: 'show'
			},
			hide: {
				event: 'hideTooltip'
			},
			position: {
				my: 'top center',
				at: 'bottom center'
			},
			style: {
				classes: 'qtip-mystyle',
			}
		}).trigger('show');
	};

	var validateForm = function(form){

		var elements = form.find('input, textarea').not('input[type="file"], input[type="hidden"]'),
			valid = true;

		$.each(elements, function(index, val){
			var element = $(val),
				val = element.val(),
				pos = element.attr('qtip-position');

			if(val.length === 0) {
				iconWrap.addClass('form__input-icon_bordre_red-js');
				iconForm.addClass('form__icons_color_red');
				inputForm.addClass('form__input_border-js');
				_createQtip(element, pos);
				valid = false;
			}
		});

		return valid;
	};
		
	return {
		init: init,
		validateForm: validateForm
	}

})();

myValidation.init();