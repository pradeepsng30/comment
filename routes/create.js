var express = require('express');
var router = express.Router();
var sqlUtil = require('../utils/sql');
/* GET users listing. */
router.post('/', function (req, res, next) {
    req.session = {
        userId: 'myuser'
    };



    var userId = req.body.userId;
    var content = req.body.content;
    var parentId = req.body.parentId;

    if (!userId || !content || !parentId) {
        res.status(401);
        res.send('BAD_REQUEST');
    }

    var query = `INSERT INTO comment (content, userId, parent) VALUES (\"${content}\", \"${userId}\", ${parentId});`
    sqlUtil.run(query, function (result, err) {
        if (!err) {
            console.log('inserted');
            res.status(201);
            res.json({});
        } else {
            res.status(500);
            res.json({})
        }
    })

});

module.exports = router;