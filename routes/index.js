var express = require('express');
var router = express.Router();

var counter = 0;
/* GET home page. */
router.get('/', function(req, res) {
  console.log("counter", counter++);
  res.render('index', { title: 'Express' });
});

router.get('/hello', function(req, res){
  console.log("counter", counter++);
  res.render('greet',{title:'Welcome'});
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    console.log("counter", counter++);
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    console.log("counter", counter++);
    res.render('newuser', { title: 'Add New User' });
});


/* POST to Add User Service */
router.post('/adduser', function(req, res) {
    console.log("counter", counter++);
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});
module.exports = router;
