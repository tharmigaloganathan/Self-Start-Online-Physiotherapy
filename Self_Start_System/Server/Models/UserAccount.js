var mongoose = require('mongoose');
var userAccountSchema = mongoose.Schema(
    {
        userAccountName: String,
        encryptedPassword: String,
        //Check which of the following FKs is non-null to see what type of user (Admin, Physio, Patient) the user is.
        administrator: {type: mongoose.Schema.ObjectId, ref: 'Administrator'},
        physiotherapist: {type: mongoose.Schema.ObjectId, ref: 'Physiotherapist'},
        patientProfile: {type: mongoose.Schema.ObjectId, ref: 'PatientProfile'}
    }
);
var UserAccount = mongoose.model('UserAccount', userAccountSchema);
exports.Model = UserAccount;