var express = require('express');
var router = express.Router();
var Cities = require('../Models/City');

router.route('/')
    .post(function (request, response) {
        Cities.add(request.body.city).then(function(city){
            response.json({city: city});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .get(function (request, response) {
        Cities.getAll().then(function(cities){
            response.json({city: cities});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

router.route('/:city_id')
    .get(function (request, response) {
        if (!req.params.city_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        Cities.getOne(request.params.city_id).then(function(city){
            response.json({city: city});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        if (!req.params.city_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        Cities.update(request.params.city_id, request.body.city).then(function(city){
            response.json({city: city});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (req, res) {
        if (!req.params.city_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        Cities.deleteOne(request.params.city_id).then(function(city){
            res.json({success: true, message: 'city deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;

