var mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const cors = require('cors');

//setting request headers
app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS');
    next();
});

//our defined routes
const Administrators = require('./Routes/Administrators')(router);
const Appointments = require('./Routes/Appointments')(router);
const AssessmentTests = require('./Routes/AssessmentTests')(router);
const Cities = require('./Routes/Cities')(router);
const Countries = require('./Routes/Countries')(router);
const Exercises = require('./Routes/Exercises')(router);
const Forms = require('./Routes/Forms')(router);
const Genders = require('./Routes/Genders')(router);
const PatientProfiles = require('./Routes/PatientProfiles')(router);
const Payments = require('./Routes/Payments')(router);
const Physiotherapists = require('./Routes/Physiotherapists')(router);
const Provinces = require('./Routes/Provinces')(router);
const Questions = require('./Routes/Questions')(router);
const QuestionTypes = require('./Routes/QuestionTypes')(router);
const Recommendations = require('./Routes/Recommendations')(router);
const RehabilitationPlans = require('./Routes/RehabilitationPlans')(router);
const TestResults = require('./Routes/TestResults')(router);
const Treatments = require('./Routes/Treatments')(router);
const UserAccounts = require('./Routes/UserAccounts')(router);

//express middleware
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

//models
app.use('/Administrators', Administrators);
app.use('/Appointments', Appointments);
app.use('/AssessmentTests', AssessmentTests);
app.use('/Cities', Cities);
app.use('/Countries', Countries);
app.use('/Excercises', Exercises);
app.use('/Forms', Forms);
app.use('/Genders', Genders);
app.use('/PatientProfiles', PatientProfiles);
app.use('/Payments', Payments);
app.use('/Physiotherapists', Physiotherapists);
app.use('/Provinces', Provinces);
app.use('/Questions', Questions);
app.use('/QuestionTypes', QuestionTypes);
app.use('/Recommendations', Recommendations);
app.use('/RehabilitationPlans', RehabilitationPlans);
app.use('/TestResults', TestResults);
app.use('/Treatments', Treatments);
app.use('/UserAccounts', UserAccounts);


var config = require('./Config/Database');

// connect to mongoDB using mongoose driver
mongoose.connect('mongodb://SE3350Testing:ademidun@ds111648.mlab.com:11648/se3350testing', { useMongoClient: true });

// app.use(cors());

//middleware
app.listen(3700, function () {
    console.log('The Start-up server is listening on port 3700');
});
