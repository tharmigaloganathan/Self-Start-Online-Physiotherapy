var mongoose = require('mongoose');
var countrySchema = mongoose.Schema(
    {
        name: String,
        patientProfile: [{type: mongoose.Schema.ObjectId, ref: 'PatientProfile'}],
        province: [{type: mongoose.Schema.ObjectId, ref: 'Province'}]
    }
);
var Country = mongoose.model('Country', countrySchema);
exports.Model = Country;