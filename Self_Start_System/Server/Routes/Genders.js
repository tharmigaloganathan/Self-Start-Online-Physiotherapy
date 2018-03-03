var express = require('express');
var router = express.Router();
var Genders = require('../Models/Gender');

router.route('/')
    .post(function (request, response) {
        Genders.add(request.body).then(function(gender){
            response.json({gender: gender});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .get(function (request, response) {
        Genders.getAll().then(function(genders){
            response.json({gender: genders});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

router.route('/:gender_id')
    .get(function (request, response) {
        if (!request.params.gender_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Genders.getOne(request.params.gender_id).then(function(gender){
            response.json({gender: gender});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        if (!request.params.gender_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Genders.update(request.params.gender_id, request.body).then(function(gender){
            response.json({gender: gender});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (request, response) {
        if (!request.params.gender_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Genders.deleteOne(request.params.gender_id).then(function(gender){
            response.json({success: true, message: 'gender deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;

