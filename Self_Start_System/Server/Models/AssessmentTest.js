var mongoose = require ('mongoose');
var assessmentTestsSchema = mongoose.Schema(
    {
        name: String,
        description: String,
        authorName: String,
        recommendation: [{type: mongoose.Schema.ObjectId, ref: ('Recommendation')}],
        form: {type: mongoose.Schema.ObjectId, ref: 'Form'},
        testResult: [{type: mongoose.Schema.ObjectId, ref: ('TestResult')}],
        rehabilitationPlan: {type: mongoose.Schema.ObjectId, ref: 'RehabilitationPlans'}
    }
);

var AssessmentTests = mongoose.model('AssessmentTest', assessmentTestsSchema);
exports.Model = AssessmentTests;
