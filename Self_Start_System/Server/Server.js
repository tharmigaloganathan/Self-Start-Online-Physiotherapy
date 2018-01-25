const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const cors = require('cors');

//our defined routes
const Exercises = require('./Routes/Exercises')(router);
const Physiotherapist = require('./Routes/Physiotherapist')(router);
const Recommendations = require('./Routes/Recommendation')(router);
const RehabilitationPlans = require('./Routes/RehabilitationPlans')(router);
const Treatments = require('./Routes/Treatments')(router);
const Administrators = require('./Routes/Administrators')(router);
const AssessmentTests = require('./Routes/AssessmentTests')(router);
const Forms = require('./Routes/Forms')(router);
const Questions = require('./Routes/Questions')(router);
const QuestionTypes = require('./Routes/QuestionTypes')(router);
const TestResults = require('./Routes/TestResults')(router);

//express middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//models
app.use('/Excercises', Exercises);
app.use('/Physiotherapists', Physiotherapist);
app.use('/Recommendations', Recommendations);
app.use('/RehabilitationPlans', RehabilitationPlans);
app.use('/Treatments', Treatments);
app.use('/Administrators', Administrators);
app.use('/AssessmentTests', AssessmentTests);
app.use('/Forms', Forms);
app.use('/Questions', Questions);
app.use('/QuestionType', QuestionTypes);
app.use('/TestResults', TestResuts);

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var config = require('./Config/Database');

//for connecting to mongodb database
mongoose.connect(config.uri, function (err) {
    if (err) {
        console.log('Could not connect to database: ', err);
    } else {
        console.log (config.secret);
        console.log ('Successfully connected to database');
    }
});

app.use(cors());

//middleware
router.use(function(req, res, next) {
    console.log('Something is happening');
    next();
});
