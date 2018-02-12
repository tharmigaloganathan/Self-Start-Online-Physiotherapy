var express = require('express');
var router = express.Router();
var Countries = require('../Models/Country');

router.route('/')
    .post(function (request, response) {
        Countries.add(request.body.country).then(function(country){
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

router.route('/:administrator_id')
    .get(function (request, response) {
        Countries.getOne(request.params.country_id).then(function(country){
            response.json({country: country});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        Countries.update(request.params.country_id, request.body.country).then(function(country){
            response.json({country: country});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (req, res) {
        Countries.deleteOne(request.params.country_id).then(function(country){
            res.json({success: true, message: 'country deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;

