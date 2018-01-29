var express = require('express');
var router = express.Router();
var Country = require('../models/Country');

router.route('/')
    .get(function (request, response) {
        Country.Model.find(function (error, country) {
            if (error) response.send(error);
            response.json({country: country});
        });
    });

module.exports = router;
