var mongoose = require('mongoose');
var provinceSchema = mongoose.Schema(
    {
        name: String,
        patientProfile: [{type: mongoose.Schema.ObjectId, ref: 'PatientProfile'}],
        city: [{type: mongoose.Schema.ObjectId, ref: 'City'}],        
        country: {type: mongoose.Schema.ObjectId, ref: 'Country'}       
    }
);
var Province = mongoose.model('Province', provinceSchema);
exports.Model = Province;