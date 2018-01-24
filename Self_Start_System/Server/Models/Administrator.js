var mongoose = require ('mongoose');
var administratorSchema = mongoose.Schema(
    {
        ID: String,
        familyName: String,
        givenName: String,
        email: String,
        dateHired: Date,
        dateFinished: Date,
        forms: [{type: mongoose.Schema.ObjectId, ref: 'Form'}],
        userAccount: {type: mongoose.Schema.ObjectId, ref: ('UserAccount')}
    }
);

var Administrator = mongoose.model('Administrator', administratorSchema);
exports.Model = Administrator;