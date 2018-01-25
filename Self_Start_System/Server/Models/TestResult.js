var mongoose = require ('mongoose');
var testResultSchema = mongoose.Schema(
    {
        question: String,
        answer: String,
        assessmentTest: {type: mongoose.Schema.ObjectId, ref: 'AssessmentTests'}
    }
);

var TestResult = mongoose.model('TestResult', testResultSchema);
exports.Model = TestResult;