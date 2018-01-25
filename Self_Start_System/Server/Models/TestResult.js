var mongoose = require ('mongoose');
var testResultSchema = mongoose.Schema(
    {
        question: String,
        answer: String,
        assessmentTest: {type: mongoose.Schema.ObjectId, ref: 'AssessmentTests'}
    }
);

var TestResults = mongoose.model('TestResult', testResultSchema);
exports.Model = TestResults;
