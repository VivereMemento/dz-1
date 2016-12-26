var contactMe = (function () {

	var init = function () {
		_setUpListners();
	};

	var inputForm = $('.form__input'),
		iconWrap = $('.form__input__icon'),
		iconForm = $('.form__icons_color');

	var _setUpListners = function () {
			$('#contact-me').on('submit', _submitForm);
			inputForm.on('focus', _focusForm);
			inputForm.on('focusout', _unfocusForm);
		};

	var _submitForm = function(e) {
		e.preventDefault();

		var form = $(this),
			url = 'contactme.php',
			defObj = _ajaxForm(form, url);
	}

	var _focusForm = function(e) {
		e.preventDefault();

		iconWrap.addClass('form__input-icon_bordre_green-js');
		iconForm.addClass('form__icons_color_green');
	}

	var _unfocusForm = function(e) {
		e.preventDefault();

		iconWrap.removeClass('form__input-icon_bordre_green-js');
		iconForm.removeClass('form__icons_color_green');
	}

	var _ajaxForm = function(form, url){
		if(!myValidation.validateForm(form)) return false;
	};
		
	return {
		init: init
	}

})();

contactMe.init();