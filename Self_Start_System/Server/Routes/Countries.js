var express = require('express');
var router = express.Router();
var Countries = require('../Models/Country');

router.route('/')
    .post(function (request, response) {
        Countries.add(request.body).then(function(country){
            response.json({country: country});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .get(function (request, response) {
        Countries.getAll().then(function(countries){
            response.json({country: countries});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

router.route('/:country_id')
    .get(function (request, response) {
        if (!request.params.country_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Countries.getOne(request.params.country_id).then(function(country){
            response.json({country: country});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        if (!request.params.country_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Countries.update(request.params.country_id, request.body).then(function(country){
            response.json({country: country});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (request, response) {
        if (!request.params.country_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Countries.deleteOne(request.params.country_id).then(function(country){
            response.json({success: true, message: 'country deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;

