var mongoose = require('mongoose');
var recommendationSchema = mongoose.Schema(
	{
		timeStamp: Date,
		decision: String,
		treatment: {type: mongoose.Schema.ObjectId, ref: ('Treatment')},
    	assessmentTest: {type: mongoose.Schema.ObjectId, ref: ('AssessmentTest')}
	}
);

var Recommendations = mongoose.model('Recommendation', recommendationSchema);
exports.Model = Recommendations;
