var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');

router.use('/', function(req, res, next) {

    var estimatenum = req.body.estimate;
    console.log('estimate:' +estimatenum);

    selectquer = 'SELECT CASE_ID FROM live_table WHERE CUST_EST_NO LIKE \'' +estimatenum +'\';';
    console.log(selectquer);

    pool.query(selectquer, function (err, rows) {
        if (err) {
            console.log('error in select query');
            throw err;
        } else {
            res.cookie('cases', rows);
            console.log('our new cookie: ' +req.cookies.cases);

            res.send('success');
        }
    });

});

module.exports = router;