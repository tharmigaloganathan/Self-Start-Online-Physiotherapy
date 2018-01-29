var express = require('express');
var router = express.Router();
var Gender = require('../models/Gender');

router.route('/')
    .get(function (request, response) {
        Gender.Model.find(function (error, gender) {
            if (error) response.send(error);
            response.json({gender: gender});
        });
    });

module.exports = router;