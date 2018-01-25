var mongoose = require ('mongoose');
var questionsSchema = mongoose.Schema(
    {
        questionText: String,
        helpDescription: String,
        order: Number,
        questionType: {type: mongoose.Schema.ObjectId, ref: ('QuestionType')},
        form: {type: mongoose.Schema.ObjectId, ref: 'Form'}
    }
);

var Questions = mongoose.model('Question', questionsSchema);
exports.Model = Questions;
