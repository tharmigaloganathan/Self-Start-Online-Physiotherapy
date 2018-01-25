var mongoose = require('mongoose');
var physiotherapistSchema = mongoose.Schema(
	{
		familyName: String,
		givenName: String,
		email: String,
		dateHired: Date,
		dateFinished: Date,
		treatments: [{type: mongoose.Schema.ObjectId, ref: ('Treatments')}],
		userAccount: {type: mongoose.Schema.ObjectId, ref: ('UserAccount')}
	}
);

var Physiotherapists = mongoose.model('Physiotherapist', physiotherapistSchema);
exports.Model = Physiotherapists;
