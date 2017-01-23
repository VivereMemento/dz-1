var formValidate = function(){

	var init = function() {
		_setUpListners();
	};

	var _setUpListners = function() {
		$('#contact-me').on('submit', _mailMe);
		$('#login-form').on('submit', _loginValid);
		$('.form__input').on('focus', _focused);
		$('.form__input').on('focusout', _unfocused);
	};

	var _focused = function() {
		$this = $(this)
		formGroup = $this.closest('.form__input-item'),
		labelGroup = formGroup.find('.form__input-icon')
		iconGroup = formGroup.find('.icons');

		formGroup.addClass('input-focused');
		labelGroup.addClass('label-focused');
		iconGroup.addClass('icon-focused');
		labelGroup.removeClass('label-error');
		iconGroup.removeClass('icon-error');
	};

	var _unfocused = function() {
		$this = $(this)
		formGroup = $this.closest('.form__input-item'),
		labelGroup = formGroup.find('.form__input-icon');

		formGroup.removeClass('input-focused');
		labelGroup.removeClass('label-focused');
		iconGroup.removeClass('icon-focused');
	};

	var _loginValid = function(e) {
		e.preventDefault();
		var form = $(this);
		if ( valid(form) === false ) return false;

		$.ajax({
			url: "/",
			method: "POST",
			data: form.serialize(),
			statusCode: {
				200: function() {
				form.html("Вы вошли на сайт").addClass('alert-success');
				window.location.href = "/auth.html";
				},
				403: function(jqXHR) {
				var error = JSON.parse(jqXHR.responseText);
				$('.error', form).html(error.message);
				}
			}
		});
		return false;
	};

	var _mailMe = function(e) {
		e.preventDefault();
		var form = $(this);
		if ( valid(form) === false ) return false;

		var from,email,message,data;
		var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
		from = $("#mail-name").val();
		email = $("#mail-email").val();
		message = $("#mail-message").val();
		data = form.serialize();
		if(email != ''){
			if(email.search(pattern) == 0){
				$.ajax({
					url: '/send',
					type: 'POST',
					data: data
				})
				.done(function() {
					form.slideUp(200);
					$('.form__btn-wrap').hide();
					$('.form__succes').show();
				})
				.fail(function() {
					form.slideUp(200);
					$('.form__btn-wrap').hide();
					$('.form__error').show();
				})
			} else {
				$('input#mail-email').parents('.form__text').addClass('error');
				$('<span class="tooltip">Некорректрый email</span>').prependTo('.error');
			}
		}
	};

	var valid = function(form) {
		var inputs = form.find('input, textarea'),
			labels = form.find('.form__input-icon'),
			icons = form.find('.icons'),
			checks = form.find('input:checkbox, input:radio'),
			checksOk = form.find('input:checked'),
			valid = true;

		$.each(inputs, function(index, val) {
			var input = $(val),
			val = input.val(),
			resetBtn = $('.resetBtn'),
			formGroup = input.parents('.form__input-item'),
			label = formGroup.find('label').text().toLowerCase(),
			textError = 'Вы не ввели ' + label,
			tooltip = $('<span class="tooltip">' + textError + '</span>');

			if (val.length === 0){
				formGroup.addClass('error');
				labels.addClass('label-error');
				icons.addClass('icon-error');
				tooltip.appendTo(formGroup);
				input.on('focus', function(){
					formGroup.find('.tooltip').remove();
					formGroup.removeClass('error');
					formGroup.removeClass('label-error');
				});
				input.on('keydown', function(){
					formGroup.removeClass('error');
				});
				resetBtn.on('click', function() {
					formGroup.removeClass('error');
					formGroup.find('.tooltip').remove();
				});
				checks.on('change', function(){
					checkGroup.find('.tooltip').remove();
				});
				valid = false;
			}
		});

		var checkGroup = $('.form__checks'),
			tooltip = $('<span class="tooltip">Роботам тут не место</span>');

		if (checks.length > 0) {

			if (checksOk.length < 2) {
				tooltip.appendTo(checkGroup);
				valid = false;
			}
		}
		return valid;
	}
	return {
		init: init
	}
}();

formValidate.init();