var express = require('express');
var router = express.Router();
var captchapng = require('captchapng');
router.get('/captcha',function (req, res, next) {
    var captcha = parseInt(Math.random()*9000+1000);
    var p = new captchapng(80,30,captcha); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    req.session.captcha = captcha;
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
});
module.exports = router;
