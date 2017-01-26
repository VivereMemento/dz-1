var User = require('../models/user').User;
var HttpError = require('../error').HttpError;
var ObjectId = require('mongodb').ObjectId;
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

module.exports = function(app) {
        app.get(['/', '/index.html'], function(req, res, next) {
                res.render("index.pug");
        });

        app.get('/:name', function(req,res){
                res.render(req.params.name + '.pug');
        });

        app.post('/', require('./login').post);

        // ********* mail ********** //

        app.post('/send',function(req,res){
                var transporter = nodemailer.createTransport(smtpTransport({
            service: 'Gmail',
            auth: {
                user: 'pochtovyy.sasha@gmail.com', // my mail
                pass: '0689861583'
            }
        }));

        var mailOptions = {
                from: 'pochtovyy.sasha@gmail.com',
                to: 'pochtovyy.sasha@mail.ru',
                subject: '',
                text: req.body.name + ' ' + req.body.email + ' ' + req.body.message
        }

                transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                                console.log(error);
                                res.end('/works.html');
                        } else {
                                console.log('Message Send: ' + info.response);
                                res.end('/works.html');
                        }
                })
        });

        // ******** USERS ********* //

        var User = require('../models/user').User;
        app.get('/users', function(req, res, next) {
                User.find({}, function(err, users) {
                        if(err) return next(err);
                        res.json(users);
                });
        });

        app.get('/user/:id', function(req, res, next) {
                try {
                        var id = new ObjectId(req.params.id);
                } catch(e) {
                        return next(404);
                }

                User.findById(req.params.id, function(err, user) {
                        if(err) return next(err);
                        if(!user) {
                                next(new HttpError(404, "User not found"));
                        }
                        res.json(user);
                });
        });
};
