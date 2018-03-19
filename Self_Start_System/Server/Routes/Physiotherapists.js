var express = require('express');
var router = express.Router();
var Physiotherapists = require('../Models/Physiotherapist');
//for tokens & verification & login sessions
const jwt = require('jsonwebtoken');
const config = require('../Config/Database');

router.route('/')
    .post(function (request, response) {
        Physiotherapists.add(request.body).then(function(physiotherapist){
            response.json({physiotherapist: physiotherapist});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .get(function (request, response) {
        Physiotherapists.getAll().then(function(physiotherapists){
            response.json({physiotherapist: physiotherapists});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });
//middleware for every route below this one
router.use(function (req, res, next) {
    console.log('in authentication middleware');
    console.log(req.headers['authorization']);
    const token = req.headers.authorization;

    console.log('token: ', token);

    if (!token) {
        res.json({success: false, message: 'No token provided'}); // Return error
    } else {
        // Verify the token is valid
        jwt.verify(token, config.secret, function (err, decoded) {
            console.log(decoded);
            if (err) {
                res.json({success: false, message: 'Token invalid: ' + err}); // Return error for token validation
            } else {
                req.decoded = decoded; // Create global variable to use in any request beyond
                console.log('authentication middleware complete!');
                next(); // Exit middleware
            }

        })
    }
});

router.route('/:object_id')
    .get(function (request, response) {
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Physiotherapists.getOne(request.params.object_id).then(function(physiotherapist){
            console.log("retreived profile: ", physiotherapist);
            response.json({physiotherapist: physiotherapist});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Physiotherapists.update(request.params.object_id, request.body).then(function(physiotherapist){
            response.json({physiotherapist: physiotherapist});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (request, response) {
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Physiotherapists.deleteOne(request.params.object_id).then(function(physiotherapist){
            response.json({success: true, message: 'physiotherapist deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

router.route('/free-time/:object_id')
  .put(function (request, response) {
    if (!request.params.object_id) {
      response.json({success: false, message: 'id was not provided'});
    }
    console.log("Free time", request.body);
    Physiotherapists.addFreeTimeSlot(request.params.object_id, request.body).then(function(physiotherapist){
      response.json({physiotherapist: physiotherapist});
    }).catch(function(err){
      response.json({success: false, message: err});
    })
  });

router.route('/free-time/change-one-date/:object_id')
  .put(function (request, response) {
    if (!request.params.object_id) {
      response.json({success: false, message: 'id was not provided'});
    }
    console.log("change one date", request.body);
    Physiotherapists.changeOneDate(request.params.object_id, request.body).then(function(physiotherapist){
      response.json({physiotherapist: physiotherapist});
    }).catch(function(err){
      response.json({success: false, message: err});
    })
  });

router.route('/free-time/delete-one-date/:object_id')
  .put(function (request, response) {
  if (!request.params.object_id) {
    response.json({success: false, message: 'id was not provided'});
  }
  Physiotherapists.deleteOneDate(request.params.object_id, request.body).then(function(physiotherapist){
    response.json({physiotherapist: physiotherapist});
  }).catch(function(err){
    response.json({success: false, message: err});
  })
});

module.exports = router;
