var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.userId) {
    res.status(200);
    res.send();
  } else {
    res.status(401);
    res.send('NOT_AUTH');
  }
});

module.exports = router;