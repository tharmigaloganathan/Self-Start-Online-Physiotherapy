var express = require('express');
var router = express.Router();
var Forms = require('../Models/Form');

router.route('/')
    .post(function (request, response) {
        Forms.add(request.body.form).then(function(form){
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

router.route('/:form_id')
    .get(function (request, response) {
        if (!req.params.form_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        Forms.getOne(request.params.form_id).then(function(form){
            response.json({form: form});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        if (!req.params.form_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        Forms.update(request.params.form_id, request.body.form).then(function(form){
            response.json({form: form});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (req, res) {
        if (!req.params.form_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        Forms.deleteOne(request.params.form_id).then(function(form){
            res.json({success: true, message: 'form deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;
