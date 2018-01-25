var mongoose = require('mongoose');
var paymentsSchema = mongoose.Schema(
    {
        dayTimeStamp: Date,
        amount: Number,
        note: String,
        patientProfile: {type: mongoose.Schema.ObjectId, ref: 'PatientProfile'}
    }
);
var Payments = mongoose.model('Payment', paymentsSchema);
exports.Model = Payments;
