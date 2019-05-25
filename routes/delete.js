var express = require('express');
var router = express.Router();
var sqlUtil = require('../utils/sql');
/* GET users listing. */
router.post('/', function (req, res, next) {


    var userId = req.body.userId;
    var commentId = req.body.commentId || req.body.id;


    if (!userId || !commentId) {
        res.status(401);
        res.json({});
    }
    // var query = `SELECT userId FROM comment where id=${commentId};`
    // sqlUtil.run(query, function(result, err){
    //     if(!err){
    //        if(Array.isArray(result) && result.length > 0){
    //            var dbUserId = result[0].userId;
    //            if(dbUserId === userId){
    //             var query = `DELETE from Table FROM comment where id=${commentId};`
    //             sqlUtil.run(query, function(result, err){
    //                 if(!err){
    //                     res.status(201);
    //                     res.send();
    //                 }
    //                 else {
    //                     res.status(500);
    //                     res.send('INTERNAL ERROR')
    //                 }
    //             })
    //            }
    //        }
    //     }
    //     else {
    //         res.status(500);
    //         res.send('INTERNAL ERROR')
    //     }
    // })



    var query = `DELETE FROM comment where id=${commentId} AND userId=\'${userId}\';`
    sqlUtil.run(query, function (result, err) {
        if (!err) {
            res.status(201);
            res.json({});
        } else {
            res.status(400);
            res.json({});
        }
    })

});

module.exports = router;