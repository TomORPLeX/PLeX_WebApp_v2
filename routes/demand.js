var express = require('express');
var router = express.Router();
var pool = require('../bin/db.js');
var loginfunction = require("../bin/login.js");
var fs = require('fs');


/* GET SQL data. */
var obj = {};

var quer1 = "SELECT * FROM live_workstack LIMIT 10";
var quer2 = "SELECT DISTINCT om_ouc FROM live_workstack";

router.get('/', loginfunction.isLoggedIn, function(req, res) {
    var tempfilelocation = '../public/data/' +req.cookies.EIN +'_LatLngData.json';
    var JsonData = JSON.parse(fs.readFileSync(tempfilelocation));
    var selection = JsonData.selection;
    var priorityCount = JsonData.priorityCount;

        pool.query(quer1, function(err,rows)
        {
            if(err)
            {
                console.log("error here");
                throw err;
            } else
            {
                //obj = {db: rows};


                pool.query(quer1, function(err,rows1)
                {
                    if(err)
                    {
                        throw err;
                    } else
                    {
                        pool.query(quer2, function(err,rows2)
                        {
                            if(err)
                            {
                                throw err;
                            } else
                            {
                                obj = {db: rows,
                                    db1: rows1,
                                    ouc: rows2,
                                    selection: selection,
                                    priorityCount: priorityCount,
                                    ein: req.cookies.EIN, 'username': req.cookies.username, 'loginFlag': req.cookies.loginFlag, 'adminFlag': req.cookies.adminFlag, 'cases': req.cookies.cases};
                                res.render('demand', obj);
<<<<<<< HEAD

=======
>>>>>>> af2cf75941ae805192c42e1460e682bd49debc1b
                            }
                        });
                    }
                });
            }
        });

});

module.exports = router;

