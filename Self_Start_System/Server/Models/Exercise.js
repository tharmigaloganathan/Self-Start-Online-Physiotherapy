var mongoose = require('mongoose');
var exercisesSchema = mongoose.Schema(
	{
		name: String,
		description: String,
		objectives: String,
		authorName: String,
		actionSteps: [String],
		location: String,
		frequency: Number,
		duration: Number,
		targetDate: Date,
		multimediaURL: String,
		rehabilitationPlan: {type: mongoose.Schema.ObjectId, ref: ('RehabilitationPlan')}
	}
);

var Exercises = mongoose.model('Exercise', exercisesSchema);
exports.Model = Exercises;
