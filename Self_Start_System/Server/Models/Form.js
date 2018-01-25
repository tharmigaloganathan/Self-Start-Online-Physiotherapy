var mongoose = require ('mongoose');
var formsSchema = mongoose.Schema(
    {
        name: String,
        description: String,
        questions: [{type: mongoose.Schema.ObjectId, ref: 'Questions'}],
        administrator: {type: mongoose.Schema.ObjectId, ref: ('Administrator')},
        assessmentTests: [{type: mongoose.Schema.ObjectId, ref: 'AssessmentTests'}]
    }
);

var Forms = mongoose.model('Forms', formsSchema);
exports.Model = Forms;
