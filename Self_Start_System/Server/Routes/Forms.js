var express = require('express');
var router = express.Router();
var Forms = require('../models/Form');

router.route('/')
    .post(function (request, response) {
        var form = new Forms.Model(request.body.form);
        if (!form.name){
            response.json({success: false, message: "No name detected."});
        } else if (!form.description){
            response.json({success: false, message: "No description detected."});
        } else if (!form.questions){
            response.json({success: false, message: "No questions detected."});
        } else if (!form.administrator){
            response.json({success: false, message: "No administrator detected."});
        } else if (!form.assessmentTests){
            response.json({success: false, message: "No assessmentTests detected."});
        } else {
            form.save(function (error) {
                if (error) response.send(error);
                response.json({form: form});
            });
        }
    })
    .get(function (request, response) {
        Forms.Model.find(function (error, forms) {
            if (error) response.send(error);
            response.json({form: forms});
        });
    });

router.route('/:form_id')
    .get(function (request, response) {
        Forms.Model.findById(request.params.form_id, function (error, form) {
        if (error) {
            response.send({error: error});
        }
        else {
            response.json({form: form});
        }
        });
    })
    .put(function (request, response) {
        if (!request.body.form.name){
            response.json({success: false, message: "No name detected."});
        } else if (!request.body.form.description){
            response.json({success: false, message: "No description detected."});
        } else if (!request.body.form.questions){
            response.json({success: false, message: "No questions detected."});
        } else if (!request.body.form.administrator){
            response.json({success: false, message: "No administrator detected."});
        } else if (!request.body.form.assessmentTests){
            response.json({success: false, message: "No assessmentTests detected."});
        } else {
            Forms.Model.findById(request.params.form_id, function (error, form) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    form.name = request.body.form.name;
                    form.description = request.body.form.description;
                    form.questions = request.body.form.questions;
                    form.administrator = request.body.form.administrator;
                    form.assessmentTests = request.body.form.assessmentTests;
                    form.save(function (error) {
                        if (error) {
                            response.send({error: error});
                        } else {
                            response.json({form: form});
                        }
                    });
                }
            });
        }
    })
    .delete(function (req, res) {
        if (!req.paramsform_id) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            Forms.Model.findById(req.params.form_id, function (err, form) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    form.remove(function (err) {
                        if (err){
                            res.json({success: false, message: err});
                        } else {
                            res.json({success: true, message: 'form deleted!'});
                        }
                    })
                }
            })
        }
    })

module.exports = router;
