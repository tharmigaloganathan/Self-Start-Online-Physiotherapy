var mongoose = require ('mongoose');
var administratorSchema = mongoose.Schema(
    {
        familyName: String,
        givenName: String,
        email: String,
        dateHired: Date,
        dateFinished: Date,
        //Keep forms, but make the post not require them (ie put in null)
        forms: [{type: mongoose.Schema.ObjectId, ref: 'Form'}],
        userAccount: {type: mongoose.Schema.ObjectId, ref: ('UserAccount')}
    }
);

var Administrators = mongoose.model('Administrator', administratorSchema);
exports.Model = Administrators;
