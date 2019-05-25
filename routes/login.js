var express = require('express');
var router = express.Router();
//TODO
/* GET home page. */

var CLIENT_ID = "78e0d3578db374d987f7"
router.get('/', function (req, res, next) {

    req.session = {
        some: 'some'
    };
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=http://localhost:3000/validate&allow_signup=true`)
});

module.exports = router;