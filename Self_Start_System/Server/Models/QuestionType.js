var mongoose = require ('mongoose');
var questionTypeSchema = mongoose.Schema(
    {
        name: String,
        questions: [{type: mongoose.Schema.ObjectId, ref: 'Questions'}]
    }
);

var QuestionTypes = mongoose.model('QuestionType', questionTypeSchema);
exports.Model = QuestionTypes;
