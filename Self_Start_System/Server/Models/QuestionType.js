var mongoose = require ('mongoose');
var questionTypeSchema = mongoose.Schema(
    {
        name: String,
        questions: [{type: mongoose.Schema.ObjectId, ref: 'Questions'}]
    }
);

var QuestionType = mongoose.model('QuestionType', questionTypeSchema);
exports.Model = QuestionType;