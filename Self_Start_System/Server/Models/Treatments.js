var mongoose = require('mongoose');
var treatmentsSchema = mongoose.Schema(
	{
		dateAssign: Date,
		physio: {type: mongoose.Schema.ObjectId, ref: ('Physiotherapist')},
		patient: {type: mongoose.Schema.ObjectId, ref: ('PatientProfile')},
		rehabilitationPlan: {type: mongoose.Schema.ObjectId, ref: ('RehabilitationPlans')},
		recommendations: [{type: mongoose.Schema.ObjectId, ref: ('Recommendation')}]
	}
);

var Treatments = mongoose.model('Treatments', treatmentsSchema);
exports.Model = Treatments;