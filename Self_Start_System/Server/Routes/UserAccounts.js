var express = require('express');
var router = express.Router();
var UserAccount = require('../models/UserAccount');

router.route('/')
    .post(function (request, response) {
        var userAccount = new UserAccount.Model(request.body.userAccount);
        if (!userAccount.userAccountName){
            response.json({success: false, message: "No userAccountName detected."});
        } else if (!userAccount.encryptedPassword){
            response.json({success: false, message: "No encryptedPassword detected."});
        } else if (!userAccount.administrator){
            response.json({success: false, message: "No administrator detected."});
        } else if (!userAccount.physiotherapist){
            response.json({success: false, message: "No physiotherapist detected."});
        } else if (!userAccount.patientProfile){
            response.json({success: false, message: "No patientProfile detected."});
        } else {
            userAccount.save(function (error) {
                if (error) response.send(error);
                response.json({userAccount: userAccount});
            });
        }
    })
    .get(function (request, response) {
        UserAccount.Model.find(function (error, userAccounts) {
            if (error) response.send(error);
            response.json({userAccount: userAccounts});
        });
    });

router.route('/:userAccount_id')
    .get(function (request, response) {
        UserAccount.Model.findById(request.params.userAccount_id, function (error, userAccount) {
            if (error) {
                response.send({error: error});
            }
            else {
                response.json({userAccount: userAccount});
            }
        });
    })
    .put(function (request, response) {
        UserAccount.Model.findById(request.params.userAccount_id, function (error, userAccount) {
            if (error) {
                response.send({error: error});
            }
            else {
                if (request.body.userAccount.userAccountName){
                    userAccount.userAccountName = request.body.userAccount.userAccountName;
                } else if (request.body.userAccount.encryptedPassword){
                    userAccount.encryptedPassword = request.body.userAccount.encryptedPassword;
                } else if (request.body.userAccount.administrator){
                    userAccount.administrator = request.body.userAccount.administrator;
                } else if (request.body.userAccount.physiotherapist){
                    userAccount.physiotherapist = request.body.userAccount.physiotherapist;
                } else if (request.body.userAccount.patientProfile){
                    userAccount.patientProfile = request.body.userAccount.patientProfile;
                }
                userAccount.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    } else {
                        response.json({userAccount: userAccount});
                    }
                });
            }
        });
    })
    .delete(function (req, res) {
        if (!req.params.userAccount_id) {
            res.json({success: false, message: 'id was not provided'});
        } else {
            UserAccount.Model.findById(req.params.userAccount_id, function (err, userAccount) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    userAccount.remove(function (err) {
                        if (err){
                            res.json({success: false, message: err});
                        } else {
                            res.json({success: true, message: 'form deleted!'});
                        }
                    })
                }
            })
        }
    });

module.exports = router;
