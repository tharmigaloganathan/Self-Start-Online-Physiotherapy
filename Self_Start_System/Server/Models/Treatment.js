var mongoose = require('mongoose');
var treatmentsSchema = mongoose.Schema(
	{
		dateAssign: Date,
		physiotherapist: {type: mongoose.Schema.ObjectId, ref: ('Physiotherapist')},
		patientProfile: {type: mongoose.Schema.ObjectId, ref: ('PatientProfile')},
		rehabilitationPlan: {type: mongoose.Schema.ObjectId, ref: ('RehabilitationPlan')},
		recommendations: [{type: mongoose.Schema.ObjectId, ref: ('Recommendation')}]
	}
);

var Treatments = mongoose.model('Treatment', treatmentsSchema);
exports.Model = Treatments;
