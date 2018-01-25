var express = require('express');
var router = express.Router();
var Administrators = require('../models/Administrator');

router.route('/')
    .post(function (request, response) {
        var administrator = new Administrators.Model(request.body.administrator);
        if (!administrator.familyName){
            response.json({success: false, message: "No familyName detected."});
        } else if (!administrator.givenName){
            response.json({success: false, message: "No givenName detected."});
        } else if (!administrator.email){
            response.json({success: false, message: "No email detected."});
        } else if (!administrator.dateHired){
            response.json({success: false, message: "No dateHired detected."});
        } else if (!administrator.dateFinished){
            response.json({success: false, message: "No dateFinished detected."});
        } else if (!administrator.forms){
            response.json({success: false, message: "No forms detected."});
        } else if (!administrator.userAccount){
            response.json({success: false, message: "No userAccount detected."});
        } else {
            administrator.save(function (error) {
                if (error) response.send(error);
                response.json({administrator: administrator});
            });
        }
    })
    .get(function (request, response) {
        Administrators.Model.find(function (error, administrators) {
            if (error) response.send(error);
            response.json({administrator: administrators});
        });
    });

router.route('/:administrator_id')
    .get(function (request, response) {
        Administrators.Model.findById(request.params.administrator_id, function (error, administrator) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({administrator: administrator});
            }
        });
    })
    .put(function (request, response) {
        if (!request.body.administrator.familyName){
            response.json({success: false, message: "No familyName detected."});
        } else if (!request.body.administrator.givenName){
            response.json({success: false, message: "No givenName detected."});
        } else if (!request.body.administrator.email){
            response.json({success: false, message: "No email detected."});
        } else if (!request.body.administrator.dateHired){
            response.json({success: false, message: "No dateHired detected."});
        } else if (!request.body.administrator.dateFinished){
            response.json({success: false, message: "No dateFinished detected."});
        } else if (!request.body.administrator.forms){
            response.json({success: false, message: "No forms detected."});
        } else if (!request.body.administrator.userAccount){
            response.json({success: false, message: "No userAccount detected."});
        } else {
            Administrators.Model.findById(request.params.administrator_id, function (error, administrator) {
                if (error) {
                    response.send({error: error});
                }
                else {
                    administrator.familyName = request.body.administrator.familyName;
                    administrator.givenName = request.body.administrator.givenName;
                    administrator.email = request.body.administrator.email;
                    administrator.dateHired = request.body.administrator.dateHired;
                    administrator.dateFinished = request.body.administrator.dateFinished;
                    administrator.forms = request.body.administrator.forms;
                    administrator.userAccount = request.body.administrator.userAccount;
                    administrator.save(function (error) {
                        if (error) {
                            response.send({error: error});
                        } else {
                            response.json({administrator: administrator});
                        }
                    });
                }
            });
        }
    })
    .delete(function (req, res) {
        if (!req.params.administrator_id) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            Administrators.Model.findById(req.params.administrator_id, function (err, administrator) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    administrator.remove(function (err) {
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
