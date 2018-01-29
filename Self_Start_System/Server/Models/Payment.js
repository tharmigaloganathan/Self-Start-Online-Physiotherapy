var mongoose = require('mongoose');
var paymentsSchema = mongoose.Schema(
    {
        dayTimeStamp: {
            type: Date,
            // `Date.now()` returns the current unix timestamp as a number
            default: Date.now
        },
        amount: Number,
        note: String,
        patientProfile: {type: mongoose.Schema.ObjectId, ref: 'PatientProfile'}
    }
);
var Payments = mongoose.model('Payment', paymentsSchema);
exports.Model = Payments;
