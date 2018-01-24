var mongoose = require('mongoose');
var treatmentSchema = mongoose.Schema(
	{
		dateAssign: Date,
		physio: {type: mongoose.Schema.ObjectId, ref: ('Physiotherapist')},
		patient: {type: mongoose.Schema.ObjectId, ref: ('PatientProfile')},
		rehabilitationPlan: {type: mongoose.Schema.ObjectId, ref: ('RehabilitationPlan')},
		recommendations: [{type: mongoose.Schema.ObjectId, ref: ('Recommendation')}]
	}
);

var Treatment = mongoose.model('Treatment', treatmentSchema);
exports.Model = Treatment;