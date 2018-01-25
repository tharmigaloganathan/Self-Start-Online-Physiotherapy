var mongoose = require('mongoose');
var rehabilitationPlansSchema = mongoose.Schema(
	{
		name: String,
		description: String,
		authorName: String,
		goal: String,
		timeFrameToComplete: String,
		exercises: [{type: mongoose.Schema.ObjectId, ref: ('Exercise')}],
		assessmentTests: [{type: mongoose.Schema.ObjectId, ref: ('AssessmentTest')}],
		treatments: [{type: mongoose.Schema.ObjectId, ref: ('Treatment')}]
	}
);

var RehabilitationPlans = mongoose.model('RehabilitationPlan', rehabilitationPlansSchema);
exports.Model = RehabilitationPlans;
