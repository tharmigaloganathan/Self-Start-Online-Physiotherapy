var express = require('express');
var router = express.Router();
var PatientProfiles = require('../Models/PatientProfile');
var UserAccounts = require('../Models/UserAccount');
var Treatments = require('../Models/Treatment');
var RehabilitationPlans = require('../Models/RehabilitationPlan');
//for tokens & verification & login sessions
const jwt = require('jsonwebtoken');
const config = require('../Config/Database');

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


router.route('/')
    .post(function (request, response) {
        console.log ("within the PatientProfile route POST")
        PatientProfiles.add(request.body).then(function(patientProfile){
            console.log ("Profile successfully made: ", patientProfile);
            response.json({patientProfile: patientProfile});
        }).catch(function(err){
            response.json({success: false, message: err});
            console.log("error from backend: ", err);
        })
    })
    .get(function (request, response) {
        PatientProfiles.getAll().then(function(patientProfiles){
            response.json({patientProfile: patientProfiles});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

router.route('/ActiveProfile')
    .get(function (req, res) {
        console.log("in patient profile get by ActiveProfile");
        if (!req.decoded.profileID) {
            res.json({success: false, message: 'patient profile ID was not provided'});
        }
        PatientProfiles.getOne(req.decoded.profileID).then(function(patientProfile){
            console.log("retrieved profile: ", patientProfile);
            if (!patientProfile) {
                res.json({success: false, message: 'patient not found'});
            } else {
                res.json({success: true, patientProfile: patientProfile});
            }
        }).catch(function(err){
            console.log(err);
        });
    })
    .put(function (req, res) {
        if (!req.decoded.profileID) {
            res.json({success: false, message: 'patient profile ID was not provided'});
        }
        PatientProfiles.update(req.decoded.profileID, req.body).then(function(patientProfile){
            res.json({success: true, patientProfile: patientProfile});
        }).catch(function(err){
            res.json({success: false, message: err});
        })
    });
    // .delete(function (req, res) { //kept as original
    //     if (!req.params.patientprofile_id) {
    //         res.json({success: false, message: 'patient profile idid was not provided'});
    //     }
    //     PatientProfiles.deleteOne(req.params.patientprofile_id).then(function(patientProfile){
    //         res.json({success: true, message: 'patientProfile deleted!'});
    //     }).catch(function(err){
    //         res.json({success: false, message: err});
    //     })
    // });

router.route('/:patientProfile_id')
    .get(function (req, res) {
        console.log("in patient profile get by ID route");
        if (!req.params.patientProfile_id) {
            res.json({success: false, message: 'patient profile ID was not provided'});
        }
        PatientProfiles.getOne(req.params.patientProfile_id).then(function(patientProfile){
            console.log("retreived profile: ", patientProfile);
            res.json({success: true, patientProfile: patientProfile});
        }).catch(function(err){
            res.json({success: false, message: err});
        });
    })
    .put(function (req, res) {
        if (!req.params.patientProfile_id) {
            res.json({success: false, message: 'patient profile ID was not provided'});
        }
        PatientProfiles.update(req.params.patientProfile_id, req.body).then(function(patientProfile){
            res.json({success: true, patientProfile: patientProfile});
        }).catch(function(err){
            res.json({success: false, message: err});
        })
    })
    .delete(function (req, res) { //kept as original
        if (!req.params.patientProfile_id) {
            res.json({success: false, message: 'patient profile idid was not provided'});
        }
        PatientProfiles.deleteOne(req.params.patientProfile_id).then(function(patientProfile){
            res.json({success: true, message: 'patientProfile deleted!'});
        }).catch(function(err){
            res.json({success: false, message: err});
        })
    });

router.route('/add-appointment/:patientprofile_id')
  .post(function (request, response) {
    if (!request.params.patientprofile_id) {
      response.json({success: false, message: 'id was not provided'});
    }
    PatientProfiles.addAppointment(request.params.patientprofile_id, request.body).then(function(patientProfile){
      response.json({patientProfile: patientProfile});
    }).catch(function(err){
      response.json({success: false, message: err});
    })
  });

router.route('/delete-appointment/:patientprofile_id')
  .post(function (request, response) {
    if (!request.params.patientprofile_id) {
      response.json({success: false, message: 'id was not provided'});
    }
    PatientProfiles.deleteAppointment(request.params.patientprofile_id, request.body).then(function(patientProfile){
      response.json({patientProfile: patientProfile});
    }).catch(function(err){
      response.json({success: false, message: err});
    })
  });

router.route('/get-all-appointments/:patientprofile_id')
  .get(function (request, response) {
    if (!request.params.patientprofile_id) {
      response.json({success: false, message: 'id was not provided'});
    }
    PatientProfiles.getAllAppointments(request.params.patientprofile_id).then(function(appointments){
      response.json({appointments: appointments});
    }).catch(function(err){
      response.json({success: false, message: err});
    })
  });

router.route('/complete-intake-form/:patientprofile_id')
  .put(function (req, res) {
    if (!req.params.patientprofile_id) {
      res.json({success: false, message: 'patient profile ID was not provided'});
    }
    PatientProfiles.completeIntakeForm(req.params.patientprofile_id, req.body).then(function(patientProfile){
      res.json({success: true, patientProfile: patientProfile});
    }).catch(function(err){
      res.json({success: false, message: err});
    })
  })
  .get((req, res)=>{
    if (!req.params.patientprofile_id) {
      res.json({success: false, message: 'patient profile ID was not provided'});
    }
    PatientProfiles.viewIntakeForm(req.params.patientprofile_id).then(function(intakeFormQuestionsAndAnswers){
      res.json({success: true, intakeFormQuestionsAndAnswers: intakeFormQuestionsAndAnswers});
    }).catch(function(err){
      res.json({success: false, message: err});
    })
  });

module.exports = router;
