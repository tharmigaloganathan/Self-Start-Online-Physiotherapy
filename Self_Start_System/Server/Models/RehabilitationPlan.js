var mongoose = require('mongoose');
var rehabilitationPlansSchema = mongoose.Schema(
	{
		name: String,
		description: String,
		authorName: String,
		goal: String,
		timeFrameToComplete: String,
		exercises: [{type: mongoose.Schema.ObjectId, ref: ('Exercises')}],
		assessmentTests: [{type: mongoose.Schema.ObjectId, ref: ('AssessmentTests')}],
		treatments: [{type: mongoose.Schema.ObjectId, ref: ('Treatments')}]
	}
);

var RehabilitationPlans = mongoose.model('RehabilitationPlan', rehabilitationPlansSchema);
exports.Model = RehabilitationPlans;
