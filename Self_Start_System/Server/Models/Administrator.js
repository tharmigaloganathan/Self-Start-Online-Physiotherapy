var mongoose = require ('mongoose');
var administratorSchema = mongoose.Schema(
    {
        familyName: String,
        givenName: String,
        email: String,
        dateHired: Date,
        dateFinished: Date,
        forms: [{type: mongoose.Schema.ObjectId, ref: 'Forms'}],
        userAccount: {type: mongoose.Schema.ObjectId, ref: ('UserAccount')}
    }
);

var Administrators = mongoose.model('Administrator', administratorSchema);
exports.Model = Administrators;
