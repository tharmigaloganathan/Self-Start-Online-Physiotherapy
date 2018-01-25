var mongoose = require('mongoose');
var exercisesSchema = mongoose.Schema(
	{
		name: String,
		description: String,
		objectives: String,
		authorName: String,
		actionSteps: String,
		location: String
		frequency: Number,
		duration: Number,
		targetDate: Date,
		multimediaURL: String,
		rehabilitationPlans: {type: mongoose.Schema.ObjectId, ref: ('RehabilitationPlans')}
	}
);

var Exercises = mongoose.model('Exercises', exercisesSchema);
exports.Model = Exercises;