var express = require('express');
var router = express.Router();
var Users = require('../model/users');

/* GET users listing. */
router.post('/login', function (req, res, next) {
  console.log("Email : "  + req.body.email)

  Users.findOne({ email: req.body.email }).select('email password').exec(function (err, data) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else if (data && data.password == req.body.password) {      
        res.send({status: 200, "msg": "User logged in successfully" });     
    } else {
      res.status(401).send({ "msg": "Wrong username/password." });
    }
  });
});

router.put('/reset', function (req, res, next) { 
  console.log("Put request.."+req.body.email);

  Users.findOneAndUpdate({ email: req.body.email }, { password: req.body.password }, function (err, result) {
    if (err) { 
      console.log("Errror "+err)           
      res.status(400).send(err);
    } else if (result) {     
      res.send({status: 200, msg: "Password reset successfully."});
    } else {
      res.status(401).send({ msg: "No such user present" })
    }
  });
});

router.post('/signup', function (req, res) {
  
  console.log('email' + req.body.email) 
  if (!req.body.password || !req.body.email) {
    res.status('400').json({ success: false, msg: 'Please pass email and password.'});
  } else {

    var newUser = new Users({
      email: req.body.email,
      password: req.body.password
    });

    Users.findOne({ email: req.body.email }, function (err, data) {
      if (err) {       
        res.status(400).json({ "Error": "Error in sign up." });
      } else if (data) {        
        res.status(409).json({ "Error": "User alreay existing." });
      } else if (!data) {
        newUser.save(function (err, user) {
          if (err) {           
            res.status(400).send(err);
          } else if (user) {            
            res.send({status: 200, msg : 'User Created Successfully' });
          }
        });
      }
    });
  }
});

router.get('/users', function (req, res) {
  Users.find(function (err, users) {
    if (err) {
      res.status(400).send({ "Error": "error while retrieving users" });
    } else if (!users) {
      res.status(200).send({ "Success": "No users found" });
    } else if (users) {
      res.status(200).send(users);
    }
  });
});

router.delete('/users/:userId', function (req, res) { 

  Users.findOneAndRemove({email : req.params.userId}, function(err, data) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else if(data) {   
      res.send({status: 200 , msg: 'User deleted successfully' });
    }    
  });
});

module.exports = router;
