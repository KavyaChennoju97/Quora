var express = require('express');
var router = express.Router();
var kafka = require('../routes/kafka/client');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './uploads');
      },
      filename: (req, file, cb) => {
        const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
        
        cb(null, newFilename);
      },
    });
    const upload = multer({ storage });


// Set up middleware
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});


router.route('/addtagline').post( function (req, res) {

  console.log("In addtagline Route");
  console.log(req.body);
  //user_name
  //tagline

  kafka.make_request('profile_topics',{"path":"addtagline", "body": req.body}, function(error,result){
    if (error) {
      console.log(error);
      console.log("Question not found");
      res.status(400).json({responseMessage: 'Question not found'});
    } else {
      console.log("Question Found");
      
      res.writeHead(200, {'content-type':'application/json'});
      res.end(JSON.stringify(result.result));
    }
  })
});
router.route('/addprofilepic').post(upload.single('selectedFile'), (req, res) => {
 console.log(req.file.filename)
  res.send();
});

  router.route('/getprofileinfo').post( function (req, res) {

    console.log("In addprofilepic Route");
    console.log(req.body);
    //user_name
    
    kafka.make_request('profile',{"path":"getprofileinfo", "body": req.body}, function(error,result){
      if (error) {
        console.log(error);
        console.log("Question not found");
        res.status(400).json({responseMessage: 'Question not found'});
      } else {
        console.log("Question Found");
        
        res.writeHead(200, {'content-type':'application/json'});
        res.end(JSON.stringify(result.result));
      }
    })
  });

module.exports = router;