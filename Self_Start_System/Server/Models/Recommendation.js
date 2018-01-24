var mongoose = require('mongoose');
var recommendationSchema = mongoose.Schema(
	{
		timeStamp: Date,
		decision: String,
		treatment: {type: mongoose.Schema.ObjectId, ref 'Treatments'} 
	}
);

var Recommendation = mongoose.model('Recommendation', recommendationSchema);
exports.Model = Recommendation;		