var express = require('express');
var router = express.Router();
var sqlUtil = require('../utils/sql');


router.post('/', function (req, res, next) {
  console.log(req.body);
  var id = req.body.id;
  var query = `SELECT * from comment where parent = ${id};`
  sqlUtil.run(query, function (result, err) {
    if (!err) {
      res.json(result);
    } else {
      res.status(400);
      res.json('BAD_REQUEST')
    }
  })
});

module.exports = router;