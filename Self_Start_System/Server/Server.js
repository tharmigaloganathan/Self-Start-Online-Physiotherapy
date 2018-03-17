var mongoose = require('mongoose');
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

//setting request headers
app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS');
    next();
});

// the following 2 middleware convert the URL req and res to json format
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

//our defined routes
const Administrators = require('./Routes/Administrators');
const Appointments = require('./Routes/Appointments');
const AssessmentTests = require('./Routes/AssessmentTests');
const Cities = require('./Routes/Cities');
const Countries = require('./Routes/Countries');
const Exercises = require('./Routes/Exercises');
const ExerciseOrders = require('./Routes/ExerciseOrders');
const Forms = require('./Routes/Forms');
const Genders = require('./Routes/Genders');
const PatientProfiles = require('./Routes/PatientProfiles');
const Payments = require('./Routes/Payments');
const Physiotherapists = require('./Routes/Physiotherapists');
const Provinces = require('./Routes/Provinces');
const Questions = require('./Routes/Questions');
const QuestionOrders = require('./Routes/QuestionOrders');
const QuestionTypes = require('./Routes/QuestionTypes');
const Recommendations = require('./Routes/Recommendations');
const RehabilitationPlans = require('./Routes/RehabilitationPlans');
const TestResults = require('./Routes/TestResults');
const Treatments = require('./Routes/Treatments');
const UserAccounts = require('./Routes/UserAccounts');

//models
app.use('/Administrators', Administrators);
app.use('/Appointments', Appointments);
app.use('/AssessmentTests', AssessmentTests);
app.use('/Cities', Cities);
app.use('/Countries', Countries);
app.use('/Exercises', Exercises);
app.use('/ExerciseOrders', ExerciseOrders);
app.use('/Forms', Forms);
app.use('/Genders', Genders);
app.use('/PatientProfiles', PatientProfiles);
app.use('/Payments', Payments);
app.use('/Physiotherapists', Physiotherapists);
app.use('/Provinces', Provinces);
app.use('/Questions', Questions);
app.use('/QuestionOrders', QuestionOrders);
app.use('/QuestionTypes', QuestionTypes);
app.use('/Recommendations', Recommendations);
app.use('/RehabilitationPlans', RehabilitationPlans);
app.use('/TestResults', TestResults);
app.use('/Treatments', Treatments);
app.use('/UserAccounts', UserAccounts);

// connect to mongoDB using mongoose driver
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://SE3350Testing:ademidun@ds111648.mlab.com:11648/se3350testing', { useMongoClient: true });
var goose = mongoose;
var conn = mongoose.connection;

const Photos = require('./Routes/Photos')(router, goose, conn);
app.use('/Photos', Photos);

//middleware
app.listen(3700, function () {
    console.log('The Start-up server is listening on port 3700');
});

