var myValidation = (function () {

	var init = function () {
		_setUpListners();
	};



	var _setUpListners = function () {
			$('form').on('reset', _clearForm);
		};

	var _clearForm = function() {
			var form = $(this);

			form.find('input, textarea').trigger('hideTooltip');
		};

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
				classes: 'qtip-mystyle qtip-rounded',
			}
		}).trigger('show');
	};

	var _changeColor = function() {
		$('.form__input__icon').addClass('bordred-js');
		$('.form__icons_color').addClass('colored-js');
	};

	var validateForm = function(form){

		var elements = form.find('input, textarea').not('input[type="file"], input[type="hidden"]'),
			valid = true;

		$.each(elements, function(index, val){
			var element = $(val),
				val = element.val(),
				pos = element.attr('qtip-position');

			if(val.length === 0) {
				_changeColor();
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