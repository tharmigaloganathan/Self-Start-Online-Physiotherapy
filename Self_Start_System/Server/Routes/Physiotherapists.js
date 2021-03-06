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
router.route('/getEmail/:physio_id')
    .get (function (req, res) {
        if (!req.params.physio_id) {
            res.json({success: false, message: 'physio ID was not provided'});
        }
        Physiotherapists.getOne(req.params.physio_id).then(function(physiotherapist){
            console.log("retreived profile: ", physiotherapist);
            res.json({success: true, email: physiotherapist.email});
        }).catch(function(err){
            res.json({success: false, message: err});
        });
    })
//middleware for every route below this one
router.use(function (req, res, next) {
    console.log('in authentication middleware');
    const token = req.headers.authorization;


    if (!token) {
        res.json({success: false, message: 'No token provided'}); // Return error
    } else {
        // Verify the token is valid
        jwt.verify(token, config.secret, function (err, decoded) {
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

router.route('/')
    .get(function (request, response) {
        Physiotherapists.getAll().then(function(physiotherapists){
            response.json({physiotherapist: physiotherapists});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

router.route('/ActiveProfile')
    .get(function (req, res) {
        console.log("in physiotherapist profile get by ActiveProfile");
        if (!req.decoded.profileID) {
            res.json({success: false, message: 'physio profile ID was not provided'});
        }
        Physiotherapists.getOne(req.decoded.profileID).then(function(physiotherapist){
            console.log("retrieved profile: ", physiotherapist);
            if (!physiotherapist){
                res.json({success: false, message: 'physiotherapist not found'});
            } else {
                res.json({success: true, physiotherapist: physiotherapist});
            }
        }).catch(function(err){
            console.log(err);
        });
    })
    .put(function (req, res) {
        if (!req.decoded.profileID) {
            res.json({success: false, message: 'physio profile ID was not provided'});
        }
        Physiotherapists.update(req.decoded.profileID, req.body).then(function(physiotherapist){
            res.json({success: true, physiotherapist: physiotherapist});
        }).catch(function(err){
            res.json({success: false, message: err});
        })
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

router.route('/get-all-appointments/:object_id')
  .get(function (request, response) {
    if (!request.params.object_id) {
      response.json({success: false, message: 'id was not provided'});
    }
    Physiotherapists.getAllAppointments(request.params.object_id).then(function(appointments){
      response.json({appointments: appointments});
    }).catch(function(err){
      response.json({success: false, message: err});
    })
  });

module.exports = router;
