var express = require('express');
var router = express.Router();
var UserAccounts = require('../Models/UserAccount');

router.route('/')
    .post(function (request, response) {
        UserAccounts.add(request.body.payment).then(function(userAccount){
            response.json({userAccount: userAccount});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .get(function (request, response) {
        UserAccounts.getAll().then(function(userAccounts){
            response.json({userAccount: userAccounts});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

router.route('/:object_id')
    .get(function (request, response) {
        if (!req.params.object_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        UserAccounts.getOne(request.params.object_id).then(function(userAccount){
            response.json({userAccount: userAccount});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        if (!req.params.object_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        UserAccounts.update(request.params.object_id, request.body.userAccount).then(function(userAccount){
            response.json({userAccount: userAccount});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (req, res) {
        if (!req.params.object_id) {
            res.json({success: false, message: 'id was not provided'});
        }
        UserAccounts.deleteOne(request.params.object_id).then(function(userAccount){
            res.json({success: true, message: 'userAccount deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;
