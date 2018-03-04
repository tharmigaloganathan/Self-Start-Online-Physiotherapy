var express = require('express');
var router = express.Router();

var multer = require('multer');
// set the directory for the uploads to the uploaded to
var DIR = './uploads';
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({dest: DIR}).single('photo');

var path = require('path')

router.route('/')
  .get(function (request, response) {
    // Payments.getAll().then(function(payments){
    //   response.json({payment: payments});
    // }).catch(function(err){
    //   response.json({success: false, message: err});
    // })
    console.log("Hello");
    response.json({success: true, message: "Success!"})
  })
  .post(function (request, response) {
    let path = '';
    upload(request, response, function (err) {
      if (err) {
        // An error occurred when uploading
        console.log(err);
        return response.json({success: false, message: err});
      }
      // No error occured
      path = request.file.path;
      response.json({success: true, path: path})
    });
  });


router.route('/:object_id')
  .get(function (request, response) {
    if (!request.params.object_id) {
      response.json({success: false, message: 'id was not provided'});
    }

    response.sendFile(path.resolve('./uploads/'+request.params.object_id));
  });
  // .delete(function (req, response) {
  //   if (!request.params.object_id) {
  //     response.json({success: false, message: 'id was not provided'});
  //   }
  //   Payments.deleteOne(request.params.object_id).then(function(payment){
  //     response.json({success: true, message: 'payment deleted!'});
  //   }).catch(function(err){
  //     response.json({success: false, message: err});
  //   })
  // });

module.exports = router;
