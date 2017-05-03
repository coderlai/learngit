var express = require('express');
var router = express.Router();
var util = require('../util');
var nodemailer = require('nodemailer');
var connection = require('../model/mysql');


router.post('/users/login', function (req, res, next) {
    console.log(req.body);
    var email = req.body.email;
    var password = req.body.password;
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if (!reg.test(email)) {
        res.json({isSuccess: false, message: "邮箱格式有误"});
    } else if (password.length < 6) {
        res.json({isSuccess: true, message: "密码不能少于6个字符"});
    } else {
        var sql = "select * from users where email='" + util.md5(email) + "' AND password='" + util.md5(password) + "'";
        connection.query(sql, function (error, result) {
            if (error) throw error;
            console.log(result);
            if (result.length == 1) {
                req.session.userName = result[0].username;
                res.json({isSuccess: true, message: "登录成功"});
            } else {
                res.json({isSuccess: false, message: "邮箱或密码有误"});
            }
        });

    }
});

router.post('/users/register', function (req, res, next) {
    var user = req.body;
    console.log(user);
    var username = user.username;
    var password = user.password;
    var email = user.email;


    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if (username.length < 6 || username.length > 20) {
        res.json({isSuccess: false, message: '用户名应在6~20个字符之间'})
    } else if (password.length < 6) {
        res.json({isSuccess: false, message: '密码不能少于6个字符'});
    } else if (!reg.test(email)) {
        res.json({isSuccess: false, message: '邮箱格式不正确'});
    } else {
        var promise = new Promise(function (resolve, reject) {
            var sql = "select * from users where email='" + util.md5(email) + "'";
            connection.query(sql, function (error, result) {
                if (error) throw error;
                console.log(result.length);
                resolve(result.length > 0);
            });
        });
        promise.then(function (value) {
            if (!value) {
                var sql = "INSERT INTO users(username,email,password) values('" + username + "','" + util.md5(email) + "','" + util.md5(password) + "')";
                connection.query(sql, function (error, result) {
                    if (error) throw error;
                    console.log(result);
                    res.json({isSuccess: true, message: '注册成功'})
                });
            } else {
                res.json({isSuccess: false, message: '该邮箱已被注册'});
            }
        })
    }

});

router.post('/users/getPass', function (req, res, next) {
    var email = req.body.email;
    var captcha = req.body.captcha;
    if(!(captcha == req.session.captcha)){
        res.json({isSuccess:false,message:'验证码输入错误'});
    }
    var sql = "select * from users where email='" + util.md5(email) + "'";
    var promise = new Promise(function (resolve, reject) {
        connection.query(sql, function (error, result) {
            if (error) throw error;
            if (result.length === 1) {
                resolve();
            } else {
                reject();
            }
        });
    });

    promise.then(function () {
        var random = parseInt(Math.random() * 10000000) + "";
        //res.json({message:"该邮箱存在"});
        var sql = "update users set password='" + util.md5(random) + "' where email='" + util.md5(email) + "'";
        connection.query(sql, function (error, result) {
            //res.json({message:value});
            if (result.affectedRows === 1) {
                var option = {
                    from: "程序员问答网站 👻<18321947408@163.com>",
                    to: email,
                    subject: "找回密码",
                    html: "<h3>亲爱的用户：</h3><p>你的临时登录密码为：<strong>" + random + "</strong>,请尽快修改密码。</p>"
                };
                var transporter = nodemailer.createTransport({
                    host: "smtp.163.com",
                    secureConnection: true,
                    port: 465,
                    auth: {
                        user: '18321947408@163.com',
                        pass: '215109LHQ'
                    }
                });
                transporter.sendMail(option, function (error, response) {
                    if (error) {
                        console.log("fail: " + error);
                        res.json({isSuccess: false, message: "找回密码失败"});
                    } else {
                        console.log("success: " + response.message);
                        res.json({isSuccess: true, message: "我们已将你的临时登录密码发至你的邮箱，请注意查收。"});
                    }
                });
            } else {
                res.json({isSuccess: false, message: "找回密码失败"});
            }
        }, function () {
            res.json({isSuccess: false, message: "邮箱不存在"});
        });
    });
});

router.get('/users/logout',function (req, res, next) {
    delete req.session.userName;
    res.redirect('/');
});

module.exports = router;
