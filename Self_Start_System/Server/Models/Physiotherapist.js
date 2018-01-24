var mongoose = require('mongoose');
var physiotherapistSchema = mongoose.Schema(
	{
		familyName: String,
		givenName: String,
		email: String,
		dateHired: Date,
		dateFinished: Date,
		treatments: [{type: mongoose.Schema.ObjectId, ref: 'Treatment'}]
	}
);

var Physiotherapist = mongoose.model('Physiotherapist', physiotherapistSchema);
exports.Model = Physiotherapist;