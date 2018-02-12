var express = require('express');
var router = express.Router();
var Administrators = require('../Models/Administrator');

router.route('/')
    .post(function (request, response) {
        Administrators.add(request.body.administrator).then(function(administrator){
            response.json({administrator: administrator});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .get(function (request, response) {
        Administrators.getAll().then(function(administrators){
            response.json({administrator: administrators});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

router.route('/:administrator_id')
    .get(function (request, response) {
        Administrators.getOne(request.params.administrator_id).then(function(administrator){
            response.json({administrator: administrator});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        Administrators.update(request.params.administrator_id, request.body.administrator).then(function(administrator){
            response.json({administrator: administrator});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (req, res) {
        Administrators.deleteOne(request.params.administrator_id).then(function(administrator){
            res.json({success: true, message: 'admin deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;
