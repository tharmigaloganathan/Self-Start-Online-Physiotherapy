var express = require('express');
var router = express.Router();
var Messages = require('../Models/Message');

router.route('/')
    .post(function (request, response) {
        Messages.add(request.body).then(function(message){
            response.json({message: message});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .get(function (request, response) {
        Messages.getAll().then(function(messages){
            response.json({message: messages});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

router.route('/:message_id')
    .put(function (request, response) {
        if (!request.params.message_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Messages.update(request.params.message_id, request.body).then(function(message){
            response.json({message: message});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;
