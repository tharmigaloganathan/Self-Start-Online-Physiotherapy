var express = require('express');
var router = express.Router();
var Provinces = require('../Models/Province');

router.route('/')
    .post(function (request, response) {
        Provinces.add(request.body.province).then(function(province){
            response.json({province: province});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .get(function (request, response) {
        Provinces.getAll().then(function(provinces){
            response.json({province: provinces});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

router.route('/:object_id')
    .get(function (request, response) {
        if (!req.params.object_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        Provinces.getOne(request.params.object_id).then(function(province){
            response.json({province: province});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        if (!req.params.object_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        Provinces.update(request.params.object_id, request.body.province).then(function(province){
            response.json({province: province});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (req, res) {
        if (!req.params.object_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        Provinces.deleteOne(request.params.object_id).then(function(province){
            res.json({success: true, message: 'province deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;
