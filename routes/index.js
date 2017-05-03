var express = require('express');
var router = express.Router();
var connection = require('../model/mysql');

/* GET home page. */
router.get('/', function (req, res, next) {
    var sql = "SELECT * FROM question limit 10";
    var promise = new Promise(function (resolve, reject) {
        connection.query(sql, function (error, result) {
            if (error) throw error;
            console.log(result);
            resolve(result);

        });
    });

    promise.then(function (data) {
        var sql = "select * from question where reward>0 limit 10";
        connection.query(sql, function (error, result) {
            if (error) throw error;
            res.render('index', {newQuestion: data, rewardQuestion: result})
        });
    });
});
//login
router.get('/login', function (req, res, next) {
    res.render('login');
});
//GET question page
router.get('/question', function (req, res, next) {
    res.render('question');
});
//GET create question page
router.get('/questioncreate', function (req, res, next) {
    res.render('questioncreate');
});
// GET question detail page
router.get('/questiondetail/:questionId', function (req, res, next) {
    var questionId = req.params.questionId;
    var promise = new Promise(function (resolve, reject) {
        var sql = "select * from question where id=" + questionId;
        connection.query(sql, function (error, result) {
            if (error) throw error;
            resolve(result[0]);
        });
    });

    promise.then(function (data) {
        var sql = "select * from answer where questionId=" + questionId + " limit 1";
        connection.query(sql, function (error, result) {
            if (error) throw error;
            res.render('questiondetail', {question: data, answer: result[0]});
        });
    });


});
// GET register page
router.get('/register', function (req, res, next) {
    res.render('register');
});
//GET topic page
router.get('/topic', function (req, res, next) {
    res.render('topic');
});
//GET topics page
router.get('/topics', function (req, res, next) {
    var sql = "select topicName,introduction,follows from topics order by follows desc";
    connection.query(sql, function (error, result) {
        if (error) throw error;
        res.render('topics', {topicList: result});
    });

});
//store question page
router.post("/question/store", function (req, res, next) {
    res.json({body: req.body, query: req.query});
});
//load tags
router.get('/ajax/loadTags', function (req, res, next) {
    /*var word = req.query.word;
     var sql = "select topicName from topics where topicName like '%"+word+"%'";
     connection.query(sql,function (error, result) {
     if(error) throw error;
     res.json(result);
     })*/
    res.json({results: ["java", "大数据", "python"]});
});
//GET forget password page
router.get('/forget', function (req, res, next) {
    res.render('forgetPassword');
});

//ajax add myFollow
router.post('/ajax/addFollow', function (req, res) {
    if (!req.session.userName) {
        res.json({isSuccess: false, message: "你还未登录"});
        return;
    }
    var questionId = req.body.questionId;
    var promise = new Promise(function (resolve, reject) {
        var sql = "select myFollow from users where username='" + req.session.userName + "'";
        connection.query(sql, function (error, result) {
            if (error) throw error;
            console.log(result[0]);
            var follow = null;
            if (result[0].myFollow) {
                follow = JSON.parse(result[0].myFollow);
            } else {
                follow = {"follows": []};
            }
            follow.follows.push(questionId);
            var followStr = JSON.stringify(follow);
            resolve(followStr);
        });
    });

    var promise = promise.then(function (str) {
        var sql = "update users set myFollow='" + str + "' where username='" + req.session.userName + "'";
        connection.query(sql, function (error, result) {
            if (error) throw error;
            if (result.affectedRows) {
                return result.affectedRows;
            } else {
                return 0;
            }
        });
    });

    promise.then(function (rows) {
        if (rows > 0) {
            var sql = "update question set follow=follow+1 where id=" + questionId;
            res.json({isSuccess: true, message: sql});
        } else {
            res.json({isSuccess: false, message: "关注失败"});
        }
    });

});

module.exports = router;
