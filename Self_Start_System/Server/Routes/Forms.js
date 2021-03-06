var express = require('express');
var router = express.Router();
var Forms = require('../Models/Form');
var Questions = require('../Models/Question');

router.route('/')
    .post(function (request, response) {
        Forms.add(request.body).then(function(form){
            response.json({form: form});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .get(function (request, response) {
        Forms.getAll().then(function(forms){
            response.json({form: forms});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

router.route('/:object_id')
    .get(function (request, response) {
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Forms.getOne(request.params.object_id).then(function(form){
            response.json({form: form});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        console.log("request.body", request.body);
        Forms.update(request.params.object_id, request.body).then(function(form){
            response.json({form: form});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (request, response) {
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Forms.deleteOne(request.params.object_id).then(function(form){
            Questions.updateManyOnFormDelete(request.params.object_id).then(function() {
                response.json({success: true, message: 'form deleted!'});
            });
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;
