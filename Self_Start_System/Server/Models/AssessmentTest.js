var mongoose = require ('mongoose');
var assessmentTestsSchema = mongoose.Schema(
    {
        name: String,
        description: String,
        authorName: String,
        recommendations: [{type: mongoose.Schema.ObjectId, ref: ('Recommendation')}],
        form: {type: mongoose.Schema.ObjectId, ref: 'Forms'},
        testResults: [{type: mongoose.Schema.ObjectId, ref: ('TestResult')}],
        rehabilitationPlan: {type: mongoose.Schema.ObjectId, ref: 'RehabilitationPlans'}
    }
);

var AssessmentTests = mongoose.model('AssessmentTest', assessmentTestsSchema);
exports.Model = AssessmentTests;
