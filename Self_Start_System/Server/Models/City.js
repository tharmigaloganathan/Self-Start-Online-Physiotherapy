var mongoose = require('mongoose');
var citySchema = mongoose.Schema(
    {
        name: String,
        patientProfile: [{type: mongoose.Schema.ObjectId, ref: 'PatientProfile'}],
        province: {type: mongoose.Schema.ObjectId, ref: 'Province'}       
    }
);
var City = mongoose.model('City', citySchema);
exports.Model = City;