var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "commenting"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// qry = `SELECT * from post`;
// con.query(qry, function (err, result) {
//     console.log("qry: " + qry);
//     if (err) throw err;
//     console.log("Result: " + result);
//   });

module.exports = {
    run : function(qry, cb){
        con.query(qry, function (err, result) {
            console.log("qry: " + qry);
            cb(result, err);
            console.log("Result: " + result);
          });

    }
}