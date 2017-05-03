/*
 var connection = require('./mysql');
 var crypto = require('crypto');
 connection.query("select * from users",function (error, result) {
 if(error) throw error;
 console.log(result.length);
 });


 console.log(md5('123321'));
 console.log(md5('some text'));


 function md5(data){
 var result = crypto.createHash('md5').update(data).digest("hex");
 return result;
 }*/


/*var nodemailer = require('nodemailer');

 // create reusable transporter object using the default SMTP transport
 var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
 user: '215668636lai@gmail.com',
 pass: '215109LHQ...//'
 }
 });

 // setup email data with unicode symbols
 var mailOptions = {
 from: '"Qing 👻" <215668636lai@gmail.com>', // sender address
 to: '215668636@qq.com', // list of receivers
 subject: 'test  ✔', // Subject line
 text: 'Hello world ?', // plain text body
 html: '<b>Hello world ?</b>' // html body
 };

 // send mail with defined transport object
 transporter.sendMail(mailOptions, function(error, info){
 if (error) {
 return console.log(error);
 }
 console.log('Message %s sent: %s', info.messageId, info.response);
 });


 var nodemailer = require('nodemailer');
 //配置邮件
 var transporter = nodemailer.createTransport({
 host: "smtp.163.com",
 secureConnection: true,
 port:465,
 auth: {
 user: '18321947408@163.com',
 pass: '215109LAI'
 }
 });
 //发送邮件
 var sendmail = function(html){
 var option = {
 from:"18321947408@163.com",
 to:"215668636@qq.com",
 subject:"hello Qing",
 html:html
 };
 transporter.sendMail(option, function(error, response){
 if(error){
 console.log("fail: " + error);
 }else{
 console.log("success: " + response.message);
 }
 });
 };
 //调用发送邮件
 sendmail("邮件内容：<br/>这是来自nodemailer发送的邮件！Qing");


 */

var connection = require('./mysql');
var util = require('../util');
/*var sql ="select * from users where email='"+util.md5('215668636@qq.com')+"'";
 connection.query(sql,function (error, result) {
 if(error) throw error;
 console.log(result);
 });

 section.topic-list-item.col-md-3
 .widget-topic
 h2.h4
 a(href=#{topic.topicName}) #{topic.topicName}
 p  #{topic.introduction}
 .widget-topic-action
 button.btn.btn-default.btn-xs.followTopic.mr-5(type='button', data-source_type='tag', data-source_id='2', data-show_num='false', data-toggle='tooltip', data-placement='right', title='', data-original-title='关注后将获得更新提醒') 关注
 strong.follows #{topic.follows}
 span.text-muted 关注







 */

var userList = [
    {username: "之首道", coins: 6323},
    {username: "Leon", coins: 6109},
    {username: "柯南@￥", coins: 3082},
    {username: "小石头", coins: 2874},
    {username: "小火影", coins: 2130},
    {username: "wenjin", coins: 1350},
    {username: "zoe", coins: 1106},
    {username: "symlich", coins: 984},
    {username: "咕咚", coins: 457},
    {username: "admin", coins: 454}
];

/*
var promise = new Promise(function (resolve, reject) {
    var sql = "INSERT INTO users(username,email,password,coins) values('" + userList[0].username + "','" + util.md5("1@qq.com") + "','" + util.md5('123456') + "',"+userList[0].coins+")";
    connection.query(sql, function (error, result) {
        if (error) throw error;
        resolve(1);
    })
});

for (var i = 1; i < userList.length; i++) {
    promise = (function (promise,i) {
        var promise = promise.then(function (value) {
            var sql = "INSERT INTO users(username,email,password,coins) values('" + userList[i].username + "','" + util.md5((i+1)+"@qq.com") + "','" + util.md5('123456') + "',"+userList[i].coins+")";
            connection.query(sql, function (error, result) {
                if (error) throw error;
                console.log(i,result);
                return i++;
            })
        });
        return promise;
    })(promise,i);
}
*/

/*
var sql = "select username,coins from users order by coins desc limit 0,10";
connection.query(sql,function (error,result) {
    if(error) throw error;
    console.log(result);
});
*/


var sql = "select topicName,introduction,follows from topics order by follows desc";
connection.query(sql,function (error, result) {
    if(error) throw error;
    console.log(result);
});






