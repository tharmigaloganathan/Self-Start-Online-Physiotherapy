var express = require('express');
var router = express.Router();
var Physiotherapists = require('../Models/Physiotherapist');

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

router.route('/:object_id')
    .get(function (request, response) {
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Physiotherapists.getOne(request.params.object_id).then(function(physiotherapist){
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
    Physiotherapists.addFreeTimeSlot(request.params.object_id, request.body).then(function(physiotherapist){
      response.json({physiotherapist: physiotherapist});
    }).catch(function(err){
      response.json({success: false, message: err});
    })
  })
  // .get(function (request, response) {
  //   Physiotherapists.getFreeTimeSlot.then(function(timeSlots){
  //     response.json({physiotherapist: physiotherapists});
  //   }).catch(function(err){
  //     response.json({success: false, message: err});
  //   })
  // })
;

module.exports = router;
