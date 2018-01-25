var mongoose = require ('mongoose');
var formsSchema = mongoose.Schema(
    {
        name: String,
        description: String,
        questions: [{type: mongoose.Schema.ObjectId, ref: 'Question'}],
        administrator: {type: mongoose.Schema.ObjectId, ref: ('Administrator')},
        assessmentTests: [{type: mongoose.Schema.ObjectId, ref: 'AssessmentTest'}]
    }
);

var Forms = mongoose.model('Form', formsSchema);
exports.Model = Forms;
