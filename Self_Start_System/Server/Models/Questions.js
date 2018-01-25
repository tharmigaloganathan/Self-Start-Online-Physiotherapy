var mongoose = require ('mongoose');
var questionsSchema = mongoose.Schema(
    {
        questionText: String,
        helpDescription: String,
        order: Number,
        questionType: {type: mongoose.Schema.ObjectId, ref: ('QuestionType')},
        form: {type: mongoose.Schema.ObjectId, ref: 'Forms'}
    }
);

var Questions = mongoose.model('Questions', questionsSchema);
exports.Model = Questions;