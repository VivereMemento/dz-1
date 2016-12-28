(function(){
	var formValidate = {

		doit: function() {
			this.listeners();
		},

		listeners: function() {
			$('#contact-me').on('submit', formValidate.mailme);
			$('#login-form').on('submit', formValidate.loginValid);
			$('.form__input').on('focus', formValidate.focused);
			$('.form__input').on('focusout', formValidate.unfocused);
		},

		focused: function() {
			$this = $(this)
			formGroup = $this.closest('.form__input-item'),
			labelGroup = formGroup.find('.form__input-icon')
			iconGroup = formGroup.find('.icons');

			formGroup.addClass('input-focused');
			labelGroup.addClass('label-focused');
			iconGroup.addClass('icon-focused');
			labelGroup.removeClass('label-error');
			iconGroup.removeClass('icon-error');
		},

		unfocused: function() {
			$this = $(this)
			formGroup = $this.closest('.form__input-item'),
			labelGroup = formGroup.find('.form__input-icon');

			formGroup.removeClass('input-focused');
			labelGroup.removeClass('label-focused');
			iconGroup.removeClass('icon-focused');
		},

		loginValid: function(e) {
			e.preventDefault();
			var form = $(this);
			if ( formValidate.valid(form) === false ) return false;
		},

		mailme: function(e) {
			e.preventDefault();
			var form = $(this);
			if ( formValidate.valid(form) === false ) return false;

			var from,email,message,data;
			var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
			from=$("#mail-name").val();
			email=$("#mail-email").val();
			message=$("#mail-message").val();
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
		},

		valid: function(form) {
			var inputs = form.find('input, textarea'),
				labels = form.find('.form__input-icon'),
				icons = form.find('.icons'),
				checks = form.find('input:checkbox, input:radio'),
				checksOk = form.find('input:checked'),
				valid = true;

			$.each(inputs, function(index, val) {
				var input = $(val),
				val = input.val(),
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

	}

	formValidate.doit();
}());