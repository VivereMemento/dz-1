var User = require('../models/user').User;
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user')
var async = require('async');

exports.get = function(req, res) {
	res.render('index.pug');
};

exports.post = function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	// 1. Получить посетителя с таким юзернэйм из базы
	// 2. Такой посетитель найден?
	// 	  Да - сверить пароль вызвом user.checkPassword
	//	  Нет - создать нового пользователя
	// 3. Авторизация успешна?
	//	  Да - сохранить _id посетителя в сессии: session.user = user._id и ответить 200
	//	  Нет - вывести ошибку (403 или другую)

	User.authorize(username, password, function(err, user) {
		if(err) {
			if(err instanceof AuthError) {
				return next(new HttpError(403, err.message));
			} else {
				return next(err);
			}
		}

		req.session.user = user._id;
		res.send({});
	});
};