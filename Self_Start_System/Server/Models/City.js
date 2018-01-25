var mongoose = require('mongoose');
var citySchema = mongoose.Schema(
    {
        name: String,
        patientProfiles: [{type: mongoose.Schema.ObjectId, ref: 'PatientProfile'}],
        province: {type: mongoose.Schema.ObjectId, ref: 'Province'}
    }
);
var Cities = mongoose.model('City', citySchema);
exports.Model = Cities;
