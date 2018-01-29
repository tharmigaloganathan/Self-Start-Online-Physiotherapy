var express = require('express');
var router = express.Router();
var Province = require('../models/Province');

router.route('/')
    .get(function (request, response) {
        Province.Model.find(function (error, province) {
            if (error) response.send(error);
            response.json({province: province});
        });
    });

module.exports = router;
