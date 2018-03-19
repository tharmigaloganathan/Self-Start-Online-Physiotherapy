var express = require('express');
var router = express.Router();
var Administrators = require('../Models/Administrator');
var UserAccounts = require('../Models/UserAccount');
//for tokens & verification & login sessions
const jwt = require('jsonwebtoken');
const config = require('../Config/Database');

router.route('/')
    .post(function (request, response) {
        Administrators.add(request.body).then(function(administrator){
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

//middleware for every route below this one
router.use(function (req, res, next) {
    console.log('in authentication middleware');
    console.log(req.headers['authorization']);
    const token = req.headers.authorization;

    console.log('token: ', token);

    if (!token) {
        res.json({success: false, message: 'No token provided'}); // Return error
    } else {
        // Verify the token is valid
        jwt.verify(token, config.secret, function (err, decoded) {
            console.log(decoded);
            if (err) {
                res.json({success: false, message: 'Token invalid: ' + err}); // Return error for token validation
            } else {
                req.decoded = decoded; // Create global variable to use in any request beyond
                console.log('authentication middleware complete!');
                next(); // Exit middleware
            }

        })
    }
});

//middleware for every route below this one
router.use(function (req, res, next) {
    console.log('in authentication middleware');
    console.log(req.headers['authorization']);
    const token = req.headers.authorization;

    console.log('token: ', token);

    if (!token) {
        res.json({success: false, message: 'No token provided'}); // Return error
    } else {
        // Verify the token is valid
        jwt.verify(token, config.secret, function (err, decoded) {
            console.log(decoded);
            if (err) {
                res.json({success: false, message: 'Token invalid: ' + err}); // Return error for token validation
            } else {
                req.decoded = decoded; // Create global variable to use in any request beyond
                console.log('authentication middleware complete!');
                next(); // Exit middleware
            }

        })
    }
});

router.route('/:administrator_id')
    .get(function (request, response) {
        if (!request.params.administrator_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Administrators.getOne(request.params.administrator_id).then(function(administrator){
            console.log("retreived profile: ", administrator);
            response.json({administrator: administrator});
        }).catch(function(err){
            response.json({success: false, message: err});
        })

    })
    .put(function (request, response) {
        if (!request.params.administrator_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Administrators.update(request.params.administrator_id, request.body).then(function(administrator){
            response.json({administrator: administrator});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (request, response) {
        if (!request.params.administrator_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Administrators.deleteOne(request.params.administrator_id).then(function(administrator){
            response.json({success: true, message: 'admin deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;
