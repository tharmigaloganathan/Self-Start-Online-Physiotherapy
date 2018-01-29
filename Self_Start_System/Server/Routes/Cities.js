var express = require('express');
var router = express.Router();
var City = require('../models/City');

router.route('/')
    .post(function (request, response) {
        var city = new City.Model(request.body.city);
        if (!city.name){
            response.json({success: false, message: "No cityName detected."});
        } else if (!city.patientProfiles){
            response.json({success: false, message: "No patientProfiles detected."});
        } else if (!city.province){
            response.json({success: false, message: "No province detected."});
        } else {
            city.save(function (error) {
                if (error) response.send(error);
                response.json({city: city});
            });
        }
    });

module.exports = router;
